import { useState, useEffect, useRef } from "react";
import PlayerCard from "../components/utils/PlayerCard";
import ShareButton from "../components/utils/ShareButton";
import { useEnhancedCards } from "../shared/hooks/useEnhancedCards";
import { useParams, useNavigate } from "react-router-dom";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { normalizeString } from "../shared/utils/normalizeString";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { Divider } from "../components/layout/Divider";
import { useTab } from "../contexts/TabContext";
import { tenant } from "../shared/config/tenants";
import { useDriverProfiles } from "../contexts/DriverProfilesContext";
import { HygraphImg } from "../components/utils/HygraphImg";
import { resizeHygraphUrl } from "../shared/utils/hygraphImage";

export function Profile() {
	const { driverName } = useParams<{ driverName: string }>();
	const { activeTab, setActiveTab } = useTab();

	const { enhancedCards, loading, error } = useEnhancedCards(activeTab.id);
	const { isInGrid, applyProfile, profiles } = useDriverProfiles();
	const navigate = useNavigate();
	const [currentIndex, setCurrentIndex] = useState<number | null>(null);
	const cardRef = useRef<HTMLDivElement>(null);

	// Filter drivers based on active tab, using Firebase profiles when available
	const filteredDrivers = enhancedCards
		.filter((driver) => {
			if (!driver.id) return true;
			return isInGrid(driver.id, activeTab.id) || !profiles[driver.id];
		})
		.map((driver) => applyProfile(driver, activeTab.id));

	useEffect(() => {
		const index = filteredDrivers.findIndex(
			(driver) =>
				normalizeString(driver.name.toLowerCase()) ===
				normalizeString(driverName?.toLowerCase() ?? ""),
		);
		setCurrentIndex(index >= 0 ? index : filteredDrivers.length - 1);
	}, [driverName, filteredDrivers, activeTab.id]); // Added activeTab.id to dependencies

	const handlePrevClick = () => {
		if (currentIndex !== null && currentIndex > 0) {
			const prevDriver = filteredDrivers[currentIndex - 1];
			navigate(`/pilotos/${normalizeString(prevDriver.name)}`);
		}
	};

	const handleNextClick = () => {
		if (
			currentIndex !== null &&
			currentIndex < filteredDrivers.length - 1
		) {
			const nextDriver = filteredDrivers[currentIndex + 1];
			navigate(`/pilotos/${normalizeString(nextDriver.name)}`);
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
								aria-label={
									currentIndex !== null && currentIndex > 0
										? `Piloto anterior: ${filteredDrivers[currentIndex - 1].name}`
										: "Piloto anterior"
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
										<ArrowForwardIos
											className="rotate-180"
											aria-hidden="true"
										/>
									</p>
									<div className="flex items-center">
										{tenant.defaultPhotoStyle ===
										"round" ? (
											<HygraphImg
												src={
													currentIndex > 0
														? filteredDrivers[
																currentIndex - 1
															].photo ||
															tenant.fallbackDriverPhoto
														: tenant.fallbackDriverPhoto
												}
												alt={
													currentIndex > 0
														? filteredDrivers[
																currentIndex - 1
															].name
														: ""
												}
												imgWidth={80}
												imgHeight={80}
												className="w-20 h-20 rounded-full object-cover border-2 border-f1-text"
											/>
										) : tenant.defaultPhotoStyle ===
										  "bust" ? (
											<div
												className="w-22 h-22 bg-cover translate-y-[8px]"
												style={{
													backgroundImage: `url(${resizeHygraphUrl(
														currentIndex > 0
															? filteredDrivers[
																	currentIndex -
																		1
																].photo ||
																	tenant.fallbackDriverPhoto
															: tenant.fallbackDriverPhoto,
														550,
													)})`,
												}}
											/>
										) : (
											<div
												className="w-22 h-22 bg-cover translate-y-[20px] scale-150"
												style={{
													backgroundImage: `url(${resizeHygraphUrl(
														currentIndex > 0
															? filteredDrivers[
																	currentIndex -
																		1
																].photo ||
																	tenant.fallbackDriverPhoto
															: tenant.fallbackDriverPhoto,
														550,
													)})`,
												}}
											/>
										)}
									</div>
								</div>
							</button>
							<button
								onClick={handleNextClick}
								disabled={
									currentIndex === null ||
									currentIndex === filteredDrivers.length - 1
								}
								aria-label={
									currentIndex !== null &&
									currentIndex < filteredDrivers.length - 1
										? `Próximo piloto: ${filteredDrivers[currentIndex + 1].name}`
										: "Próximo piloto"
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
										{tenant.defaultPhotoStyle ===
										"round" ? (
											<HygraphImg
												src={
													filteredDrivers[
														currentIndex + 1
													]?.photo ||
													tenant.fallbackDriverPhoto
												}
												alt={
													filteredDrivers[
														currentIndex + 1
													]?.name ?? ""
												}
												imgWidth={80}
												imgHeight={80}
												className="w-20 h-20 rounded-full object-cover border-2 border-f1-text"
											/>
										) : tenant.defaultPhotoStyle ===
										  "bust" ? (
											<div
												className="w-22 h-22 bg-cover translate-y-[8px]"
												style={{
													backgroundImage: `url(${resizeHygraphUrl(
														filteredDrivers[
															currentIndex + 1
														]?.photo ||
															tenant.fallbackDriverPhoto,
														550,
													)})`,
												}}
											/>
										) : (
											<div
												className="w-22 h-22 bg-cover translate-y-[20px] scale-150"
												style={{
													backgroundImage: `url(${resizeHygraphUrl(
														filteredDrivers[
															currentIndex + 1
														]?.photo ||
															tenant.fallbackDriverPhoto,
														550,
													)})`,
												}}
											/>
										)}
									</div>
									<p className="text-sm tracking uppercase space-y-2 flex flex-col items-center">
										<span>Próximo</span>
										<ArrowForwardIos aria-hidden="true" />
									</p>
								</div>
							</button>
						</div>
					</div>

					{/* Split Layout Container */}
					<div className="w-full bg-white md:rounded md:py-8 px-3 pt-4">
						{/* <div className="mb-4">
							<TabSwitch />
						</div> */}
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
									{/* <div className="self-center group mt-6">
										<ShareButton
											cardRef={cardRef}
											data={driverData}
										/>
									</div> */}
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
											rel="noopener noreferrer"
											aria-label={`Assistir stream de ${driverData.name} (abre em nova janela)`}
											style={{
												color: "var(--color-brand-primary)",
											}}
											className="hover:opacity-80 transition-all duration-200"
										>
											<div className="flex items-center gap-2 mt-2 md:mt-0">
												<p className="font-bold">
													Stream
												</p>
												<LiveTvIcon
													fontSize="small"
													aria-hidden="true"
												/>
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
