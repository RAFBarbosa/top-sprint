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
	reservesScore?: boolean;
	maxRacecraftPoints?: number;
}

// Official F1 point system — used as fallback when a grid has no point system configured
export const DEFAULT_POINT_SYSTEM: PointSystem = {
	race: [25, 18, 15, 12, 10, 8, 6, 4, 2, 1],
	sprint: [8, 7, 6, 5, 4, 3, 2, 1],
	poleBonus: 0,
	presenceBonus: 0,
	reservesScore: false,
	maxRacecraftPoints: 20,
};

// Returns the configured point system, or the F1 default if the grid has none or
// has empty race points (which is the initial state for newly-created grids).
export const getPointSystem = (gridId: GridId): PointSystem => {
	const ps = getGridConfig(gridId)?.pointSystem;
	if (!ps || !ps.race || ps.race.length === 0) return DEFAULT_POINT_SYSTEM;
	return {
		race: ps.race,
		sprint: ps.sprint && ps.sprint.length > 0 ? ps.sprint : DEFAULT_POINT_SYSTEM.sprint,
		poleBonus: ps.poleBonus ?? DEFAULT_POINT_SYSTEM.poleBonus,
		presenceBonus: ps.presenceBonus ?? DEFAULT_POINT_SYSTEM.presenceBonus,
		reservesScore: ps.reservesScore ?? DEFAULT_POINT_SYSTEM.reservesScore,
		maxRacecraftPoints: ps.maxRacecraftPoints ?? DEFAULT_POINT_SYSTEM.maxRacecraftPoints,
	};
};

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
	reservesEarnPoints?: boolean;
	podiumNameBgClass?: string;
	podiumPointsBgClass?: string;
	secondaryColor?: string;
	rowHoverColor?: string;
	accentHoverColor?: string;
	countdownBgColor?: string;
	standingsBgColor?: string;
	standingsBgEndColor?: string;
	podiumBgColor?: string;
}

// Mutable runtime array — starts with tenant defaults, updated by GridsContext when Firebase loads
let _runtimeGrids: GridConfig[] = tenant.grids as GridConfig[];

let _generalRaceAwards: RaceAward[] = [];

export const setGeneralRaceAwards = (awards: RaceAward[]) => {
	_generalRaceAwards = awards;
};

export const getEffectiveRaceAwards = (gridId: GridId): RaceAward[] => {
	const gridSpecific = getGridConfig(gridId)?.raceAwards ?? [];
	const generalIds = new Set(_generalRaceAwards.map((a) => a.id));
	const extra = gridSpecific.filter((a) => !generalIds.has(a.id));
	return [..._generalRaceAwards, ...extra];
};

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
