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
import { ChevronUpDownIcon, PlusIcon } from "@heroicons/react/16/solid";
import { AdminDeleteButton } from "./ui/AdminDeleteButton";
import {
	Dialog,
	DialogTitle,
	DialogPanel,
	Description,
} from "@headlessui/react";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { getGridLabel } from "../../shared/config/grids";
import { useCalculateDriverStats } from "../../shared/hooks/useCalculateDriverStats";
import { useToast } from "../../contexts/ToastContext";

const NEW_ID = "__new__";

export function ResultsRegistration() {
	const [csvFile, setCsvFile] = useState<File | null>(null);
	const [grid, setGrid] = useState("");
	const [uploadProgress, setUploadProgress] = useState<number | null>(null);
	const [saving, setSaving] = useState(false);
	const { showToast } = useToast();
	const [expandedId, setExpandedId] = useState<string | null>(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [itemToDelete, setItemToDelete] = useState<{
		id: string;
		deleted: boolean;
	} | null>(null);
	const [title, setTitle] = useState("");
	const [gridFilter, setGridFilter] = useState("");

	const [updateData] = useUpdateDataMutation({
		refetchQueries: [{ query: GetDataDocument }],
		awaitRefetchQueries: true,
	});
	const [createData] = useCreateDataMutation({
		refetchQueries: [{ query: GetDataDocument }],
		awaitRefetchQueries: true,
	});
	const [createAsset] = useCreateAssetMutation();
	const { data, loading, error } = useGetDataQuery({
		fetchPolicy: "network-only",
	});
	const {
		data: gridData,
		loading: gridLoading,
		error: gridError,
	} = useGridOptionsQuery();
	const { triggerForGrid } = useCalculateDriverStats();

	const formatDateShort = (dateString: string) => {
		const date = new Date(dateString);
		const day = format(date, "dd", { locale: ptBR });
		const month = format(date, "MMM", { locale: ptBR });
		const year = format(date, "yyyy", { locale: ptBR });
		const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
		return `${day} ${capitalizedMonth} ${year}`;
	};

	const resetFormState = () => {
		setGrid("");
		setCsvFile(null);
		setTitle("");
		setUploadProgress(null);
	};

	const handleSelectData = (dataItem: any) => {
		if (expandedId === dataItem.id) {
			setExpandedId(null);
			return;
		}
		setExpandedId(dataItem.id);
		setGrid(dataItem.grid);
		setTitle(dataItem.title || "");
		setCsvFile(null);
	};

	const handleNewResult = () => {
		if (expandedId === NEW_ID) {
			setExpandedId(null);
			return;
		}
		setExpandedId(NEW_ID);
		resetFormState();
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setSaving(true);

		const isEditing = expandedId !== null && expandedId !== NEW_ID;
		const selectedData = isEditing
			? data?.datas?.find((d) => d.id === expandedId)
			: null;

		try {
			if (!grid) throw new Error("Grid é obrigatório");
			if (!csvFile && !selectedData?.csv?.url) {
				throw new Error("Arquivo CSV é obrigatório");
			}

			let csvId = null;
			if (csvFile) {
				const assetResult = await createAsset({ variables: { data: {} } });
				const asset = assetResult.data?.createAsset;
				const uploadData = asset?.upload?.requestPostData;
				if (!asset?.id || !uploadData?.url) throw new Error("Failed to get upload data");

				const formData = new FormData();
				const finalKey = uploadData.key.replace(
					"${filename}",
					encodeURIComponent(csvFile.name),
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
				formData.append("file", csvFile);

				const uploadResponse = await fetch(uploadData.url, { method: "POST", body: formData });
				if (!uploadResponse.ok) throw new Error("Upload failed");
				csvId = asset.id;
				setUploadProgress(100);
			}

			if (isEditing && selectedData) {
				await updateData({
					variables: {
						where: { id: selectedData.id },
						data: {
							grid: grid || undefined,
							csv: csvId ? { connect: { id: csvId } } : undefined,
							title: title || null,
							deleted: selectedData.deleted || false,
						},
					},
				});
			} else {
				await createData({
					variables: {
						data: {
							grid,
							csv: csvId ? { connect: { id: csvId } } : null,
							title: title || null,
							deleted: false,
						},
					},
				});
			}

			showToast(
				"success",
				isEditing ? "Dados atualizados com sucesso!" : "Dados cadastrados com sucesso!",
			);

			if (!isEditing) {
				resetFormState();
			} else {
				setCsvFile(null);
				setUploadProgress(null);
			}

			if (grid) triggerForGrid(grid).catch(console.error);
		} catch (error: any) {
			showToast("error", error.message || "Erro ao processar dados");
			setUploadProgress(null);
		} finally {
			setSaving(false);
		}
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
			await updateData({ variables: { where: { id }, data: { deleted: !currentDeleted } } });
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
					Erro ao carregar dados: {error?.message || gridError?.message}
				</div>
			</div>
		);
	}

	const gridOptions = gridData?.__type?.enumValues?.map((v) => v.name) || [];

	const filteredData = (data?.datas ?? []).filter(
		(d) => !gridFilter || d.grid === gridFilter,
	);

	const renderForm = (dataItemId: string | null) => {
		const isEditing = dataItemId !== null && dataItemId !== NEW_ID;
		const selectedData = isEditing ? data?.datas?.find((d) => d.id === dataItemId) : null;

		return (
			<div className="border-t border-f1-red/20 bg-f1-red/5 p-4">
				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<div>
							<label className="block mb-1 text-sm">Título</label>
							<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="w-full px-2 border rounded h-9 text-sm bg-white"
							/>
						</div>

						<div>
							<label className="block mb-1 text-sm">Grid *</label>
							<Listbox value={grid} onChange={setGrid}>
								<div className="relative">
									<ListboxButton className="w-full px-2 border rounded flex items-center justify-between cursor-pointer h-9 bg-white text-sm">
										<span className="block truncate">
											{grid ? getGridLabel(grid) : "Selecione"}
										</span>
										<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
											<ChevronUpDownIcon className="h-5 w-5 text-f1-silver" />
										</span>
									</ListboxButton>
									<ListboxOptions className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-f1-bg-silver py-1 shadow-lg">
										<ListboxOption
											value=""
											className={({ active }) =>
												`flex items-center gap-2 p-2 cursor-pointer text-sm ${active ? "bg-f1-red/20" : ""}`
											}
										>
											Selecione
										</ListboxOption>
										{gridOptions.map((option) => (
											<ListboxOption
												key={option}
												value={option}
												className={({ active }) =>
													`flex items-center gap-2 p-2 cursor-pointer text-sm ${active ? "bg-f1-red/20" : ""}`
												}
											>
												<span className="block truncate">{getGridLabel(option)}</span>
											</ListboxOption>
										))}
									</ListboxOptions>
								</div>
							</Listbox>
						</div>

						<div className="md:col-span-2">
							<label className="block mb-1 text-sm">Arquivo CSV *</label>
							<input
								type="file"
								accept=".csv"
								onChange={(e) => e.target.files?.[0] && setCsvFile(e.target.files[0])}
								className="w-full px-2 border rounded h-9 text-sm bg-white"
							/>
							{csvFile && (
								<p className="text-xs mt-1 text-gray-600">Selecionado: {csvFile.name}</p>
							)}
							{isEditing && selectedData?.csv?.url && !csvFile && (
								<p className="text-xs mt-1 text-gray-500">
									Atual: {decodeURIComponent(selectedData.csv.fileName)}
								</p>
							)}
							{uploadProgress !== null && (
								<div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
									<div
										className="bg-f1-red h-1.5 rounded-full"
										style={{ width: `${uploadProgress}%` }}
									/>
								</div>
							)}
						</div>
					</div>

					<button
						type="submit"
						disabled={saving}
						className="bg-f1-carbon border w-full border-f1-carbon text-white px-6 py-2 rounded cursor-pointer duration-120 mt-4 disabled:opacity-50 hover:bg-transparent hover:text-f1-carbon text-sm font-medium"
					>
						{saving
							? isEditing
								? "Atualizando..."
								: "Cadastrando..."
							: isEditing
								? "Atualizar Resultado"
								: "Cadastrar Resultado"}
					</button>
				</form>
			</div>
		);
	};

	return (
		<div className="w-full">
			{/* Filters + Novo Resultado */}
			<div className="flex items-center gap-2 mb-3">
				<Listbox value={gridFilter} onChange={setGridFilter}>
					<div className="relative flex-1">
						<ListboxButton className="w-full px-2 border rounded flex items-center justify-between cursor-pointer h-9 bg-white text-sm">
							<span className="block truncate">
								{gridFilter ? getGridLabel(gridFilter) : "Todos os grids"}
							</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
								<ChevronUpDownIcon className="h-5 w-5 text-f1-silver" />
							</span>
						</ListboxButton>
						<ListboxOptions className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-f1-bg-silver py-1 shadow-lg">
							<ListboxOption
								value=""
								className={({ active }) =>
									`flex items-center gap-2 p-2 cursor-pointer text-sm ${active ? "bg-f1-red/20" : ""}`
								}
							>
								Todos os grids
							</ListboxOption>
							{gridOptions.map((option) => (
								<ListboxOption
									key={option}
									value={option}
									className={({ active }) =>
										`flex items-center gap-2 p-2 cursor-pointer text-sm ${active ? "bg-f1-red/20" : ""}`
									}
								>
									<span className="block truncate">{getGridLabel(option)}</span>
								</ListboxOption>
							))}
						</ListboxOptions>
					</div>
				</Listbox>
				<button
					type="button"
					onClick={handleNewResult}
					className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm font-medium cursor-pointer duration-120 shrink-0 ${
						expandedId === NEW_ID
							? "bg-f1-red/20 text-f1-red"
							: "bg-f1-red text-white hover:bg-f1-red/80"
					}`}
				>
					<PlusIcon className="h-4 w-4" />
					Novo Resultado
				</button>
			</div>

			{/* Create form */}
			{expandedId === NEW_ID && (
				<div className="mb-3 bg-white rounded border border-f1-red/30 overflow-hidden">
					<div className="px-4 py-2 bg-f1-red/10 border-b border-f1-red/20">
						<h3 className="text-sm font-bold text-f1-red uppercase tracking-wide">
							Novo Resultado
						</h3>
					</div>
					{renderForm(NEW_ID)}
				</div>
			)}

			{/* List */}
			<ul className="space-y-[2px]">
				{filteredData.length > 0 ? (
					filteredData.map((dataItem) => (
						<li
							key={dataItem.id}
							className={`bg-white rounded ${expandedId === dataItem.id ? "ring-1 ring-f1-red/30" : ""}`}
						>
							<div
								onClick={() => handleSelectData(dataItem)}
								className={`w-full px-3 py-2 hover:bg-f1-red/10 flex items-center gap-3 cursor-pointer ${
									expandedId === dataItem.id ? "bg-f1-red/10" : ""
								}`}
							>
								<div className="flex flex-col flex-1 min-w-0">
									<span className={`text-sm truncate ${expandedId === dataItem.id ? "font-bold" : "font-medium"}`}>
										{getGridLabel(dataItem.grid)}
										{dataItem.title ? ` — ${dataItem.title}` : ""}
									</span>
									<span className={`text-xs text-gray-500 ${expandedId === dataItem.id ? "font-bold" : ""}`}>
										{formatDateShort(dataItem.createdAt)}
										{dataItem.deleted && (
											<span className="ml-1 text-[10px] bg-gray-200 text-gray-500 px-1 rounded font-medium">
												EXCLUÍDO
											</span>
										)}
									</span>
								</div>
								<AdminDeleteButton
									deleted={dataItem.deleted}
									onClick={() => handleDeleteClick(dataItem.id, dataItem.deleted)}
								/>
							</div>

							{expandedId === dataItem.id && renderForm(dataItem.id)}
						</li>
					))
				) : (
					<li className="p-4 text-gray-500 text-center text-sm bg-white rounded">
						Nenhum resultado encontrado
					</li>
				)}
			</ul>

			{/* Delete modal */}
			<Dialog open={isDeleteModalOpen} onClose={cancelDelete} className="relative z-50">
				<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
				<div className="fixed inset-0 flex items-center justify-center p-4">
					<DialogPanel className="w-full max-w-md rounded bg-white p-6">
						<DialogTitle className="text-lg font-bold">
							{itemToDelete?.deleted ? "Restaurar Resultado" : "Excluir Resultado"}
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
								{itemToDelete?.deleted ? "Restaurar" : "Excluir"}
							</button>
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</div>
	);
}
