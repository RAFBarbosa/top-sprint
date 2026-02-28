import { useState, useEffect, useMemo } from "react";
import useCsvLoader from "./useCsvLoader";
import { useGetTeamsQuery } from "../../graphql/generated";
import { GridId } from "../config/grids";

// Helper function for normalization (same as in useCsvLoader)
const normalizeString = (str: string): string => {
	return str
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/\s+/g, " ")
		.trim();
};

export function useEnhancedCards(gridId: GridId) {
	// ← Changed parameter name
	const { data } = useGetTeamsQuery();

	const { cards, stats, loading, error } = useCsvLoader({
		gridId: gridId, // ← Now this is correct
	});

	const enhancedCards = useMemo(() => {
		if (!data || !cards || !stats) {
			return [];
		}

		return cards
			.map((card) => {
				const driverFromData = data?.drivers?.find(
					(driverFromData) =>
						normalizeString(driverFromData.name) ===
						normalizeString(card.name),
				);

				if (!driverFromData) return null;

				const driverStats = stats.find(
					(stat) =>
						normalizeString(stat.name) ===
						normalizeString(card.name),
				);

				return {
					...card,
					id: driverFromData?.id || "",
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
