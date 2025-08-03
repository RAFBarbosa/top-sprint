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
	const { data, error, loading } = useGetBannersQuery({
		variables: {
			orderBy: { createdAt: "desc" }, // Sort by createdAt in descending order (newest first)
		},
	});

	if (loading) return loadingSkeleton();
	if (error) return <div>Erro: {error.message}</div>;

	// Get the most recent banner (first in the array since we sorted by createdAt desc)
	const latestBanner = data?.banners?.[0];

	return (
		<aside className="md:w-1/2 mb-4 md:mb-0 border-t-8 border-r-8 border-f1-red rounded-tr-3xl relative flex flex-col justify-between">
			<div className="pr-2 md:sticky top-16 z-10">
				{latestBanner ? (
					<Banner
						key={latestBanner.id}
						link={latestBanner.link || ""}
						category={latestBanner.category || ""}
						title={latestBanner.title || ""}
						content={latestBanner.content || ""}
						photo={latestBanner.photo || { url: GenericLogo }}
					/>
				) : (
					<p>Sem banners para carregar</p>
				)}
			</div>
			<div className="md:h-full h-2 bg-divider bg-cover opacity-10 mr-2 md:mr-5 mt-4"></div>
		</aside>
	);
}
