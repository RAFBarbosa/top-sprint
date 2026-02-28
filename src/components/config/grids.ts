// src/config/grids.ts
import { tenant } from "./tenants";

export type GridId = string;

export interface GridConfig {
	id: GridId;
	label: string;
	primaryColor: string;
	accentColor: string;
	hoverPrimaryColor: string;
	hoverAccentColor: string;
	standingsBgClass: string;
	standingsTitle: string;
	countdownBgClass: string;
	classes?: Array<{
		id: string;
		label: string;
		classColor: string;
		classHoverColor: string;
	}>;
	classLabels?: Record<string, string>;
}

// Everything else in your app still imports GRIDS from here — nothing breaks
export const GRIDS = tenant.grids;

// All your existing helpers stay exactly the same below this line
export const getGridColor = (gridId: string) =>
	GRIDS.find((g) => g.id === gridId)?.primaryColor ?? "#ffffff";

export const getGridConfig = (gridId: GridId) =>
	GRIDS.find((g) => g.id === gridId);

export const hasGridClasses = (gridId: GridId): boolean => {
	const config = getGridConfig(gridId);
	return !!(config?.classes && config.classes.length > 0);
};

export const getGridClasses = (gridId: GridId) => {
	const config = getGridConfig(gridId);
	return config?.classes || [];
};

export const getGridClassLabel = (gridId: GridId, classId: string) => {
	const config = getGridConfig(gridId);
	if (config?.classes) {
		const classConfig = config.classes.find((c) => c.id === classId);
		return classConfig?.label || "";
	}
	return config?.classLabels?.[classId] || "";
};

export const getGridColors = (gridId: GridId, classId: string) => {
	const config = getGridConfig(gridId);
	if (!config?.classes) return null;

	const classConfig = config.classes.find((c) => c.id === classId);
	if (!classConfig) return null;

	return {
		colorClass: classConfig.classColor,
		hoverClass: classConfig.classHoverColor,
	};
};
