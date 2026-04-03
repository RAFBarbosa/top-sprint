import React from "react";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { normalizeString } from "../../shared/utils/normalizeString";
import { useLocation } from "react-router-dom";
import { tenant } from "../../shared/config/tenants";
import { HygraphImg } from "../utils/HygraphImg";
import { resizeHygraphUrl } from "../../shared/utils/hygraphImage";
import useNavigateToDriver from "../../shared/hooks/useNavigateToDriver";

interface Driver {
	id?: string;
	name: string;
	photo?: string;
	teamColor: string;
	grid: string;
}

interface MenuDriverListProps {
	gridName?: string;
	drivers: Driver[];
	photoStyle?: "portrait" | "round" | "bust";
}

const MenuDriverList: React.FC<MenuDriverListProps> = ({
	gridName = "",
	drivers,
	photoStyle,
}) => {
	const location = useLocation();
	const navigateToDriver = useNavigateToDriver();

	const splitDriverName = (name: string) => {
		const nameParts = name.split(" ");
		const firstName = nameParts[0].replace(/-[BC]$/, "");
		const secondName = nameParts
			.slice(1)
			.join(" ")
			.replace(/-[BC]$/, "");
		return { firstName, secondName };
	};

	const getCleanName = (name: string) => {
		return name.replace(/-[BC]$/, "");
	};

	const handleDriverClick = (driverName: string) => {
		const cleanName = getCleanName(driverName);
		navigateToDriver(normalizeString(cleanName));
	};
	return (
		<div className="w-full px-3">
			<h2
				className={`font-extrabold text-3xl tracking-wide mb-6 ${
					gridName == "Reservas e Ex-Pilotos"
						? "border-t-1 border-t-white/30 mb-4 pt-2"
						: "mb-4"
				}`}
			>
				{gridName}
			</h2>
			<ul
				className={`grid gap-x-6 gap-y-3 ${
					gridName == "Reservas e Ex-Pilotos"
						? "md:grid-cols-4"
						: "md:grid-cols-4"
				}`}
			>
				{drivers.map((driver) => {
					const { firstName, secondName } = splitDriverName(
						driver.name,
					);
					return (
						<li
							key={driver.id ?? driver.name}
							className="border-b-1 border-r-1 rounded-br-lg py-2 flex justify-between items-center cursor-pointer transition-colors duration-200"
							style={{
								borderColor:
									location.pathname ===
									`/pilotos/${driver.name.toLowerCase().replace(/\s+/g, "-")}`
										? driver.teamColor
										: "rgba(255, 255, 255, 0.5)",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.borderColor =
									driver.teamColor;
							}}
							onMouseLeave={(e) => {
								if (
									location.pathname !==
									`/pilotos/${driver.name.toLowerCase().replace(/\s+/g, "-")}`
								) {
									e.currentTarget.style.borderColor =
										"rgba(255, 255, 255, 0.5)";
								}
							}}
							onClick={() => handleDriverClick(driver.name)}
							role="button"
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									handleDriverClick(driver.name);
								}
							}}
							aria-label={`Ver perfil de ${driver.name}`}
						>
							<div className="flex items-center">
								<div
									className="mr-2 flex-shrink-0 rounded-full overflow-hidden transition-all duration-200"
									style={{
										backgroundColor: driver.teamColor,
										width: "32px",
										height: "32px",
									}}
								>
									{photoStyle === "round" ? (
										<HygraphImg
											src={
												driver.photo ||
												tenant.fallbackDriverPhoto
											}
											alt={driver.name}
											imgWidth={32}
											imgHeight={32}
											className="w-full h-full object-cover"
										/>
									) : photoStyle === "bust" ? (
										<div
											className="w-8 h-8 bg-cover transition-all scale-120 translate-y-[5px]"
											style={{
												backgroundImage: `url(${resizeHygraphUrl(driver.photo, 264)})`,
											}}
										/>
									) : (
										<div
											className="w-8 h-8 bg-cover transition-all scale-210 translate-y-[17px]"
											style={{
												backgroundImage: `url(${resizeHygraphUrl(driver.photo, 264)})`,
											}}
										/>
									)}
								</div>
								<span>
									<span
										className={
											secondName
												? ""
												: "font-bold uppercase"
										}
									>
										{firstName}
									</span>
									{secondName && (
										<span className="font-bold ml-1 uppercase">
											{secondName}
										</span>
									)}
								</span>
							</div>
							<ArrowForwardIos
								fontSize="inherit"
								className="mr-2"
								aria-hidden="true"
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default MenuDriverList;
