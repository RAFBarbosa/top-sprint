import { useGetBannersQuery } from "../../graphql/generated";
import GenericLogo from "/src/assets/img/white-logo.png";
import { Banner } from "./Banner";
import { Skeleton } from "@mui/material";

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
				new Date(a.createdAt).getTime()
		);

	// Get the most recent featured banner
	const latestFeaturedBanner = featuredBanners?.[0];

	console.log("Latest Featured Banner:", latestFeaturedBanner);

	return (
		<aside className="md:w-1/2 mb-4 md:mb-0 border-t-8 border-r-8 border-f1-red rounded-tr-3xl relative flex flex-col justify-between">
			<div className="pr-2 md:sticky top-16 z-10">
				{latestFeaturedBanner ? (
					<Banner
						key={latestFeaturedBanner.id}
						link={latestFeaturedBanner.link || ""}
						category={latestFeaturedBanner.category || ""}
						title={latestFeaturedBanner.title || ""}
						content={latestFeaturedBanner.content || ""}
						photo={
							latestFeaturedBanner.photo || { url: GenericLogo }
						}
					/>
				) : (
					<p>Nenhum banner em destaque encontrado</p>
				)}
			</div>
			<div className="md:h-full h-2 bg-divider bg-cover opacity-10 mr-2 md:mr-5 mt-4"></div>
		</aside>
	);
}
