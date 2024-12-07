import React from "react";

// Define the prop types for TabSwitch component
interface TabSwitchProps {
	activeTab: "drivers" | "teams";
	setActiveTab: React.Dispatch<React.SetStateAction<"drivers" | "teams">>;
}

const TabSwitch: React.FC<TabSwitchProps> = ({ activeTab, setActiveTab }) => (
	<div className="absolute left-0 top-0 py-1 w-full">
		<div className="flex justify-center items-center space-x-5 underline-offset-[12px] font-semibold">
			<button
				className={`cursor-pointer tracking-wider px-3 py-2 ${
					activeTab === "drivers"
						? "underline decoration-f1-red decoration-2"
						: "no-underline"
				}`}
				onClick={() => setActiveTab("drivers")}
			>
				PILOTOS
			</button>
			<div className="border-l h-6 border-f1-text opacity-30"></div>
			{/* Divider between buttons */}
			<button
				className={`cursor-pointer tracking-wider px-3 py-2 ${
					activeTab === "teams"
						? "underline decoration-f1-red decoration-2"
						: "no-underline"
				}`}
				onClick={() => setActiveTab("teams")}
			>
				EQUIPES
			</button>
		</div>
	</div>
);

export default TabSwitch;
