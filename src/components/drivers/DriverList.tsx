import React from "react";
import { Link } from "react-router-dom";
import { normalizeString } from "../../shared/utils/normalizeString";
import { tenant } from "../../shared/config/tenants";
import { HygraphImg } from "../utils/HygraphImg";
import { resizeHygraphUrl } from "../../shared/utils/hygraphImage";

interface DriverListProps {
	gridName: string;
	drivers: any[];
}

export const DriverList: React.FC<DriverListProps> = ({
	gridName,
	drivers,
}) => {
	return (
		<div>
			<div
				className={` ${
					drivers.some((driver) => driver.class === "classB")
						? "hidden"
						: ""
				}`}
			></div>
			<h2 className="text-xl font-bold">
				<div
					className={`font-extrabold text-4xl tracking-wide mb-6 ${
						gridName == "Reservas e Ex-Pilotos" && "border-t-4"
					}`}
				>
					{gridName}
				</div>
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{drivers.map((driver) => {
					const nameParts = driver.name.split(" ");
					const firstName = nameParts[0].replace(/-[BC]$/, "");
					const secondName =
						nameParts.length > 1
							? nameParts
									.slice(1)
									.join(" ")
									.replace(/-[BC]$/, "")
							: "";

					return (
						<Link
							key={driver.id ?? driver.name}
							to={`/pilotos/${normalizeString(driver.name.toLowerCase())}`}
							className="block p-4 border-t border-r rounded-tr-lg transition-all duration-200 group"
							onMouseEnter={(e) => {
								e.currentTarget.style.borderColor =
									driver.teamColor;
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.borderColor = "";
							}}
						>
							<div className="flex items-center overflow-hidden gap-1 group">
								<div
									className="rounded-full overflow-hidden border-1 border-f1-carbon transition-all duration-200 flex-shrink-0"
									style={{
										backgroundColor: driver.teamColor,
									}}
								>
									{tenant.defaultPhotoStyle === "round" ? (
										<HygraphImg
											src={
												driver.photo ||
												tenant.fallbackDriverPhoto
											}
											alt={driver.name}
											imgWidth={64}
											imgHeight={64}
											className="w-16 h-16 rounded-full object-cover transition-all duration-200 group-hover:scale-110"
										/>
									) : (
										<div
											className="w-16 h-16 scale-150 rounded-full bg-cover transition-all translate-y-[20px] duration-200 group-hover:scale-170"
											style={{
												backgroundImage: `url(${resizeHygraphUrl(driver.photo || tenant.fallbackDriverPhoto, 128)})`,
											}}
										/>
									)}
								</div>
								<span
									className="x-2 w-1 mx-2 self-center h-16"
									style={{
										backgroundColor: driver.teamColor
											? driver.teamColor
											: "",
									}}
								/>
								<div
									className={`flex flex-col ${
										gridName != "Reservas e Ex-Pilotos" &&
										"min-h-16"
									}`}
								>
									<p className="text-2xl font-regular leading-5">
										<span
											className={`${
												secondName
													? ""
													: "font-semibold uppercase"
											}`}
										>
											{firstName}
										</span>
										{secondName && (
											<span
												className={`font-semibold ml-1 ${
													secondName && "uppercase"
												}`}
											>
												{secondName}
											</span>
										)}
									</p>
									<p className="text-sm text-gray-600 mt-auto leading-3">
										{driver.teamName}
									</p>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default DriverList;
