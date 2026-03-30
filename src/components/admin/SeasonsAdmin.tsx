import { useState } from "react";
import { useSeasons } from "../../contexts/SeasonsContext";
import { Season } from "../../contexts/SeasonsContext";

export function SeasonsAdmin() {
	const { seasons, loading, saveSeason, updateSeason, deleteSeason } = useSeasons();
	const [isCreating, setIsCreating] = useState(false);
	const [editingSeason, setEditingSeason] = useState<Season | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		year: new Date().getFullYear(),
		slug: "",
		startDate: "",
		endDate: "",
		active: true,
	});

	const resetForm = () => {
		setFormData({
			name: "",
			year: new Date().getFullYear(),
			slug: "",
			startDate: "",
			endDate: "",
			active: true,
		});
		setIsCreating(false);
		setEditingSeason(null);
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

	const handleEdit = (season: Season) => {
		setEditingSeason(season);
		setFormData({
			name: season.name,
			year: season.year,
			slug: season.slug,
			startDate: season.startDate.split('T')[0], // Convert to date input format
			endDate: season.endDate.split('T')[0],
			active: season.active,
		});
	};

	const handleDelete = async (season: Season) => {
		if (window.confirm(`Tem certeza que deseja excluir a temporada "${season.name}"?`)) {
			try {
				await deleteSeason(season.id);
			} catch (error) {
				console.error("Failed to delete season:", error);
			}
		}
	};

	if (loading) {
		return <div className="p-4">Carregando temporadas...</div>;
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Temporadas</h2>
				<button
					onClick={() => setIsCreating(true)}
					className="bg-f1-carbon text-white px-4 py-2 rounded border border-f1-carbon hover:bg-transparent hover:text-f1-carbon cursor-pointer duration-120"
				>
					+ Nova Temporada
				</button>
			</div>

			{(isCreating || editingSeason) && (
				<div className="bg-white border rounded-lg p-6">
					<h3 className="text-lg font-semibold mb-4">
						{editingSeason ? "Editar Temporada" : "Nova Temporada"}
					</h3>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block mb-1">Nome</label>
								<input
									type="text"
									value={formData.name}
									onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
									className="w-full p-2 border rounded"
									required
								/>
							</div>
							<div>
								<label className="block mb-1">Ano</label>
								<input
									type="number"
									value={formData.year}
									onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
									className="w-full p-2 border rounded"
									required
								/>
							</div>
							<div>
								<label className="block mb-1">Slug</label>
								<input
									type="text"
									value={formData.slug}
									onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
									className="w-full p-2 border rounded"
									required
								/>
							</div>
							<div>
								<label className="block mb-1">Ativo</label>
								<input
									type="checkbox"
									checked={formData.active}
									onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
									className="w-4 h-4"
								/>
							</div>
							<div>
								<label className="block mb-1">Data de Início</label>
								<input
									type="date"
									value={formData.startDate}
									onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
									className="w-full p-2 border rounded"
									required
								/>
							</div>
							<div>
								<label className="block mb-1">Data de Fim</label>
								<input
									type="date"
									value={formData.endDate}
									onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
									className="w-full p-2 border rounded"
									required
								/>
							</div>
						</div>
						<div className="flex gap-2">
							<button
								type="submit"
								className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
							>
								{editingSeason ? "Atualizar" : "Criar"}
							</button>
							<button
								type="button"
								onClick={resetForm}
								className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
							>
								Cancelar
							</button>
						</div>
					</form>
				</div>
			)}

			<div className="space-y-2">
				{seasons.map((season) => (
					<div key={season.id} className="bg-white border rounded-lg p-4">
						<div className="flex justify-between items-center">
							<div>
								<h3 className="font-semibold">{season.name} ({season.year})</h3>
								<p className="text-sm text-gray-600">
									{new Date(season.startDate).toLocaleDateString()} - {new Date(season.endDate).toLocaleDateString()}
									{!season.active && <span className="ml-2 text-red-500">(Inativo)</span>}
								</p>
							</div>
							<div className="flex gap-2">
								<button
									onClick={() => handleEdit(season)}
									className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
								>
									Editar
								</button>
								<button
									onClick={() => handleDelete(season)}
									className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
								>
									Excluir
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{seasons.length === 0 && (
				<div className="text-center py-8 text-gray-500">
					Nenhuma temporada cadastrada ainda.
				</div>
			)}
		</div>
	);
}