import { forwardRef } from "react";
import bgCard from "/src/assets/img/bg-card.jpg";
import bgCardChuva from "/src/assets/img/bg-card-chuva.jpg";
import Logo from "/src/assets/img/logo.png";
import { DoubleArrowOutlined as MenuArrow } from "@mui/icons-material";
import { Tooltip } from "react-tooltip";

interface PlayerCardProps {
	data: {
		name: string;
		num: string;
		racecraft: string;
		awareness: string;
		pace: string;
		experience: string;
		rating: string;
		prevRating: string;
		photo: string;
		teamColor: string;
		teamName: string;
		grid: string;
		badge: Array<{ url: string }>;
		badgeTitle: string;
		stats: {
			championships: string | number;
			totalSprintWins: string | number;
			totalWins: string | number;
			totalWinsB: string | number;
		};
	};
}

function formatBadgeTitle(title: string): string {
	// Handle null/undefined and non-string types
	if (typeof title !== "string" || !title.trim()) return "";

	// Handle camelCase and PascalCase
	const spaced = title
		.replace(/([A-Z][a-z]+)/g, " $1") // Handle capital letters followed by lowercase
		.replace(/([A-Z]+)/g, " $1") // Handle all-caps abbreviations
		.trim();

	// Capitalize first letter of each word and lowercase the rest
	return spaced
		.toLowerCase()
		.split(" ")
		.filter((word) => word) // Remove empty strings
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

const PlayerCard = forwardRef<HTMLDivElement, PlayerCardProps>(
	({ data }, ref) => {
		const splitDriverName = (name: string) => {
			const nameParts = name.split(" ");
			const firstName = nameParts[0];
			const secondName = nameParts.slice(1).join(" ");
			return { firstName, secondName };
		};

		const { firstName, secondName } = splitDriverName(data.name);
		const teamColor = data.teamColor || "#fff";

		const hasSpecialAchievement = [
			data.stats.championships,
			data.stats.totalSprintWins,
			data.stats.totalWins,
			data.stats.totalWinsB,
		].some((value) => value && Number(value) > 1);

		const isCrystalBorder = hasSpecialAchievement && Math.random() < 0.01;

		const borderColor = isCrystalBorder
			? "repeating-linear-gradient(145deg, #b3f0ff, #a0e7f5 10%, #b2fff5 20%, #aaf2d5 30%, #aaf2aa 40%, #d7ff8f 50%, #fff5b3 60%, #ffe0a0 70%, #ffb3a0 80%, #e0aaff 90%)"
			: parseFloat(data.rating) >= 90
			? "repeating-linear-gradient(145deg, #ffd700, #e6c200 15%, #b88a00 20%)"
			: parseFloat(data.rating) >= 80
			? "repeating-linear-gradient(145deg, #c0c0c0, #a8a8a8 15%, #8c8c8c 20%)"
			: "repeating-linear-gradient(145deg, #cd7f32, #c0802d 15%, #a6672a 20%)";

		const badgeUrls = data.badge?.map((badge) => badge.url) || [];

		return (
			<div
				ref={ref}
				className="text-white tracking-wider overflow-hidden w-[340px] h-[440px] rounded-lg p-[10px]"
				style={{
					fontFamily: `'Titillium Web Local', sans-serif`,
					boxShadow: `rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px`,
					background: `${borderColor}`,
				}}
			>
				<div className="bg-black relative w-full h-full flex flex-col justify-between">
					<img
						className={`object-cover absolute top-0 left-0 h-full ${
							badgeUrls.length === 0 ? "opacity-70" : "opacity-50"
						}`}
						src={badgeUrls.length === 0 ? bgCard : bgCardChuva}
						alt="Background"
					/>

					{data.badge.length > 0 && (
						<div className="absolute top-10 left-31 z-30 flex gap-1">
							{data.badge.map((badge, index) => (
								<div key={index} className="relative">
									<img
										src={badge.url}
										alt={`Badge ${index + 1}`}
										data-tooltip-id="badge-tooltip"
										data-tooltip-content={formatBadgeTitle(
											data.badgeTitle.toString()
										)}
										className="w-12 h-12 object-contain cursor-help"
									/>
								</div>
							))}
							<Tooltip
								id="badge-tooltip"
								place="top"
								className="!z-50"
							/>
						</div>
					)}

					<div className={`top-0 left-0 rounded-lg`}>
						<div
							className={`absolute top-0 left-0 w-full h-full z-20`}
							style={{
								boxShadow:
									"inset 0 0 2px 3px rgba(0, 0, 0, 0.4)",
								WebkitBoxShadow:
									"inset 0 0 2px 3px rgba(0, 0, 0, 0.4)",
							}}
						/>
					</div>

					<div className="w-auto relative px-6 py-3 ml-2 flex flex-col font-semibold">
						<div
							className="w-55 h-53 absolute top-0 left-3 border-t-4 border-l-4 rounded-tl-lg z-20"
							style={{ borderColor: teamColor }}
						/>
						<span className="flex flex-col mb-4 leading-3 z-20">
							<p className="text-gray-300">Nota Geral</p>
							<div className="flex items-center">
								<p className="text-5xl font-bold">
									{data.rating}
								</p>
								{data.rating !== data.prevRating && (
									<span
										className={
											data.rating > data.prevRating
												? "text-green-500"
												: "text-red-500"
										}
									>
										<MenuArrow
											className={
												data.rating > data.prevRating
													? "rotate-270"
													: "rotate-90"
											}
											fontSize="medium"
										/>
									</span>
								)}
							</div>
						</span>
						<span className="flex gap-1 items-baseline z-20">
							<p className="font-bold text-2xl">
								{data.experience}
							</p>
							<p className="text-gray-300">Experiência TSL</p>
						</span>
						<span className="flex gap-1 items-baseline z-20">
							<p className="font-bold text-2xl">
								{data.racecraft}
							</p>
							<p className="text-gray-300">Pilotagem</p>
						</span>
						<span className="flex gap-1 items-baseline z-20">
							<p className="font-bold text-2xl">
								{data.awareness}
							</p>
							<p className="text-gray-300">Atenção</p>
						</span>
						<span className="flex gap-1 items-baseline z-20">
							<p className="font-bold text-2xl">{data.pace}</p>
							<p className="text-gray-300">Ritmo</p>
						</span>
					</div>

					<div className="overflow-hidden absolute z-20 top-0 right-0 h-[330px] w-auto">
						<img
							className="object-cover translate-x-[80px] translate-y-[15px]"
							src={data.photo}
							alt={`${data.name}'s photo`}
						/>
					</div>

					<div
						className="text-white px-4 py-5 h-[150px] flex flex-col gap-2 justify-end bg-linear-0 from-f1-text to-f1-silver z-20 relative"
						// className="text-white px-4 py-5 h-[150px] flex flex-col gap-2 justify-end z-20 relative"
						style={{
							boxShadow: `0 -10px 10px -5px rgba(0, 0, 0, .5)`,
							// background: teamColor,
						}}
					>
						<div className="flex items-end justify-between font-regular">
							<span className="flex flex-col text-3xl leading-3">
								<span
									className={
										secondName
											? ""
											: "font-bold uppercase text-4xl"
									}
								>
									{firstName}
								</span>
								{secondName && (
									<span className="font-bold uppercase text-4xl leading-tight">
										{secondName}
									</span>
								)}
							</span>
							<div className="flex flex-col items-end gap-[2px]">
								<h2
									className={`font-semibold uppercase text-xs px-2 rounded leading-tight ${
										data.grid === "gridA"
											? "bg-f1-carbon text-white"
											: data.grid === "gridB"
											? "bg-f1-red text-white"
											: "bg-white text-f1-black"
									}`}
								>
									{data.grid === "gridA"
										? "Grid A"
										: data.grid === "gridB"
										? "Grid B"
										: data.grid === "reserva"
										? "Reserva"
										: "Ex-Piloto"}
								</h2>
								<p className="text-4xl italic mr-1">
									{data.num}
								</p>
							</div>
						</div>

						<div
							className="w-full h-1"
							style={{ backgroundColor: teamColor }}
						/>

						<div className="flex items-start justify-between">
							<p className="font-regular text-xl">
								{data.teamName}
							</p>
							<img
								className="object-cover h-[30px] pt-2"
								src={Logo}
								alt="TSL Logo"
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
);

export default PlayerCard;
