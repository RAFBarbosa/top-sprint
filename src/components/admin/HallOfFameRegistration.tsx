import { FormEvent, useState } from "react";
import {
	useCreateHallOfFameMutation,
	useCreateAssetMutation,
	useUpdateHallOfFameMutation,
	useGetHallsOfFameRegistrationQuery,
	GetHallsOfFameRegistrationDocument,
} from "../../graphql/generated";
import { XMarkIcon } from "@heroicons/react/16/solid";
import {
	Dialog,
	DialogTitle,
	DialogPanel,
	Description,
} from "@headlessui/react";

export function HallOfFameRegistration() {
	// State management
	const [formData, setFormData] = useState({
		season: "",
	});
	const [photoFiles, setPhotoFiles] = useState<File[]>([]);
	const [status, setStatus] = useState<{
		type: "idle" | "loading" | "success" | "error";
		message: string;
	}>({ type: "idle", message: "" });
	const [selectedItem, setSelectedItem] = useState<any>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [itemToDelete, setItemToDelete] = useState<{
		id: string;
		deleted: boolean;
	} | null>(null);

	const handleDeleteClick = (id: string, deleted: boolean) => {
		setItemToDelete({ id, deleted });
		setIsDeleteModalOpen(true);
	};

	const confirmDelete = async () => {
		if (itemToDelete) {
			await handleToggleDelete(itemToDelete.id, itemToDelete.deleted);
			setIsDeleteModalOpen(false);
			setItemToDelete(null);
		}
	};

	const cancelDelete = () => {
		setIsDeleteModalOpen(false);
		setItemToDelete(null);
	};

	// GraphQL operations
	const [createHallOfFame] = useCreateHallOfFameMutation({
		update: (cache, { data }) => {
			const newItem = data?.createHallOfFame;
			if (!newItem) return;

			const existingData = cache.readQuery({
				query: GetHallsOfFameRegistrationDocument,
			});

			if (existingData?.hallsOfFame) {
				cache.writeQuery({
					query: GetHallsOfFameRegistrationDocument,
					data: {
						hallsOfFame: [newItem, ...existingData.hallsOfFame],
					},
				});
			}
		},
	});

	const [updateHallOfFame] = useUpdateHallOfFameMutation();
	const [createAsset] = useCreateAssetMutation();

	// Query for hall of fame items
	const { data, loading, error } = useGetHallsOfFameRegistrationQuery();

	// Helper functions
	const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setPhotoFiles([...photoFiles, ...Array.from(e.target.files)]);
		}
	};

	const handleRemovePhoto = (index: number) => {
		const updatedPhotos = [...photoFiles];
		updatedPhotos.splice(index, 1);
		setPhotoFiles(updatedPhotos);
	};

	const handleSelectItem = (item: any) => {
		setSelectedItem(item);
		setIsEditing(true);
		setFormData({
			season: item.season,
		});
		setPhotoFiles([]); // Clear any selected files when editing
	};

	const resetForm = () => {
		setFormData({ season: "" });
		setPhotoFiles([]);
		setSelectedItem(null);
		setIsEditing(false);
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setStatus({ type: "loading", message: "Enviando dados..." });

		try {
			// Validate required fields
			if (!formData.season) throw new Error("Temporada é obrigatória");

			// Upload photos and get their URLs
			const photoUploads = await Promise.all(
				photoFiles.map(async (file) => {
					const assetResult = await createAsset({
						variables: { data: {} },
					});
					const asset = assetResult.data?.createAsset;
					const uploadData = asset?.upload?.requestPostData;

					if (!asset?.id || !uploadData?.url) {
						throw new Error("Failed to get upload data");
					}

					const formData = new FormData();
					const finalKey = uploadData.key.replace(
						"${filename}",
						encodeURIComponent(file.name)
					);
					formData.append("key", finalKey);
					formData.append("policy", uploadData.policy);
					formData.append("x-amz-algorithm", uploadData.algorithm);
					formData.append("x-amz-credential", uploadData.credential);
					formData.append("x-amz-date", uploadData.date);
					formData.append("x-amz-signature", uploadData.signature);
					if (uploadData.securityToken) {
						formData.append(
							"x-amz-security-token",
							uploadData.securityToken
						);
					}
					formData.append("file", file);

					const uploadResponse = await fetch(uploadData.url, {
						method: "POST",
						body: formData,
					});

					if (!uploadResponse.ok) throw new Error("Upload failed");

					return {
						url: `https://us-west-2.graphassets.com/${asset.id}`,
					};
				})
			);

			if (isEditing && selectedItem) {
				// Update existing item
				await updateHallOfFame({
					variables: {
						where: { id: selectedItem.id },
						data: {
							season: formData.season,
							photo: {
								create: photoUploads,
							},
						},
					},
				});
			} else {
				// Create new item
				await createHallOfFame({
					variables: {
						data: {
							season: formData.season,
							photo: {
								create: photoUploads,
							},
							deleted: false,
						},
					},
				});
			}

			setStatus({ type: "success", message: "Sucesso!" });
			resetForm();
		} catch (error) {
			console.error("Error:", error);
			setStatus({
				type: "error",
				message: error.message || "Erro desconhecido",
			});
		}
	};

	const handleToggleDelete = async (id: string, currentDeleted: boolean) => {
		try {
			await updateHallOfFame({
				variables: {
					where: { id },
					data: { deleted: !currentDeleted },
				},
			});
		} catch (error) {
			console.error("Error toggling delete:", error);
		}
	};

	// Filter items based on search term
	const filteredItems =
		data?.hallsOfFame?.filter(
			(item) =>
				item.season.toLowerCase().includes(searchTerm.toLowerCase()) &&
				!item.deleted
		) || [];

	if (loading) {
		return (
			<div className="bg-f1-lightSilver py-10 flex justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-f1-red"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-f1-lightSilver py-10">
				<div className="max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					Erro ao carregar: {error.message}
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col md:flex-row w-full">
			{/* Sidebar */}
			<div className="w-full md:w-80 bg-white md:p-4 rounded-lg md:shadow-md h-full">
				<div className="mb-4">
					<input
						type="text"
						placeholder="Buscar temporadas..."
						className="w-full p-2 border rounded h-11"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<ul className="custom-scrollbar space-y-2 max-h-[calc(100vh-600px)] md:max-h-[calc(100vh-750px)] min-h-60 md:min-h-110 overflow-y-auto pr-2">
					{filteredItems.length > 0 ? (
						filteredItems.map((item) => (
							<li
								key={item.id}
								className="w-full p-2 hover:bg-f1-red/20 rounded flex items-center gap-2 cursor-pointer justify-between overflow-hidden "
							>
								<button
									onClick={() => handleSelectItem(item)}
									className={`text-left flex-1 cursor-pointer ${
										selectedItem?.id === item.id
											? "font-bold"
											: ""
									}`}
								>
									{item.season}
								</button>
								<button
									onClick={() =>
										handleDeleteClick(item.id, item.deleted)
									}
									className="text-f1-red p-1 hover:bg-f1-red hover:text-white rounded cursor-pointer t duration-120"
									title={
										item.deleted ? "Restaurar" : "Excluir"
									}
								>
									<XMarkIcon className="h-5 w-5" />
								</button>
							</li>
						))
					) : (
						<li className="p-2 text-gray-500 text-center">
							Nenhuma temporada encontrada
						</li>
					)}
				</ul>
			</div>

			{/* Delete Confirmation Modal */}
			<Dialog
				open={isDeleteModalOpen}
				onClose={cancelDelete}
				className="relative z-50"
			>
				{/* Backdrop */}
				<div className="fixed inset-0 bg-black/30" aria-hidden="true" />

				{/* Modal container */}
				<div className="fixed inset-0 flex items-center justify-center p-4">
					<DialogPanel className="w-full max-w-md rounded bg-white p-6">
						<DialogTitle className="text-lg font-bold">
							{itemToDelete?.deleted
								? "Restaurar Temporada"
								: "Excluir Temporada"}
						</DialogTitle>
						<Description className="mt-1">
							{itemToDelete?.deleted
								? "Deseja restaurar esta temporada?"
								: "Tem certeza que deseja excluir esta temporada?"}
						</Description>

						<div className="mt-6 flex justify-end gap-2">
							<button
								onClick={cancelDelete}
								className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-f1-bg-silver cursor-pointer"
							>
								Cancelar
							</button>
							<button
								onClick={confirmDelete}
								className={`px-4 py-2 text-white rounded cursor-pointer ${
									itemToDelete?.deleted
										? "bg-green-600 hover:bg-green-700"
										: "bg-f1-red hover:bg-f1-red/90"
								}`}
							>
								{itemToDelete?.deleted
									? "Restaurar"
									: "Excluir"}
							</button>
						</div>
					</DialogPanel>
				</div>
			</Dialog>

			{/* Form */}
			<div className="mx-auto max-w-3xl w-full">
				<form
					onSubmit={handleSubmit}
					className="bg-white border-t border-f1-black/20 mt-6 pt-6 md:mt-0 md:p-6 md:border-0 md:rounded-lg md:shadow-md"
				>
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold">
							{isEditing
								? "Editar Temporada"
								: "Adicionar Nova Temporada"}
						</h2>
						{isEditing && (
							<button
								type="button"
								onClick={resetForm}
								className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
							>
								Nova Temporada
							</button>
						)}
					</div>

					{status.type !== "idle" && (
						<div
							className={`w-full p-4 rounded-md mb-4 ${
								status.type === "error"
									? "bg-red-100 border border-red-400 text-red-700"
									: status.type === "success"
									? "bg-green-100 border border-green-400 text-green-700"
									: "bg-blue-100 border border-blue-400 text-blue-700"
							}`}
						>
							<div className="flex items-center gap-2">
								{status.type === "loading" && (
									<div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current"></div>
								)}
								<span>{status.message}</span>
							</div>
						</div>
					)}

					<div className="space-y-4">
						<div>
							<label className="block mb-1">Temporada *</label>
							<input
								name="season"
								value={formData.season}
								onChange={(e) =>
									setFormData({
										...formData,
										season: e.target.value,
									})
								}
								required
								className="w-full p-2 border rounded h-11"
							/>
						</div>

						<div>
							<label className="block mb-1">Fotos *</label>
							<input
								type="file"
								accept="image/*"
								multiple
								required
								onChange={handleAddPhoto}
								className="w-full p-2 border rounded h-11"
							/>
						</div>

						<div className="grid grid-cols-3 gap-2">
							{photoFiles.map((file, index) => (
								<div key={index} className="relative group">
									<img
										src={URL.createObjectURL(file)}
										alt={`Preview ${index}`}
										className="w-full h-32 object-cover rounded"
									/>
									<button
										type="button"
										onClick={() => handleRemovePhoto(index)}
										className="absolute top-1 right-1 bg-f1-red text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
									>
										<XMarkIcon className="h-4 w-4" />
									</button>
								</div>
							))}
						</div>

						<button
							type="submit"
							className="bg-f1-carbon border w-full border-f1-carbon text-white px-6 py-2 rounded cursor-pointer duration-120 mt-4 disabled:opacity-50 hover:bg-transparent hover:text-f1-carbon"
						>
							{isEditing ? "Atualizar" : "Cadastrar"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
