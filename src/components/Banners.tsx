import { useGetBannersQuery } from "../graphql/generated";
import GenericLogo from "/src/assets/logosemfundo.png";
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

	return (
		<aside className="md:w-1/2 mb-4 md:mb-0 border-t-8 border-r-8 border-f1-red rounded-tr-3xl">
			<div className="pr-2 pb-4 md:pb-0">
				{data?.banners && data.banners.length > 0 ? (
					data.banners.map((data) => (
						<Banner
							key={data.id}
							link={data.link || ""}
							title={data.title || ""}
							photo={data.photo || { url: GenericLogo }}
						/>
					))
				) : (
					<p>Sem banners para carregar</p>
				)}
			</div>
			<div className="md:hidden h-2 bg-divider bg-cover opacity-10 mr-2"></div>
		</aside>
	);
}
