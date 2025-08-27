import { useState, useEffect } from "react";
import { StandingCard } from "./StandingCard";
import { Podium } from "./Podium";
import { Skeleton } from "@mui/material";
import { StandingsTabs } from "./StandingsTabs";

interface StandingsListProps {
	title: string;
	data: any[];
	drivers: any[];
	teams: any[];
	valueKey: string;
	valueLabel: string;
	activeTab: "gridA" | "gridB";
	oldData?: any[];
	oldDrivers?: any[];
	oldTeams?: any[];
}

export function StandingsList(props: StandingsListProps) {
	const [activeCard, setActiveCard] = useState<number | null>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [activeGrid, setActiveGrid] = useState<"gridA" | "gridB">("gridA"); // New state for active grid
	const [activeStandingTab, setActiveClass] = useState<"drivers" | "teams">(
		"drivers"
	);

	useEffect(() => {
		if (props.data.length > 0) {
			setIsLoading(false);
		}
	}, [props.data]);

	const handleCardClick = (index: number) => {
		setActiveCard((prev) => (prev === index ? null : index));
	};

	const classAData = props.data.filter((item) => item.class === "classA");
	const classBData = props.data.filter((item) => item.class === "classB");

	// List from 4th to 10th for larger screens (md and above)
	const gridADataLarge = classAData.slice(3);
	const gridBDataLarge = classBData.slice(3);

	const topTeams = props.data.slice(0, 3);

	if (isLoading) {
		return (
			<div className="text-white text-center mt-15">
				<div className="px-3 w-full md:max-w-screen-xl mx-auto">
					<div className="my-4">
						<div className="flex flex-col md:flex-row gap-y-2 md:gap-x-4">
							<Skeleton
								animation="wave"
								variant="rounded"
								height={600}
								sx={{ width: "100%" }}
							/>
							<Skeleton
								animation="wave"
								variant="rounded"
								height={600}
								sx={{ width: "100%" }}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<h2 className="font-f1Title uppercase tracking-widest text-white text-lg md:text-xl text-center my-10">
				Classificação {props.title}
			</h2>
			{/* <StandingsTabs
				activeGrid={activeGrid}
				setActiveGrid={setActiveGrid}
			/> */}
			{props.activeTab === "gridA" || "gridB" ? (
				<div className="w-full mx-auto md:flex md:justify-between md:items-center md:gap-6 pt-8">
					{/* Grid selector buttons for mobile */}
					<div className="block md:hidden">
						<div className="flex justify-around items-center font-f1Title">
							<button
								onClick={() => setActiveClass("drivers")}
								className={`px-6 py-3 uppercase text-xs tracking-widest transition-all duration-200 ${
									activeStandingTab === "drivers"
										? "text-white border-b-f1-red border-b-2 border-t-2 border-t-f1-red/0"
										: "text-gray-400 border-b-f1-red/0 border-b-2 border-t-2 border-t-f1-red/0"
								}`}
							>
								Classe A
							</button>
							<div className="w-[1px] bg-white/50 h-5" />
							<button
								onClick={() => setActiveClass("teams")}
								className={`px-6 py-3 uppercase text-xs tracking-widest transition-all duration-200 ${
									activeStandingTab === "teams"
										? "text-white border-b-f1-red border-b-2 border-t-2 border-t-f1-red/0"
										: "text-gray-400 border-b-f1-red/0 border-b-2 border-t-2 border-t-f1-red/0"
								}`}
							>
								Classe B
							</button>
						</div>
					</div>

					<div className="md:flex-1 md:max-w-1/2">
						<h2 className="hidden md:block font-f1Title uppercase tracking-widest text-white text-xs md:text-base text-center">
							Classe A
						</h2>

						{/* Podium for top 3 drivers - always visible on desktop */}
						{classAData.length > 0 && (
							<Podium
								topThree={classAData.slice(0, 3)}
								activeTab={props.activeTab}
								grid={classAData[0].grid}
								class={classAData[0].class}
								newData={props.data}
								oldData={props.oldData || []}
							/>
						)}

						{/* Show only active grid on mobile */}
						<div className="md:hidden">
							{activeStandingTab === "drivers" && (
								<ul className="flex flex-col gap-y-[2px] mt-6">
									{classAData.map((item, index) => (
										<li key={`drivers-${index}`}>
											<StandingCard
												name={item.name}
												position={index + 1}
												valueKey={item[props.valueKey]}
												valueLabel={props.valueLabel}
												grid={props.activeTab}
												class={item.class}
												standingTab={"drivers"}
												photo={item.photo || ""}
												teamName={item.teamName || ""}
												teamLogo={item.teamLogo || ""}
												teamColor={item.teamColor || ""}
												teamDrivers={item.drivers || ""}
												activeTab={props.activeTab}
												isActive={
													activeCard === index + 1
												}
												onClick={() =>
													handleCardClick(index + 1)
												}
												newData={props.data}
												oldData={props.oldData || []}
											/>
										</li>
									))}
								</ul>
							)}
							{activeStandingTab === "teams" && (
								<ul className="flex flex-col gap-y-[2px] mt-6">
									{classAData.map((item, index) => (
										<li key={`teams-${index}`}>
											<StandingCard
												name={item.name}
												position={index + 1}
												valueKey={item[props.valueKey]}
												valueLabel={props.valueLabel}
												grid={props.activeTab}
												standingTab={"teams"}
												photo={item.photo || ""}
												teamName={item.teamName || ""}
												teamLogo={item.teamLogo || ""}
												teamColor={item.teamColor || ""}
												teamDrivers={item.drivers || ""}
												activeTab={props.activeTab}
												isActive={
													activeCard === index + 1
												}
												onClick={() =>
													handleCardClick(index + 1)
												}
												newData={props.data}
												oldData={props.oldData || []}
											/>
										</li>
									))}
								</ul>
								// <ul className="flex flex-col gap-y-[2px] mt-6">
								// 	{classBData.map((item, index) => (
								// 		<li key={`classB-${index}`}>
								// 			<StandingCard
								// 				name={item.name}
								// 				position={index + 1}
								// 				valueKey={item[props.valueKey]}
								// 				valueLabel={props.valueLabel}
								// 				grid={"gridB"}
								// 				photo={item.photo || ""}
								// 				teamName={item.teamName || ""}
								// 				teamLogo={item.teamLogo || ""}
								// 				teamColor={item.teamColor || ""}
								// 				teamDrivers={item.drivers || ""}
								// 				activeTab={props.activeTab}
								// 				isActive={
								// 					activeCard === index + 1
								// 				}
								// 				onClick={() =>
								// 					handleCardClick(index + 1)
								// 				}
								// 				newData={props.data}
								// 				oldData={props.oldData || []}
								// 			/>
								// 		</li>
								// 	))}
								// </ul>
							)}
						</div>

						{/* List from 4th to 10th for larger screens */}
						<ul className="hidden md:flex flex-col gap-y-[2px] mt-6 md:mt-0">
							{gridADataLarge.map((item, index) => (
								<li key={`heat-large-${index}`}>
									<StandingCard
										name={item.name}
										position={index + 4}
										valueKey={item[props.valueKey]}
										valueLabel={props.valueLabel}
										grid={props.activeTab}
										class={item.class}
										standingTab={"drivers"}
										photo={item.photo || ""}
										teamName={item.teamName || ""}
										teamLogo={item.teamLogo || ""}
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

					<div className="hidden md:block md:flex-1 md:max-w-1/2 mt-10 md:mt-0">
						<h2 className="font-f1Title uppercase tracking-widest text-f1-text md:text-white text-xs md:text-base text-center">
							Classe B
						</h2>

						{/* Podium for top 3 drivers - always visible on desktop */}
						{classBData.length > 0 && (
							<Podium
								topThree={classBData.slice(0, 3)}
								activeTab={props.activeTab}
								grid={classBData[0].grid}
								class={classBData[0].class}
								newData={props.data}
								oldData={props.oldData || []}
							/>
						)}

						{/* List from 4th to 10th for larger screens */}
						<ul className="hidden md:flex flex-col gap-y-[2px] mt-6 md:mt-0">
							{gridBDataLarge.map((item, index) => (
								<li key={`gridA-large-${index}`}>
									<StandingCard
										name={item.name}
										position={index + 4}
										valueKey={item[props.valueKey]}
										valueLabel={props.valueLabel}
										grid={props.activeTab}
										class={item.class}
										photo={item.photo || ""}
										teamName={item.teamName || ""}
										teamLogo={item.teamLogo || ""}
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
			) : (
				""
			)}
		</>
	);
}
