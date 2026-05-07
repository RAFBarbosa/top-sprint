import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import {
	useGetBannersQuery,
	useGetCalendarsQuery,
} from "../../graphql/generated";
import { Banner } from "./Banner";
import { SecondaryBanners } from "./SecondaryBanners";
import { Skeleton } from "@mui/material";
import { tenant } from "../../shared/config/tenants";
import { getGridConfig } from "../../shared/config/grids";
import { useCalendarSeasons } from "../../contexts/CalendarSeasonsContext";

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
	const { data, error, loading } = useGetBannersQuery();
	const { data: calendarsData } = useGetCalendarsQuery();
	const { mappings } = useCalendarSeasons();

	const [bannerCalendarMap, setBannerCalendarMap] = useState<
		Record<string, string>
	>({});

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
		const cal = calendarsData?.calendars?.find((c) => c.id === calendarId);
		if (!cal) return null;
		const seasonId =
			mappings.find((m) => m.calendarId === calendarId)?.seasonId ?? "";
		const gridLabel = getGridConfig(cal.grid)?.label ?? cal.grid;
		const seasonPart = seasonId ? `${slugify(seasonId)}-` : "";
		return `/resultados/${seasonPart}${slugify(gridLabel)}-${slugify(cal.round ?? "")}-${slugify(cal.track?.name ?? "")}`;
	};

	if (loading) return loadingSkeleton();
	if (error) return <div>Erro: {error.message}</div>;

	const featuredBanners = data?.banners
		?.filter((banner) => banner.category === "destaque")
		?.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime(),
		);

	const secondaryBanners =
		data?.banners
			?.filter((banner) => banner.category === "secundario")
			?.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() -
					new Date(a.createdAt).getTime(),
			)
			?.slice(0, 4) || [];

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
									url: tenant.logo.url,
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
