import { forwardRef } from "react";
import { HygraphImg } from "./HygraphImg";
import { Tooltip } from "react-tooltip";
import { tenant } from "../../shared/config/tenants";
import Flag from "react-world-flags";
import { COUNTRY_CODE_MAP } from "../../shared/constants/countryCodeMap";
import { resizeHygraphUrl } from "../../shared/utils/hygraphImage";

import bgRatingShape from "/src/assets/img/card-v2/bg-ratingshape.png";
import bgRatingBgShape from "/src/assets/img/card-v2/bg-ratingbgshape.png";
import bgRatingNameplate from "/src/assets/img/card-v2/bg-ratingnameplate.png";
import bgRatingNameplateTeam from "/src/assets/img/card-v2/bg-ratingnameplateteam.png";
import bgRatingNumberplate from "/src/assets/img/card-v2/bg-ratingnumberplate.png";
import bgStatsDivider from "/src/assets/img/card-v2/bg-statsdivider.png";
import { useTab } from "../../contexts/TabContext";

interface PlayerCardProps {
	data: {
		name: string;
		num: string;
		racecraft: string;
		awareness: string;
		pace: string;
		consistency: string;
		rating: string;
		prevRating: string;
		photo: string;
		teamColor: string;
		teamName: string;
		teamLogo: string;
		realLifeTeamLogoUrl?: string;
		nationality?: string;
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
	if (typeof title !== "string" || !title.trim()) return "";
	const spaced = title
		.replace(/([A-Z][a-z]+)/g, " $1")
		.replace(/([A-Z]+)/g, " $1")
		.trim();
	return spaced
		.toLowerCase()
		.split(" ")
		.filter((word) => word)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

function getTextColor(hexColor: string): string {
	if (!hexColor || hexColor === "#000000") return "#FFFFFF";

	// Remove the hash if it exists
	const hex = hexColor.replace("#", "");

	// Handle shorthand hex (e.g., "fff" -> "ffffff")
	const fullHex =
		hex.length === 3
			? hex
					.split("")
					.map((c) => c + c)
					.join("")
			: hex;

	const r = parseInt(fullHex.substring(0, 2), 16);
	const g = parseInt(fullHex.substring(2, 4), 16);
	const b = parseInt(fullHex.substring(4, 6), 16);

	// Calculate luminance using the correct formula
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

	// Use black for bright backgrounds (luminance > 0.5), white for dark backgrounds
	return luminance > 0.5 ? "#000000" : "#FFFFFF";
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
		const teamColor = data.teamColor || "#1a1a2e";
		const nameplateImg = data.realLifeTeamLogoUrl
			? bgRatingNameplateTeam
			: bgRatingNameplate;

		const hasSpecialAchievement = [
			data.stats?.championships,
			data.stats?.totalSprintWins,
			data.stats?.totalWins,
			data.stats?.totalWinsB,
		].some((value) => value && Number(value) > 1);

		const isCrystalBorder = hasSpecialAchievement && Math.random() < 0.01;

		const glowColor = isCrystalBorder
			? "#b3f0ff"
			: parseFloat(data.rating) >= 90
				? "#ffd700"
				: parseFloat(data.rating) >= 80
					? "#c0c0c0"
					: "#cd7f32";

		const borderGradient = isCrystalBorder
			? "repeating-linear-gradient(145deg, #b3f0ff, #a0e7f5 10%, #b2fff5 20%, #aaf2d5 30%, #aaf2aa 40%, #d7ff8f 50%, #fff5b3 60%, #ffe0a0 70%, #ffb3a0 80%, #e0aaff 90%)"
			: parseFloat(data.rating) >= 90
				? "repeating-linear-gradient(145deg, #ffd700, #e6c200 15%, #b88a00 20%)"
				: parseFloat(data.rating) >= 80
					? "repeating-linear-gradient(145deg, #c0c0c0, #a8a8a8 15%, #8c8c8c 20%)"
					: "repeating-linear-gradient(145deg, #cd7f32, #c0802d 15%, #a6672a 20%)";

		const ratingUp =
			data.prevRating &&
			data.rating &&
			parseFloat(data.rating) > parseFloat(data.prevRating);
		const ratingDown =
			data.prevRating &&
			data.rating &&
			parseFloat(data.rating) < parseFloat(data.prevRating);

		const stats = [
			{ label: "PIL", value: data.racecraft, tooltip: "Pilotagem" },
			{ label: "RIT", value: data.pace, tooltip: "Ritmo" },
			{ label: "ATN", value: data.awareness, tooltip: "Atenção" },
			{ label: "CON", value: data.consistency, tooltip: "Consistência" },
		];

		const isFirstNameLong = firstName.length > 9;
		const isSecondNameLong = secondName?.length > 9;
		const needsSmallFont = isFirstNameLong || isSecondNameLong;
		const nameSizeClass = needsSmallFont
			? "text-[clamp(12px,5.3vw,18px)]"
			: "text-[clamp(16px,5.3vw,22px)]";

		const { activeTab } = useTab();
		const gridColor = activeTab?.id
			? tenant.grids.find((grid) => grid.id === activeTab.id)
					?.primaryColor
			: "#eb1c24";

		const statsTextColor = getTextColor(gridColor);

		console.log(
			"Rating:",
			data.rating,
			"Previous Rating:",
			data.prevRating,
		);

		return (
			<div
				ref={ref}
				className="relative flex-shrink-0"
				style={{
					width: "clamp(300px, 95vw, 370px)",
					aspectRatio: "700 / 1000",
					// filter: `drop-shadow(0 8px 24px rgba(0,0,0,0.5)) drop-shadow(0 0 6px ${glowColor}66)`,
				}}
			>
				{/* Border gradient ring */}
				<div
					className="absolute inset-0 z-0"
					style={{
						backgroundColor: teamColor,
						WebkitMaskImage: `url(${bgRatingShape})`,
						maskImage: `url(${bgRatingShape})`,
						WebkitMaskSize: "100% 100%",
						maskSize: "100% 100%",
						WebkitMaskRepeat: "no-repeat",
						maskRepeat: "no-repeat",

						// subtle depth
						filter: `
			drop-shadow(0 1px 1px rgba(0,0,0,0.25))
			drop-shadow(0 -1px 1px rgba(255,255,255,0.08))
		`,

						// slight texture overlay
						backgroundImage: `
			radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25), transparent 40%),
			radial-gradient(circle at 70% 80%, rgba(0,0,0,0.25), transparent 45%)
		`,

						backgroundBlendMode: "overlay",
					}}
				/>

				{/* Main card surface */}
				<div
					className="absolute inset-2.5 z-10 overflow-hidden"
					style={{
						WebkitMaskImage: `url(${bgRatingShape})`,
						maskImage: `url(${bgRatingShape})`,
						WebkitMaskSize: "100% 100%",
						maskSize: "100% 100%",
						WebkitMaskRepeat: "no-repeat",
						maskRepeat: "no-repeat",
						backgroundColor: "#0d0d0d",
					}}
				>
					<div className="absolute inset-0">
						<div
							className="w-full h-full relative"
							style={{ background: teamColor }}
						>
							{/* Dark overlay for bright colors */}
							<div
								className="absolute inset-0"
								style={{
									background:
										"radial-gradient(circle at 30% 20%, rgba(0,0,0,0.2), rgba(0,0,0,0.3))",
									mixBlendMode: "multiply",
								}}
							/>
							<img
								src={bgRatingBgShape}
								alt=""
								aria-hidden="true"
								className="absolute inset-0 w-full h-full"
								style={{
									mixBlendMode: "overlay",
									opacity: 0.4,
								}}
							/>
						</div>
					</div>

					{/* {data.num && (
						<div className="absolute top-8 inset-x-0 mx-auto h-[40%] flex items-center justify-center opacity-15">
							<span
								className="text-8xl text-white font-f1Title font-black italic leading-none"
								style={{
									textShadow: `0 0 12px ${teamColor}`,
									// color: teamColor,
								}}
							>
								{data.num}
							</span>
						</div>
					)} */}

					{/* ── Layer 2: Driver photo ── */}
					{tenant.defaultPhotoStyle === "round" ? (
						<div
							className="absolute top-12 right-2 z-[20] overflow-hidden rounded-full border-4 border-white/20"
							style={{ width: "180px", height: "180px" }}
						>
							<HygraphImg
								className="w-full h-full object-cover object-center"
								src={data.photo || tenant.fallbackDriverPhoto}
								alt={data.name}
								imgWidth={120}
								imgHeight={120}
							/>
						</div>
					) : tenant.defaultPhotoStyle === "bust" ? (
						<div
							className="absolute top-4 left-25 z-[20] overflow-hidden"
							style={{ height: "auto", width: "80%" }}
						>
							<HygraphImg
								className="w-full h-full object-cover object-top"
								src={data.photo || tenant.fallbackDriverPhoto}
								alt={data.name}
								imgWidth={120}
								imgHeight={120}
							/>
						</div>
					) : (
						<div
							className="absolute top-1 left-5 z-[20] overflow-hidden"
							style={{ height: "auto", width: "125%" }}
						>
							<HygraphImg
								className="w-full h-full object-cover object-top"
								src={data.photo || tenant.fallbackDriverPhoto}
								alt={data.name}
								imgWidth={300}
								imgHeight={300}
							/>
						</div>
					)}

					{/* ── Rating number (top-left, above photo) ── */}
					<div
						className="absolute z-[30] flex flex-col items-center leading-none"
						style={{
							top: "18%",
							left:
								tenant.defaultPhotoStyle === "round"
									? "5%"
									: "11%",
						}}
					>
						<span className="text-xs font-semibold uppercase tracking-wider text-f1-bg-silver">
							Nota Geral
						</span>
						<div className="relative flex items-center justify-center mt-1">
							<div className="relative">
								{/* Invisible placeholder to maintain width */}
								<span className="invisible text-[clamp(22px,9vw,34px)] font-f1Title font-bold leading-none tracking-widest">
									99
								</span>
								{/* Actual rating number centered */}
								<span className="absolute inset-0 flex items-center justify-center text-[clamp(22px,9vw,34px)] font-f1Title font-bold leading-none tracking-widest drop-shadow-lg text-f1-bg-silver">
									{data.rating || "—"}
								</span>
							</div>

							{ratingUp && (
								<span
									className="absolute text-green-500 text-sm md:text-lg leading-none -right-4 md:-right-5 top-1/2 -translate-y-1/2"
									style={{
										WebkitTextStroke: "1px white",
									}}
								>
									▲
								</span>
							)}
							{ratingDown && (
								<span
									className="absolute text-f1-red text-sm md:text-lg leading-none -right-4 md:-right-5 top-1/2 -translate-y-1/2"
									style={{
										WebkitTextStroke: "1px white",
									}}
								>
									▼
								</span>
							)}
						</div>
					</div>

					{/* ── Layer 3: Nameplate (name + flag) ── */}
					<div className="absolute inset-0 z-[40]">
						{/* Container with the same mask as the nameplate */}
						<div
							className="absolute inset-0 w-full h-full"
							style={{
								WebkitMaskImage: `url(${nameplateImg})`,
								maskImage: `url(${nameplateImg})`,
								WebkitMaskSize: "100% 100%",
								maskSize: "100% 100%",
								WebkitMaskRepeat: "no-repeat",
								maskRepeat: "no-repeat",
							}}
						>
							<img
								src={nameplateImg}
								alt=""
								aria-hidden="true"
								className="w-full h-full object-fill"
							/>

							{/* Texture overlay - now masked to the nameplate shape */}
							<div
								className="absolute inset-0 w-full h-full pointer-events-none"
								style={{
									// background: linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(0,0,0,0.15) 100%)",
									background: `linear-gradient(180deg, ${teamColor}80 0%, ${teamColor}30 50%, rgba(0,0,0,0.3) 100%)`,
								}}
							/>
							{/* <div
								className="absolute inset-0 w-full h-full pointer-events-none"
								style={{
									background: `linear-gradient(135deg, ${teamColor}80 0%, ${teamColor}30 50%, rgba(0,0,0,0.3) 100%)`,
									mixBlendMode: "overlay",
								}}
							/> */}
						</div>

						<div
							className="absolute bottom-0 left- w-full z-10 flex flex-col pl-[4%] pr-[4%]"
							style={{ top: "49.3%" }}
						>
							<div className="flex flex-col items-start gap-4 w-full">
								<div className="flex items-center justify-between w-5/11">
									<div
										className="border rounded-xs border-white/75"
										style={{
											width: "clamp(45px, 15vw, 61px)",
											height: "clamp(23px, 7.8vw, 32px)",
										}}
									>
										<Flag
											code={
												data.nationality
													? COUNTRY_CODE_MAP[
															data.nationality
														] || "BR"
													: "BR"
											}
											style={{
												height: "100%",
												width: "100%",
												objectFit: "cover",
												objectPosition: "center",
											}}
										/>
									</div>
									{data.realLifeTeamLogoUrl && (
										<div
											className=""
											style={{
												width: "clamp(45px, 15vw, 61px)",
												height: "clamp(23px, 7.8vw, 32px)",
											}}
										>
											<HygraphImg
												className="w-full h-full object-contain"
												src={data.realLifeTeamLogoUrl}
												alt="Real life team logo"
												imgWidth={120}
												imgHeight={120}
												fit="clip"
											/>
										</div>
									)}
								</div>

								<div className="flex flex-col leading-none gap-1">
									<span
										className={`text-f1-bg-silver font-f1Title uppercase tracking-wider leading-none ${nameSizeClass}`}
									>
										{firstName}
									</span>
									{secondName && (
										<span
											className={`text-f1-bg-silver font-f1Title uppercase tracking-wider leading-none ${nameSizeClass}`}
										>
											{secondName}
										</span>
									)}
								</div>

								{/* ── Driver number (top-left below rating) ── */}
								{/* {data.num && (
									<div className="absolute top-6 right-5 opacity-15">
										<span
											className="text-8xl font-f1Title font-black italic leading-none"
											style={{
												textShadow: `0 0 12px ${teamColor}`,
												color: teamColor,
											}}
										>
											{data.num}
										</span>
									</div>
								)} */}

								{data.teamLogo && (
									<HygraphImg
										className="absolute top-6 right-5 h-24 w-auto object-contain opacity-10"
										src={data.teamLogo}
										alt={`${data.teamName} logo`}
										imgWidth={120}
										imgHeight={120}
										fit="clip"
									/>
								)}
							</div>
						</div>
					</div>

					<div className="absolute inset-0 w-full h-full z-[50] pointer-events-none opacity-60">
						<img
							src={bgStatsDivider}
							alt=""
							aria-hidden="true"
							className="w-full h-full object-fill"
						/>
					</div>

					{/* ── Layer 4: Stats bar (stats + team logo) ── */}
					<div className="absolute inset-0 z-[40]">
						<div
							className="absolute inset-0 w-full h-full"
							style={{
								backgroundColor: gridColor,
								WebkitMaskImage: `url(${bgRatingNumberplate})`,
								maskImage: `url(${bgRatingNumberplate})`,
								WebkitMaskSize: "100% 100%",
								maskSize: "100% 100%",
								WebkitMaskRepeat: "no-repeat",
								maskRepeat: "no-repeat",
							}}
						/>
						<div
							className="absolute bottom-4 right-2 w-full flex flex-col items-start justify-between px-[6%] pointer-events-auto"
							style={{ height: "21%" }}
						>
							<div className="flex w-full justify-between">
								{stats.map(({ label, value, tooltip }) => (
									<span
										key={label}
										className="flex flex-col items-center cursor-help leading-none flex-1"
										data-tooltip-id="stat-tooltip"
										data-tooltip-content={tooltip}
									>
										<span
											className="text-xs uppercase tracking-widest mb-0.5"
											style={{ color: statsTextColor }}
										>
											{label}
										</span>
										<span
											className="text-[clamp(19px,5.6vw,22px)] font-f1Title"
											style={{ color: statsTextColor }}
										>
											{value || "—"}
										</span>
									</span>
								))}
							</div>

							<div className="h-11 ml-2 w-auto">
								<img
									src={tenant.logo.url}
									alt={tenant.logo.alt}
									className="h-full w-auto object-contain"
								/>
							</div>
						</div>
					</div>

					{/* ── Badges ── */}
					{data.badge?.length > 0 && (
						<div className="absolute top-[36%] left-[3%] z-[60] flex gap-1">
							{data.badge.map((badge, index) => (
								<HygraphImg
									key={index}
									src={badge.url}
									alt={`Badge ${index + 1}`}
									imgWidth={40}
									imgHeight={40}
									fit="clip"
									data-tooltip-id="badge-tooltip"
									data-tooltip-content={formatBadgeTitle(
										data.badgeTitle?.toString() ?? "",
									)}
									className="w-12 h-12 object-contain cursor-help"
								/>
							))}
						</div>
					)}
				</div>

				{data.badge?.length > 0 && (
					<Tooltip
						id="badge-tooltip"
						place="top"
						className="!z-[80]"
					/>
				)}
				<Tooltip id="stat-tooltip" place="top" className="!z-[80]" />
			</div>
		);
	},
);

export default PlayerCard;
