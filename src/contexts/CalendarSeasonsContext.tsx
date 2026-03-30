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

export interface CalendarSeasonMapping {
	calendarId: string;
	seasonId: string;
}

interface CalendarSeasonsContextType {
	mappings: CalendarSeasonMapping[];
	loading: boolean;
	setCalendarSeason: (calendarId: string, seasonId: string) => Promise<void>;
	removeCalendarSeason: (calendarId: string) => Promise<void>;
	getSeasonForCalendar: (calendarId: string) => string | null;
}

const CalendarSeasonsContext = createContext<CalendarSeasonsContextType | undefined>(undefined);

const FIRESTORE_COLLECTION = `calendar-seasons/${tenant.id}/mappings`;

export function CalendarSeasonsProvider({ children }: { children: ReactNode }) {
	const [mappings, setMappings] = useState<CalendarSeasonMapping[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadMappings();
	}, []);

	const loadMappings = async () => {
		try {
			const snap = await getDocs(collection(db, FIRESTORE_COLLECTION));
			const mappingsData = snap.docs.map(doc => ({
				calendarId: doc.id,
				seasonId: doc.data().seasonId,
			} as CalendarSeasonMapping));
			setMappings(mappingsData);
		} catch (e) {
			console.error("Failed to load calendar-season mappings", e);
		} finally {
			setLoading(false);
		}
	};

	const setCalendarSeason = async (calendarId: string, seasonId: string) => {
		try {
			await setDoc(doc(db, FIRESTORE_COLLECTION, calendarId), {
				seasonId,
			});
			await loadMappings(); // Refresh the list
		} catch (e) {
			console.error("Failed to set calendar season", e);
			throw e;
		}
	};

	const removeCalendarSeason = async (calendarId: string) => {
		try {
			await deleteDoc(doc(db, FIRESTORE_COLLECTION, calendarId));
			await loadMappings(); // Refresh the list
		} catch (e) {
			console.error("Failed to remove calendar season", e);
			throw e;
		}
	};

	const getSeasonForCalendar = (calendarId: string): string | null => {
		const mapping = mappings.find(m => m.calendarId === calendarId);
		return mapping?.seasonId || null;
	};

	return (
		<CalendarSeasonsContext.Provider
			value={{
				mappings,
				loading,
				setCalendarSeason,
				removeCalendarSeason,
				getSeasonForCalendar,
			}}
		>
			{children}
		</CalendarSeasonsContext.Provider>
	);
}

export function useCalendarSeasons() {
	const context = useContext(CalendarSeasonsContext);
	if (!context) {
		throw new Error("useCalendarSeasons must be used within a CalendarSeasonsProvider");
	}
	return context;
}