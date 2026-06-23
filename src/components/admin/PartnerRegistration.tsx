import { FormEvent, useState, useEffect, useRef } from "react";
import { useCreateAssetMutation } from "../../graphql/generated";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import {
	Dialog,
	DialogTitle,
	DialogPanel,
	Description,
} from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { AdminDeleteButton } from "./ui/AdminDeleteButton";
import { useToast } from "../../contexts/ToastContext";
import { useFirebasePartners, type NormalizedPartner } from "../../shared/hooks/useFirebasePartners";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = { PARTNER: "partner" };

function DraggablePartnerItem({
	partner,
	index,
	isSelected,
	onMove,
	onSelect,
	onDelete,
}: {
	partner: NormalizedPartner;
	index: number;
	isSelected: boolean;
	onMove: (from: number, to: number) => void;
	onSelect: (p: NormalizedPartner) => void;
	onDelete: (id: string, deleted: boolean) => void;
}) {
	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.PARTNER,
		item: { index },
		collect: (monitor) => ({ isDragging: monitor.isDragging() }),
	});
	const [, drop] = useDrop({
		accept: ItemTypes.PARTNER,
		hover: (item: { index: number }) => {
			if (item.index !== index) {
				onMove(item.index, index);
				item.index = index;
			}
		},
	});

	return (
		<li ref={(node) => drag(drop(node))} className={isDragging ? "opacity-50" : ""}>
			<div
				onClick={() => onSelect(partner)}
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
					{partner.footerLogo?.url && (
						<img
							src={partner.footerLogo.url}
							alt={partner.name}
							className="w-8 h-8 object-contain"
						/>
					)}
					<div className="flex flex-col items-start">
						<span className="truncate max-w-36">{partner.name}</span>
					</div>
				</div>
				<AdminDeleteButton
					deleted={partner.deleted}
					onClick={() => onDelete(partner.id, partner.deleted)}
				/>
			</div>
		</li>
	);
}

export function PartnerRegistration() {
	const [formData, setFormData] = useState({
		name: "",
		link: "",
		active: true,
	});

	const [logoFile, setLogoFile] = useState<File | null>(null);
	const [uploadProgress, setUploadProgress] = useState<number | null>(null);
	const { showToast } = useToast();
	const [selectedPartner, setSelectedPartner] = useState<any>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [saving, setSaving] = useState(false);
	const [activeFilter, setActiveFilter] = useState<
		"all" | "active" | "inactive"
	>("all");

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [itemToDelete, setItemToDelete] = useState<{
		id: string;
		deleted: boolean;
	} | null>(null);

	const [createAsset] = useCreateAssetMutation();
	const { partners: allPartners, refetch } = useFirebasePartners();
	const [localPartners, setLocalPartners] = useState<NormalizedPartner[]>([]);
	const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		setLocalPartners(allPartners);
	}, [allPartners]);

	const saveOrder = async (ordered: NormalizedPartner[]) => {
		await setDoc(doc(db, "config", "partners_order"), {
			order: ordered.map((p) => p.id),
		});
	};

	const handleMove = (fromIndex: number, toIndex: number) => {
		const updated = [...localPartners];
		const [moved] = updated.splice(fromIndex, 1);
		updated.splice(toIndex, 0, moved);
		setLocalPartners(updated);
		if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
		saveTimeoutRef.current = setTimeout(() => saveOrder(updated), 1000);
	};

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
			await setDoc(doc(db, "partners", id), { deleted: !currentDeleted }, { merge: true });
			refetch();
		} catch (error) {
			showToast("error", "Erro ao excluir");
		}
	};

	const handleSelectPartner = (partner: any) => {
		setSelectedPartner(partner);
		setIsEditing(true);
		setFormData({
			name: partner.name || "",
			link: partner.link || "",
			active: partner.active,
		});
	};

	const resetForm = () => {
		setSelectedPartner(null);
		setIsEditing(false);
		setFormData({
			name: "",
			link: "",
			active: true,
		});
		setLogoFile(null);
	};

	const handlePartner = async (event: FormEvent) => {
		event.preventDefault();
		setSaving(true);

		try {
			if (!formData.name) throw new Error("Nome é obrigatório");
			if (formData.link && !formData.link.startsWith("http")) {
				throw new Error("URL deve começar com http/https");
			}

			let logoUrl: string | null = null;
			if (logoFile) {
				const assetResult = await createAsset({
					variables: { data: {} },
				});

				const asset = assetResult.data?.createAsset;
				const uploadData = asset?.upload?.requestPostData;
				if (!asset?.id || !uploadData?.url) {
					throw new Error("Failed to get upload data");
				}

				const formDataUpload = new FormData();
				const finalKey = uploadData.key.replace(
					"${filename}",
					encodeURIComponent(logoFile.name),
				);
				formDataUpload.append("key", finalKey);
				formDataUpload.append("policy", uploadData.policy);
				formDataUpload.append("x-amz-algorithm", uploadData.algorithm);
				formDataUpload.append(
					"x-amz-credential",
					uploadData.credential,
				);
				formDataUpload.append("x-amz-date", uploadData.date);
				formDataUpload.append("x-amz-signature", uploadData.signature);
				if (uploadData.securityToken) {
					formDataUpload.append(
						"x-amz-security-token",
						uploadData.securityToken,
					);
				}
				formDataUpload.append("file", logoFile);

				const uploadResponse = await fetch(uploadData.url, {
					method: "POST",
					body: formDataUpload,
				});

				if (!uploadResponse.ok) throw new Error("Upload failed");

				logoUrl = asset.url ?? null;
				setUploadProgress(100);
			}

			if (isEditing && selectedPartner) {
				const updateData: Record<string, any> = {
					name: formData.name,
					link: formData.link || null,
					active: formData.active,
				};
				if (logoUrl) updateData.footerLogoUrl = logoUrl;
				await setDoc(doc(db, "partners", selectedPartner.id), updateData, { merge: true });
				refetch();
				showToast("success", "Parceiro atualizado com sucesso!");
			} else {
				await addDoc(collection(db, "partners"), {
					name: formData.name,
					link: formData.link || null,
					active: formData.active,
					footerLogoUrl: logoUrl ?? null,
					deleted: false,
				});
				refetch();
				showToast("success", "Parceiro cadastrado com sucesso!");
			}

			if (isEditing) {
				setLogoFile(null);
			} else {
				resetForm();
			}
			setUploadProgress(null);
		} catch (error: any) {
			showToast(
				"error",
				error.message || "Erro desconhecido ao cadastrar parceiro",
			);
			setUploadProgress(null);
		} finally {
			setSaving(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const filteredPartners = localPartners.filter((partner) => {
		const matchesActive =
			activeFilter === "all"
				? true
				: activeFilter === "active"
					? partner.active === true
					: partner.active === false;

		const matchesSearch = searchTerm
			? [partner.name, partner.link].some((val) =>
					val?.toLowerCase().includes(searchTerm.toLowerCase()),
				)
			: true;

		return matchesActive && matchesSearch;
	});

	return (
		<DndProvider backend={HTML5Backend}>
		<div className="flex flex-col md:flex-row w-full">
			{/* Partners Sidebar */}
			<div className="w-full md:w-80 bg-white md:p-4 rounded-lg md:shadow-md h-full">
				<div className="mb-4 space-y-2">
					{/* Active filter - segmented control */}
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
						placeholder="Buscar parceiros (nome, link)..."
						className="w-full p-2 border rounded h-11"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<ul className="custom-scrollbar space-y-2 max-h-[calc(100vh-600px)] md:max-h-[calc(100vh-750px)] min-h-60 min-w-70 md:min-h-110 overflow-y-auto pr-2">
					{filteredPartners.length > 0 ? (
						filteredPartners.map((partner, index) => (
							<DraggablePartnerItem
								key={partner.id}
								partner={partner}
								index={index}
								isSelected={selectedPartner?.id === partner.id}
								onMove={handleMove}
								onSelect={handleSelectPartner}
								onDelete={handleDeleteClick}
							/>
						))
					) : (
						<li className="p-2 text-gray-500 text-center">
							Nenhum parceiro encontrado
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
							{itemToDelete?.deleted
								? "Restaurar Parceiro"
								: "Excluir Parceiro"}
						</DialogTitle>
						<Description className="mt-1">
							{itemToDelete?.deleted
								? "Deseja restaurar este parceiro?"
								: "Tem certeza que deseja excluir este parceiro?"}
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

			{/* Registration Form */}
			<div className="mx-auto max-w-3xl w-full">
				<form
					onSubmit={handlePartner}
					className="bg-white border-t border-f1-black/20 mt-6 pt-6 md:mt-0 md:p-6 md:border-0 md:rounded-lg md:shadow-md"
				>
					<div className="flex justify-between items-center mb-6">
						<div>
							<h2 className="text-2xl font-bold">
								{isEditing
									? "Editar Parceiro"
									: "Cadastrar Novo Parceiro"}
							</h2>
							<div className="flex items-center justify-start gap-2 mt-4">
								<span className="text-sm font-medium">
									Ativo
								</span>
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
						{isEditing && (
							<button
								type="button"
								onClick={resetForm}
								className="px-4 py-1 self-start bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
							>
								Novo Parceiro
							</button>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block mb-1">Nome *</label>
							<input
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
								className="w-full p-2 border rounded h-11"
							/>
						</div>

						<div>
							<label className="block mb-1">Link</label>
							<input
								name="link"
								value={formData.link}
								onChange={handleChange}
								placeholder="https://..."
								className="w-full p-2 border rounded h-11"
							/>
						</div>

						<div className="md:col-span-2">
							<label className="block mb-1">Logo</label>
							<input
								type="file"
								accept="image/*"
								onChange={(e) =>
									e.target.files?.[0] &&
									setLogoFile(e.target.files[0])
								}
								className="w-full p-2 border rounded h-11"
							/>
							{logoFile && (
								<p className="text-sm mt-1 text-gray-600">
									Arquivo selecionado: {logoFile.name}
								</p>
							)}
						</div>

						{isEditing &&
							selectedPartner?.footerLogo?.url &&
							!logoFile && (
								<div className="md:col-span-2 flex gap-4 items-center">
									<span>Logo atual:</span>
									<img
										src={selectedPartner.footerLogo.url}
										alt={`Logo de ${selectedPartner.name}`}
										className="h-12 object-contain border border-gray-300 p-1"
									/>
								</div>
							)}

						{uploadProgress !== null && (
							<div className="md:col-span-2 w-full bg-gray-200 rounded-full h-2.5">
								<div
									className="bg-f1-red h-2.5 rounded-full"
									style={{ width: `${uploadProgress}%` }}
								></div>
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
		</DndProvider>
	);
}
