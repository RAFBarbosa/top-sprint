import { useState } from "react";
import useNavigateToDriver from "../../shared/hooks/useNavigateToDriver";
import { normalizeString } from "../../shared/utils/normalizeString";
import { useTab } from "../../contexts/TabContext";
import { getGridConfig } from "../../shared/config/grids";
import { tenant } from "../../shared/config/tenants";
import { HygraphImg } from "../utils/HygraphImg";

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

		navigateToDriver(normalizeString(driver.name));
	};

	const gridConfig = getGridConfig(driver.grid);
	const isRound = tenant.defaultPhotoStyle === "round";
	const isBust = tenant.defaultPhotoStyle === "bust";

	const getGridTitle = () => {
		return getGridConfig(driver.grid)?.label ?? "Driver";
	};

	const formatDriverName = () => {
		const nameParts = driver.name
			.replace(/-[BC]\s*$/i, "")
			.trim()
			.split(" ");

		if (nameParts.length === 1) {
			return (
				<>
					<div className="h-6"></div>
					<p className="tenant-drivercard-lastname text-xl uppercase font-semibold leading-5 md:drop-shadow-lg">
						{nameParts[0]}
					</p>
				</>
			);
		}

		const firstName = nameParts[0];
		const lastName = nameParts.slice(1).join(" ");

		return (
			<>
				<p className="tenant-drivercard-firstname uppercase font-semibold leading-4 opacity-90 md:drop-shadow-lg">
					{firstName}
				</p>
				<p className="tenant-drivercard-lastname text-xl uppercase font-bold leading-5 md:drop-shadow-lg">
					{lastName}
				</p>
			</>
		);
	};

	const getClassLabel = () => {
		return driver.team?.class === "classA" ? "Classe A" : "Classe B";
	};

	return (
		<div
			role="button"
			tabIndex={0}
			aria-label={`Ver perfil de ${driver.name}`}
			className="rounded-lg md:shadow-md flex flex-col h-68 w-45 mx-auto cursor-pointer transition-all relative group mb-8 md:mb-0 overflow-hidden"
			style={{ backgroundColor: driver.teamColor }}
			onClick={handleDriverClick}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					handleDriverClick();
				}
			}}
		>
			<div
				className="dot-pattern absolute inset-0 rounded-lg z-0 pointer-events-none opacity-10"
				style={{
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					backgroundImage: "var(--background-image-dot-pattern)",
				}}
			/>

			<HygraphImg
				className={`h-22 object-cover absolute top-2 left-1/2 -translate-x-1/2 z-0 opacity-80 md:drop-shadow-lg ${
					!isRound
						? "md:transition-all md:duration-200 md:group-hover:scale-95 md:group-hover:-translate-y-1"
						: ""
				}`}
				src={driver.team?.photo?.url || tenant.logo.url}
				alt={driver.team?.name ?? ""}
				imgWidth={180}
				fit="clip"
			/>

			{/* <div className="flex items-center justify-between p-4 relative z-10 text-white md:drop-shadow-lg">
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
			</div> */}

			{/* Foto do piloto */}
			<div className="flex-1 flex items-center justify-center p-4 relative z-10">
				<HygraphImg
					src={driver.photo?.url || tenant.fallbackDriverPhoto}
					alt={driver.name}
					imgWidth={140}
					// imgHeight={140}
					className={`object-cover md:transition-all md:duration-200 md:group-hover:scale-105 absolute ${
						isRound
							? "w-35 h-35 rounded-full top-37 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-white/20"
							: isBust
								? "w-50 h-50 top-18 md:group-hover:translate-y-2"
								: "w-58 h-58 top-16 md:group-hover:translate-y-2"
					} ${!imageLoading ? "opacity-100" : "opacity-0"}`}
					style={
						isRound
							? undefined
							: {
									maskImage:
										"linear-gradient(to bottom, black 70%, transparent 89%)",
									WebkitMaskImage:
										"linear-gradient(to bottom, black 70%, transparent 89%)",
								}
					}
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
				{(driver as any).reserve && (
					<span className="block text-[9px] font-bold uppercase tracking-widest text-white/70 mb-0.5">
						Reserva
					</span>
				)}
				{formatDriverName()}
			</div>
		</div>
	);
}
