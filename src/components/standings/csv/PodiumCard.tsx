import React from "react";

interface PodiumCardProps {
	position: number;
	name: string;
	photo: string;
	teamColor?: string;
	teamDrivers?: string;
	activeTab: "drivers" | "teams";
}

const PodiumCard: React.FC<PodiumCardProps> = ({
	position,
	name,
	photo,
	teamColor,
	teamDrivers,
	activeTab,
}) => {
	const nameParts = name.split(" ");
	const firstName = nameParts[0];
	const secondName = nameParts.length > 1 && nameParts.slice(1).join(" ");

	const isDrivers = activeTab === "drivers";

	return (
		<div className="relative hidden md:flex flex-col justify-end overflow-hidden rounded-2xl h-[340px]">
			<div
				className={`ml-5 text-2xl font-f1Title hidden md:block ${
					position === 1
						? isDrivers
							? "mb-12"
							: "mb-16 ml-15 text-3xl"
						: "mb-7"
				}`}
				style={{ color: teamColor }}
			>
				{position}
			</div>

			<div
				className="w-full h-2 hidden md:block"
				style={{ backgroundColor: teamColor }}
			></div>

			{/* <img
				src={photo}
				alt={`${name} foto`}
				className={`absolute w-full h-auto ${
					isDrivers && `right-[-25px] ${position === 1 && "top-0"}`
				}`}
			/> */}

			<img
				src={photo}
				alt={`${name} foto`}
				className={`absolute object-cover max-w-none ${
					isDrivers
						? "bottom-0 right-0 h-[90%] w-auto translate-x-[8%] translate-y-[5%]"
						: "bottom-0 top-0 left-1/2 h-[110%] w-auto transform -translate-x-1/2 -translate-y-4"
				}`}
			/>

			<div
				className={`absolute bottom-0 bg-white w-full -z-10 rounded-2xl ${
					position === 1
						? isDrivers
							? "h-[calc(55%+20px)]"
							: "h-full"
						: "h-[55%]"
				}`}
			></div>

			<div className="text-white p-4 bg-f1-silver h-[90px] relative md:flex flex-col leading-4 tracking-wider justify-center hidden">
				<span
					className={`${
						isDrivers
							? secondName
								? "font-semibold"
								: "font-bold uppercase text-2xl"
							: "font-bold uppercase text-2xl text-center"
					}`}
				>
					{isDrivers
						? firstName
						: Array.isArray(teamDrivers)
						? teamDrivers.join(" / ")
						: teamDrivers || "No drivers"}
				</span>
				{secondName && isDrivers && (
					<span
						className={`font-bold ${
							isDrivers && "uppercase text-2xl"
						}`}
					>
						{secondName}
					</span>
				)}
			</div>
		</div>
	);
};

export default PodiumCard;
