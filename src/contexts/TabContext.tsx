import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import type { GridId } from "../shared/config/grids";
import { useGrids } from "./GridsContext";

const LS_KEY = "activeGrid";

const slugify = (label: string) =>
	label.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

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
	const { activeGrids } = useGrids();
	const tabs = activeGrids.map(({ id, label }) => ({ id, label }));

	const [searchParams, setSearchParams] = useSearchParams();
	const location = useLocation();

	const resolveInitialTab = (): GridId => {
		if (tabs.length === 0) return "" as GridId;
		const validIds = tabs.map((t) => t.id);

		// 1. URL param (matched by label slug)
		const urlSlug = searchParams.get("grid");
		if (urlSlug) {
			const matched = tabs.find((t) => slugify(t.label) === urlSlug);
			if (matched) return matched.id;
		}

		// 2. localStorage (stored as grid ID)
		const stored = localStorage.getItem(LS_KEY) as GridId | null;
		if (stored && validIds.includes(stored)) return stored;

		// 3. First grid
		return tabs[0].id;
	};

	const [activeTabId, setActiveTabId] = useState<GridId>(resolveInitialTab);

	const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0] ?? { id: "" as GridId, label: "" };

	// Persist to localStorage on tab change
	useEffect(() => {
		if (!activeTabId) return;
		localStorage.setItem(LS_KEY, activeTabId);
	}, [activeTabId]);

	// Sync URL param on any navigation OR tab change.
	// Uses window.location.search (not searchParams state) to avoid stale closure + infinite loop.
	// location.key changes on every navigation, even to the same path.
	useEffect(() => {
		if (!activeTabId || tabs.length <= 1) return;

		const isFirstGrid = activeTabId === tabs[0].id;
		const activeSlug = slugify(tabs.find((t) => t.id === activeTabId)?.label ?? activeTabId);
		const currentSlug = new URLSearchParams(window.location.search).get("grid");

		if (isFirstGrid) {
			// First grid → clean URL, no param needed
			if (!currentSlug) return;
			const next = new URLSearchParams(window.location.search);
			next.delete("grid");
			setSearchParams(next, { replace: true });
		} else {
			// Other grids → ensure param is present and correct
			if (currentSlug === activeSlug) return;
			const next = new URLSearchParams(window.location.search);
			next.set("grid", activeSlug);
			setSearchParams(next, { replace: true });
		}
	}, [activeTabId, location.key]);

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
