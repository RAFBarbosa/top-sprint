import { Skeleton } from "@mui/material";
import { useGetHallsOfFameQuery } from "../graphql/generated";
import Carousel from "./Carousel";
import { HallOfFame } from "./HallOfFame";
import GenericLogo from "/src/assets/logosemfundo.png";

const loadingSkeleton = () => {
	return (
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
};

export function HallsOfFame() {
	const { data, error, loading } = useGetHallsOfFameQuery();

	if (loading) return loadingSkeleton();
	if (error) return <div>Erro: {error.message}</div>;

	return (
		<aside className="mt-8">
			<div className="w-full max-w-screen-xl mx-auto px-3">
				<div className="mb-8">
					<h1 className="font-semibold text-4xl md:text-6xl tracking-wide mb-6">
						Mural dos Campeões
					</h1>

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
			</div>
			<div className="w-full bg-f1-silver text-white py-8">
				<div className="max-w-screen-xl mx-auto px-3">
					<div className="border-t-8 border-r-8 border-f1-red rounded-tr-3xl pt-3 mb-6">
						<h2 className="font-bold text-3xl md:text-4xl">
							Prêmios
						</h2>
					</div>
					<div className="pr-3">
						<p className="mb-2">
							Os ganhadores do campeonato serão recompensados com:
						</p>
						<ul className="list-disc ml-5 mb-2">
							<li>
								Troféus para Primeiro, Segundo e Terceiro lugar
								de pilotos.
							</li>
							<li>
								Medalhas para ambos os campeões de contrutores.
							</li>
						</ul>

						<p>O envio deverá ser pago pelos donos dos prêmios.</p>
					</div>
				</div>
			</div>
		</aside>
	);
}
