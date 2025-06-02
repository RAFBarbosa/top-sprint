import React from "react";

interface TabSwitchProps<T extends string> {
	activeTab: T;
	setActiveTab: React.Dispatch<React.SetStateAction<T>>;
	tabs: ReadonlyArray<{ id: T; label: string }>;
}

export function TabSwitch<T extends string>({
	activeTab,
	setActiveTab,
	tabs,
}: TabSwitchProps<T>) {
	return (
		<div className="w-full">
			<div className="p-2.5 flex items-center justify-center space-x-1 underline-offset-14 font-semibold text-xl overflow-x-auto min-w-max">
				{tabs.map((tab, index) => (
					<React.Fragment key={tab.id}>
						<button
							className={`cursor-pointer tracking-wide px-5 uppercase ${
								activeTab === tab.id
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
		</div>
	);
}
