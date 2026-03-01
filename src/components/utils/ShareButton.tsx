import React, { useState, useEffect } from "react";
import { toPng } from "html-to-image";
import IosShareIcon from "@mui/icons-material/IosShare";
import { tenant } from "../config/tenants";
const titilliumRegular = new URL(
	"../assets/font/TitilliumWeb-Regular.ttf",
	import.meta.url,
).href;
const titilliumBold = new URL(
	"../assets/font/TitilliumWeb-Bold.ttf",
	import.meta.url,
).href;
const titilliumSemiBold = new URL(
	"../assets/font/TitilliumWeb-SemiBold.ttf",
	import.meta.url,
).href;

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

		const toBase64 = async (url: string) => {
			const res = await fetch(url);
			const buf = await res.arrayBuffer();
			console.log("Font buffer size:", buf.byteLength, "for", url);
			if (buf.byteLength < 1000) {
				console.error(
					"Font file too small, likely not loading correctly",
				);
				return "";
			}
			const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
			return `data:font/ttf;base64,${base64}`;
		};

		const [regularB64, boldB64, semiBoldB64] = await Promise.all([
			toBase64(titilliumRegular),
			toBase64(titilliumBold),
			toBase64(titilliumSemiBold),
		]);

		const fontEmbedCSS = `
    @font-face {
        font-family: 'Titillium Web Local';
        font-weight: 400;
        src: url(${regularB64}) format('truetype');
    }
    @font-face {
        font-family: 'Titillium Web Local';
        font-weight: 600;
        src: url(${semiBoldB64}) format('truetype');
    }
    @font-face {
        font-family: 'Titillium Web Local';
        font-weight: 700;
        src: url(${boldB64}) format('truetype');
    }
`;

		const options = {
			cacheBust: true,
			quality: 1,
			fontEmbedCSS,
			skipFonts: false,
			filter: (node: HTMLElement) => {
				if (node.tagName === "LINK") {
					const href = node.getAttribute("href") || "";
					if (href.includes("http")) return false;
				}
				return true;
			},
		};

		await toPng(element, options);
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
