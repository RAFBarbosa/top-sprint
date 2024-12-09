import React from "react";

interface TabSwitchProps {
	activeTab: "drivers" | "teams";
	setActiveTab: React.Dispatch<React.SetStateAction<"drivers" | "teams">>;
}

const TabSwitch: React.FC<TabSwitchProps> = ({ activeTab, setActiveTab }) => (
	<div className="flex items-center space-x-1 underline-offset-15 font-semibold text-xl">
		<button
			className="cursor-pointer tracking-wide px-5"
			style={{
				textDecoration: activeTab === "drivers" ? "underline" : "none",
				textDecorationColor:
					activeTab === "drivers" ? "#eb1c24" : "transparent", // Assuming 'f1-red' color as #F1C5C5, you can adjust
				textDecorationThickness: "5px",
			}}
			onClick={() => setActiveTab("drivers")}
		>
			PILOTOS
		</button>
		<div className="border-l h-5 border-f1-text opacity-30"></div>
		<button
			className="cursor-pointer tracking-wide px-5"
			style={{
				textDecoration: activeTab === "teams" ? "underline" : "none",
				textDecorationColor:
					activeTab === "teams" ? "#eb1c24" : "transparent", // Adjust color similarly
				textDecorationThickness: "5px",
			}}
			onClick={() => setActiveTab("teams")}
		>
			EQUIPES
		</button>
	</div>
);

export default TabSwitch;
