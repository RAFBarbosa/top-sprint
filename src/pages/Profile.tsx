import { useState, useEffect, useRef } from "react";
import PlayerCard from "../components/utils/PlayerCard";
import ShareButton from "../components/utils/ShareButton";
import { useEnhancedCards } from "../components/hooks/useEnhancedCards";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowForwardIos as MenuArrow } from "@mui/icons-material";
import useNormalizeString from "../components/hooks/useNormalizeString";
import LiveTvIcon from "@mui/icons-material/LiveTv";

export function Profile() {
	const { driverName } = useParams<{ driverName: string }>();
	const enhancedCards = useEnhancedCards();
	const navigate = useNavigate();
	const [currentIndex, setCurrentIndex] = useState<number | null>(null);
	const cardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const index = enhancedCards.findIndex(
			(driver) =>
				useNormalizeString(driver.name.toLowerCase()) ===
				useNormalizeString(driverName?.toLowerCase())
		);
		setCurrentIndex(index >= 0 ? index : enhancedCards.length - 1);
	}, [driverName, enhancedCards]);

	const handlePrevClick = () => {
		if (currentIndex !== null && currentIndex > 0) {
			const prevDriver = enhancedCards[currentIndex - 1];
			navigate(`/pilotos/${useNormalizeString(prevDriver.name)}`);
		}
	};

	const handleNextClick = () => {
		if (currentIndex !== null && currentIndex < enhancedCards.length - 1) {
			const nextDriver = enhancedCards[currentIndex + 1];
			navigate(`/pilotos/${useNormalizeString(nextDriver.name)}`);
		}
	};

	const driverData =
		currentIndex !== null ? enhancedCards[currentIndex] : null;

	return (
		currentIndex !== null &&
		enhancedCards.length > 0 && (
			<aside
				id="perfil"
				className="bg-f1-bg-silver py-8 flex flex-col grow"
			>
				<div>
					<div className="max-w-screen-xl mx-auto mb-8 flex flex-col sm:flex-row justify-between px-3">
						<h1 className="font-extrabold text-4xl md:text-6xl tracking-wide md:self-end border-b-10 w-full">
							Perfil do Piloto
						</h1>
						<div className="flex justify-between gap-1 h-25 mt-2 md:mt-0 sm:ml-2">
							{/* Previous Button */}
							<button
								onClick={handlePrevClick}
								disabled={
									currentIndex === null || currentIndex === 0
								}
								className={`bg-f1-lightSilver text-f1-text font-bold px-2 rounded-l border-b-4 md:w-[180px] overflow-hidden transition-all duration-200 w-full ${
									currentIndex === null || currentIndex === 0
										? "opacity-50 cursor-not-allowed"
										: "hover:opacity-80 cursor-pointer"
								}`}
								style={{
									borderColor: `${
										currentIndex > 0
											? enhancedCards[currentIndex - 1]
													.teamColor
											: ""
									}`,
								}}
							>
								<div className="pt-2 flex items-center justify-around">
									<p className="text-sm uppercase space-y-2 flex flex-col items-center">
										<span>Anterior</span>
										<MenuArrow className="rotate-180" />
									</p>
									<div className="flex items-center">
										<div
											className="w-22 h-22 bg-cover translate-y-[10px] scale-120"
											style={{
												backgroundImage: `url(${
													currentIndex > 0
														? enhancedCards[
																currentIndex - 1
														  ].photo
														: ""
												})`,
											}}
										/>
									</div>
								</div>
							</button>

							{/* Next Button */}
							<button
								onClick={handleNextClick}
								disabled={
									currentIndex === null ||
									currentIndex === enhancedCards.length - 1
								}
								className={`bg-f1-lightSilver text-f1-text font-bold pr-2 rounded-r border-b-4 md:w-[180px] overflow-hidden transition-all duration-200 w-full ${
									currentIndex === null ||
									currentIndex === enhancedCards.length - 1
										? "opacity-50 cursor-not-allowed"
										: "hover:opacity-80 cursor-pointer"
								}`}
								style={{
									borderColor: `${
										currentIndex < enhancedCards.length - 1
											? enhancedCards[currentIndex + 1]
													.teamColor
											: ""
									}`,
								}}
							>
								<div className="pt-2 flex items-center justify-around">
									<div className="flex items-center">
										<div
											className="w-22 h-22 bg-cover translate-y-[10px] scale-120"
											style={{
												backgroundImage: `url(${
													enhancedCards[
														currentIndex + 1
													]
														? enhancedCards[
																currentIndex + 1
														  ].photo
														: ""
												})`,
											}}
										/>
									</div>
									<p className="text-sm tracking uppercase space-y-2 flex flex-col items-center">
										<span>Próximo</span>
										<MenuArrow />
									</p>
								</div>
							</button>
						</div>
					</div>
					<div className="flex justify-center items-center mx-auto w-full py-6 md:w-fit bg-white gap-4 md:rounded md:p-8">
						<div className="flex flex-col md:flex-row rounded md:gap-6">
							<div className="flex flex-col mx-auto">
								{driverData ? (
									<PlayerCard
										ref={cardRef}
										data={driverData}
									/>
								) : (
									<p>Driver not found</p>
								)}
								<div className="self-center group mt-6">
									<ShareButton
										cardRef={cardRef}
										data={driverData}
									/>
								</div>
							</div>
							<div className="flex flex-col justify-between">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-y-2 pt-6 md:pt-0 ">
									{driverData?.city && (
										<>
											<p className="font-bold">Cidade</p>
											<p>{driverData.city}</p>
										</>
									)}
									{driverData?.stats?.championships && (
										<>
											<p className="font-bold mt-2 md:mt-0">
												Campeonatos Vencidos
											</p>
											<p>
												{driverData.stats.championships}
											</p>
										</>
									)}
									{driverData?.stats?.totalWins && (
										<>
											<p className="font-bold mt-2 md:mt-0">
												Vitórias em Corridas
											</p>
											<p>{driverData.stats.totalWins}</p>
										</>
									)}
									{driverData?.stats?.totalWinsB && (
										<>
											<p className="font-bold mt-2 md:mt-0">
												Vitórias em Corridas Grid B
											</p>
											<p>{driverData.stats.totalWinsB}</p>
										</>
									)}
									{driverData?.stats?.totalSprintWins && (
										<>
											<p className="font-bold mt-2 md:mt-0">
												Vitórias em Sprint
											</p>
											<p>
												{
													driverData.stats
														.totalSprintWins
												}
											</p>
										</>
									)}
									{driverData?.stats?.totalPodiums && (
										<>
											<p className="font-bold mt-2 md:mt-0">
												Pódios
											</p>
											<p>
												{driverData.stats.totalPodiums}
											</p>
										</>
									)}
									{driverData?.stats?.poles && (
										<>
											<p className="font-bold mt-2 md:mt-0">
												Poles
											</p>
											<p>{driverData.stats.poles}</p>
										</>
									)}
									{driverData?.stats?.fastestLaps && (
										<>
											<p className="font-bold mt-2 md:mt-0">
												Voltas Rápidas
											</p>
											<p>
												{driverData.stats.fastestLaps}
											</p>
										</>
									)}
									{driverData?.stats?.totalPoints && (
										<>
											<p className="font-bold mt-2 md:mt-0">
												Pontos
											</p>
											<p>
												{driverData.stats.totalPoints}
											</p>
										</>
									)}
									{driverData?.stats?.totalPointsB && (
										<>
											<p className="font-bold mt-2 md:mt-0">
												Pontos Grid B
											</p>
											<p>
												{driverData.stats.totalPointsB}
											</p>
										</>
									)}
									{driverData?.stats?.totalPart && (
										<>
											<p className="font-bold mt-2 md:mt-0">
												Participações
											</p>
											<p>{driverData.stats.totalPart}</p>
										</>
									)}
									{driverData?.equipment && (
										<>
											<p className="font-bold mt-2 md:mt-0">
												Equipamento
											</p>
											<p>{driverData.equipment}</p>
										</>
									)}
									{driverData?.stream && (
										<a
											href={`${driverData.stream}`}
											target="_blank"
											className="text-f1-red hover:opacity-90 transition-all duration-200"
										>
											<div className="flex items-center gap-2 mt-2 md:mt-0">
												<p className="font-bold">
													Stream
												</p>
												<LiveTvIcon fontSize="small" />
											</div>
										</a>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</aside>
		)
	);
}
