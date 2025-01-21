import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEnhancedCards } from "../components/hooks/useEnhancedCards";
import useNormalizeString from "../components/hooks/useNormalizeString";

const Drivers: React.FC = () => {
	const enhancedCards = useEnhancedCards();

	return (
		<div className="bg-f1-lightSilver w-full pt-4 pb-8">
			<div className="h-16 bg-divider bg-cover mb-4 opacity-5 max-w-screen-xl mx-auto"></div>
			<div className="max-w-screen-xl mx-auto bg-white rounded p-6">
				<div className="border-t-8 border-r-8 border-f1-carbon rounded-tr-3xl pt-3 relative mb-8">
					<h1 className="font-extrabold text-4xl md:text-6xl tracking-wide">
						Pilotos
					</h1>
				</div>
				<div className="p-3 w-full h-auto bg-f1-bg-silver bg-cover bg-opacity-5 rounded-xl tracking-normal mb-8">
					Confira o line-up oficial e os cards desta temporada.
					Detalhamento completo dos pilotos, pontos e resultados.
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{enhancedCards.map((driver) => {
						const nameParts = driver.name.split(" ");
						const firstName = nameParts[0];
						const secondName =
							nameParts.length > 1
								? nameParts.slice(1).join(" ")
								: "";

						return (
							<Link
								key={driver.name}
								to={`/pilotos/${useNormalizeString(
									driver.name.toLowerCase()
								)}`}
								className="block p-4 border-t border-r rounded-tr-lg transition-all duration-200 group"
								onMouseEnter={(e) => {
									e.currentTarget.style.borderColor =
										driver.teamColor;
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.borderColor = "black";
								}}
							>
								<div className="flex items-center overflow-hidden gap-1 group">
									<div
										className="rounded-full overflow-hidden border-1 border-f1-carbon transition-all duration-200"
										style={{
											backgroundColor: driver.teamColor,
										}}
									>
										<div
											className="w-16 h-16 scale-150 rounded-full bg-cover transition-all translate-y-[20px] duration-200 group-hover:scale-170"
											style={{
												backgroundImage: `url(${driver.photo})`,
											}}
										/>
									</div>
									<span
										className="mx-2 w-1 self-stretch"
										style={{
											backgroundColor: driver.teamColor,
										}}
									></span>
									<div className="flex flex-col justify-between min-h-[60px]">
										<p className="text-2xl font-regular">
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
													className={`font-semibold md:ml-1 ${
														secondName
															? "uppercase"
															: "ml-1"
													}`}
												>
													{secondName}
												</span>
											)}
										</p>
										<p className="text-sm text-gray-600">
											{driver.teamName}
										</p>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Drivers;
