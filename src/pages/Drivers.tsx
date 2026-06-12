import { useMemo } from "react";
import DriverList from "../components/drivers/DriverList";
import { Divider } from "../components/layout/Divider";
import { useTab } from "../contexts/TabContext";
import { tenant } from "../shared/config/tenants";
import { useTenantConfig } from "../contexts/TenantConfigContext";
import { useDriverProfiles } from "../contexts/DriverProfilesContext";
import { useFirebaseDrivers } from "../shared/hooks/useFirebaseDrivers";
import { useActiveSeason } from "../shared/hooks/useActiveSeason";
import { getGridConfig } from "../shared/config/grids";

const Drivers: React.FC = () => {
	const { activeTab } = useTab();
	const { isInGrid, applyProfile } = useDriverProfiles();
	const { name: tenantName } = useTenantConfig();
	const { drivers } = useFirebaseDrivers();
	const activeSeason = useActiveSeason(activeTab.id);

	const teamLogoByName = useMemo(() => {
		const map: Record<string, string> = {};
		drivers.forEach((d) => {
			if (d.teamName && d.teamLogoUrl) {
				map[d.teamName] = d.teamLogoUrl;
			}
		});
		return map;
	}, [drivers]);

	const activeDrivers = drivers
		.filter((driver) => isInGrid(driver.id, activeTab.id))
		.map((driver) => {
			const applied = applyProfile(driver, activeTab.id);
			const resolvedTeamName =
				applied.team?.name ?? applied.teamName ?? "";
			return {
				...applied,
				photo: applied.photo?.url ?? applied.photo ?? "",
				teamColor: applied.team?.color?.hex ?? applied.teamColor ?? "",
				teamName: resolvedTeamName,
				teamLogo: teamLogoByName[resolvedTeamName] ?? "",
				num: applied.number ?? "",
			};
		})
		.filter((driver) => !driver.reserve && !driver.exDriver)
		.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

	return (
		<div
			id="pilotos"
			className="tenant-section tenant-section-drivers bg-f1-lightSilver w-full pb-8"
		>
			<Divider className="max-w-screen-xl mx-auto" />
			<div className="tenant-drivers-inner max-w-screen-xl mx-auto bg-white rounded-t p-6 pb-0 px-3">
				<div
					className="border-t-8 border-r-8 rounded-tr-3xl pt-3 relative mb-8"
					style={{
						borderColor:
							tenant.grids.length > 1
								? (getGridConfig(activeTab.id)?.primaryColor ?? "var(--color-brand-primary)")
								: "var(--color-brand-primary)",
					}}
				>
					<h1 className="font-f1Title uppercase tracking-widest text-4xl">
						Pilotos
					</h1>
				</div>
				<div
						className="tenant-drivers-desc p-3 w-full h-auto rounded-xl tracking-normal"
						style={{ backgroundColor: "color-mix(in srgb, var(--color-drivers-card-bg) 90%, gray 10%)" }}
					>
					Confira o line-up oficial da temporada. Cards e detalhes
					completos de todos os pilotos {tenantName}, com pontuação e
					resultados atualizados.
				</div>
			</div>
			<div className="tenant-drivers-inner max-w-screen-xl mx-auto bg-white rounded-b p-6 space-y-6">
				{activeSeason ? (
					<DriverList
						gridName={activeTab.label}
						drivers={activeDrivers}
					/>
				) : (
					<p className="text-f1-lighterCarbon text-sm py-6 text-center">
						Nenhuma temporada ativa no momento.
					</p>
				)}
			</div>
		</div>
	);
};

export default Drivers;
