import { useState, useEffect } from "react";
import useCsvLoader from "./useCsvLoader";
import { useGetTeamsQuery } from "../../graphql/generated";
import useNormalizeString from "./useNormalizeString";

export function useEnhancedCards(activeTab: "gridA" | "gridB") {
	const { data } = useGetTeamsQuery();
	const { cards, stats } = useCsvLoader(activeTab);
	const [enhancedCards, setEnhancedCards] = useState<any[]>([]);

	useEffect(() => {
		if (data && cards && stats) {
			const enhancedDriversData = cards
				.map((card) => {
					const driverFromData = data?.drivers.find(
						(driverFromData) =>
							useNormalizeString(driverFromData.name) ===
							useNormalizeString(card.name)
					);
					if (!driverFromData) return null;

					const driverStats = stats.find(
						(stat) =>
							useNormalizeString(stat.name) ===
							useNormalizeString(card.name)
					);

					return {
						...card,
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

			setEnhancedCards(enhancedDriversData);
		}
	}, [data, cards, stats]);

	return enhancedCards;
}
