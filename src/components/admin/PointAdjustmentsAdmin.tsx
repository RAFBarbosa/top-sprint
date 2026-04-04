import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { setDoc, getDocs, getDoc, collection, doc } from "firebase/firestore";
import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react";
import { db } from "../../lib/adminClient";
import { useGetDriversQuery, useGetCalendarsRegistrationQuery } from "../../graphql/generated";
import { useSeasons } from "../../contexts/SeasonsContext";
import { useCalendarSeasons } from "../../contexts/CalendarSeasonsContext";
import { useDriverProfiles } from "../../contexts/DriverProfilesContext";
import { useCalculateCards } from "../../shared/hooks/useCalculateCards";
import { useCalculateDriverStats } from "../../shared/hooks/useCalculateDriverStats";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export interface PointAdjustment {
	id: string;
	driverId: string;
	points: number; // positive = add, negative = remove
	reason: string;
}

export function PointAdjustmentsAdmin({ gridId: gridIdProp }: { gridId?: string } = {}) {
	const { gridId: gridIdParam } = useParams<{ gridId: string }>();
	const gridId = gridIdProp ?? gridIdParam;
	const { data: driversData } = useGetDriversQuery();
	const { data: calendarsData } = useGetCalendarsRegistrationQuery({ fetchPolicy: "network-only" });
	const { seasons } = useSeasons();
	const { mappings } = useCalendarSeasons();
	const { profiles, isInGrid } = useDriverProfiles();
	const { triggerForGrid: triggerCardsForGrid } = useCalculateCards();
	const { triggerForGrid: triggerStatsForGrid } = useCalculateDriverStats();

	// Derive seasons available for this grid from its calendars
	const gridCalendarIds = new Set(
		(calendarsData?.calendars ?? [])
			.filter((c) => c.grid === gridId)
			.map((c) => c.id),
	);
	const gridSeasonIds = new Set(
		mappings.filter((m) => gridCalendarIds.has(m.calendarId)).map((m) => m.seasonId),
	);
	const gridSeasons = seasons.filter((s) => gridSeasonIds.has(s.id));

	const [selectedSeasonId, setSelectedSeasonId] = useState<string>("");

	// Auto-select when exactly one season is linked to this grid
	useEffect(() => {
		if (gridSeasons.length === 1 && selectedSeasonId !== gridSeasons[0].id) {
			setSelectedSeasonId(gridSeasons[0].id);
		}
	}, [gridSeasons.map((s) => s.id).join(",")]);

	const selectedSeason = gridSeasons.find((s) => s.id === selectedSeasonId) ?? null;

	// All adjustments across all calendars, keyed by calendarId
	const [allAdjustments, setAllAdjustments] = useState<Record<string, PointAdjustment[]>>({});
	const [loading, setLoading] = useState(true);

	// Selected calendar for editing
	const [selectedCalendarId, setSelectedCalendarId] = useState<string>("");

	// Form state
	const [driverQuery, setDriverQuery] = useState("");
	const [selectedDriverId, setSelectedDriverId] = useState("");
	const [points, setPoints] = useState<number>(0);
	const [reason, setReason] = useState("");
	const [editId, setEditId] = useState<string | null>(null);
	const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
	const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message: string }>({ type: "idle", message: "" });
	const [raceDriverIds, setRaceDriverIds] = useState<Set<string> | null>(null);

	useEffect(() => {
		if (!gridId || !selectedSeason) return;
		const load = async () => {
			setLoading(true);
			try {
				const snap = await getDocs(collection(db, "point_adjustments"));
				const map: Record<string, PointAdjustment[]> = {};
				snap.forEach((d) => { map[d.id] = d.data().adjustments ?? []; });
				setAllAdjustments(map);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, [gridId, selectedSeason?.id]);

	// Reset calendar selection when season changes
	useEffect(() => {
		setSelectedCalendarId("");
		resetForm();
	}, [selectedSeasonId]);

	// Fetch race participants for selected calendar
	useEffect(() => {
		if (!selectedCalendarId) { setRaceDriverIds(null); return; }
		const load = async () => {
			try {
				const snap = await getDoc(doc(db, "race_results", selectedCalendarId));
				if (!snap.exists()) { setRaceDriverIds(null); return; }
				const d = snap.data();
				const ids = new Set<string>([
					...(d.results ?? []),
					...(d.resultsQualy ?? []),
					...(d.sprintResults ?? []),
					...(d.sprintResultsQualy ?? []),
					...(d.ncDriverIds ?? []),
					...(d.sprintNcDriverIds ?? []),
				].filter(Boolean));
				setRaceDriverIds(ids.size > 0 ? ids : null);
			} catch (e) {
				setRaceDriverIds(null);
			}
		};
		load();
	}, [selectedCalendarId]);

	const gridDrivers = (driversData?.drivers ?? []).filter((d) => {
		if (d.deleted) return false;
		if (raceDriverIds && !raceDriverIds.has(d.id)) return false;
		return isInGrid(d.id, gridId ?? "") || (!profiles[d.id] && d.grid === gridId);
	});

	const filteredDrivers = gridDrivers.filter(
		(d) => driverQuery === "" || d.name?.toLowerCase().includes(driverQuery.toLowerCase()),
	);

	const selectedDriver = gridDrivers.find((d) => d.id === selectedDriverId);

	// Calendars for this grid + selected season
	const seasonCalendarIds = new Set(
		mappings.filter((m) => m.seasonId === selectedSeason?.id).map((m) => m.calendarId),
	);
	const gridCalendars = (calendarsData?.calendars ?? [])
		.filter((c) => c.grid === gridId && seasonCalendarIds.has(c.id))
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	const currentAdjustments = allAdjustments[selectedCalendarId] ?? [];

	const saveAdjustments = async (next: PointAdjustment[]) => {
		if (!selectedCalendarId) return;
		setStatus({ type: "loading", message: "Salvando..." });
		try {
			await setDoc(doc(db, "point_adjustments", selectedCalendarId), {
				adjustments: next,
				grid: gridId ?? "",
				calendarId: selectedCalendarId,
			});
			setAllAdjustments((prev) => ({ ...prev, [selectedCalendarId]: next }));
			setStatus({ type: "success", message: "Salvo!" });
			setTimeout(() => setStatus({ type: "idle", message: "" }), 2000);
			if (gridId) {
				triggerCardsForGrid(gridId).catch(console.error);
				triggerStatsForGrid(gridId).catch(console.error);
			}
		} catch (e: any) {
			setStatus({ type: "error", message: "Erro: " + e.message });
		}
	};

	const resetForm = () => {
		setSelectedDriverId("");
		setDriverQuery("");
		setPoints(0);
		setReason("");
		setEditId(null);
	};

	const handleSave = async () => {
		if (!selectedDriverId || points === 0 || !reason.trim()) return;
		const next = editId
			? currentAdjustments.map((a) =>
				a.id === editId
					? { ...a, driverId: selectedDriverId, points, reason: reason.trim() }
					: a,
			)
			: [...currentAdjustments, { id: crypto.randomUUID(), driverId: selectedDriverId, points, reason: reason.trim() }];
		await saveAdjustments(next);
		resetForm();
	};

	const handleEdit = (adj: PointAdjustment) => {
		const driver = gridDrivers.find((d) => d.id === adj.driverId);
		setEditId(adj.id);
		setSelectedDriverId(adj.driverId);
		setDriverQuery(driver?.name ?? "");
		setPoints(adj.points);
		setReason(adj.reason);
	};

	const handleDelete = async (id: string) => {
		await saveAdjustments(currentAdjustments.filter((a) => a.id !== id));
		if (editId === id) resetForm();
	};

	const handleSelectCalendar = (calId: string) => {
		setSelectedCalendarId(calId);
		resetForm();
		setStatus({ type: "idle", message: "" });
	};

	if (gridSeasons.length === 0) {
		return <p className="text-f1-lighterCarbon text-sm">Nenhuma temporada encontrada para os calendários deste grid.</p>;
	}

	const formatDate = (dateStr: string) =>
		format(new Date(dateStr), "dd MMM", { locale: ptBR });

	return (
		<>
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-bold">Ajustes de Pontos</h2>
				{selectedSeason && (
					<p className="text-sm text-f1-lighterCarbon mt-1">
						Temporada: <span className="font-semibold text-f1-text">{selectedSeason.name}</span>
					</p>
				)}
			</div>

			{/* Season picker — only shown when multiple seasons exist for this grid */}
			{gridSeasons.length > 1 && (
				<div>
					<label className="text-xs font-bold text-f1-lighterCarbon uppercase tracking-wide block mb-2">
						Temporada
					</label>
					<select
						value={selectedSeasonId}
						onChange={(e) => setSelectedSeasonId(e.target.value)}
						className="w-full max-w-xs px-2 border rounded h-9 text-sm cursor-pointer"
					>
						<option value="">— Selecione uma temporada —</option>
						{gridSeasons.map((s) => (
							<option key={s.id} value={s.id}>
								{s.name}
							</option>
						))}
					</select>
				</div>
			)}

			{selectedSeason && (
				<>
					{/* Calendar picker */}
					<div>
						<label className="text-xs font-bold text-f1-lighterCarbon uppercase tracking-wide block mb-2">
							Etapa
						</label>
						{loading ? (
							<p className="text-sm text-f1-lighterCarbon">Carregando...</p>
						) : gridCalendars.length === 0 ? (
							<p className="text-sm text-f1-lighterCarbon">Nenhuma etapa encontrada para esta temporada.</p>
						) : (
							<div className="flex flex-wrap gap-2">
								{gridCalendars.map((cal) => {
									const adjCount = allAdjustments[cal.id]?.length ?? 0;
									return (
										<button
											key={cal.id}
											type="button"
											onClick={() => handleSelectCalendar(cal.id)}
											className={`px-3 py-1.5 rounded border text-sm transition-colors cursor-pointer ${
												selectedCalendarId === cal.id
													? "bg-f1-red text-white border-f1-red"
													: "border-black/20 hover:bg-f1-red/10"
											}`}
										>
											{cal.track?.name ?? cal.round}
											{cal.date && <span className="ml-1 opacity-70">({formatDate(cal.date)})</span>}
											{adjCount > 0 && (
											<span className={`ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold leading-none tabular-nums ${selectedCalendarId === cal.id ? "bg-white text-f1-red" : "bg-f1-red text-white"}`}>
												{adjCount}
											</span>
										)}
										</button>
									);
								})}
							</div>
						)}
					</div>

					{selectedCalendarId && (
						<>
							{/* Form */}
							<div className="border border-black/10 rounded-lg p-4 space-y-4">
								<h3 className="font-semibold text-sm">{editId ? "Editar Ajuste" : "Novo Ajuste"}</h3>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div className="relative">
										<label className="text-xs text-f1-lighterCarbon block mb-1">Piloto</label>
										<input
											type="text"
											className="w-full p-2 border rounded h-10 text-sm"
											placeholder="Buscar piloto..."
											value={selectedDriver ? selectedDriver.name : driverQuery}
											onChange={(e) => { setDriverQuery(e.target.value); setSelectedDriverId(""); }}
										/>
										{driverQuery && !selectedDriverId && filteredDrivers.length > 0 && (
											<ul className="absolute z-20 mt-1 w-full bg-white border rounded shadow max-h-48 overflow-y-auto text-sm">
												{filteredDrivers.map((d) => (
													<li
														key={d.id}
														className="px-3 py-2 hover:bg-f1-red/10 cursor-pointer"
														onClick={() => { setSelectedDriverId(d.id); setDriverQuery(""); }}
													>
														{d.name}
													</li>
												))}
											</ul>
										)}
									</div>
									<div>
										<label className="text-xs text-f1-lighterCarbon block mb-1">
											Pontos <span className="font-normal">(negativo = penalidade)</span>
										</label>
										<input
											type="number"
											className="w-full p-2 border rounded h-10 text-sm"
											value={points === 0 ? "" : points}
											placeholder="Ex: -5 ou +3"
											onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
										/>
									</div>
									<div>
										<label className="text-xs text-f1-lighterCarbon block mb-1">Motivo</label>
										<input
											type="text"
											className="w-full p-2 border rounded h-10 text-sm"
											placeholder="Ex: Penalidade Comissários"
											value={reason}
											onChange={(e) => setReason(e.target.value)}
										/>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<button
										type="button"
										onClick={handleSave}
										disabled={!selectedDriverId || points === 0 || !reason.trim() || status.type === "loading"}
										className="bg-f1-red text-white px-4 py-2 rounded text-sm hover:bg-f1-red/80 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
									>
										{editId ? "Salvar" : "Adicionar"}
									</button>
									{editId && (
										<button
											type="button"
											onClick={resetForm}
											className="px-4 py-2 rounded text-sm border border-black/20 hover:bg-black/5"
										>
											Cancelar
										</button>
									)}
									{status.message && (
										<span className={`text-sm font-medium ${status.type === "error" ? "text-f1-red" : status.type === "success" ? "text-green-600" : "text-f1-lighterCarbon"}`}>
											{status.message}
										</span>
									)}
								</div>
							</div>

							{/* List */}
							{currentAdjustments.length === 0 ? (
								<p className="text-sm text-f1-lighterCarbon">Nenhum ajuste para esta etapa.</p>
							) : (
								<div className="border border-black/10 rounded-lg overflow-hidden">
									<table className="min-w-full text-sm">
										<thead>
											<tr className="text-xs uppercase tracking-wide text-f1-lighterCarbon border-b border-black/10 bg-f1-bg-silver">
												<th className="py-2 px-4 text-left">Piloto</th>
												<th className="py-2 px-4 text-left">Motivo</th>
												<th className="py-2 px-4 text-right">Pts</th>
												<th className="py-2 px-4 text-right w-20"></th>
											</tr>
										</thead>
										<tbody>
											{currentAdjustments.map((adj, i) => {
												const driver = gridDrivers.find((d) => d.id === adj.driverId);
												return (
													<tr
														key={adj.id}
														onClick={() => editId === adj.id ? resetForm() : handleEdit(adj)}
														className={`cursor-pointer transition-colors ${editId === adj.id ? "ring-2 ring-inset ring-f1-red/40 bg-f1-red/5" : `${i % 2 === 0 ? "bg-white" : "bg-f1-bg-silver"} hover:bg-f1-red/10`}`}
													>
														<td className="py-2 px-4 font-medium">{driver?.name ?? adj.driverId}</td>
														<td className="py-2 px-4 text-f1-lighterCarbon">{adj.reason}</td>
														<td className={`py-2 px-4 text-right font-bold ${adj.points > 0 ? "text-green-600" : "text-f1-red"}`}>
															{adj.points > 0 ? `+${adj.points}` : adj.points}
														</td>
														<td className="py-2 px-4 text-right">
															<button
																type="button"
																onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(adj.id); }}
																className="text-f1-lighterCarbon hover:text-f1-red hover:bg-f1-red/10 rounded p-1 transition-colors cursor-pointer"
																title="Remover"
															>
																<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
																</svg>
															</button>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							)}
						</>
					)}
				</>
			)}
		</div>

		{/* Delete confirmation modal */}
		<Dialog open={confirmDeleteId !== null} onClose={() => setConfirmDeleteId(null)} className="relative z-50">
			<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<DialogPanel className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full space-y-4">
					<DialogTitle className="text-lg font-bold">Remover Ajuste</DialogTitle>
					<Description className="text-sm text-f1-lighterCarbon">
						Tem certeza que deseja remover este ajuste? Esta ação não pode ser desfeita.
					</Description>
					<div className="flex justify-end gap-3">
						<button
							type="button"
							onClick={() => setConfirmDeleteId(null)}
							className="px-4 py-2 rounded text-sm border border-black/20 hover:bg-black/5 cursor-pointer"
						>
							Cancelar
						</button>
						<button
							type="button"
							onClick={async () => {
								if (confirmDeleteId) await handleDelete(confirmDeleteId);
								setConfirmDeleteId(null);
							}}
							className="px-4 py-2 rounded text-sm bg-f1-red text-white hover:bg-f1-red/80 cursor-pointer"
						>
							Remover
						</button>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
		</>
	);
}
