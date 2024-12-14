import React, { useState, useEffect } from "react";
import { StandingsList } from "./StandingsList";
import useCsvLoader from "../../hooks/useCsvLoader";
import { GetTeamsQuery } from "../../../graphql/generated";

const normalizeString = (str: string | undefined | null) => {
	if (typeof str !== "string") return "";
	return str
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, "")
		.trim();
};

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
			// Enhance drivers data with team info
			const enhancedDriversData = drivers.map((driver) => {
				const driverFromData = props.data?.drivers.find(
					(driverFromData) =>
						normalizeString(driverFromData.name) ===
						normalizeString(driver.name)
				);
				return {
					...driver,
					photo: driverFromData?.photo?.url || "",
					number: driverFromData?.number || "",
					teamName: driverFromData?.team?.name || "",
					teamColor: driverFromData?.team?.color?.hex || "",
				};
			});

			// Enhance teams data with drivers assigned to each team
			const enhancedTeamsData = teams.map((team) => {
				const teamFromData = props.data?.teams.find(
					(teamFromData) =>
						normalizeString(teamFromData.name) ===
						normalizeString(team.name)
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
