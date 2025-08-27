import { createContext, useContext, useState } from "react";

// contexts/TabContext.tsx
type TabType = {
	id: "gridA" | "gridB";
	label: string;
};

interface TabContextType {
	activeTab: TabType;
	setActiveTab: (tab: TabType["id"]) => void;
	tabs: readonly TabType[];
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const tabs = [
		{ id: "gridA", label: "Heat" },
		{ id: "gridB", label: "Carbon" },
	] as const;

	const [activeTabId, setActiveTabId] = useState<TabType["id"]>("gridA");

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
