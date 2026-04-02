import { FormEvent, useState, useEffect } from "react";
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/react";
import {
	useCreateTeamMutation,
	useGetTeamsQuery,
	useCreateAssetMutation,
	useUpdateTeamMutation,
	useUpdateDriverMutation,
	GetTeamsDocument,
} from "../../graphql/generated";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import {
	Dialog,
	DialogTitle,
	DialogPanel,
	Description,
} from "@headlessui/react";
import { tenant } from "../../shared";
import { getGridLabel } from "../../shared/config/grids";

export function TeamRegistration() {
	// State management
	const [formData, setFormData] = useState({
		name: "",
		color: "#000000",
	});

	const [logoFile, setLogoFile] = useState<File | null>(null);
	const [status, setStatus] = useState<{
		type: "idle" | "loading" | "success" | "error";
		message: string;
	}>({ type: "idle", message: "" });
	const [uploadProgress, setUploadProgress] = useState<number | null>(null);
	const [selectedTeam, setSelectedTeam] = useState<any>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const [updateTeam, { loading: updateTeamLoading }] =
		useUpdateTeamMutation();
	const [updateDriver] = useUpdateDriverMutation({
		refetchQueries: [{ query: GetTeamsDocument }],
		awaitRefetchQueries: true,
	});
	const [createAsset] = useCreateAssetMutation();

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
			await updateTeam({
				variables: {
					where: { id },
					data: { deleted: !currentDeleted },
				},
			});
		} catch (error) {
			console.error("Error toggling delete:", error);
		}
	};

	const [createTeam, { loading: createTeamLoading }] = useCreateTeamMutation({
		update: (cache, { data }) => {
			const newTeam = data?.createTeam;
			if (!newTeam) return;

			const existingData = cache.readQuery({
				query: GetTeamsDocument,
			});

			if (existingData) {
				cache.writeQuery({
					query: GetTeamsDocument,
					data: {
						teams: [newTeam, ...existingData.teams],
					},
				});
			}
		},
	});

	// Firebase driver profiles (teamName per grid)
	const [allProfiles, setAllProfiles] = useState<Record<string, Record<string, { teamName?: string; reserve?: boolean }>>>({});

	useEffect(() => {
		getDocs(collection(db, "driver_profiles")).then((snap) => {
			const map: Record<string, Record<string, { teamName?: string }>> = {};
			snap.forEach((d) => { map[d.id] = d.data() as any; });
			setAllProfiles(map);
		}).catch(() => {});
	}, []);

	// Queries
	const {
		data: teamsData,
		loading: teamsLoading,
		error: teamsError,
	} = useGetTeamsQuery();

	const handleSelectTeam = (team: any) => {
		setSelectedTeam(team);
		setIsEditing(true);
		setFormData({
			name: team.name,
			color: team.color?.hex || "#000000",
		});
	};

	const resetForm = () => {
		setSelectedTeam(null);
		setIsEditing(false);
		setFormData({
			name: "",
			color: "#000000",
		});
		setLogoFile(null);
	};

	const handleTeam = async (event: FormEvent) => {
		event.preventDefault();
		setStatus({ type: "loading", message: "Enviando dados..." });

		try {
			// Validate required fields
			if (!formData.name) throw new Error("Nome é obrigatório");

			let logoId = null;
			if (logoFile) {
				try {
					setStatus({
						type: "loading",
						message: "Enviando logo...",
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
						encodeURIComponent(logoFile.name),
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
							uploadData.securityToken,
						);
					}
					formData.append("file", logoFile);

					const uploadResponse = await fetch(uploadData.url, {
						method: "POST",
						body: formData,
					});

					if (!uploadResponse.ok) throw new Error("Upload failed");

					logoId = asset.id;
					setUploadProgress(100);
				} catch (uploadError) {
					throw new Error(
						`Falha no upload do logo: ${uploadError.message}`,
					);
				}
			}

			if (isEditing && selectedTeam) {
				// Update existing team
				const result = await updateTeam({
					variables: {
						where: { id: selectedTeam.id },
						data: {
							name: formData.name,
							color: { hex: formData.color },
							photo: logoId
								? { connect: { id: logoId } }
								: undefined,
						},
					},
				});

				if (result.errors) throw new Error(result.errors[0].message);

				setStatus({
					type: "success",
					message: "Equipe atualizada com sucesso!",
				});
			} else {
				// Create new team
				const result = await createTeam({
					variables: {
						data: {
							name: formData.name,
							color: { hex: formData.color },
							photo: logoId ? { connect: { id: logoId } } : null,
						},
					},
					update(cache, { data }) {
						const existing = cache.readQuery({
							query: GetTeamsDocument,
						});
						if (existing && data?.createTeam) {
							cache.writeQuery({
								query: GetTeamsDocument,
								data: {
									teams: [data.createTeam, ...existing.teams],
								},
							});
						}
					},
				});

				if (result.errors) throw new Error(result.errors[0].message);

				setStatus({
					type: "success",
					message: "Equipe cadastrada com sucesso!",
				});
			}

			// Reset form after success
			if (isEditing) {
				setLogoFile(null);
			} else {
				resetForm();
			}
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
					error.message || "Erro desconhecido ao cadastrar equipe",
			});
			setUploadProgress(null);
		}
	};

	const handleRemoveDriver = async (driverId: string, gridId: string) => {
		// Clear teamName in Firebase profile for this grid
		const profiles = allProfiles[driverId];
		if (profiles?.[gridId]) {
			const updated = {
				...profiles,
				[gridId]: { ...profiles[gridId], teamName: "", teamColor: "" },
			};
			await setDoc(doc(db, "driver_profiles", driverId), updated);
			setAllProfiles((prev) => ({ ...prev, [driverId]: updated }));
		}
		// Also disconnect Hygraph team relation
		updateDriver({
			variables: { where: { id: driverId }, data: { team: { disconnect: true } } },
		});
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Filter teams based on search term
	const filteredTeams =
		teamsData?.teams?.filter((team) => {
			return searchTerm
				? team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
						(team.color?.hex &&
							team.color.hex
								.toLowerCase()
								.includes(searchTerm.toLowerCase()))
				: true;
		}) || [];

	// Compute team drivers for the form — merge Hygraph team relation + Firebase grid profiles
	const teamDrivers = isEditing && selectedTeam
		? (teamsData?.drivers ?? []).filter((d) => {
				// Match via Hygraph team relation
				if (d.team?.id === selectedTeam.id) return true;
				// Match via any Firebase grid profile
				const profiles = allProfiles[d.id];
				if (!profiles) return false;
				return Object.values(profiles).some(
					(p) => p?.teamName === selectedTeam.name,
				);
			})
		: [];

	// Build grid grouping — prefer Firebase profile grid, fall back to Hygraph grid field
	const byGrid = teamDrivers.reduce<Record<string, typeof teamDrivers>>(
		(acc, d) => {
			const profiles = allProfiles[d.id];
			const gridsFromProfiles = profiles
				? Object.entries(profiles)
						.filter(([, p]) => p?.teamName === selectedTeam?.name)
						.map(([gridId]) => gridId)
				: [];
			const keys = gridsFromProfiles.length > 0
				? gridsFromProfiles
				: [d.grid ?? "Sem grid"];
			keys.forEach((key) => {
				if (!acc[key]) acc[key] = [];
				if (!acc[key].find((x) => x.id === d.id)) acc[key].push(d);
			});
			return acc;
		},
		{},
	);
	// Sort drivers within each grid by name for stable ordering
	Object.values(byGrid).forEach((drivers) =>
		drivers.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "")),
	);
	const sortedGridEntries = Object.entries(byGrid).sort(([a], [b]) =>
		a.localeCompare(b),
	);

	if (teamsLoading) {
		return (
			<div className="bg-f1-lightSilver py-10 flex justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-f1-red"></div>
			</div>
		);
	}

	if (teamsError) {
		return (
			<div className="bg-f1-lightSilver py-10">
				<div className="max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					Erro ao carregar equipes: {teamsError.message}
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col md:flex-row w-full">
			{/* Teams Sidebar */}
			<div className="w-full md:w-80 bg-white md:p-4 rounded-lg md:shadow-md h-full">
				<div className="mb-4">
					<input
						type="text"
						placeholder="Buscar equipes (nome, cor, etc)..."
						className="w-full p-2 border rounded h-11"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<ul className="custom-scrollbar space-y-2 max-h-[calc(100vh-600px)] md:max-h-[calc(100vh-750px)] min-h-60 min-w-70 md:min-h-110 overflow-y-auto pr-2">
					{filteredTeams.length > 0 ? (
						filteredTeams.map((team) => (
							<li key={team.id}>
								<div
									onClick={() => handleSelectTeam(team)}
									className={`w-full p-2 hover:bg-f1-red/20 rounded flex items-center gap-2 cursor-pointer justify-between overflow-hidden ${
										selectedTeam?.id === team.id
											? "bg-f1-red/20 font-bold"
											: ""
									}`}
								>
									<div className="flex items-center gap-2">
										{team.photo?.url && (
											<img
												src={team.photo.url}
												alt={team.name}
												className="w-8 h-8 rounded-full object-cover"
											/>
										)}
										<div className="flex items-center gap-2">
											{team.color?.hex && (
												<>
													<span
														className="w-[5px] h-[13px]"
														style={{
															backgroundColor:
																team.color.hex,
														}}
													></span>
												</>
											)}
										</div>
										<div className="flex flex-col items-start">
											<span className="truncate max-w-40">
												{team.name}
											</span>
										</div>
									</div>

									<button
										onClick={(e) => {
											e.stopPropagation();
											handleDeleteClick(
												team.id,
												team.deleted,
											);
										}}
										className="z-10 text-f1-red p-1 hover:bg-f1-red hover:text-white rounded cursor-pointer duration-120"
										title={
											team.deleted
												? "Restaurar"
												: "Excluir"
										}
									>
										<svg
											className="h-5 w-5"
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
							</li>
						))
					) : (
						<li className="p-2 text-gray-500 text-center">
							Nenhuma equipe encontrada
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
								? "Restaurar Equipe"
								: "Excluir Equipe"}
						</DialogTitle>
						<Description className="mt-1">
							{itemToDelete?.deleted
								? "Deseja restaurar esta equipe?"
								: "Tem certeza que deseja excluir esta equipe?"}
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
					onSubmit={handleTeam}
					className="bg-white border-t border-f1-black/20 mt-6 pt-6 md:mt-0 md:p-6 md:border-0 md:rounded-lg md:shadow-md"
				>
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold">
							{isEditing
								? "Editar Equipe"
								: "Cadastrar Nova Equipe"}
						</h2>
						{isEditing && (
							<button
								type="button"
								onClick={resetForm}
								className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
							>
								Nova Equipe
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
							<label className="block mb-1">Nome *</label>
							<input
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
								className="w-full p-2 border rounded h-11"
							/>
						</div>

						<div className="md:col-span-2">
							<label className="block mb-1 md:col-span-2">
								Cor
							</label>
							<div className="flex items-center gap-2">
								<input
									type="color"
									name="color"
									value={formData.color}
									onChange={handleChange}
									className="w-10 h-10 cursor-pointer"
								/>
								<input
									type="text"
									name="color"
									value={formData.color}
									onChange={handleChange}
									className="w-full p-2 border rounded h-11"
								/>
							</div>
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

						{isEditing && selectedTeam?.photo?.url && !logoFile && (
							<div className="md:col-span-2 flex gap-4 items-center">
								<span className="">Logo atual:</span>
								<img
									src={selectedTeam.photo.url}
									alt={`Logo de ${selectedTeam.name}`}
									className="h-16 w-16 object-contain border border-gray-300"
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

						{isEditing && teamDrivers.length > 0 && (
							<div className="md:col-span-2 border-t pt-4">
								<h3 className="font-semibold text-gray-700 mb-3">
									Pilotos da equipe
								</h3>
								{sortedGridEntries.map(([grid, drivers]) => (
									<div key={grid} className="mb-4">
										<p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
											{getGridLabel(grid)}
										</p>
										<ul className="space-y-2">
											{drivers.map((d) => (
												<li
													key={d.id}
													className="flex items-center justify-between gap-3"
												>
													<div className="flex items-center gap-3">
														<div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
															<img
																src={
																	d.photo
																		?.url ||
																	tenant.fallbackDriverPhoto
																}
																alt={
																	d.name ?? ""
																}
																className="w-full h-full object-cover object-top scale-125 translate-y-1"
															/>
														</div>
														<div className="flex items-center gap-1.5 flex-wrap">
															<span className="text-sm font-medium">
																{d.name}
															</span>
															{d.number && (
																<span className="text-xs text-gray-400">
																	#{d.number}
																</span>
															)}
															{allProfiles[d.id]?.[grid]?.reserve && (
																<span className="bg-f1-lighterCarbon text-white text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded">
																	Res
																</span>
															)}
														</div>
													</div>
													<button
														type="button"
														onClick={() => handleRemoveDriver(d.id, grid)}
														className="text-f1-red p-1 hover:bg-f1-red hover:text-white rounded cursor-pointer duration-120"
														title="Remover da equipe"
													>
														<svg
															className="h-4 w-4"
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
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
						)}
					</div>

					<button
						type="submit"
						disabled={createTeamLoading || updateTeamLoading}
						className="bg-f1-carbon border w-full border-f1-carbon text-white px-6 py-2 rounded cursor-pointer duration-120 mt-4 disabled:opacity-50 hover:bg-transparent hover:text-f1-carbon"
					>
						{createTeamLoading || updateTeamLoading
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
