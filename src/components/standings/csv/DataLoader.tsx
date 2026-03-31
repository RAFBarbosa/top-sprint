import { useMemo } from "react";
import { StandingsList } from "./StandingsList";
import { useLocation } from "react-router-dom";
import { AdminStandings } from "../../admin/AdminStandings";
import { GridId, getGridConfig } from "../../../shared/config/grids";
import { useFirebaseStandings } from "../../../shared/hooks/useFirebaseStandings";

interface DataLoaderProps {
	activeTab: GridId;
	data?: any; // kept for call-site compatibility, no longer used
}

export function DataLoader(props: DataLoaderProps) {
	const location = useLocation();
	const isAdminPage = location.pathname.includes("/admin/");

	const gridConfig = getGridConfig(props.activeTab);
	const title = gridConfig?.standingsTitle ?? "";

	const { standings, previousStandings, loading } = useFirebaseStandings(props.activeTab);

	const buildTeamStandings = (driverRows: typeof standings) => {
		const map: Record<string, { name: string; pts: number; teamColor: string; teamLogo: string; drivers: string[] }> = {};
		driverRows.forEach((driver) => {
			const key = driver.teamName;
			if (!key) return;
			if (!map[key]) map[key] = { name: key, pts: 0, teamColor: driver.teamColor, teamLogo: driver.teamLogo, drivers: [] };
			if (driver.reserve) return;
			map[key].pts += driver.pts;
			map[key].drivers.push(driver.name);
		});
		return Object.values(map).sort((a, b) => b.pts - a.pts);
	};

	// Build team standings: reserve drivers contribute points but are excluded from the drivers list
	const teamStandings = useMemo(() => buildTeamStandings(standings), [standings]);
	const previousTeamStandings = useMemo(() => buildTeamStandings(previousStandings), [previousStandings]);

	if (loading) return null;

	return (
		<div className="w-full mx-auto">
			{isAdminPage ? (
				<AdminStandings
					title={title}
					data={standings}
					drivers={standings}
					teams={teamStandings}
					oldTeams={previousTeamStandings}
					oldData={previousStandings}
					valueKey="pts"
					valueLabel="PTS"
					activeTab={props.activeTab}
				/>
			) : (
				<StandingsList
					title={title}
					data={standings}
					drivers={standings}
					teams={teamStandings}
					oldTeams={previousTeamStandings}
					oldData={previousStandings}
					valueKey="pts"
					valueLabel="PTS"
					activeTab={props.activeTab}
				/>
			)}
		</div>
	);
}

export default DataLoader;
