import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	getDocs,
	setDoc,
	doc,
	collection,
	deleteField,
	updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { useGetDriversRegistrationQuery, useGetTeamsQuery } from "../../graphql/generated";
import { useGrids } from "../../contexts/GridsContext";
import { getGridConfig } from "../../shared/config/grids";

interface GridProfile {
	number: string;
	teamName: string;
	teamColor: string;
	photoUrl?: string;
}

export function GridDriversAdmin() {
	const { gridId } = useParams<{ gridId: string }>();
	const { grids, loading: gridsLoading } = useGrids();
	const navigate = useNavigate();

	const { data: driversData } = useGetDriversRegistrationQuery();
	const { data: teamsData } = useGetTeamsQuery();

	// All profiles from Firebase: driverId → { gridId → GridProfile }
	const [allProfiles, setAllProfiles] = useState<
		Record<string, Record<string, GridProfile>>
	>({});
	const [profilesLoading, setProfilesLoading] = useState(true);

	// Driver being edited inline
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editForm, setEditForm] = useState<GridProfile>({
		number: "",
		teamName: "",
		teamColor: "",
		photoUrl: "",
	});

	// Search for adding new drivers
	const [addSearch, setAddSearch] = useState("");
	const [status, setStatus] = useState<{
		type: "idle" | "loading" | "success" | "error";
		message: string;
	}>({ type: "idle", message: "" });

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

	// Drivers assigned to this grid
	const assignedDriverIds = Object.keys(allProfiles).filter(
		(dId) => allProfiles[dId]?.[gridId ?? ""],
	);

	// Drivers not yet assigned (for the add list)
	const unassignedDrivers = (driversData?.drivers ?? []).filter(
		(d) => !d.deleted && !assignedDriverIds.includes(d.id),
	);

	const filteredUnassigned = unassignedDrivers.filter(
		(d) =>
			addSearch === "" ||
			d.name?.toLowerCase().includes(addSearch.toLowerCase()),
	);

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

	const handleAssign = async (driverId: string) => {
		const driver = driversData?.drivers?.find((d) => d.id === driverId);
		const profile: GridProfile = {
			number: (driver as any)?.number ?? "",
			teamName: driver?.team?.name ?? "",
			teamColor: driver?.team?.color?.hex ?? "",
			photoUrl: driver?.photo?.url ?? "",
		};
		setStatus({ type: "loading", message: "Adicionando..." });
		try {
			const existing = allProfiles[driverId] ?? {};
			const updated = { ...existing, [gridId ?? ""]: profile };
			await setDoc(doc(db, "driver_profiles", driverId), updated);
			setAllProfiles((prev) => ({ ...prev, [driverId]: updated }));
			setAddSearch("");
			setStatus({ type: "success", message: "Piloto adicionado!" });
			setTimeout(() => setStatus({ type: "idle", message: "" }), 2000);
			// Start editing immediately so user can set number/team
			setEditForm(profile);
			setEditingId(driverId);
		} catch (e: any) {
			setStatus({ type: "error", message: "Erro: " + e.message });
		}
	};

	const handleRemove = async (driverId: string) => {
		setStatus({ type: "loading", message: "Removendo..." });
		try {
			await updateDoc(doc(db, "driver_profiles", driverId), {
				[gridId ?? ""]: deleteField(),
			});
			setAllProfiles((prev) => {
				const copy = { ...prev };
				if (copy[driverId]) {
					const inner = { ...copy[driverId] };
					delete inner[gridId ?? ""];
					copy[driverId] = inner;
				}
				return copy;
			});
			setStatus({ type: "success", message: "Removido!" });
			setTimeout(() => setStatus({ type: "idle", message: "" }), 2000);
		} catch (e: any) {
			setStatus({ type: "error", message: "Erro: " + e.message });
		}
	};

	return (
		<div className="space-y-5">
			{/* Header */}
			<div className="flex items-center gap-3 flex-wrap">
				<button
					onClick={() => navigate("/admin/painel/grids")}
					className="text-f1-lighterCarbon hover:text-f1-text text-sm cursor-pointer"
				>
					← Grids
				</button>
				<span className="text-f1-lighterCarbon">/</span>
				<button
					onClick={() =>
						navigate(`/admin/painel/grids/${gridId}`)
					}
					className="text-f1-lighterCarbon hover:text-f1-text text-sm cursor-pointer"
				>
					{gridLabel}
				</button>
				<span className="text-f1-lighterCarbon">/</span>
				<h2 className="text-2xl font-bold">Pilotos</h2>
			</div>

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
								{d.photo?.url && (
									<img
										src={d.photo.url}
										alt={d.name ?? ""}
										className="w-8 h-8 rounded-full object-cover shrink-0"
									/>
								)}
								<span className="flex-1 text-sm">
									{d.name}
								</span>
								<button
									onClick={() => handleAssign(d.id)}
									className="text-xs px-3 py-1 rounded cursor-pointer text-white"
									style={{ backgroundColor: gridColor }}
								>
									Adicionar
								</button>
							</li>
						))}
					</ul>
				)}
			</div>

			{/* Assigned drivers */}
			<div className="border rounded-lg overflow-hidden">
				<div
					className="px-4 py-2"
					style={{ backgroundColor: gridColor }}
				>
					<span className="text-white text-xs font-bold uppercase tracking-wider">
						{gridLabel} — {assignedDriverIds.length} pilotos
					</span>
				</div>

				{assignedDriverIds.length === 0 ? (
					<p className="p-4 text-sm text-f1-lighterCarbon">
						Nenhum piloto neste grid ainda.
					</p>
				) : (
					<ul className="divide-y">
						{assignedDriverIds.map((driverId) => {
							const driver = driversData?.drivers?.find(
								(d) => d.id === driverId,
							);
							const profile =
								allProfiles[driverId]?.[gridId ?? ""];
							const isEditing = editingId === driverId;

							return (
								<li key={driverId} className="p-3">
									<div className="flex items-center gap-3">
										{(profile?.photoUrl ||
											driver?.photo?.url) && (
											<img
												src={
													profile?.photoUrl ||
													driver?.photo?.url
												}
												alt={driver?.name ?? ""}
												className="w-10 h-10 rounded-full object-cover shrink-0 border border-black/10"
											/>
										)}
										<div className="flex-1 min-w-0">
											<p className="font-semibold text-sm">
												{driver?.name ?? driverId}
											</p>
											{!isEditing && (
												<p className="text-xs text-f1-lighterCarbon">
													{profile?.number
														? `#${profile.number}`
														: "Sem número"}
													{profile?.teamName
														? ` · ${profile.teamName}`
														: ""}
												</p>
											)}
										</div>
										{!isEditing && (
											<div className="flex gap-2 shrink-0">
												<button
													onClick={() =>
														handleStartEdit(
															driverId,
														)
													}
													className="text-xs px-3 py-1.5 border rounded hover:bg-f1-red/10 cursor-pointer"
												>
													Editar
												</button>
												<button
													onClick={() =>
														handleRemove(driverId)
													}
													className="text-xs px-3 py-1.5 border border-red-200 text-red-400 rounded hover:bg-red-50 cursor-pointer"
												>
													Remover
												</button>
											</div>
										)}
									</div>

									{isEditing && (
										<div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
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
															number: e.target
																.value,
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
														handleTeamChange(
															e.target.value,
														)
													}
													className="w-full p-2 border rounded h-9 text-sm cursor-pointer"
												>
													<option value="">
														— Sem equipe —
													</option>
													{(
														teamsData?.teams ?? []
													).map((t) => (
														<option
															key={t.id}
															value={t.name}
														>
															{t.name}
														</option>
													))}
												</select>
											</div>
											<div className="flex items-end gap-2">
												<button
													onClick={() =>
														handleSaveEdit(driverId)
													}
													className="flex-1 px-3 py-2 bg-f1-carbon text-white rounded text-xs cursor-pointer hover:bg-f1-carbon/80 h-9"
												>
													Salvar
												</button>
												<button
													onClick={() =>
														setEditingId(null)
													}
													className="flex-1 px-3 py-2 border rounded text-xs cursor-pointer hover:bg-gray-100 h-9"
												>
													Cancelar
												</button>
											</div>
										</div>
									)}
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</div>
	);
}
