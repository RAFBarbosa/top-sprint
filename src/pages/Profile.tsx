import { useState, useEffect, useRef } from "react";
import PlayerCard from "../components/utils/PlayerCard";
import ShareButton from "../components/utils/ShareButton";
import { useEnhancedCards } from "../components/hooks/useEnhancedCards";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowForwardIos as MenuArrow } from "@mui/icons-material";
import useNormalizeString from "../components/hooks/useNormalizeString";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { Divider } from "../components/layout/Divider";
import { useTab } from "../contexts/TabContext";
import { TabSwitch } from "../components/standings/csv/TabSwitch";

export function Profile() {
	const { driverName } = useParams<{ driverName: string }>();
	const { activeTab, setActiveTab } = useTab();

	const enhancedCards = useEnhancedCards(activeTab.id);
	const navigate = useNavigate();
	const [currentIndex, setCurrentIndex] = useState<number | null>(null);
	const cardRef = useRef<HTMLDivElement>(null);

	// Filter drivers based on active tab
	const filteredDrivers = enhancedCards.filter(
		(driver) => driver.grid === activeTab.id
	);

	useEffect(() => {
		const index = filteredDrivers.findIndex(
			(driver) =>
				useNormalizeString(driver.name.toLowerCase()) ===
				useNormalizeString(driverName?.toLowerCase())
		);
		setCurrentIndex(index >= 0 ? index : filteredDrivers.length - 1);
	}, [driverName, filteredDrivers, activeTab.id]); // Added activeTab.id to dependencies

	const handlePrevClick = () => {
		if (currentIndex !== null && currentIndex > 0) {
			const prevDriver = filteredDrivers[currentIndex - 1];
			navigate(`/pilotos/${useNormalizeString(prevDriver.name)}`);
		}
	};

	const handleNextClick = () => {
		if (
			currentIndex !== null &&
			currentIndex < filteredDrivers.length - 1
		) {
			const nextDriver = filteredDrivers[currentIndex + 1];
			navigate(`/pilotos/${useNormalizeString(nextDriver.name)}`);
		}
	};

	const driverData =
		currentIndex !== null ? filteredDrivers[currentIndex] : null;

	return (
		currentIndex !== null &&
		filteredDrivers.length > 0 && (
			<aside
				id="perfil"
				className="bg-f1-bg-silver flex flex-col grow pb-6"
			>
				<div className="max-w-screen-xl w-full mx-auto md:px-3">
					<Divider className="px-3 md:px-0" />
					<div className="mb-8 flex flex-col sm:flex-row justify-between px-3 md:px-0">
						<h1 className="font-extrabold text-4xl md:text-6xl tracking-wide md:self-end border-b-10 w-full">
							Perfil do Piloto
						</h1>
						<div className="flex justify-between gap-1 h-25 mt-2 md:mt-0 sm:ml-2">
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
											? filteredDrivers[currentIndex - 1]
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
														? filteredDrivers[
																currentIndex - 1
														  ].photo
														: ""
												})`,
											}}
										/>
									</div>
								</div>
							</button>
							<button
								onClick={handleNextClick}
								disabled={
									currentIndex === null ||
									currentIndex === filteredDrivers.length - 1
								}
								className={`bg-f1-lightSilver text-f1-text font-bold pr-2 rounded-r border-b-4 md:w-[180px] overflow-hidden transition-all duration-200 w-full ${
									currentIndex === null ||
									currentIndex === filteredDrivers.length - 1
										? "opacity-50 cursor-not-allowed"
										: "hover:opacity-80 cursor-pointer"
								}`}
								style={{
									borderColor: `${
										currentIndex <
										filteredDrivers.length - 1
											? filteredDrivers[currentIndex + 1]
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
													filteredDrivers[
														currentIndex + 1
													]
														? filteredDrivers[
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

					{/* Split Layout Container */}
					<div className="w-full p-1 bg-white md:rounded md:pb-8 px-3">
						<div className="mb-4">
							<TabSwitch />
						</div>
						<div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto px-4">
							{/* Left Half - Fixed Card */}
							<div className="md:w-1/2 flex justify-center md:justify-end">
								<div className="flex flex-col">
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
							</div>

							{/* Right Half - Stats */}
							<div className="md:w-1/2 pb-4 md:pb-0">
								<div className="md:grid md:grid-cols-2 md:gap-y-3 md:space-y-0">
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
									{driverData?.stats?.totalWinsB > 0 && (
										<>
											<p className="font-bold mt-2 md:mt-0">
												Vitórias em Corridas Classe B
											</p>
											<p>{driverData.stats.totalWinsB}</p>
										</>
									)}
									{driverData?.grid === "gridA" &&
										driverData?.stats?.totalSprintWins && (
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
									{driverData?.stats?.totalPointsA > 0 && (
										<>
											<p className="font-bold mt-2 md:mt-0">
												Pontos Classe A
											</p>
											<p>
												{driverData.stats.totalPointsA}
											</p>
										</>
									)}
									{driverData?.stats?.totalPointsB > 0 && (
										<>
											<p className="font-bold mt-2 md:mt-0">
												Pontos Classe B
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
											className="text-f1-red hover:opacity-80 transition-all duration-200"
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
