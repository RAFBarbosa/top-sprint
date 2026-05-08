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
	Dialog,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { useGetDriversQuery } from "../../graphql/generated";
import { useCalendars } from "../../contexts/CalendarsContext";
import { ChevronUpDownIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { getGridLabel, getGridConfig } from "../../shared/config/grids";
import { tenant } from "../../shared/config/tenants";

import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

// Firebase
import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import type { PointAdjustment } from "./PointAdjustmentsAdmin";
import { useCalculateCards } from "../../shared/hooks/useCalculateCards";
import { useCalendarSeasons } from "../../contexts/CalendarSeasonsContext";
import { saveSeasonCardSnapshot } from "../../shared/utils/calculateDriverCards";
import { useToast } from "../../contexts/ToastContext";
import { useTracks } from "../../contexts/TracksContext";
import { CountryFlag } from "../utils/CountryFlag";

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

export function ManualResultsRegistration({
	gridId,
}: ManualResultsRegistrationProps) {
	const { triggerForGrid } = useCalculateCards();
	const { mappings, getSeasonForCalendar } = useCalendarSeasons();
	const { showToast } = useToast();
	const { getTrack } = useTracks();

	// Aba Ativa
	const [activeTab, setActiveTab] = useState<"sprint" | "race" | "adjustments">("race");

	// --- ESTADOS AJUSTES ---
	const [calendarAdjustments, setCalendarAdjustments] = useState<PointAdjustment[]>([]);
	const [adjDriverQuery, setAdjDriverQuery] = useState("");
	const [adjSelectedDriverId, setAdjSelectedDriverId] = useState("");
	const [adjPoints, setAdjPoints] = useState<number>(0);
	const [adjReason, setAdjReason] = useState("");
	const [adjEditId, setAdjEditId] = useState<string | null>(null);
	const [adjConfirmDeleteId, setAdjConfirmDeleteId] = useState<string | null>(null);
	const [adjSaving, setAdjSaving] = useState(false);

	// --- ESTADOS CORRIDA ---
	const [results, setResults] = useState<RaceResult[]>(
		Array.from({ length: 22 }, (_, i) => ({
			position: i + 1,
			driverId: "",
			driverName: "",
		})),
	);
	const [qualyResults, setQualyResults] = useState<RaceResult[]>(
		Array.from({ length: 22 }, (_, i) => ({
			position: i + 1,
			driverId: "",
			driverName: "",
		})),
	);
	const [penaltyValues, setPenaltyValues] = useState<number[]>(
		Array(22).fill(0),
	);
	const [ncValues, setNcValues] = useState<boolean[]>(Array(22).fill(false));
	// Prêmios Corrida
	const [awards, setAwards] = useState<Record<string, string>>({});

	// --- ESTADOS SPRINT ---
	const [sprintResults, setSprintResults] = useState<RaceResult[]>(
		Array.from({ length: 22 }, (_, i) => ({
			position: i + 1,
			driverId: "",
			driverName: "",
		})),
	);
	const [sprintQualy, setSprintQualy] = useState<RaceResult[]>(
		Array.from({ length: 22 }, (_, i) => ({
			position: i + 1,
			driverId: "",
			driverName: "",
		})),
	);
	const [sprintPenaltyValues, setSprintPenaltyValues] = useState<number[]>(
		Array(22).fill(0),
	);
	const [sprintNcValues, setSprintNcValues] = useState<boolean[]>(
		Array(22).fill(false),
	);
	const [focusedPenalty, setFocusedPenalty] = useState<string | null>(null);
	// Prêmios Sprint
	const [sprintAwards, setSprintAwards] = useState<Record<string, string>>(
		{},
	);

	// Queries de busca
	const [raceQueries, setRaceQueries] = useState<string[]>(
		Array(22).fill(""),
	);
	const [qualyQueries, setQualyQueries] = useState<string[]>(
		Array(22).fill(""),
	);
	const [sprintRaceQueries, setSprintRaceQueries] = useState<string[]>(
		Array(22).fill(""),
	);
	const [sprintQualyQueries, setSprintQualyQueries] = useState<string[]>(
		Array(22).fill(""),
	);
	// Queries de busca para prêmios
	const [awardQueries, setAwardQueries] = useState<Record<string, string>>(
		{},
	);

	const [allProfiles, setAllProfiles] = useState<
		Record<string, Record<string, GridProfile>>
	>({});

	const [link, setLink] = useState("");

	const [saving, setSaving] = useState(false);
	const [selectedCalendar, setSelectedCalendar] = useState<any>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [activeFilter, setActiveFilter] = useState<
		"all" | "active" | "inactive"
	>("all");
	const [gridFilter, setGridFilter] = useState(gridId || "");

	const { allCalendars } = useCalendars();
	const { data: driversData } = useGetDriversQuery();

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
					return Array.from({ length: 22 }, (_, i) => {
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
					const vals = Array(22).fill(0);
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
					const sprintNcSet = new Set<string>(
						data.sprintNcDriverIds || [],
					);
					setSprintNcValues(
						sR.map((r) => sprintNcSet.has(r.driverId)),
					);
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
						Array.from({ length: 22 }, (_, i) => ({
							position: i + 1,
							driverId: "",
							driverName: "",
						}));
					setResults(empty());
					setQualyResults(empty());
					setSprintResults(empty());
					setSprintQualy(empty());
					setPenaltyValues(Array(22).fill(0));
					setSprintPenaltyValues(Array(22).fill(0));
					setNcValues(Array(22).fill(false));
					setSprintNcValues(Array(22).fill(false));
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
		if (selectedCalendar && !selectedCalendar.sprint && activeTab === "sprint") {
			setActiveTab("race");
		}
	}, [selectedCalendar]);

	// Carregar ajustes de pontos da etapa selecionada
	useEffect(() => {
		if (!selectedCalendar?.id) {
			setCalendarAdjustments([]);
			return;
		}
		const load = async () => {
			try {
				const snap = await getDoc(doc(db, "point_adjustments", selectedCalendar.id));
				setCalendarAdjustments(snap.exists() ? (snap.data().adjustments ?? []) : []);
			} catch (e) {
				console.error(e);
			}
		};
		load();
	}, [selectedCalendar?.id]);

	const saveAdjustments = async (next: PointAdjustment[]) => {
		if (!selectedCalendar?.id) return;
		setAdjSaving(true);
		try {
			await setDoc(doc(db, "point_adjustments", selectedCalendar.id), {
				adjustments: next,
				grid: selectedCalendar.grid ?? "",
				calendarId: selectedCalendar.id,
			});
			setCalendarAdjustments(next);
			showToast("success", "Ajuste salvo!");
		} catch (e: any) {
			showToast("error", "Erro: " + e.message);
		} finally {
			setAdjSaving(false);
		}
	};

	const handleAddAdjustment = async () => {
		if (!adjSelectedDriverId || adjPoints === 0 || !adjReason.trim()) return;
		const next = adjEditId
			? calendarAdjustments.map((a) =>
				a.id === adjEditId
					? { ...a, driverId: adjSelectedDriverId, points: adjPoints, reason: adjReason.trim() }
					: a,
			)
			: [...calendarAdjustments, { id: crypto.randomUUID(), driverId: adjSelectedDriverId, points: adjPoints, reason: adjReason.trim() }];
		await saveAdjustments(next);
		setAdjSelectedDriverId("");
		setAdjDriverQuery("");
		setAdjPoints(0);
		setAdjReason("");
		setAdjEditId(null);
	};

	const resetAdj = () => {
		setAdjEditId(null);
		setAdjSelectedDriverId("");
		setAdjDriverQuery("");
		setAdjPoints(0);
		setAdjReason("");
	};

	const handleEditAdjustment = (adj: PointAdjustment) => {
		const driver = getFilteredDrivers("").find((d) => d.id === adj.driverId)
			?? driversData?.drivers?.find((d) => d.id === adj.driverId);
		setAdjEditId(adj.id);
		setAdjSelectedDriverId(adj.driverId);
		setAdjDriverQuery(driver?.name ?? "");
		setAdjPoints(adj.points);
		setAdjReason(adj.reason);
	};

	const handleDeleteAdjustment = async (id: string) => {
		await saveAdjustments(calendarAdjustments.filter((a) => a.id !== id));
		if (adjEditId === id) { setAdjEditId(null); setAdjSelectedDriverId(""); setAdjDriverQuery(""); setAdjPoints(0); setAdjReason(""); }
		setAdjConfirmDeleteId(null);
	};

	// --- GRAVAÇÃO ---
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!selectedCalendar?.id) return;
		setSaving(true);

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
				{
					teamName: string;
					teamColor: string;
					number: string;
					photoUrl: string;
				}
			> = {};
			allIds.forEach((id) => {
				const driver = driversData?.drivers?.find((d) => d.id === id);
				if (driver) {
					const profile =
						allProfiles[id]?.[selectedCalendar.grid ?? ""];
					driverSnapshots[id] = {
						teamName: profile?.teamName ?? driver.team?.name ?? "",
						teamColor:
							profile?.teamColor ?? driver.team?.color?.hex ?? "",
						number: profile?.number ?? driver.number ?? "",
						photoUrl: profile?.photoUrl ?? driver.photo?.url ?? "",
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

			showToast(
				"success",
				`Dados de ${activeTab === "race" ? "Corrida" : "Sprint"} salvos!`,
			);

			if (selectedCalendar.grid) {
				triggerForGrid(selectedCalendar.grid).then(async () => {
					const seasonId = getSeasonForCalendar(selectedCalendar.id);
					if (!seasonId) return;
					const seasonCalendarIds = mappings
						.filter((m) => m.seasonId === seasonId)
						.map((m) => m.calendarId);
					const seasonCalendars = allCalendars
						.filter((c) => c.grid === selectedCalendar.grid && seasonCalendarIds.includes(c.id))
						.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
					const lastCalendar = seasonCalendars[seasonCalendars.length - 1];
					if (lastCalendar?.id === selectedCalendar.id) {
						await saveSeasonCardSnapshot(selectedCalendar.grid, seasonId);
					}
				}).catch(console.error);
			}
		} catch (error: any) {
			showToast("error", "Erro: " + error.message);
		} finally {
			setSaving(false);
		}
	};

	const handleSelectCalendar = (calendar: any) => {
		if (selectedCalendar?.id === calendar.id) {
			setSelectedCalendar(null);
			return;
		}
		setSelectedCalendar(calendar);
		setLink("");
		setRaceQueries(Array(22).fill(""));
		setQualyQueries(Array(22).fill(""));
		setSprintRaceQueries(Array(22).fill(""));
		setSprintQualyQueries(Array(22).fill(""));
		const emptyAwards = Object.fromEntries(
			(getGridConfig(calendar.grid)?.raceAwards ?? []).map((a) => [
				a.id,
				"",
			]),
		);
		setAwards(emptyAwards);
		setSprintAwards({ ...emptyAwards });
		setAwardQueries({ ...emptyAwards });
	};

	const getFilteredDrivers = (query: string) => {
		if (!driversData?.drivers || !selectedCalendar) return [];
		const q = (query ?? "").toLowerCase();
		const grid = selectedCalendar.grid;
		return driversData.drivers
			.filter((d) => {
				if (d.deleted) return false;
				if (!grid) return true;
				// Show if they have a Firebase profile for this grid,
				// or fall back to Hygraph grid field for drivers not yet migrated
				return (
					allProfiles[d.id]?.[grid] !== undefined || d.grid === grid
				);
			})
			.filter((d) => q === "" || d.name?.toLowerCase().includes(q))
			.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
	};

	const gridOptions: string[] = (tenant.grids as any[]).map((g: any) => g.id);

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
		const month = format(date, "MMM", { locale: ptBR });
		const year = format(date, "yyyy", { locale: ptBR });
		const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
		return `${day} ${capitalizedMonth} ${year}`;
	};

	const filteredCalendars = [...allCalendars]
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.filter((c) => {
			const matchesActive =
				activeFilter === "all"
					? true
					: activeFilter === "active"
						? c.active
						: !c.active;
			const matchesSearch = searchTerm
				? (getTrack(c.trackId)?.name || "")
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
				: true;
			const matchesGrid = gridFilter ? c.grid === gridFilter : true;
			return matchesActive && matchesSearch && matchesGrid;
		});

	return (
		<>
		<div className="w-full">
			{/* Calendar list */}
				<div className="mb-3 space-y-2">
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
								<ListboxButton className="w-full px-2 border rounded flex items-center justify-between cursor-pointer h-9 text-sm bg-white">
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
						className="w-full px-2 border rounded h-9 text-sm"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			<ul className="space-y-[2px]">
				{filteredCalendars.map((calendar) => (
					<li
						key={calendar.id}
						className={`bg-white rounded ${selectedCalendar?.id === calendar.id ? "ring-1 ring-f1-red/30" : ""}`}
					>
						<div
							onClick={() => handleSelectCalendar(calendar)}
							className={`w-full px-3 py-2 hover:bg-f1-red/10 flex items-center gap-3 cursor-pointer justify-between ${selectedCalendar?.id === calendar.id ? "bg-f1-red/10" : ""}`}
						>
							<CountryFlag
								code={getTrack(calendar.trackId)?.countryCode}
								className="w-[36px] h-[20px] rounded border border-black/10 shrink-0"
							/>
							<div className="flex flex-col flex-1 min-w-0">
								<span className={`text-sm truncate ${selectedCalendar?.id === calendar.id ? "font-bold" : "font-medium"}`}>
									{getTrack(calendar.trackId)?.name ?? calendar.round}
								</span>
								<span className={`text-xs text-gray-500 ${selectedCalendar?.id === calendar.id ? "font-bold" : ""}`}>
									{calendar.round} · {formatDateWithCapitalizedMonth(calendar.date)}
									{calendar.sprint && (
										<span className="ml-1 text-[10px] bg-f1-purple/20 text-f1-purple px-1 rounded font-medium">SPRINT</span>
									)}
								</span>
							</div>
						</div>

						{selectedCalendar?.id === calendar.id && (
							<div className="border-t border-f1-red/20 bg-f1-red/5">
								<form
									onSubmit={handleSubmit}
									className="p-4"
								>
					<div className="mb-6">
						<div className="flex justify-between items-start mb-3">
							<div>
								<h2 className="text-2xl font-bold">
									{activeTab === "race" ? "Resultados Corrida" : activeTab === "sprint" ? "Resultados Sprint" : "Ajustes de Pontos"}
								</h2>
								{selectedCalendar && (
									<p className="text-sm mt-1 text-gray-600">
										{getTrack(selectedCalendar.trackId)?.name} —{" "}
										{selectedCalendar.round}
									</p>
								)}
							</div>
							<button
								type="button"
								onClick={handleSubmit}
								disabled={!selectedCalendar || saving}
								className="bg-f1-carbon border border-f1-carbon text-white px-6 py-2 rounded cursor-pointer duration-120 disabled:opacity-50 hover:bg-transparent hover:text-f1-carbon"
							>
								{saving ? "Gravando..." : "Gravar Dados"}
							</button>
						</div>
						{selectedCalendar && (
							<div className="flex rounded border overflow-hidden text-sm w-fit">
								<button
									type="button"
									onClick={() => setActiveTab("race")}
									className={`px-4 py-2 cursor-pointer transition-colors duration-120 ${activeTab === "race" ? "bg-f1-red text-white font-medium" : "bg-white text-gray-600 hover:bg-f1-red/10"}`}
								>
									Corrida
								</button>
								{selectedCalendar.sprint && (
									<button
										type="button"
										onClick={() => setActiveTab("sprint")}
										className={`px-4 py-2 cursor-pointer transition-colors duration-120 ${activeTab === "sprint" ? "bg-f1-red text-white font-medium" : "bg-white text-gray-600 hover:bg-f1-red/10"}`}
									>
										Sprint
									</button>
								)}
								<button
									type="button"
									onClick={() => setActiveTab("adjustments")}
									className={`px-4 py-2 cursor-pointer transition-colors duration-120 ${activeTab === "adjustments" ? "bg-f1-red text-white font-medium" : "bg-white text-gray-600 hover:bg-f1-red/10"}`}
								>
									Ajustes
								</button>
							</div>
						)}
					</div>

					{/* Ajustes de Pontos tab */}
					{activeTab === "adjustments" && (
						<div className="space-y-6">
							{/* Add form */}
							<div className="border border-black/10 rounded-lg p-4 space-y-4">
								<h3 className="font-semibold text-sm">{adjEditId ? "Editar Ajuste" : "Novo Ajuste"}</h3>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div className="relative">
										<label className="text-xs text-f1-lighterCarbon block mb-1">Piloto</label>
										<input
											type="text"
											className="w-full px-2 border rounded h-9 text-sm bg-white"
											placeholder="Buscar piloto..."
											value={adjSelectedDriverId
												? getFilteredDrivers("").find((d) => d.id === adjSelectedDriverId)?.name ?? adjDriverQuery
												: adjDriverQuery}
											onChange={(e) => { setAdjDriverQuery(e.target.value); setAdjSelectedDriverId(""); }}
										/>
										{adjDriverQuery && !adjSelectedDriverId && (
											<ul className="absolute z-20 mt-1 w-full bg-white border rounded shadow max-h-48 overflow-y-auto text-sm">
												{getFilteredDrivers(adjDriverQuery).map((d) => (
													<li
														key={d.id}
														className="px-3 py-2 hover:bg-f1-red/10 cursor-pointer"
														onClick={() => { setAdjSelectedDriverId(d.id); setAdjDriverQuery(""); }}
													>
														{d.name}
													</li>
												))}
											</ul>
										)}
									</div>
									<div>
										<label className="text-xs text-f1-lighterCarbon block mb-1">
											Pontos <span className="font-normal">(negativo = penalidade)</span>
										</label>
										<input
											type="number"
											className="w-full px-2 border rounded h-9 text-sm bg-white"
											value={adjPoints === 0 ? "" : adjPoints}
											placeholder="Ex: -5 ou +3"
											onChange={(e) => setAdjPoints(parseInt(e.target.value) || 0)}
										/>
									</div>
									<div>
										<label className="text-xs text-f1-lighterCarbon block mb-1">Motivo</label>
										<input
											type="text"
											className="w-full px-2 border rounded h-9 text-sm bg-white"
											placeholder="Ex: Penalidade Comissários"
											value={adjReason}
											onChange={(e) => setAdjReason(e.target.value)}
										/>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<button
										type="button"
										onClick={handleAddAdjustment}
										disabled={!adjSelectedDriverId || adjPoints === 0 || !adjReason.trim() || adjSaving}
										className="bg-f1-red text-white px-4 py-2 rounded text-sm hover:bg-f1-red/80 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
									>
										{adjEditId ? "Salvar" : "Adicionar"}
									</button>
									{adjEditId && (
										<button
											type="button"
											onClick={() => { setAdjEditId(null); setAdjSelectedDriverId(""); setAdjDriverQuery(""); setAdjPoints(0); setAdjReason(""); }}
											className="px-4 py-2 rounded text-sm border border-black/20 hover:bg-black/5"
										>
											Cancelar
										</button>
									)}
								</div>
							</div>

							{/* List */}
							{calendarAdjustments.length === 0 ? (
								<p className="text-sm text-f1-lighterCarbon">Nenhum ajuste para esta etapa.</p>
							) : (
								<div className="border border-black/10 rounded-lg overflow-hidden">
									<table className="min-w-full text-sm">
										<thead>
											<tr className="text-xs uppercase tracking-wide text-f1-lighterCarbon border-b border-black/10 bg-f1-bg-silver">
												<th className="py-2 px-4 text-left">Piloto</th>
												<th className="py-2 px-4 text-left">Motivo</th>
												<th className="py-2 px-4 text-right">Pts</th>
												<th className="py-2 px-4 text-right w-20"></th>
											</tr>
										</thead>
										<tbody>
											{calendarAdjustments.map((adj, i) => {
												const driver = getFilteredDrivers("").find((d) => d.id === adj.driverId)
													?? driversData?.drivers?.find((d) => d.id === adj.driverId);
												return (
													<tr
														key={adj.id}
														onClick={() => adjEditId === adj.id ? resetAdj() : handleEditAdjustment(adj)}
														className={`cursor-pointer transition-colors ${adjEditId === adj.id ? "ring-2 ring-inset ring-f1-red/40 bg-f1-red/5" : `${i % 2 === 0 ? "bg-white" : "bg-f1-bg-silver"} hover:bg-f1-red/10`}`}
													>
														<td className="py-2 px-4 font-medium">{driver?.name ?? adj.driverId}</td>
														<td className="py-2 px-4 text-f1-lighterCarbon">{adj.reason}</td>
														<td className={`py-2 px-4 text-right font-bold ${adj.points > 0 ? "text-green-600" : "text-f1-red"}`}>
															{adj.points > 0 ? `+${adj.points}` : adj.points}
														</td>
														<td className="py-2 px-4 text-right">
															<button
																type="button"
																onClick={(e) => { e.stopPropagation(); setAdjConfirmDeleteId(adj.id); }}
																className="text-f1-lighterCarbon hover:text-f1-red hover:bg-f1-red/10 rounded p-1 transition-colors cursor-pointer"
																title="Remover"
															>
																<TrashIcon className="h-4 w-4" />
															</button>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							)}
						</div>
					)}

					{activeTab !== "adjustments" && (
					<>

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
							className="w-full px-2 border rounded h-9 text-sm bg-white"
						/>
					</div>

					{/* Prêmios da Etapa */}
					{(() => {
						const gridRaceAwards = selectedCalendar
							? resolveRaceAwards(selectedCalendar.grid)
							: [];
						if (gridRaceAwards.length === 0 || activeTab === "sprint") return null;
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
															className="w-full px-2 border rounded h-9 text-sm bg-white"
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

						{Array.from({ length: 22 }).map((_, i) => {
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

							const qualySelectedIds = new Set(currentQualy.filter((_, idx) => idx !== i).map(r => r.driverId).filter(Boolean));
							const raceSelectedIds = new Set(currentResults.filter((_, idx) => idx !== i).map(r => r.driverId).filter(Boolean));
							const qualyDriverOptions = getFilteredDrivers(currentQueriesQ[i]).filter(d => !qualySelectedIds.has(d.id));
							const raceDriverOptions = getFilteredDrivers(currentQueriesR[i]).filter(d => !raceSelectedIds.has(d.id));
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
													className="w-full px-2 border rounded h-9 text-sm bg-white"
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
												{currentQualy[i].driverId && (
													<button
														type="button"
														onClick={() => {
															const setter = isRace ? setQualyResults : setSprintQualy;
															setter(prev => prev.map((item, idx) => idx === i ? { ...item, driverId: "", driverName: "" } : item));
														}}
														className="absolute inset-y-0 right-6 flex items-center px-1 text-gray-400 hover:text-f1-red z-10"
													>
														<XMarkIcon className="h-3.5 w-3.5" />
													</button>
												)}
												<ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
													<ChevronUpDownIcon
														className="h-4 w-4 text-gray-400"
														aria-hidden="true"
													/>
												</ComboboxButton>
												<ComboboxOptions className="absolute z-50 mt-1 max-h-40 w-full overflow-auto rounded bg-white py-1 shadow-xl border border-gray-100">
													{qualyDriverOptions.map((d) => (
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
													className="w-full px-2 border rounded h-9 text-sm bg-white"
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
												{currentResults[i].driverId && (
													<button
														type="button"
														onClick={() => {
															const setter = isRace ? setResults : setSprintResults;
															setter(prev => prev.map((item, idx) => idx === i ? { ...item, driverId: "", driverName: "" } : item));
														}}
														className="absolute inset-y-0 right-6 flex items-center px-1 text-gray-400 hover:text-f1-red z-10"
													>
														<XMarkIcon className="h-3.5 w-3.5" />
													</button>
												)}
												<ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
													<ChevronUpDownIcon
														className="h-4 w-4 text-gray-400"
														aria-hidden="true"
													/>
												</ComboboxButton>
												<ComboboxOptions className="absolute z-50 mt-1 max-h-40 w-full overflow-auto rounded bg-white py-1 shadow-xl border border-gray-100">
													{raceDriverOptions.map((d) => (
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
												if (focusedPenalty === key)
													return val === 0
														? ""
														: String(val);
												return val === 0
													? ""
													: `${val}s`;
											})()}
											disabled={
												!currentResults[i].driverId
											}
											onFocus={() =>
												setFocusedPenalty(
													`${isRace ? "r" : "s"}-${i}`,
												)
											}
											onBlur={() =>
												setFocusedPenalty(null)
											}
											onChange={(e) => {
												const val =
													parseInt(e.target.value) ||
													0;
												const setter = isRace
													? setPenaltyValues
													: setSprintPenaltyValues;
												setter((prev) => {
													const n = [...prev];
													n[i] = val;
													return n;
												});
											}}
											className="w-full px-2 border rounded h-9 text-center text-sm bg-white disabled:opacity-20"
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
											disabled={
												!currentResults[i].driverId
											}
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
						</>
						)}
						</form>
					</div>
					)}
				</li>
			))}
			</ul>
		</div>

		{/* Confirm delete adjustment modal */}
		<Dialog open={adjConfirmDeleteId !== null} onClose={() => setAdjConfirmDeleteId(null)} className="relative z-50">
			<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<DialogPanel className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
					<DialogTitle className="text-lg font-bold mb-2">Remover Ajuste</DialogTitle>
					<p className="text-f1-lighterCarbon mb-6">Tem certeza que deseja remover este ajuste?</p>
					<div className="flex gap-3 justify-end">
						<button
							type="button"
							onClick={() => setAdjConfirmDeleteId(null)}
							className="px-4 py-2 rounded border border-f1-black/20 text-sm font-medium hover:bg-f1-bg-silver transition-colors cursor-pointer"
						>
							Cancelar
						</button>
						<button
							type="button"
							onClick={() => adjConfirmDeleteId && handleDeleteAdjustment(adjConfirmDeleteId)}
							className="px-4 py-2 rounded bg-f1-red text-white text-sm font-medium hover:bg-f1-red/80 transition-colors cursor-pointer"
						>
							Remover
						</button>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
		</>
	);
}
