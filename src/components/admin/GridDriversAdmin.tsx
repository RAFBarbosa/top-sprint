import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	getDocs,
	setDoc,
	doc,
	collection,
	deleteField,
	updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/adminClient";
import {
	useGetDriversRegistrationQuery,
	useGetTeamsQuery,
} from "../../graphql/generated";
import { useGrids } from "../../contexts/GridsContext";
import { getGridConfig } from "../../shared/config/grids";
import { tenant } from "../../shared/config/tenants";
import {
	Dialog,
	DialogTitle,
	DialogPanel,
	Description,
} from "@headlessui/react";

interface GridProfile {
	number: string;
	teamName: string;
	teamColor: string;
	photoUrl?: string;
	reserve?: boolean;
	exDriver?: boolean;
}

export function GridDriversAdmin({
	gridId: gridIdProp,
}: { gridId?: string } = {}) {
	const { gridId: gridIdParam } = useParams<{ gridId: string }>();
	const gridId = gridIdProp ?? gridIdParam;
	const { grids, loading: gridsLoading } = useGrids();

	const { data: driversData } = useGetDriversRegistrationQuery();
	const { data: teamsData } = useGetTeamsQuery();

	const [allProfiles, setAllProfiles] = useState<
		Record<string, Record<string, GridProfile>>
	>({});
	const [profilesLoading, setProfilesLoading] = useState(true);

	const [editingId, setEditingId] = useState<string | null>(null);
	const [editForm, setEditForm] = useState<GridProfile>({
		number: "",
		teamName: "",
		teamColor: "",
		photoUrl: "",
	});

	const [addSearch, setAddSearch] = useState("");
	const [status, setStatus] = useState<{
		type: "idle" | "loading" | "success" | "error";
		message: string;
	}>({ type: "idle", message: "" });

	const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);
	const [sortBy, setSortBy] = useState<"name" | "team">("name");

	useEffect(() => {
		const load = async () => {
			try {
				const snap = await getDocs(collection(db, "driver_profiles"));
				const map: Record<string, Record<string, GridProfile>> = {};
				snap.forEach((d) => {
					map[d.id] = d.data() as Record<string, GridProfile>;
				});
				setAllProfiles(map);
			} catch (e) {
				console.error("Failed to load driver profiles", e);
			} finally {
				setProfilesLoading(false);
			}
		};
		load();
	}, []);

	if (gridsLoading || profilesLoading) {
		return <p className="text-f1-lighterCarbon text-sm">Carregando...</p>;
	}

	const gridConfig = getGridConfig(gridId ?? "");
	const gridLabel = gridConfig?.label ?? gridId ?? "";
	const gridColor = gridConfig?.primaryColor ?? "#eb1c24";

	const assignedDriverIds = Object.keys(allProfiles).filter(
		(dId) => allProfiles[dId]?.[gridId ?? ""],
	);

	const sortIds = (ids: string[]) =>
		[...ids].sort((a, b) => {
			if (sortBy === "team") {
				const teamA = allProfiles[a]?.[gridId ?? ""]?.teamName ?? "";
				const teamB = allProfiles[b]?.[gridId ?? ""]?.teamName ?? "";
				const cmp = teamA.localeCompare(teamB, "pt-BR");
				if (cmp !== 0) return cmp;
			}
			const nameA =
				driversData?.drivers?.find((d) => d.id === a)?.name ?? a;
			const nameB =
				driversData?.drivers?.find((d) => d.id === b)?.name ?? b;
			return nameA.localeCompare(nameB, "pt-BR");
		});

	const titularIds = sortIds(
		assignedDriverIds.filter((dId) => {
			const p = allProfiles[dId]?.[gridId ?? ""];
			return !p?.reserve && !p?.exDriver;
		}),
	);
	const reserveIds = sortIds(
		assignedDriverIds.filter(
			(dId) => !!allProfiles[dId]?.[gridId ?? ""]?.reserve,
		),
	);
	const exDriverIds = sortIds(
		assignedDriverIds.filter(
			(dId) => !!allProfiles[dId]?.[gridId ?? ""]?.exDriver,
		),
	);

	const unassignedDrivers = (driversData?.drivers ?? []).filter(
		(d) => !d.deleted && !assignedDriverIds.includes(d.id),
	);
	const filteredUnassigned = unassignedDrivers
		.filter(
			(d) =>
				addSearch === "" ||
				d.name?.toLowerCase().includes(addSearch.toLowerCase()),
		)
		.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "", "pt-BR"));

	const handleStartEdit = (driverId: string) => {
		const profile = allProfiles[driverId]?.[gridId ?? ""] ?? {
			number: "",
			teamName: "",
			teamColor: "",
			photoUrl: "",
		};
		setEditingId(driverId);
		setEditForm(profile);
	};

	const handleTeamChange = (teamName: string) => {
		const team = teamsData?.teams?.find((t) => t.name === teamName);
		setEditForm((prev) => ({
			...prev,
			teamName: team?.name ?? "",
			teamColor: team?.color?.hex ?? "",
		}));
	};

	const handleSaveEdit = async (driverId: string) => {
		setStatus({ type: "loading", message: "Salvando..." });
		try {
			const driver = driversData?.drivers?.find((d) => d.id === driverId);
			const profileToSave: GridProfile = {
				...editForm,
				photoUrl: driver?.photo?.url ?? editForm.photoUrl ?? "",
			};
			const existing = allProfiles[driverId] ?? {};
			const updated = { ...existing, [gridId ?? ""]: profileToSave };
			await setDoc(doc(db, "driver_profiles", driverId), updated);
			setAllProfiles((prev) => ({ ...prev, [driverId]: updated }));
			setEditingId(null);
			setStatus({ type: "success", message: "Salvo!" });
			setTimeout(() => setStatus({ type: "idle", message: "" }), 2000);
		} catch (e: any) {
			setStatus({ type: "error", message: "Erro: " + e.message });
		}
	};

	const handleAssign = async (driverId: string, reserve = false, exDriver = false) => {
		const driver = driversData?.drivers?.find((d) => d.id === driverId);
		const profile: GridProfile = {
			number: (driver as any)?.number ?? "",
			teamName: driver?.team?.name ?? "",
			teamColor: driver?.team?.color?.hex ?? "",
			photoUrl: driver?.photo?.url ?? "",
			reserve,
			exDriver,
		};
		setStatus({ type: "loading", message: "Adicionando..." });
		try {
			const existing = allProfiles[driverId] ?? {};
			const updated = { ...existing, [gridId ?? ""]: profile };
			await setDoc(doc(db, "driver_profiles", driverId), updated);
			setAllProfiles((prev) => ({ ...prev, [driverId]: updated }));
			setAddSearch("");
			setStatus({
				type: "success",
				message: reserve ? "Reserva adicionado!" : "Piloto adicionado!",
			});
			setTimeout(() => setStatus({ type: "idle", message: "" }), 2000);
			setEditForm(profile);
			setEditingId(driverId);
		} catch (e: any) {
			setStatus({ type: "error", message: "Erro: " + e.message });
		}
	};

	const confirmRemove = async () => {
		if (!confirmRemoveId) return;
		setStatus({ type: "loading", message: "Removendo..." });
		try {
			await updateDoc(doc(db, "driver_profiles", confirmRemoveId), {
				[gridId ?? ""]: deleteField(),
			});
			setAllProfiles((prev) => {
				const copy = { ...prev };
				if (copy[confirmRemoveId]) {
					const inner = { ...copy[confirmRemoveId] };
					delete inner[gridId ?? ""];
					copy[confirmRemoveId] = inner;
				}
				return copy;
			});
			if (editingId === confirmRemoveId) setEditingId(null);
			setStatus({ type: "success", message: "Removido!" });
			setTimeout(() => setStatus({ type: "idle", message: "" }), 2000);
		} catch (e: any) {
			setStatus({ type: "error", message: "Erro: " + e.message });
		} finally {
			setConfirmRemoveId(null);
		}
	};

	const DriverRow = ({ driverId }: { driverId: string }) => {
		const driver = driversData?.drivers?.find((d) => d.id === driverId);
		const profile = allProfiles[driverId]?.[gridId ?? ""];
		const isEditing = editingId === driverId;

		return (
			<li key={driverId} className={isEditing ? "bg-f1-red/5" : ""}>
				<div
					onClick={() =>
						isEditing
							? setEditingId(null)
							: handleStartEdit(driverId)
					}
					className={`w-full p-2 hover:bg-f1-red/20 flex items-center gap-2 cursor-pointer justify-between overflow-hidden ${isEditing ? "bg-f1-red/20 font-bold" : ""}`}
				>
					<div className="flex items-center gap-2">
						<img
							src={
								profile?.photoUrl ||
								driver?.photo?.url ||
								tenant.fallbackDriverPhoto
							}
							alt={driver?.name ?? ""}
							className="w-8 h-8 rounded-full object-cover shrink-0 border border-black/10"
						/>
						{profile?.teamColor && (
							<div
								className="w-1 self-stretch shrink-0"
								style={{ backgroundColor: profile.teamColor }}
							/>
						)}
						<div className="flex flex-col items-start">
							<span className="text-sm">
								{driver?.name ?? driverId}
							</span>
							<span className="text-xs text-f1-lighterCarbon">
								{profile?.number
									? `#${profile.number}`
									: "Sem número"}
								{profile?.teamName
									? ` · ${profile.teamName}`
									: ""}
							</span>
						</div>
					</div>
					<button
						onClick={(e) => {
							e.stopPropagation();
							setConfirmRemoveId(driverId);
						}}
						className="z-10 text-f1-red p-1 hover:bg-f1-red hover:text-white rounded cursor-pointer duration-120"
						title="Remover"
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

				{isEditing && (
					<div className="p-4 space-y-3">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							<div>
								<label className="text-xs text-f1-lighterCarbon block mb-1">
									Número
								</label>
								<input
									type="text"
									value={editForm.number}
									onChange={(e) =>
										setEditForm((p) => ({
											...p,
											number: e.target.value,
										}))
									}
									className="w-full p-2 border rounded h-9 text-sm"
									placeholder="Ex: 5"
								/>
							</div>
							<div>
								<label className="text-xs text-f1-lighterCarbon block mb-1">
									Equipe
								</label>
								<select
									value={editForm.teamName}
									onChange={(e) =>
										handleTeamChange(e.target.value)
									}
									className="w-full px-2 border rounded h-9 text-sm cursor-pointer"
								>
									<option value="">— Sem Equipe —</option>
									{(teamsData?.teams ?? []).map((t) => (
										<option key={t.id} value={t.name}>
											{t.name}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="flex gap-4">
							<label className="flex items-center gap-2 cursor-pointer w-fit">
								<input
									type="checkbox"
									checked={!!editForm.reserve}
									onChange={(e) =>
										setEditForm((p) => ({
											...p,
											reserve: e.target.checked,
											exDriver: e.target.checked ? false : p.exDriver,
										}))
									}
									className="w-4 h-4"
								/>
								<span className="text-xs text-f1-lighterCarbon">
									Piloto reserva
								</span>
							</label>
							<label className="flex items-center gap-2 cursor-pointer w-fit">
								<input
									type="checkbox"
									checked={!!editForm.exDriver}
									onChange={(e) =>
										setEditForm((p) => ({
											...p,
											exDriver: e.target.checked,
											reserve: e.target.checked ? false : p.reserve,
										}))
									}
									className="w-4 h-4"
								/>
								<span className="text-xs text-f1-lighterCarbon">
									Ex-Piloto
								</span>
							</label>
						</div>
						<div className="flex gap-2">
							<button
								onClick={() => handleSaveEdit(driverId)}
								className="px-4 py-2 bg-f1-carbon text-white rounded text-sm cursor-pointer hover:bg-f1-carbon/80"
							>
								Salvar
							</button>
							<button
								onClick={() => setEditingId(null)}
								className="px-4 py-2 border rounded text-sm cursor-pointer hover:bg-gray-100"
							>
								Cancelar
							</button>
						</div>
					</div>
				)}
			</li>
		);
	};

	const confirmDriver = driversData?.drivers?.find(
		(d) => d.id === confirmRemoveId,
	);

	return (
		<div className="space-y-6">
			{/* Confirm remove modal */}
			<Dialog
				open={!!confirmRemoveId}
				onClose={() => setConfirmRemoveId(null)}
				className="relative z-50"
			>
				<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
				<div className="fixed inset-0 flex items-center justify-center p-4">
					<DialogPanel className="w-full max-w-md rounded bg-white p-6">
						<DialogTitle className="text-lg font-bold">
							Remover Piloto
						</DialogTitle>
						<Description className="mt-1">
							Tem certeza que deseja remover{" "}
							<strong>{confirmDriver?.name}</strong> deste grid?
						</Description>
						<div className="mt-6 flex justify-end gap-2">
							<button
								onClick={() => setConfirmRemoveId(null)}
								className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-f1-bg-silver cursor-pointer"
							>
								Cancelar
							</button>
							<button
								onClick={confirmRemove}
								className="px-4 py-2 text-white bg-f1-red rounded hover:bg-f1-red/90 cursor-pointer"
							>
								Remover
							</button>
						</div>
					</DialogPanel>
				</div>
			</Dialog>

			{status.type !== "idle" && (
				<div
					className={`p-3 rounded text-sm ${
						status.type === "error"
							? "bg-red-100 text-red-700 border border-red-300"
							: status.type === "success"
								? "bg-green-100 text-green-700 border border-green-300"
								: "bg-blue-100 text-blue-700 border border-blue-300"
					}`}
				>
					{status.message}
				</div>
			)}

			{/* Add driver */}
			<div className="border rounded-lg p-4 space-y-3">
				<p className="text-xs font-bold text-f1-lighterCarbon uppercase tracking-wide">
					Adicionar Piloto
				</p>
				<input
					type="text"
					placeholder="Buscar piloto..."
					value={addSearch}
					onChange={(e) => setAddSearch(e.target.value)}
					className="w-full p-2 border rounded h-10 text-sm"
				/>
				{addSearch && (
					<ul className="border rounded divide-y max-h-48 overflow-y-auto">
						{filteredUnassigned.length === 0 && (
							<li className="p-2 text-sm text-f1-lighterCarbon">
								Nenhum piloto encontrado.
							</li>
						)}
						{filteredUnassigned.map((d) => (
							<li
								key={d.id}
								className="flex items-center gap-3 p-2 hover:bg-f1-bg-silver"
							>
								<img
									src={
										d.photo?.url ||
										tenant.fallbackDriverPhoto
									}
									alt={d.name ?? ""}
									className="w-8 h-8 rounded-full object-cover shrink-0"
								/>
								<span className="flex-1 text-sm">{d.name}</span>
								<button
									onClick={() => handleAssign(d.id, false)}
									className="text-xs px-3 py-1 rounded cursor-pointer text-white"
									style={{ backgroundColor: gridColor }}
								>
									Titular
								</button>
								<button
									onClick={() => handleAssign(d.id, true)}
									className="text-xs px-3 py-1 rounded cursor-pointer text-white bg-gray-400 hover:bg-gray-500"
								>
									Reserva
								</button>
								<button
									onClick={() => handleAssign(d.id, false, true)}
									className="text-xs px-3 py-1 rounded cursor-pointer text-white bg-f1-lighterCarbon hover:bg-f1-carbon"
								>
									Ex
								</button>
							</li>
						))}
					</ul>
				)}
			</div>

			{/* Sort toggle */}
			<div className="flex items-center gap-2">
				<span className="text-xs text-f1-lighterCarbon">
					Ordenar por:
				</span>
				{(["name", "team"] as const).map((opt) => (
					<button
						key={opt}
						type="button"
						onClick={() => setSortBy(opt)}
						className={`text-xs px-3 py-1 rounded border cursor-pointer transition-colors ${
							sortBy === opt
								? "bg-f1-red text-white border-f1-red"
								: "border-black/20 hover:bg-f1-red/10"
						}`}
					>
						{opt === "name" ? "Piloto A-Z" : "Equipe A-Z"}
					</button>
				))}
			</div>

			{/* Titular drivers */}
			<div className="border rounded-lg overflow-hidden">
				<div className="px-4 py-2 flex items-center gap-2 border-b border-black/10 bg-f1-bg-silver">
					{/* <span
						className="w-2.5 h-2.5 rounded-full shrink-0"
						style={{ backgroundColor: gridColor }}
					/> */}
					<span className="text-xs font-bold text-f1-lighterCarbon uppercase tracking-wide">
						{/* {gridLabel} — {titularIds.length} pilotos */}
						Titulares — {titularIds.length} pilotos
					</span>
				</div>
				{titularIds.length === 0 ? (
					<p className="p-4 text-sm text-f1-lighterCarbon">
						Nenhum piloto titular neste grid ainda.
					</p>
				) : (
					<ul className="grid grid-cols-1 md:grid-cols-2 divide-y md:[&>li:nth-child(2)]:border-t-0 md:[&>li:nth-child(odd)]:border-r">
						{titularIds.map((driverId) => (
							<DriverRow key={driverId} driverId={driverId} />
						))}
					</ul>
				)}
			</div>

			{/* Reserve drivers */}
			<div className="border rounded-lg overflow-hidden">
				<div className="px-4 py-2 flex items-center gap-2 border-b border-black/10 bg-f1-bg-silver">
					<span className="text-xs font-bold text-f1-lighterCarbon uppercase tracking-wide">
						Reservas — {reserveIds.length} pilotos
					</span>
				</div>
				{reserveIds.length === 0 ? (
					<p className="p-4 text-sm text-f1-lighterCarbon">
						Nenhum reserva neste grid.
					</p>
				) : (
					<ul className="grid grid-cols-1 md:grid-cols-2 divide-y md:[&>li:nth-child(2)]:border-t-0 md:[&>li:nth-child(odd)]:border-r">
						{reserveIds.map((driverId) => (
							<DriverRow key={driverId} driverId={driverId} />
						))}
					</ul>
				)}
			</div>

			{/* Ex-Pilotos */}
			<div className="border rounded-lg overflow-hidden">
				<div className="px-4 py-2 flex items-center gap-2 border-b border-black/10 bg-f1-bg-silver">
					<span className="text-xs font-bold text-f1-lighterCarbon uppercase tracking-wide">
						Ex-Pilotos — {exDriverIds.length} pilotos
					</span>
				</div>
				{exDriverIds.length === 0 ? (
					<p className="p-4 text-sm text-f1-lighterCarbon">
						Nenhum ex-piloto neste grid.
					</p>
				) : (
					<ul className="grid grid-cols-1 md:grid-cols-2 divide-y md:[&>li:nth-child(2)]:border-t-0 md:[&>li:nth-child(odd)]:border-r">
						{exDriverIds.map((driverId) => (
							<DriverRow key={driverId} driverId={driverId} />
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
