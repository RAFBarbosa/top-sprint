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
import { useDriverStats } from "../shared/hooks/useDriverStats";
import type { DriverStatsShape } from "../shared/hooks/useDriverStats";

function StatItem({ label, value }: { label: string; value: number }) {
	if (!value) return null;
	return (
		<div className="flex flex-col items-center justify-center bg-white rounded-sm p-1 text-center">
			<span className="text-lg md:text-xl font-bold md:font-extrabold leading-none tracking-tighter md:tracking-normal text-f1-text">
				{value}
			</span>
			<span className="text-[10px] uppercase tracking-normal md:tracking-wide text-f1-lighterCarbon font-semibold mt-0.5 ">
				{label}
			</span>
		</div>
	);
}

function StatsBlock({
	label,
	stats,
}: {
	label: string;
	stats: DriverStatsShape;
}) {
	const hasAny = Object.values(stats).some((v) => v > 0);
	if (!hasAny) return null;
	return (
		<div>
			<p className="text-xs font-bold uppercase tracking-wide text-f1-text mb-2">
				{label}
			</p>
			<div className="grid grid-cols-3 gap-2">
				<StatItem label="Participações" value={stats.participations} />
				<StatItem label="Pontos" value={stats.points} />
				<StatItem label="Temporadas" value={stats.seasons} />
				<StatItem label="Vitórias" value={stats.wins} />
				<StatItem label="Vit. Sprint" value={stats.sprintWins} />
				<StatItem label="Pódios" value={stats.podiums} />
				<StatItem label="Pód. Sprint" value={stats.sprintPodiums} />
				<StatItem label="Poles" value={stats.poles} />
				<StatItem label="Volt. Rápidas" value={stats.fastestLaps} />
				<StatItem label="NCs" value={stats.ncs} />
				<StatItem label="Campeonatos" value={stats.championships} />
				<StatItem
					label="Camp. Equipe"
					value={stats.teamChampionships}
				/>
			</div>
		</div>
	);
}

function DriverInfoItem({
	label,
	value,
	link,
}: {
	label: string;
	value: string;
	link?: string;
}) {
	if (!value) return null;

	if (link) {
		return (
			<div className="flex flex-col gap-1">
				<span className="text-[10px] uppercase tracking-wide text-f1-text font-bold">
					{label}
				</span>
				<a
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: "var(--color-brand-primary)" }}
					className="hover:opacity-80 transition-all duration-200 flex items-center gap-1 text-sm font-semibold"
				>
					Assistir
					<LiveTvIcon fontSize="small" aria-hidden="true" />
				</a>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-1">
			<span className="text-[10px] uppercase tracking-wide text-f1-text font-bold">
				{label}
			</span>
			<span className="text-sm font-medium">{value}</span>
		</div>
	);
}

function StatsHeader({ title }: { title: string }) {
	return (
		<div className="flex items-center gap-2 mb-3">
			<p className="text-xs font-bold uppercase tracking-wide text-f1-text">
				{title}
			</p>
		</div>
	);
}

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
	}, [driverName, filteredDrivers, activeTab.id]);

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

	const { season: seasonStats, career: careerStats } = useDriverStats(
		driverData?.id,
		activeTab.id,
	);

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
								</div>
							</div>

							{/* Right Half - Stats */}
							<div className="md:w-1/2 pb-4 md:pb-0 flex flex-col gap-6">
								{/* Driver info */}
								<div className="bg-f1-bg-silver rounded-lg p-4">
									<StatsHeader title="Informações do Piloto" />
									<div className="grid grid-cols-2 gap-4">
										<DriverInfoItem
											label="Cidade"
											value={driverData?.city}
										/>
										<DriverInfoItem
											label="Equipamento"
											value={driverData?.equipment}
										/>
										{driverData?.stream && (
											<div className="col-span-2">
												<DriverInfoItem
													label="Stream"
													value={driverData.stream}
													link={driverData.stream}
												/>
											</div>
										)}
									</div>
								</div>

								{/* Season stats */}
								{seasonStats &&
									Object.values(seasonStats).some(
										(v) => v > 0,
									) && (
										<div className="bg-f1-bg-silver rounded-lg p-4">
											<StatsBlock
												label="Temporada Atual"
												stats={seasonStats}
											/>
										</div>
									)}

								{/* Career stats */}
								{careerStats &&
									Object.values(careerStats).some(
										(v) => v > 0,
									) && (
										<div className="bg-f1-bg-silver rounded-lg p-4">
											<StatsBlock
												label="Carreira"
												stats={careerStats}
											/>
										</div>
									)}
							</div>
						</div>
					</div>
				</div>
			</aside>
		)
	);
}
