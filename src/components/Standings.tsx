import { useGetStandingsQuery } from "../graphql/generated";
import Carousel from "./Carousel";
import GenericLogo from "/src/assets/logosemfundo.png";
import { Standing } from "./Standing";
import { Skeleton } from "@mui/material";

const loadingSkeleton = () => {
	return (
		<div className="px-3 w-full md:max-w-screen-xl mx-auto">
			<div className="my-4">
				<div className="flex flex-col md:flex-row gap-y-2 md:gap-x-4">
					<Skeleton
						animation="wave"
						variant="rounded"
						height={410}
						sx={{ width: "100%" }}
					/>
					<Skeleton
						animation="wave"
						variant="rounded"
						height={410}
						sx={{ width: "100%" }}
					/>
				</div>
			</div>
		</div>
	);
};

export function Standings() {
	const { data, error, loading } = useGetStandingsQuery();

	if (loading) return loadingSkeleton();
	if (error)
		return (
			<div className="text-red-500 text-center py-6">
				Erro: {error.message}
			</div>
		);

	return (
		// <aside className="bg-gradient-to-r from-f1-carbon via-f1-silver to-f1-carbon py-10 flex flex-col">
		<aside className="bg-f1-carbon py-10 flex flex-col">
			<div className="px-3 w-full md:max-w-screen-xl mx-auto">
				<h2 className="font-f1Title uppercase tracking-widest text-white text-lg md:text-xl text-center mb-10">
					Classificação
				</h2>
				{/* <Carousel slidesToShow={1} slidesToScroll={1} autoplay={false}> */}
				{data?.standings && data.standings.length > 0 ? (
					data.standings.map((data) => (
						<Standing
							key={data.id}
							season={data.season || ""}
							round={data.round || ""}
							photos={
								data.photo.length > 0
									? data.photo.map((p) => p.url)
									: [GenericLogo]
							}
						/>
					))
				) : (
					<p className="text-white text-center">
						No drivers available
					</p>
				)}
				{/* </Carousel> */}
			</div>
		</aside>
	);
}
