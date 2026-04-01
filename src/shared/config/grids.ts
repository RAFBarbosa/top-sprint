import { tenant } from "./tenants";

export type GridId = string;

export interface RaceAward {
	id: string;
	label: string;
	points: number;
}

export interface PointSystem {
	race: number[];
	sprint?: number[];
	poleBonus?: number;
	presenceBonus?: number;
}

export interface GridConfig {
	id: GridId;
	label: string;
	active?: boolean;
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
	photoStyle?: "portrait" | "round" | "bust";
	cardBackground?: string;
	pointSystem?: PointSystem;
	raceAwards?: RaceAward[];
}

// Mutable runtime array — starts with tenant defaults, updated by GridsContext when Firebase loads
let _runtimeGrids: GridConfig[] = tenant.grids as GridConfig[];

export const setRuntimeGrids = (grids: GridConfig[]) => {
	_runtimeGrids = grids;
};

// Static-compatible export for TabContext initialisation (reads current runtime value)
export const GRIDS = new Proxy([] as GridConfig[], {
	get(_, prop) {
		return (_runtimeGrids as any)[prop];
	},
});

export const getGridLabel = (gridId: string): string =>
	_runtimeGrids.find((g) => g.id === gridId)?.label ?? gridId;

export const getGridColor = (gridId: string) =>
	_runtimeGrids.find((g) => g.id === gridId)?.primaryColor ?? "#ffffff";

export const getGridConfig = (gridId: GridId) =>
	_runtimeGrids.find((g) => g.id === gridId);

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
