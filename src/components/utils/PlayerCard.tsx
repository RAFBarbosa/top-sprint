import { forwardRef } from "react";
import bgCard from "/src/assets/img/bg-card.jpg";
import Logo from "/src/assets/img/logo.png";
import { DoubleArrowOutlined as MenuArrow } from "@mui/icons-material";

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
	};
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
		].some((value) => value && value > 1);

		const isCrystalBorder = hasSpecialAchievement && Math.random() < 0.01;

		const borderColor = isCrystalBorder
			? "repeating-linear-gradient(145deg, #b3f0ff, #a0e7f5 10%, #b2fff5 20%, #aaf2d5 30%, #aaf2aa 40%, #d7ff8f 50%, #fff5b3 60%, #ffe0a0 70%, #ffb3a0 80%, #e0aaff 90%)"
			: parseFloat(data.rating) >= 90
			? "repeating-linear-gradient(145deg, #ffd700, #e6c200 15%, #b88a00 20%)" // Golden border
			: parseFloat(data.rating) >= 80
			? "repeating-linear-gradient(145deg, #c0c0c0, #a8a8a8 15%, #8c8c8c 20%)" // Silver border
			: "repeating-linear-gradient(145deg, #cd7f32, #c0802d 15%, #a6672a 20%)"; // Bronze border

		return (
			<div
				ref={ref}
				className="text-white tracking-wider overflow-hidden w-[340px] h-[440px] rounded-lg p-[10px]"
				style={{
					fontFamily: `'Titillium Web Local', sans-serif`,
					// boxShadow: `inset 0 0 2px 2px rgba(0, 0, 0, 0.1)`,
					boxShadow: `rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px`,
					background: `${borderColor}`,
				}}
			>
				<div className="bg-black relative w-full h-full flex flex-col justify-between">
					{/* Background images */}
					<img
						className="object-cover absolute top-0 left-0 h-full opacity-70"
						src={bgCard}
						alt={`${bgCard}'s photo`}
					/>

					{/* Borders */}
					<div className={`top-0 left-0 rounded-lg`}>
						<div
							className={`absolute top-0 left-0 w-full h-full z-35`}
							style={{
								boxShadow:
									"inset 0 0 2px 3px rgba(0, 0, 0, 0.4)",
								WebkitBoxShadow:
									"inset 0 0 2px 3px rgba(0, 0, 0, 0.4)",
							}}
						/>
					</div>

					{/* Driver stats */}
					<div className="w-auto relative px-6 py-3 ml-2 flex flex-col font-semibold">
						{/* Team color border */}
						<div
							className="w-55 h-53 absolute top-0 left-3 border-t-4 border-l-4 rounded-tl-lg z-20"
							style={{ borderColor: teamColor }}
						/>
						<span className="flex flex-col mb-4 leading-3 z-30">
							<p>Nota Geral</p>

							<div className="flex items-center">
								<p className="text-5xl font-bold">
									{data.rating}
								</p>
								{data.rating !== data.prevRating && (
									<span
										className={`
											${data.rating > data.prevRating ? "text-green-500" : "text-red-500"}`}
									>
										{data.rating > data.prevRating ? (
											<MenuArrow
												className="rotate-270"
												fontSize="medium"
											/>
										) : (
											<MenuArrow
												className="rotate-90"
												fontSize="medium"
											/>
										)}
									</span>
								)}
							</div>
						</span>
						<span className="flex gap-1 items-baseline z-30 ">
							<p className="font-bold text-2xl">
								{data.experience}
							</p>
							<p>Experiência TSL</p>
						</span>
						<span className="flex gap-1 items-baseline z-30 ">
							<p className="font-bold text-2xl">
								{data.racecraft}
							</p>
							<p>Pilotagem</p>
						</span>

						<span className="flex gap-1 items-baseline z-30">
							<p className="font-bold text-2xl">
								{data.awareness}
							</p>
							<p>Atenção</p>
						</span>
						<span className="flex gap-1 items-baseline z-30 ">
							<p className="font-bold text-2xl">{data.pace}</p>
							<p>Ritmo</p>
						</span>
					</div>

					{/* Player photo */}
					<div className="overflow-hidden absolute z-20 top-0 right-0 h-[330px] w-auto">
						<img
							className="object-cover translate-x-[80px] translate-y-[15px]"
							src={data.photo}
							alt={`${data.name}'s photo`}
						/>
					</div>

					{/* Driver Info */}
					<div
						className={
							"text-white px-4 py-5 h-[150px] flex flex-col gap-2 justify-end bg-linear-0 from-f1-carbon to-f1-silver z-30 relative"
						}
						style={{
							boxShadow: `0 -10px 10px -5px rgba(0, 0, 0, .5)`,
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
									} `}
								>
									{data.grid === "gridA"
										? "Grid A"
										: data.grid === "gridB"
										? "Grid B"
										: data.grid === "reserva"
										? "Reserva"
										: "Ex-Piloto"}
								</h2>
								<p className="text-4xl">{data.num}</p>
							</div>
						</div>

						{/* Team color bar */}
						<div
							className="w-full h-1"
							style={{ backgroundColor: teamColor }}
						/>

						{/* Team name and tsl logo */}
						<div className="flex items-start justify-between">
							<p className="font-regular text-xl">
								{data.teamName}
							</p>
							<img
								className="object-cover h-[30px] pt-2"
								src={Logo}
								alt={`${Logo}'s photo`}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
);

export default PlayerCard;
