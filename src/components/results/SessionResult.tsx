import { useState, useEffect } from "react";
import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { useFirebaseDrivers } from "../../shared/hooks/useFirebaseDrivers";
import type { NormalizedDriver } from "../../types/driver";
import {
	getGridConfig,
	getPointSystem,
	type RaceAward,
} from "../../shared/config/grids";
import { tenant } from "../../shared/config/tenants";
import { useTenantConfig } from "../../contexts/TenantConfigContext";
import { HygraphImg } from "../utils/HygraphImg";
import { CountryFlag } from "../utils/CountryFlag";
import { useSeasons } from "../../contexts/SeasonsContext";
import { useCalendarSeasons } from "../../contexts/CalendarSeasonsContext";
import { useDriverProfiles } from "../../contexts/DriverProfilesContext";
import { useTracks } from "../../contexts/TracksContext";

// Resolve raceAwards for any grid, falling back to the first tenant grid
// that has awards if the specific grid isn't found (cross-tenant admin usage).
function resolveRaceAwards(gridId: string): RaceAward[] {
	const explicit = getGridConfig(gridId)?.raceAwards;
	if (explicit?.length) return explicit;
	return (
		(tenant.grids as any[]).find((g: any) => g.raceAwards?.length)
			?.raceAwards ?? []
	);
}
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface SessionResultProps {
	calendarId: string | null;
	calendarData?: {
		round?: string | null;
		date?: any;
		grid: string;
		sprint: boolean;
		trackId?: string | null;
	} | null;
}

interface Penalty {
	driverId: string;
	seconds: number;
}

interface FirebaseResult {
	results: string[];
	resultsQualy: string[];
	penalties: Penalty[];
	fastestLap: string;
	driverOfTheDay: string;
	fairplay: string;
	mostOvertakes: string;
	sprintResults: string[];
	sprintResultsQualy: string[];
	sprintPenalties: Penalty[];
	sprintFastestLap: string;
	sprintDriverOfTheDay: string;
	sprintFairplay: string;
	sprintMostOvertakes: string;
	link?: string;
	ncDriverIds?: string[];
	sprintNcDriverIds?: string[];
	driverSnapshots?: Record<
		string,
		{
			teamName: string;
			teamColor: string;
			number?: string;
			photoUrl?: string;
		}
	>;
}

type DriverRow = {
	id: string;
	overallPos: number;
	gridRank: number;
	gridId: string;
	name: string;
	number?: string | null;
	teamName: string;
	photo?: string | null;
	teamColor?: string | null;
	gridColor: string;
	points: number;
	positionChange: number | null;
	isFastestLap: boolean;
	penaltySeconds: number;
	isNC: boolean;
	isReserve: boolean;
	sex?: string | null;
};

function buildRows(
	raceOrder: string[],
	qualyOrder: string[],
	awardWinners: Record<string, string>,
	penalties: Penalty[],
	drivers: NormalizedDriver[],
	sessionType: "race" | "sprint" | "quali",
	calGrid: string,
	driverSnapshots?: Record<
		string,
		{
			teamName: string;
			teamColor: string;
			number?: string;
			photoUrl?: string;
		}
	>,
	ncDriverIds?: string[],
	reserveSet?: Set<string>,
	countPresence = false,
	driverSexMap?: Record<string, string>,
): DriverRow[] {
	const lookup = Object.fromEntries((drivers ?? []).map((d) => [d.id, d]));

	// All drivers in this result belong to the calendar's grid — don't use driver.grid
	// from Hygraph, which would be wrong for drivers that participate in multiple grids.
	const gridSubgroups: Record<string, Array<{ id: string }>> = {
		[calGrid]: [],
	};
	raceOrder.filter(Boolean).forEach((id) => {
		gridSubgroups[calGrid].push({ id });
	});

	const reservesEarnPoints =
		getGridConfig(calGrid)?.reservesEarnPoints ?? false;
	const isReserve = (id: string) =>
		!reservesEarnPoints && (reserveSet?.has(id) ?? false);
	// Effective rank lookup that skips reserves ahead of each titular
	const titularRankByDriver: Record<string, number> = {};
	{
		let pos = 0;
		raceOrder.filter(Boolean).forEach((id) => {
			if (isReserve(id)) return;
			pos += 1;
			titularRankByDriver[id] = pos;
		});
	}

	return raceOrder
		.filter(Boolean)
		.map((driverId, i) => {
			const driver = lookup[driverId];
			if (!driver) return null;

			const overallPos = i + 1;
			const gridId = calGrid;
			const gridRank =
				(gridSubgroups[gridId] ?? []).findIndex(
					(x) => x.id === driverId,
				) + 1;

			const qualyIdx = qualyOrder.indexOf(driverId);
			const gridQualyRank =
				qualyIdx === -1
					? null
					: qualyOrder.slice(0, qualyIdx + 1).length;

			const positionChange =
				sessionType === "race" && gridQualyRank !== null
					? gridQualyRank - gridRank
					: null;

			const gridConfig = getGridConfig(gridId);
			const ps = getPointSystem(gridId);
			const gridRaceAwards: RaceAward[] = gridConfig?.raceAwards ?? [];
			const racePointsArr = ps.race;
			const sprintPointsArr = ps.sprint ?? [];
			const poleBonus = ps.poleBonus ?? 0;
			const presenceBonus = ps.presenceBonus ?? 0;

			const pointsArr =
				sessionType === "sprint" ? sprintPointsArr : racePointsArr;
			const isNC = ncDriverIds?.includes(driverId) ?? false;
			const driverIsReserve = isReserve(driverId);
			// Use effective titular rank for the points lookup; reserves get 0 when toggle is off
			const pointsRank = driverIsReserve
				? 0
				: (titularRankByDriver[driverId] ?? gridRank);
			let points = 0;
			// Presence bonus — only for titulares when toggle is off
			if (countPresence && !driverIsReserve) points += presenceBonus;
			// Race position points — 0 if NC, 0 if reserve (toggle off)
			if (!isNC && !driverIsReserve) {
				if (sessionType === "quali") {
					if (gridRank === 1) points += poleBonus;
				} else if (pointsRank > 0 && pointsRank <= pointsArr.length) {
					points += pointsArr[pointsRank - 1];
				}
			}
			// Pole bonus + race awards — skip reserves when toggle off
			if (countPresence && sessionType !== "quali" && !driverIsReserve) {
				if (
					poleBonus > 0 &&
					qualyOrder.length > 0 &&
					qualyOrder[0] === driverId
				) {
					points += poleBonus;
				}
				gridRaceAwards.forEach((award) => {
					if (awardWinners[award.id] === driverId && award.points > 0)
						points += award.points;
				});
			}

			const penalty = penalties?.find((p) => p.driverId === driverId);
			const gridColor = gridConfig?.primaryColor ?? "#eb1c24";
			const snapshot = driverSnapshots?.[driverId];

			return {
				id: driverId,
				overallPos,
				gridRank,
				gridId,
				name: driver.name ?? driverId,
				number: snapshot?.number || (driver as any).number || null,
				teamName: snapshot?.teamName || driver.team?.name || "—",
				photo: snapshot?.photoUrl || driver.photo?.url,
				teamColor: snapshot?.teamColor || driver.team?.color?.hex,
				gridColor,
				points,
				positionChange,
				isFastestLap: gridRaceAwards.some(
						(award) =>
							award.label.trim().toLowerCase() === "volta rápida" &&
							awardWinners[award.id] === driverId,
					),
				penaltySeconds: penalty?.seconds ?? 0,
				isNC: ncDriverIds?.includes(driverId) ?? false,
				isReserve: reserveSet?.has(driverId) ?? false,
				sex: driverSexMap?.[driverId] ?? null,
			};
		})
		.filter((r): r is NonNullable<typeof r> => r !== null) as DriverRow[];
}

function WinnerCard({
	gridId,
	row,
	sessionType,
	poleRow,
	awardRows,
}: {
	gridId: string;
	row: DriverRow | undefined;
	sessionType: "race" | "sprint" | "quali";
	poleRow?: DriverRow;
	awardRows?: Array<{ award: RaceAward; driver: DriverRow }>;
}) {
	const { defaultPhotoStyle } = useTenantConfig();
	if (!row) return null;
	const gridConfig = getGridConfig(gridId);
	const gridColor = gridConfig?.primaryColor ?? "#eb1c24";
	const poleBonus = gridConfig?.pointSystem?.poleBonus ?? 0;
	const presenceBonus = gridConfig?.pointSystem?.presenceBonus ?? 0;
	const reservesEarnPoints = gridConfig?.reservesEarnPoints ?? false;
	const title = row.sex === "F" ? "Vencedora" : "Vencedor";

	return (
		<div className="tenant-results-winner-card flex-1 rounded-sm overflow-hidden border border-black/10 flex flex-col min-w-0">
			{/* Grid-colored header */}
			<div
				className="px-4 py-2 text-white uppercase text-center"
				style={{ backgroundColor: gridColor }}
			>
				<p className="font-bold tracking-wider">
					{/* {gridConfig?.label ?? gridId} */}
					{title}
				</p>
				{/* <p className="text-xs mt-0.5 text-white/80">{title}</p> */}
			</div>

			{/* Photo — fixed crop matching OG */}
			{(row.photo || tenant.fallbackDriverPhoto) && (
				<div className="flex items-center justify-center w-9/10 mx-auto overflow-hidden">
					{defaultPhotoStyle === "round" ? (
						<HygraphImg
							src={row.photo || tenant.fallbackDriverPhoto}
							alt={row.name}
							imgWidth={120}
							imgHeight={120}
							className="max-w-full mt-6 mb-11 w-38 h-38 scale-123 object-contain rounded-full border-2 border-f1-carbon"
						/>
					) : defaultPhotoStyle === "bust" ? (
						<HygraphImg
							src={row.photo || tenant.fallbackDriverPhoto}
							alt={row.name}
							imgWidth={120}
							imgHeight={120}
							className="max-w-full object-cover translate-y-2"
						/>
					) : (
						<HygraphImg
							src={row.photo || tenant.fallbackDriverPhoto}
							alt={row.name}
							imgWidth={200}
							imgHeight={200}
							className="max-w-full object-cover scale-120 md:scale-135 translate-y-10"
						/>
					)}
				</div>
			)}

			{/* Name + team — dark carbon bar */}
			<div
				className="px-4 py-3 text-white -mt-5 relative z-10"
				style={{ backgroundColor: "#15151e" }}
			>
				<p className="font-bold uppercase text-base leading-tight">
					{row.name}
				</p>
				<p className="text-xs text-white/80 mt-0.5">{row.teamName}</p>
			</div>

			{/* Pole position — race only */}
			{sessionType === "race" && poleRow && (
				<div className="tenant-results-subrow bg-f1-bg-silver px-4 py-2 flex items-center gap-2 border-b border-black/10">
					<div
						className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden border-2 border-f1-carbon/20"
						style={{
							backgroundColor: poleRow.teamColor ?? "#48176d",
						}}
					>
						{defaultPhotoStyle === "round" ? (
							<HygraphImg
								src={
									poleRow.photo || tenant.fallbackDriverPhoto
								}
								alt={poleRow.name}
								imgWidth={48}
								imgHeight={48}
								className="w-full h-full object-cover scale-123 translate-y-[5px]"
							/>
						) : defaultPhotoStyle === "bust" ? (
							<HygraphImg
								src={
									poleRow.photo || tenant.fallbackDriverPhoto
								}
								alt={poleRow.name}
								imgWidth={48}
								imgHeight={48}
								className="w-full h-full object-cover translate-y-[6px]"
							/>
						) : (
							<HygraphImg
								src={
									poleRow.photo || tenant.fallbackDriverPhoto
								}
								alt={poleRow.name}
								imgWidth={48}
								imgHeight={48}
								className="w-full h-full object-cover scale-200 translate-y-[24px]"
							/>
						)}
					</div>
					<div className="min-w-0">
						<p className="text-xs uppercase tracking-wide text-f1-text font-bold">
							Pole Position
						</p>
						<p className="text-xs font-semibold text-f1-text leading-tight">
							{poleRow.name}
						</p>
					</div>
					{poleBonus > 0 &&
						!(poleRow.isReserve && !reservesEarnPoints) && (
							<p className="text-xs text-f1-lighterCarbon font-bold ml-auto shrink-0">
								+{poleBonus} {poleBonus === 1 ? "pt" : "pts"}
							</p>
						)}
				</div>
			)}

			{/* Configurable race awards — race only, not sprint or quali */}
			{sessionType === "race" &&
				awardRows?.map(({ award, driver }) => (
					<div
						key={award.id}
						className="tenant-results-subrow bg-f1-bg-silver px-4 py-2 flex items-center gap-2 border-t border-black/10"
					>
						<div
							className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden border-2 border-f1-carbon/20"
							style={{
								backgroundColor: driver.teamColor ?? "#48176d",
							}}
						>
							{defaultPhotoStyle === "round" ? (
								<HygraphImg
									src={
										driver.photo ||
										tenant.fallbackDriverPhoto
									}
									alt={driver.name}
									imgWidth={48}
									imgHeight={48}
									className="w-full h-full object-cover scale-123 translate-y-[5px]"
								/>
							) : defaultPhotoStyle === "bust" ? (
								<HygraphImg
									src={
										driver.photo ||
										tenant.fallbackDriverPhoto
									}
									alt={driver.name}
									imgWidth={48}
									imgHeight={48}
									className="w-full h-full object-cover translate-y-[6px]"
								/>
							) : (
								<HygraphImg
									src={
										driver.photo ||
										tenant.fallbackDriverPhoto
									}
									alt={driver.name}
									imgWidth={48}
									imgHeight={48}
									className="w-full h-full object-cover scale-200 translate-y-[24px]"
								/>
							)}
						</div>
						<div className="min-w-0">
							<p
								className={`text-xs uppercase tracking-wide font-bold ${award.label.trim().toLowerCase() === "volta rápida" ? "text-f1-purple" : "text-f1-text"}`}
							>
								{award.label}
							</p>
							<p className="text-xs font-semibold text-f1-text leading-tight">
								{driver.name}
							</p>
						</div>
						{award.points > 0 &&
							!(driver.isReserve && !reservesEarnPoints) && (
								<p className="text-xs text-f1-lighterCarbon font-bold ml-auto shrink-0">
									+{award.points}{" "}
									{award.points === 1 ? "pt" : "pts"}
								</p>
							)}
					</div>
				))}

			{/* Participation bonus — race only, shown only when configured */}
			{sessionType === "race" && presenceBonus > 0 && (
				<div className="tenant-results-subrow bg-f1-bg-silver px-4 py-2 flex items-center justify-between border-t border-black/10">
					<p className="text-xs uppercase tracking-wide text-f1-lighterCarbon font-bold">
						Participação
					</p>
					<p className="text-xs text-f1-lighterCarbon font-bold shrink-0">
						+{presenceBonus} {presenceBonus === 1 ? "pt" : "pts"}
					</p>
				</div>
			)}
		</div>
	);
}

function ResultsSection({
	label,
	raceOrder,
	qualyOrder,
	awardWinners,
	penalties,
	pointAdjustments = [],
	drivers,
	sessionType,
	calGrid,
	showLabel = true,
	driverSnapshots,
	ncDriverIds,
	driverSexMap,
}: {
	label: string;
	raceOrder: string[];
	qualyOrder: string[];
	awardWinners: Record<string, string>;
	penalties: Penalty[];
	pointAdjustments?: { driverId: string; points: number; reason: string }[];
	drivers: NormalizedDriver[];
	sessionType: "race" | "sprint" | "quali";
	calGrid: string;
	showLabel?: boolean;
	driverSnapshots?: Record<
		string,
		{
			teamName: string;
			teamColor: string;
			number?: string;
			photoUrl?: string;
		}
	>;
	ncDriverIds?: string[];
	driverSexMap?: Record<string, string>;
}) {
	const { getProfile } = useDriverProfiles();
	const reserveSet = new Set(
		(raceOrder ?? []).filter((id) => {
			const snap = driverSnapshots?.[id];
			if (snap && "reserve" in snap) return snap.reserve === true;
			return getProfile(id, calGrid)?.reserve === true;
		}),
	);

	const rows = buildRows(
		raceOrder,
		qualyOrder,
		awardWinners,
		penalties,
		drivers,
		sessionType,
		calGrid,
		driverSnapshots,
		ncDriverIds,
		reserveSet,
		false, // Always false for table — bonuses are shown separately
		driverSexMap,
	);
	if (rows.length === 0) return null;

	const gridsPresent = [...new Set(rows.map((r) => r.gridId))];
	const getWinner = (gridId: string) => rows.find((r) => r.gridId === gridId);
	const getAwardRowsForGrid = (gridId: string) => {
		const awards: RaceAward[] = resolveRaceAwards(gridId);
		return awards
			.filter((award) => award.points > 0)
			.map((award) => ({
				award,
				driver: rows.find(
					(r) =>
						r.id === awardWinners[award.id] && r.gridId === gridId,
				),
			}))
			.filter(
				(a): a is { award: RaceAward; driver: DriverRow } => !!a.driver,
			);
	};
	const getPoleForGrid = (gridId: string) => {
		for (const id of qualyOrder) {
			const found = rows.find((r) => r.id === id && r.gridId === gridId);
			if (found) return found;
		}
		return undefined;
	};

	return (
		<section>
			{/* Section header — only shown when label is needed */}
			{/* {showLabel && (
				<div className="w-full mx-auto max-w-screen-xl px-3 mb-6">
					<h2 className="font-bold text-3xl md:text-4xl">{label}</h2>
				</div>
			)} */}

			<div className="tenant-results-card mx-auto max-w-[1256px] bg-white rounded-b px-3 py-6">
				{/* Side-by-side on desktop: winner cards fixed sidebar + table */}
				<div className="flex flex-col md:flex-row gap-4 items-start">
					{/* Winner cards sidebar + adjustments (desktop) */}
					<div className="flex flex-row md:flex-col gap-2 w-full md:w-[220px] shrink-0">
						{gridsPresent.map((gridId) => (
							<WinnerCard
								key={gridId}
								gridId={gridId}
								row={getWinner(gridId)}
								sessionType={sessionType}
								awardRows={getAwardRowsForGrid(gridId)}
								poleRow={getPoleForGrid(gridId)}
							/>
						))}
						{/* Point adjustments — desktop only, under bonus card */}
						{pointAdjustments.length > 0 && (
							<div className="hidden md:block border border-black/10 rounded-sm overflow-hidden">
								<div className="tenant-results-subrow bg-f1-bg-silver px-4 py-2 border-b border-black/10">
									<p className="text-xs font-bold uppercase tracking-wide text-f1-lighterCarbon">
										Penalidades
									</p>
								</div>
								{pointAdjustments.map((p) => {
									const driver = rows.find(
										(r) => r.id === p.driverId,
									);
									if (!driver) return null;
									return (
										<div
											key={p.driverId}
											className="tenant-results-row-even flex items-center justify-between px-4 py-2 border-b border-black/10 last:border-b-0 bg-white"
										>
											<div className="flex items-center gap-2 min-w-0">
												<span
													className="w-1 self-stretch shrink-0"
													style={{
														backgroundColor:
															driver.teamColor ??
															driver.gridColor,
													}}
												/>
												<div className="min-w-0">
													<p className="text-xs font-semibold uppercase">
														{driver.name}
													</p>
													{p.reason && (
														<p className="text-[10px] text-f1-lighterCarbon">
															{p.reason}
														</p>
													)}
												</div>
											</div>
											<span className="text-xs font-bold text-f1-red shrink-0 ml-2">
												{p.points > 0
													? `+${p.points}`
													: p.points}{" "}
												pts
											</span>
										</div>
									);
								})}
							</div>
						)}
					</div>

					{/* Results table */}
					<div className="w-full md:flex-1 md:w-auto min-w-0 flex flex-col">
						<div className="overflow-x-auto border border-black/10 rounded-sm">
							<table className="min-w-full text-sm">
								<thead>
									<tr className="text-xs uppercase tracking-wide text-f1-lighterCarbon border-b border-black/10">
										<th className="py-2 px-4 text-left w-16">
											Pos
										</th>
										<th className="py-2 px-4 text-left">
											Piloto
										</th>
										<th className="py-2 px-4 text-left hidden md:table-cell">
											Equipe
										</th>
										<th className="py-2 px-4 text-right">
											Pts
										</th>
									</tr>
								</thead>
								<tbody>
									{rows.map((row, index) => (
										<tr
											key={row.id}
											className={
												index % 2 === 0
													? "tenant-results-row-even bg-white"
													: "tenant-results-row-odd bg-f1-bg-silver"
											}
										>
											<td className="py-3 px-4">
												<div className="flex items-center gap-1.5">
													<span className="font-bold w-5 flex justify-center">
														{row.overallPos}
													</span>
													{sessionType === "race" &&
														(row.positionChange ===
															null ||
														row.positionChange ===
															0 ? (
															<span className="text-f1-lighterCarbon text-xs w-6 flex justify-center">
																–
															</span>
														) : row.positionChange >
														  0 ? (
															<span className="text-green-600 text-xs font-bold w-6 flex justify-center items-center gap-[3px]">
																<span>▲</span><span>{row.positionChange}</span>
															</span>
														) : (
															<span className="text-f1-red text-xs font-bold w-6 flex justify-center items-center gap-[3px]">
																<span>▼</span><span>{Math.abs(row.positionChange)}</span>
															</span>
														))}
												</div>
											</td>

											<td className="py-3 px-4">
												<div className="flex items-center gap-1">
													<span
														className={`mx-1 w-1 shrink-0 md:h-3.5 md:self-center ${row.isNC || row.isReserve || (row.isFastestLap && sessionType === "race") ? "h-13 self-center" : "h-8 self-center"}`}
														style={{
															backgroundColor:
																row.teamColor ??
																row.gridColor,
														}}
													/>
													<div className="flex flex-col md:flex-row md:flex-wrap md:items-center md:gap-2">
														<span className="text-sm font-semibold uppercase leading-tight md:inline-block md:translate-y-px">
															{row.name}
														</span>
														{(row.isNC ||
															row.isReserve ||
															(row.isFastestLap &&
																sessionType ===
																	"race")) && (
															<div className="flex items-center gap-1 mt-0.5 md:mt-0">
																{row.isNC && (
																	<span className="bg-gray-400 text-white text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded">
																		<span className="inline-block max-md:translate-x-px max-md:translate-y-px">NC</span>
																	</span>
																)}
																{row.isReserve && (
																	<span className="bg-f1-lighterCarbon text-white text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded">
																		<span className="inline-block max-md:translate-x-px max-md:translate-y-px">Res</span>
																	</span>
																)}
																{row.isFastestLap &&
																	sessionType ===
																		"race" && (
																		<span className="bg-f1-purple text-white text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded">
																			<span className="inline-block max-md:translate-x-px max-md:translate-y-px">VR</span>
																		</span>
																	)}
															</div>
														)}
														<p className="text-xs text-f1-lighterCarbon mt-0.5 translate-y-[3px] md:hidden">
															{row.teamName}
														</p>
													</div>
												</div>
											</td>

											<td className="py-3 px-4 text-sm text-f1-lighterCarbon hidden md:table-cell">
												{row.teamName}
											</td>

											<td className="py-3 px-4 font-bold text-sm text-right">
												<span className="md:inline-block md:translate-y-px">{row.points}</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						{/* Note — desktop only, always pinned under the table */}
						<p className="hidden md:block text-[10px] text-f1-lighterCarbon mt-1.5 text-right italic">
							{(() => {
								const awardLabels = [
									...new Set(
										gridsPresent.flatMap((gId) =>
											resolveRaceAwards(gId).map(
												(a) => a.label,
											),
										),
									),
								];
								const bonuses = [
									"Pole",
									...awardLabels,
									...(gridsPresent.some(
										(gId) =>
											(getGridConfig(gId)?.pointSystem
												?.presenceBonus ?? 0) > 0,
									)
										? ["Participação"]
										: []),
								];
								const reservesSkipped =
									gridsPresent.some(
										(gId) =>
											!(
												getGridConfig(gId)
													?.reservesEarnPoints ??
												false
											),
									) && rows.some((r) => r.isReserve);
								const base = `* Apenas pontos da ${sessionType === "race" ? "corrida" : sessionType === "sprint" ? "sprint" : "sessão"}. Bônus (${bonuses.join(", ")}) e penalidades não estão inclusos.`;
								return reservesSkipped
									? `${base} Reservas não pontuam — pontos passam ao próximo titular.`
									: base;
							})()}
						</p>
					</div>
				</div>

				{/* Point adjustments — mobile only */}
				{pointAdjustments.length > 0 && (
					<div className="mt-4 md:hidden border border-black/10 rounded-sm overflow-hidden">
						<div className="tenant-results-subrow bg-f1-bg-silver px-4 py-2 border-b border-black/10">
							<p className="text-xs font-bold uppercase tracking-wide text-f1-lighterCarbon">
								Penalidades
							</p>
						</div>
						{pointAdjustments.map((p) => {
							const driver = rows.find(
								(r) => r.id === p.driverId,
							);
							if (!driver) return null;
							return (
								<div
									key={p.driverId}
									className="tenant-results-row-even flex items-center justify-between px-4 py-2 border-b border-black/10 last:border-b-0 bg-white"
								>
									<div className="flex items-center gap-2 min-w-0">
										<span
											className="w-1 self-stretch shrink-0"
											style={{
												backgroundColor:
													driver.teamColor ??
													driver.gridColor,
											}}
										/>
										<div className="min-w-0">
											<p className="text-xs font-semibold uppercase">
												{driver.name}
											</p>
											{p.reason && (
												<p className="text-[10px] text-f1-lighterCarbon">
													{p.reason}
												</p>
											)}
										</div>
									</div>
									<span className="text-xs font-bold text-f1-red shrink-0 ml-2">
										{p.points > 0
											? `+${p.points}`
											: p.points}{" "}
										pts
									</span>
								</div>
							);
						})}
					</div>
				)}
				{/* Note — mobile only, after penalidades */}
				<p className="md:hidden text-[10px] text-f1-lighterCarbon mt-1.5 text-right italic">
					{(() => {
						const awardLabels = [
							...new Set(
								gridsPresent.flatMap((gId) =>
									resolveRaceAwards(gId).map((a) => a.label),
								),
							),
						];
						const bonuses = [
							"Pole",
							...awardLabels,
							...(gridsPresent.some(
								(gId) =>
									(getGridConfig(gId)?.pointSystem
										?.presenceBonus ?? 0) > 0,
							)
								? ["Participação"]
								: []),
						];
						const reservesSkipped =
							gridsPresent.some(
								(gId) =>
									!(
										getGridConfig(gId)
											?.reservesEarnPoints ?? false
									),
							) && rows.some((r) => r.isReserve);
						const base = `* Apenas pontos da ${sessionType === "race" ? "corrida" : sessionType === "sprint" ? "sprint" : "sessão"}. Bônus (${bonuses.join(", ")}) e penalidades não estão inclusos.`;
						return reservesSkipped
							? `${base} Reservas não pontuam — pontos passam ao próximo titular.`
							: base;
					})()}
				</p>
			</div>
		</section>
	);
}

function RaceHeader({
	calendarData,
	calendarId,
	link,
}: {
	calendarData: SessionResultProps["calendarData"];
	calendarId?: string | null;
	link?: string;
}) {
	const { seasons } = useSeasons();
	const { getSeasonForCalendar } = useCalendarSeasons();
	const { getTrack } = useTracks();
	if (!calendarData) return null;
	const gridLabel =
		getGridConfig(calendarData.grid)?.label ?? calendarData.grid;
	const gridColor =
		getGridConfig(calendarData.grid)?.primaryColor ?? "#eb1c24";
	const seasonId = calendarId ? getSeasonForCalendar(calendarId) : null;
	const season = seasonId ? seasons.find((s) => s.id === seasonId) : null;
	const formattedDate = calendarData.date
		? (() => {
				const raw = format(
					new Date(calendarData.date),
					"dd 'de' MMMM 'de' yyyy",
					{ locale: ptBR },
				);
				const parts = raw.split(" ");
				if (parts[2])
					parts[2] =
						parts[2].charAt(0).toUpperCase() + parts[2].slice(1);
				return parts.join(" ");
			})()
		: null;

	return (
		<div className="tenant-results-bg bg-f1-bg-silver">
			<div className="tenant-results-card mx-auto max-w-[1256px] px-3 bg-white rounded-t p-4">
				<div
					className="border-t-8 border-r-8 rounded-tr-3xl pt-3"
					style={{ borderColor: gridColor }}
				>
					<div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
						<div className="flex gap-3">
							{calendarData.trackId && (
								<CountryFlag
									code={getTrack(calendarData.trackId)?.countryCode}
									className="rounded w-[86px] h-[48px] border border-black/20 shrink-0"
								/>
							)}
							<div className="flex flex-col gap-2">
								<div className="flex items-center gap-2 flex-wrap leading-3">
									{season && (
										<>
											<span className="text-xs font-bold uppercase tracking-wider text-f1-lighterCarbon leading-3">
												{season.name}
											</span>
										</>
									)}
									<span className="tenant-results-dot text-black/20">·</span>
									<span className="text-xs font-bold uppercase tracking-wider text-f1-lighterCarbon leading-3">
										{calendarData.round}
									</span>
									{calendarData.sprint && (
										<>
											<span className="tenant-results-dot text-black/20">
												·
											</span>
											<span className="text-xs font-bold uppercase tracking-wider text-f1-red leading-3">
												Sprint
											</span>
										</>
									)}
								</div>
								<h1 className="font-extrabold text-3xl md:text-4xl uppercase tracking-wider leading-7 -ml-[2px]">
									{getTrack(calendarData.trackId)?.name}
								</h1>
								{getTrack(calendarData.trackId)?.location && (
									<p className="text-f1-lighterCarbon text-sm leading-3">
										{getTrack(calendarData.trackId)?.location}
									</p>
								)}
								{formattedDate && (
									<p className="text-f1-lighterCarbon text-xs leading-1.5">
										{formattedDate}
									</p>
								)}
								{/* Button on mobile — aligned with text */}
								{link && (
									<a
										href={link}
										target="_blank"
										rel="noopener noreferrer"
										className="md:hidden inline-flex items-center gap-2 px-3 py-2 mt-4 md:mt-1 text-xs font-bold uppercase tracking-wider rounded-sm self-start border transition-all duration-150"
										style={{
											backgroundColor: gridColor,
											borderColor: gridColor,
											color: "white",
										}}
									>
										▶︎ Assistir corrida
									</a>
								)}
							</div>
						</div>
						{/* Button on desktop — right side */}
						{link && (
							<a
								href={link}
								target="_blank"
								rel="noopener noreferrer"
								className="hidden md:inline-flex items-center mr-3 gap-2 px-3 py-3 text-xs font-bold uppercase tracking-wider rounded-sm shrink-0 self-start border transition-all duration-150"
								style={{
									backgroundColor: gridColor,
									borderColor: gridColor,
									color: "white",
								}}
								onMouseEnter={(e) => {
									const el =
										e.currentTarget as HTMLAnchorElement;
									el.style.backgroundColor = "transparent";
									el.style.color = gridColor;
								}}
								onMouseLeave={(e) => {
									const el =
										e.currentTarget as HTMLAnchorElement;
									el.style.backgroundColor = gridColor;
									el.style.color = "white";
								}}
							>
								▶︎ Assistir corrida
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export function SessionResult({
	calendarId,
	calendarData: calData,
}: SessionResultProps) {
	const [firebaseData, setFirebaseData] = useState<FirebaseResult | null>(
		null,
	);
	const [loading, setLoading] = useState(false);
	const [activeTab, setActiveTab] = useState<"race" | "sprint">("race");
	const [error, setError] = useState<string | null>(null);
	const [pointAdjustments, setPointAdjustments] = useState<
		{ driverId: string; points: number; reason: string }[]
	>([]);
	const [driverSexMap, setDriverSexMap] = useState<Record<string, string>>(
		{},
	);

	const { drivers: driversData } = useFirebaseDrivers();
	const { seasons } = useSeasons();
	const { getSeasonForCalendar } = useCalendarSeasons();

	// Map of bannerId → calendarId from Firestore
	const [bannerCalendarMap, setBannerCalendarMap] = useState<
		Record<string, string>
	>({});
	const [firestoreBanners, setFirestoreBanners] = useState<any[]>([]);

	useEffect(() => {
		getDocs(collection(db, "banner_calendar"))
			.then((snap) => {
				const map: Record<string, string> = {};
				snap.forEach((d) => {
					map[d.id] = d.data().calendarId;
				});
				setBannerCalendarMap(map);
			})
			.catch(() => {});
	}, []);

	useEffect(() => {
		getDocs(query(collection(db, "banners"), where("deleted", "==", false)))
			.then((snap) => {
				setFirestoreBanners(
					snap.docs.map((d) => ({
						id: d.id,
						...d.data(),
						photo: d.data().photoUrl ? { url: d.data().photoUrl } : null,
					})),
				);
			})
			.catch(() => {});
	}, []);

	useEffect(() => {
		if (!calendarId) {
			setFirebaseData(null);
			return;
		}
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const [snap, adjSnap, driversSnap] = await Promise.all([
					getDoc(doc(db, "race_results", calendarId)),
					getDoc(doc(db, "point_adjustments", calendarId)),
					getDocs(collection(db, "drivers")),
				]);
				setFirebaseData(
					snap.exists() ? (snap.data() as FirebaseResult) : null,
				);
				setPointAdjustments(
					adjSnap.exists() ? (adjSnap.data().adjustments ?? []) : [],
				);
				// Build driver sex map
				const sexMap: Record<string, string> = {};
				driversSnap.forEach((d) => {
					const driverId = d.id;
					const sex = d.data().sex;
					if (sex) sexMap[driverId] = sex;
				});
				setDriverSexMap(sexMap);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [calendarId]);

	// Banners linked to this calendar
	const linkedBanners = firestoreBanners.filter(
		(b) => bannerCalendarMap[b.id] === calendarId,
	);

	if (!calendarId) {
		return (
			<div className="px-3 my-20 md:my-32 text-center">
				<h3 className="text-xl uppercase tracking-wide text-f1-lighterCarbon">
					Selecione uma corrida no calendário acima
				</h3>
			</div>
		);
	}

	if (loading) {
		return (
			<>
				<RaceHeader calendarData={calData} calendarId={calendarId} />
				<div className="my-12 text-center" role="status">
					<div className="animate-pulse space-y-3 max-w-xl mx-auto px-3">
						<div className="h-4 bg-f1-bg-silver rounded w-1/3 mx-auto" />
						<div className="h-3 bg-f1-bg-silver rounded w-1/2 mx-auto" />
					</div>
				</div>
			</>
		);
	}

	if (error) {
		return (
			<>
				<RaceHeader calendarData={calData} calendarId={calendarId} />
				<div className="my-8 text-center px-3">
					<p className="text-f1-red font-bold text-sm">
						Erro ao carregar: {error}
					</p>
				</div>
			</>
		);
	}

	if (!firebaseData) {
		return (
			<>
				<RaceHeader calendarData={calData} calendarId={calendarId} />
				<div className="my-12 text-center px-3">
					<p className="font-f1Title uppercase tracking-widest text-f1-lighterCarbon text-sm">
						Nenhum resultado disponível
					</p>
				</div>
			</>
		);
	}

	const hasSprint = !!calData?.sprint;
	const hasSprintData = !!firebaseData.sprintResults?.some(Boolean);
	const hasRaceData = !!firebaseData.results?.some(Boolean);
	const drivers = driversData;

	const calGrid = calData?.grid ?? "";
	const gridColor = getGridConfig(calGrid)?.primaryColor ?? "#eb1c24";
	const gridAwards = resolveRaceAwards(calGrid);
	const makeAwardWinners = (prefix = "") =>
		Object.fromEntries(
			gridAwards.map((a) => {
				const key = prefix
					? `${prefix}${a.id.charAt(0).toUpperCase()}${a.id.slice(1)}`
					: a.id;
				return [a.id, (firebaseData as Record<string, any>)[key] ?? ""];
			}),
		);
	const raceAwardWinners = makeAwardWinners();
	const sprintAwardWinners = makeAwardWinners("sprint");

	return (
		<>
			<RaceHeader
				calendarData={calData}
				calendarId={calendarId}
				link={firebaseData.link}
			/>

			<div className="tenant-results-bg bg-f1-bg-silver pb-10">
				{hasSprint && (
					<div className="mx-auto max-w-screen-xl px-0 md:px-3">
						<div className="tenant-results-tab-bar bg-white border-b border-black/10">
							<div className="flex gap-0">
								<button
									onClick={() => setActiveTab("race")}
									className="px-6 py-3 text-sm font-bold uppercase tracking-wider cursor-pointer transition-all duration-150 border-b-3 -mb-px"
									style={{
										borderColor:
											activeTab === "race"
												? gridColor
												: "transparent",
										color:
											activeTab === "race"
												? "var(--color-f1-text, #15151e)"
												: "#9ca3af",
									}}
								>
									Corrida
								</button>
								<button
									onClick={() => setActiveTab("sprint")}
									className="px-6 py-3 text-sm font-bold uppercase tracking-wider cursor-pointer transition-all duration-150 border-b-3 -mb-px"
									style={{
										borderColor:
											activeTab === "sprint"
												? gridColor
												: "transparent",
										color:
											activeTab === "sprint"
												? "var(--color-f1-text, #15151e)"
												: "#9ca3af",
									}}
								>
									Sprint
								</button>
							</div>
						</div>
					</div>
				)}

				{hasSprint && activeTab === "sprint" ? (
					hasSprintData ? (
						<ResultsSection
							label="Sprint"
							raceOrder={firebaseData.sprintResults ?? []}
							qualyOrder={firebaseData.sprintResultsQualy ?? []}
							awardWinners={sprintAwardWinners}
							penalties={firebaseData.sprintPenalties ?? []}
							pointAdjustments={pointAdjustments}
							drivers={drivers}
							sessionType="sprint"
							calGrid={calGrid}
							driverSnapshots={firebaseData.driverSnapshots}
							ncDriverIds={firebaseData.sprintNcDriverIds}
							driverSexMap={driverSexMap}
						/>
					) : (
						<div className="tenant-results-card mx-auto max-w-[1256px] bg-white rounded-b px-3 py-16 text-center">
							<p className="text-f1-lighterCarbon text-sm">
								Resultado da Sprint não disponível para esta
								etapa.
							</p>
						</div>
					)
				) : hasRaceData ? (
					<ResultsSection
						label="Corrida Principal"
						raceOrder={firebaseData.results ?? []}
						qualyOrder={firebaseData.resultsQualy ?? []}
						awardWinners={raceAwardWinners}
						penalties={firebaseData.penalties ?? []}
						pointAdjustments={pointAdjustments}
						drivers={drivers}
						sessionType="race"
						calGrid={calGrid}
						driverSnapshots={firebaseData.driverSnapshots}
						ncDriverIds={firebaseData.ncDriverIds}
						driverSexMap={driverSexMap}
					/>
				) : (
					<div className="tenant-results-card mx-auto max-w-[1256px] bg-white rounded-b px-3 py-16 text-center">
						<p className="text-f1-lighterCarbon text-sm">
							Resultado da Corrida não disponível para esta etapa.
						</p>
					</div>
				)}

				{/* Linked news */}
				{linkedBanners.length > 0 && (
					<div className="mx-auto max-w-screen-xl px-3 pb-8">
						<div className="pt-6">
							<p className="font-semibold text-2xl leading-none md:text-3xl tracking-wide">
								Notícias
							</p>
							<div className="w-full h-2 bg-f1-text mt-4 mb-5"></div>
							<div className="flex flex-col divide-y divide-black/10">
								{linkedBanners.map((banner) => (
									<div
										key={banner.id}
										className="flex gap-4 py-5 items-start"
									>
										{banner.photo?.url && (
											<div className="shrink-0 w-36 sm:w-48 overflow-hidden rounded-sm">
												<img
													src={banner.photo.url}
													alt={banner.content ?? ""}
													className="w-full h-auto object-contain"
												/>
											</div>
										)}
										<div className="flex flex-col gap-2 min-w-0 justify-center">
											{banner.title && (
												<p
													style={{
														color: "var(--color-brand-primary)",
													}}
													className="text-sm md:text-base font-bold uppercase tracking-wider md:tracking-wide leading-none"
												>
													{banner.title}
												</p>
											)}
											<p className="text-sm md:text-base font-semibold leading-snug text-f1-text">
												{banner.content}
											</p>
											{banner.link && (
												<a
													href={banner.link}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide mt-1 hover:underline"
													style={{
														color: "var(--color-brand-primary)",
													}}
												>
													↗︎ Ver mais
												</a>
											)}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
