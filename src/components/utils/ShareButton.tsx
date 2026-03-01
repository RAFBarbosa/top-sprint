import React, { useState, useEffect } from "react";
import { toPng } from "html-to-image";
import IosShareIcon from "@mui/icons-material/IosShare";
import { tenant } from "../config/tenants";

interface ShareButtonProps {
	cardRef: React.RefObject<HTMLDivElement>;
	data: {
		name: string;
		rating: string;
	};
}

const ShareButton: React.FC<ShareButtonProps> = ({ cardRef, data }) => {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	// Wait for fonts to load
	useEffect(() => {
		const loadFonts = async () => {
			try {
				// This waits for all the fonts to be loaded before proceeding
				await document.fonts.ready;
				setFontsLoaded(true); // Mark fonts as loaded
			} catch (error) {
				console.error("Error loading fonts:", error);
			}
		};

		loadFonts();
	}, []);

	const buildPng = async () => {
		const element = cardRef.current;
		if (!element) {
			console.error("Card element not found");
			return "";
		}

		// Wait for all images inside the card to load
		const images = Array.from(element.querySelectorAll("img"));
		await Promise.all(
			images.map(
				(img) =>
					new Promise<void>((resolve) => {
						if (img.complete && img.naturalWidth > 0) {
							resolve();
						} else {
							img.onload = () => resolve();
							img.onerror = () => resolve(); // resolve anyway to not block
						}
					}),
			),
		);

		const options = {
			cacheBust: true,
			quality: 1,
			skipFonts: true, // don't try to inline external fonts
			filter: (node: HTMLElement) => {
				// skip link tags pointing to external stylesheets
				if (node.tagName === "LINK") {
					const rel = node.getAttribute("rel");
					const href = node.getAttribute("href") || "";
					if (
						rel === "stylesheet" &&
						(href.includes("fonts.googleapis.com") ||
							href.includes("rsms.me") ||
							href.includes("http"))
					) {
						return false;
					}
				}
				return true;
			},
		};

		// First pass to prime image cache
		await toPng(element, options);
		// Second pass for final output
		const dataUrl = await toPng(element, options);
		return dataUrl;
	};

	const removeWWW = (url: string) => {
		return url.replace(/^https?:\/\/(www\.)/, "https://");
	};

	const handleShareImage = async () => {
		// Ensure fonts are loaded
		if (cardRef.current && fontsLoaded) {
			try {
				const dataUrl = await buildPng();

				if (!dataUrl) {
					console.error("Failed to generate a valid image");
					return;
				}

				// Convert to blob and share
				const blob = await fetch(dataUrl).then((res) => res.blob());
				const file = new File([blob], `${data.name}_card.png`, {
					type: blob.type,
				});

				const fullUrl = `${window.location.origin}${window.location.pathname}`;

				const currentPath = removeWWW(fullUrl);

				if (navigator.share) {
					await navigator.share({
						title: `${data.name} Card`,
						text: `Confira o card do piloto ${data.name} da ${tenant.name}! ${currentPath}`,
						files: [file],
					});
				} else {
					console.warn(
						"Web Share API is not supported in this browser.",
					);
				}
			} catch (error) {
				console.error("Failed to share image:", error);
			}
		} else {
			console.error("Fonts are not loaded yet.");
		}
	};

	return (
		<button
			onClick={handleShareImage}
			className="px-4 py-2 text-white rounded w-full md:w-auto mx-auto cursor-pointer border-2 hover:text-f1-text transition-colors duration-200 flex justify-center items-center gap-2"
			style={{
				backgroundColor: "var(--color-brand-primary)",
				borderColor: "var(--color-brand-primary)",
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.backgroundColor = "transparent";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.backgroundColor =
					"var(--color-brand-primary)";
			}}
		>
			<div className="text-xs uppercase font-semibold flex items-center gap-1">
				<IosShareIcon fontSize="small" />
				<span>Compartilhe esse card </span>{" "}
			</div>
		</button>
	);
};

export default ShareButton;
