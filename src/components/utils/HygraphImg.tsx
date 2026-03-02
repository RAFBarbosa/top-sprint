import { ImgHTMLAttributes } from "react";
import { resizeHygraphUrl } from "../../shared/utils/hygraphImage";

interface HygraphImgProps extends ImgHTMLAttributes<HTMLImageElement> {
	src: string | null | undefined;
	alt: string;
	/** Requested width in CSS pixels. The component requests 2× for retina screens. */
	imgWidth: number;
	/** Requested height in CSS pixels. Omit for proportional resize. */
	imgHeight?: number;
	/** Compression quality 1–100 (default 80). */
	quality?: number;
	/** Resize fit mode (default "crop"). Use "clip" for logos/badges. */
	fit?: "crop" | "clip" | "clamp";
	/** Request WebP format (default true). */
	webp?: boolean;
}

/**
 * Drop-in replacement for `<img>` that automatically requests a
 * resized version from the Hygraph CDN. Non-Hygraph URLs are passed through.
 *
 * Usage:
 *   <HygraphImg src={driver.photo} imgWidth={280} imgHeight={330} alt={driver.name} className="..." />
 */
export function HygraphImg({
	src,
	alt,
	imgWidth,
	imgHeight,
	quality = 80,
	fit = "crop",
	webp = true,
	...imgProps
}: HygraphImgProps) {
	// Request at 2× for retina/HiDPI screens, capped at 1200px
	const dpr2Width = Math.min(imgWidth * 2, 1200);
	const dpr2Height = imgHeight ? Math.min(imgHeight * 2, 1200) : undefined;

	const optimizedSrc = resizeHygraphUrl(src, dpr2Width, dpr2Height, {
		quality,
		fit,
		webp,
	});

	return <img src={optimizedSrc || undefined} alt={alt} {...imgProps} />;
}
