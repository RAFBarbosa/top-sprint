import { useState } from "react";
import { StandingCard } from "./StandingCard";
import { Podium } from "./Podium";
import { ArrowForwardIos as MenuArrow } from "@mui/icons-material";
import GenericLogo from "../../assets/generic-logo.png";

interface StandingsListProps {
	title: string;
	data: any[];
	valueKey: string;
	valueLabel: string;
	activeTab: "drivers" | "teams";
}

export function StandingsList(props: StandingsListProps) {
	const [activeCard, setActiveCard] = useState<number | null>(1);
	const [showAll, setShowAll] = useState<boolean>(false);

	const handleCardClick = (index: number) => {
		setActiveCard((prev) => (prev === index ? null : index));
	};

	const topThree = props.data.slice(0, 3);
	const displayedData = showAll ? props.data : props.data.slice(0, 10);

	return (
		<div>
			<h2 className="font-f1Title uppercase tracking-widest text-white text-lg md:text-xl text-center my-10">
				Classificação {props.title}
			</h2>

			<Podium topThree={topThree} activeTab={props.activeTab} />

			<ul className="flex flex-col gap-y-[4px]">
				{displayedData.map((item, index) => (
					<li key={index}>
						<StandingCard
							name={item.name}
							position={index + 1}
							valueKey={item[props.valueKey]}
							valueLabel={props.valueLabel}
							photo={item.photo || ""}
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

			{!showAll && props.data.length > 10 && (
				<div className="flex justify-center mt-4">
					<button
						onClick={() => setShowAll(true)}
						className="px-4 py-2 bg-f1-red text-white rounded w-full md:w-auto mx-auto hover:bg-transparent cursor-pointer border-2 border-f1-red hover:text-f1-text transition-colors duration-200 flex justify-center items-center gap-2"
					>
						<div className="text-xs uppercase font-semibold flex items-center gap-2">
							Ver Classificação Completa
							<MenuArrow fontSize="inherit" />
						</div>
					</button>
				</div>
			)}
		</div>
	);
}
