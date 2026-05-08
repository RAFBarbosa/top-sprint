import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../lib/adminClient";

export interface FirestoreTrack {
	id: string;
	name: string;
	location: string;
	countryCode: string;
	mapUrl: string | null;
	deleted: boolean;
}

interface TracksContextType {
	tracks: Record<string, FirestoreTrack>;
	tracksByLocation: Record<string, FirestoreTrack>;
	getTrack: (id?: string | null, location?: string | null) => FirestoreTrack | undefined;
	loading: boolean;
}

const TracksContext = createContext<TracksContextType>({
	tracks: {},
	tracksByLocation: {},
	getTrack: () => undefined,
	loading: true,
});

export function TracksProvider({ children }: { children: ReactNode }) {
	const [tracks, setTracks] = useState<Record<string, FirestoreTrack>>({});
	const [tracksByLocation, setTracksByLocation] = useState<Record<string, FirestoreTrack>>({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getDocs(collection(db, "tracks"))
			.then((snap) => {
				const byId: Record<string, FirestoreTrack> = {};
				const byLoc: Record<string, FirestoreTrack> = {};
				snap.forEach((d) => {
					const t = { id: d.id, ...d.data() } as FirestoreTrack;
					byId[d.id] = t;
					if (t.location) byLoc[t.location.toLowerCase()] = t;
				});
				setTracks(byId);
				setTracksByLocation(byLoc);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	const getTrack = (id?: string | null, location?: string | null) =>
		(id ? tracks[id] : undefined) ??
		(location ? tracksByLocation[location.toLowerCase()] : undefined);

	return (
		<TracksContext.Provider value={{ tracks, tracksByLocation, getTrack, loading }}>
			{children}
		</TracksContext.Provider>
	);
}

export const useTracks = () => useContext(TracksContext);
