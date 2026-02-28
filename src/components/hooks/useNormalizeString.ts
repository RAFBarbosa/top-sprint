export const normalizeString = (str: string | undefined | null): string => {
	if (typeof str !== "string") return "";
	return str
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, "")
		.replace(/\s+/g, "")
		.trim();
};

// Keep default export for any existing usage
export default normalizeString;
