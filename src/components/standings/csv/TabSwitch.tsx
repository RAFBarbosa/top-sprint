import { useTab } from "../../../contexts/TabContext";
import React from "react";

interface TabSwitchProps<T extends string> {
	activeTab: T;
	setActiveTab: React.Dispatch<React.SetStateAction<T>>;
	tabs: ReadonlyArray<{ id: T; label: string }>;
}

export function TabSwitch<T extends string>() {
	const { activeTab, setActiveTab, tabs } = useTab();

	return (
		<div className="py-2.5 flex justify-center items-center underline-offset-14 font-semibold text-xl w-full">
			{tabs.map((tab, index) => (
				<React.Fragment key={tab.id}>
					<button
						className={`cursor-pointer w-full md:w-auto px-4 ${
							activeTab.id === tab.id
								? "underline decoration-f1-red decoration-3"
								: "opacity-50 hover:opacity-100"
						}`}
						onClick={() => setActiveTab(tab.id)}
					>
						{tab.label}
					</button>
					{index < tabs.length - 1 && (
						<div className="border-l h-5 border-f1-text opacity-30" />
					)}
				</React.Fragment>
			))}
		</div>
	);
}
