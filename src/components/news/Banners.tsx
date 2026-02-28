import { useGetBannersQuery } from "../../graphql/generated";
import { Banner } from "./Banner";
import { SecondaryBanners } from "./SecondaryBanners";
import { Skeleton } from "@mui/material";
import { tenant } from "../config/tenants";

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

	if (loading) return loadingSkeleton();
	if (error) return <div>Erro: {error.message}</div>;

	// Filter banners with category "destaque" and sort by createdAt (newest first)
	const featuredBanners = data?.banners
		?.filter((banner) => banner.category === "destaque")
		?.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime(),
		);

	// Get latest 2 secondary banners
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

	return (
		<div className="flex flex-col md:flex-row gap-4 items-stretch">
			{/* Primary Banner */}
			<aside
				style={{ borderColor: "var(--color-brand-primary)" }}
				className="md:w-4/7 mb-4 md:mb-0 border-t-8 border-r-8 rounded-tr-3xl relative flex flex-col"
			>
				<div className="pr-2 md:sticky top-16 z-10">
					{latestFeaturedBanner ? (
						<Banner
							key={latestFeaturedBanner.id}
							link={latestFeaturedBanner.link || ""}
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
						<p>Nenhum banner em destaque encontrado</p>
					)}
				</div>
				<div className="md:h-full h-2 bg-map-bg bg-cover opacity-20 mr-2 md:mr-5 mt-4"></div>
			</aside>

			{/* Secondary Banners */}
			<aside className="md:w-3/7 flex flex-col">
				<SecondaryBanners banners={secondaryBanners} />
			</aside>
		</div>
	);
}
