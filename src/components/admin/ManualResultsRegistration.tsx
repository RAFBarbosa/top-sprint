import { FormEvent, useState, useEffect } from "react";
import {
	Combobox,
	ComboboxInput,
	ComboboxButton,
	ComboboxOption,
	ComboboxOptions,
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from "@headlessui/react";
import {
	useGetCalendarsRegistrationQuery,
	useUpdateCalendarMutation,
	GetCalendarsRegistrationDocument,
	useGetDriversQuery,
	useGridOptionsQuery,
} from "../../graphql/generated";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { getGridLabel, getGridConfig } from "../../shared/config/grids";
import { tenant } from "../../shared/config/tenants";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

// Firebase
import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../lib/adminClient";

interface GridProfile {
	number: string;
	teamName: string;
	teamColor: string;
}

interface RaceResult {
	position: number;
	driverId: string;
	driverName: string;
}

interface Penalty {
	driverId: string;
	seconds: number;
}

interface ManualResultsRegistrationProps {
	gridId?: string;
}

export function ManualResultsRegistration({ gridId }: ManualResultsRegistrationProps) {
	// Aba Ativa
	const [activeTab, setActiveTab] = useState<"sprint" | "race">("race");

	// --- ESTADOS CORRIDA ---
	const [results, setResults] = useState<RaceResult[]>(
		Array.from({ length: 20 }, (_, i) => ({
			position: i + 1,
			driverId: "",
			driverName: "",
		})),
	);
	const [qualyResults, setQualyResults] = useState<RaceResult[]>(
		Array.from({ length: 20 }, (_, i) => ({
			position: i + 1,
			driverId: "",
			driverName: "",
		})),
	);
	const [penaltyValues, setPenaltyValues] = useState<number[]>(
		Array(20).fill(0),
	);
	const [ncValues, setNcValues] = useState<boolean[]>(Array(20).fill(false));
	// Prêmios Corrida
	const [awards, setAwards] = useState<Record<string, string>>({});

	// --- ESTADOS SPRINT ---
	const [sprintResults, setSprintResults] = useState<RaceResult[]>(
		Array.from({ length: 20 }, (_, i) => ({
			position: i + 1,
			driverId: "",
			driverName: "",
		})),
	);
	const [sprintQualy, setSprintQualy] = useState<RaceResult[]>(
		Array.from({ length: 20 }, (_, i) => ({
			position: i + 1,
			driverId: "",
			driverName: "",
		})),
	);
	const [sprintPenaltyValues, setSprintPenaltyValues] = useState<number[]>(
		Array(20).fill(0),
	);
	const [sprintNcValues, setSprintNcValues] = useState<boolean[]>(Array(20).fill(false));
	const [focusedPenalty, setFocusedPenalty] = useState<string | null>(null);
	// Prêmios Sprint
	const [sprintAwards, setSprintAwards] = useState<Record<string, string>>(
		{},
	);

	// Queries de busca
	const [raceQueries, setRaceQueries] = useState<string[]>(
		Array(20).fill(""),
	);
	const [qualyQueries, setQualyQueries] = useState<string[]>(
		Array(20).fill(""),
	);
	const [sprintRaceQueries, setSprintRaceQueries] = useState<string[]>(
		Array(20).fill(""),
	);
	const [sprintQualyQueries, setSprintQualyQueries] = useState<string[]>(
		Array(20).fill(""),
	);
	// Queries de busca para prêmios
	const [awardQueries, setAwardQueries] = useState<Record<string, string>>(
		{},
	);

	const [allProfiles, setAllProfiles] = useState<
		Record<string, Record<string, GridProfile>>
	>({});

	const [link, setLink] = useState("");

	const [status, setStatus] = useState<{
		type: "idle" | "loading" | "success" | "error";
		message: string;
	}>({ type: "idle", message: "" });
	const [selectedCalendar, setSelectedCalendar] = useState<any>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [activeFilter, setActiveFilter] = useState<
		"all" | "active" | "inactive"
	>("all");
	const [gridFilter, setGridFilter] = useState(gridId || "");

	const { data: calendarsData } = useGetCalendarsRegistrationQuery({
		fetchPolicy: "network-only",
	});
	const { data: driversData } = useGetDriversQuery();
	const { data: gridData } = useGridOptionsQuery();

	useEffect(() => {
		const loadProfiles = async () => {
			try {
				const snap = await getDocs(collection(db, "driver_profiles"));
				const map: Record<string, Record<string, GridProfile>> = {};
				snap.forEach((d) => {
					map[d.id] = d.data() as Record<string, GridProfile>;
				});
				setAllProfiles(map);
			} catch (e) {
				console.error("Failed to load driver profiles", e);
			}
		};
		loadProfiles();
	}, []);

	// --- LEITURA DO FIREBASE ---
	useEffect(() => {
		const loadFromFirebase = async () => {
			if (!selectedCalendar?.id || !driversData?.drivers) return;

			try {
				const docRef = doc(db, "race_results", selectedCalendar.id);
				const docSnap = await getDoc(docRef);

				const mapFirebaseToState = (driverIds: string[]) => {
					return Array.from({ length: 20 }, (_, i) => {
						const id = driverIds?.[i];
						const info = id
							? driversData.drivers?.find((d) => d.id === id)
							: null;
						return {
							position: i + 1,
							driverId: id || "",
							driverName: info?.name || "",
						};
					});
				};

				const mapPenaltiesToState = (
					resList: RaceResult[],
					pList: Penalty[],
				) => {
					const vals = Array(20).fill(0);
					resList.forEach((res, index) => {
						const p = pList?.find(
							(fp) => fp.driverId === res.driverId,
						);
						if (p) vals[index] = p.seconds;
					});
					return vals;
				};

				const gridRaceAwards = resolveRaceAwards(selectedCalendar.grid);
				const capitalize = (s: string) =>
					s.charAt(0).toUpperCase() + s.slice(1);

				if (docSnap.exists()) {
					const data = docSnap.data();
					setLink(data.link || "");
					const rR = mapFirebaseToState(data.results || []);
					setResults(rR);
					setQualyResults(
						mapFirebaseToState(data.resultsQualy || []),
					);
					setPenaltyValues(
						mapPenaltiesToState(rR, data.penalties || []),
					);
					setAwards(
						Object.fromEntries(
							gridRaceAwards.map((a) => [a.id, data[a.id] || ""]),
						),
					);

					// NC: build boolean arrays from saved ncDriverIds arrays
					const ncSet = new Set<string>(data.ncDriverIds || []);
					setNcValues(rR.map((r) => ncSet.has(r.driverId)));

					const sR = mapFirebaseToState(data.sprintResults || []);
					setSprintResults(sR);
					setSprintQualy(
						mapFirebaseToState(data.sprintResultsQualy || []),
					);
					setSprintPenaltyValues(
						mapPenaltiesToState(sR, data.sprintPenalties || []),
					);
					const sprintNcSet = new Set<string>(data.sprintNcDriverIds || []);
					setSprintNcValues(sR.map((r) => sprintNcSet.has(r.driverId)));
					setSprintAwards(
						Object.fromEntries(
							gridRaceAwards.map((a) => [
								a.id,
								data[`sprint${capitalize(a.id)}`] || "",
							]),
						),
					);
				} else {
					const empty = () =>
						Array.from({ length: 20 }, (_, i) => ({
							position: i + 1,
							driverId: "",
							driverName: "",
						}));
					setResults(empty());
					setQualyResults(empty());
					setSprintResults(empty());
					setSprintQualy(empty());
					setPenaltyValues(Array(20).fill(0));
					setSprintPenaltyValues(Array(20).fill(0));
					setNcValues(Array(20).fill(false));
					setSprintNcValues(Array(20).fill(false));
					setLink("");
					const emptyAwards = Object.fromEntries(
						gridRaceAwards.map((a) => [a.id, ""]),
					);
					setAwards(emptyAwards);
					setSprintAwards({ ...emptyAwards });
				}
			} catch (error) {
				console.error(error);
			}
		};
		loadFromFirebase();
	}, [selectedCalendar, driversData]);

	// Garantir que a aba Sprint não fique aberta em etapas sem Sprint
	useEffect(() => {
		if (
			selectedCalendar &&
			!selectedCalendar.sprint &&
			activeTab === "sprint"
		) {
			setActiveTab("race");
		}
	}, [selectedCalendar]);

	// --- GRAVAÇÃO ---
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!selectedCalendar?.id) return;
		setStatus({ type: "loading", message: "Salvando no Firebase..." });

		try {
			const getPToSave = (resList: RaceResult[], penList: number[]) => {
				return resList
					.map((res, i) => ({
						driverId: res.driverId,
						seconds: penList[i],
					}))
					.filter((p) => p.driverId && p.seconds > 0);
			};

			// Snapshot each driver's grid-specific team/number so historical results stay accurate
			const allIds = new Set(
				[...results, ...qualyResults, ...sprintResults, ...sprintQualy]
					.map((r) => r.driverId)
					.filter(Boolean),
			);
			const driverSnapshots: Record<
				string,
				{ teamName: string; teamColor: string; number: string; photoUrl: string }
			> = {};
			allIds.forEach((id) => {
				const driver = driversData?.drivers?.find((d) => d.id === id);
				if (driver) {
					const profile =
						allProfiles[id]?.[selectedCalendar.grid ?? ""];
					driverSnapshots[id] = {
						teamName:
							profile?.teamName ?? driver.team?.name ?? "",
						teamColor:
							profile?.teamColor ??
							driver.team?.color?.hex ??
							"",
						number: profile?.number ?? driver.number ?? "",
						photoUrl:
							profile?.photoUrl ?? driver.photo?.url ?? "",
					};
				}
			});

			const gridRaceAwards = resolveRaceAwards(selectedCalendar.grid);
			const capitalize = (s: string) =>
				s.charAt(0).toUpperCase() + s.slice(1);
			const awardFields = Object.fromEntries(
				gridRaceAwards.map((a) => [a.id, awards[a.id] || ""]),
			);
			const sprintAwardFields = Object.fromEntries(
				gridRaceAwards.map((a) => [
					`sprint${capitalize(a.id)}`,
					sprintAwards[a.id] || "",
				]),
			);

			await setDoc(doc(db, "race_results", selectedCalendar.id), {
				calendarId: selectedCalendar.id,
				results: results.map((r) => r.driverId),
				resultsQualy: qualyResults.map((r) => r.driverId),
				penalties: getPToSave(results, penaltyValues),
				ncDriverIds: results
					.filter((r, i) => r.driverId && ncValues[i])
					.map((r) => r.driverId),
				...awardFields,

				sprintResults: sprintResults.map((r) => r.driverId),
				sprintResultsQualy: sprintQualy.map((r) => r.driverId),
				sprintPenalties: getPToSave(sprintResults, sprintPenaltyValues),
				sprintNcDriverIds: sprintResults
					.filter((r, i) => r.driverId && sprintNcValues[i])
					.map((r) => r.driverId),
				...sprintAwardFields,

				link: link || "",
				driverSnapshots,
				updatedAt: new Date().toISOString(),
				grid: selectedCalendar.grid || "",
			});

			setStatus({
				type: "success",
				message: `Dados de ${activeTab === "race" ? "Corrida" : "Sprint"} salvos!`,
			});
			setTimeout(() => setStatus({ type: "idle", message: "" }), 3000);
		} catch (error: any) {
			setStatus({ type: "error", message: "Erro: " + error.message });
		}
	};

	const handleSelectCalendar = (calendar: any) => {
		setSelectedCalendar(calendar);
		setLink("");
		setRaceQueries(Array(20).fill(""));
		setQualyQueries(Array(20).fill(""));
		setSprintRaceQueries(Array(20).fill(""));
		setSprintQualyQueries(Array(20).fill(""));
		const emptyAwards = Object.fromEntries(
			(getGridConfig(calendar.grid)?.raceAwards ?? []).map((a) => [
				a.id,
				"",
			]),
		);
		setAwards(emptyAwards);
		setSprintAwards({ ...emptyAwards });
		setAwardQueries({ ...emptyAwards });
		setStatus({ type: "idle", message: "" });
	};

	const getFilteredDrivers = (query: string) => {
		if (!driversData?.drivers || !selectedCalendar) return [];
		const q = query.toLowerCase();
		const grid = selectedCalendar.grid;
		return driversData.drivers
			.filter((d) => {
				if (d.deleted) return false;
				if (!grid) return true;
				// Show if they have a Firebase profile for this grid,
				// or fall back to Hygraph grid field for drivers not yet migrated
				return (
					allProfiles[d.id]?.[grid] !== undefined ||
					d.grid === grid
				);
			})
			.filter((d) => q === "" || d.name?.toLowerCase().includes(q))
			.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
	};

	const gridOptions: string[] =
		gridData?.__type?.enumValues?.map((v: any) => v.name) ?? [];

	// Resolve raceAwards for a calendar: try the calendar's specific grid first,
	// fall back to the first tenant grid that has raceAwards configured.
	const resolveRaceAwards = (gridId: string | null | undefined) => {
		const explicit = getGridConfig(gridId ?? "")?.raceAwards;
		if (explicit?.length) return explicit;
		return (
			(tenant.grids as any[]).find((g: any) => g.raceAwards?.length)
				?.raceAwards ?? []
		);
	};

	const formatDateWithCapitalizedMonth = (dateString: string) => {
		const date = new Date(dateString);
		const day = format(date, "dd", { locale: ptBR });
		const month = format(date, "MMMM", { locale: ptBR });
		const year = format(date, "yyyy", { locale: ptBR });
		const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
		return `${day} de ${capitalizedMonth} de ${year}`;
	};

	const filteredCalendars = (
		calendarsData?.calendars ? [...calendarsData.calendars] : []
	)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.filter((c) => {
			const matchesActive =
				activeFilter === "all"
					? true
					: activeFilter === "active"
						? c.active
						: !c.active;
			const matchesSearch = searchTerm
				? (c.track?.name || "")
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
				: true;
			const matchesGrid = gridFilter ? c.grid === gridFilter : true;
			return matchesActive && matchesSearch && matchesGrid;
		});

	return (
		<div className="flex flex-col md:flex-row w-full">
			{/* Calendar sidebar */}
			<div className="w-full md:w-80 bg-white md:p-4 rounded-lg md:shadow-md h-full">
				<div className="mb-4 space-y-2">
					<div className="flex rounded border overflow-hidden text-sm">
						{["all", "active", "inactive"].map((val) => (
							<button
								key={val}
								onClick={() => setActiveFilter(val as any)}
								className={`flex-1 py-2 cursor-pointer transition-colors duration-120 ${activeFilter === val ? "bg-f1-red text-white font-medium" : "bg-white text-gray-600 hover:bg-f1-red/10"}`}
							>
								{val === "all"
									? "Todos"
									: val === "active"
										? "Ativos"
										: "Inativos"}
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
									{gridOptions.map((option) => (
										<ListboxOption
											key={option}
											value={option}
											className={({ active }) =>
												`flex items-center gap-2 p-2 cursor-pointer ${active ? "bg-f1-red/20" : ""}`
											}
										>
											<span className="block truncate">
												{getGridLabel(option)}
											</span>
										</ListboxOption>
									))}
								</ListboxOptions>
							</div>
						</Listbox>
					)}
					<input
						type="text"
						placeholder="Buscar etapas..."
						className="w-full p-2 border rounded h-11"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<ul className="custom-scrollbar space-y-2 max-h-[calc(100vh-600px)] md:max-h-[calc(100vh-750px)] min-h-60 min-w-70 md:min-h-110 overflow-y-auto pr-2">
					{filteredCalendars.map((calendar) => (
						<li key={calendar.id}>
							<div
								onClick={() => handleSelectCalendar(calendar)}
								className={`w-full p-2 hover:bg-f1-red/20 rounded flex items-center gap-2 cursor-pointer justify-between overflow-hidden ${selectedCalendar?.id === calendar.id ? "bg-f1-red/20 font-bold" : ""}`}
							>
								<div className="flex flex-col items-start truncate">
									<span className="truncate max-w-40">
										{calendar.track?.name ?? calendar.round}
									</span>
									<span className="text-xs text-gray-500">
										• {calendar.round}
									</span>
									<span className="text-xs text-gray-500">
										•{" "}
										{formatDateWithCapitalizedMonth(
											calendar.date,
										)}
									</span>
								</div>
								<div className="flex gap-4 items-center">
									{calendar.track?.flag?.url && (
										<img
											src={calendar.track.flag.url}
											alt=""
											className="w-[45px] h-[25px] object-cover rounded border border-black/20 shrink-0"
										/>
									)}
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>

			{/* Main content */}
			<div className="mx-auto max-w-3xl w-full">
				<form
					onSubmit={handleSubmit}
					className="bg-white border-t border-f1-black/20 mt-6 pt-6 md:mt-0 md:p-6 md:border-0 md:rounded-lg md:shadow-md"
				>
					<div className="flex justify-between items-center mb-6">
						<div>
							<h2 className="text-2xl font-bold">
								{activeTab === "race"
									? "Resultados Corrida"
									: "Resultados Sprint"}
							</h2>
							{selectedCalendar && (
								<p className="text-sm mt-1 text-gray-600">
									{selectedCalendar.track?.name} —{" "}
									{selectedCalendar.round}
								</p>
							)}
						</div>
						<div className="flex items-center gap-2">
							{selectedCalendar?.sprint && (
								<div className="flex rounded border overflow-hidden text-sm">
									<button
										type="button"
										onClick={() => setActiveTab("race")}
										className={`px-4 py-2 cursor-pointer transition-colors duration-120 ${activeTab === "race" ? "bg-f1-red text-white font-medium" : "bg-white text-gray-600 hover:bg-f1-red/10"}`}
									>
										Corrida
									</button>
									<button
										type="button"
										onClick={() => setActiveTab("sprint")}
										className={`px-4 py-2 cursor-pointer transition-colors duration-120 ${activeTab === "sprint" ? "bg-f1-red text-white font-medium" : "bg-white text-gray-600 hover:bg-f1-red/10"}`}
									>
										Sprint
									</button>
								</div>
							)}
							<button
								type="button"
								onClick={handleSubmit}
								disabled={!selectedCalendar}
								className="bg-f1-carbon border border-f1-carbon text-white px-6 py-2 rounded cursor-pointer duration-120 disabled:opacity-50 hover:bg-transparent hover:text-f1-carbon"
							>
								Gravar Dados
							</button>
						</div>
					</div>

					{status.type !== "idle" && (
						<div
							className={`w-full p-4 rounded-md mb-4 ${status.type === "error" ? "bg-red-100 border border-red-400 text-red-700" : status.type === "success" ? "bg-green-100 border border-green-400 text-green-700" : "bg-blue-100 border border-blue-400 text-blue-700"}`}
						>
							{status.message}
						</div>
					)}

					{/* Link da corrida */}
					<div className="mb-6 pb-6 border-b border-f1-black/20">
						<label className="block mb-1 font-bold">
							Link da Corrida
						</label>
						<input
							type="url"
							value={link}
							onChange={(e) => setLink(e.target.value)}
							placeholder="https://youtube.com/watch?v=..."
							className="w-full p-2 border rounded h-11"
						/>
					</div>

					{/* Prêmios da Etapa */}
					{(() => {
						const gridRaceAwards = selectedCalendar
							? resolveRaceAwards(selectedCalendar.grid)
							: [];
						if (gridRaceAwards.length === 0) return null;
						return (
							<div className="mb-6 pb-6 border-b border-f1-black/20">
								<h3 className="font-bold mb-2">
									Prêmios da{" "}
									{activeTab === "race"
										? "Corrida"
										: "Sprint"}
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
									{gridRaceAwards.map((award) => {
										const isRace = activeTab === "race";
										const currentAwards = isRace
											? awards
											: sprintAwards;
										const driverId =
											currentAwards[award.id] || "";
										const driverName =
											driversData?.drivers?.find(
												(d) => d.id === driverId,
											)?.name || "";
										return (
											<div
												key={award.id}
												className="flex flex-col gap-1"
											>
												<label className="block mb-1">
													{award.label}
													{award.points > 0 && (
														<span className="text-f1-lighterCarbon font-normal ml-1">
															(+{award.points} pt)
														</span>
													)}
												</label>
												<Combobox
													value={driverName}
													onChange={(val) => {
														const d =
															driversData?.drivers?.find(
																(x) =>
																	x.name ===
																	val,
															);
														const setter = isRace
															? setAwards
															: setSprintAwards;
														setter((prev) => ({
															...prev,
															[award.id]:
																d?.id || "",
														}));
													}}
												>
													<div className="relative">
														<ComboboxInput
															className="w-full p-2 border rounded h-11"
															placeholder="Piloto..."
															displayValue={() =>
																driverName
															}
															onChange={(e) =>
																setAwardQueries(
																	(prev) => ({
																		...prev,
																		[award.id]:
																			e
																				.target
																				.value,
																	}),
																)
															}
														/>
														<ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
															<ChevronUpDownIcon
																className="h-4 w-4 text-gray-400"
																aria-hidden="true"
															/>
														</ComboboxButton>
														<ComboboxOptions className="absolute z-50 mt-1 max-h-40 w-full overflow-auto rounded bg-white py-1 shadow-xl border border-gray-100">
															{getFilteredDrivers(
																awardQueries[
																	award.id
																] ?? "",
															).map((d) => (
																<ComboboxOption
																	key={d.id}
																	value={
																		d.name
																	}
																	className={({
																		active,
																	}) =>
																		`cursor-pointer py-2 px-3 text-sm ${active ? "bg-f1-red text-white" : "text-gray-900"}`
																	}
																>
																	{d.name}
																</ComboboxOption>
															))}
														</ComboboxOptions>
													</div>
												</Combobox>
											</div>
										);
									})}
								</div>
							</div>
						);
					})()}

					<div className="grid grid-cols-[1fr_1fr_72px_40px] gap-x-3 gap-y-1">
						<label className="block mb-1 font-bold">
							Qualificação
						</label>
						<label className="block mb-1 font-bold">
							Resultado Final
						</label>
						<label className="block mb-1 text-center font-bold">
							Penal.
						</label>
						<label className="block mb-1 text-center font-bold text-xs">
							NC
						</label>

						{Array.from({ length: 20 }).map((_, i) => {
							const pos = i + 1;
							const isRace = activeTab === "race";

							const currentQualy = isRace
								? qualyResults
								: sprintQualy;
							const currentResults = isRace
								? results
								: sprintResults;
							const currentPens = isRace
								? penaltyValues
								: sprintPenaltyValues;
							const currentQueriesQ = isRace
								? qualyQueries
								: sprintQualyQueries;
							const currentQueriesR = isRace
								? raceQueries
								: sprintRaceQueries;

							return (
								<div
									key={`row-${pos}`}
									className="contents group"
								>
									{/* Qualy */}
									<div className="flex items-center gap-2 mb-1">
										<span className="w-5 text-right shrink-0 font-bold">
											{pos}º
										</span>
										<Combobox
											value={currentQualy[i].driverName}
											onChange={(val) => {
												const d = getFilteredDrivers(
													currentQueriesQ[i],
												).find((x) => x.name === val);
												const setter = isRace
													? setQualyResults
													: setSprintQualy;
												setter((prev) =>
													prev.map((item, idx) =>
														idx === i
															? {
																	...item,
																	driverId:
																		d?.id ||
																		"",
																	driverName:
																		val ||
																		"",
																}
															: item,
													),
												);
											}}
										>
											<div className="relative flex-1">
												<ComboboxInput
													className="w-full p-2 border rounded h-11"
													displayValue={(n: string) =>
														n
													}
													placeholder="Piloto..."
													onChange={(e) => {
														const setter = isRace
															? setQualyQueries
															: setSprintQualyQueries;
														setter((prev) => {
															const n = [...prev];
															n[i] =
																e.target.value;
															return n;
														});
													}}
												/>
												<ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
													<ChevronUpDownIcon
														className="h-4 w-4 text-gray-400"
														aria-hidden="true"
													/>
												</ComboboxButton>
												<ComboboxOptions className="absolute z-50 mt-1 max-h-40 w-full overflow-auto rounded bg-white py-1 shadow-xl border border-gray-100">
													{getFilteredDrivers(
														currentQueriesQ[i],
													).map((d) => (
														<ComboboxOption
															key={d.id}
															value={d.name}
															className={({
																active,
															}) =>
																`cursor-pointer py-2 px-3 text-sm ${active ? "bg-f1-red text-white" : "text-gray-900"}`
															}
														>
															{d.name}
														</ComboboxOption>
													))}
												</ComboboxOptions>
											</div>
										</Combobox>
									</div>

									{/* Resultado Final */}
									<div className="flex items-center gap-2 mb-1">
										<Combobox
											value={currentResults[i].driverName}
											onChange={(val) => {
												const d = getFilteredDrivers(
													currentQueriesR[i],
												).find((x) => x.name === val);
												const setter = isRace
													? setResults
													: setSprintResults;
												setter((prev) =>
													prev.map((item, idx) =>
														idx === i
															? {
																	...item,
																	driverId:
																		d?.id ||
																		"",
																	driverName:
																		val ||
																		"",
																}
															: item,
													),
												);
											}}
										>
											<div className="relative flex-1">
												<ComboboxInput
													className="w-full p-2 border rounded h-11"
													displayValue={(n: string) =>
														n
													}
													placeholder="Piloto..."
													onChange={(e) => {
														const setter = isRace
															? setRaceQueries
															: setSprintRaceQueries;
														setter((prev) => {
															const n = [...prev];
															n[i] =
																e.target.value;
															return n;
														});
													}}
												/>
												<ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
													<ChevronUpDownIcon
														className="h-4 w-4 text-gray-400"
														aria-hidden="true"
													/>
												</ComboboxButton>
												<ComboboxOptions className="absolute z-50 mt-1 max-h-40 w-full overflow-auto rounded bg-white py-1 shadow-xl border border-gray-100">
													{getFilteredDrivers(
														currentQueriesR[i],
													).map((d) => (
														<ComboboxOption
															key={d.id}
															value={d.name}
															className={({
																active,
															}) =>
																`cursor-pointer py-2 px-3 text-sm ${active ? "bg-f1-red text-white" : "text-gray-900"}`
															}
														>
															{d.name}
														</ComboboxOption>
													))}
												</ComboboxOptions>
											</div>
										</Combobox>
									</div>

									{/* Penalidade */}
									<div className="flex items-center mb-1">
										<input
											type="text"
											inputMode="numeric"
											value={(() => {
												const key = `${isRace ? "r" : "s"}-${i}`;
												const val = currentPens[i];
												if (focusedPenalty === key) return val === 0 ? "" : String(val);
												return val === 0 ? "" : `${val}s`;
											})()}
											disabled={!currentResults[i].driverId}
											onFocus={() => setFocusedPenalty(`${isRace ? "r" : "s"}-${i}`)}
											onBlur={() => setFocusedPenalty(null)}
											onChange={(e) => {
												const val = parseInt(e.target.value) || 0;
												const setter = isRace ? setPenaltyValues : setSprintPenaltyValues;
												setter((prev) => {
													const n = [...prev];
													n[i] = val;
													return n;
												});
											}}
											className="w-full px-2 py-1.5 border rounded h-9 text-center text-sm disabled:opacity-20"
											placeholder="0s"
										/>
									</div>

									{/* NC */}
									<div className="flex items-center justify-center mb-1">
										<input
											type="checkbox"
											checked={
												isRace
													? ncValues[i]
													: sprintNcValues[i]
											}
											disabled={!currentResults[i].driverId}
											onChange={(e) => {
												const setter = isRace
													? setNcValues
													: setSprintNcValues;
												setter((prev) => {
													const n = [...prev];
													n[i] = e.target.checked;
													return n;
												});
											}}
											className="w-4 h-4 cursor-pointer disabled:opacity-20"
											title="Não Completou"
										/>
									</div>
								</div>
							);
						})}
					</div>
				</form>
			</div>
		</div>
	);
}
