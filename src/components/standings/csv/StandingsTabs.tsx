interface StandingsTabsProps {
	activeGrid: "drivers" | "teams";
	setActiveGrid: (grid: "drivers" | "teams") => void;
}

export function StandingsTabs({
	activeGrid,
	setActiveGrid,
}: StandingsTabsProps) {
	return (
		<div className="tenant-standings-tabs flex justify-center items-center font-f1Title gap-2">
			<StandingsTab
				label="Pilotos"
				isActive={activeGrid === "drivers"}
				onClick={() => setActiveGrid("drivers")}
			/>
			<div className="w-[1px] bg-white/50 h-5" />
			<StandingsTab
				label="Equipes"
				isActive={activeGrid === "teams"}
				onClick={() => setActiveGrid("teams")}
			/>
		</div>
	);
}

function StandingsTab({
	label,
	isActive,
	onClick,
}: {
	label: string;
	isActive: boolean;
	onClick: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className={`px-5 py-3 uppercase text-xs tracking-widest transition-all duration-200 hover:cursor-pointer ${
				isActive
					? "text-white border-b-f1-white border-b-2"
					: "text-gray-400 border-b-transparent border-b-2"
			}`}
		>
			{label}
		</button>
	);
}
