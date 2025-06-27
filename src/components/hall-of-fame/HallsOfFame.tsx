import { Skeleton } from "@mui/material";
import Carousel from "../utils/Carousel"; // Assuming you have a Carousel component
import { HallOfFame } from "./HallOfFame";
import { useGetHallsOfFameQuery } from "../../graphql/generated";

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
					<h1 className="font-extrabold text-4xl md:text-6xl tracking-wide mb-6">
						Mural dos Campeões
					</h1>

					{/* Loop through hallsOfFame and generate a carousel for each item */}
					{data?.hallsOfFame && data.hallsOfFame.length > 0 ? (
						data.hallsOfFame.map((data) => {
							const numOfPhotos = data.photo.length;

							// Logic to determine slidesToShow and autoplay
							const slidesToShow =
								numOfPhotos >= 3 ? 3 : numOfPhotos;
							const autoplay = numOfPhotos > 1; // Enable autoplay if more than 1 image

							return (
								<div key={data.id} className="mb-8">
									{/* Display the season as the title for each carousel */}
									<div className="h-16 bg-divider bg-cover my-4 opacity-5"></div>
									<h2 className="font-semibold text-2xl md:text-3xl tracking-wide mb-4">
										{data.season}
									</h2>

									<div className="w-full h-3 bg-f1-carbon my-4"></div>

									{/* Carousel */}
									<Carousel>
										{/* Loop through the photos and create a slide for each one */}
										{data.photo.map((photo, index) => (
											<HallOfFame
												key={`${data.id}-${index}`}
												season={data.season || ""}
												photo={photo}
											/>
										))}
									</Carousel>
								</div>
							);
						})
					) : (
						<p>No champions available</p>
					)}
				</div>
			</div>
			<div className="w-full bg-f1-text text-white py-8">
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
								do Grid A e Primeiro do Grid B.
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
