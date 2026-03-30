import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/adminClient";
import { tenant } from "../shared/config/tenants";

export interface Season {
	id: string;
	name: string;
	year: number;
	slug: string;
	startDate: string; // ISO date string
	endDate: string; // ISO date string
	active: boolean;
}

interface SeasonsContextType {
	seasons: Season[];
	loading: boolean;
	saveSeason: (season: Omit<Season, 'id'>) => Promise<void>;
	updateSeason: (id: string, season: Partial<Season>) => Promise<void>;
	deleteSeason: (id: string) => Promise<void>;
	getSeasonByDate: (date: Date) => Season | null;
}

const SeasonsContext = createContext<SeasonsContextType | undefined>(undefined);

const FIRESTORE_COLLECTION = `seasons/${tenant.id}/seasons`;

export function SeasonsProvider({ children }: { children: ReactNode }) {
	const [seasons, setSeasons] = useState<Season[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadSeasons();
	}, []);

	const loadSeasons = async () => {
		try {
			const snap = await getDocs(collection(db, FIRESTORE_COLLECTION));
			const seasonsData = snap.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			} as Season));
			setSeasons(seasonsData.sort((a, b) => b.year - a.year));
		} catch (e) {
			console.error("Failed to load seasons", e);
		} finally {
			setLoading(false);
		}
	};

	const saveSeason = async (seasonData: Omit<Season, 'id'>) => {
		const id = seasonData.slug;
		try {
			await setDoc(doc(db, FIRESTORE_COLLECTION, id), {
				...seasonData,
				id,
			});
			await loadSeasons(); // Refresh the list
		} catch (e) {
			console.error("Failed to save season", e);
			throw e;
		}
	};

	const updateSeason = async (id: string, updates: Partial<Season>) => {
		try {
			const seasonRef = doc(db, FIRESTORE_COLLECTION, id);
			await setDoc(seasonRef, updates, { merge: true });
			await loadSeasons(); // Refresh the list
		} catch (e) {
			console.error("Failed to update season", e);
			throw e;
		}
	};

	const deleteSeason = async (id: string) => {
		try {
			await deleteDoc(doc(db, FIRESTORE_COLLECTION, id));
			await loadSeasons(); // Refresh the list
		} catch (e) {
			console.error("Failed to delete season", e);
			throw e;
		}
	};

	const getSeasonByDate = (date: Date): Season | null => {
		return seasons.find(season => {
			const start = new Date(season.startDate);
			const end = new Date(season.endDate);
			return date >= start && date <= end && season.active;
		}) || null;
	};

	return (
		<SeasonsContext.Provider
			value={{
				seasons,
				loading,
				saveSeason,
				updateSeason,
				deleteSeason,
				getSeasonByDate,
			}}
		>
			{children}
		</SeasonsContext.Provider>
	);
}

export function useSeasons() {
	const context = useContext(SeasonsContext);
	if (!context) {
		throw new Error("useSeasons must be used within a SeasonsProvider");
	}
	return context;
}