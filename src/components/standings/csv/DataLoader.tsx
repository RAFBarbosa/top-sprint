import { useMemo } from "react";
import { StandingsList } from "./StandingsList";
import useCsvLoader from "../../hooks/useCsvLoader";
import { GetTeamsQuery } from "../../../graphql/generated";
import useNormalizeString from "../../hooks/useNormalizeString";

interface DataLoaderProps {
	data: GetTeamsQuery | undefined;
	activeTab: "drivers" | "teams";
}

export function DataLoader(props: DataLoaderProps) {
	const { teams, drivers, oldTeams, oldDrivers } = useCsvLoader();

	// Memoize enhancedDrivers and enhancedTeams
	const enhancedDrivers = useMemo(() => {
		if (props.data && drivers && teams) {
			return drivers.map((driver) => {
				const driverFromData = props.data?.drivers.find(
					(driverFromData) =>
						useNormalizeString(driverFromData.name) ===
						useNormalizeString(driver.name)
				);
				return {
					...driver,
					grid: driverFromData?.grid || "",
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
						useNormalizeString(teamFromData.name) ===
						useNormalizeString(team.name)
				);

				const teamDrivers = enhancedDrivers
					.filter((driver) => driver.teamName === team.name)
					.map((driver) => driver.name);

				return {
					...team,
					photo: teamFromData?.photo?.url || "",
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
			{props.activeTab === "drivers" && (
				<StandingsList
					title="Pilotos"
					data={enhancedDrivers}
					oldData={oldDrivers}
					valueKey="pts"
					valueLabel="PTS"
					activeTab={props.activeTab}
				/>
			)}
			{props.activeTab === "teams" && (
				<StandingsList
					title="Equipes"
					data={enhancedTeams}
					oldData={oldTeams}
					valueKey="pts"
					valueLabel="PTS"
					activeTab={props.activeTab}
				/>
			)}
		</div>
	);
}

export default DataLoader;
