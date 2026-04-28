import { useState, useEffect, useMemo } from "react";
import { StandingCard } from "../standings/csv/StandingCard";
import { Podium } from "../standings/csv/Podium";
import { Skeleton } from "@mui/material";
import { StandingsTabs } from "../standings/csv/StandingsTabs";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useSwipeable } from "react-swipeable";
import {
	GridId,
	getGridConfig,
	getGridClasses,
	hasGridClasses,
} from "../../shared/config/grids";

interface AdminStandingsProps {
	title: string;
	data: any[];
	drivers: any[];
	teams: any[];
	valueKey: string;
	valueLabel: string;
	activeTab: GridId;
	oldData?: any[];
	oldDrivers?: any[];
	oldTeams?: any[];
}

export function AdminStandings(props: AdminStandingsProps) {
	const [activeCard, setActiveCard] = useState<number | null>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [activeGrid, setActiveGrid] = useState<"drivers" | "teams">(
		"drivers",
	);

	const gridConfig = getGridConfig(props.activeTab);
	const classes = getGridClasses(props.activeTab);
	const hasClasses = hasGridClasses(props.activeTab);
	const [activeClassIndex, setActiveClassIndex] = useState<number>(0);
	const activeClass = classes[activeClassIndex]?.id || "";

	// Navigation helpers
	const nextClass = () =>
		setActiveClassIndex((prev) => (prev + 1) % classes.length);
	const prevClass = () =>
		setActiveClassIndex(
			(prev) => (prev - 1 + classes.length) % classes.length,
		);

	const swipeHandlers = useSwipeable({
		onSwipedLeft: nextClass,
		onSwipedRight: prevClass,
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

	// Data filtering helpers
	const filterDataByClass = (data: any[], classId: string) => {
		if (!hasClasses) return data;
		return data.filter((item) => item.class === classId);
	};

	// Memoized data for all classes
	const allClassesData = useMemo(() => {
		if (!hasClasses) return { [props.activeTab]: props.data };

		const result: Record<string, any[]> = {};
		classes.forEach((classConfig) => {
			result[classConfig.id] = filterDataByClass(
				props.data,
				classConfig.id,
			);
		});
		return result;
	}, [props.data, classes, hasClasses, props.activeTab]);

	const allClassesTeams = useMemo(() => {
		if (!hasClasses) return { [props.activeTab]: props.teams };

		const result: Record<string, any[]> = {};
		classes.forEach((classConfig) => {
			result[classConfig.id] = filterDataByClass(
				props.teams,
				classConfig.id,
			);
		});
		return result;
	}, [props.teams, classes, hasClasses, props.activeTab]);

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

	// Single class view (gridA or no classes)
	if (!hasClasses || classes.length === 0) {
		const currentData = activeGrid === "drivers" ? props.data : props.teams;
		const currentTeams = props.teams;
		const listDataDrivers = currentData.slice(3);
		const listDataTeams = currentTeams.slice(1);

		return (
			<div className="relative">
				<div className="mx-auto w-full">
					<StandingsTabs
						activeGrid={activeGrid}
						setActiveGrid={setActiveGrid}
					/>
				</div>
				<h2 className="font-f1Title uppercase tracking-widest text-white text-lg md:text-xl text-center mt-20">
					Classificação {props.title}
				</h2>
				<div className="w-full mx-auto pt-8">
					<div className="md:flex-1 md:max-w-1/2 mx-auto">
						<Podium
							topThree={
								activeGrid === "drivers"
									? currentData.slice(0, 3)
									: currentTeams.slice(0, 3)
							}
							activeTab={activeGrid}
							grid={props.activeTab}
							class="single"
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
						{activeGrid === "drivers" ? (
							<ul className="flex flex-col gap-y-[2px]">
								{listDataDrivers.map((item, index) => (
									<li key={`single-${index}`}>
										<StandingCard
											name={item.name}
											position={index + 4}
											valueKey={item[props.valueKey]}
											valueLabel={props.valueLabel}
											grid={props.activeTab}
											class="single"
											standingTab="single"
											photo={item.photo || ""}
											teamName={item.teamName || ""}
											teamLogo={item.teamLogo || ""}
											teamColor={item.teamColor || ""}
											teamDrivers={item.drivers || []}
											activeTab={props.activeTab}
											activeGrid={activeGrid}
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
						) : (
							<ul className="flex flex-col gap-y-[2px]">
								{listDataTeams.map((item, index) => (
									<li key={`single-${index}`}>
										<StandingCard
											name={item.name}
											position={index + 2}
											valueKey={item[props.valueKey]}
											valueLabel={props.valueLabel}
											grid={props.activeTab}
											class="single"
											standingTab="single"
											photo={item.photo || ""}
											teamName={item.teamName || ""}
											teamLogo={item.teamLogo || ""}
											teamColor={item.teamColor || ""}
											teamDrivers={item.drivers || []}
											activeTab={props.activeTab}
											activeGrid={activeGrid}
											isActive={activeCard === index + 2}
											onClick={() =>
												handleCardClick(index + 2)
											}
											newData={props.teams}
											oldData={props.oldTeams || []}
										/>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			</div>
		);
	}

	// Multi-class view
	return (
		<div className="relative mt-20">
			<div className="absolute mx-auto w-full -top-20">
				<StandingsTabs
					activeGrid={activeGrid}
					setActiveGrid={setActiveGrid}
				/>
			</div>
			<h2 className="font-f1Title uppercase tracking-widest text-white text-lg md:text-xl text-center">
				{props.title}
			</h2>
			<div className="w-full mx-auto pt-8">
				<div className="">
					<div className="flex justify-center items-center font-f1Title mb-6 ">
						<button
							onClick={prevClass}
							className={`flex items-center p-1 rounded border-1 cursor-pointer ${
								activeClassIndex === 0
									? "border-transparent text-transparent"
									: "text-f1-bg-silver border-f1-bg-silver"
							}`}
						>
							<ChevronLeftIcon className="h-7 w-7" />
						</button>

						<h2 className="font-f1Title text-white uppercase mx-auto tracking-widest">
							{classes[activeClassIndex]?.label || ""}
						</h2>

						<button
							onClick={nextClass}
							className={`flex justify-end p-1 rounded border-1 cursor-pointer ${
								activeClassIndex === classes.length - 1
									? "border-transparent text-transparent"
									: "text-f1-bg-silver border-f1-bg-silver"
							}`}
						>
							<ChevronRightIcon className="h-7 w-7" />
						</button>
					</div>
				</div>

				<div className="md:flex-1 md:max-w-1/2 mx-auto">
					<div {...swipeHandlers}>
						<div className="overflow-hidden">
							<div
								className="flex transition-transform duration-300 ease-in-out"
								style={{
									transform: `translateX(-${
										activeClassIndex * 100
									}%)`,
								}}
							>
								{classes.map((classConfig, classIdx) => {
									const classData =
										activeGrid === "drivers"
											? allClassesData[classConfig.id]
											: allClassesTeams[classConfig.id];

									const listData =
										activeGrid === "drivers"
											? classData.slice(3)
											: classData.slice(1);
									const startPosition =
										activeGrid === "drivers" ? 4 : 2;

									return (
										<div
											key={classConfig.id}
											className="w-full flex-shrink-0"
										>
											<Podium
												topThree={
													activeGrid === "drivers"
														? classData.slice(0, 3)
														: classData.slice(0, 3)
												}
												activeTab={activeGrid}
												grid={props.activeTab}
												class={classConfig.id}
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
											{activeGrid === "drivers" ? (
												<ul className="flex flex-col gap-y-[2px]">
													{listData.map(
														(item, index) => (
															<li
																key={`${classConfig.id}-${index}`}
															>
																<StandingCard
																	name={
																		item.name
																	}
																	position={
																		startPosition +
																		index
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
																		classConfig.id
																	}
																	standingTab={
																		classConfig.id
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
																		[]
																	}
																	activeTab={
																		props.activeTab
																	}
																	activeGrid={
																		activeGrid
																	}
																	isActive={
																		activeCard ===
																		startPosition +
																			index
																	}
																	onClick={() =>
																		handleCardClick(
																			startPosition +
																				index,
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
														),
													)}
												</ul>
											) : (
												<ul className="flex flex-col gap-y-[2px]">
													{listData.map(
														(item, index) => (
															<li
																key={`${classConfig.id}-${index}`}
															>
																<StandingCard
																	name={
																		item.name
																	}
																	position={
																		startPosition +
																		index
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
																		classConfig.id
																	}
																	standingTab={
																		classConfig.id
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
																		[]
																	}
																	activeTab={
																		props.activeTab
																	}
																	activeGrid={
																		activeGrid
																	}
																	isActive={
																		activeCard ===
																		startPosition +
																			index
																	}
																	onClick={() =>
																		handleCardClick(
																			startPosition +
																				index,
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
														),
													)}
												</ul>
											)}
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
