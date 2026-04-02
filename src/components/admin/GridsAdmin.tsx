import { useState, useEffect, useRef } from "react";

import { useGrids } from "../../contexts/GridsContext";
import type { GridConfig } from "../../shared/config/grids";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { GridConfigAdmin } from "./GridConfigAdmin";
import { GridDriversAdmin } from "./GridDriversAdmin";
import { PointAdjustmentsAdmin } from "./PointAdjustmentsAdmin";
import { CalendarRegistration } from "./CalendarRegistration";
import { ManualResultsRegistration } from "./ManualResultsRegistration";
// import { GridStandings } from "./GridStandings";

const ItemTypes = { GRID: "grid" };

interface DraggableGridItemProps {
	grid: GridConfig;
	index: number;
	isSelected: boolean;
	onMove: (fromIndex: number, toIndex: number) => void;
	onSelect: (grid: GridConfig) => void;
	onDelete: (grid: GridConfig) => void;
}

function DraggableGridItem({
	grid,
	index,
	isSelected,
	onMove,
	onSelect,
	onDelete,
}: DraggableGridItemProps) {
	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.GRID,
		item: { index },
		collect: (monitor) => ({ isDragging: monitor.isDragging() }),
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
		<li
			ref={(node) => drag(drop(node))}
			className={isDragging ? "opacity-50" : ""}
		>
			<div
				onClick={() => onSelect(grid)}
				className={`w-full p-2 hover:bg-f1-red/20 rounded flex items-center gap-2 cursor-pointer justify-between overflow-hidden ${
					isSelected ? "bg-f1-red/20 font-bold" : ""
				}`}
			>
				<div className="flex items-center gap-2">
					<div
						className="cursor-move p-1 hover:bg-gray-100 rounded shrink-0"
						onClick={(e) => e.stopPropagation()}
					>
						<Bars3Icon className="w-4 h-4 text-gray-400" />
					</div>
					<div
						className="w-3 h-3 rounded-full shrink-0"
						style={{ backgroundColor: grid.primaryColor }}
					/>
					<div className="flex flex-col items-start">
						<span className="truncate max-w-36">{grid.label}</span>
						{grid.active === false && (
							<span className="text-xs text-gray-500">Inativo</span>
						)}
					</div>
				</div>

				<button
					onClick={(e) => {
						e.stopPropagation();
						onDelete(grid);
					}}
					className="z-10 text-f1-red p-1 hover:bg-f1-red hover:text-white rounded cursor-pointer duration-120"
					title="Excluir"
				>
					<svg
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
						/>
					</svg>
				</button>
			</div>
		</li>
	);
}

type SubView =
	| "configurar"
	| "pilotos"
	| "ajustes"
	| "calendario"
	| "resultado-manual"
	| null; // | "classificacao"

export function GridsAdmin() {
	const { grids, loading, saveGrids } = useGrids();

	const [selectedGrid, setSelectedGrid] = useState<GridConfig | null>(null);
	const [activeSubView, setActiveSubView] = useState<SubView>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [localGrids, setLocalGrids] = useState(grids);
	const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		setLocalGrids(grids);
	}, [grids]);

	if (loading) return <div className="p-4">Carregando grids...</div>;

	const handleSelectGrid = (grid: GridConfig) => {
		setSelectedGrid(grid);
		setActiveSubView("configurar");
	};

	const handleNewGrid = () => {
		setSelectedGrid(null);
		setActiveSubView(null);
	};

	const handleDelete = async (grid: GridConfig) => {
		if (
			window.confirm(
				`Tem certeza que deseja remover o grid "${grid.label}"?`,
			)
		) {
			try {
				await saveGrids(grids.filter((g) => g.id !== grid.id));
				if (selectedGrid?.id === grid.id) setSelectedGrid(null);
			} catch (error) {
				console.error("Failed to delete grid:", error);
			}
		}
	};

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
		try {
			await saveGrids([...grids, newGrid]);
			setSelectedGrid(newGrid);
			setActiveSubView("configurar");
		} catch (error) {
			console.error("Failed to add grid:", error);
		}
	};

	const handleMove = (fromIndex: number, toIndex: number) => {
		const newGrids = [...localGrids];
		const [moved] = newGrids.splice(fromIndex, 1);
		newGrids.splice(toIndex, 0, moved);
		setLocalGrids(newGrids);
		if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
		saveTimeoutRef.current = setTimeout(async () => {
			try {
				await saveGrids(newGrids);
			} catch (e) {
				console.error(e);
			}
		}, 1000);
	};

	const filteredGrids = localGrids.filter((g) =>
		searchTerm
			? g.label.toLowerCase().includes(searchTerm.toLowerCase())
			: true,
	);

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="flex flex-col md:flex-row w-full">
				{/* Sidebar */}
				<div className="w-full md:w-80 bg-white md:p-4 rounded-lg md:shadow-md h-full">
					<div className="mb-4 space-y-2">
						<input
							type="text"
							placeholder="Buscar grids..."
							className="w-full p-2 border rounded h-11"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>

					<ul className="custom-scrollbar space-y-2 max-h-[calc(100vh-600px)] md:max-h-[calc(100vh-750px)] min-h-60 min-w-70 md:min-h-110 overflow-y-auto pr-2">
						{filteredGrids.length > 0 ? (
							filteredGrids.map((grid, index) => (
								<DraggableGridItem
									key={grid.id}
									grid={grid}
									index={index}
									isSelected={selectedGrid?.id === grid.id}
									onMove={handleMove}
									onSelect={handleSelectGrid}
									onDelete={handleDelete}
								/>
							))
						) : (
							<li className="p-2 text-gray-500 text-center">
								Nenhum grid encontrado
							</li>
						)}
					</ul>
				</div>

				{/* Right panel */}
				<div className="mx-auto max-w-3xl w-full">
					<div className="bg-white border-t border-f1-black/20 mt-6 pt-6 md:mt-0 md:p-6 md:border-0 md:rounded-lg md:shadow-md">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold">
								{selectedGrid ? "Editar Grid" : "Novo Grid"}
							</h2>
							{selectedGrid && (
								<button
									type="button"
									onClick={handleNewGrid}
									className="px-4 py-1 self-start bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
								>
									Novo Grid
								</button>
							)}
						</div>

						{!selectedGrid ? (
							<form
								onSubmit={(e) => {
									e.preventDefault();
									handleAdd();
								}}
							>
								<div className="md:col-span-2">
									<label className="block mb-1">Nome *</label>
									<input
										type="text"
										className="w-full p-2 border rounded h-11"
										placeholder="Ex: Grid A"
										disabled
									/>
								</div>
								<button
									type="submit"
									disabled={loading}
									className="bg-f1-carbon border w-full border-f1-carbon text-white px-6 py-2 rounded cursor-pointer duration-120 mt-4 disabled:opacity-50 hover:bg-transparent hover:text-f1-carbon"
								>
									Criar
								</button>
							</form>
						) : (
							<div>
								<div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
									{(
										[
											"configurar",
											"pilotos",
											"ajustes",
											"calendario",
											"resultado-manual",
										] as SubView[]
									).map((view) => (
										<button
											key={view}
											type="button"
											onClick={() =>
												setActiveSubView(
													activeSubView === view
														? null
														: view,
												)
											}
											className={`p-3 border rounded-lg cursor-pointer text-sm font-semibold transition-colors ${
												activeSubView === view
													? "bg-f1-red text-white border-f1-red"
													: "hover:bg-f1-red/10"
											}`}
										>
											{view === "configurar"
												? "Configurar"
												: view === "pilotos"
													? "Pilotos do Grid"
													: view === "ajustes"
														? "Ajustes de Pontos"
														: view === "calendario"
															? "Calendário"
															: "Resultado Manual"}
										</button>
									))}
								</div>
								<div className="pt-6 border-t border-black/10">
									{activeSubView === "configurar" && (
										<GridConfigAdmin
											gridId={selectedGrid.id}
										/>
									)}
									{activeSubView === "pilotos" && (
										<GridDriversAdmin
											gridId={selectedGrid.id}
										/>
									)}
									{activeSubView === "ajustes" && (
										<PointAdjustmentsAdmin
											gridId={selectedGrid.id}
										/>
									)}
									{activeSubView === "calendario" && (
										<CalendarRegistration
											gridId={selectedGrid.id}
										/>
									)}
									{activeSubView === "resultado-manual" && (
										<ManualResultsRegistration
											gridId={selectedGrid.id}
										/>
									)}
									{/* activeSubView === "classificacao" && <GridStandings gridId={selectedGrid.id} /> */}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</DndProvider>
	);
}
