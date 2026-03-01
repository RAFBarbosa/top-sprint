export const normalizeString = (str: string | undefined | null): string => {
	if (typeof str !== "string") return "";
	return str
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9\s]/g, "")
		.replace(/\s+/g, "")
		.trim();
};

export default normalizeString;
