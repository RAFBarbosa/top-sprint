import { useState, useEffect } from "react";
import { getDocs, setDoc, doc, collection } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { useFirebaseTeams } from "../../shared/hooks/useFirebaseTeams";
import { tenant } from "../../shared/config/tenants";
import { getGridConfig } from "../../shared/config/grids";
import { useToast } from "../../contexts/ToastContext";
import { useDriverGameIds } from "../../shared/hooks/useDriverGameIds";
import { useFirebaseDrivers } from "../../shared/hooks/useFirebaseDrivers";

interface GridProfile {
	number: string;
	teamName: string;
	teamColor: string;
	teamLogoUrl: string;
}

type DriverProfiles = Record<string, GridProfile>;

export function DriverGridProfilesAdmin() {
	const { drivers: driversData } = useFirebaseDrivers();
	const { teams: teamsData } = useFirebaseTeams();

	const [allProfiles, setAllProfiles] = useState<
		Record<string, DriverProfiles>
	>({});
	const [selectedDriver, setSelectedDriver] = useState<any>(null);
	const [editProfiles, setEditProfiles] = useState<DriverProfiles>({});
	const [saving, setSaving] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const { showToast } = useToast();
	const gameIdMap = useDriverGameIds();

	const grids = tenant.grids as any[];

	useEffect(() => {
		const load = async () => {
			try {
				const snap = await getDocs(collection(db, "driver_profiles"));
				const map: Record<string, DriverProfiles> = {};
				snap.forEach((d) => {
					map[d.id] = d.data() as DriverProfiles;
				});
				setAllProfiles(map);
			} catch (e) {
				console.error("Failed to load driver profiles", e);
			}
		};
		load();
	}, []);

	const handleSelectDriver = (driver: any) => {
		setSelectedDriver(driver);
		const existing = allProfiles[driver.id] ?? {};
		const profiles: DriverProfiles = {};
		grids.forEach((g) => {
			profiles[g.id] = existing[g.id] ?? {
				number: "",
				teamName: "",
				teamColor: "",
				teamLogoUrl: "",
			};
		});
		setEditProfiles(profiles);
	};

	const handleSave = async () => {
		if (!selectedDriver) return;
		setSaving(true);
		try {
			await setDoc(
				doc(db, "driver_profiles", selectedDriver.id),
				editProfiles,
			);
			setAllProfiles((prev) => ({
				...prev,
				[selectedDriver.id]: editProfiles,
			}));
			showToast("success", "Salvo com sucesso!");
		} catch (e: any) {
			showToast("error", "Erro: " + e.message);
		} finally {
			setSaving(false);
		}
	};

	const setProfileField = (
		gridId: string,
		field: keyof GridProfile,
		value: string,
	) => {
		setEditProfiles((prev) => ({
			...prev,
			[gridId]: { ...prev[gridId], [field]: value },
		}));
	};

	const handleTeamChange = (gridId: string, teamName: string) => {
		const team = teamsData?.find((t) => t.name === teamName);
		setEditProfiles((prev) => ({
			...prev,
			[gridId]: {
				...prev[gridId],
				teamName: team?.name ?? "",
				teamColor: team?.color?.hex ?? "",
				teamLogoUrl: team?.photo?.url ?? "",
			},
		}));
	};

	const filteredDrivers = driversData
		.filter(
			(d) =>
				!d.deleted &&
				(searchTerm === "" ||
					d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					gameIdMap[d.id]?.toLowerCase().includes(searchTerm.toLowerCase())),
		)
		.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));

	return (
		<div className="flex flex-col md:flex-row w-full gap-4">
			{/* Driver list */}
			<div className="w-full md:w-72 shrink-0">
				<input
					type="text"
					placeholder="Buscar piloto..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full p-2 border rounded h-11 mb-3"
				/>
				<ul className="space-y-1 max-h-[calc(100vh-280px)] overflow-y-auto pr-1 custom-scrollbar">
					{filteredDrivers.map((driver) => {
						const profileGrids = allProfiles[driver.id]
							? Object.keys(allProfiles[driver.id])
									.filter(
										(g) =>
											allProfiles[driver.id][g]
												?.teamName ||
											allProfiles[driver.id][g]?.number,
									)
									.map(
										(g) =>
											getGridConfig(g)?.label ?? g,
									)
									.join(", ")
							: null;
						return (
							<li key={driver.id}>
								<button
									onClick={() => handleSelectDriver(driver)}
									className={`w-full text-left p-2 rounded hover:bg-f1-red/20 text-sm ${
										selectedDriver?.id === driver.id
											? "bg-f1-red/20 font-bold"
											: ""
									}`}
								>
									<span className="block">{driver.name}</span>
									{profileGrids && (
										<span className="text-xs text-f1-lighterCarbon">
											{profileGrids}
										</span>
									)}
								</button>
							</li>
						);
					})}
				</ul>
			</div>

			{/* Profile editor */}
			<div className="flex-1 min-w-0">
				{!selectedDriver ? (
					<p className="text-f1-lighterCarbon text-sm mt-2">
						Selecione um piloto para editar seus perfis de grid.
					</p>
				) : (
					<div>
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-bold">
								{selectedDriver.name}
							</h2>
							<button
								onClick={handleSave}
								disabled={saving}
								className="bg-f1-carbon text-white px-4 py-2 rounded border border-f1-carbon hover:bg-transparent hover:text-f1-carbon cursor-pointer duration-120 disabled:opacity-50"
							>
								{saving ? "Salvando..." : "Salvar"}
							</button>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{grids.map((grid) => {
								const profile = editProfiles[grid.id] ?? {
									number: "",
									teamName: "",
									teamColor: "",
									teamLogoUrl: "",
								};
								return (
									<div
										key={grid.id}
										className="border rounded-lg p-4"
									>
										<div
											className="text-sm font-bold uppercase tracking-wide mb-3 pb-2 border-b"
											style={{
												color: grid.primaryColor,
											}}
										>
											{grid.label}
										</div>
										<div className="space-y-3">
											<div>
												<label className="text-xs font-bold text-f1-lighterCarbon uppercase tracking-wide block mb-1">
													Número
												</label>
												<input
													type="text"
													value={profile.number}
													onChange={(e) =>
														setProfileField(
															grid.id,
															"number",
															e.target.value,
														)
													}
													className="w-full p-2 border rounded h-10 text-sm"
													placeholder="Ex: 5"
												/>
											</div>
											<div>
												<label className="text-xs font-bold text-f1-lighterCarbon uppercase tracking-wide block mb-1">
													Equipe
												</label>
												<select
													value={profile.teamName}
													onChange={(e) =>
														handleTeamChange(
															grid.id,
															e.target.value,
														)
													}
													className="w-full p-2 border rounded h-10 text-sm cursor-pointer"
												>
													<option value="">
														— Sem equipe —
													</option>
													{(
														teamsData ?? []
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
											{profile.teamColor && (
												<div className="flex items-center gap-2">
													<div
														className="w-3 h-3 rounded-full border border-black/20 shrink-0"
														style={{
															backgroundColor:
																profile.teamColor,
														}}
													/>
													<span className="text-xs text-f1-lighterCarbon">
														{profile.teamName}
													</span>
												</div>
											)}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
