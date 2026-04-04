import { getDocs, collection, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { getGridConfig } from "../config/grids";

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
	experience: number;
	bestExperience: number;
}

function clamp(value: number, min = 0, max = 99): number {
	return Math.min(max, Math.max(min, value));
}

function calcExperience(participations: number): number {
	if (participations <= 2) return clamp(70 + participations * 5);
	if (participations >= 12) return 99;
	return clamp(76 + participations * 2);
}

function calcRacecraft(avgPoints: number, maxAvgPoints: number): number {
	if (maxAvgPoints === 0) return 49;
	return clamp(49 + (avgPoints / maxAvgPoints) * 50);
}

function calcAwareness(
	totalNegAdj: number,
	maxNegAdj: number,
	penaltyRate: number,
	maxPenaltyRate: number,
	experience: number,
): number {
	const blPart = maxNegAdj === 0 ? 20 : 20 - (totalNegAdj / maxNegAdj) * 20;
	const bpPart =
		penaltyRate <= 0.3
			? 25
			: maxPenaltyRate === 0
				? 25
				: 25 - (penaltyRate / maxPenaltyRate) * 25;
	return clamp(29 + blPart + bpPart + (experience + 0.25) / 4);
}

function calcPace(avgQualyPos: number): number {
	const raw = 100 - 2 * avgQualyPos;
	return clamp(raw > 97 ? 99 : raw);
}

function calcRating(
	racecraft: number,
	awareness: number,
	pace: number,
	experience: number,
	seasonWins: number,
	careerWins: number,
): number {
	const inner =
		(racecraft * 5 + awareness + pace * 3 + experience) / 10 +
		seasonWins +
		careerWins / 10;
	return clamp(Math.round(0.91 * Math.min(inner, 99)));
}

interface DriverSeasonData {
	participations: number;
	totalPoints: number;
	totalNegAdj: number;
	totalQualyPos: number;
	qualyCount: number;
	seasonWins: number;
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
	let totalNegAdj = 0;
	let totalQualyPos = 0;
	let qualyCount = 0;
	let seasonWins = 0;

	for (const calId of calendarIds) {
		const result = allResults[calId];
		if (!result) continue;

		const raceOrder: string[] = (result.results ?? []).filter(Boolean);
		const qualyOrder: string[] = (result.resultsQualy ?? []).filter(Boolean);
		const sprintOrder: string[] = (result.sprintResults ?? []).filter(Boolean);
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
			totalPoints += pos <= racePointsArr.length ? racePointsArr[pos - 1] : 0;
			if (pos === 1) seasonWins += 1;
		}

		if (qualyOrder[0] === driverId) totalPoints += poleBonus;

		const qualyPos = qualyOrder.indexOf(driverId);
		if (qualyPos !== -1) {
			totalQualyPos += qualyPos + 1;
			qualyCount += 1;
		}

		raceAwards.forEach((award: any) => {
			if (result[award.id] === driverId) totalPoints += award.points;
		});

		if (presenceBonus > 0) totalPoints += presenceBonus;

		if (result.sprint) {
			const sprintPos = sprintOrder.indexOf(driverId);
			if (sprintPos !== -1 && !sprintNcSet.has(driverId)) {
				const pos = sprintPos + 1;
				totalPoints += pos <= sprintPointsArr.length ? sprintPointsArr[pos - 1] : 0;
			}
		}

		const adjs: any[] = allAdj[calId] ?? [];
		adjs.filter((a) => a.driverId === driverId).forEach((a) => {
			totalPoints += a.points;
			if (a.points < 0) totalNegAdj += Math.abs(a.points);
		});
	}

	return { participations, totalPoints, totalNegAdj, totalQualyPos, qualyCount, seasonWins };
}

export async function calculateAndSaveCards(
	gridId: string,
	seasonCalendarIds: string[],
	prevSeasonCalendarIds: string[], // all except last race (kept for backwards compat but not used)
	driverIds: string[],
): Promise<void> {
	const [resultsSnap, adjSnap, offsetsSnap, cardsSnap] = await Promise.all([
		getDocs(collection(db, "race_results")),
		getDocs(collection(db, "point_adjustments")),
		getDocs(collection(db, "driver_stats_offsets")),
		getDoc(doc(db, "driver_cards", gridId)),
	]);

	const allResults: Record<string, any> = {};
	resultsSnap.forEach((d) => { allResults[d.id] = d.data(); });

	const allAdj: Record<string, any[]> = {};
	adjSnap.forEach((d) => { allAdj[d.id] = d.data().adjustments ?? []; });

	const allOffsets: Record<string, any> = {};
	offsetsSnap.forEach((d) => { allOffsets[d.id] = d.data(); });

	// For each driver, find races they participated in and exclude the most recent
	const getDriverRaces = (driverId: string): { all: string[]; prevOnly: string[] } => {
		const participated: string[] = [];
		for (const calId of seasonCalendarIds) {
			const result = allResults[calId];
			if (!result) continue;
			const raceOrder = (result.results ?? []).filter(Boolean);
			const qualyOrder = (result.resultsQualy ?? []).filter(Boolean);
			const sprintOrder = (result.sprintResults ?? []).filter(Boolean);
			if (raceOrder.includes(driverId) || qualyOrder.includes(driverId) || sprintOrder.includes(driverId)) {
				participated.push(calId);
			}
		}
		// Return all races and all except most recent
		const all = participated;
		const prevOnly = participated.slice(0, -1);
		return { all, prevOnly };
	};

	// Compute season data for all drivers
	const seasonDataMap: Record<string, DriverSeasonData> = {};
	const prevDataMap: Record<string, DriverSeasonData> = {};

	for (const driverId of driverIds) {
		const { all, prevOnly } = getDriverRaces(driverId);
		seasonDataMap[driverId] = computeSeasonData(
			all, allResults, allAdj, driverId, gridId,
		);
		prevDataMap[driverId] = computeSeasonData(
			prevOnly, allResults, allAdj, driverId, gridId,
		);
	}

	// Compute per-driver values needed for normalization
	const getAvgPoints = (d: DriverSeasonData) =>
		d.participations > 0 ? d.totalPoints / d.participations : 0;
	const getAvgQualyPos = (d: DriverSeasonData) =>
		d.qualyCount > 0 ? d.totalQualyPos / d.qualyCount : 20;
	const getPenaltyRate = (driverId: string, d: DriverSeasonData) => {
		const historicRate = allOffsets[driverId]?.[gridId]?.penaltyRate ?? 0;
		const seasonRate = d.participations > 0
			? (d.totalNegAdj > 0 ? 1 : 0) // rough: races with any penalty / total — refine if needed
			: 0;
		// Use active season penalty events / participations
		const adjCalIds = seasonCalendarIds.filter(
			(cid) => (allAdj[cid] ?? []).some((a) => a.driverId === driverId && a.points < 0),
		);
		const activeRate = d.participations > 0 ? adjCalIds.length / d.participations : 0;
		return (historicRate + activeRate) / 2;
	};

	const activeDrivers = driverIds.filter((id) => seasonDataMap[id].participations > 0);

	// Grid-wide maxes (only drivers who participated)
	const maxAvgPoints = Math.max(
		1,
		...activeDrivers.map((id) => getAvgPoints(seasonDataMap[id])),
	);
	const maxNegAdj = Math.max(
		1,
		...activeDrivers.map((id) => seasonDataMap[id].totalNegAdj),
	);
	const allPenaltyRates = activeDrivers.map((id) => getPenaltyRate(id, seasonDataMap[id]));
	const maxPenaltyRate = Math.max(0.01, ...allPenaltyRates);

	// Same maxes for prevRating
	const prevActiveDrivers = driverIds.filter((id) => prevDataMap[id].participations > 0);
	const prevMaxAvgPoints = Math.max(
		1,
		...prevActiveDrivers.map((id) => getAvgPoints(prevDataMap[id])),
	);
	const prevMaxNegAdj = Math.max(
		1,
		...prevActiveDrivers.map((id) => prevDataMap[id].totalNegAdj),
	);
	const prevAllPenaltyRates = prevActiveDrivers.map((id) => getPenaltyRate(id, prevDataMap[id]));
	const prevMaxPenaltyRate = Math.max(0.01, ...prevAllPenaltyRates);

	// Get existing card data to track best values
	const existingCards = cardsSnap.exists() ? (cardsSnap.data() as Record<string, DriverCardStats>) : {};

	// Calculate cards for all drivers
	const cards: Record<string, DriverCardStats> = {};

	for (const driverId of driverIds) {
		const sd = seasonDataMap[driverId];
		const pd = prevDataMap[driverId];
		const historicWins = allOffsets[driverId]?.[gridId]?.wins ?? 0;
		const existingCard = existingCards[driverId];

		// Current rating
		const exp = Math.round(calcExperience(sd.participations));
		const rc = Math.round(calcRacecraft(getAvgPoints(sd), maxAvgPoints));
		const aw = Math.round(calcAwareness(
			sd.totalNegAdj, maxNegAdj,
			getPenaltyRate(driverId, sd), maxPenaltyRate,
			calcExperience(sd.participations),
		));
		const pace = Math.round(calcPace(getAvgQualyPos(sd)));
		const careerWins = historicWins + sd.seasonWins;
		const rating = Math.round(calcRating(rc, aw, pace, exp, sd.seasonWins, careerWins));

		// Previous rating (from previous races)
		// If driver has no previous races, prevRating = rating (no change)
		let prevRating = rating;
		if (pd.participations > 0) {
			const prevExp = calcExperience(pd.participations);
			const prevRc = calcRacecraft(getAvgPoints(pd), prevMaxAvgPoints);
			const prevAw = calcAwareness(
				pd.totalNegAdj, prevMaxNegAdj,
				getPenaltyRate(driverId, pd), prevMaxPenaltyRate,
				prevExp,
			);
			const prevPace = calcPace(getAvgQualyPos(pd));
			const prevCareerWins = historicWins + pd.seasonWins;
			prevRating = Math.round(calcRating(prevRc, prevAw, prevPace, prevExp, pd.seasonWins, prevCareerWins));
		}

		// Track best values (compare with existing)
		const bestRating = Math.max(rating, existingCard?.bestRating ?? 0);
		const bestRacecraft = Math.max(rc, existingCard?.bestRacecraft ?? 0);
		const bestAwareness = Math.max(aw, existingCard?.bestAwareness ?? 0);
		const bestPace = Math.max(pace, existingCard?.bestPace ?? 0);
		const bestExperience = Math.max(exp, existingCard?.bestExperience ?? 0);

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
			experience: exp,
			bestExperience,
		};
	}

	await setDoc(doc(db, "driver_cards", gridId), cards);
}
