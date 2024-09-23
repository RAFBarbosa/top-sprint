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
		<aside className="py-10 w-full">
			<div className="max-w-screen-xl md:px-0 mx-auto px-3">
				<fieldset className="border-t-8 border-r-8 border-f1-silver rounded-tr-3xl pt-4 w-full">
					<legend className="font-bold text-4xl pr-4 relative">
						Equipes e Pilotos
					</legend>
					<div className="md:max-w-[1268px] max-w-[342px]">
						<Carousel>
							{data?.teams && data.teams.length > 0 ? (
								data.teams.map((data) => (
									<Team
										key={data.id}
										name={data.name || ""}
										team={data.team || ""}
										photo={
											data.photo || { url: GenericLogo }
										}
									/>
								))
							) : (
								<p className="text-white text-center">
									No drivers available
								</p>
							)}
						</Carousel>
					</div>
				</fieldset>
			</div>
		</aside>
	);
}
