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
import { ChevronUpDownIcon, PlusIcon } from "@heroicons/react/16/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
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
import { useToast } from "../../contexts/ToastContext";

interface CalendarRegistrationProps {
	gridId?: string;
}

const NEW_ID = "__new__";

export function CalendarRegistration({ gridId }: CalendarRegistrationProps) {
	const { seasons } = useSeasons();
	const { setCalendarSeason, removeCalendarSeason, getSeasonForCalendar } =
		useCalendarSeasons();

	const emptyForm = {
		trackId: "",
		round: "",
		sprint: false,
		date: "",
		active: true,
		grid: gridId || "",
		seasonId: "",
	};

	const [formData, setFormData] = useState(emptyForm);
	const [expandedId, setExpandedId] = useState<string | null>(null);

	const { showToast } = useToast();

	const [searchTerm, setSearchTerm] = useState("");
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

	const handleDeleteClick = (e: React.MouseEvent, id: string, deleted: boolean) => {
		e.stopPropagation();
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

	const { data: gridData } = useGridOptionsQuery();
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
		if (expandedId === calendar.id) {
			setExpandedId(null);
			return;
		}
		const seasonId = getSeasonForCalendar(calendar.id);
		setExpandedId(calendar.id);
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

	const handleNewEtapa = () => {
		if (expandedId === NEW_ID) {
			setExpandedId(null);
			return;
		}
		setExpandedId(NEW_ID);
		setFormData(emptyForm);
	};

	const handleDuplicate = (calendar: any) => {
		setExpandedId(NEW_ID);
		setFormData({
			trackId: calendar.track?.id || "",
			round: "",
			sprint: calendar.sprint || false,
			date: "",
			active: true,
			grid: calendar.grid || gridId || "",
			seasonId: getSeasonForCalendar(calendar.id) || "",
		});
	};

	const handleCalendar = async (event: FormEvent) => {
		event.preventDefault();

		if (!formData.date) {
			showToast("error", "Por favor, selecione uma data válida");
			return;
		}

		try {
			const formattedDate = new Date(formData.date)
				.toISOString()
				.replace(/\.\d{3}Z$/, "Z");
			if (!formData.trackId) throw new Error("Pista é obrigatória");
			if (!formData.round) throw new Error("Rodada é obrigatória");

			const isEditing = expandedId !== null && expandedId !== NEW_ID;

			if (isEditing) {
				const result = await updateCalendar({
					variables: {
						where: { id: expandedId! },
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

				if (formData.seasonId) {
					await setCalendarSeason(expandedId!, formData.seasonId);
				} else {
					await removeCalendarSeason(expandedId!);
				}

				showToast("success", "Etapa atualizada com sucesso!");
			} else {
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

				if (formData.seasonId && result.data?.createCalendar?.id) {
					await setCalendarSeason(
						result.data.createCalendar.id,
						formData.seasonId,
					);
				}

				showToast("success", "Etapa cadastrada com sucesso!");
				setFormData(emptyForm);
			}
		} catch (error: any) {
			console.error("Registration error:", error);
			showToast("error", error.message || "Erro desconhecido ao cadastrar etapa");
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
		const matchesGrid = gridId ? calendar.grid === gridId : true;
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

	const formatDateShort = (dateString: string) => {
		const date = new Date(dateString);
		const day = format(date, "dd", { locale: ptBR });
		const month = format(date, "MMM", { locale: ptBR });
		const year = format(date, "yyyy", { locale: ptBR });
		const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
		return `${day} ${capitalizedMonth} ${year}`;
	};

	const renderForm = (calendarId: string | null) => {
		const isEditing = calendarId !== null && calendarId !== NEW_ID;
		const calendar = isEditing
			? calendarsData?.calendars?.find((c) => c.id === calendarId)
			: null;

		return (
			<div className="border-t border-f1-red/20 bg-f1-red/5 p-4">
				<form onSubmit={handleCalendar}>
					{/* Toggles row */}
					<div className="flex items-center gap-6 mb-4">
						<div className="flex items-center gap-2">
							<span className="text-sm font-medium">Ativo</span>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									checked={formData.active}
									onChange={(e) =>
										setFormData({ ...formData, active: e.target.checked })
									}
									className="sr-only peer"
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-f1-purple"></div>
							</label>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-sm font-medium">Sprint</span>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									checked={formData.sprint}
									onChange={(e) =>
										setFormData({ ...formData, sprint: e.target.checked })
									}
									className="sr-only peer"
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-f1-purple"></div>
							</label>
						</div>
						{isEditing && calendar && (
							<button
								type="button"
								onClick={() => handleDuplicate(calendar)}
								className="ml-auto px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 cursor-pointer"
							>
								Duplicar
							</button>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						{/* Pista */}
						<div>
							<label className="block mb-1 text-sm">Pista *</label>
							<Listbox
								value={formData.trackId}
								onChange={(value) =>
									setFormData((prev) => ({ ...prev, trackId: value }))
								}
							>
								<div className="relative">
									<ListboxButton className="w-full px-2 border rounded flex items-center justify-between cursor-pointer h-9 bg-white text-sm">
										<span className="block truncate">
											{formData.trackId
												? (() => {
														const t = tracksData?.tracks.find(
															(t) => t.id === formData.trackId,
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
											<div className="p-2 text-center text-sm">Carregando...</div>
										) : (
											tracksData?.tracks.map((track) => (
												<ListboxOption
													key={track.id}
													value={track.id}
													className={({ active }) =>
														`flex items-center gap-2 p-2 cursor-pointer text-sm ${active ? "bg-f1-red/20" : ""}`
													}
												>
													<div className="flex items-center gap-2">
														{track.flag?.url && (
															<img
																src={track.flag.url}
																className="w-6 h-4 object-cover shrink-0"
															/>
														)}
														<span>
															{track.name} - {track.location}
														</span>
													</div>
												</ListboxOption>
											))
										)}
									</ListboxOptions>
								</div>
							</Listbox>
						</div>

						{/* Rodada */}
						<div>
							<label className="block mb-1 text-sm">Rodada *</label>
							<input
								name="round"
								value={formData.round}
								onChange={handleChange}
								required
								className="w-full px-2 border rounded h-9 text-sm bg-white"
							/>
						</div>

						{/* Data */}
						<div>
							<label className="block mb-1 text-sm">Data *</label>
							<input
								type="datetime-local"
								name="date"
								value={formData.date}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, date: e.target.value }))
								}
								required
								className="w-full px-2 border rounded h-9 text-sm bg-white"
							/>
						</div>

						{/* Grid */}
						<div>
							<label className="block mb-1 text-sm">Grid</label>
							{gridId ? (
								<div className="w-full px-2 border rounded h-9 bg-gray-100 flex items-center text-sm">
									{getGridLabel(gridId)}
								</div>
							) : (
								<Listbox
									value={formData.grid}
									onChange={(value) =>
										setFormData((prev) => ({ ...prev, grid: value }))
									}
								>
									<div className="relative">
										<ListboxButton className="w-full px-2 border rounded flex items-center justify-between cursor-pointer h-9 bg-white text-sm">
											<span className="block truncate">
												{formData.grid
													? getGridLabel(formData.grid)
													: "Selecione um grid"}
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
											{gridData?.__type?.enumValues?.map((option) => (
												<ListboxOption
													key={option.name}
													value={option.name}
													className={({ active }) =>
														`flex items-center gap-2 p-2 cursor-pointer text-sm ${active ? "bg-f1-red/20" : ""}`
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
							)}
						</div>

						{/* Temporada */}
						<div>
							<label className="block mb-1 text-sm">Temporada</label>
							<Listbox
								value={formData.seasonId}
								onChange={(value) =>
									setFormData((prev) => ({ ...prev, seasonId: value }))
								}
							>
								<div className="relative">
									<ListboxButton className="w-full px-2 border rounded flex items-center justify-between cursor-pointer h-9 bg-white text-sm">
										<span className="block truncate">
											{formData.seasonId
												? seasons.find((s) => s.id === formData.seasonId)
														?.name || "Temporada não encontrada"
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
												`flex items-center gap-2 p-2 cursor-pointer text-sm ${active ? "bg-f1-red/20" : ""}`
											}
										>
											Nenhuma temporada
										</ListboxOption>
										{seasons.map((season) => (
											<ListboxOption
												key={season.id}
												value={season.id}
												className={({ active }) =>
													`flex items-center gap-2 p-2 cursor-pointer text-sm ${active ? "bg-f1-red/20" : ""}`
												}
											>
												<span className="block truncate">{season.name}</span>
											</ListboxOption>
										))}
									</ListboxOptions>
								</div>
							</Listbox>
						</div>
					</div>

					<button
						type="submit"
						disabled={createCalendarLoading || updateCalendarLoading}
						className="bg-f1-carbon border w-full border-f1-carbon text-white px-6 py-2 rounded cursor-pointer duration-120 mt-4 disabled:opacity-50 hover:bg-transparent hover:text-f1-carbon"
					>
						{createCalendarLoading || updateCalendarLoading
							? isEditing
								? "Atualizando..."
								: "Cadastrando..."
							: isEditing
								? "Atualizar Etapa"
								: "Cadastrar Etapa"}
					</button>
				</form>
			</div>
		);
	};

	return (
		<div className="w-full">
			{/* Filters + Nova Etapa */}
			<div className="flex flex-col gap-2 mb-3">
				<div className="flex items-center gap-2">
					<div className="flex rounded border overflow-hidden text-sm flex-1">
						{[
							{ label: "Todos", value: "all" },
							{ label: "Ativos", value: "active" },
							{ label: "Inativos", value: "inactive" },
						].map(({ label, value }) => (
							<button
								key={value}
								type="button"
								onClick={() =>
									setActiveFilter(value as "all" | "active" | "inactive")
								}
								className={`flex-1 py-1.5 cursor-pointer transition-colors duration-120 ${
									activeFilter === value
										? "bg-f1-red text-white font-medium"
										: "bg-white text-gray-600 hover:bg-f1-red/10"
								}`}
							>
								{label}
							</button>
						))}
					</div>
					<button
						type="button"
						onClick={handleNewEtapa}
						className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm font-medium cursor-pointer duration-120 shrink-0 ${
							expandedId === NEW_ID
								? "bg-f1-red/20 text-f1-red"
								: "bg-f1-red text-white hover:bg-f1-red/80"
						}`}
					>
						<PlusIcon className="h-4 w-4" />
						Nova Etapa
					</button>
				</div>
				<input
					type="text"
					placeholder="Buscar etapas..."
					className="w-full px-2 border rounded h-9 text-sm"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			{/* Create form (when Nova Etapa is open) */}
			{expandedId === NEW_ID && (
				<div className="mb-3 bg-white rounded border border-f1-red/30 overflow-hidden">
					<div className="px-4 py-2 bg-f1-red/10 border-b border-f1-red/20">
						<h3 className="text-sm font-bold text-f1-red uppercase tracking-wide">
							Nova Etapa
						</h3>
					</div>
					{renderForm(NEW_ID)}
				</div>
			)}

			{/* Calendar list */}
			<ul className="space-y-[2px]">
				{filteredCalendars.length > 0 ? (
					filteredCalendars.map((calendar) => (
						<li
							key={calendar.id}
							className={`bg-white rounded ${expandedId === calendar.id ? "ring-1 ring-f1-red/30" : ""}`}
						>
							{/* Row */}
							<div
								onClick={() => handleSelectCalendar(calendar)}
								className={`w-full px-3 py-2 hover:bg-f1-red/10 flex items-center gap-3 cursor-pointer ${
									expandedId === calendar.id ? "bg-f1-red/10 font-bold" : ""
								}`}
							>
								{calendar.track?.flag?.url && (
									<img
										src={calendar.track.flag.url}
										alt={`Bandeira ${calendar.track?.name}`}
										className="w-[36px] h-[20px] object-cover rounded border border-black/10 shrink-0"
									/>
								)}
								<div className="flex flex-col flex-1 min-w-0">
									<span className={`text-sm truncate ${expandedId === calendar.id ? "font-bold" : "font-medium"}`}>
										{calendar.track?.name || calendar.round}
									</span>
									<span className={`text-xs text-gray-500 ${expandedId === calendar.id ? "font-bold" : ""}`}>
										{calendar.round} · {formatDateShort(calendar.date)}
										{calendar.sprint && (
											<span className="ml-1 text-[10px] bg-f1-purple/20 text-f1-purple px-1 rounded font-medium">
												SPRINT
											</span>
										)}
										{!calendar.active && (
											<span className="ml-1 text-[10px] bg-gray-200 text-gray-500 px-1 rounded font-medium">
												INATIVO
											</span>
										)}
									</span>
								</div>
								<button
									onClick={(e) =>
										handleDeleteClick(e, calendar.id, calendar.deleted)
									}
									className="z-10 text-f1-red p-1 hover:bg-f1-red hover:text-white rounded cursor-pointer duration-120 shrink-0"
									title={calendar.deleted ? "Restaurar" : "Excluir"}
								>
									<TrashIcon className="h-4 w-4" />
								</button>
							</div>

							{/* Inline edit form */}
							{expandedId === calendar.id && renderForm(calendar.id)}
						</li>
					))
				) : (
					<li className="p-4 text-gray-500 text-center text-sm bg-white rounded">
						Nenhuma etapa encontrada
					</li>
				)}
			</ul>

			{/* Delete confirmation modal */}
			<Dialog
				open={isDeleteModalOpen}
				onClose={cancelDelete}
				className="relative z-50"
			>
				<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
				<div className="fixed inset-0 flex items-center justify-center p-4">
					<DialogPanel className="w-full max-w-md rounded bg-white p-6">
						<DialogTitle className="text-lg font-bold">
							{itemToDelete?.deleted ? "Restaurar Etapa" : "Excluir Etapa"}
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
								{itemToDelete?.deleted ? "Restaurar" : "Excluir"}
							</button>
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</div>
	);
}
