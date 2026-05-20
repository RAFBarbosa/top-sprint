import { useCallback, useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../lib/adminClient";

export interface FirebaseTeamDoc {
	name: string;
	class?: string | null;
	deleted?: boolean;
	colorHex?: string | null;
	photoUrl?: string | null;
}

export interface NormalizedTeam {
	id: string;
	name: string;
	class: string | null;
	deleted: boolean;
	color: { hex: string };
	photo: { id: string | null; url: string } | null;
}

export function normalizeFirebaseTeam(id: string, data: FirebaseTeamDoc): NormalizedTeam {
	return {
		id,
		name: data.name ?? "",
		class: data.class ?? null,
		deleted: data.deleted ?? false,
		color: { hex: data.colorHex ?? "#000000" },
		photo: data.photoUrl ? { id: null, url: data.photoUrl } : null,
	};
}

export function useFirebaseTeams({ includeDeleted = false } = {}) {
	const [teams, setTeams] = useState<NormalizedTeam[]>([]);
	const [loading, setLoading] = useState(true);
	const [version, setVersion] = useState(0);

	const refetch = useCallback(() => setVersion((v) => v + 1), []);

	useEffect(() => {
		let cancelled = false;
		setLoading(true);
		getDocs(collection(db, "teams")).then((snap) => {
			if (cancelled) return;
			const list = snap.docs
				.map((d) => normalizeFirebaseTeam(d.id, d.data() as FirebaseTeamDoc))
				.filter((t) => includeDeleted || !t.deleted)
				.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
			setTeams(list);
			setLoading(false);
		});
		return () => { cancelled = true; };
	}, [includeDeleted, version]);

	return { teams, loading, refetch };
}
