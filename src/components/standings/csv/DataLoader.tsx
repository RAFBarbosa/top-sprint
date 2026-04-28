import { useMemo } from "react";
import { StandingsList } from "./StandingsList";
import { useLocation } from "react-router-dom";
import { AdminStandings } from "../../admin/AdminStandings";
import { GridId, getGridConfig } from "../../../shared/config/grids";

interface DataLoaderProps {
	activeTab: GridId;
	standings: any[];
	previousStandings: any[];
}

export function DataLoader(props: DataLoaderProps) {
	const location = useLocation();
	const isAdminPage = location.pathname.includes("/admin/");

	const gridConfig = getGridConfig(props.activeTab);
	const title = gridConfig?.standingsTitle ?? "";

	const { standings, previousStandings } = props;

	const buildTeamStandings = (driverRows: typeof standings) => {
		const map: Record<
			string,
			{
				name: string;
				pts: number;
				teamColor: string;
				teamLogo: string;
				drivers: { name: string; photo?: string }[];
			}
		> = {};
		driverRows.forEach((driver) => {
			const key = driver.teamName;
			if (!key) return;
			if (!map[key]) map[key] = { name: key, pts: 0, teamColor: driver.teamColor, teamLogo: driver.teamLogo, drivers: [] };
			// All drivers (titular, reserve, ex) contribute points
			map[key].pts += driver.pts;
			// Only titular drivers show in the team card list
			if (!driver.reserve && !driver.exDriver) {
				map[key].drivers.push({ name: driver.name, photo: driver.photo });
			}
		});
		return Object.values(map).sort((a, b) => b.pts - a.pts);
	};

	// Build team standings: reserve drivers contribute points but are excluded from the drivers list
	const teamStandings = useMemo(() => buildTeamStandings(standings), [standings]);
	const previousTeamStandings = useMemo(() => buildTeamStandings(previousStandings), [previousStandings]);

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
