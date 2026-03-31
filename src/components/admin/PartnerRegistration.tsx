import { FormEvent, useState } from "react";
import {
	useCreatePartnerMutation,
	useUpdatePartnerMutation,
	useGetPartnersRegistrationQuery,
	useCreateAssetMutation,
	GetPartnersRegistrationDocument,
} from "../../graphql/generated";
import {
	Dialog,
	DialogTitle,
	DialogPanel,
	Description,
} from "@headlessui/react";

export function PartnerRegistration() {
	const [formData, setFormData] = useState({
		name: "",
		link: "",
		active: true,
	});

	const [logoFile, setLogoFile] = useState<File | null>(null);
	const [status, setStatus] = useState<{
		type: "idle" | "loading" | "success" | "error";
		message: string;
	}>({ type: "idle", message: "" });
	const [uploadProgress, setUploadProgress] = useState<number | null>(null);
	const [selectedPartner, setSelectedPartner] = useState<any>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [activeFilter, setActiveFilter] = useState<
		"all" | "active" | "inactive"
	>("all");

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [itemToDelete, setItemToDelete] = useState<{
		id: string;
		deleted: boolean;
	} | null>(null);

	const [createPartner, { loading: createPartnerLoading }] =
		useCreatePartnerMutation({
			refetchQueries: [{ query: GetPartnersRegistrationDocument }],
			awaitRefetchQueries: true,
		});
	const [updatePartner, { loading: updatePartnerLoading }] =
		useUpdatePartnerMutation({
			refetchQueries: [{ query: GetPartnersRegistrationDocument }],
			awaitRefetchQueries: true,
		});
	const [createAsset] = useCreateAssetMutation();

	const { data: partnersData, error: partnersError } =
		useGetPartnersRegistrationQuery({
			fetchPolicy: "network-only",
		});

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
			await updatePartner({
				variables: {
					where: { id },
					data: { deleted: !currentDeleted },
				},
			});
		} catch (error) {
			console.error("Error toggling delete:", error);
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
		setStatus({ type: "loading", message: "Enviando dados..." });

		try {
			if (!formData.name) throw new Error("Nome é obrigatório");
			if (formData.link && !formData.link.startsWith("http")) {
				throw new Error("URL deve começar com http/https");
			}

			let logoId = null;
			if (logoFile) {
				setStatus({ type: "loading", message: "Enviando imagem..." });

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

				logoId = asset.id;
				setUploadProgress(100);
			}

			if (isEditing && selectedPartner) {
				const result = await updatePartner({
					variables: {
						where: { id: selectedPartner.id },
						data: {
							name: formData.name,
							link: formData.link || null,
							active: formData.active,
							footerLogo: logoId
								? { connect: { id: logoId } }
								: undefined,
						},
					},
				});

				if (result.errors) throw new Error(result.errors[0].message);

				setStatus({
					type: "success",
					message: "Parceiro atualizado com sucesso!",
				});
			} else {
				const result = await createPartner({
					variables: {
						data: {
							name: formData.name,
							link: formData.link || null,
							active: formData.active,
							deleted: false,
							footerLogo: logoId
								? { connect: { id: logoId } }
								: undefined,
						},
					},
				});

				if (result.errors) throw new Error(result.errors[0].message);

				setStatus({
					type: "success",
					message: "Parceiro cadastrado com sucesso!",
				});
			}

			if (isEditing) {
				setLogoFile(null);
			} else {
				resetForm();
			}
			setUploadProgress(null);

			setTimeout(() => {
				setStatus({ type: "idle", message: "" });
			}, 5000);
		} catch (error) {
			console.error("Registration error:", error);
			setStatus({
				type: "error",
				message:
					error.message || "Erro desconhecido ao cadastrar parceiro",
			});
			setUploadProgress(null);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const filteredPartners = (partnersData?.partners ?? []).filter(
		(partner) => {
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
		},
	);

	if (partnersError) {
		return (
			<div className="bg-f1-lightSilver py-10">
				<div className="max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					Erro ao carregar parceiros: {partnersError.message}
				</div>
			</div>
		);
	}

	return (
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
						filteredPartners.map((partner) => (
							<li key={partner.id}>
								<div
									onClick={() => handleSelectPartner(partner)}
									className={`w-full p-2 hover:bg-f1-red/20 rounded flex items-center gap-2 cursor-pointer justify-between overflow-hidden ${
										selectedPartner?.id === partner.id
											? "bg-f1-red/20 font-bold"
											: ""
									}`}
								>
									<div className="flex items-center gap-2">
										{partner.footerLogo?.url && (
											<img
												src={partner.footerLogo.url}
												alt={partner.name}
												className="w-8 h-8 object-contain"
											/>
										)}
										<div className="flex flex-col items-start">
											<span className="truncate max-w-36">
												{partner.name}
											</span>
											{/* {!partner.active && (
												<span className="text-xs text-gray-400">
													• Inativo
												</span>
											)} */}
										</div>
									</div>

									<button
										onClick={(e) => {
											e.stopPropagation();
											handleDeleteClick(
												partner.id,
												partner.deleted,
											);
										}}
										className="z-10 text-f1-red p-1 hover:bg-f1-red hover:text-white rounded cursor-pointer duration-120"
										title={
											partner.deleted
												? "Restaurar"
												: "Excluir"
										}
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
						disabled={createPartnerLoading || updatePartnerLoading}
						className="bg-f1-carbon border w-full border-f1-carbon text-white px-6 py-2 rounded cursor-pointer duration-120 mt-4 disabled:opacity-50 hover:bg-transparent hover:text-f1-carbon"
					>
						{createPartnerLoading || updatePartnerLoading
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
