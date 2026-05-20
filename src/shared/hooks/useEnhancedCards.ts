import { useMemo } from "react";
import useCsvLoader from "./useCsvLoader";
import { useFirebaseDrivers } from "./useFirebaseDrivers";
import { GridId } from "../../shared/config/grids";
import { normalizeString } from "../utils/normalizeString";

export function useEnhancedCards(gridId: GridId) {
	const { drivers: driversList } = useFirebaseDrivers();

	const { cards, stats, loading, error } = useCsvLoader({
		gridId: gridId,
	});

	const enhancedCards = useMemo(() => {
		if (!driversList.length || !cards || !stats) {
			return [];
		}

		return cards
			.map((card: any) => {
				const cardNameNormalized = normalizeString(
					card.name.replace(/-[BCbc]$/, ""),
				);
				const driverFromData = driversList.find((d: any) =>
					card.id
						? d.id === card.id
						: normalizeString(d.name) === cardNameNormalized,
				);

				if (!driverFromData)
					return {
						...card,
						grid: "",
						class: "",
						photo: "",
						teamName: "",
						teamLogo: "",
						teamColor: "",
						stats: {},
						badge: "",
						badgeTitle: "",
					};

				const driverStats = stats.find((stat: any) =>
					card.id
						? stat.id === card.id
						: normalizeString(stat.name) === cardNameNormalized,
				);

				return {
					...card,
					id: driverFromData?.id || "",
					name: driverFromData?.name || card.name,
					stream: driverFromData?.stream || "",
					grid: driverFromData?.grid || "",
					class: driverFromData?.class || "",
					city: driverFromData?.city || "",
					equipment: driverFromData?.equipment || "",
					photo: driverFromData?.photo?.url || "",
					teamName: driverFromData?.team?.name || "",
					teamLogo: driverFromData?.team?.photo?.url || "",
					teamColor: driverFromData?.team?.color?.hex || "",
					stats: driverStats || {},
					badge: driverFromData?.badge || "",
					badgeTitle: driverFromData?.badgeTitle || "",
				};
			})
			.filter(Boolean);
	}, [data, cards, stats]);

	return {
		enhancedCards,
		loading,
		error,
	};
}

export default useEnhancedCards;
