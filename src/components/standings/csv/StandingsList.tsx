import { useState, useEffect } from "react";
import { StandingCard } from "./StandingCard";
import { Podium } from "./Podium";
import { Skeleton } from "@mui/material";
import { StandingsTabs } from "./StandingsTabs";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useSwipeable } from "react-swipeable";

interface StandingsListProps {
	title: string;
	data: any[];
	drivers: any[];
	teams: any[];
	valueKey: string;
	valueLabel: string;
	activeTab: "gridA" | "gridB";
	oldData?: any[];
	oldTeams?: any[];
}

export function StandingsList(props: StandingsListProps) {
	const [activeCard, setActiveCard] = useState<number | null>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [activeGrid, setActiveGrid] = useState<"drivers" | "teams">(
		"drivers"
	);
	const [activeStandingTab, setActiveClass] = useState<"classA" | "classB">(
		"classA"
	);

	const swipeHandlers = useSwipeable({
		onSwipedLeft: () => setActiveClass("classB"),
		onSwipedRight: () => setActiveClass("classA"),
		preventDefaultTouchmoveEvent: true,
		trackMouse: true,
	});

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
	const classATeams = props.teams.filter((item) => item.class === "classA");
	const classBTeams = props.teams.filter((item) => item.class === "classB");

	// List from 4th to 10th for larger screens (md and above)
	const gridADataLarge = classAData.slice(3);
	const gridBDataLarge = classBData.slice(3);
	const gridATeamsLarge = classATeams.slice(1);
	const gridBTeamsLarge = classBTeams.slice(1);

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
			<div className="w-full">
				<StandingsTabs
					activeGrid={activeGrid}
					setActiveGrid={setActiveGrid}
				/>
			</div>
			{props.activeTab === "gridA" || "gridB" ? (
				<div className="w-full mx-auto md:flex md:justify-between md:items-center md:gap-6 pt-8">
					{/* Grid selector buttons for mobile - NEW DESIGN */}
					<div className="block md:hidden">
						<div className="flex justify-center items-center font-f1Title mb-6">
							<button
								onClick={() => setActiveClass("classA")}
								className={`flex items-center p-1 rounded border-1 ${
									activeStandingTab === "classA"
										? "border-transparent text-transparent"
										: "text-f1-bg-silver border-f1-bg-silver"
								}`}
							>
								<ChevronLeftIcon className="h-7 w-7" />
							</button>

							{/* <div className="w-px bg-gray-500 h-6 mx-1"/> */}
							<span className="font-f1Title text-white uppercase text-xs mx-auto">
								{activeStandingTab === "classA"
									? "Classe A"
									: "Classe B"}
							</span>

							<button
								onClick={() => setActiveClass("classB")}
								className={`flex justify-end p-1 rounded border-1 ${
									activeStandingTab === "classB"
										? "border-transparent text-transparent"
										: "text-f1-bg-silver border-f1-bg-silver"
								}`}
							>
								<ChevronRightIcon className="h-7 w-7" />
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
								topThree={
									activeGrid === "drivers"
										? classAData.slice(0, 3)
										: classATeams.slice(0, 3)
								}
								activeTab={activeGrid}
								grid={classAData[0].grid}
								class={classAData[0].class}
								newData={
									activeGrid === "drivers"
										? props.data
										: props.teams
								}
								oldData={
									activeGrid === "drivers"
										? props.oldData
										: props.oldTeams
								}
							/>
						)}

						{/* Show only active grid on mobile */}
						<div className="md:hidden" {...swipeHandlers}>
							<div className="overflow-hidden">
								<div
									className="flex transition-transform duration-300 ease-in-out"
									style={{
										transform: `translateX(${
											activeStandingTab === "classA"
												? 0
												: -100
										}%)`,
									}}
								>
									{/* Class A Content */}
									<div className="w-full flex-shrink-0">
										{activeGrid === "drivers" ? (
											<ul className="flex flex-col gap-y-[2px]">
												{classAData.map(
													(item, index) => (
														<li
															key={`classA-${index}`}
														>
															<StandingCard
																name={item.name}
																position={
																	index + 1
																}
																valueKey={
																	item[
																		props
																			.valueKey
																	]
																}
																valueLabel={
																	props.valueLabel
																}
																grid={
																	props.activeTab
																}
																class={
																	item.class
																}
																standingTab={
																	"classA"
																}
																photo={
																	item.photo ||
																	""
																}
																teamName={
																	item.teamName ||
																	""
																}
																teamLogo={
																	item.teamLogo ||
																	""
																}
																teamColor={
																	item.teamColor ||
																	""
																}
																teamDrivers={
																	item.drivers ||
																	""
																}
																activeTab={
																	props.activeTab
																}
																activeGrid={
																	activeGrid
																}
																isActive={
																	activeCard ===
																	index + 1
																}
																onClick={() =>
																	handleCardClick(
																		index +
																			1
																	)
																}
																newData={
																	props.data
																}
																oldData={
																	props.oldData ||
																	[]
																}
															/>
														</li>
													)
												)}
											</ul>
										) : (
											<ul className="flex flex-col gap-y-[2px]">
												{classATeams.map(
													(item, index) => (
														<li
															key={`classA-${index}`}
														>
															<StandingCard
																name={item.name}
																position={
																	index + 1
																}
																valueKey={
																	item[
																		props
																			.valueKey
																	]
																}
																valueLabel={
																	props.valueLabel
																}
																grid={
																	props.activeTab
																}
																class={
																	item.class
																}
																standingTab={
																	"classA"
																}
																photo={
																	item.photo ||
																	""
																}
																teamName={
																	item.teamName ||
																	""
																}
																teamLogo={
																	item.teamLogo ||
																	""
																}
																teamColor={
																	item.teamColor ||
																	""
																}
																teamDrivers={
																	item.drivers ||
																	""
																}
																activeTab={
																	props.activeTab
																}
																activeGrid={
																	activeGrid
																}
																isActive={
																	activeCard ===
																	index + 1
																}
																onClick={() =>
																	handleCardClick(
																		index +
																			1
																	)
																}
																newData={
																	props.teams
																}
																oldData={
																	props.oldTeams ||
																	[]
																}
															/>
														</li>
													)
												)}
											</ul>
										)}
									</div>

									{/* Class B Content */}
									<div className="w-full flex-shrink-0">
										{activeGrid === "drivers" ? (
											<ul className="flex flex-col gap-y-[2px]">
												{classBData.map(
													(item, index) => (
														<li
															key={`classB-${index}`}
														>
															<StandingCard
																name={item.name}
																position={
																	index + 1
																}
																valueKey={
																	item[
																		props
																			.valueKey
																	]
																}
																valueLabel={
																	props.valueLabel
																}
																grid={
																	props.activeTab
																}
																class={
																	item.class
																}
																standingTab={
																	"classB"
																}
																photo={
																	item.photo ||
																	""
																}
																teamName={
																	item.teamName ||
																	""
																}
																teamLogo={
																	item.teamLogo ||
																	""
																}
																teamColor={
																	item.teamColor ||
																	""
																}
																teamDrivers={
																	item.drivers ||
																	""
																}
																activeTab={
																	props.activeTab
																}
																activeGrid={
																	activeGrid
																}
																isActive={
																	activeCard ===
																	index + 1
																}
																onClick={() =>
																	handleCardClick(
																		index +
																			1
																	)
																}
																newData={
																	props.data
																}
																oldData={
																	props.oldData ||
																	[]
																}
															/>
														</li>
													)
												)}
											</ul>
										) : (
											<ul className="flex flex-col gap-y-[2px]">
												{classBTeams.map(
													(item, index) => (
														<li
															key={`classB-${index}`}
														>
															<StandingCard
																name={item.name}
																position={
																	index + 1
																}
																valueKey={
																	item[
																		props
																			.valueKey
																	]
																}
																valueLabel={
																	props.valueLabel
																}
																grid={
																	props.activeTab
																}
																class={
																	item.class
																}
																standingTab={
																	"classB"
																}
																photo={
																	item.photo ||
																	""
																}
																teamName={
																	item.teamName ||
																	""
																}
																teamLogo={
																	item.teamLogo ||
																	""
																}
																teamColor={
																	item.teamColor ||
																	""
																}
																teamDrivers={
																	item.drivers ||
																	""
																}
																activeTab={
																	props.activeTab
																}
																activeGrid={
																	activeGrid
																}
																isActive={
																	activeCard ===
																	index + 1
																}
																onClick={() =>
																	handleCardClick(
																		index +
																			1
																	)
																}
																newData={
																	props.teams
																}
																oldData={
																	props.oldTeams ||
																	[]
																}
															/>
														</li>
													)
												)}
											</ul>
										)}
									</div>
								</div>
							</div>
						</div>

						{/* List from 4th to 10th for larger screens */}
						<ul className="hidden md:flex flex-col gap-y-[2px] mt-6 md:mt-0">
							{activeGrid === "drivers"
								? gridADataLarge.map((item, index) => (
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
												activeGrid={activeGrid}
												isActive={
													activeCard === index + 4
												}
												onClick={() =>
													handleCardClick(index + 4)
												}
												newData={props.data}
												oldData={props.oldData || []}
											/>
										</li>
								  ))
								: gridATeamsLarge.map((item, index) => (
										<li key={`heat-large-${index}`}>
											<StandingCard
												name={item.name}
												position={index + 2}
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
												activeGrid={activeGrid}
												isActive={
													activeCard === index + 2
												}
												onClick={() =>
													handleCardClick(index + 2)
												}
												newData={props.teams}
												oldData={props.oldTeams || []}
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
								topThree={
									activeGrid === "drivers"
										? classBData.slice(0, 3)
										: classBTeams.slice(0, 3)
								}
								activeTab={activeGrid}
								grid={classBData[0].grid}
								class={classBData[0].class}
								newData={
									activeGrid === "drivers"
										? props.data
										: props.teams
								}
								oldData={
									activeGrid === "drivers"
										? props.oldData
										: props.oldTeams
								}
							/>
						)}

						{/* List from 4th to 10th for larger screens */}
						<ul className="hidden md:flex flex-col gap-y-[2px] mt-6 md:mt-0">
							{activeGrid === "drivers"
								? gridBDataLarge.map((item, index) => (
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
												activeGrid={activeGrid}
												isActive={
													activeCard === index + 4
												}
												onClick={() =>
													handleCardClick(index + 4)
												}
												newData={props.data}
												oldData={props.oldData || []}
											/>
										</li>
								  ))
								: gridBTeamsLarge.map((item, index) => (
										<li key={`heat-large-${index}`}>
											<StandingCard
												name={item.name}
												position={index + 2}
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
												activeGrid={activeGrid}
												isActive={
													activeCard === index + 2
												}
												onClick={() =>
													handleCardClick(index + 2)
												}
												newData={props.teams}
												oldData={props.oldTeams || []}
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
