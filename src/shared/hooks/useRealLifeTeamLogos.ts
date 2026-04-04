import { useEffect, useState, useMemo } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { useGetTeamsQuery } from "../../graphql/generated";
import { useDriverProfiles } from "../../contexts/DriverProfilesContext";
import type { GridId } from "../config/grids";

interface DriverFirebaseData {
	realLifeTeamId?: string;
	nationality?: string;
	birthDate?: string;
	sex?: string;
	[key: string]: any;
}

export function useRealLifeTeamLogos(gridId: GridId) {
	const [allDriversData, setAllDriversData] = useState<
		Record<string, DriverFirebaseData>
	>({});
	const [loading, setLoading] = useState(true);

	const { data: teamsData } = useGetTeamsQuery();
	const { isInGrid } = useDriverProfiles();

	// Fetch all drivers data from Firebase once
	useEffect(() => {
		const load = async () => {
			try {
				const snap = await getDocs(collection(db, "drivers"));
				const map: Record<string, DriverFirebaseData> = {};
				snap.forEach((d) => {
					map[d.id] = d.data() as DriverFirebaseData;
				});
				setAllDriversData(map);
			} catch (e) {
				console.error("Failed to load driver data from Firebase", e);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	// Build maps for logos and nationalities only for drivers in the current grid
	const { logos, nationalities } = useMemo(() => {
		const logoMap: Record<string, string> = {};
		const nationalityMap: Record<string, string> = {};

		if (teamsData?.teams) {
			Object.entries(allDriversData).forEach(([driverId, driverData]) => {
				// Only process drivers in the current grid
				if (!isInGrid(driverId, gridId)) return;

				// Get real life team logo
				const realLifeTeamId = driverData.realLifeTeamId;
				if (realLifeTeamId) {
					const team = teamsData.teams.find(
						(t) => t.id === realLifeTeamId
					);
					if (team?.photo?.url) {
						logoMap[driverId] = team.photo.url;
					}
				}

				// Get nationality
				if (driverData.nationality) {
					nationalityMap[driverId] = driverData.nationality;
				}
			});
		}

		return { logos: logoMap, nationalities: nationalityMap };
	}, [allDriversData, teamsData, gridId, isInGrid]);

	return {
		logos,
		nationalities,
		loading,
	};
}
