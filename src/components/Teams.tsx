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
		<aside className="w-full bg-f1-carbon py-8 rounded-lg">
			<span className="block text-f1-red text-2xl font-bold text-center mb-6">
				Equipes e Pilotos
			</span>

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
					<p className="text-f1-silver text-center">
						No drivers available
					</p>
				)}
			</Carousel>
		</aside>
	);
}
