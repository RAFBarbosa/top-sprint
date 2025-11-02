import { useMemo } from "react";
import { StandingsList } from "./StandingsList";
import useCsvLoader from "../../hooks/useCsvLoader";
import { GetTeamsQuery } from "../../../graphql/generated";
import useNormalizeString from "../../hooks/useNormalizeString";
import { useLocation } from "react-router-dom";
import { AdminStandings } from "../../admin/AdminStandings";

interface DataLoaderProps {
	data: GetTeamsQuery | undefined;
	activeTab: "gridA" | "gridB" | "gridC";
}

export function DataLoader(props: DataLoaderProps) {
	const location = useLocation();
	const isAdminPage = location.pathname.includes("/admin/");

	const { teams, drivers, oldTeams, oldDrivers } = useCsvLoader(
		props.activeTab
	);

	const title =
		props.activeTab === "gridA"
			? "Heat"
			: props.activeTab === "gridB"
			? "Carbon"
			: "Academy";

	// Memorize enhancedDrivers and enhancedTeams
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
						useNormalizeString(teamFromData.name) ===
						useNormalizeString(team.name)
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

			{/* <StandingsList
				title={title}
				drivers={enhancedDrivers}
				teams={enhancedTeams}
				oldDrivers={oldDrivers}
				oldTeams={oldTeams}
				valueKey="pts"
				valueLabel="PTS"
				activeTab={props.activeTab}
			/> */}
			{/* {props.activeTab === "gridA" && (
				<StandingsList
					title={title}
					data={enhancedDrivers}
					drivers={enhancedDrivers}
					teams={enhancedTeams}
					oldData={oldDrivers}
					valueKey="pts"
					valueLabel="PTS"
					activeTab={props.activeTab}
				/>
			)}
			{props.activeTab === "gridB" && (
				<StandingsList
					title={title}
					data={enhancedTeams}
					drivers={enhancedDrivers}
					teams={enhancedTeams}
					oldData={oldTeams}
					valueKey="pts"
					valueLabel="PTS"
					activeTab={props.activeTab}
				/>
			)} */}
		</div>
	);
}

export default DataLoader;
