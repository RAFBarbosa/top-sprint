export interface FirebaseDriverDoc {
	name: string;
	number?: string | null;
	grid?: string | null;
	class?: string | null;
	stream?: string | null;
	city?: string | null;
	equipment?: string | null;
	phone?: string | null;
	deleted?: boolean;
	photoUrl?: string | null;
	badgeTitle?: string | null;
	badgeUrl?: string | null;
	teamHygraphId?: string | null;
	teamName?: string | null;
	teamColor?: string | null;
	teamLogoUrl?: string | null;
	birthDate?: string | null;
	sex?: string | null;
	nationality?: string | null;
	nationalityCode?: string | null;
	realLifeTeamId?: string | null;
	gameId?: string | null;
}

export interface NormalizedDriver {
	id: string;
	name: string;
	number: string | null;
	grid: string | null;
	class: string | null;
	stream: string | null;
	city: string | null;
	equipment: string | null;
	phone: string | null;
	deleted: boolean;
	badgeTitle: string | null;
	photo: { id: string | null; url: string } | null;
	badge: { id: string | null; url: string } | null;
	team: {
		id: string;
		name: string;
		color: { hex: string };
		photo: { id: string | null; url: string } | null;
	} | null;
	photoUrl: string | null;
	teamName: string | null;
	teamColor: string | null;
	teamLogoUrl: string | null;
	birthDate: string | null;
	sex: string | null;
	nationality: string | null;
	nationalityCode: string | null;
	realLifeTeamId: string | null;
	gameId: string | null;
}

export function normalizeFirebaseDriver(
	id: string,
	data: FirebaseDriverDoc,
): NormalizedDriver {
	return {
		id,
		name: data.name ?? "",
		number: data.number ?? null,
		grid: data.grid ?? null,
		class: data.class ?? null,
		stream: data.stream ?? null,
		city: data.city ?? null,
		equipment: data.equipment ?? null,
		phone: data.phone ?? null,
		deleted: data.deleted ?? false,
		badgeTitle: data.badgeTitle ?? null,
		photo: data.photoUrl ? { id: null, url: data.photoUrl } : null,
		badge: data.badgeUrl ? { id: null, url: data.badgeUrl } : null,
		team: data.teamName
			? {
					id: data.teamHygraphId ?? "",
					name: data.teamName,
					color: { hex: data.teamColor ?? "#000000" },
					photo: data.teamLogoUrl
						? { id: null, url: data.teamLogoUrl }
						: null,
				}
			: null,
		photoUrl: data.photoUrl ?? null,
		teamName: data.teamName ?? null,
		teamColor: data.teamColor ?? null,
		teamLogoUrl: data.teamLogoUrl ?? null,
		birthDate: data.birthDate ?? null,
		sex: data.sex ?? null,
		nationality: data.nationality ?? null,
		nationalityCode: data.nationalityCode ?? null,
		realLifeTeamId: data.realLifeTeamId ?? null,
		gameId: data.gameId ?? null,
	};
}
