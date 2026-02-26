import { createContext, useContext, useState } from "react";
import { GRIDS, GridId } from "../components/config/grids";

type TabType = {
	id: GridId;
	label: string;
};

interface TabContextType {
	activeTab: TabType;
	setActiveTab: (tab: GridId) => void;
	tabs: readonly TabType[];
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const tabs = GRIDS.map(({ id, label }) => ({ id, label })) as const;

	const [activeTabId, setActiveTabId] = useState<GridId>(
		tabs.length > 0 ? tabs[0].id : "",
	);

	const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0];

	const value = {
		activeTab,
		setActiveTab: setActiveTabId,
		tabs,
	};

	return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};

export const useTab = () => {
	const context = useContext(TabContext);
	if (!context) {
		throw new Error("useTab must be used within a TabProvider");
	}
	return context;
};
