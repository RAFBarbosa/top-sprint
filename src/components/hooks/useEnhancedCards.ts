import { useState, useEffect } from "react";
import useCsvLoader from "./useCsvLoader";
import { useGetTeamsQuery } from "../../graphql/generated";
import useNormalizeString from "./useNormalizeString";

export function useEnhancedCards() {
	const { data } = useGetTeamsQuery();
	const { cards, stats } = useCsvLoader();
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
						city: driverFromData?.city || "",
						equipment: driverFromData?.equipment || "",
						photo: driverFromData?.photo?.url || "",
						teamName: driverFromData?.team?.name || "",
						teamColor: driverFromData?.team?.color?.hex || "",
						stats: driverStats || {},
					};
				})
				.filter(Boolean);

			setEnhancedCards(enhancedDriversData);
		}
	}, [data, cards, stats]);

	return enhancedCards;
}
