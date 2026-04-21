import { useState } from "react";
import { getDocs, setDoc, doc, collection } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { getGridConfig, getPointSystem } from "../../shared/config/grids";
import { useGetCalendarsQuery } from "../../graphql/generated";
import type { DriverStatsShape } from "../../shared/hooks/useDriverStats";
import gridAcsv from "../../../public/top-sprint-stats.csv?raw";
import gridBcsv from "../../../public/top-sprint-academy-stats.csv?raw";

// CSV column indices (0-based)
const COL_DRIVER_ID = 8;
const COL_PRESENCAS = 17;
const COL_PONTOS = 18;
const COL_POLES = 21;
const COL_VR = 22;
const COL_VITORIAS_GP = 24;
const COL_PODIOS = 25;
const COL_VITORIAS_SPRINT = 26;
const COL_TEMPORADAS = 27;
const COL_VITORIA_CAMP = 28;
const COL_VITORIA_EQUIPE = 29;

interface CsvDriver {
	id: string;
	participations: number;
	points: number;
	poles: number;
	fastestLaps: number;
	wins: number;
	podiums: number;
	sprintWins: number;
	seasons: number;
	championships: number;
	teamChampionships: number;
}

function parseNum(v: string): number {
	const n = parseFloat(v?.replace("%", "") ?? "0");
	return isNaN(n) ? 0 : Math.round(n);
}

function parseCsvText(text: string): string[][] {
	// Proper CSV parser that handles quoted fields with embedded newlines/commas
	const rows: string[][] = [];
	let row: string[] = [];
	let field = "";
	let inQuotes = false;

	for (let i = 0; i < text.length; i++) {
		const ch = text[i];
		const next = text[i + 1];
		if (inQuotes) {
			if (ch === '"' && next === '"') {
				field += '"';
				i++;
			} else if (ch === '"') {
				inQuotes = false;
			} else {
				field += ch;
			}
		} else {
			if (ch === '"') {
				inQuotes = true;
			} else if (ch === ",") {
				row.push(field);
				field = "";
			} else if (ch === "\n" || (ch === "\r" && next === "\n")) {
				if (ch === "\r") i++;
				row.push(field);
				field = "";
				rows.push(row);
				row = [];
			} else {
				field += ch;
			}
		}
	}
	if (field || row.length) {
		row.push(field);
		rows.push(row);
	}
	return rows;
}

function parseCsv(
	rawText: string,
	label: string,
	appendLog: (s: string) => void,
): CsvDriver[] {
	const rows = parseCsvText(rawText);
	appendLog(`  ${label}: ${rows.length} linhas brutas`);

	const drivers: CsvDriver[] = [];
	for (const cols of rows) {
		const id = cols[COL_DRIVER_ID]?.trim().replace(/^"|"$/g, "");
		if (!id || id.length < 20 || !/^[a-z0-9]+$/.test(id)) continue;
		drivers.push({
			id,
			participations: parseNum(cols[COL_PRESENCAS]),
			points: parseNum(cols[COL_PONTOS]),
			poles: parseNum(cols[COL_POLES]),
			fastestLaps: parseNum(cols[COL_VR]),
			wins: parseNum(cols[COL_VITORIAS_GP]),
			podiums: parseNum(cols[COL_PODIOS]),
			sprintWins: parseNum(cols[COL_VITORIAS_SPRINT]),
			seasons: parseNum(cols[COL_TEMPORADAS]),
			championships: parseNum(cols[COL_VITORIA_CAMP]),
			teamChampionships: parseNum(cols[COL_VITORIA_EQUIPE]),
		});
	}
	return drivers;
}

function calcFirebaseStats(
	calendarIds: string[],
	allResults: Record<string, any>,
	allAdjustments: Record<string, any[]>,
	driverId: string,
	gridId: string,
): DriverStatsShape {
	const gridConfig = getGridConfig(gridId);
	const ps = getPointSystem(gridId);
	const racePointsArr = ps.race;
	const sprintPointsArr = ps.sprint ?? [];
	const poleBonus = ps.poleBonus ?? 0;
	const presenceBonus = ps.presenceBonus ?? 0;
	const raceAwards = gridConfig?.raceAwards ?? [];

	let s: DriverStatsShape = {
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
			(result.sprint && sprintOrder.includes(driverId));
		if (!participated) continue;

		s.participations += 1;

		const racePos = raceOrder.indexOf(driverId);
		const isNC = ncSet.has(driverId);
		if (racePos !== -1 && !isNC) {
			const pos = racePos + 1;
			s.points +=
				pos <= racePointsArr.length ? racePointsArr[pos - 1] : 0;
			if (pos === 1) s.wins += 1;
			if (pos <= 3) s.podiums += 1;
		}
		if (isNC) s.ncs += 1;

		if (qualyOrder[0] === driverId) {
			s.poles += 1;
			s.points += poleBonus;
		}

		raceAwards.forEach((award) => {
			if ((result as any)[award.id] === driverId) {
				if (award.id === "fastestLap") s.fastestLaps += 1;
				s.points += award.points;
			}
		});

		if (presenceBonus > 0) s.points += presenceBonus;

		if (result.sprint) {
			const sprintPos = sprintOrder.indexOf(driverId);
			if (sprintPos !== -1 && !sprintNcSet.has(driverId)) {
				const pos = sprintPos + 1;
				s.points +=
					pos <= sprintPointsArr.length
						? sprintPointsArr[pos - 1]
						: 0;
				if (pos === 1) s.sprintWins += 1;
				if (pos <= 3) s.sprintPodiums += 1;
			}
		}

		const adjs: any[] = allAdjustments[calId] ?? [];
		s.points += adjs
			.filter((a) => a.driverId === driverId)
			.reduce((sum, a) => sum + a.points, 0);
	}

	return s;
}

function clampPositive(n: number) {
	return Math.max(0, Math.round(n));
}

export function ImportDriverStatsOffsets() {
	const [log, setLog] = useState<string[]>([]);
	const [running, setRunning] = useState(false);
	const [done, setDone] = useState(false);
	const { data: calendarsData } = useGetCalendarsQuery();

	const appendLog = (msg: string) => setLog((prev) => [...prev, msg]);

	const run = async () => {
		setRunning(true);
		setLog([]);
		setDone(false);

		try {
			appendLog("Carregando dados do Firebase...");
			const [resultsSnap, adjSnap] = await Promise.all([
				getDocs(collection(db, "race_results")),
				getDocs(collection(db, "point_adjustments")),
			]);

			const allResults: Record<string, any> = {};
			resultsSnap.forEach((d) => {
				allResults[d.id] = d.data();
			});

			const allAdjustments: Record<string, any[]> = {};
			adjSnap.forEach((d) => {
				allAdjustments[d.id] = d.data().adjustments ?? [];
			});

			// Build calendar → grid map from Hygraph calendars (loaded via hook)
			const calendarGridMap: Record<string, string> = {};
			(calendarsData?.calendars ?? []).forEach((c) => {
				if (c.grid) calendarGridMap[c.id] = c.grid;
			});

			appendLog("Parsing CSVs...");
			const gridADrivers = parseCsv(gridAcsv, "Top Sprint", appendLog);
			const gridBDrivers = parseCsv(gridBcsv, "Academy", appendLog);
			appendLog(`Top Sprint: ${gridADrivers.length} pilotos`);
			appendLog(`Academy: ${gridBDrivers.length} pilotos`);

			appendLog(
				`Calendários mapeados: ${Object.keys(calendarGridMap).length}`,
			);

			const gridACalIds = Object.entries(calendarGridMap)
				.filter(([, g]) => g === "gridA")
				.map(([id]) => id);
			const gridBCalIds = Object.entries(calendarGridMap)
				.filter(([, g]) => g === "gridB")
				.map(([id]) => id);
			appendLog(
				`gridA calendários: ${gridACalIds.length}, gridB calendários: ${gridBCalIds.length}`,
			);

			// Merge existing offsets so we don't wipe other grids
			const existingSnap = await getDocs(
				collection(db, "driver_stats_offsets"),
			);
			const existingOffsets: Record<string, any> = {};
			existingSnap.forEach((d) => {
				existingOffsets[d.id] = d.data();
			});

			const process = async (
				csvDrivers: CsvDriver[],
				gridId: string,
				calIds: string[],
			) => {
				for (const csv of csvDrivers) {
					const firebase = calcFirebaseStats(
						calIds,
						allResults,
						allAdjustments,
						csv.id,
						gridId,
					);
					const offset: Partial<DriverStatsShape> = {
						participations: clampPositive(
							csv.participations - firebase.participations,
						),
						points: Math.round(csv.points - firebase.points), // can be negative if adjustments differ
						wins: clampPositive(csv.wins - firebase.wins),
						sprintWins: clampPositive(
							csv.sprintWins - firebase.sprintWins,
						),
						podiums: clampPositive(csv.podiums - firebase.podiums),
						sprintPodiums: clampPositive(
							csv.sprintWins - firebase.sprintPodiums,
						), // sprint podiums not in CSV, use 0
						poles: clampPositive(csv.poles - firebase.poles),
						fastestLaps: clampPositive(
							csv.fastestLaps - firebase.fastestLaps,
						),
						ncs: clampPositive(csv.ncs), // NCs not subtracted — CSV NCs are historical only
						seasons: clampPositive(csv.seasons),
						championships: clampPositive(csv.championships),
						teamChampionships: clampPositive(csv.teamChampionships),
					};

					// Fix sprintPodiums — CSV doesn't have it separately, use 0
					offset.sprintPodiums = 0;

					const existing = existingOffsets[csv.id] ?? {};
					await setDoc(doc(db, "driver_stats_offsets", csv.id), {
						...existing,
						[gridId]: offset,
					});

					appendLog(
						`✓ ${csv.id.slice(0, 8)}… | ${gridId} | pts: ${csv.points}→firebase:${firebase.points}→offset:${offset.points} | part: ${csv.participations}→firebase:${firebase.participations}→offset:${offset.participations}`,
					);
				}
			};

			appendLog("\n--- Processando gridA (Top Sprint) ---");
			await process(gridADrivers, "gridA", gridACalIds);

			appendLog("\n--- Processando gridB (Academy) ---");
			await process(gridBDrivers, "gridB", gridBCalIds);

			appendLog("\n✅ Importação concluída!");
			setDone(true);
		} catch (e: any) {
			appendLog(`❌ Erro: ${e.message}`);
		} finally {
			setRunning(false);
		}
	};

	return (
		<div>
			<h3 className="font-bold text-xl mb-2">
				Importar Histórico de Pilotos (One-Time)
			</h3>
			<p className="text-sm text-f1-lighterCarbon mb-4">
				Calcula os offsets subtraindo os dados já no Firebase dos totais
				do CSV. Execute apenas uma vez. Se executar novamente, os
				offsets serão recalculados.
			</p>
			<button
				onClick={run}
				disabled={running || done}
				className="bg-f1-carbon border border-f1-carbon text-white px-6 py-2 rounded cursor-pointer duration-120 disabled:opacity-50 hover:bg-transparent hover:text-f1-carbon"
			>
				{running
					? "Importando..."
					: done
						? "Concluído ✓"
						: "Executar Importação"}
			</button>
			{log.length > 0 && (
				<pre className="mt-4 bg-f1-carbon text-white text-xs p-4 rounded-lg overflow-auto max-h-[500px] whitespace-pre-wrap">
					{log.join("\n")}
				</pre>
			)}
		</div>
	);
}
