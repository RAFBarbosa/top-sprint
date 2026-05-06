import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import type { DriverCardStats } from "../utils/calculateDriverCards";

export function useBestSeasonCard(
	driverId: string | null | undefined,
	gridId: string,
): DriverCardStats | null {
	const [bestCard, setBestCard] = useState<DriverCardStats | null>(null);

	useEffect(() => {
		if (!driverId || !gridId) return;
		getDocs(
			collection(db, "season_card_snapshots", gridId, "seasons"),
		).then((snap) => {
			let best: DriverCardStats | null = null;
			snap.forEach((doc) => {
				const data = doc.data() as Record<string, DriverCardStats>;
				const card = data[driverId];
				if (card && (!best || card.rating > best.rating)) {
					best = card;
				}
			});
			setBestCard(best);
		});
	}, [driverId, gridId]);

	return bestCard;
}
