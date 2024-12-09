import React from "react";

interface TabSwitchProps {
	activeTab: "drivers" | "teams";
	setActiveTab: React.Dispatch<React.SetStateAction<"drivers" | "teams">>;
}

const TabSwitch: React.FC<TabSwitchProps> = ({ activeTab, setActiveTab }) => (
	<div className="flex items-center space-x-1 underline-offset-16 font-semibold text-lg">
		<button
			className={`cursor-pointer tracking-wider px-5 ${
				activeTab === "drivers"
					? "underline decoration-f1-red decoration-6"
					: "no-underline"
			}`}
			onClick={() => setActiveTab("drivers")}
		>
			PILOTOS
		</button>
		<div className="border-l h-5 border-f1-text opacity-30"></div>
		<button
			className={`cursor-pointer tracking-wider px-5 ${
				activeTab === "teams"
					? "underline decoration-f1-red decoration-6"
					: "no-underline"
			}`}
			onClick={() => setActiveTab("teams")}
		>
			EQUIPES
		</button>
	</div>
);

export default TabSwitch;
