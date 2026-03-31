import { FormEvent, useState } from "react";
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/react";
import {
	useCreateCalendarMutation,
	useGetCalendarsRegistrationQuery,
	useUpdateCalendarMutation,
	GetCalendarsRegistrationDocument,
	useGridOptionsQuery,
	useGetTracksQuery,
} from "../../graphql/generated";
import { format } from "date-fns";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import ptBR from "date-fns/locale/pt-BR";
import {
	Dialog,
	DialogTitle,
	DialogPanel,
	Description,
} from "@headlessui/react";
import { getGridLabel } from "../../shared/config/grids";
import { useSeasons } from "../../contexts/SeasonsContext";
import { useCalendarSeasons } from "../../contexts/CalendarSeasonsContext";

interface CalendarRegistrationProps {
	gridId?: string;
}

export function CalendarRegistration({ gridId }: CalendarRegistrationProps) {
	const { seasons } = useSeasons();
	const { setCalendarSeason, removeCalendarSeason, getSeasonForCalendar } =
		useCalendarSeasons();

	const [formData, setFormData] = useState({
		trackId: "",
		round: "",
		sprint: false,
		date: "",
		active: true,
		grid: gridId || "",
		seasonId: "",
	});

	const [status, setStatus] = useState<{
		type: "idle" | "loading" | "success" | "error";
		message: string;
	}>({ type: "idle", message: "" });
	const [selectedCalendar, setSelectedCalendar] = useState<any>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [gridFilter, setGridFilter] = useState(gridId || "");
	const [activeFilter, setActiveFilter] = useState<
		"all" | "active" | "inactive"
	>("all");

	const [createCalendar, { loading: createCalendarLoading }] =
		useCreateCalendarMutation({
			refetchQueries: [{ query: GetCalendarsRegistrationDocument }],
			awaitRefetchQueries: true,
		});
	const [updateCalendar, { loading: updateCalendarLoading }] =
		useUpdateCalendarMutation({
			refetchQueries: [{ query: GetCalendarsRegistrationDocument }],
			awaitRefetchQueries: true,
		});

	const { data: calendarsData, error: calendarsError } =
		useGetCalendarsRegistrationQuery({
			fetchPolicy: "network-only",
		});

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

	const { data: gridData, loading: gridLoading } = useGridOptionsQuery();
	const { data: tracksData, loading: tracksLoading } = useGetTracksQuery();

	const handleToggleDelete = async (id: string, currentDeleted: boolean) => {
		try {
			await updateCalendar({
				variables: {
					where: { id },
					data: { deleted: !currentDeleted },
				},
			});
		} catch (error) {
			console.error("Error toggling delete:", error);
		}
	};

	const isoToDatetimeLocal = (isoString: string) => {
		if (!isoString) return "";
		const date = new Date(isoString);
		const pad = (num: number) => num.toString().padStart(2, "0");

		return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
			date.getDate(),
		)}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
	};

	const handleSelectCalendar = (calendar: any) => {
		const seasonId = getSeasonForCalendar(calendar.id);
		setSelectedCalendar(calendar);
		setIsEditing(true);
		setFormData({
			trackId: calendar.track?.id || "",
			round: calendar.round,
			sprint: calendar.sprint || false,
			date: isoToDatetimeLocal(calendar.date),
			active: calendar.active,
			grid: calendar.grid || "",
			seasonId: seasonId || "",
		});
	};

	const resetForm = () => {
		setSelectedCalendar(null);
		setIsEditing(false);
		setFormData({
			trackId: "",
			round: "",
			sprint: false,
			date: "",
			active: true,
			grid: gridId || "",
			seasonId: "",
		});
	};

	const handleCalendar = async (event: FormEvent) => {
		event.preventDefault();
		setStatus({ type: "loading", message: "Enviando dados..." });

		if (!formData.date) {
			setStatus({
				type: "error",
				message: "Por favor, selecione uma data válida",
			});
			return;
		}

		try {
			const formattedDate = new Date(formData.date)
				.toISOString()
				.replace(/\.\d{3}Z$/, "Z");
			// Validate required fields
			if (!formData.trackId) throw new Error("Pista é obrigatória");
			if (!formData.round) throw new Error("Rodada é obrigatória");
			if (!formData.date) throw new Error("Data é obrigatória");

			if (isEditing && selectedCalendar) {
				// Update existing calendar
				const result = await updateCalendar({
					variables: {
						where: { id: selectedCalendar.id },
						data: {
							track: { connect: { id: formData.trackId } },
							round: formData.round,
							sprint: formData.sprint,
							grid: formData.grid || null,
							date: formattedDate,
							active: formData.active,
						},
					},
				});

				if (result.errors) throw new Error(result.errors[0].message);

				// Update season mapping in Firebase
				if (formData.seasonId) {
					await setCalendarSeason(
						selectedCalendar.id,
						formData.seasonId,
					);
				} else {
					await removeCalendarSeason(selectedCalendar.id);
				}

				setStatus({
					type: "success",
					message: "Etapa atualizada com sucesso!",
				});
			} else {
				// Create new calendar
				const result = await createCalendar({
					variables: {
						data: {
							deleted: false,
							track: { connect: { id: formData.trackId } },
							round: formData.round,
							sprint: formData.sprint,
							grid: formData.grid || null,
							date: formattedDate,
							active: formData.active,
						},
					},
				});

				if (result.errors) throw new Error(result.errors[0].message);

				// Create season mapping in Firebase
				if (formData.seasonId && result.data?.createCalendar?.id) {
					await setCalendarSeason(
						result.data.createCalendar.id,
						formData.seasonId,
					);
				}

				setStatus({
					type: "success",
					message: "Etapa cadastrada com sucesso!",
				});
			}

			if (!isEditing) {
				resetForm();
			}

			setTimeout(() => {
				setStatus({ type: "idle", message: "" });
			}, 5000);
		} catch (error) {
			console.error("Registration error:", error);
			setStatus({
				type: "error",
				message:
					error.message || "Erro desconhecido ao cadastrar etapa",
			});
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const filteredCalendars = (
		calendarsData?.calendars
			? [...calendarsData.calendars].sort((a, b) => {
					const dateA = new Date(a.date).getTime();
					const dateB = new Date(b.date).getTime();
					return dateB - dateA;
				})
			: []
	).filter((calendar) => {
		const matchesGrid = gridFilter ? calendar.grid === gridFilter : true;
		const matchesActive =
			activeFilter === "all"
				? true
				: activeFilter === "active"
					? calendar.active === true
					: calendar.active !== true;
		const matchesSearch = searchTerm
			? Object.entries({
					track: calendar.track?.name || "",
					location: calendar.track?.location || "",
					round: calendar.round,
					date: calendar.date,
					link: calendar.link,
				}).some(([_, value]) =>
					value
						?.toString()
						.toLowerCase()
						.includes(searchTerm.toLowerCase()),
				)
			: true;
		return matchesGrid && matchesSearch && matchesActive;
	});

	if (calendarsError) {
		return (
			<div className="bg-f1-lightSilver py-10">
				<div className="max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					Erro ao carregar etapas: {calendarsError.message}
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
			{/* Calendar Sidebar */}
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
					{!gridId && (
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
											`flex items-center gap-2 p-2 cursor-pointer ${active ? "bg-f1-red/20" : ""}`
										}
									>
										Todos os grids
									</ListboxOption>
									{gridData?.__type?.enumValues?.map(
										(option) => (
											<ListboxOption
												key={option.name}
												value={option.name}
												className={({ active }) =>
													`flex items-center gap-2 p-2 cursor-pointer ${active ? "bg-f1-red/20" : ""}`
												}
											>
												<span className="block truncate">
													{getGridLabel(option.name)}
												</span>
											</ListboxOption>
										),
									)}
								</ListboxOptions>
							</div>
						</Listbox>
					)}
					<input
						type="text"
						placeholder="Buscar etapas (pista, rodada, data)..."
						className="w-full p-2 border rounded h-11"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<ul className="custom-scrollbar space-y-2 max-h-[calc(100vh-600px)] md:max-h-[calc(100vh-750px)] min-h-60 min-w-70 md:min-h-110 overflow-y-auto pr-2">
					{filteredCalendars.length > 0 ? (
						filteredCalendars.map((calendar) => (
							<li key={calendar.id}>
								<div
									onClick={() =>
										handleSelectCalendar(calendar)
									}
									className={`w-full p-2 hover:bg-f1-red/20 rounded flex items-center gap-2 cursor-pointer justify-between overflow-hidden ${
										selectedCalendar?.id === calendar.id
											? "bg-f1-red/20 font-bold"
											: ""
									}`}
								>
									<div className="flex flex-col items-start truncate">
										<span className="truncate max-w-40">
											{calendar.track?.name
												? `${calendar.track.name}`
												: calendar.round}
										</span>
										<div className="flex flex-col items-start">
											<span className="text-xs text-gray-500">
												• {calendar.round}
											</span>
										</div>
										<div className="flex flex-col items-start">
											<span className="text-xs text-gray-500">
												•{" "}
												{formatDateWithCapitalizedMonth(
													calendar.date,
												)}
											</span>
										</div>
									</div>
									<div className="flex gap-4 items-center">
										<div>
											{calendar.track?.flag?.url && (
												<img
													src={
														calendar.track.flag.url
													}
													alt={`Bandeira ${calendar.track?.name}`}
													className="w-[45px] h-[25px] object-cover rounded border border-black/20 shrink-0"
												/>
											)}
										</div>
										<button
											onClick={() =>
												handleDeleteClick(
													calendar.id,
													calendar.deleted,
												)
											}
											className="z-10 text-f1-red p-1 hover:bg-f1-red hover:text-white rounded cursor-pointer duration-120"
											title={
												calendar.deleted
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
								</div>
							</li>
						))
					) : (
						<li className="p-2 text-gray-500 text-center">
							Nenhuma etapa encontrada
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
								? "Restaurar Etapa"
								: "Excluir Etapa"}
						</DialogTitle>
						<Description className="mt-1">
							{itemToDelete?.deleted
								? "Deseja restaurar esta etapa?"
								: "Tem certeza que deseja excluir esta etapa?"}
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
					onSubmit={handleCalendar}
					className="bg-white border-t border-f1-black/20 mt-6 pt-6 md:mt-0 md:p-6 md:border-0 md:rounded-lg md:shadow-md"
				>
					<div className="flex justify-between items-center mb-6">
						<div>
							<h2 className="text-2xl font-bold">
								{isEditing
									? "Editar Etapa"
									: "Cadastrar Nova Etapa"}
							</h2>
							<div className="flex items-center justify-start gap-6 mt-4">
								<div className="flex items-center gap-2">
									<span className="text-sm font-medium">
										Ativo
									</span>
									<label className="relative inline-flex items-center cursor-pointer">
										<input
											type="checkbox"
											checked={formData.active}
											onChange={(e) =>
												setFormData({
													...formData,
													active: e.target.checked,
												})
											}
											className="sr-only peer"
										/>
										<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-f1-purple"></div>
									</label>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-sm font-medium">
										Sprint
									</span>
									<label className="relative inline-flex items-center cursor-pointer">
										<input
											type="checkbox"
											checked={formData.sprint}
											onChange={(e) =>
												setFormData({
													...formData,
													sprint: e.target.checked,
												})
											}
											className="sr-only peer"
										/>
										<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-f1-purple"></div>
									</label>
								</div>
							</div>
						</div>
						{isEditing && (
							<div className="flex gap-2">
								<button
									type="button"
									onClick={() => {
										setFormData((prev) => ({
											...prev,
											trackId:
												selectedCalendar?.track?.id ||
												"",
										}));
										setSelectedCalendar(null);
										setIsEditing(false);
									}}
									className="px-4 py-1 self-start bg-blue-100 text-blue-700 rounded hover:bg-blue-200 cursor-pointer"
								>
									Duplicar
								</button>
								<button
									type="button"
									onClick={resetForm}
									className="px-4 py-1 self-start bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
								>
									Nova Etapa
								</button>
							</div>
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
							<label className="block mb-1">Pista *</label>
							<Listbox
								value={formData.trackId}
								onChange={(value) =>
									setFormData((prev) => ({
										...prev,
										trackId: value,
									}))
								}
							>
								<div className="relative">
									<ListboxButton className="w-full p-2 border rounded flex items-center justify-between cursor-pointer h-11">
										<span className="block truncate">
											{formData.trackId
												? (() => {
														const t =
															tracksData?.tracks.find(
																(t) =>
																	t.id ===
																	formData.trackId,
															);
														return t
															? `${t.name} - ${t.location}`
															: "Selecione uma pista";
													})()
												: "Selecione uma pista"}
										</span>
										<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
											<ChevronUpDownIcon className="h-5 w-5 text-f1-silver" />
										</span>
									</ListboxButton>
									<ListboxOptions className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-f1-bg-silver py-1 shadow-lg">
										{tracksLoading ? (
											<div className="p-2 text-center">
												Carregando...
											</div>
										) : (
											tracksData?.tracks.map((track) => (
												<ListboxOption
													key={track.id}
													value={track.id}
													className={({ active }) =>
														`flex items-center gap-2 p-2 cursor-pointer ${active ? "bg-f1-red/20" : ""}`
													}
												>
													<div className="flex items-center gap-2">
														{track.flag?.url && (
															<img
																src={
																	track.flag
																		.url
																}
																className="w-6 h-4 object-cover"
															/>
														)}
														<span>
															{track.name} -{" "}
															{track.location}
														</span>
													</div>
												</ListboxOption>
											))
										)}
									</ListboxOptions>
								</div>
							</Listbox>
						</div>

						<div>
							<label className="block mb-1">Rodada *</label>
							<input
								name="round"
								value={formData.round}
								onChange={handleChange}
								required
								className="w-full p-2 border rounded h-11"
							/>
						</div>

						<div>
							<label className="block mb-1">Data *</label>
							<input
								type="datetime-local"
								name="date"
								value={formData.date}
								onChange={(e) => {
									setFormData((prev) => ({
										...prev,
										date: e.target.value,
									}));
								}}
								required
								className="w-full p-2 border rounded h-11"
							/>
						</div>

						<div>
							<label className="block mb-1">Grid</label>
							{gridId ? (
								<div className="w-full p-2 border rounded h-11 bg-gray-100 flex items-center">
									{getGridLabel(gridId)}
								</div>
							) : (
								<Listbox
									value={formData.grid}
									onChange={(value) => {
										setFormData((prev) => ({
											...prev,
											grid: value,
										}));
									}}
								>
									<div className="relative">
										<ListboxButton className="w-full p-2 border rounded flex items-center justify-between cursor-pointer h-11">
											<span className="block truncate">
												{formData.grid
													? getGridLabel(
															formData.grid,
														)
													: "Selecione um grid"}
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
													`flex items-center gap-2 p-2 cursor-pointer ${active ? "bg-f1-red/20" : ""}`
												}
											>
												Todos os grids
											</ListboxOption>
											{gridData?.__type?.enumValues?.map(
												(option) => (
													<ListboxOption
														key={option.name}
														value={option.name}
														className={({
															active,
														}) =>
															`flex items-center gap-2 p-2 cursor-pointer ${active ? "bg-f1-red/20" : ""}`
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
							)}
						</div>

						<div>
							<label className="block mb-1">Temporada</label>
							<Listbox
								value={formData.seasonId}
								onChange={(value) =>
									setFormData((prev) => ({
										...prev,
										seasonId: value,
									}))
								}
							>
								<div className="relative">
									<ListboxButton className="w-full p-2 border rounded flex items-center justify-between cursor-pointer h-11">
										<span className="block truncate">
											{formData.seasonId
												? seasons.find(
														(s) =>
															s.id ===
															formData.seasonId,
													)?.name ||
													"Temporada não encontrada"
												: "Selecione uma temporada"}
										</span>
										<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
											<ChevronUpDownIcon className="h-5 w-5 text-f1-silver" />
										</span>
									</ListboxButton>
									<ListboxOptions className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-f1-bg-silver py-1 shadow-lg">
										<ListboxOption
											value=""
											className={({ active }) =>
												`flex items-center gap-2 p-2 cursor-pointer ${active ? "bg-f1-red/20" : ""}`
											}
										>
											Nenhuma temporada
										</ListboxOption>
										{seasons.map((season) => (
											<ListboxOption
												key={season.id}
												value={season.id}
												className={({ active }) =>
													`flex items-center gap-2 p-2 cursor-pointer ${active ? "bg-f1-red/20" : ""}`
												}
											>
												<span className="block truncate">
													{season.name}
												</span>
											</ListboxOption>
										))}
									</ListboxOptions>
								</div>
							</Listbox>
						</div>

						{/* Vencedor A Field - removed, winners now come from Firebase results */}
						{/* <div>
							<label
								className={`block mb-1 ${!formData.grid ? "text-gray-400" : ""}`}
							>
								Vencedor
							</label>
							<Listbox
								disabled={!formData.grid}
								value={formData.winnerA}
								onChange={(value) => {
									const selectedDriver =
										getFilteredDrivers().find(
											(driver) => driver.name === value,
										);
									setFormData((prev) => ({
										...prev,
										winnerA: value,
										winnerAId: selectedDriver?.id || "",
									}));
								}}
							>
								<div className="relative">
									<ListboxButton
										className={`w-full p-2 border rounded flex items-center justify-between h-11 ${!formData.grid ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "cursor-pointer"}`}
									>
										<span className="block truncate">
											{formData.winnerA ||
												(formData.grid
													? "Selecione um piloto"
													: "Selecione um grid")}
										</span>
										<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
											<ChevronUpDownIcon
												className="h-5 w-5 text-f1-silver"
												aria-hidden="true"
											/>
										</span>
									</ListboxButton>

									<ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-f1-bg-silver py-1 shadow-lg">
										{driversLoading ? (
											<div className="p-2 text-center">
												Carregando...
											</div>
										) : getFilteredDrivers().length > 0 ? (
											getFilteredDrivers().map(
												(driver) => (
													<ListboxOption
														key={driver.id}
														value={driver.name}
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
														<div className="flex flex-col">
															<span>
																{driver.name}
															</span>
															<span className="text-xs text-gray-500">
																#{driver.number}{" "}
																•{" "}
																{
																	driver.team
																		?.name
																}
															</span>
														</div>
													</ListboxOption>
												),
											)
										) : (
											<div className="p-2 text-gray-500">
												Nenhum piloto encontrado
											</div>
										)}
									</ListboxOptions>
								</div>
							</Listbox>
						</div> */}

						{/* Vencedor B Field */}
						{/* <div>
							<label className="block mb-1">Vencedor B</label>
							<Listbox
								value={formData.winnerB}
								onChange={(value) => {
									// Find the selected driver to get both name and ID
									const selectedDriver =
										getFilteredDrivers().find(
											(driver) => driver.name === value
										);
									setFormData({
										...formData,
										winnerB: value,
										winnerBId: selectedDriver?.id || "",
									});
								}}
							>
								<div className="relative">
									<ListboxButton className="w-full p-2 border rounded flex items-center justify-between cursor-pointer h-11">
										<span className="block truncate">
											{formData.winnerB ||
												"Selecione um piloto"}
										</span>
										<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
											<ChevronUpDownIcon
												className="h-5 w-5 text-f1-silver"
												aria-hidden="true"
											/>
										</span>
									</ListboxButton>

									<ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-f1-bg-silver py-1 shadow-lg">
										{driversLoading ? (
											<div className="p-2 text-center">
												Carregando...
											</div>
										) : getFilteredDrivers().length > 0 ? (
											getFilteredDrivers().map(
												(driver) => (
													<ListboxOption
														key={driver.id}
														value={driver.name}
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
														<div className="flex flex-col">
															<span>
																{driver.name}
															</span>
															<span className="text-xs text-gray-500">
																#{driver.number}{" "}
																•{" "}
																{
																	driver.team
																		?.name
																}
															</span>
														</div>
													</ListboxOption>
												)
											)
										) : (
											<div className="p-2 text-gray-500">
												Nenhum piloto encontrado
											</div>
										)}
									</ListboxOptions>
								</div>
							</Listbox>
						</div> */}
					</div>

					<button
						type="submit"
						disabled={
							createCalendarLoading || updateCalendarLoading
						}
						className="bg-f1-carbon border w-full border-f1-carbon text-white px-6 py-2 rounded cursor-pointer duration-120 mt-4 disabled:opacity-50 hover:bg-transparent hover:text-f1-carbon"
					>
						{createCalendarLoading || updateCalendarLoading
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
