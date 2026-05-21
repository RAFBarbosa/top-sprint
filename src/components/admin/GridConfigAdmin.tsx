import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGrids } from "../../contexts/GridsContext";
import { useToast } from "../../contexts/ToastContext";
import { DEFAULT_POINT_SYSTEM, type GridConfig, type RaceAward } from "../../shared/config/grids";
import { tenant } from "../../shared/config/tenants";

export function GridConfigAdmin({ gridId: gridIdProp }: { gridId?: string } = {}) {
	const { gridId: gridIdParam } = useParams<{ gridId: string }>();
	const gridId = gridIdProp ?? gridIdParam;
	const { grids, loading, saveGrids } = useGrids();
	const { showToast } = useToast();

	const [editGrid, setEditGrid] = useState<GridConfig | null>(null);
	const [saving, setSaving] = useState(false);
	const [raceText, setRaceText] = useState("");
	const [sprintText, setSprintText] = useState("");

	useEffect(() => {
		if (!loading && gridId) {
			const found = grids.find((g) => g.id === gridId);
			if (found) {
				const clone: GridConfig = JSON.parse(JSON.stringify(found));
				const ps = clone.pointSystem;
				clone.pointSystem = {
					race: ps?.race && ps.race.length > 0 ? ps.race : [...DEFAULT_POINT_SYSTEM.race],
					sprint:
						ps?.sprint && ps.sprint.length > 0
							? ps.sprint
							: [...(DEFAULT_POINT_SYSTEM.sprint ?? [])],
					poleBonus: ps?.poleBonus ?? DEFAULT_POINT_SYSTEM.poleBonus ?? 0,
					presenceBonus: ps?.presenceBonus ?? DEFAULT_POINT_SYSTEM.presenceBonus ?? 0,
				};
				setEditGrid(clone);
				setRaceText(clone.pointSystem.race.join(", "));
				setSprintText((clone.pointSystem.sprint ?? []).join(", "));
			}
		}
	}, [loading, grids, gridId]);

	if (loading || !editGrid) {
		return (
			<p className="text-f1-lighterCarbon text-sm">Carregando...</p>
		);
	}

	const update = (field: string, value: any) =>
		setEditGrid((prev) => prev ? { ...prev, [field]: value } : prev);

	const updatePointSystem = (field: string, value: any) =>
		setEditGrid((prev) =>
			prev
				? { ...prev, pointSystem: { ...prev.pointSystem, [field]: value } }
				: prev,
		);

	const updateAward = (awardId: string, field: keyof RaceAward, value: any) =>
		setEditGrid((prev) =>
			prev
				? {
						...prev,
						raceAwards: (prev.raceAwards ?? []).map((a) =>
							a.id === awardId ? { ...a, [field]: value } : a,
						),
					}
				: prev,
		);

	const addAward = () =>
		setEditGrid((prev) =>
			prev
				? {
						...prev,
						raceAwards: [
							...(prev.raceAwards ?? []),
							{ id: `award_${Date.now()}`, label: "", points: 0 },
						],
					}
				: prev,
		);

	const removeAward = (awardId: string) =>
		setEditGrid((prev) =>
			prev
				? {
						...prev,
						raceAwards: (prev.raceAwards ?? []).filter(
							(a) => a.id !== awardId,
						),
					}
				: prev,
		);

	const parsePointsArray = (raw: string): number[] =>
		raw
			.split(",")
			.map((s) => parseInt(s.trim()))
			.filter((n) => !isNaN(n));

	const handleSave = async () => {
		if (!editGrid) return;
		setSaving(true);
		try {
			await saveGrids(
				grids.map((g) => (g.id === editGrid.id ? editGrid : g)),
			);
			showToast("success", "Salvo com sucesso!");
		} catch (e: any) {
			showToast("error", "Erro: " + e.message);
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center gap-3">
				<h2 className="text-2xl font-bold">{editGrid.label}</h2>
				<div className="ml-auto">
					<button
						onClick={handleSave}
						disabled={saving}
						className="bg-f1-carbon text-white px-5 py-2 rounded border border-f1-carbon hover:bg-transparent hover:text-f1-carbon cursor-pointer duration-120 disabled:opacity-50"
					>
						{saving ? "Salvando..." : "Salvar"}
					</button>
				</div>
			</div>

			{/* Basic info */}
			<div className="border rounded-lg p-4 space-y-4">
				<p className="text-xs font-bold text-f1-lighterCarbon uppercase tracking-wide">
					Informações
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="text-xs font-bold text-f1-lighterCarbon uppercase tracking-wide block mb-1">
							Nome
						</label>
						<input
							type="text"
							value={editGrid.label}
							onChange={(e) => update("label", e.target.value)}
							className="w-full p-2 border rounded h-10 text-sm"
						/>
					</div>
					<div>
						<label className="text-xs font-bold text-f1-lighterCarbon uppercase tracking-wide block mb-1">
							Título Classificação
						</label>
						<input
							type="text"
							value={editGrid.standingsTitle ?? ""}
							onChange={(e) => update("standingsTitle", e.target.value)}
							className="w-full p-2 border rounded h-10 text-sm"
							placeholder="ex: Alpha"
						/>
					</div>
					<div className="flex items-center gap-3">
						<span className="text-xs font-bold text-f1-lighterCarbon uppercase tracking-wide">Ativo</span>
						<label className="relative inline-flex items-center cursor-pointer">
							<input
								type="checkbox"
								checked={editGrid.active ?? true}
								onChange={(e) => update("active", e.target.checked)}
								className="sr-only peer"
							/>
							<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-f1-red"></div>
						</label>
					</div>
				</div>
			</div>

			{/* Colors */}
			<div className="border rounded-lg p-4 space-y-4">
				<p className="text-xs font-bold text-f1-lighterCarbon uppercase tracking-wide">
					Cores
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{([
						{ field: "primaryColor", label: "Primária" },
						{ field: "secondaryColor", label: "Secundária (pontos)" },
						{ field: "rowHoverColor", label: "Hover classificação" },
						{ field: "accentHoverColor", label: "Hover pontos" },
						...(tenant.id !== "topSprint" ? [{ field: "countdownBgColor" as const, label: "Countdown" }] : []),
						{ field: "podiumBgColor", label: "Cor pódio" },
					] as const).map(({ field, label }) => {
						const val = editGrid[field] as string | undefined;
						const pickerVal = val || editGrid.primaryColor || "#000000";
						return (
							<div key={field}>
								<label className="text-xs font-bold text-f1-lighterCarbon uppercase tracking-wide block mb-1">
									{label}
								</label>
								<div className="flex gap-2">
									<input
										type="color"
										value={pickerVal}
										onChange={(e) => update(field, e.target.value)}
										className="h-10 w-12 border rounded cursor-pointer p-0.5 shrink-0"
									/>
									<input
										type="text"
										value={val ?? ""}
										onChange={(e) => update(field, e.target.value || undefined)}
										className="flex-1 p-2 border rounded h-10 text-sm font-mono"
										placeholder="padrão do tema"
									/>
								</div>
							</div>
						);
					})}
				</div>

				<div>
					<label className="text-xs font-bold text-f1-lighterCarbon uppercase tracking-wide block mb-2">
						Classificação — gradiente
					</label>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{([
							{ field: "standingsBgColor" as const, label: "Cor início" },
							{ field: "standingsBgEndColor" as const, label: "Cor fim" },
						]).map(({ field, label }) => {
							const val = editGrid[field] as string | undefined;
							const pickerVal = val || editGrid.primaryColor || "#000000";
							return (
								<div key={field}>
									<label className="text-xs text-f1-lighterCarbon block mb-1">{label}</label>
									<div className="flex gap-2">
										<input
											type="color"
											value={pickerVal}
											onChange={(e) => update(field, e.target.value)}
											className="h-10 w-12 border rounded cursor-pointer p-0.5 shrink-0"
										/>
										<input
											type="text"
											value={val ?? ""}
											onChange={(e) => update(field, e.target.value || undefined)}
											className="flex-1 p-2 border rounded h-10 text-sm font-mono"
											placeholder="padrão do tema"
										/>
									</div>
								</div>
							);
						})}
					</div>
					{editGrid.standingsBgColor && editGrid.standingsBgEndColor && (
						<div
							className="mt-2 h-6 rounded"
							style={{ background: `radial-gradient(at 50% 150%, ${editGrid.standingsBgColor} 0%, ${editGrid.standingsBgEndColor} 65%)` }}
						/>
					)}
				</div>
			</div>

			{/* Point system */}
			<div className="border rounded-lg p-4 space-y-4">
				<p className="text-xs font-bold text-f1-lighterCarbon uppercase tracking-wide">
					Sistema de Pontos
				</p>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label className="text-xs text-f1-lighterCarbon block mb-1">
							Corrida (separado por vírgula)
						</label>
						<input
							type="text"
							value={raceText}
							onChange={(e) => { setRaceText(e.target.value); updatePointSystem("race", parsePointsArray(e.target.value)); }}
							className="w-full p-2 border rounded h-10 text-sm font-mono"
							placeholder="25, 22, 20..."
						/>
					</div>
					<div>
						<label className="text-xs text-f1-lighterCarbon block mb-1">
							Sprint (separado por vírgula)
						</label>
						<input
							type="text"
							value={sprintText}
							onChange={(e) => { setSprintText(e.target.value); updatePointSystem("sprint", parsePointsArray(e.target.value)); }}
							className="w-full p-2 border rounded h-10 text-sm font-mono"
							placeholder="16, 15, 14..."
						/>
					</div>
					<div>
						<label className="text-xs text-f1-lighterCarbon block mb-1">
							Bônus Pole
						</label>
						<input
							type="number"
							value={editGrid.pointSystem?.poleBonus ?? 0}
							onChange={(e) =>
								updatePointSystem(
									"poleBonus",
									parseInt(e.target.value) || 0,
								)
							}
							className="w-full p-2 border rounded h-10 text-sm"
							min={0}
						/>
					</div>
					<div>
						<label className="text-xs text-f1-lighterCarbon block mb-1">
							Bônus Presença
						</label>
						<input
							type="number"
							value={editGrid.pointSystem?.presenceBonus ?? 0}
							onChange={(e) =>
								updatePointSystem(
									"presenceBonus",
									parseInt(e.target.value) || 0,
								)
							}
							className="w-full p-2 border rounded h-10 text-sm"
							min={0}
						/>
					</div>
					<div className="flex items-center gap-3">
						<span className="text-xs font-bold text-f1-lighterCarbon uppercase tracking-wide">
							Reservas pontuam
						</span>
						<label className="relative inline-flex items-center cursor-pointer">
							<input
								type="checkbox"
								checked={editGrid.reservesEarnPoints ?? false}
								onChange={(e) =>
									update("reservesEarnPoints", e.target.checked)
								}
								className="sr-only peer"
							/>
							<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-f1-red"></div>
						</label>
					</div>
				</div>
			</div>

			{/* Race awards */}
			<div className="border rounded-lg p-4 space-y-3">
				<div className="flex justify-between items-center">
					<p className="text-xs font-bold text-f1-lighterCarbon uppercase tracking-wide">
						Prêmios da Corrida
					</p>
					<button
						type="button"
						onClick={addAward}
						className="text-xs px-3 py-1 border rounded hover:bg-f1-red/10 cursor-pointer"
					>
						+ Adicionar
					</button>
				</div>
				{(editGrid.raceAwards ?? []).length === 0 && (
					<p className="text-xs text-f1-lighterCarbon">
						Nenhum prêmio configurado.
					</p>
				)}
				<div className="space-y-2">
					{(editGrid.raceAwards ?? []).map((award) => (
						<div
							key={award.id}
							className="grid grid-cols-[1fr_80px_32px] gap-2 items-center"
						>
							<input
								type="text"
								value={award.label}
								onChange={(e) =>
									updateAward(award.id, "label", e.target.value)
								}
								className="p-2 border rounded h-9 text-sm"
								placeholder="Ex: Volta Rápida"
							/>
							<input
								type="number"
								value={award.points}
								onChange={(e) =>
									updateAward(
										award.id,
										"points",
										parseInt(e.target.value) || 0,
									)
								}
								className="p-2 border rounded h-9 text-sm text-center"
								placeholder="Pts"
								min={0}
							/>
							<button
								type="button"
								onClick={() => removeAward(award.id)}
								className="h-9 w-8 flex items-center justify-center rounded border border-red-200 text-red-400 hover:bg-red-50 cursor-pointer text-sm"
							>
								×
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
