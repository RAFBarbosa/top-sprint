import { useState, useEffect } from "react";
import { StandingsList } from "./StandingsList";
import useCsvLoader from "../../hooks/useCsvLoader";
import { GetTeamsQuery } from "../../../graphql/generated";
import useNormalizeString from "../../hooks/useNormalizeString";

interface DataLoaderProps {
	data: GetTeamsQuery | undefined;
	activeTab: "drivers" | "teams";
}

export function DataLoader(props: DataLoaderProps) {
	const { teams, drivers } = useCsvLoader();
	const [enhancedDrivers, setEnhancedDrivers] = useState<any[]>([]);
	const [enhancedTeams, setEnhancedTeams] = useState<any[]>([]);

	useEffect(() => {
		if (props.data && drivers && teams) {
			const enhancedDriversData = drivers.map((driver) => {
				const driverFromData = props.data?.drivers.find(
					(driverFromData) =>
						useNormalizeString(driverFromData.name) ===
						useNormalizeString(driver.name)
				);
				return {
					...driver,
					photo: driverFromData?.photo?.url || "",
					number: driverFromData?.number || "",
					teamName: driverFromData?.team?.name || "",
					teamColor: driverFromData?.team?.color?.hex || "",
				};
			});

			const enhancedTeamsData = teams.map((team) => {
				const teamFromData = props.data?.teams.find(
					(teamFromData) =>
						useNormalizeString(teamFromData.name) ===
						useNormalizeString(team.name)
				);

				// Get the driver names assigned to the team
				const teamDrivers = enhancedDriversData
					.filter((driver) => driver.teamName === team.name)
					.map((driver) => driver.name);

				return {
					...team,
					photo: teamFromData?.photo?.url || "",
					teamColor: teamFromData?.color?.hex || "",
					drivers: teamDrivers || "",
				};
			});

			setEnhancedDrivers(enhancedDriversData);
			setEnhancedTeams(enhancedTeamsData);
		}
	}, [props.data, drivers, teams]);

	return (
		<div className="max-w-[950px] w-full mx-auto">
			{props.activeTab === "drivers" && (
				<StandingsList
					title="Pilotos"
					data={enhancedDrivers}
					valueKey="pts"
					valueLabel="PTS"
					activeTab={props.activeTab}
				/>
			)}
			{props.activeTab === "teams" && (
				<StandingsList
					title="Equipes"
					data={enhancedTeams}
					valueKey="pts"
					valueLabel="PTS"
					activeTab={props.activeTab}
				/>
			)}
		</div>
	);
}

export default DataLoader;
