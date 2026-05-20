import { useCallback, useEffect, useState } from "react";
import { getDocs, getDoc, collection, doc } from "firebase/firestore";
import { db } from "../../lib/adminClient";

export interface FirebasePartnerDoc {
	name: string;
	altText?: string | null;
	deleted?: boolean;
	imageUrl?: string | null;
	footerLogoUrl?: string | null;
	link?: string | null;
	active?: boolean;
}

export interface NormalizedPartner {
	id: string;
	name: string;
	altText: string | null;
	deleted: boolean;
	image: { id: string | null; url: string } | null;
	footerLogo: { id: string | null; url: string } | null;
	link: string | null;
	active: boolean;
}

export function normalizeFirebasePartner(id: string, data: FirebasePartnerDoc): NormalizedPartner {
	return {
		id,
		name: data.name ?? "",
		altText: data.altText ?? null,
		deleted: data.deleted ?? false,
		image: data.imageUrl ? { id: null, url: data.imageUrl } : null,
		footerLogo: data.footerLogoUrl ? { id: null, url: data.footerLogoUrl } : null,
		link: data.link ?? null,
		active: data.active ?? true,
	};
}

export function useFirebasePartners({ includeDeleted = false } = {}) {
	const [partners, setPartners] = useState<NormalizedPartner[]>([]);
	const [loading, setLoading] = useState(true);
	const [version, setVersion] = useState(0);

	const refetch = useCallback(() => setVersion((v) => v + 1), []);

	useEffect(() => {
		let cancelled = false;
		setLoading(true);

		Promise.all([
			getDocs(collection(db, "partners")),
			getDoc(doc(db, "config", "partners_order")),
		]).then(([snap, orderSnap]) => {
			if (cancelled) return;

			const orderData = orderSnap.exists() ? (orderSnap.data().order as string[]) : [];

			const list = snap.docs
				.map((d) => normalizeFirebasePartner(d.id, d.data() as FirebasePartnerDoc))
				.filter((p) => includeDeleted || !p.deleted);

			if (orderData.length > 0) {
				const orderMap = new Map(orderData.map((id, i) => [id, i]));
				list.sort((a, b) => {
					const ai = orderMap.has(a.id) ? orderMap.get(a.id)! : Infinity;
					const bi = orderMap.has(b.id) ? orderMap.get(b.id)! : Infinity;
					if (ai !== bi) return ai - bi;
					return a.name.localeCompare(b.name, "pt-BR");
				});
			} else {
				list.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
			}

			setPartners(list);
			setLoading(false);
		});

		return () => { cancelled = true; };
	}, [includeDeleted, version]);

	return { partners, loading, refetch };
}
