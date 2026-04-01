import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { useGetDriversQuery, useGetCalendarsRegistrationQuery } from "../../graphql/generated";
import { useSeasons } from "../../contexts/SeasonsContext";
import { useCalendarSeasons } from "../../contexts/CalendarSeasonsContext";
import { useDriverProfiles } from "../../contexts/DriverProfilesContext";
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

	const activeSeason = seasons.find((s) => s.active);

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
	const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message: string }>({ type: "idle", message: "" });

	useEffect(() => {
		if (!gridId || !activeSeason) return;
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
	}, [gridId, activeSeason?.id]);

	const gridDrivers = (driversData?.drivers ?? []).filter((d) => {
		if (d.deleted) return false;
		return isInGrid(d.id, gridId ?? "") || (!profiles[d.id] && d.grid === gridId);
	});

	const filteredDrivers = gridDrivers.filter(
		(d) => driverQuery === "" || d.name?.toLowerCase().includes(driverQuery.toLowerCase()),
	);

	const selectedDriver = gridDrivers.find((d) => d.id === selectedDriverId);

	// Calendars for this grid + active season
	const seasonCalendarIds = new Set(
		mappings.filter((m) => m.seasonId === activeSeason?.id).map((m) => m.calendarId),
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

	if (!activeSeason) {
		return <p className="text-f1-lighterCarbon text-sm">Nenhuma temporada ativa encontrada.</p>;
	}

	const formatDate = (dateStr: string) =>
		format(new Date(dateStr), "dd MMM", { locale: ptBR });

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-bold">Ajustes de Pontos</h2>
				<p className="text-sm text-f1-lighterCarbon mt-1">
					Temporada: <span className="font-semibold text-f1-text">{activeSeason.name}</span>
				</p>
			</div>

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
							const hasAdj = (allAdjustments[cal.id]?.length ?? 0) > 0;
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
									{hasAdj && <span className="ml-1.5 text-xs font-bold opacity-80">●</span>}
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
								className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed"
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
											<tr key={adj.id} className={`${i % 2 === 0 ? "bg-white" : "bg-f1-bg-silver"} ${editId === adj.id ? "ring-2 ring-inset ring-blue-400" : ""}`}>
												<td className="py-2 px-4 font-medium">{driver?.name ?? adj.driverId}</td>
												<td className="py-2 px-4 text-f1-lighterCarbon">{adj.reason}</td>
												<td className={`py-2 px-4 text-right font-bold ${adj.points > 0 ? "text-green-600" : "text-f1-red"}`}>
													{adj.points > 0 ? `+${adj.points}` : adj.points}
												</td>
												<td className="py-2 px-4 text-right">
													<div className="flex items-center justify-end gap-2">
														<button
															type="button"
															onClick={() => handleEdit(adj)}
															className="text-f1-lighterCarbon hover:text-blue-500 transition-colors"
															title="Editar"
														>
															<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
																<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
															</svg>
														</button>
														<button
															type="button"
															onClick={() => handleDelete(adj.id)}
															className="text-f1-lighterCarbon hover:text-f1-red transition-colors"
															title="Remover"
														>
															<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
																<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
															</svg>
														</button>
													</div>
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
		</div>
	);
}
