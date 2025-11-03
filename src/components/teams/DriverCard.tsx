import { useState } from "react";
import useNavigateToDriver from "../hooks/useNavigateToDriver";
import useNormalizeString from "../hooks/useNormalizeString";
import { useTab } from "../../contexts/TabContext";

interface Driver {
	id: string;
	name: string;
	photo?: { url: string };
	teamColor?: string;
	number: string;
	class: string;
	grid: string;
	team?: {
		name: string;
		photo?: { url: string };
		class?: string;
	};
}

interface DriverCardProps {
	driver: Driver;
}

export function DriverCard({ driver }: DriverCardProps) {
	const [imageLoading, setImageLoading] = useState(true);
	const navigateToDriver = useNavigateToDriver();
	const { activeTab, setActiveTab } = useTab();

	const handleImageLoad = () => {
		setImageLoading(false);
	};

	const handleDriverClick = () => {
		// Set the active tab to the driver's grid if found and different from current
		if (driver.grid && driver.grid !== activeTab.id) {
			setActiveTab(driver.grid);
		}

		navigateToDriver(useNormalizeString(driver.name));
	};

	const getGridTitle = () => {
		switch (driver.grid) {
			case "gridA":
				return "Grid Heat";
			case "gridB":
				return "Grid Carbon";
			case "gridC":
				return "Grid Academy";
			default:
				return "Driver";
		}
	};

	// Name formatting logic extracted from JSX
	const formatDriverName = () => {
		const nameParts = driver.name
			.replace(/-[BC]\s*$/i, "")
			.trim()
			.split(" ");

		// Se tem apenas uma palavra (sem espaço)
		if (nameParts.length === 1) {
			return (
				<>
					{/* Espaço vazio no topo para manter o layout consistente */}
					<div className="h-6"></div>
					<p className="text-xl uppercase font-semibold leading-5 md:drop-shadow-lg">
						{nameParts[0]}
					</p>
				</>
			);
		}

		const firstName = nameParts[0];
		const lastName = nameParts.slice(1).join(" ");

		return (
			<>
				<p className="uppercase font-semibold leading-4 opacity-90 md:drop-shadow-lg">
					{firstName}
				</p>
				<p className="text-xl uppercase font-bold leading-5 md:drop-shadow-lg">
					{lastName}
				</p>
			</>
		);
	};

	// Class labeling logic based on active tab
	const getClassLabel = () => {
		if (activeTab.id === "gridC") {
			return driver.team?.class === "classA" ? "Classe C" : "Classe D";
		} else {
			return driver.team?.class === "classA" ? "Classe A" : "Classe B";
		}
	};

	return (
		<div
			className="rounded-lg md:shadow-md flex flex-col h-68 w-45 mx-auto cursor-pointer transition-all relative group mb-8 md:mb-0 overflow-hidden"
			style={{ backgroundColor: driver.teamColor }}
			onClick={handleDriverClick}
		>
			<div
				className="absolute inset-0 rounded-lg z-0 pointer-events-none opacity-10"
				style={{
					backgroundColor: "rgba(0, 0, 0, 0.3)",
					backgroundImage: "var(--background-image-dot-pattern)",
					backgroundSize: "2px 2px",
				}}
			/>

			{/* Team logo - behind everything, positioned at top */}
			<img
				className="w-25 h-25 object-cover absolute top-5 left-1/2 -translate-x-1/2 z-0 opacity-80 md:drop-shadow-lg md:transition-all md:duration-200 md:group-hover:scale-95 md:group-hover:-translate-y-1"
				src={driver.team?.photo?.url}
				alt={driver.team?.name}
			/>

			<div className="flex items-center justify-between p-4 relative z-10 text-white md:drop-shadow-lg">
				<div className="flex flex-col items-center">
					<span className="text-xs uppercase font-semibold">
						Classe
					</span>
					<span className="text-lg uppercase font-bold leading-4">
						{getClassLabel().split(" ")[1]}{" "}
					</span>
				</div>
				<div className="relative">
					<div className="w-10 h-8 flex items-center justify-center">
						<span className="text-xl uppercase italic font-bold leading-5 text-white tracking-wider">
							#{driver.number}
						</span>
					</div>
				</div>
			</div>

			{/* Foto do piloto */}
			<div className="flex-1 flex items-center justify-center p-4 relative z-10">
				<img
					src={
						driver.photo?.url ||
						"https://us-west-2.graphassets.com/cm9gqv6wb00c308jm0yap9zb6/cmam4ddx7kgoc08n61eyqeq84"
					}
					alt={driver.name}
					className={`w-55 h-55 object-cover md:transition-all md:duration-200 md:group-hover:scale-106 md:group-hover:translate-y-2 absolute top-3 ${
						!imageLoading ? "opacity-100" : "opacity-0"
					}`}
					style={{
						maskImage:
							"linear-gradient(to bottom, black 70%, transparent 89%)",
						WebkitMaskImage:
							"linear-gradient(to bottom, black 70%, transparent 89%)",
					}}
					onLoad={handleImageLoad}
				/>
			</div>

			{/* Informações do piloto */}
			<div
				className="text-white p-4 rounded-b-lg text-center z-10 tracking-wider"
				style={{
					background:
						"linear-gradient(to top, rgba(0,0,0,.3) 30%, rgba(255,255,255,0) 100%)",
				}}
			>
				{formatDriverName()}
			</div>
		</div>
	);
}
