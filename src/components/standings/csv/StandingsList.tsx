import React, { useState } from "react";
import StandingCard from "./StandingCard";
import Podium from "./Podium";

interface StandingsListProps {
	title: string;
	data: {
		name: string;
		[key: string]: string;
		photo: string;
		teamColor: string;
		teamName: string;
		teamDrivers: string;
	}[];
	valueKey: string;
	valueLabel: string;
	activeTab: "drivers" | "teams";
}

const StandingsList: React.FC<StandingsListProps> = ({
	title,
	data,
	valueKey,
	valueLabel,
	activeTab,
}) => {
	// Set the initial active card to 1 (the first card)
	const [activeCard, setActiveCard] = useState<number | null>(1);

	const handleCardClick = (index: number) => {
		// If the clicked card is already active, set it to null (inactive)
		setActiveCard((prev) => (prev === index ? null : index));
	};

	const topThree = data.slice(0, 3);

	return (
		<div>
			<h2 className="font-f1Title uppercase tracking-widest text-white text-lg md:text-xl text-center my-10">
				Classificação {title}
			</h2>

			<Podium topThree={topThree} activeTab={activeTab} />

			<ul className="flex flex-col gap-y-[4px]">
				{data.map((item, index) => (
					<li key={index}>
						<StandingCard
							name={item.name}
							position={index + 1}
							valueKey={item[valueKey]}
							valueLabel={valueLabel}
							photo={item.photo || ""}
							teamName={item.teamName || ""}
							teamColor={item.teamColor || ""}
							teamDrivers={item.drivers || ""}
							activeTab={activeTab}
							isActive={activeCard === index + 1}
							onClick={() => handleCardClick(index + 1)}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default StandingsList;
