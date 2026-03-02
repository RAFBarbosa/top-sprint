/**
 * Transforms a Hygraph (graphassets.com) asset URL to request a
 * resized and compressed version from their CDN.
 *
 * Hygraph CDN supports transformation path segments inserted between
 * the project ID and the asset handle:
 *
 *   Original: https://us-west-2.graphassets.com/[envId]/[handle]
 *   Resized:  https://us-west-2.graphassets.com/[envId]/resize=width:400,height:300,fit:crop/quality=value:80/output=format:webp/[handle]
 *
 * Non-Hygraph URLs (local assets, other CDNs) are returned unchanged.
 */
export function resizeHygraphUrl(
	url: string | null | undefined,
	width: number,
	height?: number,
	options: { quality?: number; fit?: "crop" | "clip" | "clamp"; webp?: boolean } = {},
): string {
	if (!url) return url ?? "";
	if (!url.includes("graphassets.com")) return url;

	// URL structure: https://[region].graphassets.com/[envId]/[handle]
	// There may already be transformation segments — don't double-transform.
	if (url.includes("resize=")) return url;

	const { quality = 80, fit = "crop", webp = true } = options;

	const lastSlash = url.lastIndexOf("/");
	const base = url.slice(0, lastSlash + 1); // includes trailing slash
	const handle = url.slice(lastSlash + 1);

	const resizePart = height
		? `resize=width:${width},height:${height},fit:${fit}`
		: `resize=width:${width}`;

	const qualityPart = `quality=value:${quality}`;
	const formatPart = webp ? "output=format:webp" : "";

	const transforms = [resizePart, qualityPart, formatPart].filter(Boolean).join("/");

	return `${base}${transforms}/${handle}`;
}
