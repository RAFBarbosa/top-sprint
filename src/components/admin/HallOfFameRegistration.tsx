import { FormEvent, useState } from "react";
import {
	useCreateHallOfFameMutation,
	useUpdateHallOfFameMutation,
	useGetHallsOfFameRegistrationQuery,
	useCreateAssetMutation,
	GetHallsOfFameRegistrationDocument,
} from "../../graphql/generated";
import { XMarkIcon } from "@heroicons/react/16/solid";
import {
	Dialog,
	DialogTitle,
	DialogPanel,
	Description,
} from "@headlessui/react";

// Represents a photo already saved in Hygraph
interface ExistingPhoto {
	type: "existing";
	id: string;
	url: string;
}

// Represents a new photo picked locally, not yet uploaded
interface NewPhoto {
	type: "new";
	file: File;
	previewUrl: string;
}

type PhotoItem = ExistingPhoto | NewPhoto;

export function HallOfFameRegistration() {
	const [season, setSeason] = useState("");
	// Unified ordered list of photos (existing + new mixed together)
	const [photos, setPhotos] = useState<PhotoItem[]>([]);
	const [status, setStatus] = useState<{
		type: "idle" | "loading" | "success" | "error";
		message: string;
	}>({ type: "idle", message: "" });
	const [uploadProgress, setUploadProgress] = useState<number | null>(null);
	const [selectedHof, setSelectedHof] = useState<any>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [dragIndex, setDragIndex] = useState<number | null>(null);

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [itemToDelete, setItemToDelete] = useState<{
		id: string;
		deleted: boolean;
	} | null>(null);

	const [createHallOfFame, { loading: createLoading }] =
		useCreateHallOfFameMutation();
	const [updateHallOfFame, { loading: updateLoading }] =
		useUpdateHallOfFameMutation();
	const [createAsset] = useCreateAssetMutation();

	const { data: hofData, error: hofError } =
		useGetHallsOfFameRegistrationQuery();

	// ── Delete modal ────────────────────────────────────────────────────────
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

	// ── Sidebar selection ───────────────────────────────────────────────────
	const handleSelectHof = (hof: any) => {
		setSelectedHof(hof);
		setIsEditing(true);
		setSeason(hof.season || "");
		setPhotos(
			(hof.photo ?? []).map((p: any) => ({
				type: "existing" as const,
				id: p.id,
				url: p.url,
			})),
		);
	};

	const resetForm = () => {
		setSelectedHof(null);
		setIsEditing(false);
		setSeason("");
		setPhotos([]);
	};

	// ── Photo management ────────────────────────────────────────────────────
	const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const newItems: NewPhoto[] = Array.from(e.target.files).map((file) => ({
			type: "new",
			file,
			previewUrl: URL.createObjectURL(file),
		}));
		setPhotos((prev) => [...prev, ...newItems]);
		e.target.value = "";
	};

	const handleRemovePhoto = (index: number) => {
		setPhotos((prev) => prev.filter((_, i) => i !== index));
	};

	// ── Drag and drop reorder ───────────────────────────────────────────────
	const handleDragStart = (index: number) => {
		setDragIndex(index);
	};

	const handleDragOver = (
		e: React.DragEvent<HTMLDivElement>,
		index: number,
	) => {
		e.preventDefault();
		if (dragIndex === null || dragIndex === index) return;

		setPhotos((prev) => {
			const updated = [...prev];
			const [moved] = updated.splice(dragIndex, 1);
			updated.splice(index, 0, moved);
			return updated;
		});
		setDragIndex(index);
	};

	const handleDragEnd = () => {
		setDragIndex(null);
	};

	// ── Upload helper ───────────────────────────────────────────────────────
	const uploadFile = async (file: File): Promise<string> => {
		const assetResult = await createAsset({ variables: { data: {} } });
		const asset = assetResult.data?.createAsset;
		const uploadData = asset?.upload?.requestPostData;
		if (!asset?.id || !uploadData?.url)
			throw new Error("Failed to get upload data");

		const formData = new FormData();
		const finalKey = uploadData.key.replace(
			"${filename}",
			encodeURIComponent(file.name),
		);
		formData.append("key", finalKey);
		formData.append("policy", uploadData.policy);
		formData.append("x-amz-algorithm", uploadData.algorithm);
		formData.append("x-amz-credential", uploadData.credential);
		formData.append("x-amz-date", uploadData.date);
		formData.append("x-amz-signature", uploadData.signature);
		if (uploadData.securityToken) {
			formData.append("x-amz-security-token", uploadData.securityToken);
		}
		formData.append("file", file);

		const uploadResponse = await fetch(uploadData.url, {
			method: "POST",
			body: formData,
		});
		if (!uploadResponse.ok)
			throw new Error(`Upload failed for ${file.name}`);

		return asset.id;
	};

	// ── Submit ──────────────────────────────────────────────────────────────
	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setStatus({ type: "loading", message: "Enviando dados..." });

		try {
			if (!season) throw new Error("Temporada é obrigatória");
			if (photos.length === 0)
				throw new Error("Pelo menos uma foto é obrigatória");

			// Upload any new photos first
			const uploadedIdMap = new Map<NewPhoto, string>();
			const newPhotos = photos.filter(
				(p): p is NewPhoto => p.type === "new",
			);
			if (newPhotos.length > 0) {
				setStatus({ type: "loading", message: "Enviando fotos..." });
				const ids = await Promise.all(
					newPhotos.map((p) => uploadFile(p.file)),
				);
				newPhotos.forEach((p, i) => uploadedIdMap.set(p, ids[i]));
				setUploadProgress(100);
			}

			// Build the final ordered list of asset IDs
			const orderedIds = photos.map((p) => {
				if (p.type === "existing") return p.id;
				return uploadedIdMap.get(p)!;
			});

			if (isEditing && selectedHof) {
				const result = await updateHallOfFame({
					variables: {
						where: { id: selectedHof.id },
						data: {
							season,
							// `set` replaces the entire photo array in order
							photo: {
								set: orderedIds.map((id) => ({ id })),
							},
						},
					},
				});

				if (result.errors) throw new Error(result.errors[0].message);

				// Refresh local photo state with resolved URLs
				setPhotos(
					orderedIds.map((id, i) => ({
						type: "existing" as const,
						id,
						url:
							photos[i].type === "existing"
								? (photos[i] as ExistingPhoto).url
								: (photos[i] as NewPhoto).previewUrl,
					})),
				);

				setStatus({
					type: "success",
					message: "Mural dos Campeões atualizado com sucesso!",
				});
			} else {
				const result = await createHallOfFame({
					variables: {
						data: {
							season,
							deleted: false,
							photo: {
								connect: orderedIds.map((id) => ({ id })),
							},
						},
					},
					update(cache, { data }) {
						const existing = cache.readQuery({
							query: GetHallsOfFameRegistrationDocument,
						});
						if (existing && data?.createHallOfFame) {
							cache.writeQuery({
								query: GetHallsOfFameRegistrationDocument,
								data: {
									hallsOfFame: [
										data.createHallOfFame,
										...existing.hallsOfFame,
									],
								},
							});
						}
					},
				});

				if (result.errors) throw new Error(result.errors[0].message);

				setStatus({
					type: "success",
					message: "Mural dos Campeões cadastrado com sucesso!",
				});
				resetForm();
			}

			setUploadProgress(null);

			setTimeout(() => {
				setStatus({ type: "idle", message: "" });
			}, 5000);
		} catch (error) {
			console.error("Error:", error);
			setStatus({
				type: "error",
				message: error.message || "Erro desconhecido",
			});
			setUploadProgress(null);
		}
	};

	const filteredHofs = (hofData?.hallsOfFame ?? []).filter((hof) =>
		searchTerm
			? hof.season?.toLowerCase().includes(searchTerm.toLowerCase())
			: true,
	);

	if (hofError) {
		return (
			<div className="bg-f1-lightSilver py-10">
				<div className="max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					Erro ao carregar Mural dos Campeões: {hofError.message}
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col md:flex-row w-full">
			{/* Sidebar */}
			<div className="w-full md:w-80 bg-white md:p-4 rounded-lg md:shadow-md h-full">
				<div className="mb-4 space-y-2">
					<input
						type="text"
						placeholder="Buscar temporada..."
						className="w-full p-2 border rounded h-11"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<ul className="custom-scrollbar space-y-2 max-h-[calc(100vh-600px)] md:max-h-[calc(100vh-750px)] min-h-60 min-w-70 md:min-h-110 overflow-y-auto pr-2">
					{filteredHofs.length > 0 ? (
						filteredHofs.map((hof) => (
							<li key={hof.id}>
								<div
									onClick={() => handleSelectHof(hof)}
									className={`w-full p-2 hover:bg-f1-red/20 rounded flex items-center gap-2 cursor-pointer justify-between overflow-hidden ${
										selectedHof?.id === hof.id
											? "bg-f1-red/20 font-bold"
											: ""
									}`}
								>
									<div className="flex flex-col items-start">
										<span className="truncate max-w-40">
											{hof.season}
										</span>
										<span className="text-xs text-gray-500">
											{hof.photo.length} foto
											{hof.photo.length !== 1 ? "s" : ""}
										</span>
									</div>

									<button
										onClick={(e) => {
											e.stopPropagation();
											handleDeleteClick(
												hof.id,
												hof.deleted,
											);
										}}
										className="z-10 text-f1-red p-1 hover:bg-f1-red hover:text-white rounded cursor-pointer duration-120"
										title={
											hof.deleted
												? "Restaurar"
												: "Excluir"
										}
									>
										<XMarkIcon className="h-5 w-5" />
									</button>
								</div>
							</li>
						))
					) : (
						<li className="p-2 text-gray-500 text-center">
							Nenhum item encontrado
						</li>
					)}
				</ul>
			</div>

			{/* Delete Modal */}
			<Dialog
				open={isDeleteModalOpen}
				onClose={cancelDelete}
				className="relative z-50"
			>
				<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
				<div className="fixed inset-0 flex items-center justify-center p-4">
					<DialogPanel className="w-full max-w-md rounded bg-white p-6">
						<DialogTitle className="text-lg font-bold">
							{itemToDelete?.deleted ? "Restaurar" : "Excluir"}{" "}
							Mural dos Campeões
						</DialogTitle>
						<Description className="mt-1">
							{itemToDelete?.deleted
								? "Deseja restaurar este item?"
								: "Tem certeza que deseja excluir este item?"}
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
								? "Editar Mural dos Campeões"
								: "Cadastrar Mural dos Campeões"}
						</h2>
						{isEditing && (
							<button
								type="button"
								onClick={resetForm}
								className="px-4 py-1 self-start bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
							>
								Novo
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

					<div className="grid grid-cols-1 gap-4">
						{/* Season */}
						<div>
							<label className="block mb-1">Temporada *</label>
							<input
								value={season}
								onChange={(e) => setSeason(e.target.value)}
								required
								className="w-full p-2 border rounded h-11"
								placeholder="Ex: 2024"
							/>
						</div>

						{/* Unified photo grid — drag to reorder, × to remove */}
						{photos.length > 0 && (
							<div>
								<label className="block mb-2">
									Fotos{" "}
									<span className="text-xs text-gray-400 font-normal">
										— arraste para reordenar
									</span>
								</label>
								<div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
									{photos.map((photo, idx) => (
										<div
											key={idx}
											draggable
											onDragStart={() =>
												handleDragStart(idx)
											}
											onDragOver={(e) =>
												handleDragOver(e, idx)
											}
											onDragEnd={handleDragEnd}
											className={`relative group cursor-grab active:cursor-grabbing rounded border-2 transition-all ${
												dragIndex === idx
													? "border-f1-red opacity-50"
													: "border-gray-300"
											}`}
										>
											<img
												src={
													photo.type === "existing"
														? photo.url
														: photo.previewUrl
												}
												alt={`Foto ${idx + 1}`}
												className="w-full h-24 object-cover rounded"
											/>
											{/* Order badge */}
											<span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1 rounded">
												{idx + 1}
											</span>
											{/* New badge */}
											{photo.type === "new" && (
												<span className="absolute top-1 left-1 bg-f1-red text-white text-xs px-1 rounded">
													novo
												</span>
											)}
											{/* Remove button */}
											<button
												type="button"
												onClick={() =>
													handleRemovePhoto(idx)
												}
												className="absolute top-1 right-1 bg-f1-red text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
												title="Remover"
											>
												<XMarkIcon className="h-3 w-3" />
											</button>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Add photos */}
						<div>
							<label className="block mb-1">
								{photos.length > 0
									? "Adicionar mais fotos"
									: "Fotos *"}
							</label>
							<input
								type="file"
								accept="image/*"
								multiple
								onChange={handleAddFiles}
								className="w-full p-2 border rounded h-11"
							/>
						</div>

						{uploadProgress !== null && (
							<div className="w-full bg-gray-200 rounded-full h-2.5">
								<div
									className="bg-f1-red h-2.5 rounded-full"
									style={{ width: `${uploadProgress}%` }}
								></div>
							</div>
						)}
					</div>

					<button
						type="submit"
						disabled={createLoading || updateLoading}
						className="bg-f1-carbon border w-full border-f1-carbon text-white px-6 py-2 rounded cursor-pointer duration-120 mt-4 disabled:opacity-50 hover:bg-transparent hover:text-f1-carbon"
					>
						{createLoading || updateLoading
							? isEditing
								? "Atualizando..."
								: "Cadastrando..."
							: isEditing
								? "Atualizar"
								: "Cadastrar"}
					</button>
				</form>
			</div>
		</div>
	);
}
