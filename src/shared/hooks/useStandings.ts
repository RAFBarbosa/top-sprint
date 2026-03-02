import { useState, useEffect } from "react";

export function useStandings(
	drivers: any[],
	teams: any[],
	activeTab: "drivers" | "teams",
) {
	const [activeCard, setActiveCard] = useState<number | null>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [activeGrid, setActiveGrid] = useState<"gridA" | "gridB">("gridA");
	const [showAll, setShowAll] = useState<boolean>(false);

	useEffect(() => {
		if (drivers.length > 0 && teams.length > 0) {
			setIsLoading(false);
		}
	}, [drivers, teams]);

	const handleCardClick = (index: number) => {
		setActiveCard((prev) => (prev === index ? null : index));
	};

	const gridDriversData = drivers.filter(
		activeTab === "drivers"
			? (item) => item.grid === "gridA"
			: (item) => item.grid === "gridB",
	);
	const gridTeamsData = teams;

	const displayedData = showAll
		? gridDriversData.slice(3)
		: gridDriversData.slice(3, 10);

	const displayedDataMobile = showAll
		? gridDriversData
		: gridDriversData.slice(0, 10);

	return {
		activeCard,
		isLoading,
		activeGrid,
		showAll,
		gridDriversData,
		gridTeamsData,
		displayedData,
		displayedDataMobile,
		setActiveGrid,
		setShowAll,
		handleCardClick,
	};
}

export default useStandings;
