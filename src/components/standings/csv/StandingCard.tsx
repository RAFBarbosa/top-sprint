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
		<div className="tracking-wide">
			<div
				className={`flex justify-around p-4 items-center relative ${
					isFirst
						? `bg-f1-silver text-white rounded-md md:bg-white md:text-f1-text h-32 md:h-auto ${
								!isDrivers ? "items-end" : ""
						  }`
						: "bg-white rounded-md"
				} `}
			>
				<div className="flex items-center flex-grow">
					<span
						className={`font-bold md:text-lg ${
							isFirst ? "text-xl" : ""
						}`}
					>
						{position}
					</span>
					<span
						className="mx-2 w-1 self-stretch"
						style={{ backgroundColor: teamColor }}
					></span>
					<div
						className={`flex flex-col md:flex-row text-lg items-baseline ${
							isFirst ? "text-xl" : ""
						}`}
					>
						<div>
							<span
								className={`${
									isDrivers
										? secondName
											? "font-semibold"
											: "font-bold uppercase"
										: "font-bold"
								}`}
							>
								{firstName}
							</span>
							{secondName && (
								<span
									className={`font-bold ${
										isDrivers ? "uppercase" : ""
									} ml-1`}
								>
									{secondName}
								</span>
							)}
						</div>

						<span className="md:ml-2 font-regular text-sm">
							{isDrivers
								? teamName
								: Array.isArray(teamDrivers)
								? teamDrivers.join(" / ")
								: teamDrivers || "No drivers"}
						</span>
					</div>
				</div>

				<div
					className={`bg-f1-bg-silver rounded-xl px-2 text-f1-text ${
						isFirst ? "self-end" : ""
					}`}
				>
					<span className="font-bold">{valueKey}</span> {valueLabel}
				</div>

				{isFirst ? (
					<img
						src={photo}
						alt={`${name} foto`}
						className={`absolute w-full h-auto ${
							isDrivers
								? `right-[-25px] ${
										position === 1 ? "top-0" : ""
								  }`
								: ""
						}`}
					/>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default StandingCard;
