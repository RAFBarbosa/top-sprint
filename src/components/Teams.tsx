import { useGetTeamsQuery } from "../graphql/generated";
import Carousel from "./Carousel";
import GenericLogo from "/src/assets/logosemfundo.png";
import { Team } from "./Team";

export function Teams() {
	const { data, error, loading } = useGetTeamsQuery();

	if (loading)
		return (
			<div className="text-f1-silver text-center py-6">Carregando...</div>
		);
	if (error)
		return (
			<div className="text-red-500 text-center py-6">
				Erro: {error.message}
			</div>
		);

	return (
		<aside className="w-full py-10">
			<div className="max-w-screen-xl px-3 md:px-0 mx-auto">
				<h2 className=" font-bold text-4xl mb-4">Equipes e Pilotos</h2>
				<div className="border-t-8 border-r-8 border-f1-silver rounded-tr-3xl pt-4">
					<Carousel>
						{data?.teams && data.teams.length > 0 ? (
							data.teams.map((data) => (
								<Team
									key={data.id}
									name={data.name || ""}
									team={data.team || ""}
									photo={data.photo || { url: GenericLogo }}
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
