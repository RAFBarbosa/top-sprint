const useNormalizeString = (str: string | undefined | null) => {
	if (typeof str !== "string") return "";
	return str
		?.toLowerCase()
		.replace(/[^a-z0-9\s]/g, "")
		.replace(/\s+/g, "")
		.trim();
};

export default useNormalizeString;
