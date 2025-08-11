import { FormEvent, useState } from "react";
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/react";
import {
	useCreateDataMutation,
	useUpdateDataMutation,
	useGetDataQuery,
	useCreateAssetMutation,
	useGridOptionsQuery,
	GetDataDocument,
} from "../../graphql/generated";
import { ChevronUpDownIcon, XMarkIcon } from "@heroicons/react/16/solid";
import {
	Dialog,
	DialogTitle,
	DialogPanel,
	Description,
} from "@headlessui/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function ResultsRegistration() {
	// State management
	const [csvFile, setCsvFile] = useState<File | null>(null);
	const [grid, setGrid] = useState("");
	const [status, setStatus] = useState<{
		type: "idle" | "loading" | "success" | "error";
		message: string;
	}>({ type: "idle", message: "" });
	const [uploadProgress, setUploadProgress] = useState<number | null>(null);
	const [selectedData, setSelectedData] = useState<any>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [itemToDelete, setItemToDelete] = useState<{
		id: string;
		deleted: boolean;
	} | null>(null);

	// GraphQL operations
	const [updateData] = useUpdateDataMutation();
	const [createData] = useCreateDataMutation();
	const [createAsset] = useCreateAssetMutation();
	const { data, loading, error } = useGetDataQuery();
	const {
		data: gridData,
		loading: gridLoading,
		error: gridError,
	} = useGridOptionsQuery();

	const formatDateWithCapitalizedMonth = (dateString: string) => {
		const date = new Date(dateString);
		const day = format(date, "dd", { locale: ptBR });
		const month = format(date, "MMMM", { locale: ptBR });
		const year = format(date, "yyyy", { locale: ptBR });

		const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
		return `${day} de ${capitalizedMonth} de ${year}`;
	};

	// Helper function to format enum values
	const formatEnum = (text: string) =>
		text
			.replace(/([A-Z])/g, " $1")
			.replace(/^./, (str) => str.toUpperCase());

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setStatus({ type: "loading", message: "Enviando dados..." });

		try {
			if (!grid) throw new Error("Grid é obrigatório");
			if (!csvFile && !selectedData?.csv?.url) {
				throw new Error("Arquivo CSV é obrigatório");
			}

			let csvId = null;
			if (csvFile) {
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
					encodeURIComponent(csvFile.name)
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
				formData.append("file", csvFile);

				const uploadResponse = await fetch(uploadData.url, {
					method: "POST",
					body: formData,
				});

				if (!uploadResponse.ok) throw new Error("Upload failed");
				csvId = asset.id;
				setUploadProgress(100);
			}

			if (isEditing && selectedData) {
				await updateData({
					variables: {
						where: { id: selectedData.id },
						data: {
							grid: { set: grid },
							csv: csvId ? { connect: { id: csvId } } : undefined,
							deleted: { set: selectedData.deleted || false },
						},
					},
				});
			} else {
				await createData({
					variables: {
						data: {
							grid,
							csv: csvId ? { connect: { id: csvId } } : null,
							deleted: false,
						},
					},
					update(cache, { data }) {
						const existing = cache.readQuery({
							query: GetDataDocument,
						});
						if (existing && data?.createData) {
							cache.writeQuery({
								query: GetDataDocument,
								data: {
									datas: [data.createData, ...existing.datas],
								},
							});
						}
					},
				});
			}

			setStatus({
				type: "success",
				message: isEditing
					? "Dados atualizados com sucesso!"
					: "Dados cadastrados com sucesso!",
			});

			// Reset form
			setCsvFile(null);
			setGrid("");
			setSelectedData(null);
			setIsEditing(false);
			setUploadProgress(null);

			setTimeout(() => {
				setStatus({ type: "idle", message: "" });
			}, 5000);
		} catch (error) {
			setStatus({
				type: "error",
				message: error.message || "Erro ao processar dados",
			});
			setUploadProgress(null);
		}
	};

	const handleSelectData = (dataItem: any) => {
		setSelectedData(dataItem);
		setIsEditing(true);
		setGrid(dataItem.grid);
	};

	const resetForm = () => {
		setSelectedData(null);
		setIsEditing(false);
		setGrid("");
		setCsvFile(null);
	};

	// Delete functionality
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
			await updateData({
				variables: {
					where: { id },
					data: { deleted: !currentDeleted },
				},
			});
		} catch (error) {
			console.error("Error toggling delete:", error);
		}
	};

	if (loading || gridLoading) {
		return (
			<div className="bg-f1-lightSilver py-10 flex justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-f1-red"></div>
			</div>
		);
	}

	if (error || gridError) {
		return (
			<div className="bg-f1-lightSilver py-10">
				<div className="max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					Erro ao carregar dados:{" "}
					{error?.message || gridError?.message}
				</div>
			</div>
		);
	}

	const gridOptions = gridData?.__type?.enumValues?.map((v) => v.name) || [];

	return (
		<div className="flex flex-col md:flex-row w-full">
			{/* Data Sidebar */}
			<div className="w-full md:w-80 bg-white md:p-4 rounded-lg md:shadow-md h-full">
				{/* <div className="mb-4 space-y-2">
					<input
						type="text"
						placeholder="Buscar resultados..."
						className="w-full p-2 border rounded h-11"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div> */}

				<ul className="custom-scrollbar space-y-2 max-h-[calc(100vh-600px)] md:max-h-[calc(100vh-750px)] min-h-60 min-w-70 md:min-h-110 overflow-y-auto pr-2">
					{data?.datas?.filter((dataItem) =>
						searchTerm
							? dataItem.grid
									.toLowerCase()
									.includes(searchTerm.toLowerCase()) ||
							  dataItem.csv?.url
									?.toLowerCase()
									.includes(searchTerm.toLowerCase())
							: true
					).length > 0 ? (
						data?.datas
							?.filter((dataItem) =>
								searchTerm
									? dataItem.grid
											.toLowerCase()
											.includes(
												searchTerm.toLowerCase()
											) ||
									  dataItem.csv?.url
											?.toLowerCase()
											.includes(searchTerm.toLowerCase())
									: true
							)
							.map((dataItem) => (
								<li key={dataItem.id}>
									<div
										onClick={() =>
											handleSelectData(dataItem)
										}
										className={`w-full p-2 hover:bg-f1-red/20 rounded flex items-center gap-2 cursor-pointer justify-between overflow-hidden ${
											selectedData?.id === dataItem.id
												? "bg-f1-red/20 font-bold"
												: ""
										}`}
									>
										<div className="flex flex-col items-start">
											<span className="truncate max-w-40">
												{formatEnum(dataItem.grid)}
											</span>
											{dataItem.csv?.url && (
												<span className="text-xs text-gray-500">
													{formatDateWithCapitalizedMonth(
														dataItem.createdAt
													)}
												</span>
											)}
										</div>

										<div className="flex gap-4">
											<button
												onClick={(e) =>
													handleDeleteClick(
														dataItem.id,
														dataItem.deleted
													)
												}
												className="z-10 text-f1-red p-1 hover:bg-f1-red hover:text-white rounded cursor-pointer duration-120"
												title={
													dataItem.deleted
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
							Nenhum resultado encontrado
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
								? "Restaurar Resultado"
								: "Excluir Resultado"}
						</DialogTitle>
						<Description className="mt-1">
							{itemToDelete?.deleted
								? "Deseja restaurar este resultado?"
								: "Tem certeza que deseja excluir este resultado?"}
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

			{/* Data Form */}
			<div className="mx-auto max-w-3xl w-full">
				<form
					onSubmit={handleSubmit}
					className="bg-white border-t border-f1-black/20 mt-6 pt-6 md:mt-0 md:p-6 md:border-0 md:rounded-lg md:shadow-md"
				>
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold">
							{isEditing
								? "Editar Resultado"
								: "Cadastrar Novo Resultado"}
						</h2>
						{isEditing && (
							<button
								type="button"
								onClick={resetForm}
								className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
							>
								Novo Resultado
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
						<div>
							<label className="block mb-1">Grid *</label>
							<Listbox value={grid} onChange={setGrid}>
								<div className="relative">
									<ListboxButton className="w-full p-2 border rounded flex items-center justify-between cursor-pointer h-11">
										<span className="block truncate">
											{grid
												? formatEnum(grid)
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
										{gridOptions.map((option) => (
											<ListboxOption
												key={option}
												value={option}
												className={({ active }) =>
													`flex items-center gap-2 p-2 cursor-pointer ${
														active
															? "bg-f1-red/20"
															: ""
													}`
												}
											>
												<span className="block truncate">
													{formatEnum(option)}
												</span>
											</ListboxOption>
										))}
									</ListboxOptions>
								</div>
							</Listbox>
						</div>

						<div className="md:col-span-2 md:grid grid-cols-2 gap-4">
							<div>
								<label className="block mb-1">
									Arquivo CSV *
								</label>
								<input
									type="file"
									accept=".csv"
									onChange={(e) =>
										e.target.files?.[0] &&
										setCsvFile(e.target.files[0])
									}
									className="w-full p-2 border rounded h-11"
								/>
								{csvFile && (
									<p className="text-sm mt-1 text-gray-600">
										Arquivo selecionado: {csvFile.name}
									</p>
								)}
							</div>

							{isEditing &&
								selectedData?.csv?.url &&
								!csvFile && (
									<div className="md:flex gap-4 mt-4 md:mt-0">
										<span className="">Arquivo atual:</span>
										<span className="text-sm text-gray-600">
											{selectedData.csv.url
												.split("/")
												.pop()}
										</span>
									</div>
								)}

							{uploadProgress !== null && (
								<div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
									<div
										className="bg-f1-red h-2.5 rounded-full"
										style={{ width: `${uploadProgress}%` }}
									></div>
								</div>
							)}
						</div>
					</div>

					<button
						type="submit"
						className="bg-f1-carbon border w-full border-f1-carbon text-white px-6 py-2 rounded cursor-pointer duration-120 mt-4 hover:bg-transparent hover:text-f1-carbon"
					>
						{isEditing ? "Atualizar" : "Cadastrar"}
					</button>
				</form>
			</div>
		</div>
	);
}
