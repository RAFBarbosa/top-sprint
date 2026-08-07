import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import {
	collection,
	getDocs,
	doc,
	setDoc,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../lib/adminClient";
export interface Season {
	id: string;
	name: string;
	active: boolean;
}

interface SeasonsContextType {
	seasons: Season[];
	loading: boolean;
	saveSeason: (season: Omit<Season, "id">) => Promise<void>;
	updateSeason: (id: string, season: Partial<Season>) => Promise<void>;
	deleteSeason: (id: string) => Promise<void>;
}

const SeasonsContext = createContext<SeasonsContextType | undefined>(undefined);

const FIRESTORE_COLLECTION = `seasons/${import.meta.env.VITE_TENANT as string}/seasons`;

function nameToId(name: string): string {
	return name
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

export function SeasonsProvider({ children }: { children: ReactNode }) {
	const [seasons, setSeasons] = useState<Season[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadSeasons();
	}, []);

	const loadSeasons = async () => {
		try {
			const snap = await getDocs(collection(db, FIRESTORE_COLLECTION));
			const seasonsData = snap.docs.map(
				(d) =>
					({
						id: d.id,
						name: d.data().name ?? d.id,
						active: d.data().active ?? false,
					}) as Season,
			);
			setSeasons(
				seasonsData.sort((a, b) => a.name.localeCompare(b.name)),
			);
		} catch (e) {
			// silent — seasons will be empty
		} finally {
			setLoading(false);
		}
	};

	const saveSeason = async (seasonData: Omit<Season, "id">) => {
		const id = nameToId(seasonData.name);
		try {
			await setDoc(doc(db, FIRESTORE_COLLECTION, id), {
				name: seasonData.name,
				active: seasonData.active,
				id,
			});
			await loadSeasons();
		} catch (e) {
			throw e;
		}
	};

	const updateSeason = async (id: string, updates: Partial<Season>) => {
		try {
			await setDoc(doc(db, FIRESTORE_COLLECTION, id), updates, {
				merge: true,
			});
			await loadSeasons();
		} catch (e) {
			throw e;
		}
	};

	const deleteSeason = async (id: string) => {
		try {
			await deleteDoc(doc(db, FIRESTORE_COLLECTION, id));
			await loadSeasons();
		} catch (e) {
			throw e;
		}
	};

	return (
		<SeasonsContext.Provider
			value={{ seasons, loading, saveSeason, updateSeason, deleteSeason }}
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
