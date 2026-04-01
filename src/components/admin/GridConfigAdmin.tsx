import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGrids } from "../../contexts/GridsContext";
import type { GridConfig, RaceAward } from "../../shared/config/grids";

export function GridConfigAdmin({ gridId: gridIdProp }: { gridId?: string } = {}) {
	const { gridId: gridIdParam } = useParams<{ gridId: string }>();
	const gridId = gridIdProp ?? gridIdParam;
	const { grids, loading, saveGrids } = useGrids();


	const [editGrid, setEditGrid] = useState<GridConfig | null>(null);
	const [status, setStatus] = useState<{
		type: "idle" | "loading" | "success" | "error";
		message: string;
	}>({ type: "idle", message: "" });

	useEffect(() => {
		if (!loading && gridId) {
			const found = grids.find((g) => g.id === gridId);
			if (found) setEditGrid(JSON.parse(JSON.stringify(found)));
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
		setStatus({ type: "loading", message: "Salvando..." });
		try {
			await saveGrids(
				grids.map((g) => (g.id === editGrid.id ? editGrid : g)),
			);
			setStatus({ type: "success", message: "Salvo com sucesso!" });
			setTimeout(() => setStatus({ type: "idle", message: "" }), 3000);
		} catch (e: any) {
			setStatus({ type: "error", message: "Erro: " + e.message });
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
						disabled={status.type === "loading"}
						className="bg-f1-carbon text-white px-5 py-2 rounded border border-f1-carbon hover:bg-transparent hover:text-f1-carbon cursor-pointer duration-120 disabled:opacity-50"
					>
						Salvar
					</button>
				</div>
			</div>

			{status.type !== "idle" && (
				<div
					className={`p-3 rounded text-sm ${
						status.type === "error"
							? "bg-red-100 text-red-700 border border-red-300"
							: status.type === "success"
								? "bg-green-100 text-green-700 border border-green-300"
								: "bg-blue-100 text-blue-700 border border-blue-300"
					}`}
				>
					{status.message}
				</div>
			)}

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
					<div>
						<label className="text-xs font-bold text-f1-lighterCarbon uppercase tracking-wide block mb-1">
							Cor Principal
						</label>
						<div className="flex gap-2">
							<input
								type="color"
								value={editGrid.primaryColor}
								onChange={(e) =>
									update("primaryColor", e.target.value)
								}
								className="h-10 w-12 border rounded cursor-pointer p-0.5"
							/>
							<input
								type="text"
								value={editGrid.primaryColor}
								onChange={(e) =>
									update("primaryColor", e.target.value)
								}
								className="flex-1 p-2 border rounded h-10 text-sm font-mono"
								placeholder="#eb1c24"
							/>
						</div>
					</div>
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
							value={(editGrid.pointSystem?.race ?? []).join(", ")}
							onChange={(e) =>
								updatePointSystem(
									"race",
									parsePointsArray(e.target.value),
								)
							}
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
							value={(editGrid.pointSystem?.sprint ?? []).join(", ")}
							onChange={(e) =>
								updatePointSystem(
									"sprint",
									parsePointsArray(e.target.value),
								)
							}
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
