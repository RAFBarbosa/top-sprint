import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../lib/adminClient";

export interface GridProfile {
	number?: string;
	teamName?: string;
	teamColor?: string;
	teamLogoUrl?: string;
	photoUrl?: string;
	reserve?: boolean;
	exDriver?: boolean;
}

// driverId → gridId → GridProfile
type AllProfiles = Record<string, Record<string, GridProfile>>;

interface DriverProfilesContextType {
	profiles: AllProfiles;
	getProfile: (driverId: string, gridId: string) => GridProfile | null;
	// Returns true if the driver has a profile for this grid
	isInGrid: (driverId: string, gridId: string) => boolean;
	// Apply profile overrides on top of a Hygraph driver object
	applyProfile: (driver: any, gridId: string) => any;
}

const DriverProfilesContext = createContext<
	DriverProfilesContextType | undefined
>(undefined);

export function DriverProfilesProvider({ children }: { children: ReactNode }) {
	const [profiles, setProfiles] = useState<AllProfiles>({});

	useEffect(() => {
		const load = async () => {
			try {
				const snap = await getDocs(collection(db, "driver_profiles"));
				const map: AllProfiles = {};
				snap.forEach((d) => {
					map[d.id] = d.data() as Record<string, GridProfile>;
				});
				setProfiles(map);
			} catch (e) {
				// silent — driver profiles will be empty
			}
		};
		load();
	}, []);

	const getProfile = (driverId: string, gridId: string) =>
		profiles[driverId]?.[gridId] ?? null;

	const isInGrid = (driverId: string, gridId: string) =>
		!!profiles[driverId]?.[gridId];

	const applyProfile = (driver: any, gridId: string): any => {
		const profile = profiles[driver?.id]?.[gridId];
		if (!profile) return driver;

		// photo can be a string (CSV-enhanced cards) or an object { url } (Hygraph GraphQL)
		const existingPhotoUrl =
			typeof driver.photo === "string"
				? driver.photo
				: driver.photo?.url ?? "";
		const photoUrl = profile.photoUrl || existingPhotoUrl;

		return {
			...driver,
			number: profile.number ?? driver.number,
			// Preserve whichever shape the caller uses
			photo:
				typeof driver.photo === "string"
					? photoUrl
					: { ...(driver.photo ?? {}), url: photoUrl },
			team: {
				...driver.team,
				name: profile.teamName ?? driver.team?.name,
				color: profile.teamColor
					? { hex: profile.teamColor }
					: driver.team?.color,
				photo: profile.teamLogoUrl
					? { url: profile.teamLogoUrl }
					: driver.team?.photo,
			},
			teamColor: profile.teamColor ?? driver.teamColor,
			teamName: profile.teamName ?? driver.teamName,
			teamLogo: profile.teamLogoUrl ?? driver.teamLogo,
			reserve: profile.reserve ?? false,
			exDriver: profile.exDriver ?? false,
		};
	};

	return (
		<DriverProfilesContext.Provider
			value={{ profiles, getProfile, isInGrid, applyProfile }}
		>
			{children}
		</DriverProfilesContext.Provider>
	);
}

export function useDriverProfiles() {
	const ctx = useContext(DriverProfilesContext);
	if (!ctx)
		throw new Error(
			"useDriverProfiles must be used within DriverProfilesProvider",
		);
	return ctx;
}
