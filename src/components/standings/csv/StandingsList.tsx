import { useState } from "react";
import { StandingCard } from "./StandingCard";
import { Podium } from "./Podium";
import GenericLogo from "/src/assets/img/white-logo.png";

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

export function StandingsList(props: StandingsListProps) {
	const [activeCard, setActiveCard] = useState<number | null>(1);

	const handleCardClick = (index: number) => {
		setActiveCard((prev) => (prev === index ? null : index));
	};

	const topThree = props.data.slice(0, 3);

	return (
		<div>
			<h2 className="font-f1Title uppercase tracking-widest text-white text-lg md:text-xl text-center my-10">
				Classificação {props.title}
			</h2>

			<Podium topThree={topThree} activeTab={props.activeTab} />

			<ul className="flex flex-col gap-y-[4px]">
				{props.data.map((item, index) => (
					<li key={index}>
						<StandingCard
							name={item.name}
							position={index + 1}
							valueKey={item[props.valueKey]}
							valueLabel={props.valueLabel}
							photo={item.photo || GenericLogo}
							teamName={item.teamName || ""}
							teamColor={item.teamColor || ""}
							teamDrivers={item.drivers || ""}
							activeTab={props.activeTab}
							isActive={activeCard === index + 1}
							onClick={() => handleCardClick(index + 1)}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
