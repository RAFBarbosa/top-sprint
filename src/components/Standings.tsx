import { useGetStandingsQuery } from "../graphql/generated";
import Carousel from "./Carousel";
import GenericLogo from "/src/assets/logosemfundo.png";
import { Standing } from "./Standing";

export function Standings() {
	const { data, error, loading } = useGetStandingsQuery();

	if (loading) return <div>Carregando...</div>;
	if (error) return <div>Erro: {error.message}</div>;

	return (
		<aside className="w-full bg-gray-700 p-6 border-l border-gray-600">
			<span className="font-bold text-4xl pb-6 mb-6 border-b border-gray-500 block">
				Classificação
			</span>

			<Carousel slidesToShow={1} slidesToScroll={1}>
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
					<p>No drivers available</p>
				)}
			</Carousel>
		</aside>
	);
}
