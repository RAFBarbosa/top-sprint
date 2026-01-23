import { useMemo } from "react";
import { StandingsList } from "./StandingsList";
import useCsvLoader from "../../hooks/useCsvLoader";
import { GetTeamsQuery } from "../../../graphql/generated";
import useNormalizeString from "../../hooks/useNormalizeString";
import { useLocation } from "react-router-dom";
import { AdminStandings } from "../../admin/AdminStandings";
import { GridId } from "../../config/grids";
import { getGridConfig } from "../../config/grids";

interface DataLoaderProps {
	data: GetTeamsQuery | undefined;
	activeTab: GridId;
}

export function DataLoader(props: DataLoaderProps) {
	const location = useLocation();
	const isAdminPage = location.pathname.includes("/admin/");

	// ✅ FIXED: Pass gridId as an object property
	const { teams, drivers, oldTeams, oldDrivers } = useCsvLoader({
		gridId: props.activeTab,
	});

	const gridConfig = getGridConfig(props.activeTab);

	const title = gridConfig?.standingsTitle ?? "";

	const normalizeString = (str: string) => str.toLowerCase().trim();

	// Memorize enhancedDrivers and enhancedTeams
	const enhancedDrivers = useMemo(() => {
		if (props.data && drivers && teams) {
			return drivers.map((driver) => {
				const driverFromData = props.data?.drivers.find(
					(driverFromData) =>
						normalizeString(driverFromData.name) ===
						normalizeString(driver.name),
				);
				return {
					...driver,
					grid: driverFromData?.grid || "",
					class: driverFromData?.class || "",
					photo: driverFromData?.photo?.url || "",
					number: driverFromData?.number || "",
					teamName: driverFromData?.team?.name || "",
					teamLogo: driverFromData?.team?.photo?.url || "",
					teamColor: driverFromData?.team?.color?.hex || "",
				};
			});
		}
		return [];
	}, [props.data, drivers, teams]);

	const enhancedTeams = useMemo(() => {
		if (props.data && teams) {
			return teams.map((team) => {
				const teamFromData = props.data?.teams.find(
					(teamFromData) =>
						normalizeString(teamFromData.name) ===
						normalizeString(team.name),
				);

				const teamDrivers = enhancedDrivers
					.filter((driver) => driver.teamName === team.name)
					.map((driver) => driver.name);

				return {
					...team,
					photo: teamFromData?.photo?.url || "",
					class: teamFromData?.class || "",
					teamLogo: teamFromData?.photo?.url || "",
					teamColor: teamFromData?.color?.hex || "",
					drivers: teamDrivers || "",
				};
			});
		}
		return [];
	}, [props.data, teams, enhancedDrivers]);

	return (
		<div className="w-full mx-auto">
			{isAdminPage ? (
				<AdminStandings
					title={title}
					data={enhancedDrivers}
					drivers={enhancedDrivers}
					teams={enhancedTeams}
					oldTeams={oldTeams}
					oldData={oldDrivers}
					valueKey="pts"
					valueLabel="PTS"
					activeTab={props.activeTab}
				/>
			) : (
				<StandingsList
					title={title}
					data={enhancedDrivers}
					drivers={enhancedDrivers}
					teams={enhancedTeams}
					oldTeams={oldTeams}
					oldData={oldDrivers}
					valueKey="pts"
					valueLabel="PTS"
					activeTab={props.activeTab}
				/>
			)}
		</div>
	);
}

export default DataLoader;
