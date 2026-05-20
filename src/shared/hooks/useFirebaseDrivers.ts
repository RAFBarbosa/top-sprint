import { useCallback, useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import {
	normalizeFirebaseDriver,
	type NormalizedDriver,
	type FirebaseDriverDoc,
} from "../../types/driver";

export function useFirebaseDrivers({ includeDeleted = false } = {}) {
	const [drivers, setDrivers] = useState<NormalizedDriver[]>([]);
	const [loading, setLoading] = useState(true);
	const [version, setVersion] = useState(0);

	const refetch = useCallback(() => setVersion((v) => v + 1), []);

	useEffect(() => {
		let cancelled = false;
		setLoading(true);
		getDocs(collection(db, "drivers")).then((snap) => {
			if (cancelled) return;
			const list = snap.docs
				.map((d) =>
					normalizeFirebaseDriver(d.id, d.data() as FirebaseDriverDoc),
				)
				.filter((d) => includeDeleted || !d.deleted)
				.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
			setDrivers(list);
			setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [includeDeleted, version]);

	return { drivers, loading, refetch };
}
