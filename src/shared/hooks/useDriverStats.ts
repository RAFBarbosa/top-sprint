import { useEffect, useState, useMemo } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { useGetCalendarsQuery } from "../../graphql/generated";
import { getGridConfig } from "../config/grids";
import { useSeasons } from "../../contexts/SeasonsContext";
import { useCalendarSeasons } from "../../contexts/CalendarSeasonsContext";

export interface DriverStatsShape {
	participations: number;
	wins: number;
	sprintWins: number;
	podiums: number;
	sprintPodiums: number;
	poles: number;
	fastestLaps: number;
	ncs: number;
	points: number;
	seasons: number;
	championships: number;
	teamChampionships: number;
}

export interface DriverStatsOffsets {
	[gridId: string]: Partial<DriverStatsShape>;
}

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

function addStats(a: DriverStatsShape, b: Partial<DriverStatsShape>): DriverStatsShape {
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
): DriverStatsShape {
	const gridConfig = getGridConfig(gridId);
	const ps = gridConfig?.pointSystem;
	const racePointsArr = ps?.race ?? [];
	const sprintPointsArr = ps?.sprint ?? [];
	const poleBonus = ps?.poleBonus ?? 0;
	const presenceBonus = ps?.presenceBonus ?? 0;
	const raceAwards = gridConfig?.raceAwards ?? [];

	let stats = { ...EMPTY_STATS };

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

		// Race stats
		const racePos = raceOrder.indexOf(driverId);
		const isNC = ncSet.has(driverId);
		if (racePos !== -1 && !isNC) {
			const pos = racePos + 1;
			const racePts = pos <= racePointsArr.length ? racePointsArr[pos - 1] : 0;
			stats.points += racePts;
			if (pos === 1) stats.wins += 1;
			if (pos <= 3) stats.podiums += 1;
		}
		if (isNC) stats.ncs += 1;

		// Qualy / pole
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

		// Sprint stats
		if (result.sprint) {
			const sprintPos = sprintOrder.indexOf(driverId);
			const isSprintNC = sprintNcSet.has(driverId);
			if (sprintPos !== -1 && !isSprintNC) {
				const pos = sprintPos + 1;
				const sprintPts = pos <= sprintPointsArr.length ? sprintPointsArr[pos - 1] : 0;
				stats.points += sprintPts;
				if (pos === 1) stats.sprintWins += 1;
				if (pos <= 3) stats.sprintPodiums += 1;
			}
		}

		// Point adjustments
		const adjs: any[] = allAdjustments[calId] ?? [];
		const adj = adjs.filter((a) => a.driverId === driverId).reduce((sum, a) => sum + a.points, 0);
		stats.points += adj;
	}

	return stats;
}

export function useDriverStats(driverId: string | null | undefined, gridId: string) {
	const [allResults, setAllResults] = useState<Record<string, any>>({});
	const [allAdjustments, setAllAdjustments] = useState<Record<string, any[]>>({});
	const [offsets, setOffsets] = useState<DriverStatsOffsets>({});
	const [loading, setLoading] = useState(true);

	const { data: calendarsData } = useGetCalendarsQuery();
	const { seasons } = useSeasons();
	const { mappings } = useCalendarSeasons();

	useEffect(() => {
		const load = async () => {
			try {
				const [resultsSnap, adjSnap, offsetsSnap] = await Promise.all([
					getDocs(collection(db, "race_results")),
					getDocs(collection(db, "point_adjustments")),
					getDocs(collection(db, "driver_stats_offsets")),
				]);

				const resultsMap: Record<string, any> = {};
				resultsSnap.forEach((d) => { resultsMap[d.id] = d.data(); });
				setAllResults(resultsMap);

				const adjMap: Record<string, any[]> = {};
				adjSnap.forEach((d) => { adjMap[d.id] = d.data().adjustments ?? []; });
				setAllAdjustments(adjMap);

				const offsetsMap: DriverStatsOffsets = {};
				offsetsSnap.forEach((d) => { offsetsMap[d.id] = d.data() as DriverStatsOffsets[string]; });
				setOffsets(offsetsMap);
			} catch (e) {
				console.error("Failed to load driver stats", e);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	const { season, career } = useMemo(() => {
		if (!driverId || !calendarsData || loading) {
			return { season: EMPTY_STATS, career: EMPTY_STATS };
		}

		const allCalendars = calendarsData.calendars ?? [];

		// Calendars for this grid
		const gridCalendarIds = new Set(
			allCalendars.filter((c) => c.grid === gridId).map((c) => c.id),
		);

		// Active season for this grid
		const gridSeasonIds = new Set(
			mappings.filter((m) => gridCalendarIds.has(m.calendarId)).map((m) => m.seasonId),
		);
		const activeSeason =
			seasons.find((s) => s.active && gridSeasonIds.has(s.id)) ??
			seasons.find((s) => s.active) ??
			seasons.filter((s) => gridSeasonIds.has(s.id)).slice(-1)[0];

		const activeSeasonCalendarIds = activeSeason
			? new Set(mappings.filter((m) => m.seasonId === activeSeason.id).map((m) => m.calendarId))
			: new Set<string>();

		// Season calendars: grid + active season + has results
		const seasonCalendars = allCalendars
			.filter((c) => c.grid === gridId && activeSeasonCalendarIds.has(c.id) && !!allResults[c.id])
			.map((c) => c.id);

		// Career calendars: all grid calendars with results
		const careerCalendars = allCalendars
			.filter((c) => c.grid === gridId && !!allResults[c.id])
			.map((c) => c.id);

		const seasonStats = calcStatsForCalendars(seasonCalendars, allResults, allAdjustments, driverId, gridId);

		const careerFromWebsite = calcStatsForCalendars(careerCalendars, allResults, allAdjustments, driverId, gridId);
		const historicOffset = (offsets[driverId] as any)?.[gridId] ?? {};
		const careerStats = addStats(careerFromWebsite, historicOffset);

		return { season: seasonStats, career: careerStats };
	}, [driverId, gridId, allResults, allAdjustments, offsets, calendarsData, seasons, mappings]);

	return { season, career, loading };
}
