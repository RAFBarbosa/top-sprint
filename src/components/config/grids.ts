export type GridId = "gridA" | "gridB";

export interface GridConfig {
	id: GridId;
	label: string;
	primaryColor: string;
	accentColor: string;
	hoverPrimaryColor: string;
	hoverAccentColor: string;
	standingsBgClass: string;
	standingsTitle: string;
	classes?: Array<{
		id: string;
		label: string;
		classColor: string;
		classHoverColor: string;
	}>;
	classLabels?: Record<string, string>;
}

export const GRIDS: readonly GridConfig[] = [
	{
		id: "gridA",
		label: "Top Sprint",
		primaryColor: "bg-f1-red",
		accentColor: "bg-f1-lightCarbon",
		hoverPrimaryColor: "hover:bg-f1-lightCarbon hover:text-white",
		hoverAccentColor: "hover:bg-f1-red hover:text-white",
		standingsBgClass:
			"bg-radial-[at_50%_150%] from-f1-red to-f1-carbon to-65%",
		standingsTitle: "",
	},
	{
		id: "gridB",
		label: "Academy",
		primaryColor: "bg-f1-academy",
		accentColor: "bg-f1-academy-blue",
		hoverPrimaryColor: "hover:bg-f1-academy-blue hover:text-white",
		hoverAccentColor: "hover:bg-f1-academy-dark hover:text-white",
		standingsBgClass:
			"bg-radial-[at_50%_100%] from-f1-academy-blue to-f1-academy-dark to-80%",
		standingsTitle: "Academy",
		// classes: [
		// 	{
		// 		id: "classA",
		// 		label: "Classe C",
		// 		classColor: "bg-f1-academy-blue",
		// 		classHoverColor: "hover:bg-f1-academy-blue hover:text-white",
		// 	},
		// 	{
		// 		id: "classB",
		// 		label: "Classe D",
		// 		classColor: "bg-f1-academy-dark",
		// 		classHoverColor: "hover:bg-f1-academy-dark hover:text-white",
		// 	},
		// ],
	},
];

export const getGridColor = (gridId: string) =>
	GRIDS.find((g) => g.id === gridId)?.primaryColor ?? "bg-white";

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
