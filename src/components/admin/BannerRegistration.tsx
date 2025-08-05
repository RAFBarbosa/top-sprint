import { FormEvent, useEffect, useState } from "react";
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/react";
import {
	useCreateBannerMutation,
	useGetBannersRegistrationQuery,
	useGetBannersCategoriesQuery,
	useUpdateBannerMutation,
	useCreateAssetMutation,
	GetBannersRegistrationDocument,
} from "../../graphql/generated";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { XMarkIcon } from "@heroicons/react/16/solid";
import {
	Dialog,
	DialogTitle,
	DialogPanel,
	Description,
} from "@headlessui/react";

function LimitedTextarea({
	value,
	onChange,
	maxLength = 300,
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
			<noscript>
				<div className="text-xs text-gray-500 mt-1">
					Máximo de {maxLength} caracteres permitidos
				</div>
			</noscript>
		</div>
	);
}

export function BannerRegistration() {
	// State management
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		link: "",
		category: "",
	});

	const [photoFile, setPhotoFile] = useState<File | null>(null);
	const [status, setStatus] = useState<{
		type: "idle" | "loading" | "success" | "error";
		message: string;
	}>({ type: "idle", message: "" });
	const [uploadProgress, setUploadProgress] = useState<number | null>(null);
	const [selectedBanner, setSelectedBanner] = useState<any>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("");

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

	const handleToggleDelete = async (id: string, currentDeleted: boolean) => {
		try {
			await updateBanner({
				variables: {
					where: { id },
					data: { deleted: !currentDeleted },
				},
			});
		} catch (error) {
			console.error("Error toggling delete:", error);
		}
	};

	// GraphQL operations
	const [createBanner, { loading: createBannerLoading }] =
		useCreateBannerMutation({
			update: (cache, { data }) => {
				const newBanner = data?.createBanner;
				if (!newBanner) return;

				const existingData = cache.readQuery({
					query: GetBannersRegistrationDocument,
					variables: { stage: "DRAFT" },
				});

				if (existingData) {
					cache.writeQuery({
						query: GetBannersRegistrationDocument,
						variables: { stage: "DRAFT" },
						data: {
							banners: [newBanner, ...existingData.banners],
						},
					});
				}
			},
		});

	const [updateBanner, { loading: updateBannerLoading }] =
		useUpdateBannerMutation();
	const [createAsset] = useCreateAssetMutation();

	// Queries
	const {
		data: bannersData,
		loading: bannersLoading,
		error: bannersError,
	} = useGetBannersRegistrationQuery();
	const {
		data: categoriesData,
		loading: categoriesLoading,
		error: categoriesError,
	} = useGetBannersCategoriesQuery();

	// Helper functions
	const formatEnum = (text: string) =>
		text
			.replace(/([A-Z])/g, " $1")
			.replace(/^./, (str) => str.toUpperCase());

	const handleSelectBanner = (banner: any) => {
		setSelectedBanner(banner);
		setIsEditing(true);
		setFormData({
			title: banner.title,
			content: banner.content,
			link: banner.link || "",
			category: banner.category,
		});
	};

	const resetForm = () => {
		setSelectedBanner(null);
		setIsEditing(false);
		setFormData({
			title: "",
			content: "",
			link: "",
			category: "",
		});
		setPhotoFile(null);
	};

	const handleBanner = async (event: FormEvent) => {
		event.preventDefault();
		setStatus({ type: "loading", message: "Enviando dados..." });

		try {
			// Validate required fields
			if (!formData.title) throw new Error("Título é obrigatório");
			if (!formData.content) throw new Error("Conteúdo é obrigatório");
			if (!formData.category) throw new Error("Categoria é obrigatória");

			let photoId = null;
			if (photoFile) {
				try {
					setStatus({
						type: "loading",
						message: "Enviando imagem...",
					});

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
						encodeURIComponent(photoFile.name)
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
					formData.append("file", photoFile);

					const uploadResponse = await fetch(uploadData.url, {
						method: "POST",
						body: formData,
					});

					if (!uploadResponse.ok) throw new Error("Upload failed");

					photoId = asset.id;
					setUploadProgress(100);
				} catch (uploadError) {
					throw new Error(
						`Falha no upload da foto: ${uploadError.message}`
					);
				}
			}

			// Validate category
			const validCategories =
				categoriesData?.__type?.enumValues?.map((v) => v.name) || [];
			if (!validCategories.includes(formData.category)) {
				throw new Error(`Categoria inválida: ${formData.category}`);
			}

			if (formData.link && !formData.link.startsWith("http")) {
				throw new Error("URL da notícia deve começar com http/https");
			}

			if (isEditing && selectedBanner) {
				// Update existing banner
				const result = await updateBanner({
					variables: {
						where: { id: selectedBanner.id },
						data: {
							title: formData.title,
							content: formData.content,
							link: formData.link || null,
							category: formData.category,
							photo: photoId
								? { connect: { id: photoId } }
								: undefined,
						},
					},
				});

				if (result.errors) throw new Error(result.errors[0].message);

				setStatus({
					type: "success",
					message: "Notícia atualizada com sucesso!",
				});
			} else {
				// Create new banner
				const result = await createBanner({
					variables: {
						data: {
							title: formData.title,
							content: formData.content,
							link: formData.link || null,
							category: formData.category,
							photo: photoId
								? { connect: { id: photoId } }
								: null,
						},
					},
					update(cache, { data }) {
						const existing = cache.readQuery({
							query: GetBannersRegistrationDocument,
						});
						if (existing && data?.createBanner) {
							cache.writeQuery({
								query: GetBannersRegistrationDocument,
								data: {
									banners: [
										data.createBanner,
										...existing.banners,
									],
								},
							});
						}
					},
				});

				if (result.errors) throw new Error(result.errors[0].message);

				setStatus({
					type: "success",
					message: "Notícia cadastrada com sucesso!",
				});
			}

			// Reset form after success
			resetForm();
			setUploadProgress(null);

			// Clear success message after 5 seconds
			setTimeout(() => {
				setStatus({ type: "idle", message: "" });
			}, 5000);
		} catch (error) {
			console.error("Registration error:", error);
			setStatus({
				type: "error",
				message:
					error.message || "Erro desconhecido ao cadastrar notícia",
			});
			setUploadProgress(null);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Filter banners based on search term and category filter
	const filteredBanners =
		bannersData?.banners?.filter((banner) => {
			// Search across multiple fields
			const matchesSearch = searchTerm
				? Object.entries({
						title: banner.title,
						content: banner.content,
						link: banner.link,
						category: banner.category,
						date: banner.createdAt,
				  }).some(([_, value]) =>
						value
							?.toString()
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
				  )
				: true;

			// Filter by category
			const matchesCategory = categoryFilter
				? banner.category === categoryFilter
				: true;

			return matchesSearch && matchesCategory;
		}) || [];

	if (bannersLoading || categoriesLoading) {
		return (
			<div className="bg-f1-lightSilver py-10 flex justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-f1-red"></div>
			</div>
		);
	}

	if (bannersError || categoriesError) {
		return (
			<div className="bg-f1-lightSilver py-10">
				<div className="max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					Erro ao carregar opções:{" "}
					{bannersError?.message || categoriesError?.message}
				</div>
			</div>
		);
	}

	const formatDateWithCapitalizedMonth = (dateString: string) => {
		const date = new Date(dateString);
		const day = format(date, "dd", { locale: ptBR });
		const month = format(date, "MMMM", { locale: ptBR });
		const year = format(date, "yyyy", { locale: ptBR });

		const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
		return `${day} de ${capitalizedMonth} de ${year}`;
	};

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
										? formatEnum(categoryFilter)
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
										`flex items-center gap-2 p-2 cursor-pointer ${
											active ? "bg-f1-red/20" : ""
										}`
									}
								>
									Todas as categorias
								</ListboxOption>

								{categoriesData?.__type?.enumValues?.map(
									(option) => (
										<ListboxOption
											key={option.name}
											value={option.name}
											className={({ active }) =>
												`flex items-center gap-2 p-2 cursor-pointer ${
													active ? "bg-f1-red/20" : ""
												}`
											}
										>
											<span className="block truncate">
												{formatEnum(option.name)}
											</span>
										</ListboxOption>
									)
								)}
							</ListboxOptions>
						</div>
					</Listbox>
				</div>

				<ul className="custom-scrollbar space-y-2 max-h-[calc(100vh-600px)] md:max-h-[calc(100vh-750px)] min-h-60 md:min-h-110 overflow-y-auto pr-2">
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
										<span className="truncate max-w-48">
											{banner.title}
										</span>
										<div className="flex flex-col items-start">
											{banner.category && (
												<span className="text-xs text-gray-500">
													•{" "}
													{formatEnum(
														banner.category
													)}
												</span>
											)}
											{banner.createdAt && (
												<span className="text-xs text-gray-500">
													•{" "}
													{formatDateWithCapitalizedMonth(
														banner.createdAt
													)}
												</span>
											)}
										</div>
									</div>

									<div className="flex gap-6 items-center">
										<div>
											{banner.photo?.url && (
												<img
													src={banner.photo.url}
													alt={banner.title}
													className="w-8 h-8 object-cover scale-220"
												/>
											)}
										</div>
										<button
											onClick={() =>
												handleDeleteClick(
													banner.id,
													banner.deleted
												)
											}
											className="z-10 text-f1-red p-1 hover:bg-f1-red hover:text-white rounded cursor-pointer duration-120"
											title={
												banner.deleted
													? "Restaurar"
													: "Excluir"
											}
										>
											<XMarkIcon className="h-5 w-5" />
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
				className="relative z-50"
			>
				{/* Backdrop */}
				<div className="fixed inset-0 bg-black/30" aria-hidden="true" />

				{/* Modal container */}
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
							<label className="block mb-1">Conteúdo *</label>{" "}
							<LimitedTextarea
								name="content"
								value={formData.content}
								onChange={handleChange}
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
							<label className="block mb-1">Categoria *</label>
							<Listbox
								value={formData.category}
								onChange={(value) =>
									handleChange({
										target: { name: "category", value },
									} as React.ChangeEvent<HTMLSelectElement>)
								}
							>
								<div className="relative">
									<ListboxButton className="w-full p-2 border rounded flex items-center justify-between cursor-pointer h-11">
										<span className="block truncate">
											{formData.category
												? formatEnum(formData.category)
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
												`flex items-center gap-2 p-2 cursor-pointer ${
													active ? "bg-f1-red/20" : ""
												}`
											}
										>
											Selecione
										</ListboxOption>

										{categoriesData?.__type?.enumValues?.map(
											(option) => (
												<ListboxOption
													key={option.name}
													value={option.name}
													className={({ active }) =>
														`flex items-center gap-2 p-2 cursor-pointer ${
															active
																? "bg-f1-red/20"
																: ""
														}`
													}
												>
													<span className="block truncate">
														{formatEnum(
															option.name
														)}
													</span>
												</ListboxOption>
											)
										)}
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
									className="bg-f1-red h-2.5 rounded-full"
									style={{ width: `${uploadProgress}%` }}
								></div>
							</div>
						)}
					</div>

					<button
						type="submit"
						disabled={createBannerLoading || updateBannerLoading}
						className="bg-f1-carbon border w-full border-f1-carbon text-white px-6 py-2 rounded cursor-pointer duration-120 mt-4 disabled:opacity-50 hover:bg-transparent hover:text-f1-carbon"
					>
						{createBannerLoading || updateBannerLoading
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
