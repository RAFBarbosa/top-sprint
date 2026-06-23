import { useEffect, useState, useMemo } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { useFirebaseTeams } from "./useFirebaseTeams";
import { useDriverProfiles } from "../../contexts/DriverProfilesContext";
import type { GridId } from "../config/grids";
import { NATIONALITY_OPTIONS } from "../constants/nationalities";

interface DriverFirebaseData {
	realLifeTeamId?: string;
	nationality?: string;
	nationalityCode?: string;
	birthDate?: string;
	sex?: string;
	[key: string]: any;
}

export function useRealLifeTeamLogos(gridId: GridId) {
	const [allDriversData, setAllDriversData] = useState<
		Record<string, DriverFirebaseData>
	>({});
	const [loading, setLoading] = useState(true);

	const { teams: teamsData } = useFirebaseTeams();
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
				// silent — logos will be empty
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	// Build maps for logos and nationalities only for drivers in the current grid
	const { logos, nationalities, nationalityCodes } = useMemo(() => {
		const logoMap: Record<string, string> = {};
		const nationalityMap: Record<string, string> = {};
		const nationalityCodeMap: Record<string, string> = {};

		if (teamsData?.length) {
			Object.entries(allDriversData).forEach(([driverId, driverData]) => {
				// Only process drivers in the current grid
				if (!isInGrid(driverId, gridId)) return;

				// Get real life team logo
				const realLifeTeamId = driverData.realLifeTeamId;
				if (realLifeTeamId) {
					const team = teamsData.find(
						(t) => t.id === realLifeTeamId
					);
					if (team?.photo?.url) {
						logoMap[driverId] = team.photo.url;
					}
				}

				// Get nationality string
				if (driverData.nationality) {
					nationalityMap[driverId] = driverData.nationality;
				}

				// Get nationality ISO code — use stored code if available, otherwise derive from label
				if (driverData.nationalityCode) {
					nationalityCodeMap[driverId] = driverData.nationalityCode;
				} else if (driverData.nationality) {
					const option = NATIONALITY_OPTIONS.find(
						(o) => o.label === driverData.nationality,
					);
					if (option) nationalityCodeMap[driverId] = option.code;
				}
			});
		}

		return { logos: logoMap, nationalities: nationalityMap, nationalityCodes: nationalityCodeMap };
	}, [allDriversData, teamsData, gridId, isInGrid]);

	return {
		logos,
		nationalities,
		nationalityCodes,
		loading,
	};
}
