import React from "react";
import { toPng } from "html-to-image";
import ShareIcon from "@mui/icons-material/Share";

interface ShareButtonProps {
	cardRef: React.RefObject<HTMLDivElement>;
	data: {
		name: string;
		rating: string;
	};
}

const ShareButton: React.FC<ShareButtonProps> = ({ cardRef, data }) => {
	const handleShareImage = async () => {
		if (cardRef.current) {
			try {
				const dataUrl = await toPng(cardRef.current, {
					cacheBust: true,
					quality: 1,
					filter: (node) => {
						if (
							node.tagName === "DIV" &&
							node.classList.contains("rounded-xl")
						) {
							node.style.backgroundColor = "transparent";
						}
						return true;
					},
				});

				const blob = await fetch(dataUrl).then((res) => res.blob());
				const file = new File([blob], `${data.name}_card.png`, {
					type: blob.type,
				});

				if (navigator.share) {
					await navigator.share({
						title: `${data.name} Card`,
						text: `Olha o card do piloto ${data.name} da Liga Top Sprint! Será que ${data.rating} ta justo?`,
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
			<div className="text-xs uppercase font-semibold flex items-center gap-2">
				<span>Compartilhe esse card </span>{" "}
				<span>
					<ShareIcon fontSize="small" />
				</span>
			</div>
		</button>
	);
};

export default ShareButton;
