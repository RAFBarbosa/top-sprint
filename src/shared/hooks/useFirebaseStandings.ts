import { useEffect, useState, useMemo } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import type { PointAdjustment } from "../../components/admin/PointAdjustmentsAdmin";
import { useFirebaseTeams } from "./useFirebaseTeams";
import { useFirebaseDrivers } from "./useFirebaseDrivers";
import { useCalendars } from "../../contexts/CalendarsContext";
import { getEffectiveRaceAwards, getGridConfig, getPointSystem, type GridId } from "../config/grids";
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
	teamLogoByName: Record<string, string> = {},
	gridDriverIds: string[] = [],
) {
	const gridConfig = getGridConfig(gridId);
	const ps = getPointSystem(gridId);
	const racePointsArr = ps.race;
	const sprintPointsArr = ps.sprint ?? [];
	const poleBonus = ps.poleBonus ?? 0;
	const presenceBonus = ps.presenceBonus ?? 0;
	const raceAwards = getEffectiveRaceAwards(gridId);
	const reservesEarnPoints = gridConfig?.reservesEarnPoints ?? false;

	const isReserveForRace = (driverId: string, result: RaceResultDoc): boolean => {
		if (reservesEarnPoints) return false;
		const snap = result.driverSnapshots?.[driverId];
		if (snap && "reserve" in snap) return snap.reserve === true;
		// fallback for old results without snapshot reserve field
		const driver = driverLookup[driverId];
		if (!driver) return false;
		return applyProfile(driver, gridId)?.reserve === true;
	};

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
		const ncSet = new Set<string>(result.ncDriverIds ?? []);
		const sprintNcSet = new Set<string>(result.sprintNcDriverIds ?? []);

		const isReserve = (driverId: string) => isReserveForRace(driverId, result);

		// Race points — when reserves don't earn, points cascade past them to next titular
		let titularRacePos = 0;
		raceOrder.forEach((driverId) => {
			if (isReserve(driverId)) return;
			titularRacePos += 1;
			ensure(driverId);
			if (!ncSet.has(driverId)) {
				const pts =
					titularRacePos <= racePointsArr.length
						? racePointsArr[titularRacePos - 1]
						: 0;
				driverPts[driverId].pts += pts;
				driverPts[driverId].bestRaceFinishes.push(titularRacePos);
			}
		});
		// Race awards — only paid out to titulares when reserves don't earn
		raceAwards.forEach((award) => {
			const recipientId = result[award.id];
			if (!recipientId || award.points <= 0) return;
			if (isReserve(recipientId)) return;
			ensure(recipientId);
			driverPts[recipientId].pts += award.points;
		});

		// Pole bonus — skip if pole-sitter is a reserve (toggle off)
		if (poleBonus > 0 && qualyOrder.length > 0) {
			const poleId = qualyOrder[0];
			if (!isReserve(poleId)) {
				ensure(poleId);
				driverPts[poleId].pts += poleBonus;
			}
		}

		// Sprint points — same cascade rule as race
		if (cal.sprint && sprintOrder.length > 0) {
			let titularSprintPos = 0;
			sprintOrder.forEach((driverId) => {
				if (isReserve(driverId)) return;
				titularSprintPos += 1;
				ensure(driverId);
				if (!sprintNcSet.has(driverId)) {
					const pts =
						titularSprintPos <= sprintPointsArr.length
							? sprintPointsArr[titularSprintPos - 1]
							: 0;
					driverPts[driverId].pts += pts;
				}
			});
		}

		// Presence bonus — awarded once per titular driver per event
		if (presenceBonus > 0) {
			const participants = new Set([
				...raceOrder,
				...(cal.sprint ? sprintOrder : []),
				...qualyOrder,
			]);
			participants.forEach((driverId) => {
				if (isReserve(driverId)) return;
				ensure(driverId);
				driverPts[driverId].pts += presenceBonus;
			});
		}
	}

	// Ensure every driver who belongs to this grid gets a row (0 pts if they
	// haven't raced yet). Reserves are still skipped when the toggle is off.
	const isCurrentlyReserveOrEx = (driverId: string): boolean => {
		if (reservesEarnPoints) return false;
		const driver = driverLookup[driverId];
		if (!driver) return false;
		const profiled = applyProfile(driver, gridId);
		return profiled?.reserve === true || profiled?.exDriver === true;
	};

	gridDriverIds.forEach((driverId) => {
		if (isCurrentlyReserveOrEx(driverId)) return;
		ensure(driverId);
	});

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

		const resolvedTeamName = profiled.teamName || profiled.team?.name || "";
		return {
			id: driverId,
			name: driver.name ?? driverId,
			pts: data.pts,
			photo: typeof profiled.photo === "string" ? profiled.photo : profiled.photo?.url || "",
			teamName: resolvedTeamName,
			teamColor: profiled.teamColor || profiled.team?.color?.hex || "",
			teamLogo:
				profiled.team?.photo?.url ||
				base.teamLogo ||
				teamLogoByName[resolvedTeamName] ||
				"",
			badge: driver.badge || "",
			badgeTitle: driver.badgeTitle || "",
			reserve: profiled.reserve ?? false,
			exDriver: profiled.exDriver ?? false,
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

	const { allCalendars, loading: calendarsLoading } = useCalendars();
	const { drivers: driversList } = useFirebaseDrivers();
	const { teams: teamsData } = useFirebaseTeams();
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

	const { standings, previousStandings, allRows, previousAllRows } = useMemo(() => {
		if (calendarsLoading || !driversList.length || loadingResults) {
			return { standings: [], previousStandings: [], allRows: [], previousAllRows: [] };
		}

		// Prefer globally-active season; fall back to most recent season linked to this grid's calendars
		const gridCalendarIds = new Set(
			allCalendars.filter((c) => c.grid === gridId).map((c) => c.id),
		);
		const gridSeasonIds = new Set(
			mappings.filter((m) => gridCalendarIds.has(m.calendarId)).map((m) => m.seasonId),
		);
		const activeSeason =
			seasons.find((s) => s.active && gridSeasonIds.has(s.id)) ??
			seasons.find((s) => s.active) ??
			seasons.filter((s) => gridSeasonIds.has(s.id)).slice(-1)[0];
		if (!activeSeason) return { standings: [], previousStandings: [] };

		const seasonCalendarIds = new Set(
			mappings
				.filter((m) => m.seasonId === activeSeason.id)
				.map((m) => m.calendarId),
		);

		// All calendars for this grid + season that have actual race results and count for championship
		const relevantCalendars = allCalendars.filter(
			(cal) => cal.grid === gridId && seasonCalendarIds.has(cal.id) && !!allResults[cal.id] && cal.countsForChampionship !== false,
		) as CalendarEntry[];

		const driverLookup = Object.fromEntries(
			driversList.map((d) => [d.id, d]),
		);

		// Build a name→logo map from the teams collection directly — more reliable
		// than driver.team.photo, which can be broken in cloned Hygraph projects.
		const teamLogoByName: Record<string, string> = {};
		(teamsData ?? []).forEach((t) => {
			if (t.name && t.photo?.url) teamLogoByName[t.name] = t.photo.url;
		});

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
		// Drivers who belong to this grid (have a profile entry for it)
		const gridDriverIds = Object.entries(profiles)
			.filter(([, byGrid]) => !!byGrid?.[gridId])
			.map(([driverId]) => driverId);
		const reservesEarnPoints = getGridConfig(gridId)?.reservesEarnPoints ?? false;
		const filterExDrivers = (rows: any[]) =>
			reservesEarnPoints ? rows : rows.filter((r) => !r.exDriver);

		const allRows = applyAdj(
			calcStandings(relevantCalendars, allResults, gridId, driverLookup, applyProfile, teamLogoByName, gridDriverIds),
			allCalendarIds,
		);
		const standings = filterExDrivers(allRows);

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

		const previousAllRows =
			previousCalendars.length === 0
				? []
				: applyAdj(
						calcStandings(
							previousCalendars,
							allResults,
							gridId,
							driverLookup,
							applyProfile,
							teamLogoByName,
							gridDriverIds,
						),
						previousCalendarIds,
					);
		const previousStandings = filterExDrivers(previousAllRows);

		return { standings, previousStandings, allRows, previousAllRows };
	}, [allResults, allAdjustments, allCalendars, calendarsLoading, driversList, teamsData, seasons, mappings, profiles, gridId]);

	return {
		standings,
		previousStandings,
		allRows,
		previousAllRows,
		loading: loadingResults,
	};
}
