import React, { useState, useEffect } from "react";
import { toPng } from "html-to-image";
import IosShareIcon from "@mui/icons-material/IosShare";

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

	// The buildPng workaround to retry and ensure the image size is large enough
	const buildPng = async () => {
		const element = cardRef.current;

		if (!element) {
			console.error("Card element not found");
			return "";
		}

		let dataUrl = "";
		const minDataLength = 2000000; // 2MB minimum size
		let i = 0;
		const maxAttempts = 10;

		while (dataUrl.length < minDataLength && i < maxAttempts) {
			try {
				dataUrl = await toPng(element, {
					cacheBust: true,
					quality: 1,
				});
				i += 1;
			} catch (error) {
				console.error("Error generating PNG image:", error);
				break;
			}
		}

		return dataUrl;
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

				const currentPath = `${window.location.origin}${window.location.pathname}`;

				if (navigator.share) {
					await navigator.share({
						title: `${data.name} Card`,
						text: `Confira o card do piloto ${data.name} da Liga Top Sprint! ${currentPath}`,
						files: [file],
					});
				} else {
					console.warn(
						"Web Share API is not supported in this browser."
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
			className="px-4 py-2 bg-f1-red text-white rounded w-full md:w-auto mx-auto hover:bg-transparent cursor-pointer border-2 border-f1-red hover:text-f1-text transition-colors duration-200 flex justify-center items-center gap-2"
		>
			<div className="text-xs uppercase font-semibold flex items-center gap-1">
				<IosShareIcon fontSize="small" />
				<span>Compartilhe esse card </span>{" "}
			</div>
		</button>
	);
};

export default ShareButton;
