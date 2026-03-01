import { forwardRef } from "react";
import bgCard from "/src/assets/img/card-backgrounds/topsprint-a.jpg";
import bgCardChuva from "/src/assets/img/card-backgrounds/topsprint-chuva.jpg";
import { DoubleArrowOutlined as MenuArrow } from "@mui/icons-material";
import { Tooltip } from "react-tooltip";
import { tenant } from "../config/tenants";

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
		teamLogo: string;
		grid: string;
		class: string;
		badge: Array<{ url: string }>;
		badgeTitle: string;
		cardBackground?: string;
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
			const firstName = nameParts[0].replace(/-[BC]$/, "");
			const secondName = nameParts
				.slice(1)
				.join(" ")
				.replace(/-[BC]$/, "");
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
							data.badgeTitle?.includes("reiDaChuva") ||
							data.badgeTitle?.includes("mestreDaChuva")
								? "opacity-50"
								: "opacity-70"
						}`}
						src={
							data.badgeTitle?.includes("reiDaChuva") ||
							data.badgeTitle?.includes("mestreDaChuva")
								? bgCardChuva
								: (data.cardBackground ?? // driver-level override
									tenant.grids.find((g) => g.id === data.grid)
										?.cardBackground ?? // grid default
									bgCard) // ultimate fallback
						}
						alt="Background"
					/>

					{data.badge.length > 0 && (
						<div className="absolute top-13 left-32 z-30 flex gap-1">
							{data.badge.map((badge, index) => (
								<div key={index} className="relative">
									<img
										src={badge.url}
										alt={`Badge ${index + 1}`}
										data-tooltip-id="badge-tooltip"
										data-tooltip-content={formatBadgeTitle(
											data.badgeTitle.toString(),
										)}
										className="w-12 h-12 object-contain cursor-help"
									/>
								</div>
							))}
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

					<div className="w-auto relative mt-2 px-6 py-3 ml-2 flex flex-col font-semibold">
						<div
							className="w-55 h-56 absolute top-0 left-3 border-t-4 border-l-4 rounded-tl-lg z-20"
							style={{ borderColor: teamColor }}
						/>
						<span className="flex flex-col mb-8 leading-3 z-20">
							<p className="text-gray-300">Nota Geral</p>
							<div className="flex items-center">
								<p className="text-6xl font-bold">
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
						<div className="text-xs font-bold flex gap-4 justify-between w-30 flex-wrap z-30">
							{[
								{
									label: "EXP",
									value: data.experience,
									tooltip: "Experiência",
								},
								{
									label: "PIL",
									value: data.racecraft,
									tooltip: "Pilotagem",
								},
								{
									label: "ATN",
									value: data.awareness,
									tooltip: "Atenção",
								},
								{
									label: "RIT",
									value: data.pace,
									tooltip: "Ritmo",
								},
							].map(({ label, value, tooltip }) => (
								<span
									key={label}
									className="flex flex-col items-center leading-2 cursor-help"
									data-tooltip-id="stat-tooltip"
									data-tooltip-content={tooltip}
								>
									<p className="text-gray-300 tracking-[.218m]">
										{label}
									</p>
									<p className="text-4xl drop-shadow-2xl">
										{value}
									</p>
								</span>
							))}
						</div>
					</div>

					<div className="overflow-hidden absolute z-20 top-0 right-0 h-[330px] w-auto">
						<img
							className={
								tenant.defaultPhotoStyle === "round"
									? "object-cover translate-x-[40px] -translate-y-[40px] scale-60 border-10 rounded-full border-f1-text"
									: "object-cover translate-x-[80px] translate-y-[15px]"
							}
							src={data.photo || tenant.fallbackDriverPhoto}
							alt={`${data.name}'s photo`}
						/>
					</div>

					<div
						className="text-white px-4 py-5 h-[150px] flex flex-col gap-2 justify-end bg-linear-0 from-f1-carbon to-f1-silver z-20 relative"
						style={{
							boxShadow: `0 -10px 10px -5px rgba(0, 0, 0, .5)`,
						}}
					>
						<div
							className="dot-pattern absolute inset-0 rounded-lg z-0 pointer-events-none opacity-10"
							style={{
								backgroundColor: "rgba(0, 0, 0, 0.5)",
								backgroundImage:
									"var(--background-image-dot-pattern)",
							}}
						/>
						<div className="flex items-end justify-between font-regular z-30">
							<span className="flex flex-col text-3xl leading-3">
								<span
									className={
										secondName
											? firstName.length > 10
												? "text-3xl leading-4"
												: secondName
													? "text-2xl leading-4"
													: ""
											: `font-bold uppercase ${
													firstName.length > 10
														? "text-3xl"
														: "text-4xl"
												}`
									}
								>
									{firstName}
								</span>

								{secondName && (
									<span
										className={`font-bold uppercase ${
											secondName.length > 10
												? "text-3xl"
												: "text-4xl"
										}`}
									>
										{secondName}
									</span>
								)}
							</span>
							<div className="flex flex-col items-end gap-[2px]">
								<h2
									className={`font-semibold uppercase text-xs px-2 rounded leading-tight ${
										data.class === "classA"
											? "bg-f1-carbon text-white"
											: data.class === "classB"
												? "bg-f1-red text-white"
												: "bg-white text-f1-black"
									}`}
								>
									{/* {getClassLabel()} */}
								</h2>
								<p className="text-4xl italic mr-1">
									{data.num}
								</p>
							</div>
						</div>

						<div
							className="w-full h-1 z-30"
							style={{ backgroundColor: teamColor }}
						/>

						<div className="flex justify-between items-start w-full z-30">
							<div className="flex items-center gap-2 min-w-0">
								{data.teamName && (
									<>
										<p
											className="font-normal text-xl truncate"
											title={data.teamName}
										>
											{data.teamName}
										</p>
										{data.teamLogo && (
											<img
												className="h-5 w-auto object-contain"
												src={data.teamLogo}
												alt={`${data.teamName} logo`}
											/>
										)}
									</>
								)}
							</div>

							<img
								className="h-[30px] w-auto object-contain"
								src={tenant.logo.url}
								alt={`${tenant.name} Logo`}
							/>
						</div>
					</div>
				</div>
				{data.badge.length > 0 && (
					<Tooltip id="badge-tooltip" place="top" className="!z-60" />
				)}
				<Tooltip id="stat-tooltip" place="top" className="!z-60" />
			</div>
		);
	},
);

export default PlayerCard;
