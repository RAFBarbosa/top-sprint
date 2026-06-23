import { FormEvent, useEffect, useState } from "react";
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/react";
import {
	useGridOptionsQuery,
	useCreateAssetMutation,
	useClassOptionsQuery,
} from "../../graphql/generated";
import { useFirebaseTeams } from "../../shared/hooks/useFirebaseTeams";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { AdminDeleteButton } from "./ui/AdminDeleteButton";
import {
	hasGridClasses,
	getGridClasses,
	GridId,
	getGridConfig,
	getGridLabel,
} from "../../shared/config/grids";
import {
	Dialog,
	DialogTitle,
	DialogPanel,
	Description,
} from "@headlessui/react";
import { tenant } from "../../shared/config/tenants";
import { useTenantConfig } from "../../contexts/TenantConfigContext";
import { doc, setDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { NATIONALITY_OPTIONS } from "../../shared/constants/nationalities";
import { useToast } from "../../contexts/ToastContext";
import { useFirebaseDrivers } from "../../shared/hooks/useFirebaseDrivers";

export function DriverRegistration() {
	const { defaultPhotoStyle } = useTenantConfig();
	// State management
	const [formData, setFormData] = useState({
		name: "",
		number: "",
		grid: "",
		class: "",
		stream: "",
		city: "",
		equipment: "",
		phone: "",
		birthDate: "",
		sex: "",
		nationality: "",
		nationalityCode: "",
		realLifeTeamId: "",
		gameId: "",
	});

	const [photoFile, setPhotoFile] = useState<File | null>(null);
	const [teamId, setTeamId] = useState("");
	const [saving, setSaving] = useState(false);
	const [uploadProgress, setUploadProgress] = useState<number | null>(null);
	const { showToast } = useToast();
	const [selectedDriver, setSelectedDriver] = useState<any>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [gridFilter, setGridFilter] = useState("");

	const [createAsset] = useCreateAssetMutation();
	const { drivers: allDrivers, loading: driversLoading, refetch: refetchDrivers } = useFirebaseDrivers();

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
			await updateDoc(doc(db, "drivers", id), { deleted: !currentDeleted });
			refetchDrivers();
		} catch (error) {
			showToast("error", "Erro ao excluir");
		}
	};

	// Queries (teams from Firebase, enum metadata from Hygraph)
	const { teams: teamsData, loading: teamsLoading } = useFirebaseTeams();
	const {
		data: gridData,
		loading: gridLoading,
		error: gridError,
	} = useGridOptionsQuery();
	const {
		data: classData,
		loading: classLoading,
		error: classError,
	} = useClassOptionsQuery();

	// Helper functions
	const formatEnum = (text: string) =>
		text
			.replace(/([A-Z])/g, " $1")
			.replace(/^./, (str) => str.toUpperCase());

	const handleSelectDriver = (driver: any) => {
		setSelectedDriver(driver);
		setIsEditing(true);
		setFormData({
			name: driver.name ?? "",
			number: driver.number ?? "",
			grid: driver.grid ?? "",
			class: driver.class ?? "",
			stream: driver.stream ?? "",
			city: driver.city ?? "",
			equipment: driver.equipment ?? "",
			phone: driver.phone ?? "",
			birthDate: driver.birthDate ?? "",
			sex: driver.sex ?? "",
			nationality: driver.nationality ?? "",
			nationalityCode: driver.nationalityCode ?? "",
			realLifeTeamId: driver.realLifeTeamId ?? "",
			gameId: driver.gameId ?? "",
		});
		setTeamId(driver.teamHygraphId ?? "");
	};

	const resetForm = () => {
		setSelectedDriver(null);
		setIsEditing(false);
		setFormData({
			name: "",
			number: "",
			grid: "",
			class: "",
			stream: "",
			city: "",
			equipment: "",
			phone: "",
			birthDate: "",
			sex: "",
			nationality: "",
			nationalityCode: "",
			realLifeTeamId: "",
			gameId: "",
		});
		setTeamId("");
		setPhotoFile(null);
	};

	// useEffect(() => {
	// 	if (isEditing && selectedDriver?.team && !teamId) {
	// 		// Fallback: Try to match by team name if ID isn't available
	// 		const matchingTeam = teamsData?.teams?.find(
	// 			(team) => team.name === selectedDriver.team.name,
	// 		);
	// 		if (matchingTeam) {
	// 			setTeamId(matchingTeam.id);
	// 		}
	// 	}
	// }, [isEditing, selectedDriver, teamsData, teamId]);

	const handleDriver = async (event: FormEvent) => {
		event.preventDefault();
		setSaving(true);

		try {
			if (!formData.name) throw new Error("Nome é obrigatório");
			if (!formData.phone) throw new Error("Telefone é obrigatório");
			if (formData.stream && !formData.stream.startsWith("http"))
				throw new Error("URL de stream deve começar com http/https");

			// Photo upload (still via Hygraph asset storage)
			let photoUrl: string | null = selectedDriver?.photoUrl ?? null;
			if (photoFile) {
				try {
					const assetResult = await createAsset({ variables: { data: {} } });
					const asset = assetResult.data?.createAsset;
					const uploadData = asset?.upload?.requestPostData;
					if (!asset?.id || !uploadData?.url)
						throw new Error("Failed to get upload data");

					const fd = new FormData();
					const finalKey = uploadData.key.replace(
						"${filename}",
						encodeURIComponent(photoFile.name),
					);
					fd.append("key", finalKey);
					fd.append("policy", uploadData.policy);
					fd.append("x-amz-algorithm", uploadData.algorithm);
					fd.append("x-amz-credential", uploadData.credential);
					fd.append("x-amz-date", uploadData.date);
					fd.append("x-amz-signature", uploadData.signature);
					if (uploadData.securityToken)
						fd.append("x-amz-security-token", uploadData.securityToken);
					fd.append("file", photoFile);

					const uploadResponse = await fetch(uploadData.url, {
						method: "POST",
						body: fd,
					});
					if (!uploadResponse.ok) throw new Error("Upload failed");

					photoUrl = asset.url;
					setUploadProgress(100);
				} catch (uploadError) {
					throw new Error(`Falha no upload da foto: ${uploadError.message}`);
				}
			}

			// Resolve team details from teamsData
			const selectedTeam = teamsData?.find((t) => t.id === teamId);

			const driverDoc = {
				name: formData.name,
				number: formData.number || null,
				grid: formData.grid || null,
				class: formData.class || null,
				stream: formData.stream || null,
				city: formData.city || null,
				equipment: formData.equipment || null,
				phone: formData.phone || null,
				photoUrl,
				teamHygraphId: selectedTeam?.id ?? null,
				teamName: selectedTeam?.name ?? null,
				teamColor: selectedTeam?.color?.hex ?? null,
				teamLogoUrl: selectedTeam?.photo?.url ?? null,
				birthDate: formData.birthDate || null,
				sex: formData.sex || null,
				nationality: formData.nationality || null,
				nationalityCode: formData.nationalityCode || null,
				realLifeTeamId: formData.realLifeTeamId || null,
				gameId: formData.gameId || null,
				deleted: false,
			};

			if (isEditing && selectedDriver) {
				await setDoc(doc(db, "drivers", selectedDriver.id), driverDoc, {
					merge: true,
				});
				showToast("success", "Piloto atualizado com sucesso!");
			} else {
				await addDoc(collection(db, "drivers"), driverDoc);
				showToast("success", "Piloto cadastrado com sucesso!");
			}

			refetchDrivers();
			if (isEditing) {
				setPhotoFile(null);
			} else {
				resetForm();
			}
			setUploadProgress(null);
		} catch (error) {
			showToast("error", error.message || "Erro ao cadastrar piloto");
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

	const filteredDrivers = allDrivers.filter((driver) => {
		const matchesSearch = searchTerm
			? Object.entries({
					name: driver.name,
					number: driver.number,
					city: driver.city,
					equipment: driver.equipment,
					phone: driver.phone,
					team: driver.teamName,
					gameId: driver.gameId,
				}).some(([_, value]) =>
					value?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
				)
			: true;
		const matchesGrid = gridFilter ? driver.grid === gridFilter : true;
		return matchesSearch && matchesGrid;
	});

	if (teamsLoading || gridLoading || driversLoading || classLoading) {
		return (
			<div className="bg-f1-lightSilver py-10 flex justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-f1-red"></div>
			</div>
		);
	}

	if (gridError || classError) {
		return (
			<div className="bg-f1-lightSilver py-10">
				<div className="max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					Erro ao carregar opções:{" "}
					{gridError?.message || classError?.message}
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col md:flex-row w-full">
			{/* Driver Sidebar */}
			<div className="w-full md:w-80 bg-white md:p-4 rounded-lg md:shadow-md h-full">
				<div className="mb-4 space-y-2">
					<input
						type="text"
						placeholder="Buscar pilotos (nome, número, cidade, etc)..."
						className="w-full p-2 border rounded h-11"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>

					<Listbox value={gridFilter} onChange={setGridFilter}>
						<div className="relative">
							<ListboxButton className="w-full p-2 border rounded flex items-center justify-between cursor-pointer h-11">
								<span className="block truncate">
									{gridFilter
										? getGridLabel(gridFilter)
										: "Todos os grids"}
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
										`flex items-center gap-2 p-2 cursor-pointer ${
											active ? "bg-f1-red/20" : ""
										}`
									}
								>
									Todos os grids
								</ListboxOption>

								{gridData?.__type?.enumValues?.map((option) => (
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
											{getGridLabel(option.name)}
										</span>
									</ListboxOption>
								))}
							</ListboxOptions>
						</div>
					</Listbox>
				</div>

				<ul className="custom-scrollbar space-y-2 max-h-[calc(100vh-600px)] md:max-h-[calc(100vh-750px)] min-h-60 min-w-70 md:min-h-110 overflow-y-auto pr-2">
					{filteredDrivers.length > 0 ? (
						filteredDrivers.map((driver) => (
							<li key={driver.id}>
								<div
									onClick={() => handleSelectDriver(driver)}
									className={`w-full p-2 hover:bg-f1-red/20 rounded flex items-center gap-2 cursor-pointer justify-between overflow-hidden ${
										selectedDriver?.id === driver.id
											? "bg-f1-red/20 font-bold"
											: ""
									}`}
								>
									<div className="flex flex-col items-start">
										<span className="truncate max-w-40">
											{driver.name}
										</span>
									</div>

									<div className="flex gap-4 items-center">
										{(() => {
										const style = getGridConfig(driver.grid)?.photoStyle ?? defaultPhotoStyle;
										return (
											<div className={`w-12 h-12 flex-shrink-0 overflow-hidden ${style === "round" ? "rounded-full" : ""}`}>
												<img
													src={driver.photo?.url || tenant.fallbackDriverPhoto}
													alt={driver.name}
													className={`w-full h-full object-cover ${
														style === "round"
															? "object-center"
															: style === "bust"
																? "scale-200 translate-y-5 object-top"
																: "scale-300 translate-y-10 object-top"
													}`}
												/>
											</div>
										);
									})()}

										<AdminDeleteButton
											deleted={driver.deleted}
											onClick={() => handleDeleteClick(driver.id, driver.deleted)}
										/>
									</div>
								</div>
							</li>
						))
					) : (
						<li className="p-2 text-gray-500 text-center">
							Nenhum piloto encontrado
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
								? "Restaurar Piloto"
								: "Excluir Piloto"}
						</DialogTitle>
						<Description className="mt-1">
							{itemToDelete?.deleted
								? "Deseja restaurar este piloto?"
								: "Tem certeza que deseja excluir este piloto?"}
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
					onSubmit={handleDriver}
					className="bg-white border-t border-f1-black/20 mt-6 pt-6 md:mt-0 md:p-6 md:border-0 md:rounded-lg md:shadow-md"
				>
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold">
							{isEditing
								? "Editar Piloto"
								: "Cadastrar Novo Piloto"}
						</h2>
						{isEditing && (
							<button
								type="button"
								onClick={resetForm}
								className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
							>
								Novo Piloto
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
							<label className="block mb-1">Número</label>
							<input
								name="number"
								type="text"
								value={formData.number}
								onChange={handleChange}
								className="w-full p-2 border rounded h-11"
							/>
						</div>

						<div>
							<label className="block mb-1">ID</label>
							<input
								name="gameId"
								value={formData.gameId}
								onChange={handleChange}
								className="w-full p-2 border rounded h-11"
							/>
						</div>

						<div>
							<label className="block mb-1">Data de Nascimento</label>
							<input
								name="birthDate"
								type="date"
								value={formData.birthDate}
								onChange={handleChange}
								className="w-full p-2 border rounded h-11"
							/>
						</div>

						<div>
							<label className="block mb-1">Sexo</label>
							<Listbox
								value={formData.sex}
								onChange={(value) =>
									setFormData((prev) => ({
										...prev,
										sex: value,
									}))
								}
							>
								<div className="relative">
									<ListboxButton className="w-full p-2 border rounded flex items-center justify-between cursor-pointer h-11">
										<span className="block truncate">
											{formData.sex === "M"
												? "Masculino"
												: formData.sex === "F"
													? "Feminino"
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
										<ListboxOption
											value="M"
											className={({ active }) =>
												`flex items-center gap-2 p-2 cursor-pointer ${
													active ? "bg-f1-red/20" : ""
												}`
											}
										>
											Masculino
										</ListboxOption>
										<ListboxOption
											value="F"
											className={({ active }) =>
												`flex items-center gap-2 p-2 cursor-pointer ${
													active ? "bg-f1-red/20" : ""
												}`
											}
										>
											Feminino
										</ListboxOption>
									</ListboxOptions>
								</div>
							</Listbox>
						</div>

						<div>
							<label className="block mb-1">Nacionalidade</label>
							<Listbox
								value={formData.nationality}
								onChange={(value: string) => {
									const option = NATIONALITY_OPTIONS.find((o) => o.label === value);
									setFormData((prev) => ({
										...prev,
										nationality: value,
										nationalityCode: option?.code || "",
									}));
								}}
							>
								<div className="relative">
									<ListboxButton className="w-full p-2 border rounded flex items-center justify-between cursor-pointer h-11">
										<span className="block truncate">
											{formData.nationality ||
												"Selecione"}
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
										{NATIONALITY_OPTIONS.map(
											(option) => (
												<ListboxOption
													key={option.label}
													value={option.label}
													className={({
														active,
													}) =>
														`flex items-center gap-2 p-2 cursor-pointer ${
															active
																? "bg-f1-red/20"
																: ""
														}`
													}
												>
													{option.label}
												</ListboxOption>
											)
										)}
									</ListboxOptions>
								</div>
							</Listbox>
						</div>

						<div>
							<label className="block mb-1">Equipe Real</label>
							<Listbox
								value={formData.realLifeTeamId}
								onChange={(value) =>
									setFormData((prev) => ({
										...prev,
										realLifeTeamId: value,
									}))
								}
							>
								<div className="relative">
									<ListboxButton className="w-full p-2 border rounded flex items-center justify-between cursor-pointer h-11">
										{formData.realLifeTeamId ? (
											<div className="flex items-center gap-2">
												<img
													src={
														teamsData?.find(
															(t) =>
																t.id ===
																formData.realLifeTeamId
														)?.photo?.url
													}
													alt=""
													className="h-5 w-5 object-contain"
												/>
												<span>
													{
														teamsData?.find(
															(t) =>
																t.id ===
																formData.realLifeTeamId
														)?.name
													}
												</span>
											</div>
										) : (
											"Escolha equipe"
										)}
										<ChevronUpDownIcon
											className="h-5 w-5 text-f1-silver"
											aria-hidden="true"
										/>
									</ListboxButton>
									<ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-f1-bg-silver py-1 shadow-lg">
										<ListboxOption
											value=""
											className={({ active }) =>
												`flex items-center gap-2 p-2 cursor-pointer ${
													active
														? "bg-f1-red/20"
														: ""
												}`
											}
										>
											Escolha equipe
										</ListboxOption>
										{teamsData?.map((team) => (
											<ListboxOption
												key={team.id}
												value={team.id}
												className={({
													active,
												}) =>
													`flex items-center gap-2 p-2 cursor-pointer ${
														active
															? "bg-f1-red/20"
															: ""
														}`
													}
											>
												<img
													src={team.photo?.url}
													alt=""
													className="h-5 w-5 object-contain"
												/>
												<span>{team.name}</span>
											</ListboxOption>
										))}
									</ListboxOptions>
								</div>
							</Listbox>
						</div>

						<div className="hidden">
							<label className="block mb-1 ">Grid *</label>
							<Listbox
								value={formData.grid}
								onChange={(value) => {
									const gridHasClasses = hasGridClasses(
										value as GridId,
									);
									setFormData((prev) => ({
										...prev,
										grid: value,
										class: gridHasClasses ? prev.class : "",
									}));
								}}
							>
								<div className="relative">
									<ListboxButton className="w-full p-2 border rounded flex items-center justify-between cursor-pointer h-11">
										<span className="block truncate">
											{formData.grid
												? getGridLabel(formData.grid)
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

										{gridData?.__type?.enumValues?.map(
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
														{getGridLabel(
															option.name,
														)}
													</span>
												</ListboxOption>
											),
										)}
									</ListboxOptions>
								</div>
							</Listbox>
						</div>
						<div className="hidden">
							<label
								className={`block mb-1 ${!formData.grid || !hasGridClasses(formData.grid as GridId) ? "text-gray-400" : ""}`}
							>
								Classe
							</label>
							<Listbox
								disabled={
									!formData.grid ||
									!hasGridClasses(formData.grid as GridId)
								}
								value={formData.class}
								onChange={(value) =>
									handleChange({
										target: { name: "class", value },
									} as React.ChangeEvent<HTMLSelectElement>)
								}
							>
								<div className="relative">
									<ListboxButton
										className={`w-full p-2 border rounded flex items-center justify-between h-11 ${!formData.grid || !hasGridClasses(formData.grid as GridId) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "cursor-pointer"}`}
									>
										<span className="block truncate">
											{!formData.grid
												? "Selecione um grid"
												: !hasGridClasses(
															formData.grid as GridId,
													  )
													? "Sem classes neste grid"
													: formData.class
														? getGridClasses(
																formData.grid as GridId,
															).find(
																(c) =>
																	c.id ===
																	formData.class,
															)?.label ||
															formatEnum(
																formData.class,
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
												`flex items-center gap-2 p-2 cursor-pointer ${
													active ? "bg-f1-red/20" : ""
												}`
											}
										>
											Selecione
										</ListboxOption>

										{getGridClasses(
											formData.grid as GridId,
										).map((cls) => (
											<ListboxOption
												key={cls.id}
												value={cls.id}
												className={({ active }) =>
													`flex items-center gap-2 p-2 cursor-pointer ${
														active
															? "bg-f1-red/20"
															: ""
													}`
												}
											>
												<span className="block truncate">
													{cls.label}
												</span>
											</ListboxOption>
										))}
									</ListboxOptions>
								</div>
							</Listbox>
						</div>
						<div className="relative hidden">
							<label className="block mb-1">Equipe</label>
							<Listbox
								value={teamId}
								onChange={(value) => setTeamId(value)}
							>
								<ListboxButton className="w-full p-2 border rounded flex items-center justify-between cursor-pointer h-11">
									{teamId ? (
										<div className="flex items-center gap-2">
											<img
												src={
													teamsData?.find(
														(t) => t.id === teamId,
													)?.photo?.url
												}
												alt=""
												className="h-5 w-5 object-contain"
											/>
											<span>
												{
													teamsData?.find(
														(t) => t.id === teamId,
													)?.name
												}
											</span>
										</div>
									) : (
										"Escolha equipe"
									)}
									<ChevronUpDownIcon
										className="h-5 w-5 text-f1-silver"
										aria-hidden="true"
									/>
								</ListboxButton>
								<ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-f1-bg-silver py-1 shadow-lg">
									<ListboxOption
										value=""
										className={({ active }) =>
											`flex items-center gap-2 p-2 cursor-pointer ${active ? "bg-f1-red/20" : ""}`
										}
									>
										Escolha equipe
									</ListboxOption>
									{teamsData?.map((team) => (
										<ListboxOption
											key={team.id}
											value={team.id}
											className={({ active }) =>
												`flex items-center gap-2 p-2 cursor-pointer ${
													active ? "bg-f1-red/20" : ""
												}`
											}
										>
											<img
												src={team.photo?.url}
												alt=""
												className="h-5 w-5 object-contain"
											/>
											<span>{team.name}</span>
										</ListboxOption>
									))}
								</ListboxOptions>
							</Listbox>
						</div>

						<div>
							<label className="block mb-1">Stream URL</label>
							<input
								name="stream"
								value={formData.stream}
								onChange={handleChange}
								className="w-full p-2 border rounded h-11"
							/>
						</div>

						<div>
							<label className="block mb-1">Cidade</label>
							<input
								name="city"
								value={formData.city}
								onChange={handleChange}
								className="w-full p-2 border rounded h-11"
							/>
						</div>

						<div>
							<label className="block mb-1">Equipamento</label>
							<input
								name="equipment"
								value={formData.equipment}
								onChange={handleChange}
								className="w-full p-2 border rounded h-11"
							/>
						</div>

						<div>
							<label className="block mb-1">Telefone *</label>
							<input
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								required
								className="w-full p-2 border rounded h-11"
							/>
						</div>

						<div className="md:col-span-1 md:grid grid-cols-1 gap-4">
							<div>
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
								selectedDriver?.photo?.url &&
								!photoFile && (
									<div className="md:flex gap-4 mt-4 md:mt-0">
										<span className="">Foto atual:</span>
										<img
											src={selectedDriver.photo.url}
											alt={`Foto de ${selectedDriver.name}`}
											className="h-42 w-42 object-cover border border-gray-300 mx-auto mt-[6px]"
										/>
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
