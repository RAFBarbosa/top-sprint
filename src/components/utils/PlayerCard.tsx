import { forwardRef } from "react";
import bgCard from "/src/assets/img/bg-card.jpg";
import Logo from "/src/assets/img/logo.png";

interface PlayerCardProps {
	data: {
		name: string;
		number: string;
		racecraft: string;
		awareness: string;
		pace: string;
		experience: string;
		rating: string;
		photo: string;
		teamColor: string;
		teamName: string;
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

		const borderColor =
			parseFloat(data.rating) >= 90
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
					boxShadow: `inset 0 0 2px 2px rgba(0, 0, 0, 0.1)`,
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
							style={
								{
									boxShadow:
										"inset 0 0 2px 3px rgba(0, 0, 0, 0.4)",
									"-webkit-box-shadow":
										"inset 0 0 2px 3px rgba(0, 0, 0, 0.4)", // webkit fallback
								} as React.CSSProperties // Explicit cast here
							}
						/>
					</div>

					{/* Driver stats */}
					<div className="w-auto relative px-6 py-3 ml-2 flex flex-col font-semibold">
						{/* Team color border */}
						<div
							className="w-55 h-53 absolute top-0 left-3 border-t-4 border-l-4 rounded-tl-lg z-20"
							style={{ borderColor: data.teamColor }}
						></div>
						<span className="flex flex-col mb-4 leading-3 z-30">
							<p>Nota Geral</p>
							<p className="text-5xl font-bold">{data.rating}</p>
						</span>
						<span className="flex gap-1 items-baseline z-30 ">
							<p className="font-bold text-2xl">
								{data.racecraft}
							</p>
							<p>Pilotagem</p>
						</span>
						<span className="flex gap-1 items-baseline z-30 ">
							<p className="font-bold text-2xl">
								{data.experience}
							</p>
							<p>Experiência</p>
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
						className={`text-white px-4 py-6 h-[150px] flex flex-col gap-2 justify-end bg-linear-0 from-f1-carbon to-f1-silver z-30 relative`}
						style={{
							boxShadow: `0 -10px 10px -5px rgba(0, 0, 0, .5)`,
						}}
					>
						<div className="flex items-center justify-between font-regular">
							<span className="flex flex-col text-2xl leading-4 ">
								<span
									className={
										secondName
											? ""
											: "font-bold uppercase text-3xl"
									}
								>
									{firstName}
								</span>
								{secondName && (
									<span className="font-bold uppercase text-3xl">
										{secondName}
									</span>
								)}
							</span>
							<p className="text-4xl self-end">{data.num}</p>
						</div>

						{/* Team color bar */}
						<div
							className="w-full h-1"
							style={{ backgroundColor: data.teamColor }}
						></div>

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
