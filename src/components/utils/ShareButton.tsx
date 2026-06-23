import React, { useState, useEffect } from "react";
import { toPng } from "html-to-image";
import IosShareIcon from "@mui/icons-material/IosShare";
import { useTenantConfig } from "../../contexts/TenantConfigContext";

interface ShareButtonProps {
	cardRef: React.RefObject<HTMLDivElement>;
	data: {
		name: string;
		rating: string;
	};
}

const ShareButton: React.FC<ShareButtonProps> = ({ cardRef, data }) => {
	const { name: tenantName } = useTenantConfig();
	const [fontsLoaded, setFontsLoaded] = useState(false);

	// Wait for fonts to load
	useEffect(() => {
		const loadFonts = async () => {
			try {
				await document.fonts.ready;
				setFontsLoaded(true);
			} catch {
				// fonts may not load on all browsers; image generation proceeds anyway
			}
		};

		loadFonts();
	}, []);

	// The buildPng workaround to retry and ensure the image size is large enough
	const buildPng = async () => {
		const element = cardRef.current;

		if (!element) {
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
			} catch {
				break;
			}
		}

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
						text: `Confira o card do piloto ${data.name} da ${tenantName}! ${currentPath}`,
						files: [file],
					});
				} else {
					console.warn(
						"Web Share API is not supported in this browser.",
					);
				}
			} catch {
				// share cancelled or failed — no feedback needed
			}
		}
	};

	return (
		<button
			onClick={handleShareImage}
			aria-label={`Compartilhar card de ${data.name}`}
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
				<IosShareIcon fontSize="small" aria-hidden="true" />
				<span>Compartilhe esse card </span>{" "}
			</div>
		</button>
	);
};

export default ShareButton;
