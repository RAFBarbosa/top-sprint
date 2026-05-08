import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../lib/adminClient";

export interface FirestoreCalendar {
	id: string;
	trackId: string;
	round: string;
	sprint: boolean;
	link: string | null;
	grid: string;
	deleted: boolean;
	active: boolean;
	date: string;
}

interface CalendarsContextType {
	calendars: FirestoreCalendar[];
	allCalendars: FirestoreCalendar[];
	loading: boolean;
	refetch: () => void;
}

const CalendarsContext = createContext<CalendarsContextType>({
	calendars: [],
	allCalendars: [],
	loading: true,
	refetch: () => {},
});

export function CalendarsProvider({ children }: { children: ReactNode }) {
	const [allCalendars, setAllCalendars] = useState<FirestoreCalendar[]>([]);
	const [loading, setLoading] = useState(true);

	const load = useCallback(async () => {
		setLoading(true);
		try {
			const snap = await getDocs(
				query(
					collection(db, "calendars"),
					where("deleted", "==", false),
				),
			);
			const items: FirestoreCalendar[] = snap.docs
				.map((d) => ({ id: d.id, ...(d.data() as Omit<FirestoreCalendar, "id">) }))
				.sort((a, b) => a.date.localeCompare(b.date));
			setAllCalendars(items);
		} catch (e) {
			console.error("Failed to load calendars", e);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	const calendars = allCalendars.filter((c) => c.active);

	return (
		<CalendarsContext.Provider value={{ calendars, allCalendars, loading, refetch: load }}>
			{children}
		</CalendarsContext.Provider>
	);
}

export const useCalendars = () => useContext(CalendarsContext);
