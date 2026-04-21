import { getDocs, collection, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { getGridConfig } from "../config/grids";
import { tenant } from "../config/tenants";

export interface DriverCardStats {
	rating: number;
	prevRating: number;
	bestRating: number;
	racecraft: number;
	bestRacecraft: number;
	awareness: number;
	bestAwareness: number;
	pace: number;
	bestPace: number;
	consistency: number;
	bestConsistency: number;
}

/**
 * Returns the min attribute value and the raw range size for a grid, based on
 * its position in the tenant's grid list.
 *
 * - 3+ grids: first 90-99, middle 80-89, last 70-79 (range 9 each).
 * - 2 grids: first 90-99 (range 9), last 70-89 (range 19).
 * - 1 grid: 90-99 (range 9).
 */
function getGridRange(gridId: string): { min: number; range: number } {
	const grids = tenant.grids ?? [];
	const idx = grids.findIndex((g: { id: string }) => g.id === gridId);
	if (idx === -1 || grids.length <= 1) return { min: 90, range: 9 };
	if (idx === 0) return { min: 90, range: 9 };
	if (grids.length === 2) return { min: 70, range: 19 };
	if (idx === grids.length - 1) return { min: 70, range: 9 };
	return { min: 80, range: 9 };
}

function clamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value));
}

/**
 * Racecraft raw (0-range): normalized average points vs grid best.
 */
function calcRacecraftRaw(
	avgPoints: number,
	maxAvgPoints: number,
	range: number,
): number {
	if (maxAvgPoints === 0) return 0;
	return Math.round((avgPoints / maxAvgPoints) * range);
}

/**
 * Pace raw (0-range): normalized qualifying position vs grid.
 * Best qualifier → range, worst → 0.
 */
function calcPaceRaw(
	avgQualyPos: number,
	bestAvgQualy: number,
	worstAvgQualy: number,
	range: number,
): number {
	if (worstAvgQualy <= bestAvgQualy) return range; // only one driver or all tied
	const normalized =
		(worstAvgQualy - avgQualyPos) / (worstAvgQualy - bestAvgQualy);
	return Math.round(normalized * range);
}

/**
 * Awareness raw (0-range): percentage of races without time penalties (rounded up).
 */
function calcAwarenessRaw(
	cleanRaces: number,
	totalRaces: number,
	range: number,
): number {
	if (totalRaces === 0) return 0;
	const pct = cleanRaces / totalRaces;
	return Math.ceil(pct * range);
}

/**
 * Consistency raw (0-range): based on average |qualy pos − race pos| across races.
 * avgDiff ≤ 1 → range (max). avgDiff ≥ range+1 → 0 (min). Linear in between.
 */
function calcConsistencyRaw(avgPosDiff: number, range: number): number {
	return clamp(Math.round(range + 1 - avgPosDiff), 0, range);
}

/**
 * Rating raw (0-9): weighted combination of all attribute raw scores.
 * 55% racecraft + 20% consistency + 15% pace + 10% awareness
 */
function calcRatingRaw(
	rcRaw: number,
	consistencyRaw: number,
	paceRaw: number,
	awRaw: number,
): number {
	const raw =
		0.65 * rcRaw + 0.1 * consistencyRaw + 0.15 * paceRaw + 0.1 * awRaw;
	return Math.round(raw);
}

interface DriverSeasonData {
	participations: number;
	totalPoints: number;
	totalQualyPos: number;
	qualyCount: number;
	seasonWins: number;
	cleanRaces: number; // races without time penalties
	totalPosDiff: number; // sum of |qualyPos - racePos| across valid races
	posDiffRaces: number; // number of races with both qualy and race positions (not NC)
}

function computeSeasonData(
	calendarIds: string[],
	allResults: Record<string, any>,
	allAdj: Record<string, any[]>,
	driverId: string,
	gridId: string,
): DriverSeasonData {
	const gridConfig = getGridConfig(gridId);
	const ps = gridConfig?.pointSystem;
	const racePointsArr = ps?.race ?? [];
	const sprintPointsArr = ps?.sprint ?? [];
	const poleBonus = ps?.poleBonus ?? 0;
	const presenceBonus = ps?.presenceBonus ?? 0;
	const raceAwards = gridConfig?.raceAwards ?? [];

	let participations = 0;
	let totalPoints = 0;
	let totalQualyPos = 0;
	let qualyCount = 0;
	let seasonWins = 0;
	let cleanRaces = 0;
	let totalPosDiff = 0;
	let posDiffRaces = 0;

	for (const calId of calendarIds) {
		const result = allResults[calId];
		if (!result) continue;

		const raceOrder: string[] = (result.results ?? []).filter(Boolean);
		const qualyOrder: string[] = (result.resultsQualy ?? []).filter(
			Boolean,
		);
		const sprintOrder: string[] = (result.sprintResults ?? []).filter(
			Boolean,
		);
		const ncSet = new Set<string>(result.ncDriverIds ?? []);
		const sprintNcSet = new Set<string>(result.sprintNcDriverIds ?? []);

		const participated =
			raceOrder.includes(driverId) ||
			qualyOrder.includes(driverId) ||
			sprintOrder.includes(driverId);
		if (!participated) continue;

		participations += 1;

		const racePos = raceOrder.indexOf(driverId);
		const isNC = ncSet.has(driverId);
		if (racePos !== -1 && !isNC) {
			const pos = racePos + 1;
			totalPoints +=
				pos <= racePointsArr.length ? racePointsArr[pos - 1] : 0;
			if (pos === 1) seasonWins += 1;
		}

		if (qualyOrder[0] === driverId) totalPoints += poleBonus;

		const qualyPos = qualyOrder.indexOf(driverId);
		if (qualyPos !== -1) {
			totalQualyPos += qualyPos + 1;
			qualyCount += 1;
		}

		if (qualyPos !== -1 && racePos !== -1 && !isNC) {
			totalPosDiff += Math.abs(qualyPos + 1 - (racePos + 1));
			posDiffRaces += 1;
		}

		raceAwards.forEach((award: any) => {
			if (result[award.id] === driverId) totalPoints += award.points;
		});

		if (presenceBonus > 0) totalPoints += presenceBonus;

		if (result.sprint) {
			const sprintPos = sprintOrder.indexOf(driverId);
			if (sprintPos !== -1 && !sprintNcSet.has(driverId)) {
				const pos = sprintPos + 1;
				totalPoints +=
					pos <= sprintPointsArr.length
						? sprintPointsArr[pos - 1]
						: 0;
			}
		}

		// Point adjustments (still count towards total points)
		const adjs: any[] = allAdj[calId] ?? [];
		adjs.filter((a) => a.driverId === driverId).forEach((a) => {
			totalPoints += a.points;
		});

		// Check for time penalties in this race
		const penalties: Array<{ driverId: string; seconds: number }> =
			result.penalties ?? [];
		const sprintPenalties: Array<{ driverId: string; seconds: number }> =
			result.sprintPenalties ?? [];
		const hasTimePenalty =
			penalties.some((p) => p.driverId === driverId && p.seconds > 0) ||
			sprintPenalties.some(
				(p) => p.driverId === driverId && p.seconds > 0,
			);
		if (!hasTimePenalty) {
			cleanRaces += 1;
		}
	}

	return {
		participations,
		totalPoints,
		totalQualyPos,
		qualyCount,
		seasonWins,
		cleanRaces,
		totalPosDiff,
		posDiffRaces,
	};
}

export async function calculateAndSaveCards(
	gridId: string,
	seasonCalendarIds: string[],
	_prevSeasonCalendarIds: string[],
	driverIds: string[],
): Promise<void> {
	const [resultsSnap, adjSnap, cardsSnap] = await Promise.all([
		getDocs(collection(db, "race_results")),
		getDocs(collection(db, "point_adjustments")),
		getDoc(doc(db, "driver_cards", gridId)),
	]);

	const allResults: Record<string, any> = {};
	resultsSnap.forEach((d) => {
		allResults[d.id] = d.data();
	});

	const allAdj: Record<string, any[]> = {};
	adjSnap.forEach((d) => {
		allAdj[d.id] = d.data().adjustments ?? [];
	});

	const { min: gridMin, range: gridRange } = getGridRange(gridId);

	// For each driver, find races they participated in and exclude the most recent
	const getDriverRaces = (
		driverId: string,
	): { all: string[]; prevOnly: string[] } => {
		const participated: string[] = [];
		for (const calId of seasonCalendarIds) {
			const result = allResults[calId];
			if (!result) continue;
			const raceOrder = (result.results ?? []).filter(Boolean);
			const qualyOrder = (result.resultsQualy ?? []).filter(Boolean);
			const sprintOrder = (result.sprintResults ?? []).filter(Boolean);
			if (
				raceOrder.includes(driverId) ||
				qualyOrder.includes(driverId) ||
				sprintOrder.includes(driverId)
			) {
				participated.push(calId);
			}
		}
		return { all: participated, prevOnly: participated.slice(0, -1) };
	};

	// Compute season data for all drivers
	const seasonDataMap: Record<string, DriverSeasonData> = {};
	const prevDataMap: Record<string, DriverSeasonData> = {};

	for (const driverId of driverIds) {
		const { all, prevOnly } = getDriverRaces(driverId);
		seasonDataMap[driverId] = computeSeasonData(
			all,
			allResults,
			allAdj,
			driverId,
			gridId,
		);
		prevDataMap[driverId] = computeSeasonData(
			prevOnly,
			allResults,
			allAdj,
			driverId,
			gridId,
		);
	}

	// Helper functions
	const getAvgPoints = (d: DriverSeasonData) =>
		d.participations > 0 ? d.totalPoints / d.participations : 0;
	const getAvgQualyPos = (d: DriverSeasonData) =>
		d.qualyCount > 0 ? d.totalQualyPos / d.qualyCount : 20;

	const activeDrivers = driverIds.filter(
		(id) => seasonDataMap[id].participations > 0,
	);

	// Grid-wide maxes for racecraft normalization
	// const maxAvgPoints = Math.max(1, ...activeDrivers.map((id) => getAvgPoints(seasonDataMap[id])));
	const maxAvgPoints = 20;

	// Grid-wide min/max avgQualyPos for pace normalization
	const allAvgQualyPos = activeDrivers.map((id) =>
		getAvgQualyPos(seasonDataMap[id]),
	);
	// const bestAvgQualy = Math.min(
	// 	...(allAvgQualyPos.length ? allAvgQualyPos : [1]),
	// );
	// const worstAvgQualy = Math.max(
	// 	...(allAvgQualyPos.length ? allAvgQualyPos : [20]),
	// );
	const bestAvgQualy = 2;
	const worstAvgQualy = 20;

	// Same for prevRating
	const prevActiveDrivers = driverIds.filter(
		(id) => prevDataMap[id].participations > 0,
	);
	const prevMaxAvgPoints = Math.max(
		1,
		...prevActiveDrivers.map((id) => getAvgPoints(prevDataMap[id])),
	);
	const prevAllAvgQualyPos = prevActiveDrivers.map((id) =>
		getAvgQualyPos(prevDataMap[id]),
	);
	// const prevBestAvgQualy = Math.min(
	// 	...(prevAllAvgQualyPos.length ? prevAllAvgQualyPos : [1]),
	// );
	// const prevWorstAvgQualy = Math.max(
	// 	...(prevAllAvgQualyPos.length ? prevAllAvgQualyPos : [20]),
	// );
	const prevBestAvgQualy = 2;
	const prevWorstAvgQualy = 20;

	// Get existing card data to read bestCard values (for consistency)
	const existingCards = cardsSnap.exists()
		? (cardsSnap.data() as Record<string, DriverCardStats>)
		: {};

	// Calculate cards for all drivers
	const cards: Record<string, DriverCardStats> = {};

	for (const driverId of driverIds) {
		const sd = seasonDataMap[driverId];
		const pd = prevDataMap[driverId];
		const existingCard = existingCards[driverId];

		// --- Raw scores (0-gridRange) ---
		const rcRaw = calcRacecraftRaw(
			getAvgPoints(sd),
			maxAvgPoints,
			gridRange,
		);
		const paceRaw = calcPaceRaw(
			getAvgQualyPos(sd),
			bestAvgQualy,
			worstAvgQualy,
			gridRange,
		);
		const awRaw = calcAwarenessRaw(
			sd.cleanRaces,
			sd.participations,
			gridRange,
		);

		// Consistency: based on avg |qualy pos − race pos| across races.
		const avgPosDiff =
			sd.posDiffRaces > 0
				? sd.totalPosDiff / sd.posDiffRaces
				: gridRange + 1;
		const consistencyRaw =
			sd.posDiffRaces > 0
				? calcConsistencyRaw(avgPosDiff, gridRange)
				: 0;

		const ratingRaw = calcRatingRaw(rcRaw, consistencyRaw, paceRaw, awRaw);

		// --- Full values (gridMin + raw) ---
		const rc = gridMin + clamp(rcRaw, 0, gridRange);
		const pace = gridMin + clamp(paceRaw, 0, gridRange);
		const aw = gridMin + clamp(awRaw, 0, gridRange);
		const consistency = gridMin + consistencyRaw;
		const rating = gridMin + clamp(ratingRaw, 0, gridRange);

		// --- Previous rating ---
		let prevRating = rating;
		if (pd.participations > 0) {
			const prevRcRaw = calcRacecraftRaw(
				getAvgPoints(pd),
				prevMaxAvgPoints,
				gridRange,
			);
			const prevPaceRaw = calcPaceRaw(
				getAvgQualyPos(pd),
				prevBestAvgQualy,
				prevWorstAvgQualy,
				gridRange,
			);
			const prevAwRaw = calcAwarenessRaw(
				pd.cleanRaces,
				pd.participations,
				gridRange,
			);
			const prevAvgPosDiff =
				pd.posDiffRaces > 0
					? pd.totalPosDiff / pd.posDiffRaces
					: gridRange + 1;
			const prevConsistencyRaw =
				pd.posDiffRaces > 0
					? calcConsistencyRaw(prevAvgPosDiff, gridRange)
					: 0;
			const prevRatingRaw = calcRatingRaw(
				prevRcRaw,
				prevConsistencyRaw,
				prevPaceRaw,
				prevAwRaw,
			);
			prevRating = gridMin + clamp(prevRatingRaw, 0, gridRange);
		}

		// --- Best values (always track — can only go up via Math.max) ---
		const bestRating = Math.max(rating, existingCard?.bestRating ?? 0);
		const bestRacecraft = Math.max(rc, existingCard?.bestRacecraft ?? 0);
		const bestAwareness = Math.max(aw, existingCard?.bestAwareness ?? 0);
		const bestPace = Math.max(pace, existingCard?.bestPace ?? 0);
		const bestConsistency = Math.max(
			consistency,
			existingCard?.bestConsistency ?? 0,
		);

		cards[driverId] = {
			rating,
			prevRating,
			bestRating,
			racecraft: rc,
			bestRacecraft,
			awareness: aw,
			bestAwareness,
			pace,
			bestPace,
			consistency,
			bestConsistency,
		};
	}

	await setDoc(doc(db, "driver_cards", gridId), cards);
}
