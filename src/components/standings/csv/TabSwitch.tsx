import { useTab } from "../../../contexts/TabContext";
import React from "react";
import { getGridConfig } from "../../config/grids";

interface TabSwitchProps {
	textColor?: string;
	borderColor?: string;
}

export function TabSwitch({
	textColor = "text-white",
	borderColor = "border-white",
}: TabSwitchProps) {
	const { activeTab, setActiveTab, tabs } = useTab();

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
								style={{
									backgroundColor:
										getGridConfig(tab.id)?.primaryColor ??
										"var(--color-brand-primary)",
								}}
								className={`absolute bottom-0 left-0 h-0.5 transition-all duration-150 ease-out ${
									activeTab.id === tab.id
										? "w-full"
										: "w-0 group-hover:w-full"
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
