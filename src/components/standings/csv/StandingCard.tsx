import React from "react";

// Define the prop types
interface StandingCardProps {
	position: number;
	name: string;
	photo: string;
	teamName?: string;
	teamColor?: string;
	teamDrivers?: string;
	valueKey: string;
	valueLabel: string;
	activeTab: "drivers" | "teams";
}

const StandingCard: React.FC<StandingCardProps> = ({
	position,
	name,
	photo,
	teamName,
	teamColor,
	teamDrivers,
	valueKey,
	valueLabel,
	activeTab,
}) => {
	const nameParts = name.split(" ");
	const firstName = nameParts[0];
	const secondName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

	const isDrivers = activeTab === "drivers";
	const isFirst = position === 1;

	return (
		<div className="tracking-wide overflow-hidden">
			<div
				className={`flex justify-around p-4 items-center relative ${
					isFirst
						? `bg-f1-silver text-white rounded-md md:bg-white md:text-f1-text h-32 md:h-auto ${
								!isDrivers && ""
						  }`
						: "bg-white rounded-md"
				} `}
			>
				<div className="flex items-center flex-grow z-30 h-full ">
					<span
						className={`font-bold md:text-lg ${
							isFirst && "text-xl"
						}`}
					>
						{position}
					</span>
					<span
						className="mx-2 w-1 self-stretch"
						style={{ backgroundColor: teamColor }}
					></span>
					<div
						className={`flex flex-col md:flex-row items-baseline md:text-lg h-full justify-between ${
							isFirst ? "text-3xl leading-8" : "text-lg"
						}`}
					>
						<div
							className={`${
								isDrivers &&
								isFirst &&
								"flex flex-col md:flex-row"
							}`}
						>
							<span
								className={`${
									isDrivers
										? secondName
											? "font-regular"
											: "font-bold uppercase"
										: "font-bold"
								}`}
							>
								{firstName}
							</span>
							{secondName && (
								<span
									className={`font-bold md:ml-1 ${
										isDrivers ? "uppercase" : "ml-1"
									} ${!isFirst && "ml-1"}`}
								>
									{secondName}
								</span>
							)}
						</div>

						<span className="md:ml-2 text-sm opacity-80">
							{isDrivers
								? teamName
								: Array.isArray(teamDrivers)
								? teamDrivers.join(" / ")
								: teamDrivers || "No drivers"}
						</span>
					</div>
				</div>

				<div
					className={`bg-f1-bg-silver rounded-xl px-2 text-f1-text z-30 ${
						isFirst && "self-end"
					}
					}`}
				>
					<span className="font-bold">{valueKey}</span>{" "}
					{valueKey === "1" ? "PT" : valueLabel}
				</div>

				{isFirst && (
					<div className="absolute top-0 right-0 bottom-0 flex justify-end items-end z-10 md:hidden">
						<img
							src={photo}
							alt={`${name} foto`}
							style={{
								objectFit: "cover",
								width: isDrivers
									? "auto" // Image width on drivers
									: "100%", // Teams section width
								height: isDrivers ? "100%" : "100%", // Teams height
								maxWidth: "100%", // Prevent image from overflowing horizontally
								maxHeight: "100%", // Prevent image from overflowing vertically
								transform: isDrivers
									? "translateY(30%)"
									: "translateY(21.5%) translateX(15%)", // Slight adjustment for first driver
							}}
						/>

						<div
							className={`bg-f1-silver w-6/8 h-7.5 absolute rounded-tl-lg top-0 left-0 ${
								isDrivers ? "hidden" : "block"
							}`}
						></div>
					</div>
				)}
			</div>
		</div>
	);
};

export default StandingCard;
