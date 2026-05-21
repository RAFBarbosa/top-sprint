import { useState, useEffect, useMemo } from "react";
import { StandingCard } from "./StandingCard";
import { Podium } from "./Podium";
import { Skeleton } from "@mui/material";
import { StandingsTabs } from "./StandingsTabs";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useSwipeable } from "react-swipeable";
import {
	GridId,
	getGridConfig,
	getGridClasses,
	hasGridClasses,
} from "../../../shared/config/grids";
import { useTenantConfig } from "../../../contexts/TenantConfigContext";

interface StandingsListProps {
	title: string;
	data: any[];
	drivers: any[];
	teams: any[];
	valueKey: string;
	valueLabel: string;
	activeTab: GridId;
	oldData?: any[];
	oldTeams?: any[];
	photoStyle?: "portrait" | "round" | "bust";
}

export function StandingsList(props: StandingsListProps) {
	const { defaultPhotoStyle } = useTenantConfig();
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

	// Use a safer approach for checking mobile
	const [isMobile, setIsMobile] = useState<boolean>(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 950);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

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
		setIsLoading(false);
	}, [props.data]);

	const handleCardClick = (index: number) => {
		setActiveCard((prev) => (prev === index ? null : index));
	};

	// Data filtering helpers
	const filterDataByClass = (data: any[], classId: string) => {
		if (!hasClasses) return data;
		return data.filter((item) => item.class === classId);
	};

	const getClassData = (data: any[], classId: string) => {
		return filterDataByClass(data, classId);
	};

	const getAllClassesData = (data: any[]) => {
		if (!hasClasses) return { [props.activeTab]: data };

		const result: Record<string, any[]> = {};
		classes.forEach((classConfig) => {
			result[classConfig.id] = filterDataByClass(data, classConfig.id);
		});
		return result;
	};

	// Memoized data
	const currentClassData = useMemo(
		() => getClassData(props.data, activeClass),
		[props.data, activeClass],
	);

	const currentClassTeams = useMemo(
		() => getClassData(props.teams, activeClass),
		[props.teams, activeClass],
	);

	const allClassesData = useMemo(
		() => getAllClassesData(props.data),
		[props.data, classes, hasClasses, props.activeTab],
	);

	const allClassesTeams = useMemo(
		() => getAllClassesData(props.teams),
		[props.teams, classes, hasClasses, props.activeTab],
	);

	// Generic render functions
	const renderPodium = (data: any[], classId: string = "single") => {
		const podiumData = data.slice(0, 3);
		if (podiumData.length === 0) return null;

		return (
			<Podium
				topThree={podiumData}
				activeTab={activeGrid}
				grid={props.activeTab}
				class={classId}
				newData={data}
				photoStyle={defaultPhotoStyle}
				oldData={
					activeGrid === "drivers" ? props.oldData : props.oldTeams
				}
			/>
		);
	};

	const renderStandingCard = (
		item: any,
		index: number,
		classId: string,
		position: number,
	) => {
		const isFirstPlaceMobile = position === 1 && isMobile;

		return (
			<li key={`${classId}-${index}`}>
				<StandingCard
					name={item.name}
					position={position}
					valueKey={item[props.valueKey]}
					valueLabel={props.valueLabel}
					grid={props.activeTab}
					class={classId}
					standingTab={classId}
					photo={item.photo || ""}
					teamName={item.teamName || ""}
					teamLogo={item.teamLogo || ""}
					teamColor={item.teamColor || ""}
					teamDrivers={item.drivers || []}
					reserve={item.reserve}
					activeTab={props.activeTab}
					activeGrid={activeGrid}
					isActive={isFirstPlaceMobile || activeCard === position}
					onClick={() => handleCardClick(position)}
					newData={
						activeGrid === "drivers" ? props.data : props.teams
					}
					photoStyle={defaultPhotoStyle}
					oldData={
						activeGrid === "drivers"
							? props.oldData
							: props.oldTeams
					}
				/>
			</li>
		);
	};

	const renderList = (
		data: any[],
		classId: string = "single",
		startIndex: number = 0,
	) => {
		return (
			<ul className="flex flex-col gap-y-[2px]">
				{data.map((item, index) =>
					renderStandingCard(
						item,
						index,
						classId,
						startIndex + index + 1,
					),
				)}
			</ul>
		);
	};

	const renderDesktopGrid = (classConfig: any) => {
		const data =
			activeGrid === "drivers"
				? allClassesData[classConfig.id]
				: allClassesTeams[classConfig.id];

		if (!data || data.length === 0) return null;

		const listData =
			activeGrid === "drivers" ? data.slice(3) : data.slice(1);
		const startPosition = activeGrid === "drivers" ? 4 : 2;

		return (
			<div key={classConfig.id} className="md:flex-1 md:max-w-1/2">
				<h2 className="hidden md:block font-f1Title uppercase tracking-widest text-white text-xs md:text-base text-center">
					{classConfig.label}
				</h2>

				{/* Desktop podium */}
				{!isMobile && <div>{renderPodium(data, classConfig.id)}</div>}

				{!isMobile && (
					<div className="mt-6">
						{renderList(
							listData,
							classConfig.id,
							startPosition - 1,
						)}
					</div>
				)}
			</div>
		);
	};

	// Loading state
	if (isLoading) {
		return (
			<div className="text-white text-center mt-15">
				<div className="px-3 w-full md:max-screen-xl mx-auto">
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
		const shouldFilterForDesktop = activeGrid === "drivers" ? 3 : 1;
		const startPosition = isMobile ? 0 : shouldFilterForDesktop;
		const filteredData = currentData.slice(startPosition);

		return (
			<>
				<h2 className="tenant-standings-title font-f1Title uppercase tracking-widest text-white text-lg md:text-xl text-center mt-10 mb-8">
					Classificação {props.title}
				</h2>
				<div className="w-full">
					<StandingsTabs
						activeGrid={activeGrid}
						setActiveGrid={setActiveGrid}
					/>
				</div>
				<div className="w-full mx-auto max-w-2xl mt-8 md:mt-0">
					{/* Show Podium only on desktop */}
					{!isMobile && <div>{renderPodium(currentData)}</div>}

					{/* Show ALL positions on mobile, filtered positions on desktop */}
					{renderList(filteredData, "single", startPosition)}
				</div>
			</>
		);
	}

	// Multi-class view (gridB)
	const mobileData =
		activeGrid === "drivers" ? currentClassData : currentClassTeams;

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

			{/* Mobile class navigation */}
			{classes.length > 1 && (
				<div className="block md:hidden">
					<div className="flex justify-center items-center font-f1Title mb-6">
						<button
							onClick={prevClass}
							className={`flex items-center p-1 rounded border-1 ${
								activeClassIndex === 0
									? "border-transparent text-transparent"
									: "text-f1-bg-silver border-f1-bg-silver"
							}`}
						>
							<ChevronLeftIcon className="h-7 w-7" />
						</button>

						<span className="font-f1Title text-white uppercase text-xs mx-4">
							{classes[activeClassIndex]?.label || ""}
						</span>

						<button
							onClick={nextClass}
							className={`flex justify-end p-1 rounded border-1 ${
								activeClassIndex === classes.length - 1
									? "border-transparent text-transparent"
									: "text-f1-bg-silver border-f1-bg-silver"
							}`}
						>
							<ChevronRightIcon className="h-7 w-7" />
						</button>
					</div>
				</div>
			)}

			{/* Desktop - all classes side by side */}
			<div className="w-full mx-auto md:flex md:justify-between md:items-center md:gap-6 pt-8">
				{classes.map(renderDesktopGrid)}
			</div>

			{/* Mobile - swipe between classes */}
			<div
				className="md:hidden w-full mx-auto max-w-2xl pt-8"
				{...swipeHandlers}
			>
				{/* Mobile podium for active class */}
				{mobileData.length > 0 && renderPodium(mobileData, activeClass)}

				{/* Mobile list for active class - showing all positions starting from 1 */}
				{renderList(mobileData, activeClass, 0)}
			</div>
		</>
	);
}
