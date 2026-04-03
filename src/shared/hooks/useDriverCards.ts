import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import type { DriverCardStats } from "../utils/calculateDriverCards";

export function useDriverCards(gridId: string): Record<string, DriverCardStats> {
	const [cards, setCards] = useState<Record<string, DriverCardStats>>({});

	useEffect(() => {
		if (!gridId) return;
		const unsub = onSnapshot(doc(db, "driver_cards", gridId), (snap) => {
			if (snap.exists()) setCards(snap.data() as Record<string, DriverCardStats>);
			else setCards({});
		});
		return unsub;
	}, [gridId]);

	return cards;
}
