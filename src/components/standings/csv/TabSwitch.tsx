import { useTab } from "../../../contexts/TabContext";
import React from "react";

interface TabSwitchProps<T extends string> {
	activeTab: T;
	setActiveTab: React.Dispatch<React.SetStateAction<T>>;
	tabs: ReadonlyArray<{ id: T; label: string }>;
	textColor?: string;
	borderColor?: string;
}

export function TabSwitch<T extends string>({
	textColor = "text-white",
	borderColor = "border-white",
}: TabSwitchProps<T>) {
	const { activeTab, setActiveTab, tabs } = useTab();

	const getTabColor = (tabId: string) => {
		switch (tabId) {
			case "gridA": // Heat
				return "bg-purple-600";
			case "gridB": // Carbon
				return "bg-f1-lightSilver";
			case "gridC": // Academy
				return "bg-f1-academy";
			default:
				return "bg-white";
		}
	};

	return (
		<ul className="flex gap-2 cursor-pointer items-center">
			{tabs.map((tab, index) => (
				<React.Fragment key={tab.id}>
					<li className="relative px-2 py-1 group">
						<button
							className={`relative cursor-pointer ${textColor} ${
								activeTab.id === tab.id
									? "opacity-100"
									: "opacity-50 hover:opacity-100"
							}`}
							onClick={() => setActiveTab(tab.id)}
						>
							{tab.label}
							<span
								className={`absolute bottom-0 left-0 h-0.5 ${getTabColor(
									tab.id
								)} ${
									activeTab.id === tab.id
										? "w-full"
										: "w-0 group-hover:w-full transition-all duration-150 ease-out"
								}`}
							></span>
						</button>
					</li>
					{index < tabs.length - 1 && (
						<div
							className={`border-l h-3 ${borderColor} opacity-30`}
						/>
					)}
				</React.Fragment>
			))}
		</ul>
	);
}
