import { Skeleton } from "@mui/material";
import Carousel from "../utils/Carousel"; // Assuming you have a Carousel component
import { PreviousSeasons } from "./PreviousSeasons";
import { useGetArchiveQuery } from "../../graphql/generated";

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

export function PreviousSeason() {
	const { data, error, loading } = useGetArchiveQuery();

	if (loading) return loadingSkeleton();
	if (error) return <div>Erro: {error.message}</div>;

	return (
		<aside className="tenant-section tenant-section-archive pt-8" style={{ backgroundColor: "var(--color-archive-bg)", color: "var(--color-archive-text)" }}>
			<div className="w-full max-w-screen-xl mx-auto px-3">
				<div className="pb-8">
					<h1 className="font-extrabold text-4xl md:text-6xl tracking-wide mb-6">
						Temporadas Anteriores
					</h1>

					{/* Loop through archive and generate a carousel for each item */}
					{data?.archives && data.archives.length > 0 ? (
						data.archives.map((data) => {
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

									<div className="w-full h-3 my-4" style={{ backgroundColor: "var(--color-brand-primary)" }}></div>

									{/* Carousel */}
									<Carousel>
										{/* Loop through the photos and create a slide for each one */}
										{data.photo.map((photo, index) => (
											<PreviousSeasons
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
						<p>Nenhuma temporada cadastrada :(</p>
					)}
				</div>
			</div>
		</aside>
	);
}
