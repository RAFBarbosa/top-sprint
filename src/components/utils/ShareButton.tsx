import React from "react";
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
	const handleShareImage = async () => {
		// Ensure cardRef.current is not null
		if (cardRef.current) {
			try {
				// Function to build the PNG with retry logic
				const buildPng = async () => {
					const element = cardRef.current; // Now, TypeScript knows element is not null
					let dataUrl = "";
					const minDataLength = 2000000; // Minimum length of the data URL to be valid
					let i = 0;
					const maxAttempts = 10; // Maximum number of retries

					// Retry generating the image until it meets the length requirement or we hit the max attempts
					while (dataUrl.length < minDataLength && i < maxAttempts) {
						// Check if element is not null before passing to toPng
						if (element) {
							dataUrl = await toPng(element, {
								cacheBust: true,
								quality: 1,
								filter: (node) => {
									// Make background transparent for certain elements (optional)
									if (
										node.tagName === "DIV" &&
										node.classList.contains("rounded-xl")
									) {
										node.style.backgroundColor =
											"transparent";
									}
									return true;
								},
							});
						}
						i += 1;
					}

					return dataUrl;
				};

				const dataUrl = await buildPng();

				if (dataUrl.length < 2000000) {
					console.error("Image generation failed or was incomplete.");
					return;
				}

				// Convert the dataUrl to a Blob and then a File
				const blob = await fetch(dataUrl).then((res) => res.blob());
				const file = new File([blob], `${data.name}_card.png`, {
					type: blob.type,
				});

				// Check if the Web Share API is available and share the image
				if (navigator.share) {
					await navigator.share({
						title: `${data.name} Card`,
						text: `Olha o card do piloto ${data.name} da Liga Top Sprint! Será que ${data.rating} tá justo?`,
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
