import { FormEvent, useEffect, useState, useCallback } from "react";
import {
	useCreateAssetMutation,
	GetHallsOfFameFullDocument,
} from "../../graphql/generated";
import {
	Dialog,
	DialogTitle,
	DialogPanel,
	Description,
} from "@headlessui/react";
import { AdminDeleteButton } from "./ui/AdminDeleteButton";
import { Toggle } from "./ui/Toggle";
import { useToast } from "../../contexts/ToastContext";
import {
	collection,
	addDoc,
	updateDoc,
	doc,
	getDocs,
	query,
	where,
	setDoc,
	serverTimestamp,
	Timestamp,
} from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { useApolloClient } from "@apollo/client";

interface ExistingPhoto {
	type: "existing";
	url: string;
}

interface NewPhoto {
	type: "new";
	file: File;
	previewUrl: string;
}

type PhotoItem = ExistingPhoto | NewPhoto;

const normalizeHof = (id: string, data: any) => ({
	id,
	season: data.season as string,
	photoUrls: (data.photoUrls ?? []) as string[],
	legacy: data.legacy ?? false,
	deleted: data.deleted ?? false,
});

export function HallOfFameRegistration() {
	const [season, setSeason] = useState("");
	const [legacy, setLegacy] = useState(false);
	const [photos, setPhotos] = useState<PhotoItem[]>([]);
	const [uploadProgress, setUploadProgress] = useState<number | null>(null);
	const { showToast } = useToast();
	const [selectedHof, setSelectedHof] = useState<any>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [dragIndex, setDragIndex] = useState<number | null>(null);
	const [hofs, setHofs] = useState<any[]>([]);
	const [hofsLoading, setHofsLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [migrating, setMigrating] = useState(false);

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [itemToDelete, setItemToDelete] = useState<{
		id: string;
		deleted: boolean;
	} | null>(null);

	const [createAsset] = useCreateAssetMutation();
	const apolloClient = useApolloClient();

	const loadHofs = useCallback(async () => {
		setHofsLoading(true);
		try {
			const q = query(
				collection(db, "hallsOfFame"),
				where("deleted", "==", false),
			);
			const snap = await getDocs(q);
			const items = snap.docs
				.map((d) => normalizeHof(d.id, d.data()))
				.sort((a, b) => b.season.localeCompare(a.season));
			setHofs(items);
		} finally {
			setHofsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadHofs();
	}, [loadHofs]);

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
			await updateDoc(doc(db, "hallsOfFame", id), {
				deleted: !currentDeleted,
			});
			await loadHofs();
		} catch (error) {
			console.error("Error toggling delete:", error);
		}
	};

	const handleSelectHof = (hof: any) => {
		setSelectedHof(hof);
		setIsEditing(true);
		setSeason(hof.season || "");
		setLegacy(hof.legacy ?? false);
		setPhotos(
			(hof.photoUrls ?? []).map((url: string) => ({
				type: "existing" as const,
				url,
			})),
		);
	};

	const resetForm = () => {
		setSelectedHof(null);
		setIsEditing(false);
		setSeason("");
		setLegacy(false);
		setPhotos([]);
	};

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

	const handleDragStart = (index: number) => setDragIndex(index);

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
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

	const handleDragEnd = () => setDragIndex(null);

	const uploadFile = async (file: File): Promise<string> => {
		const assetResult = await createAsset({ variables: { data: {} } });
		const asset = assetResult.data?.createAsset;
		const uploadData = asset?.upload?.requestPostData;
		if (!asset?.id || !uploadData?.url)
			throw new Error("Failed to get upload data");

		const form = new FormData();
		const finalKey = uploadData.key.replace(
			"${filename}",
			encodeURIComponent(file.name),
		);
		form.append("key", finalKey);
		form.append("policy", uploadData.policy);
		form.append("x-amz-algorithm", uploadData.algorithm);
		form.append("x-amz-credential", uploadData.credential);
		form.append("x-amz-date", uploadData.date);
		form.append("x-amz-signature", uploadData.signature);
		if (uploadData.securityToken)
			form.append("x-amz-security-token", uploadData.securityToken);
		form.append("file", file);

		const uploadResponse = await fetch(uploadData.url, {
			method: "POST",
			body: form,
		});
		if (!uploadResponse.ok) throw new Error(`Upload failed for ${file.name}`);

		return asset.url;
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setSaving(true);
		try {
			if (!season) throw new Error("Temporada é obrigatória");
			if (photos.length === 0)
				throw new Error("Pelo menos uma foto é obrigatória");

			const uploadedUrlMap = new Map<NewPhoto, string>();
			const newPhotos = photos.filter((p): p is NewPhoto => p.type === "new");
			if (newPhotos.length > 0) {
				const urls = await Promise.all(newPhotos.map((p) => uploadFile(p.file)));
				newPhotos.forEach((p, i) => uploadedUrlMap.set(p, urls[i]));
				setUploadProgress(100);
			}

			const orderedUrls = photos.map((p) =>
				p.type === "existing" ? p.url : uploadedUrlMap.get(p)!,
			);

			if (isEditing && selectedHof) {
				await updateDoc(doc(db, "hallsOfFame", selectedHof.id), {
					season,
					legacy,
					photoUrls: orderedUrls,
				});
				setPhotos(orderedUrls.map((url) => ({ type: "existing" as const, url })));
				showToast("success", "Mural dos Campeões atualizado com sucesso!");
			} else {
				await addDoc(collection(db, "hallsOfFame"), {
					season,
					photoUrls: orderedUrls,
					legacy,
					deleted: false,
					createdAt: serverTimestamp(),
				});
				showToast("success", "Mural dos Campeões cadastrado com sucesso!");
				resetForm();
			}

			await loadHofs();
			setUploadProgress(null);
		} catch (error: any) {
			console.error("Error:", error);
			showToast("error", error.message || "Erro desconhecido");
			setUploadProgress(null);
		} finally {
			setSaving(false);
		}
	};

	const handleMigrateFromHygraph = async () => {
		setMigrating(true);
		try {
			const result = await apolloClient.query({
				query: GetHallsOfFameFullDocument,
				fetchPolicy: "network-only",
			});
			const hygraphHofs: any[] = result.data?.hallsOfFame ?? [];
			for (const hof of hygraphHofs) {
				await setDoc(doc(db, "hallsOfFame", hof.id), {
					season: hof.season ?? "",
					photoUrls: (hof.photo ?? []).map((p: any) => p.url),
					legacy: hof.legacy ?? false,
					deleted: hof.deleted ?? false,
					createdAt: serverTimestamp(),
				});
			}
			showToast("success", `${hygraphHofs.length} itens migrados com sucesso!`);
			await loadHofs();
		} catch (e: any) {
			showToast("error", `Erro na migração: ${e.message}`);
		} finally {
			setMigrating(false);
		}
	};

	const filteredHofs = hofs.filter((hof) =>
		searchTerm
			? hof.season?.toLowerCase().includes(searchTerm.toLowerCase())
			: true,
	);

	if (hofsLoading) {
		return (
			<div className="bg-f1-lightSilver py-10 flex justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-f1-red" />
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

				{hofs.length === 0 && !hofsLoading && (
					<button
						onClick={handleMigrateFromHygraph}
						disabled={migrating}
						className="w-full mb-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer text-sm"
					>
						{migrating ? "Migrando..." : "Importar do Hygraph"}
					</button>
				)}

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
											{hof.photoUrls.length} foto
											{hof.photoUrls.length !== 1 ? "s" : ""}
										</span>
									</div>

									<AdminDeleteButton
										deleted={hof.deleted}
										onClick={() => handleDeleteClick(hof.id, hof.deleted)}
									/>
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
							{itemToDelete?.deleted ? "Restaurar" : "Excluir"} Mural
							dos Campeões
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
								{itemToDelete?.deleted ? "Restaurar" : "Excluir"}
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

					<div className="grid grid-cols-1 gap-4">
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

						<div>
							<Toggle checked={legacy} onChange={setLegacy} label="Legado (temporada de era anterior)" />
						</div>

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
											onDragStart={() => handleDragStart(idx)}
											onDragOver={(e) => handleDragOver(e, idx)}
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
											<span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1 rounded">
												{idx + 1}
											</span>
											{photo.type === "new" && (
												<span className="absolute top-1 left-1 bg-f1-red text-white text-xs px-1 rounded">
													novo
												</span>
											)}
											<button
												type="button"
												onClick={() => handleRemovePhoto(idx)}
												className="absolute top-1 right-1 bg-f1-red text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
												title="Remover"
											>
												<svg
													className="h-3 w-3"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
													/>
												</svg>
											</button>
										</div>
									))}
								</div>
							</div>
						)}

						<div>
							<label className="block mb-1">
								{photos.length > 0 ? "Adicionar mais fotos" : "Fotos *"}
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
									className="bg-f1-red h-2.5 rounded-full transition-all"
									style={{ width: `${uploadProgress}%` }}
								/>
							</div>
						)}
					</div>

					<button
						type="submit"
						disabled={saving}
						className="bg-f1-carbon border w-full border-f1-carbon text-white px-6 py-2 rounded cursor-pointer duration-120 mt-4 disabled:opacity-50 hover:bg-transparent hover:text-f1-carbon"
					>
						{saving
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
