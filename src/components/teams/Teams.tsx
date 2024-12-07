import { useGetTeamsQuery } from "../../graphql/generated";
import Carousel from "../utils/Carousel";
import GenericLogo from "/src/assets/img/white-logo.png";
import { Team } from "./Team";
import { Skeleton } from "@mui/material";

const loadingSkeleton = () => (
	<div className="px-3 w-full md:max-w-screen-xl mx-auto">
		<div className="my-4">
			<Skeleton
				animation="wave"
				variant="rounded"
				height={350}
				sx={{ width: "100%" }}
			/>
		</div>
	</div>
);

export function Teams() {
	const { data, error, loading } = useGetTeamsQuery();

	if (loading) return loadingSkeleton();
	if (error)
		return (
			<div className="text-red-500 text-center py-6">
				Erro: {error.message}
			</div>
		);

	return (
		<aside className="py-10 px-3">
			<div className="md:max-w-screen-xl md:px-0 mx-auto">
				<div className="border-t-8 border-r-8 border-f1-silver rounded-tr-3xl pt-4 relative">
					<div className="font-bold text-4xl pr-4 absolute bg-white -top-[28px]">
						Equipes e Pilotos
					</div>
					<Carousel slidesToShowDesktop={1} slidesToShowMobile={1}>
						{data?.teams && data.teams.length > 0 ? (
							data.teams.map((team) => (
								<Team
									key={team.id}
									name={team.name || ""}
									photo={team.photo || { url: GenericLogo }}
								/>
							))
						) : (
							<p className="text-white text-center">
								No drivers available
							</p>
						)}
					</Carousel>
				</div>
			</div>
		</aside>
	);
}
