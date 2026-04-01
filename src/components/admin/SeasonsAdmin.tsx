import { useState } from "react";
import { useSeasons } from "../../contexts/SeasonsContext";
import { Season } from "../../contexts/SeasonsContext";

export function SeasonsAdmin() {
	const { seasons, loading, saveSeason, updateSeason, deleteSeason } =
		useSeasons();
	const [editingSeason, setEditingSeason] = useState<Season | null>(null);
	const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [activeFilter, setActiveFilter] = useState<
		"all" | "active" | "inactive"
	>("all");

	const [formData, setFormData] = useState({ name: "", active: true });

	const resetForm = () => {
		setFormData({ name: "", active: true });
		setEditingSeason(null);
		setSelectedSeason(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (editingSeason) {
				await updateSeason(editingSeason.id, formData);
			} else {
				await saveSeason(formData);
			}
			resetForm();
		} catch (error) {
			console.error("Failed to save season:", error);
		}
	};

	const handleSelectSeason = (season: Season) => {
		setSelectedSeason(season);
		setEditingSeason(season);
		setFormData({ name: season.name, active: season.active });
	};

	const handleNewSeason = () => {
		setSelectedSeason(null);
		setEditingSeason(null);
		setFormData({ name: "", active: true });
	};

	const handleDelete = async (season: Season) => {
		if (
			window.confirm(
				`Tem certeza que deseja excluir a temporada "${season.name}"?`,
			)
		) {
			try {
				await deleteSeason(season.id);
			} catch (error) {
				console.error("Failed to delete season:", error);
			}
		}
	};

	const filteredSeasons = seasons.filter((season) => {
		const matchesActive =
			activeFilter === "all"
				? true
				: activeFilter === "active"
					? season.active === true
					: season.active === false;

		const matchesSearch = searchTerm
			? season.name?.toLowerCase().includes(searchTerm.toLowerCase())
			: true;

		return matchesActive && matchesSearch;
	});

	if (loading) {
		return <div className="p-4">Carregando temporadas...</div>;
	}

	return (
		<div className="flex flex-col md:flex-row w-full">
			{/* Seasons Sidebar */}
			<div className="w-full md:w-80 bg-white md:p-4 rounded-lg md:shadow-md h-full">
				<div className="mb-4 space-y-2">
					<div className="flex rounded border overflow-hidden text-sm">
						{[
							{ label: "Todos", value: "all" },
							{ label: "Ativos", value: "active" },
							{ label: "Inativos", value: "inactive" },
						].map(({ label, value }) => (
							<button
								key={value}
								type="button"
								onClick={() =>
									setActiveFilter(
										value as "all" | "active" | "inactive",
									)
								}
								className={`flex-1 py-2 cursor-pointer transition-colors duration-120 ${
									activeFilter === value
										? "bg-f1-red text-white font-medium"
										: "bg-white text-gray-600 hover:bg-f1-red/10"
								}`}
							>
								{label}
							</button>
						))}
					</div>

					<input
						type="text"
						placeholder="Buscar temporadas..."
						className="w-full p-2 border rounded h-11"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<ul className="custom-scrollbar space-y-2 max-h-[calc(100vh-600px)] md:max-h-[calc(100vh-750px)] min-h-60 min-w-70 md:min-h-110 overflow-y-auto pr-2">
					{filteredSeasons.length > 0 ? (
						filteredSeasons.map((season) => (
							<li key={season.id}>
								<div
									onClick={() => handleSelectSeason(season)}
									className={`w-full p-2 hover:bg-f1-red/20 rounded flex items-center gap-2 cursor-pointer justify-between overflow-hidden ${
										selectedSeason?.id === season.id
											? "bg-f1-red/20 font-bold"
											: ""
									}`}
								>
									<div className="flex items-center gap-2">
										<div className="flex flex-col items-start">
											<span className="truncate max-w-36">
												{season.name}
											</span>
											{!season.active && (
												<span className="text-xs text-gray-500">
													Inativo
												</span>
											)}
										</div>
									</div>

									<button
										onClick={(e) => {
											e.stopPropagation();
											handleDelete(season);
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
						))
					) : (
						<li className="p-2 text-gray-500 text-center">
							Nenhuma temporada encontrada
						</li>
					)}
				</ul>
			</div>

			{/* Registration Form */}
			<div className="mx-auto max-w-3xl w-full">
				<form
					onSubmit={handleSubmit}
					className="bg-white border-t border-f1-black/20 mt-6 pt-6 md:mt-0 md:p-6 md:border-0 md:rounded-lg md:shadow-md"
				>
					<div className="flex justify-between items-center mb-6">
						<div>
							<h2 className="text-2xl font-bold">
								{editingSeason
									? "Editar Temporada"
									: "Cadastrar Nova Temporada"}
							</h2>
							<div className="flex items-center justify-start gap-2 mt-4">
								<span className="text-sm font-medium">Ativo</span>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={formData.active}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												active: e.target.checked,
											}))
										}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-f1-purple"></div>
								</label>
							</div>
						</div>
						{editingSeason && (
							<button
								type="button"
								onClick={handleNewSeason}
								className="px-4 py-1 self-start bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
							>
								Nova Temporada
							</button>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="md:col-span-2">
							<label className="block mb-1">Nome *</label>
							<input
								type="text"
								value={formData.name}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										name: e.target.value,
									}))
								}
								className="w-full p-2 border rounded h-11"
								placeholder="Ex: Temporada 2025"
								required
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="bg-f1-carbon border w-full border-f1-carbon text-white px-6 py-2 rounded cursor-pointer duration-120 mt-4 disabled:opacity-50 hover:bg-transparent hover:text-f1-carbon"
					>
						{loading
							? editingSeason
								? "Atualizando..."
								: "Cadastrando..."
							: editingSeason
								? "Atualizar"
								: "Cadastrar"}
					</button>
				</form>
			</div>
		</div>
	);
}
