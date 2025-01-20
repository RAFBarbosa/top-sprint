import { useState, useEffect } from "react";
import useCsvLoader from "./useCsvLoader";
import { useGetTeamsQuery } from "../../graphql/generated";

const normalizeString = (str: string | undefined | null) => {
	if (typeof str !== "string") return "";
	return str
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, "")
		.trim();
};

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
							normalizeString(driverFromData.name) ===
							normalizeString(card.name)
					);
					if (!driverFromData) return null;

					const driverStats = stats.find(
						(stat) =>
							normalizeString(stat.name) ===
							normalizeString(card.name)
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
