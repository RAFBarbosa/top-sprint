import { useParams } from "react-router-dom";
import {
	useGetSeasonRoundsQuery,
	useGetSeasonsQuery,
} from "../graphql/generated";
import { Round } from "../components/news/Round";
import SeasonPagination from "../components/calendar/SeasonPagination";
import GenericLogo from "/src/assets/img/white-logo.png";
import Skeleton from "../components/utils/Skeleton";

export function Calendar() {
	const { slug } = useParams();
	const {
		data: seasonData,
		loading: isLoadingSeasons,
		error: seasonError,
	} = useGetSeasonsQuery();

	const seasons = seasonData?.seasons || [];
	const hasSeasons = seasons.length > 0;
	const shouldGetCurrentSeason = slug === "atual" && hasSeasons;
	const currentSlug = shouldGetCurrentSeason ? seasons[0].slug! : `${slug}`;
	const currentSeason = shouldGetCurrentSeason
		? seasons[0]
		: seasons.find((season) => season.slug === currentSlug);

	const {
		data: roundsData,
		loading: isLoadingRounds,
		error: roundsError,
	} = useGetSeasonRoundsQuery({
		variables: { slug: currentSlug },
		skip: !hasSeasons,
	});

	const isLoading = isLoadingSeasons || isLoadingRounds;

	const renderSeasonTitle = () => {
		if (isLoading) {
			return (
				<Skeleton
					width="w-full"
					height="h-[32px]"
					className="mt-2"
					variant="square"
				/>
			);
		}
		return (
			<h2 className="font-extrabold text-xl md:text-2xl tracking-wide">
				{currentSeason?.name}
			</h2>
		);
	};

	const renderRounds = () => {
		if (isLoading) {
			return Array.from({ length: 8 }).map((_, index) => (
				<Skeleton
					key={index}
					width="w-full sm:w-[48%]"
					height="h-[120px]"
					variant="square"
				/>
			));
		}

		if (!roundsData || roundsData.rounds.length === 0) {
			return <p>Nenhuma corrida disponível.</p>;
		}

		return roundsData.rounds.map((round) => {
			return (
				<Round
					key={round.id}
					round={round.name}
					track={round.track?.name || ""}
					description={round.track?.location || ""}
					date={round.date}
					link={`/resultado/${round.id}`}
					flag={round.track?.flag || { url: GenericLogo }}
					isExternal={false}
				/>
			);
		});
	};

	const renderSeasonPagination = () => {
		if (isLoading) {
			return (
				<div className="flex justify-between gap-4 py-4">
					<Skeleton
						width="w-full"
						height="h-[70px]"
						variant="square"
					/>
					<Skeleton
						width="w-full"
						height="h-[70px]"
						variant="square"
					/>
				</div>
			);
		}

		return <SeasonPagination seasons={seasons} currentSlug={currentSlug} />;
	};

	return (
		<aside id="resultados" className="mx-auto leading-snug w-full">
			<div className="w-full mb-8 max-w-screen-xl px-3 mx-auto">
				<div className="h-16 bg-divider bg-cover my-4 opacity-5"></div>
				<div className="border-t-8 border-r-8 border-f1-carbon rounded-tr-3xl pt-3 relative mb-8">
					<h1 className="font-extrabold text-4xl md:text-6xl tracking-wide">
						Resultados por Etapa
					</h1>
					{renderSeasonTitle()}
				</div>
				<div className="flex flex-wrap gap-4 w-full justify-between py-8">
					{renderRounds()}
				</div>
				{renderSeasonPagination()}
			</div>
		</aside>
	);
}
