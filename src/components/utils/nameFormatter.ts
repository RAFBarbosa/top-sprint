export interface SplitNameResult {
	firstName: string;
	lastName: string;
	suffix: "B" | "C" | null;
	fullName: string;
}

export const splitNameWithSuffix = (fullName: string): SplitNameResult => {
	const nameParts = fullName.split(" ");

	// Check for suffix in the last part
	const lastPart = nameParts[nameParts.length - 1];
	let suffix: "B" | "C" | null = null;
	let cleanedLastPart = lastPart;

	if (lastPart.endsWith("-B")) {
		suffix = "B";
		cleanedLastPart = lastPart.replace(/-B$/, "");
	} else if (lastPart.endsWith("-C")) {
		suffix = "C";
		cleanedLastPart = lastPart.replace(/-C$/, "");
	}

	// Update the last part with cleaned version
	nameParts[nameParts.length - 1] = cleanedLastPart;

	const firstName = nameParts[0];
	const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

	return {
		firstName,
		lastName,
		suffix,
		fullName: `${firstName} ${lastName}`.trim(),
	};
};
