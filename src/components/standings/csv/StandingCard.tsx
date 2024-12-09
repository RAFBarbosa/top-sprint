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
	isActive: boolean;
	onClick: () => void;
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
	isActive,
	onClick,
}) => {
	const nameParts = name.split(" ");
	const firstName = nameParts[0];
	const secondName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

	const isDrivers = activeTab === "drivers";

	return (
		<button
			onClick={onClick}
			className="tracking-wide overflow-hidden w-full cursor-pointer"
		>
			{/* <div className="tracking-wide overflow-hidden"> */}
			<div
				className={`flex justify-around p-4 items-center relative ${
					isActive
						? "bg-f1-silver text-white rounded-md md:bg-white md:text-f1-text h-32 md:h-auto"
						: "bg-white rounded-md"
				} `}
			>
				<div className="flex items-center flex-grow z-30 h-full ">
					<span
						className={`font-bold md:text-lg ${
							isActive && "text-xl"
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
							isActive ? "text-3xl leading-8" : "text-lg"
						}`}
					>
						<div
							className={`${
								isDrivers &&
								isActive &&
								"flex flex-col md:flex-row items-start"
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
									className={`
										font-bold md:ml-1 
										${isDrivers ? "uppercase" : "ml-1"} 
										${!isActive && "ml-1"}`}
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
						isActive && "self-end"
					}
					}`}
				>
					<span className="font-bold">{valueKey}</span>{" "}
					{valueKey === "1" ? "PT" : valueLabel}
				</div>

				{isActive && (
					<div className="absolute top-0 right-0 bottom-0 flex justify-end items-end z-10 md:hidden">
						{/* Image Container */}
						<div className="relative w-full h-full">
							{/* The Image */}
							<img
								src={photo}
								alt={`${name} foto`}
								style={{
									objectFit: "cover",
									width: isDrivers
										? "auto" // Image width for drivers
										: "100%", // Teams section width
									height: isDrivers ? "130%" : "140%", // Teams section height
									maxWidth: "100%", // Prevent overflow horizontally
									maxHeight: "150%", // Prevent overflow vertically
									transform: isDrivers
										? "translateY(7%)"
										: "translateY(-6%) translateX(15%)", // Adjustment for driver and teams
								}}
							/>

							{/* Silver Background Div */}
							{!isDrivers && (
								<div
									className="lg:hidden absolute bg-f1-silver rounded-tl-lg"
									style={{
										width: "60%", // Adjust this to fit desired coverage
										height: "30%", // Adjust this to fit desired coverage
										top: 0, // Position relative to top of the image
										left: 40, // Position relative to left of the image
									}}
								></div>
							)}
						</div>
					</div>
				)}
			</div>
			{/* </div> */}
		</button>
	);
};

export default StandingCard;
