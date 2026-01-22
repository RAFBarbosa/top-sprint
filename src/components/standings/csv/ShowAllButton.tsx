import { ArrowForwardIos as MenuArrow } from "@mui/icons-material";

interface ShowAllButtonProps {
	showAll: boolean;
	setShowAll: (show: boolean) => void;
	dataLength: number;
}

export function ShowAllButton({
	showAll,
	setShowAll,
	dataLength,
}: ShowAllButtonProps) {
	if (dataLength <= 10) return null;

	return (
		<div className="flex justify-center mt-4">
			<button
				onClick={() => setShowAll(!showAll)}
				className="px-4 py-2 bg-f1-red text-white rounded w-full md:w-auto mx-auto hover:bg-transparent cursor-pointer border-2 border-f1-red hover:text-f1-text transition-colors duration-200 flex justify-center items-center gap-2"
			>
				<div className="text-xs uppercase font-semibold flex items-center gap-2">
					{showAll ? "Ver Top 10" : "Ver Classificação Completa"}
					<MenuArrow
						fontSize="inherit"
						className={`transition-transform duration-300 ${
							showAll ? "-rotate-90" : "rotate-90"
						}`}
					/>
				</div>
			</button>
		</div>
	);
}
