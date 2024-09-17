import { useGetTeamsQuery } from "../graphql/generated";
import Carousel from "./Carousel";
import GenericLogo from "/src/assets/logosemfundo.png";
import { Team } from "./Team";

export function Teams() {
	const { data, error, loading } = useGetTeamsQuery();

	if (loading) return <div>Carregando...</div>;
	if (error) return <div>Erro: {error.message}</div>;

	return (
		<aside className="w-full bg-gray-700 p-6 border-l border-gray-600">
			<span className="font-bold text-4xl pb-6 mb-6 border-b border-gray-500 block">
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
					<p>No drivers available</p>
				)}
			</Carousel>
		</aside>
	);
}
