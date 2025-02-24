import { useState, useEffect } from "react";
import { StandingCard } from "./StandingCard";
import { Podium } from "./Podium";

interface StandingsListProps {
	title: string;
	data: any[];
	valueKey: string;
	valueLabel: string;
	activeTab: "drivers" | "teams";
	oldData?: any[];
}

export function StandingsList(props: StandingsListProps) {
	const [activeCard, setActiveCard] = useState<number | null>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	// Set loading state based on data availability
	useEffect(() => {
		if (props.data.length > 0) {
			setIsLoading(false);
		}
	}, [props.data]);

	const handleCardClick = (index: number) => {
		setActiveCard((prev) => (prev === index ? null : index));
	};

	// Full list (1st to 10th) for small screens
	const gridAData = props.data.filter((item) => item.grid === "gridA");
	const gridBData = props.data.filter((item) => item.grid === "gridB");

	// List from 4th to 10th for larger screens (md and above)
	const gridADataLarge = gridAData.slice(3); // Skip the first 3 items
	const gridBDataLarge = gridBData.slice(3); // Skip the first 3 items

	const topTeams = props.data.slice(0, 3);

	if (isLoading) {
		return <div className="text-white text-center">Carregando...</div>;
	}

	return (
		<>
			<h2 className="font-f1Title uppercase tracking-widest text-white text-lg md:text-xl text-center my-10">
				Classificação {props.title}
			</h2>

			{props.activeTab === "drivers" && (
				<div className="w-full mx-auto md:flex md:justify-between md:items-center md:gap-6">
					<div className="md:flex-1 md:max-w-1/2">
						<h2 className="font-f1Title uppercase tracking-widest text-white text-xs md:text-base text-center">
							Grid A
						</h2>

						{/* Podium for top 3 drivers */}
						{gridAData.length > 0 && (
							<Podium
								topThree={gridAData.slice(0, 3)}
								activeTab={props.activeTab}
								grid={gridAData[0].grid}
								newData={props.data}
								oldData={props.oldData || []}
							/>
						)}

						{/* Full list (1st to 10th) for small screens */}
						<ul className="flex flex-col gap-y-1 mt-6 md:mt-0 md:hidden">
							{gridAData.map((item, index) => (
								<li key={`gridA-${index}`}>
									<StandingCard
										name={item.name}
										position={index + 1}
										valueKey={item[props.valueKey]}
										valueLabel={props.valueLabel}
										grid={"gridA"}
										photo={item.photo || ""}
										teamName={item.teamName || ""}
										teamColor={item.teamColor || ""}
										teamDrivers={item.drivers || ""}
										activeTab={props.activeTab}
										isActive={activeCard === index + 1}
										onClick={() =>
											handleCardClick(index + 1)
										}
										newData={props.data}
										oldData={props.oldData || []}
									/>
								</li>
							))}
						</ul>

						{/* List from 4th to 10th for larger screens */}
						<ul className="hidden md:flex flex-col gap-y-1 mt-6 md:mt-0">
							{gridADataLarge.map((item, index) => (
								<li key={`gridA-large-${index}`}>
									<StandingCard
										name={item.name}
										position={index + 4} // Start from 4th position
										valueKey={item[props.valueKey]}
										valueLabel={props.valueLabel}
										grid={"gridA"}
										photo={item.photo || ""}
										teamName={item.teamName || ""}
										teamColor={item.teamColor || ""}
										teamDrivers={item.drivers || ""}
										activeTab={props.activeTab}
										isActive={activeCard === index + 4}
										onClick={() =>
											handleCardClick(index + 4)
										}
										newData={props.data}
										oldData={props.oldData || []}
									/>
								</li>
							))}
						</ul>
					</div>

					<div className="md:flex-1 md:max-w-1/2 mt-10 md:mt-0">
						<h2 className="font-f1Title uppercase tracking-widest text-f1-text md:text-white text-xs md:text-base text-center">
							Grid B
						</h2>

						{/* Podium for top 3 drivers */}
						{gridBData.length > 0 && (
							<Podium
								topThree={gridBData.slice(0, 3)}
								activeTab={props.activeTab}
								grid={gridBData[0].grid}
								newData={props.data}
								oldData={props.oldData || []}
							/>
						)}

						{/* Full list (1st to 10th) for small screens */}
						<ul className="flex flex-col gap-y-1 mt-6 md:mt-0 md:hidden">
							{gridBData.map((item, index) => (
								<li key={`gridB-${index}`}>
									<StandingCard
										name={item.name}
										position={index + 1}
										valueKey={item[props.valueKey]}
										valueLabel={props.valueLabel}
										grid={"gridB"}
										photo={item.photo || ""}
										teamName={item.teamName || ""}
										teamColor={item.teamColor || ""}
										teamDrivers={item.drivers || ""}
										activeTab={props.activeTab}
										isActive={activeCard === index + 1}
										onClick={() =>
											handleCardClick(index + 1)
										}
										newData={props.data}
										oldData={props.oldData || []}
									/>
								</li>
							))}
						</ul>

						{/* List from 4th to 10th for larger screens */}
						<ul className="hidden md:flex flex-col gap-y-1 mt-6 md:mt-0">
							{gridBDataLarge.map((item, index) => (
								<li key={`gridB-large-${index}`}>
									<StandingCard
										name={item.name}
										position={index + 4} // Start from 4th position
										valueKey={item[props.valueKey]}
										valueLabel={props.valueLabel}
										grid={"gridB"}
										photo={item.photo || ""}
										teamName={item.teamName || ""}
										teamColor={item.teamColor || ""}
										teamDrivers={item.drivers || ""}
										activeTab={props.activeTab}
										isActive={activeCard === index + 4}
										onClick={() =>
											handleCardClick(index + 4)
										}
										newData={props.data}
										oldData={props.oldData || []}
									/>
								</li>
							))}
						</ul>
					</div>
				</div>
			)}

			{props.activeTab === "teams" && (
				<div className="max-w-[950px] mx-auto">
					{topTeams.length > 0 && (
						<Podium
							topThree={topTeams}
							activeTab={props.activeTab}
							newData={props.data}
							oldData={props.oldData || []}
						/>
					)}

					<ul className="flex flex-col gap-y-1">
						{props.data.map((item, index) => (
							<li key={`team-${index}`}>
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
									newData={props.data}
									oldData={props.oldData || []}
								/>
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
}
