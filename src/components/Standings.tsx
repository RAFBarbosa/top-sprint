import { useGetStandingsQuery } from "../graphql/generated";
import Carousel from "./Carousel";
import GenericLogo from "/src/assets/logosemfundo.png";
import { Standing } from "./Standing";

export function Standings() {
	const { data, error, loading } = useGetStandingsQuery();

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
		<aside className="bg-f1-black py-8">
			<span className="block text-f1-red text-2xl font-bold text-center mb-6">
				Classificação
			</span>

			<Carousel slidesToShow={1} slidesToScroll={1} autoplay={false}>
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
					<p className="text-f1-silver text-center">
						No drivers available
					</p>
				)}
			</Carousel>
		</aside>
	);
}
