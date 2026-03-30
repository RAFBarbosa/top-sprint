import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGrids } from "../../contexts/GridsContext";
import type { GridConfig } from "../../shared/config/grids";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Bars3Icon } from "@heroicons/react/24/outline";

const ItemTypes = {
	GRID: "grid",
};

interface DraggableGridItemProps {
	grid: GridConfig;
	index: number;
	onMove: (fromIndex: number, toIndex: number) => void;
	onNavigate: (path: string) => void;
	onDelete: (gridId: string) => void;
}

function DraggableGridItem({ grid, index, onMove, onNavigate, onDelete }: DraggableGridItemProps) {
	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.GRID,
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop({
		accept: ItemTypes.GRID,
		hover: (item: { index: number }) => {
			if (item.index !== index) {
				onMove(item.index, index);
				item.index = index;
			}
		},
	});

	return (
		<li ref={(node) => drag(drop(node))}>
			<div
				className={`flex items-center gap-3 p-3 border rounded-lg hover:bg-f1-bg-silver transition-colors ${
					isDragging ? "opacity-50" : ""
				}`}
			>
				<div
					className="cursor-move p-1 hover:bg-gray-100 rounded"
					title="Arraste para reordenar"
				>
					<Bars3Icon className="w-4 h-4 text-gray-400" />
				</div>
				<div
					className="w-3 h-3 rounded-full shrink-0"
					style={{ backgroundColor: grid.primaryColor }}
				/>
				<div className="flex-1 min-w-0">
					<p className="font-semibold text-sm">{grid.label}</p>
					<p className="text-xs text-f1-lighterCarbon font-mono">
						{grid.id}
					</p>
				</div>
				<div className="flex gap-2 shrink-0">
					<button
						onClick={() => onNavigate(`/admin/painel/grids/${grid.id}/pilotos`)}
						className="text-xs px-3 py-1.5 border rounded hover:bg-f1-red/10 cursor-pointer"
					>
						Pilotos
					</button>
					<button
						onClick={() => onNavigate(`/admin/painel/grids/${grid.id}`)}
						className="text-xs px-3 py-1.5 border rounded hover:bg-f1-red/10 cursor-pointer"
					>
						Configurar
					</button>
					<button
						onClick={() => onDelete(grid.id)}
						className="text-xs px-3 py-1.5 border border-red-200 text-red-400 rounded hover:bg-red-50 cursor-pointer"
					>
						Remover
					</button>
				</div>
			</div>
		</li>
	);
}

export function GridsAdmin() {
	const { grids, loading, saveGrids } = useGrids();
	const navigate = useNavigate();
	const [status, setStatus] = useState<{
		type: "idle" | "loading" | "success" | "error";
		message: string;
	}>({ type: "idle", message: "" });
	const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
	const [localGrids, setLocalGrids] = useState(grids);
	const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Update local state when grids change
	useEffect(() => {
		setLocalGrids(grids);
	}, [grids]);

	if (loading) {
		return (
			<p className="text-f1-lighterCarbon text-sm">Carregando grids...</p>
		);
	}

	const handleAdd = async () => {
		const id = `grid${String.fromCharCode(65 + grids.length)}`;
		const newGrid: GridConfig = {
			id,
			label: "Novo Grid",
			primaryColor: "#eb1c24",
			accentColor: "",
			hoverPrimaryColor: "",
			hoverAccentColor: "",
			standingsBgClass: "",
			standingsTitle: "",
			countdownBgClass: "",
			pointSystem: { race: [], sprint: [], poleBonus: 0 },
			raceAwards: [],
		};
		setStatus({ type: "loading", message: "Criando grid..." });
		try {
			await saveGrids([...grids, newGrid]);
			setStatus({ type: "idle", message: "" });
			navigate(`/admin/painel/grids/${id}`);
		} catch (e: any) {
			setStatus({ type: "error", message: "Erro: " + e.message });
		}
	};

	const handleDelete = async (gridId: string) => {
		setStatus({ type: "loading", message: "Removendo grid..." });
		try {
			await saveGrids(grids.filter((g) => g.id !== gridId));
			setConfirmDelete(null);
			setStatus({ type: "idle", message: "" });
		} catch (e: any) {
			setStatus({ type: "error", message: "Erro: " + e.message });
		}
	};

	const handleMove = (fromIndex: number, toIndex: number) => {
		const newGrids = [...localGrids];
		const [moved] = newGrids.splice(fromIndex, 1);
		newGrids.splice(toIndex, 0, moved);
		setLocalGrids(newGrids);

		// Debounced auto-save
		if (saveTimeoutRef.current) {
			clearTimeout(saveTimeoutRef.current);
		}
		saveTimeoutRef.current = setTimeout(async () => {
			try {
				await saveGrids(newGrids);
			} catch (e) {
				console.error("Failed to save grid order", e);
			}
		}, 1000); // Save after 1 second of no changes
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="space-y-4">
				<div className="flex justify-between items-center">
					<h2 className="text-2xl font-bold">Grids</h2>
					<div className="flex gap-2">
						<button
							onClick={handleAdd}
							disabled={status.type === "loading"}
							className="bg-f1-carbon text-white px-4 py-2 rounded border border-f1-carbon hover:bg-transparent hover:text-f1-carbon cursor-pointer duration-120 disabled:opacity-50 text-sm"
						>
							+ Novo Grid
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

				<ul className="space-y-2">
					{localGrids.map((grid, index) => (
						<DraggableGridItem
							key={grid.id}
							grid={grid}
							index={index}
							onMove={handleMove}
							onNavigate={navigate}
							onDelete={setConfirmDelete}
						/>
					))}
				</ul>

				{confirmDelete && (
					<div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm">
						<p className="font-semibold text-red-700 mb-2">
							Remover "{localGrids.find(g => g.id === confirmDelete)?.label}"?
						</p>
						<p className="text-red-600 text-xs mb-3">
							Isso não afeta pilotos ou calendários já existentes no Hygraph com este ID.
						</p>
						<div className="flex gap-2">
							<button
								onClick={() => handleDelete(confirmDelete)}
								className="px-3 py-1.5 bg-red-500 text-white rounded text-xs cursor-pointer hover:bg-red-600"
							>
								Confirmar
							</button>
							<button
								onClick={() => setConfirmDelete(null)}
								className="px-3 py-1.5 border rounded text-xs cursor-pointer hover:bg-gray-100"
							>
								Cancelar
							</button>
						</div>
					</div>
				)}

				{localGrids.length === 0 && (
					<p className="text-f1-lighterCarbon text-sm text-center py-8">
						Nenhum grid criado ainda. Clique em "+ Novo Grid" para começar.
					</p>
				)}
			</div>
		</DndProvider>
	);
}
