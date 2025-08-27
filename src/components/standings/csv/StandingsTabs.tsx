interface StandingsTabsProps {
	activeGrid: "gridA" | "gridB";
	setActiveGrid: (grid: "gridA" | "gridB") => void;
}

export function StandingsTabs({
	activeGrid,
	setActiveGrid,
}: StandingsTabsProps) {
	return (
		<div className="flex justify-center items-center font-f1Title gap-5">
			<StandingsTab
				label="Pilotos"
				isActive={activeGrid === "gridA"}
				onClick={() => setActiveGrid("gridA")}
			/>
			<div className="w-[1px] bg-white/50 h-5" />
			<StandingsTab
				label="Equipes"
				isActive={activeGrid === "gridB"}
				onClick={() => setActiveGrid("gridB")}
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
			className={`px-6 py-3 uppercase text-xs tracking-widest transition-all duration-200 hover:cursor-pointer ${
				isActive
					? "text-white border-b-f1-redF1 border-b-2 border-t-2 border-t-f1-red/0"
					: "text-gray-400 border-b-f1-red/0 border-b-2 border-t-2 border-t-f1-red/0"
			}`}
		>
			{label}
		</button>
	);
}
