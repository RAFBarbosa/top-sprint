import { useGetHallsOfFameQuery } from "../graphql/generated";
import Carousel from "./Carousel";
import { HallOfFame } from "./HallOfFame";
import GenericLogo from "/src/assets/logosemfundo.png";

export function HallsOfFame() {
	const { data, error, loading } = useGetHallsOfFameQuery();

	if (loading) return <div>Carregando...</div>;
	if (error) return <div>Erro: {error.message}</div>;

	return (
		<aside className="w-full">
			<div>
				<span className="">Mural dos Campeões</span>

				<Carousel>
					{data?.hallsOfFame && data.hallsOfFame.length > 0 ? (
						data.hallsOfFame.map((data) => (
							<HallOfFame
								key={data.id}
								season={data.season || ""}
								photo={data.photo || { url: GenericLogo }}
							/>
						))
					) : (
						<p>No drivers available</p>
					)}
				</Carousel>
			</div>
			<div className="">
				<strong className="">Prêmios</strong>

				<span>
					Os ganhadores do campeonato serão recompensados com: Troféus
					para Primeiro, Segundo e Terceiro lugar de pilotos. Medalhas
					para ambos os campeões de contrutores. O envio deverá ser
					pago pelos donos dos prêmios.
				</span>
			</div>
		</aside>
	);
}
