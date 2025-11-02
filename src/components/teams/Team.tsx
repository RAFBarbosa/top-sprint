import { Skeleton } from "@mui/material";
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
}

interface TeamProps {
	name: string;
	logo: string;
	teamClass?: string;
	teamColor?: string;
	gridA: Driver[];
	gridB: Driver[];
}

export function Team({
	name,
	logo,
	teamClass,
	teamColor,
	gridA,
	gridB,
}: TeamProps) {
	const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>(
		{}
	);

	const navigateToDriver = useNavigateToDriver();
	const { activeTab, setActiveTab } = useTab();

	const handleImageLoad = (id: string) => {
		setLoadingImages((prev) => ({ ...prev, [id]: false }));
	};

	const handleDriverClick = (driverName: string) => {
		const driverInGridA = gridA.find(
			(driver) =>
				useNormalizeString(driver.name) ===
				useNormalizeString(driverName)
		);

		// Check if driver is in gridB
		const driverInGridB = gridB.find(
			(driver) =>
				useNormalizeString(driver.name) ===
				useNormalizeString(driverName)
		);

		// Determine the driver's grid
		const driverGrid = driverInGridA
			? "gridA"
			: driverInGridB
			? "gridB"
			: null;

		// Set the active tab to the driver's grid if found and different from current
		if (driverGrid && driverGrid !== activeTab.id) {
			setActiveTab(driverGrid);
		}

		navigateToDriver(useNormalizeString(driverName));
	};

	return (
		<div
			className="p-4 rounded-lg shadow-md flex justify-center items-center min-h-110 border-b-20"
			style={{ borderColor: teamColor }}
		>
			<div className="flex flex-col md:flex-row gap-5 md:gap-15">
				<div className="order-2 md:order-1">
					<h3 className="font-bold uppercase text-xl mb-2 md:mb-4 text-center">
						Grid Heat
					</h3>
					<div className="flex flex-wrap gap-4 justify-center">
						{gridA.map((driver) => (
							<div
								key={driver.id}
								className="relative w-[120px] md:w-[160px] cursor-pointer hover:opacity-90 transition-all group "
								onClick={() => handleDriverClick(driver.name)}
							>
								{(loadingImages[driver.id] ?? true) && (
									<Skeleton
										variant="rounded"
										width={160}
										height={160}
									/>
								)}
								<div className="relative">
									<img
										src={
											driver.photo?.url ||
											"https://us-west-2.graphassets.com/cm9gqv6wb00c308jm0yap9zb6/cmam4ddx7kgoc08n61eyqeq84"
										}
										alt={driver.name}
										className={`w-[150px] h-[150px] md:w-[160px] md:h-[160px] object-cover transition-all duration-300 group-hover:scale-102 ${
											loadingImages[driver.id] === false
												? "opacity-100"
												: "opacity-0"
										}`}
										onLoad={() =>
											handleImageLoad(driver.id)
										}
									/>
									<div
										className="absolute bottom-0 left-0 right-0 h-[60px]"
										style={{
											background:
												"linear-gradient(to top, rgba(255,255,255,1) 55%, rgba(255,255,255,0) 100%)",
										}}
									/>
								</div>
								<p className="text-center -mt-5 text-lg md:text-xl uppercase font-semibold leading-5 relative z-10 bg-white">
									{driver.name
										.replace(/-[BC]\s*$/i, "")
										.trim()}
								</p>
								<p className="text-center pt-1 text-lg md:text-xl uppercase italic leading-5 relative z-10 bg-white">
									{driver.number}
								</p>
							</div>
						))}
					</div>
				</div>

				<div className="order-1 md:order-2 flex flex-col items-center justify-center gap-2 md:mb-0 mb-2 text-center">
					<h2 className="font-f1Title text-sm md:text-base uppercase -mb-2 mt-2 md:mt-0">
						{name}
					</h2>
					<p className="text-center mt-1 text-base uppercase italic leading-5 relative z-10 mb-2">
						{teamClass === "classA" ? "Classe A" : "Classe B"}
					</p>
					<img
						className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] object-cover"
						src={logo}
						alt={name}
					/>
				</div>

				<div className="order-3">
					<h3 className="font-bold uppercase text-xl mb-2 md:mb-4 text-center">
						Grid Carbon
					</h3>
					<div className="flex flex-wrap gap-4 justify-center">
						{gridB.map((driver) => (
							<div
								key={driver.id}
								className="relative w-[120px] md:w-[160px] cursor-pointer hover:opacity-90 transition-all group"
								onClick={() => handleDriverClick(driver.name)}
							>
								{(loadingImages[driver.id] ?? true) && (
									<Skeleton
										variant="rounded"
										width={160}
										height={160}
									/>
								)}
								<div className="relative">
									<img
										src={
											driver.photo?.url ||
											"https://us-west-2.graphassets.com/cm9gqv6wb00c308jm0yap9zb6/cmam4ddx7kgoc08n61eyqeq84"
										}
										alt={driver.name}
										className={`w-[150px] h-[150px] md:w-[160px] md:h-[160px] object-cover transition-all duration-300 group-hover:scale-102 ${
											loadingImages[driver.id] === false
												? "opacity-100"
												: "opacity-0"
										}`}
										onLoad={() =>
											handleImageLoad(driver.id)
										}
									/>
									<div
										className="absolute bottom-0 left-0 right-0 h-[60px]"
										style={{
											background:
												"linear-gradient(to top, rgba(255,255,255,1) 55%, rgba(255,255,255,0) 100%)",
										}}
									/>
								</div>
								<p className="text-center -mt-5 text-lg md:text-xl uppercase font-semibold leading-5 relative z-10 bg-white">
									{driver.name
										.replace(/-[BC]\s*$/i, "")
										.trim()}
								</p>
								<p className="text-center pt-1 text-lg md:text-xl uppercase italic leading-5 relative z-10 bg-white">
									{driver.number}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
