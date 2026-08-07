import { useEffect, useState } from "react";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import { useCalendars } from "../../contexts/CalendarsContext";
import { Banner } from "./Banner";
import { SecondaryBanners } from "./SecondaryBanners";
import { Skeleton } from "@mui/material";
import { useTenantConfig } from "../../contexts/TenantConfigContext";
import { getGridConfig } from "../../shared/config/grids";
import { useCalendarSeasons } from "../../contexts/CalendarSeasonsContext";
import { useTracks } from "../../contexts/TracksContext";

const slugify = (str: string) =>
	str
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");

const loadingSkeleton = () => {
	return (
		<div className="md:w-1/2 mb-4 md:mb-0">
			<div className="my-4 mr-3">
				<Skeleton animation="wave" variant="text" height={30} />
				<Skeleton animation="wave" variant="text" height={30} />
				<Skeleton animation="wave" variant="text" height={30} />
				<Skeleton
					animation="wave"
					variant="rectangular"
					height={260}
					sx={{ my: 1 }}
				/>
			</div>
		</div>
	);
};

export function Banners() {
	const { logoUrl } = useTenantConfig();
	const [bannersData, setBannersData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { calendars: calendarsList } = useCalendars();
	const { mappings } = useCalendarSeasons();
	const { getTrack } = useTracks();

	const [bannerCalendarMap, setBannerCalendarMap] = useState<
		Record<string, string>
	>({});

	useEffect(() => {
		const q = query(
			collection(db, "banners"),
			where("deleted", "==", false),
			orderBy("createdAt", "desc"),
		);
		getDocs(q)
			.then((snap) => {
				setBannersData(
					snap.docs.map((d) => ({
						id: d.id,
						...d.data(),
						photo: d.data().photoUrl
							? { url: d.data().photoUrl }
							: null,
						createdAt:
							d.data().createdAt?.toDate?.()?.toISOString() ??
							new Date().toISOString(),
					})),
				);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		getDocs(collection(db, "banner_calendar"))
			.then((snap) => {
				const map: Record<string, string> = {};
				snap.forEach((d) => {
					map[d.id] = d.data().calendarId;
				});
				setBannerCalendarMap(map);
			})
			.catch(() => {});
	}, []);

	const getResultsLink = (bannerId: string): string | null => {
		const calendarId = bannerCalendarMap[bannerId];
		if (!calendarId) return null;
		const cal = calendarsList.find((c) => c.id === calendarId);
		if (!cal) return null;
		const seasonId =
			mappings.find((m) => m.calendarId === calendarId)?.seasonId ?? "";
		const gridLabel = getGridConfig(cal.grid)?.label ?? cal.grid;
		const seasonPart = seasonId ? `${slugify(seasonId)}-` : "";
		return `/resultados/${seasonPart}${slugify(gridLabel)}-${slugify(cal.round ?? "")}-${slugify(getTrack(cal.trackId)?.name ?? "")}`;
	};

	if (loading) return loadingSkeleton();
	if (error) return <div>Erro: {error}</div>;

	const featuredBanners = bannersData
		.filter((banner) => banner.category === "destaque" && banner.active !== false)
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime(),
		);

	const secondaryBanners = bannersData
		.filter((banner) => banner.category === "secundario" && banner.active !== false)
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime(),
		)
		.slice(0, 4);

	const latestFeaturedBanner = featuredBanners?.[0];

	// Enrich secondary banners with results link if linked to a race
	const secondaryBannersWithLinks = secondaryBanners.map((b) => ({
		...b,
		resolvedLink: getResultsLink(b.id) ?? b.link ?? "",
	}));

	const featuredResolvedLink = latestFeaturedBanner
		? (getResultsLink(latestFeaturedBanner.id) ??
			latestFeaturedBanner.link ??
			"")
		: "";

	return (
		<div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-start">
			{/* Primary Banner */}
			<aside
				style={{ borderColor: "var(--color-brand-primary)" }}
				className="md:w-4/7 mb-4 md:mb-0 border-t-8 relative flex flex-col"
			>
				<div className="pr-2">
					{latestFeaturedBanner ? (
						<Banner
							key={latestFeaturedBanner.id}
							link={featuredResolvedLink}
							category={latestFeaturedBanner.category || ""}
							title={latestFeaturedBanner.title || ""}
							content={latestFeaturedBanner.content || ""}
							photo={
								latestFeaturedBanner.photo || {
									url: logoUrl,
								}
							}
						/>
					) : (
						<p className="tenant-news-fallback">
							Nenhum banner em destaque encontrado
						</p>
					)}
				</div>
				<div className="md:h-full h-2 bg-map-bg bg-cover opacity-20 mr-2 md:mr-5 mt-4"></div>
			</aside>

			{/* Secondary Banners */}
			<aside
				// style={{ borderColor: "var(--color-brand-primary)" }}
				// className="md:w-3/7 flex flex-col border-t-4 pt-3"
				className="md:w-3/7 flex flex-col"
			>
				<SecondaryBanners banners={secondaryBannersWithLinks} />
			</aside>
		</div>
	);
}
