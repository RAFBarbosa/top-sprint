import { StandingCard } from "./StandingCard";
import { Podium } from "./Podium";

interface StandingsGridProps {
	activeTab: "gridA" | "gridB";
	activeGrid: "gridA" | "gridB";
	gridData: any[];
	displayedData: any[];
	displayedDataMobile: any[];
	activeCard: number | null;
	showAll: boolean;
	valueKey: string;
	valueLabel: string;
	newDrivers: any[];
	oldDrivers?: any[];
	newTeams: any[];
	oldTeams?: any[];
	handleCardClick: (index: number) => void;
	setShowAll: (show: boolean) => void;
}

export function StandingsGrid({
	activeTab,
	activeGrid,
	gridData,
	displayedData,
	displayedDataMobile,
	activeCard,
	showAll,
	valueKey,
	valueLabel,
	newDrivers,
	oldDrivers = [],
	newTeams,
	oldTeams = [],
	handleCardClick,
	setShowAll,
}: StandingsGridProps) {
	return (
		<div className="max-w-[700px] mx-auto">
			<Podium
				topThree={gridData.slice(0, 3)}
				activeTab={activeTab}
				grid={gridData[0]?.grid}
				newDrivers={newDrivers}
				oldDrivers={oldDrivers}
				newTeams={newTeams}
				oldTeams={oldTeams}
			/>

			{/* Mobile List */}
			<ul className="md:hidden flex flex-col gap-y-[2px] mt-6">
				{displayedDataMobile.map((item, index) => (
					<li key={`${activeGrid}-mobile-${index}`}>
						<StandingCard
							name={item.name}
							position={index + 1}
							valueKey={item[valueKey]}
							valueLabel={valueLabel}
							grid={activeGrid}
							photo={item.photo || ""}
							teamName={item.teamName || ""}
							teamColor={item.teamColor || ""}
							teamDrivers={item.drivers || ""}
							activeTab={activeTab}
							isActive={activeCard === index + 1}
							onClick={() => handleCardClick(index + 1)}
							newDrivers={newDrivers}
							oldDrivers={oldDrivers}
							newTeams={newTeams}
							oldTeams={oldTeams}
						/>
					</li>
				))}
			</ul>

			{/* Desktop List */}
			<ul className="hidden md:flex flex-col gap-y-[2px] mt-6 md:mt-0">
				{displayedData.map((item, index) => (
					<li key={`${activeGrid}-desktop-${index}`}>
						<StandingCard
							name={item.name}
							position={
								activeGrid === "gridB" ? index + 2 : index + 4
							}
							valueKey={item[valueKey]}
							valueLabel={valueLabel}
							grid={activeGrid}
							photo={item.photo || ""}
							teamName={item.teamName || ""}
							teamColor={item.teamColor || ""}
							teamDrivers={item.drivers || ""}
							activeTab={activeTab}
							isActive={activeCard === index + 4}
							onClick={() => handleCardClick(index + 4)}
							newDrivers={newDrivers}
							oldDrivers={oldDrivers}
							newTeams={newTeams}
							oldTeams={oldTeams}
						/>
					</li>
				))}
			</ul>

			{/* {activeGrid === "gridA" && (
				<ShowAllButton
					showAll={showAll}
					setShowAll={setShowAll}
					dataLength={gridData.length}
				/>
			)} */}
		</div>
	);
}
