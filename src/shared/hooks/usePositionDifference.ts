import { useMemo } from "react";

export function usePositionDifference(
	newData: { name: string }[],
	oldData: { name: string }[],
	itemName: string,
): number {
	return useMemo(() => {
		if (!newData || !oldData) return 0;

		// Find the current position in the new data
		const newIndex = newData.findIndex((item) => item.name === itemName);
		const newPosition = newIndex !== -1 ? newIndex + 1 : null;

		// Find the old position in the old data
		const oldIndex = oldData.findIndex((item) => item.name === itemName);
		const oldPosition = oldIndex !== -1 ? oldIndex + 1 : null;

		// Calculate the difference
		if (newPosition !== null && oldPosition !== null) {
			return oldPosition - newPosition; // Positive = moved up, Negative = moved down
		}

		return 0; // No change or item not found
	}, [newData, oldData, itemName]);
}
