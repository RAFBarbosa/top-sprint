interface TabSwitchProps {
	activeTab: "drivers" | "teams";
	setActiveTab: React.Dispatch<React.SetStateAction<"drivers" | "teams">>;
}

export function TabSwitch(props: TabSwitchProps) {
	return (
		<div className="flex items-center space-x-1 underline-offset-14 font-semibold text-xl">
			<button
				className={`cursor-pointer tracking-wide px-5 ${
					props.activeTab === "drivers"
						? "underline decoration-f1-red decoration-3"
						: "no-underline"
				}`}
				onClick={() => props.setActiveTab("drivers")}
			>
				PILOTOS
			</button>
			<div className="border-l h-5 border-f1-text opacity-30"></div>
			<button
				className={`cursor-pointer tracking-wide px-5 ${
					props.activeTab === "teams"
						? "underline decoration-f1-red decoration-3"
						: "no-underline"
				}`}
				onClick={() => props.setActiveTab("teams")}
			>
				EQUIPES
			</button>
		</div>
	);
}
