import { useEffect, useState, useMemo } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import type { PointAdjustment } from "../../components/admin/PointAdjustmentsAdmin";
import { useGetCalendarsQuery, useGetDriversQuery } from "../../graphql/generated";
import { getGridConfig, type GridId } from "../config/grids";
import { useSeasons } from "../../contexts/SeasonsContext";
import { useCalendarSeasons } from "../../contexts/CalendarSeasonsContext";
import { useDriverProfiles } from "../../contexts/DriverProfilesContext";

interface RaceResultDoc {
	results?: string[];
	resultsQualy?: string[];
	sprintResults?: string[];
	penalties?: { driverId: string; seconds: number }[];
	sprintPenalties?: { driverId: string; seconds: number }[];
	[key: string]: any;
}

type CalendarEntry = { id: string; grid: string; sprint: boolean; date?: any; [key: string]: any };

function calcStandings(
	calendars: CalendarEntry[],
	allResults: Record<string, RaceResultDoc>,
	gridId: GridId,
	driverLookup: Record<string, any>,
	applyProfile: (driver: any, gridId: string) => any,
) {
	const gridConfig = getGridConfig(gridId);
	const ps = gridConfig?.pointSystem;
	const racePointsArr = ps?.race ?? [];
	const sprintPointsArr = ps?.sprint ?? [];
	const poleBonus = ps?.poleBonus ?? 0;
	const presenceBonus = ps?.presenceBonus ?? 0;
	const raceAwards = gridConfig?.raceAwards ?? [];

	const driverPts: Record<string, { pts: number; bestRaceFinishes: number[] }> = {};
	const ensure = (id: string) => {
		if (!driverPts[id]) driverPts[id] = { pts: 0, bestRaceFinishes: [] };
	};

	for (const cal of calendars) {
		const result = allResults[cal.id];
		if (!result) continue;

		const raceOrder = (result.results ?? []).filter(Boolean);
		const qualyOrder = (result.resultsQualy ?? []).filter(Boolean);
		const sprintOrder = (result.sprintResults ?? []).filter(Boolean);

		// Race points
		raceOrder.forEach((driverId, i) => {
			ensure(driverId);
			const pos = i + 1;
			const pts = pos <= racePointsArr.length ? racePointsArr[pos - 1] : 0;
			driverPts[driverId].pts += pts + presenceBonus;
			driverPts[driverId].bestRaceFinishes.push(pos);
			raceAwards.forEach((award) => {
				if (result[award.id] === driverId && award.points > 0) {
					driverPts[driverId].pts += award.points;
				}
			});
		});

		// Pole bonus
		if (poleBonus > 0 && qualyOrder.length > 0) {
			const poleId = qualyOrder[0];
			ensure(poleId);
			driverPts[poleId].pts += poleBonus;
		}

		// Sprint points — no pole bonus, no race awards
		if (cal.sprint && sprintOrder.length > 0) {
			sprintOrder.forEach((driverId, i) => {
				ensure(driverId);
				const pos = i + 1;
				const pts = pos <= sprintPointsArr.length ? sprintPointsArr[pos - 1] : 0;
				driverPts[driverId].pts += pts;
			});
		}
	}

	const rows = Object.entries(driverPts).map(([driverId, data]) => {
		const driver = driverLookup[driverId];
		if (!driver) return null;

		const base = {
			...driver,
			photo: driver.photo?.url || "",
			teamName: driver.team?.name || "",
			teamLogo: driver.team?.photo?.url || "",
			teamColor: driver.team?.color?.hex || "",
		};

		const profiled = applyProfile(base, gridId);

		return {
			id: driverId,
			name: driver.name ?? driverId,
			pts: data.pts,
			photo: typeof profiled.photo === "string" ? profiled.photo : profiled.photo?.url || "",
			teamName: profiled.teamName || profiled.team?.name || "",
			teamColor: profiled.teamColor || profiled.team?.color?.hex || "",
			teamLogo: profiled.team?.photo?.url || base.teamLogo,
			badge: driver.badge || "",
			badgeTitle: driver.badgeTitle || "",
			reserve: profiled.reserve ?? false,
			_bestFinishes: [...data.bestRaceFinishes].sort((a, b) => a - b),
		};
	}).filter(Boolean) as any[];

	rows.sort((a, b) => {
		if (b.pts !== a.pts) return b.pts - a.pts;
		const maxLen = Math.max(a._bestFinishes.length, b._bestFinishes.length);
		for (let i = 0; i < maxLen; i++) {
			const aPos = a._bestFinishes[i] ?? Infinity;
			const bPos = b._bestFinishes[i] ?? Infinity;
			if (aPos !== bPos) return aPos - bPos;
		}
		return 0;
	});

	return rows;
}

export function useFirebaseStandings(gridId: GridId) {
	const [allResults, setAllResults] = useState<Record<string, RaceResultDoc>>({});
	const [allAdjustments, setAllAdjustments] = useState<Record<string, PointAdjustment[]>>({});
	const [loadingResults, setLoadingResults] = useState(true);

	const { data: calendarsData } = useGetCalendarsQuery();
	const { data: driversData } = useGetDriversQuery();
	const { seasons } = useSeasons();
	const { mappings } = useCalendarSeasons();
	const { profiles, applyProfile } = useDriverProfiles();

	useEffect(() => {
		const load = async () => {
			try {
				const [resultsSnap, adjSnap] = await Promise.all([
					getDocs(collection(db, "race_results")),
					getDocs(collection(db, "point_adjustments")),
				]);
				const resultsMap: Record<string, RaceResultDoc> = {};
				resultsSnap.forEach((d) => { resultsMap[d.id] = d.data() as RaceResultDoc; });
				setAllResults(resultsMap);

				const adjMap: Record<string, PointAdjustment[]> = {};
				adjSnap.forEach((d) => { adjMap[d.id] = d.data().adjustments ?? []; });
				setAllAdjustments(adjMap);
			} catch (e) {
				console.error("Failed to load standings data", e);
			} finally {
				setLoadingResults(false);
			}
		};
		load();
	}, []);

	const { standings, previousStandings } = useMemo(() => {
		if (!calendarsData || !driversData || loadingResults) {
			return { standings: [], previousStandings: [] };
		}

		const activeSeason = seasons.find((s) => s.active);
		if (!activeSeason) return { standings: [], previousStandings: [] };

		const seasonCalendarIds = new Set(
			mappings
				.filter((m) => m.seasonId === activeSeason.id)
				.map((m) => m.calendarId),
		);

		// All calendars for this grid + season that have actual race results
		const relevantCalendars = (calendarsData.calendars ?? []).filter(
			(cal) => cal.grid === gridId && seasonCalendarIds.has(cal.id) && !!allResults[cal.id],
		) as CalendarEntry[];

		const driverLookup = Object.fromEntries(
			(driversData.drivers ?? []).map((d) => [d.id, d]),
		);

		// Helper: sum adjustments for a set of calendar ids
		const applyAdj = (rows: any[], calendarIds: Set<string>) =>
			rows.map((row) => {
				const adj = calendarIds
					? [...calendarIds].flatMap((cid) => allAdjustments[cid] ?? [])
							.filter((a) => a.driverId === row.id)
							.reduce((sum, a) => sum + a.points, 0)
					: 0;
				return adj !== 0 ? { ...row, pts: row.pts + adj } : row;
			}).sort((a: any, b: any) => {
				if (b.pts !== a.pts) return b.pts - a.pts;
				const maxLen = Math.max(a._bestFinishes.length, b._bestFinishes.length);
				for (let i = 0; i < maxLen; i++) {
					const aPos = a._bestFinishes[i] ?? Infinity;
					const bPos = b._bestFinishes[i] ?? Infinity;
					if (aPos !== bPos) return aPos - bPos;
				}
				return 0;
			});

		const allCalendarIds = new Set(relevantCalendars.map((c) => c.id));
		const standings = applyAdj(
			calcStandings(relevantCalendars, allResults, gridId, driverLookup, applyProfile),
			allCalendarIds,
		);

		// Find the most recently raced calendar (by date) that has results
		const lastRaced = [...relevantCalendars].sort((a, b) => {
			const da = a.date ? new Date(a.date).getTime() : 0;
			const db_ = b.date ? new Date(b.date).getTime() : 0;
			return db_ - da;
		})[0];

		// Previous = standings without the last raced race (and without its adjustments)
		const previousCalendars = lastRaced
			? relevantCalendars.filter((c) => c.id !== lastRaced.id)
			: relevantCalendars;
		const previousCalendarIds = new Set(previousCalendars.map((c) => c.id));

		const previousStandings = applyAdj(
			calcStandings(previousCalendars, allResults, gridId, driverLookup, applyProfile),
			previousCalendarIds,
		);

		return { standings, previousStandings };
	}, [allResults, allAdjustments, calendarsData, driversData, seasons, mappings, profiles, gridId]);

	return {
		standings,
		previousStandings,
		loading: loadingResults,
	};
}
