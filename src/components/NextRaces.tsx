import { useGetNextRaceQuery } from "../graphql/generated";
import GenericLogo from "/src/assets/logosemfundo.png";
import { NextRace } from "./NextRace";
import { Skeleton } from "@mui/material";

const loadingSkeleton = () => {
	return (
		<div className="md:flex justify-between max-w-screen-xl p-4">
			<div className="flex flex-col md:w-1/3">
				<Skeleton
					animation="wave"
					variant="text"
					sx={{ fontSize: "1.2rem", bgcolor: "grey.900" }}
				/>
				<Skeleton
					animation="wave"
					variant="text"
					sx={{ fontSize: "1.5rem", bgcolor: "grey.900" }}
				/>
			</div>
			<div className="md:w-1/3 mt-3 md:mt-0">
				<Skeleton
					animation="wave"
					variant="rectangular"
					height={100}
					sx={{ bgcolor: "grey.900" }}
				/>
			</div>
		</div>
	);
};

export function NextRaces() {
	const { data, error, loading } = useGetNextRaceQuery();

	if (loading) return loadingSkeleton();
	if (error)
		return (
			<div className="text-red-500 text-center py-6">
				Erro: {error.message}
			</div>
		);

	return (
		<div className="text-white">
			{data?.races && data.races.length > 0 ? (
				data.races.map((data) => (
					<NextRace
						key={data.id}
						track={data.track || ""}
						date={data.date || ""}
						link={data.link || ""}
						flag={data.flag || { url: GenericLogo }}
					/>
				))
			) : (
				<p className="text-white text-center">
					Sem corridas encontradas
				</p>
			)}
		</div>
	);
}
