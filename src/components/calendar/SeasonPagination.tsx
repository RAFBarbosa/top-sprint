import { GetSeasonsQuery } from "@/graphql/generated";
import { Link } from "react-router-dom";
import CustomBorderBox from "../utils/CustomBorderBox";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface SeasonPaginationProps {
	seasons: GetSeasonsQuery["seasons"];
	currentSlug: string;
}

export default function SeasonPagination({
	seasons,
	currentSlug,
}: SeasonPaginationProps) {
	if (!seasons.length) return null;

	const reversedSeasons = seasons.toReversed();
	const currentIndex = reversedSeasons.findIndex(
		(season) => season.slug === currentSlug
	);

	const previousSeason =
		currentIndex > 0 ? reversedSeasons[currentIndex - 1] : null;
	const nextSeason =
		currentIndex < reversedSeasons.length - 1
			? reversedSeasons[currentIndex + 1]
			: null;

	return (
		<div className="flex justify-between gap-4 py-4">
			{previousSeason && (
				<div className="flex justify-start w-full">
					<Link
						to={`/calendario/${previousSeason.slug}`}
						className="w-full"
					>
						<CustomBorderBox
							className="w-full border-t-2 border-l-2"
							borderColor="border-f1-carbon hover:border-f1-red group/arrow"
							borderSides="top-left"
							padding="py-3 px-3"
						>
							<div className="w-full flex items-center gap-1">
								<ArrowBackIosIcon className="group-hover/arrow:text-f1-red" />
								<div className="flex flex-col">
									<span className="font-bold tracking-wide">
										{previousSeason.name}
									</span>
									<span>{previousSeason.year}</span>
								</div>
							</div>
						</CustomBorderBox>
					</Link>
				</div>
			)}

			{nextSeason && (
				<div className="flex justify-end w-full">
					<Link
						to={`/calendario/${nextSeason.slug}`}
						className="w-full"
					>
						<CustomBorderBox
							className="w-full border-t-2 border-r-2"
							borderColor="border-f1-carbon hover:border-f1-red group/arrow"
							borderSides="top-right"
							padding="py-3 px-3"
						>
							<div className="w-full flex justify-end items-center gap-1 text-right">
								<div className="flex flex-col items-end">
									<span className="font-bold tracking-wide">
										{nextSeason.name}
									</span>
									<span>{nextSeason.year}</span>
								</div>
								<ArrowForwardIosIcon className="group-hover/arrow:text-f1-red" />
							</div>
						</CustomBorderBox>
					</Link>
				</div>
			)}
		</div>
	);
}
