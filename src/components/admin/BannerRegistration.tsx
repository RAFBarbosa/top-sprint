import { FormEvent, useEffect, useState, useCallback } from "react";
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/react";
import { useCreateAssetMutation } from "../../graphql/generated";
import { useCalendars } from "../../contexts/CalendarsContext";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import {
	Dialog,
	DialogTitle,
	DialogPanel,
	Description,
} from "@headlessui/react";
import {
	collection,
	addDoc,
	updateDoc,
	doc,
	getDoc,
	setDoc,
	deleteDoc,
	getDocs,
	query,
	orderBy,
	where,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { getGridConfig } from "../../shared/config/grids";
import { useToast } from "../../contexts/ToastContext";
import { useTracks } from "../../contexts/TracksContext";

const CATEGORIES = [
	{ value: "destaque", label: "Destaque" },
	{ value: "secundario", label: "Secundário" },
];

const getCategoryLabel = (value: string) =>
	CATEGORIES.find((c) => c.value === value)?.label ?? value;

const normalizeBanner = (id: string, data: any) => ({
	id,
	title: data.title as string,
	content: data.content as string,
	link: (data.link as string) ?? null,
	category: data.category as string,
	photo: data.photoUrl ? { url: data.photoUrl as string } : null,
	deleted: data.deleted as boolean,
	createdAt:
		data.createdAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
});

function LimitedTextarea({
	value,
	onChange,
	maxLength = 1200,
	...props
}: {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	maxLength?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
	return (
		<div className="relative">
			<textarea
				{...props}
				value={value}
				onChange={(e) => {
					if (e.target.value.length <= maxLength) {
						onChange(e);
					}
				}}
				maxLength={maxLength}
				className={`w-full p-2 border rounded min-h-24 pr-12 ${props.className}`}
			/>
			<div
				className={`absolute bottom-2 right-2 text-xs ${
					value.length >= maxLength * 0.9
						? "text-red-500"
						: "text-gray-500"
				}`}
			>
				{value.length}/{maxLength}
			</div>
		</div>
	);
}

export function BannerRegistration() {
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		link: "",
		category: "",
	});

	const [banners, setBanners] = useState<any[]>([]);
	const [bannersLoading, setBannersLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [photoFile, setPhotoFile] = useState<File | null>(null);
	const [uploadProgress, setUploadProgress] = useState<number | null>(null);
	const { showToast } = useToast();
	const [selectedBanner, setSelectedBanner] = useState<any>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("");
	const [linkedCalendarId, setLinkedCalendarId] = useState<string>("");

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [itemToDelete, setItemToDelete] = useState<{
		id: string;
		deleted: boolean;
	} | null>(null);

const { getTrack } = useTracks();
	const { allCalendars } = useCalendars();
	const [createAsset] = useCreateAssetMutation();


	const loadBanners = useCallback(async () => {
		setBannersLoading(true);
		try {
			const q = query(
				collection(db, "banners"),
				where("deleted", "==", false),
				orderBy("createdAt", "desc"),
			);
			const snap = await getDocs(q);
			setBanners(snap.docs.map((d) => normalizeBanner(d.id, d.data())));
		} finally {
			setBannersLoading(false);
		}
	}, []);

	useEffect(() => {
		loadBanners();
	}, [loadBanners]);

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
			await updateDoc(doc(db, "banners", id), {
				deleted: !currentDeleted,
				updatedAt: serverTimestamp(),
			});
			await loadBanners();
		} catch (error) {
			console.error("Error toggling delete:", error);
		}
	};

	const uploadImage = async (file: File): Promise<string> => {
		const assetResult = await createAsset({ variables: { data: {} } });
		const asset = assetResult.data?.createAsset;
		const uploadData = asset?.upload?.requestPostData;
		if (!asset?.id || !uploadData?.url) throw new Error("Falha ao criar asset");

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

		setUploadProgress(50);
		const uploadResponse = await fetch(uploadData.url, {
			method: "POST",
			body: form,
		});
		if (!uploadResponse.ok) throw new Error("Falha no upload da imagem");
		setUploadProgress(100);

		return asset.url;
	};

	const handleSelectBanner = async (banner: any) => {
		setSelectedBanner(banner);
		setIsEditing(true);
		setFormData({
			title: banner.title,
			content: banner.content,
			link: banner.link || "",
			category: banner.category,
		});
		try {
			const snap = await getDoc(doc(db, "banner_calendar", banner.id));
			setLinkedCalendarId(
				snap.exists() ? (snap.data().calendarId ?? "") : "",
			);
		} catch {
			setLinkedCalendarId("");
		}
	};

	const resetForm = () => {
		setSelectedBanner(null);
		setIsEditing(false);
		setFormData({ title: "", content: "", link: "", category: "" });
		setPhotoFile(null);
		setLinkedCalendarId("");
	};

	const handleBanner = async (event: FormEvent) => {
		event.preventDefault();
		setSaving(true);
		try {
			if (!formData.title) throw new Error("Título é obrigatório");
			if (!formData.content) throw new Error("Conteúdo é obrigatório");
			if (!formData.category) throw new Error("Categoria é obrigatória");
			if (formData.link && !formData.link.startsWith("http"))
				throw new Error("URL da notícia deve começar com http/https");

			let photoUrl: string | null = isEditing
				? (selectedBanner?.photo?.url ?? null)
				: null;

			if (photoFile) {
				photoUrl = await uploadImage(photoFile);
			}

			if (isEditing && selectedBanner) {
				await updateDoc(doc(db, "banners", selectedBanner.id), {
					title: formData.title,
					content: formData.content,
					link: formData.link || null,
					category: formData.category,
					...(photoFile ? { photoUrl } : {}),
					updatedAt: serverTimestamp(),
				});

				const bannerCalRef = doc(
					db,
					"banner_calendar",
					selectedBanner.id,
				);
				if (linkedCalendarId) {
					await setDoc(bannerCalRef, { calendarId: linkedCalendarId });
				} else {
					await deleteDoc(bannerCalRef).catch(() => {});
				}

				showToast("success", "Notícia atualizada com sucesso!");
			} else {
				const docRef = await addDoc(collection(db, "banners"), {
					title: formData.title,
					content: formData.content,
					link: formData.link || null,
					category: formData.category,
					photoUrl: photoUrl || null,
					deleted: false,
					createdAt: serverTimestamp(),
				});

				if (linkedCalendarId) {
					await setDoc(doc(db, "banner_calendar", docRef.id), {
						calendarId: linkedCalendarId,
					});
				}

				showToast("success", "Notícia cadastrada com sucesso!");
				resetForm();
			}

			await loadBanners();
			setUploadProgress(null);
		} catch (error: any) {
			console.error("Registration error:", error);
			showToast(
				"error",
				error.message || "Erro desconhecido ao cadastrar notícia",
			);
			setUploadProgress(null);
		} finally {
			setSaving(false);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const filteredBanners = banners.filter((banner) => {
		const matchesSearch = searchTerm
			? [banner.title, banner.content, banner.link, banner.category]
					.filter(Boolean)
					.some((v) =>
						v.toLowerCase().includes(searchTerm.toLowerCase()),
					)
			: true;
		const matchesCategory = categoryFilter
			? banner.category === categoryFilter
			: true;
		return matchesSearch && matchesCategory;
	});

	const formatDateWithCapitalizedMonth = (dateString: string) => {
		const date = new Date(dateString);
		const day = format(date, "dd", { locale: ptBR });
		const month = format(date, "MMMM", { locale: ptBR });
		const year = format(date, "yyyy", { locale: ptBR });
		const capitalizedMonth =
			month.charAt(0).toUpperCase() + month.slice(1);
		return `${day} de ${capitalizedMonth} de ${year}`;
	};

	if (bannersLoading) {
		return (
			<div className="bg-f1-lightSilver py-10 flex justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-f1-red"></div>
			</div>
		);
	}

	return (
		<div className="flex flex-col md:flex-row w-full">
			{/* Banner Sidebar */}
			<div className="w-full md:w-80 bg-white md:p-4 rounded-lg md:shadow-md h-full">
				<div className="mb-4 space-y-2">
					<input
						type="text"
						placeholder="Buscar notícias (título, conteúdo, link, categoria)..."
						className="w-full p-2 border rounded h-11"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>

					<Listbox
						value={categoryFilter}
						onChange={setCategoryFilter}
					>
						<div className="relative">
							<ListboxButton className="w-full p-2 border rounded flex items-center justify-between cursor-pointer h-11">
								<span className="block truncate">
									{categoryFilter
										? getCategoryLabel(categoryFilter)
										: "Todas as categorias"}
								</span>
								<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
									<ChevronUpDownIcon
										className="h-5 w-5 text-f1-silver"
										aria-hidden="true"
									/>
								</span>
							</ListboxButton>

							<ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-f1-bg-silver py-1 shadow-lg">
								<ListboxOption
									value=""
									className={({ active }) =>
										`flex items-center gap-2 p-2 cursor-pointer ${active ? "bg-f1-red/20" : ""}`
									}
								>
									Todas as categorias
								</ListboxOption>
								{CATEGORIES.map((cat) => (
									<ListboxOption
										key={cat.value}
										value={cat.value}
										className={({ active }) =>
											`flex items-center gap-2 p-2 cursor-pointer ${active ? "bg-f1-red/20" : ""}`
										}
									>
										<span className="block truncate">
											{cat.label}
										</span>
									</ListboxOption>
								))}
							</ListboxOptions>
						</div>
					</Listbox>
				</div>

	<ul className="custom-scrollbar space-y-2 max-h-[calc(100vh-600px)] md:max-h-[calc(100vh-750px)] min-w-70 min-h-60 md:min-h-110 overflow-y-auto pr-2">
					{filteredBanners.length > 0 ? (
						filteredBanners.map((banner) => (
							<li key={banner.id}>
								<div
									onClick={() => handleSelectBanner(banner)}
									className={`w-full p-2 hover:bg-f1-red/20 rounded flex items-center gap-2 cursor-pointer justify-between overflow-hidden ${
										selectedBanner?.id === banner.id
											? "bg-f1-red/20 font-bold"
											: ""
									}`}
								>
									<div className="flex flex-col items-start truncate">
										<span className="truncate max-w-40">
											{banner.title}
										</span>
										<div className="flex flex-col items-start">
											{banner.category && (
												<span className="text-xs text-gray-500">
													•{" "}
													{getCategoryLabel(
														banner.category,
													)}
												</span>
											)}
											{banner.createdAt && (
												<span className="text-xs text-gray-500">
													•{" "}
													{formatDateWithCapitalizedMonth(
														banner.createdAt,
													)}
												</span>
											)}
										</div>
									</div>

									<div className="flex items-center gap-1">
										<div>
											{banner.photo?.url && (
												<img
													src={banner.photo.url}
													alt={banner.title}
													className="w-14 h-14 object-cover"
												/>
											)}
										</div>
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleDeleteClick(
													banner.id,
													banner.deleted,
												);
											}}
											className="text-f1-red p-1 hover:bg-f1-red hover:text-white rounded cursor-pointer duration-120"
											title={
												banner.deleted
													? "Restaurar"
													: "Excluir"
											}
										>
											<TrashIcon className="h-5 w-5" />
										</button>
									</div>
								</div>
							</li>
						))
					) : (
						<li className="p-2 text-gray-500 text-center">
							Nenhuma notícia encontrada
						</li>
					)}
				</ul>
			</div>

			<Dialog
				open={isDeleteModalOpen}
				onClose={cancelDelete}
				className="relative z-10"
			>
				<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
				<div className="fixed inset-0 flex items-center justify-center p-4">
					<DialogPanel className="w-full max-w-md rounded bg-white p-6">
						<DialogTitle className="text-lg font-bold">
							{itemToDelete?.deleted
								? "Restaurar Notícia"
								: "Excluir Notícia"}
						</DialogTitle>
						<Description className="mt-1">
							{itemToDelete?.deleted
								? "Deseja restaurar esta notícia?"
								: "Tem certeza que deseja excluir esta notícia?"}
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
					onSubmit={handleBanner}
					className="bg-white border-t border-f1-black/20 mt-6 pt-6 md:mt-0 md:p-6 md:border-0 md:rounded-lg md:shadow-md"
				>
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold">
							{isEditing
								? "Editar Notícia"
								: "Cadastrar Nova Notícia"}
						</h2>
						{isEditing && (
							<button
								type="button"
								onClick={resetForm}
								className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
							>
								Nova Notícia
							</button>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="md:col-span-2">
							<label className="block mb-1">Título *</label>
							<input
								name="title"
								value={formData.title}
								onChange={handleChange}
								required
								className="w-full p-2 border rounded h-11"
							/>
						</div>
						<div className="md:col-span-2">
							<label className="block mb-1">Conteúdo *</label>
							<LimitedTextarea
								name="content"
								value={formData.content}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										content: e.target.value,
									}))
								}
								required
							/>
						</div>

						<div className="md:col-span-2">
							<label className="block mb-1">Link</label>
							<input
								name="link"
								value={formData.link}
								onChange={handleChange}
								className="w-full p-2 border rounded h-11"
							/>
						</div>

						<div className="md:col-span-2">
							<label className="block mb-1">
								Vincular à Etapa
							</label>
							<Listbox
								value={linkedCalendarId}
								onChange={setLinkedCalendarId}
							>
								<div className="relative">
									<ListboxButton className="w-full p-2 border rounded flex items-center justify-between cursor-pointer h-11 text-left">
										<span className="block truncate">
											{linkedCalendarId
												? (() => {
														const cal =
															calendarsData?.calendars?.find(
																(c) =>
																	c.id ===
																	linkedCalendarId,
															);
														return cal
															? `${getGridConfig(cal.grid)?.label ?? cal.grid} - ${getTrack(cal.trackId)?.name ?? cal.round} - ${format(new Date(cal.date), "dd MMM yyyy", { locale: ptBR })}`
															: linkedCalendarId;
													})()
												: "Nenhuma etapa"}
										</span>
										<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
											<ChevronUpDownIcon
												className="h-5 w-5 text-f1-silver"
												aria-hidden="true"
											/>
										</span>
									</ListboxButton>
									<ListboxOptions className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-f1-bg-silver py-1 shadow-lg">
										<ListboxOption
											value=""
											className={({ active }) =>
												`flex items-center gap-2 p-2 cursor-pointer text-sm ${active ? "bg-f1-red/20" : ""}`
											}
										>
											Nenhuma etapa
										</ListboxOption>
										{[...allCalendars]
											.sort(
												(a, b) =>
													new Date(b.date).getTime() -
													new Date(a.date).getTime(),
											)
											.map((cal) => (
												<ListboxOption
													key={cal.id}
													value={cal.id}
													className={({ active }) =>
														`flex items-center gap-2 p-2 cursor-pointer text-sm ${active ? "bg-f1-red/20" : ""}`
													}
												>
													<span className="block truncate">
														{getGridConfig(cal.grid)
															?.label ??
															cal.grid}{" "}
														-{" "}
														{getTrack(cal.trackId)?.name ??
															cal.round}{" "}
														-{" "}
														{format(
															new Date(cal.date),
															"dd MMM yyyy",
															{ locale: ptBR },
														)}
													</span>
												</ListboxOption>
											))}
									</ListboxOptions>
								</div>
							</Listbox>
						</div>

						<div className="md:col-span-2">
							<label className="block mb-1">Categoria *</label>
							<Listbox
								value={formData.category}
								onChange={(value) =>
									setFormData((prev) => ({
										...prev,
										category: value,
									}))
								}
							>
								<div className="relative">
									<ListboxButton className="w-full p-2 border rounded flex items-center justify-between cursor-pointer h-11">
										<span className="block truncate">
											{formData.category
												? getCategoryLabel(
														formData.category,
													)
												: "Selecione"}
										</span>
										<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
											<ChevronUpDownIcon
												className="h-5 w-5 text-f1-silver"
												aria-hidden="true"
											/>
										</span>
									</ListboxButton>
									<ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-f1-bg-silver py-1 shadow-lg">
										<ListboxOption
											value=""
											className={({ active }) =>
												`flex items-center gap-2 p-2 cursor-pointer ${active ? "bg-f1-red/20" : ""}`
											}
										>
											Selecione
										</ListboxOption>
										{CATEGORIES.map((cat) => (
											<ListboxOption
												key={cat.value}
												value={cat.value}
												className={({ active }) =>
													`flex items-center gap-2 p-2 cursor-pointer ${active ? "bg-f1-red/20" : ""}`
												}
											>
												<span className="block truncate">
													{cat.label}
												</span>
											</ListboxOption>
										))}
									</ListboxOptions>
								</div>
							</Listbox>
						</div>

						<div className="md:col-span-2">
							<label className="block mb-1">Foto</label>
							<input
								type="file"
								accept="image/*"
								onChange={(e) =>
									e.target.files?.[0] &&
									setPhotoFile(e.target.files[0])
								}
								className="w-full p-2 border rounded h-11"
							/>
							{photoFile && (
								<p className="text-sm mt-1 text-gray-600">
									Arquivo selecionado: {photoFile.name}
								</p>
							)}
						</div>

						{isEditing &&
							selectedBanner?.photo?.url &&
							!photoFile && (
								<div className="md:col-span-2">
									<span className="block mb-1">
										Foto atual:
									</span>
									<img
										src={selectedBanner.photo.url}
										alt={`Foto do banner ${selectedBanner.title}`}
										className="h-auto w-full md:w-3/5 mx-auto object-cover border border-gray-300"
									/>
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
