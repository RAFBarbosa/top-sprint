import { getDocs, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { getEffectiveRaceAwards, getGridConfig, getPointSystem } from "../config/grids";
import type { DriverStatsShape, DriverStatsOffsets } from "../hooks/useDriverStats";

const EMPTY_STATS: DriverStatsShape = {
	participations: 0,
	wins: 0,
	sprintWins: 0,
	podiums: 0,
	sprintPodiums: 0,
	poles: 0,
	fastestLaps: 0,
	ncs: 0,
	points: 0,
	seasons: 0,
	championships: 0,
	teamChampionships: 0,
};

function addStats(
	a: DriverStatsShape,
	b: Partial<DriverStatsShape>,
): DriverStatsShape {
	return {
		participations: a.participations + (b.participations ?? 0),
		wins: a.wins + (b.wins ?? 0),
		sprintWins: a.sprintWins + (b.sprintWins ?? 0),
		podiums: a.podiums + (b.podiums ?? 0),
		sprintPodiums: a.sprintPodiums + (b.sprintPodiums ?? 0),
		poles: a.poles + (b.poles ?? 0),
		fastestLaps: a.fastestLaps + (b.fastestLaps ?? 0),
		ncs: a.ncs + (b.ncs ?? 0),
		points: a.points + (b.points ?? 0),
		seasons: a.seasons + (b.seasons ?? 0),
		championships: a.championships + (b.championships ?? 0),
		teamChampionships: a.teamChampionships + (b.teamChampionships ?? 0),
	};
}

function calcStatsForCalendars(
	calendarIds: string[],
	allResults: Record<string, any>,
	allAdjustments: Record<string, any[]>,
	driverId: string,
	gridId: string,
	reserveSet: Set<string>,
): DriverStatsShape {
	const gridConfig = getGridConfig(gridId);
	const ps = getPointSystem(gridId);
	const racePointsArr = ps.race;
	const sprintPointsArr = ps.sprint ?? [];
	const poleBonus = ps.poleBonus ?? 0;
	const presenceBonus = ps.presenceBonus ?? 0;
	const raceAwards = getEffectiveRaceAwards(gridId);
	const reservesEarnPoints = gridConfig?.reservesEarnPoints ?? false;
	const driverIsReserve = !reservesEarnPoints && reserveSet.has(driverId);

	let stats = { ...EMPTY_STATS };

	// When toggle is off and this driver is a reserve, they don't count for stats at all
	if (driverIsReserve) return stats;

	const isReserve = (id: string) => !reservesEarnPoints && reserveSet.has(id);

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
			(result.sprint && sprintOrder.includes(driverId));

		if (!participated) continue;

		stats.participations += 1;

		// Effective race position skips reserves ahead of this driver
		const titularRaceOrder = raceOrder.filter((id) => !isReserve(id));
		const racePos = titularRaceOrder.indexOf(driverId);
		const isNC = ncSet.has(driverId);
		if (racePos !== -1 && !isNC) {
			const pos = racePos + 1;
			const racePts =
				pos <= racePointsArr.length ? racePointsArr[pos - 1] : 0;
			stats.points += racePts;
			if (pos === 1) stats.wins += 1;
			if (pos <= 3) stats.podiums += 1;
		}
		if (isNC) stats.ncs += 1;

		// Qualy / pole — always tracked from the actual qualy order
		if (qualyOrder[0] === driverId) {
			stats.poles += 1;
			stats.points += poleBonus;
		}

		// Race awards (fastest lap etc.)
		raceAwards.forEach((award) => {
			if ((result as any)[award.id] === driverId) {
				if (award.id === "fastestLap") stats.fastestLaps += 1;
				stats.points += award.points;
			}
		});

		// Presence bonus
		if (presenceBonus > 0) {
			stats.points += presenceBonus;
		}

		// Sprint stats — same cascade rule
		if (result.sprint) {
			const titularSprintOrder = sprintOrder.filter((id) => !isReserve(id));
			const sprintPos = titularSprintOrder.indexOf(driverId);
			const isSprintNC = sprintNcSet.has(driverId);
			if (sprintPos !== -1 && !isSprintNC) {
				const pos = sprintPos + 1;
				const sprintPts =
					pos <= sprintPointsArr.length
						? sprintPointsArr[pos - 1]
						: 0;
				stats.points += sprintPts;
				if (pos === 1) stats.sprintWins += 1;
				if (pos <= 3) stats.sprintPodiums += 1;
			}
		}

		// Point adjustments
		const adjs: any[] = allAdjustments[calId] ?? [];
		const adj = adjs
			.filter((a) => a.driverId === driverId)
			.reduce((sum, a) => sum + a.points, 0);
		stats.points += adj;
	}

	return stats;
}

export async function calculateAndSaveDriverStats(
	gridId: string,
	seasonCalendarIds: string[],
	careerCalendarIds: string[],
	driverIds: string[],
): Promise<void> {
	const [resultsSnap, adjSnap, driversSnap, offsetsSnap, profilesSnap] = await Promise.all([
		getDocs(collection(db, "race_results")),
		getDocs(collection(db, "point_adjustments")),
		getDocs(collection(db, "drivers")),
		getDocs(collection(db, "driver_stats_offsets")),
		getDocs(collection(db, "driver_profiles")),
	]);

	const allResults: Record<string, any> = {};
	resultsSnap.forEach((d) => {
		allResults[d.id] = d.data();
	});

	const allAdjustments: Record<string, any[]> = {};
	adjSnap.forEach((d) => {
		allAdjustments[d.id] = d.data().adjustments ?? [];
	});

	// Build a set of driver IDs flagged as reserve in this grid
	const reserveSet = new Set<string>();
	profilesSnap.forEach((d) => {
		const profile = (d.data() as Record<string, any>)?.[gridId];
		if (profile?.reserve === true) reserveSet.add(d.id);
	});

	const offsetsMap: DriverStatsOffsets = {};
	offsetsSnap.forEach((d) => {
		offsetsMap[d.id] = d.data() as DriverStatsOffsets[string];
	});

	// Build driverId → teamName map from existing drivers
	const driverTeamMap: Record<string, string> = {};
	driversSnap.forEach((d) => {
		const data = d.data();
		if (data.teamName) {
			driverTeamMap[d.id] = data.teamName;
		}
	});

	// Calculate stats for each driver and save to their driver document
	for (const driverId of driverIds) {
		const seasonStats = calcStatsForCalendars(
			seasonCalendarIds,
			allResults,
			allAdjustments,
			driverId,
			gridId,
			reserveSet,
		);

		const careerFromWebsite = calcStatsForCalendars(
			careerCalendarIds,
			allResults,
			allAdjustments,
			driverId,
			gridId,
			reserveSet,
		);

		const historicOffset = (offsetsMap[driverId] as any)?.[gridId] ?? {};

		const careerStats = addStats(careerFromWebsite, {
			...historicOffset,
			seasons: historicOffset.seasons ?? 0,
			championships: historicOffset.championships ?? 0,
			teamChampionships: historicOffset.teamChampionships ?? 0,
		});

		// Save stats to driver document
		const driverRef = doc(db, "drivers", driverId);
		await setDoc(
			driverRef,
			{
				stats: {
					[gridId]: {
						season: seasonStats,
						career: careerStats,
					},
				},
			},
			{ merge: true },
		);
	}
}
