import { FormEvent, useCallback, useEffect, useState } from "react";
import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { useCreateAssetMutation } from "../../graphql/generated";
import { useToast } from "../../contexts/ToastContext";
import { TrashIcon } from "@heroicons/react/24/outline";
import { AdminDeleteButton } from "./ui/AdminDeleteButton";
import {
	Dialog,
	DialogTitle,
	DialogPanel,
	Description,
} from "@headlessui/react";

interface Track {
	id: string;
	name: string;
	location: string;
	countryCode: string;
	mapUrl: string | null;
	deleted: boolean;
}

const emptyForm = {
	name: "",
	location: "",
	countryCode: "",
};

export function TrackRegistration() {
	const [tracks, setTracks] = useState<Track[]>([]);
	const [tracksLoading, setTracksLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [formData, setFormData] = useState(emptyForm);
	const [mapFile, setMapFile] = useState<File | null>(null);
	const [uploadProgress, setUploadProgress] = useState<number | null>(null);
	const { showToast } = useToast();

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [itemToDelete, setItemToDelete] = useState<{ id: string; deleted: boolean } | null>(null);

	const [createAsset] = useCreateAssetMutation();

	const loadTracks = useCallback(async () => {
		setTracksLoading(true);
		try {
			const snap = await getDocs(collection(db, "tracks"));
			const items: Track[] = snap.docs
				.map((d) => ({ id: d.id, ...d.data() } as Track))
				.filter((t) => !t.deleted)
				.sort((a, b) => a.name.localeCompare(b.name));
			setTracks(items);
		} finally {
			setTracksLoading(false);
		}
	}, []);

	useEffect(() => { loadTracks(); }, [loadTracks]);

	const uploadImage = async (file: File): Promise<string> => {
		const assetResult = await createAsset({ variables: { data: {} } });
		const asset = assetResult.data?.createAsset;
		const uploadData = asset?.upload?.requestPostData;
		if (!asset?.id || !uploadData?.url) throw new Error("Falha ao criar asset");

		const form = new FormData();
		const finalKey = uploadData.key.replace("${filename}", encodeURIComponent(file.name));
		form.append("key", finalKey);
		form.append("policy", uploadData.policy);
		form.append("x-amz-algorithm", uploadData.algorithm);
		form.append("x-amz-credential", uploadData.credential);
		form.append("x-amz-date", uploadData.date);
		form.append("x-amz-signature", uploadData.signature);
		if (uploadData.securityToken) form.append("x-amz-security-token", uploadData.securityToken);
		form.append("file", file);

		setUploadProgress(50);
		const uploadResponse = await fetch(uploadData.url, { method: "POST", body: form });
		if (!uploadResponse.ok) throw new Error("Falha no upload da imagem");
		setUploadProgress(100);

		return asset.url;
	};

	const handleSelectTrack = (track: Track) => {
		setSelectedTrack(track);
		setIsEditing(true);
		setMapFile(null);
		setFormData({
			name: track.name,
			location: track.location,
			countryCode: track.countryCode,
		});
	};

	const resetForm = () => {
		setSelectedTrack(null);
		setIsEditing(false);
		setMapFile(null);
		setUploadProgress(null);
		setFormData(emptyForm);
	};

	const handleDeleteClick = (id: string, deleted: boolean) => {
		setItemToDelete({ id, deleted });
		setIsDeleteModalOpen(true);
	};

	const confirmDelete = async () => {
		if (!itemToDelete) return;
		try {
			await updateDoc(doc(db, "tracks", itemToDelete.id), { deleted: !itemToDelete.deleted });
			await loadTracks();
			if (selectedTrack?.id === itemToDelete.id) resetForm();
		} catch (err: any) {
			showToast("error", err.message);
		} finally {
			setIsDeleteModalOpen(false);
			setItemToDelete(null);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleRemoveMap = async () => {
		if (!selectedTrack) return;
		try {
			await updateDoc(doc(db, "tracks", selectedTrack.id), { mapUrl: null });
			setSelectedTrack((prev) => prev ? { ...prev, mapUrl: null } : null);
			await loadTracks();
			showToast("success", "Mapa removido!");
		} catch (err: any) {
			showToast("error", err.message);
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!formData.name) return showToast("error", "Nome é obrigatório");
		setSaving(true);
		try {
			let mapUrl = isEditing ? (selectedTrack?.mapUrl ?? null) : null;
			if (mapFile) mapUrl = await uploadImage(mapFile);

			const data = {
				name: formData.name,
				location: formData.location,
				countryCode: formData.countryCode.toUpperCase(),
				mapUrl,
				deleted: false,
			};

			if (isEditing && selectedTrack) {
				await updateDoc(doc(db, "tracks", selectedTrack.id), data);
				showToast("success", "Pista atualizada com sucesso!");
			} else {
				const ref = doc(collection(db, "tracks"));
				await setDoc(ref, data);
				showToast("success", "Pista cadastrada com sucesso!");
				resetForm();
			}
			await loadTracks();
			setUploadProgress(null);
		} catch (err: any) {
			showToast("error", err.message || "Erro desconhecido");
			setUploadProgress(null);
		} finally {
			setSaving(false);
		}
	};

	const filteredTracks = tracks.filter((t) =>
		searchTerm
			? [t.name, t.location, t.countryCode]
					.filter(Boolean)
					.some((v) => v.toLowerCase().includes(searchTerm.toLowerCase()))
			: true,
	);

	if (tracksLoading) {
		return (
			<div className="bg-f1-lightSilver py-10 flex justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-f1-red"></div>
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
						placeholder="Buscar pistas..."
						className="w-full p-2 border rounded h-11"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<ul className="custom-scrollbar space-y-2 max-h-[calc(100vh-600px)] md:max-h-[calc(100vh-750px)] min-w-70 min-h-60 md:min-h-110 overflow-y-auto pr-2">
					{filteredTracks.length > 0 ? (
						filteredTracks.map((track) => (
							<li key={track.id}>
								<div
									onClick={() => handleSelectTrack(track)}
									className={`w-full p-2 hover:bg-f1-red/20 rounded flex items-center gap-2 cursor-pointer justify-between overflow-hidden ${
										selectedTrack?.id === track.id ? "bg-f1-red/20 font-bold" : ""
									}`}
								>
									<div className="flex flex-col items-start truncate">
										<span className="truncate max-w-40">{track.name}</span>
										<div className="flex items-center gap-1">
											{track.location && (
												<span className="text-xs text-gray-500">• {track.location}</span>
											)}
											{track.countryCode ? (
												<span className="text-xs font-mono bg-gray-100 px-1 rounded ml-1">{track.countryCode}</span>
											) : (
												<span className="text-xs text-red-400 ml-1">sem código</span>
											)}
										</div>
									</div>
									<AdminDeleteButton
										deleted={track.deleted}
										onClick={() => handleDeleteClick(track.id, track.deleted)}
									/>
								</div>
							</li>
						))
					) : (
						<li className="p-2 text-gray-500 text-center">
							Nenhuma pista encontrada
						</li>
					)}
				</ul>
			</div>

			<Dialog open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} className="relative z-10">
				<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
				<div className="fixed inset-0 flex items-center justify-center p-4">
					<DialogPanel className="w-full max-w-md rounded bg-white p-6">
						<DialogTitle className="text-lg font-bold">Excluir Pista</DialogTitle>
						<Description className="mt-1">Tem certeza que deseja excluir esta pista?</Description>
						<div className="mt-6 flex justify-end gap-2">
							<button
								onClick={() => setIsDeleteModalOpen(false)}
								className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-f1-bg-silver cursor-pointer"
							>
								Cancelar
							</button>
							<button
								onClick={confirmDelete}
								className="px-4 py-2 text-white bg-f1-red rounded hover:bg-f1-red/90 cursor-pointer"
							>
								Excluir
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
							{isEditing ? "Editar Pista" : "Cadastrar Nova Pista"}
						</h2>
						{isEditing && (
							<button
								type="button"
								onClick={resetForm}
								className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
							>
								Nova Pista
							</button>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="md:col-span-2">
							<label className="block mb-1">Nome *</label>
							<input
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
								placeholder="Yas Marina Circuit"
								className="w-full p-2 border rounded h-11"
							/>
						</div>
						<div>
							<label className="block mb-1">Localização</label>
							<input
								name="location"
								value={formData.location}
								onChange={handleChange}
								placeholder="Abu Dhabi"
								className="w-full p-2 border rounded h-11"
							/>
						</div>
						<div>
							<label className="block mb-1">
								Código do país{" "}
								<span className="text-gray-400 font-normal text-sm">(ISO 2 letras)</span>
							</label>
							<input
								name="countryCode"
								value={formData.countryCode}
								onChange={handleChange}
								placeholder="AE"
								maxLength={2}
								className="w-full p-2 border rounded h-11 font-mono uppercase"
							/>
						</div>

						<div className="md:col-span-2">
							<label className="block mb-1">Mapa da pista</label>
							<input
								type="file"
								accept="image/*"
								onChange={(e) => e.target.files?.[0] && setMapFile(e.target.files[0])}
								className="w-full p-2 border rounded h-11"
							/>
							{mapFile && (
								<p className="text-sm mt-1 text-gray-600">
									Arquivo selecionado: {mapFile.name}
								</p>
							)}
						</div>

						{isEditing && selectedTrack?.mapUrl && !mapFile && (
							<div className="md:col-span-2">
								<span className="block mb-1">Mapa atual:</span>
								<div className="relative inline-block">
									<img
										src={selectedTrack.mapUrl}
										alt={`Mapa ${selectedTrack.name}`}
										className="h-auto w-full md:w-3/5 mx-auto object-contain border border-gray-300"
									/>
									<button
										type="button"
										onClick={handleRemoveMap}
										className="mt-2 flex items-center gap-1 text-sm text-f1-red hover:underline cursor-pointer"
									>
										<TrashIcon className="h-4 w-4" /> Remover mapa
									</button>
								</div>
							</div>
						)}

						{uploadProgress !== null && (
							<div className="md:col-span-2 w-full bg-gray-200 rounded-full h-2.5">
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
							? isEditing ? "Atualizando..." : "Cadastrando..."
							: isEditing ? "Atualizar" : "Cadastrar"}
					</button>
				</form>
			</div>
		</div>
	);
}
