import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../lib/adminClient";

export function useDriverGameIds(): Record<string, string> {
	const [gameIds, setGameIds] = useState<Record<string, string>>({});

	useEffect(() => {
		getDocs(collection(db, "drivers")).then((snap) => {
			const map: Record<string, string> = {};
			snap.forEach((d) => {
				const gameId = d.data().gameId;
				if (gameId) map[d.id] = gameId;
			});
			setGameIds(map);
		});
	}, []);

	return gameIds;
}
