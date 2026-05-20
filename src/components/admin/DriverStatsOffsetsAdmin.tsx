import { useState, useEffect } from "react";
import { getDocs, setDoc, doc, collection } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { useFirebaseDrivers } from "../../shared/hooks/useFirebaseDrivers";
import { tenant } from "../../shared/config/tenants";
import type { DriverStatsShape } from "../../shared/hooks/useDriverStats";
import { useCalculateCards } from "../../shared/hooks/useCalculateCards";
import { useToast } from "../../contexts/ToastContext";
import { useDriverGameIds } from "../../shared/hooks/useDriverGameIds";

const STAT_FIELDS: { key: keyof DriverStatsShape; label: string }[] = [
	{ key: "participations", label: "Participações" },
	{ key: "points", label: "Pontos" },
	{ key: "wins", label: "Vitórias" },
	{ key: "sprintWins", label: "Vitórias Sprint" },
	{ key: "podiums", label: "Pódios" },
	{ key: "sprintPodiums", label: "Pódios Sprint" },
	{ key: "poles", label: "Poles" },
	{ key: "fastestLaps", label: "Voltas Rápidas" },
	{ key: "ncs", label: "NCs" },
	{ key: "seasons", label: "Temp. Completas (históricas)" },
	{ key: "championships", label: "Campeonatos (históricos)" },
	{ key: "teamChampionships", label: "Camp. Equipe (históricos)" },
];

const EMPTY_OFFSET = (): Partial<DriverStatsShape> => ({
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
});

export function DriverStatsOffsetsAdmin() {
	const { drivers: driversData } = useFirebaseDrivers();
	const [allOffsets, setAllOffsets] = useState<Record<string, any>>({});
	const [selectedDriver, setSelectedDriver] = useState<any>(null);
	const [editOffsets, setEditOffsets] = useState<Record<string, Partial<DriverStatsShape> & { penaltyRate?: number }>>({});
	const [searchTerm, setSearchTerm] = useState("");
	const [saving, setSaving] = useState(false);
	const [calcStatus, setCalcStatus] = useState<Record<string, "idle" | "loading" | "done" | "error">>({});

	const { triggerForGrid } = useCalculateCards();
	const { showToast } = useToast();
	const gameIdMap = useDriverGameIds();
	const grids = tenant.grids as any[];

	useEffect(() => {
		getDocs(collection(db, "driver_stats_offsets")).then((snap) => {
			const map: Record<string, any> = {};
			snap.forEach((d) => { map[d.id] = d.data(); });
			setAllOffsets(map);
		});
	}, []);

	const handleSelectDriver = (driver: any) => {
		setSelectedDriver(driver);
		const existing = allOffsets[driver.id] ?? {};
		const offsets: Record<string, Partial<DriverStatsShape> & { penaltyRate?: number }> = {};
		grids.forEach((g) => {
			offsets[g.id] = { ...EMPTY_OFFSET(), penaltyRate: 0, ...(existing[g.id] ?? {}) };
		});
		setEditOffsets(offsets);
	};

	const handleChange = (gridId: string, key: keyof DriverStatsShape, value: string) => {
		setEditOffsets((prev) => ({
			...prev,
			[gridId]: { ...prev[gridId], [key]: Number(value) },
		}));
	};

	const handleSave = async () => {
		if (!selectedDriver) return;
		setSaving(true);
		try {
			await setDoc(doc(db, "driver_stats_offsets", selectedDriver.id), editOffsets);
			setAllOffsets((prev) => ({ ...prev, [selectedDriver.id]: editOffsets }));
			showToast("success", "Salvo com sucesso!");
		} catch (e: any) {
			showToast("error", e.message);
		} finally {
			setSaving(false);
		}
	};

	const filtered = driversData.filter(
		(d) =>
			d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			gameIdMap[d.id]?.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-2 border-b border-black/10 pb-2">
	<div className="ml-auto flex items-center gap-2">
					{grids.map((grid) => (
						<button
							key={grid.id}
							disabled={calcStatus[grid.id] === "loading"}
							onClick={async () => {
								setCalcStatus((p) => ({ ...p, [grid.id]: "loading" }));
								try {
									await triggerForGrid(grid.id);
									setCalcStatus((p) => ({ ...p, [grid.id]: "done" }));
									setTimeout(() => setCalcStatus((p) => ({ ...p, [grid.id]: "idle" })), 3000);
								} catch {
									setCalcStatus((p) => ({ ...p, [grid.id]: "error" }));
								}
							}}
							className="text-xs font-bold px-3 py-1.5 rounded border border-black/20 hover:bg-f1-bg-silver disabled:opacity-50"
						>
							{calcStatus[grid.id] === "loading" ? "Calculando..." : calcStatus[grid.id] === "done" ? `✓ ${grid.label}` : calcStatus[grid.id] === "error" ? "Erro" : `Recalcular ${grid.label}`}
						</button>
					))}
				</div>
			</div>
			<div className="flex gap-4 h-full">
			{/* Driver list */}
			<div className="w-64 shrink-0 flex flex-col gap-2">
				<input
					type="text"
					placeholder="Buscar piloto..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="border border-black/20 rounded px-3 py-2 text-sm w-full"
				/>
				<div className="flex flex-col gap-1 overflow-y-auto max-h-[600px]">
					{filtered.map((d) => (
						<button
							key={d.id}
							onClick={() => handleSelectDriver(d)}
							className={`text-left px-3 py-2 rounded text-sm transition-colors ${selectedDriver?.id === d.id ? "bg-f1-red text-white font-bold" : "hover:bg-f1-bg-silver"}`}
						>
							{d.name}
						</button>
					))}
				</div>
			</div>

			{/* Editor */}
			{selectedDriver ? (
				<div className="flex-1 min-w-0">
					<h3 className="font-bold text-xl mb-4">{selectedDriver.name} — Histórico Anterior ao Site</h3>
					<div className="space-y-6">
						{grids.map((grid) => (
							<div key={grid.id} className="border border-black/10 rounded-lg overflow-hidden">
								<div
									className="px-4 py-2 text-white text-xs font-bold uppercase tracking-wide"
									style={{ backgroundColor: grid.primaryColor ?? "#eb1c24" }}
								>
									{grid.label}
								</div>
								<div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-3">
									{STAT_FIELDS.map(({ key, label }) => (
										<div key={key}>
											<label className="text-xs text-f1-lighterCarbon uppercase tracking-wide font-bold block mb-1">
												{label}
											</label>
											<input
												type="number"
												value={editOffsets[grid.id]?.[key] ?? 0}
												onChange={(e) => handleChange(grid.id, key, e.target.value)}
												className="border border-black/20 rounded px-3 py-1.5 text-sm w-full"
											/>
										</div>
									))}
									<div className="col-span-full border-t border-black/10 pt-3 mt-1">
										<label className="text-xs text-f1-lighterCarbon uppercase tracking-wide font-bold block mb-1">
											Taxa de Penalidades Históricas (0.0 – 1.0)
										</label>
										<input
											type="number"
											step="0.01"
											min="0"
											max="1"
											value={editOffsets[grid.id]?.penaltyRate ?? 0}
											onChange={(e) =>
												setEditOffsets((prev) => ({
													...prev,
													[grid.id]: { ...prev[grid.id], penaltyRate: Number(e.target.value) },
												}))
											}
											className="border border-black/20 rounded px-3 py-1.5 text-sm w-full max-w-[140px]"
										/>
										<p className="text-xs text-f1-lighterCarbon mt-1">Ex: 0.15 = 15% das corridas com penalidade</p>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="mt-6 flex items-center gap-4">
						<button
							onClick={handleSave}
							disabled={saving}
							className="bg-f1-carbon border border-f1-carbon text-white px-6 py-2 rounded cursor-pointer duration-120 disabled:opacity-50 hover:bg-transparent hover:text-f1-carbon"
						>
							{saving ? "Salvando..." : "Salvar"}
						</button>
					</div>
				</div>
			) : (
				<div className="flex-1 flex items-center justify-center text-f1-lighterCarbon text-sm">
					Selecione um piloto para editar o histórico
				</div>
			)}
		</div>
	</div>
	);
}
