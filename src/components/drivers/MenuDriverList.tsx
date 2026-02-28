import React from "react";
import { ArrowForwardIos as MenuArrow } from "@mui/icons-material";
import { normalizeString } from "../hooks/useNormalizeString";
import { useLocation } from "react-router-dom";

interface Driver {
	id?: string;
	name: string;
	photo?: string;
	teamColor: string;
	grid: string;
}

interface MenuDriverListProps {
	gridName: string;
	drivers: Driver[];
	onDriverClick: (driverName: string) => void;
}

const MenuDriverList: React.FC<MenuDriverListProps> = ({
	gridName,
	drivers,
	onDriverClick,
}) => {
	const location = useLocation();

	const splitDriverName = (name: string) => {
		const nameParts = name.split(" ");
		const firstName = nameParts[0].replace(/-[BC]$/, "");
		const secondName = nameParts
			.slice(1)
			.join(" ")
			.replace(/-[BC]$/, "");
		return { firstName, secondName };
	};

	return (
		<div className="w-full px-3">
			<h2
				className={`font-extrabold text-3xl tracking-wide mb-6 ${
					// className={`font-f1Title text-lg tracking-wider ${
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
									normalizeString(location.pathname) ===
									normalizeString(`/pilotos/${driver.name}`)
										? driver.teamColor
										: "rgba(255, 255, 255, 0.5)",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.borderColor =
									driver.teamColor;
							}}
							onMouseLeave={(e) => {
								if (
									normalizeString(location.pathname) !==
									normalizeString(`/pilotos/${driver.name}`)
								) {
									e.currentTarget.style.borderColor =
										"rgba(255, 255, 255, 0.5)";
								}
							}}
							onClick={() => onDriverClick(driver.name)}
						>
							<div className="flex items-center">
								<div
									className="mr-2 rounded-full overflow-hidden transition-all duration-200"
									style={{
										backgroundColor: driver.teamColor,
									}}
								>
									<div
										className="w-8 h-8 scale-150 rounded-full bg-cover transition-all translate-y-[12px]"
										style={{
											backgroundImage: `url(${driver.photo})`,
										}}
									/>
								</div>
								{/* <span
									className="ml-1 mr-2 w-1 h-4"
									style={{
										backgroundColor:
											driver.teamColor || "#fff",
									}}
								/> */}
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
							<MenuArrow fontSize="inherit" className="mr-2" />
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default MenuDriverList;
