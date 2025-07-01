import { useGetDriversQuery, useGetTeamsQuery } from "../../graphql/generated";
import Carousel from "../utils/Carousel";
// import GenericLogo from "/src/assets/img/white-logo.png";
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
	const { data: teamsData, error, loading } = useGetTeamsQuery();
	const { data: driversData } = useGetDriversQuery();

	if (loading || !driversData) return loadingSkeleton();
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
						{teamsData?.teams.map((team) => {
							const teamDrivers = driversData.drivers.filter(
								(driver) => driver.team?.name === team.name
							);

							const gridA = teamDrivers.filter(
								(d) => d.grid === "gridA"
							);
							const gridB = teamDrivers.filter(
								(d) => d.grid === "gridB"
							);

							return (
								<Team
									key={team.id}
									name={team.name}
									logo={team.photo?.url}
									teamColor={team.color.hex}
									gridA={gridA}
									gridB={gridB}
								/>
							);
						})}
					</Carousel>
				</div>
			</div>
		</aside>
	);
}
