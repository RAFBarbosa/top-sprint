import { useState, useRef, useMemo, useEffect } from "react";
import PlayerCard from "../components/utils/PlayerCard";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { normalizeString } from "../shared/utils/normalizeString";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { Divider } from "../components/layout/Divider";
import { useTab } from "../contexts/TabContext";
import { getEffectiveRaceAwards, getGridConfig } from "../shared/config/grids";
import { tenant } from "../shared/config/tenants";
import { useTenantConfig } from "../contexts/TenantConfigContext";
import { useDriverProfiles } from "../contexts/DriverProfilesContext";
import { HygraphImg } from "../components/utils/HygraphImg";
import { resizeHygraphUrl } from "../shared/utils/hygraphImage";
import { useDriverStats } from "../shared/hooks/useDriverStats";
import type { DriverStatsShape } from "../shared/hooks/useDriverStats";
import type { RaceAward } from "../shared/config/grids";
import { useFirebaseTeams } from "../shared/hooks/useFirebaseTeams";
import { useFirebaseDrivers } from "../shared/hooks/useFirebaseDrivers";
import { useDriverCards } from "../shared/hooks/useDriverCards";
import { useBestSeasonCard } from "../shared/hooks/useBestSeasonCard";
import { useRealLifeTeamLogos } from "../shared/hooks/useRealLifeTeamLogos";

function StatsBlock({
	label,
	stats,
	raceAwards = [],
}: {
	label: string;
	stats: DriverStatsShape;
	raceAwards?: RaceAward[];
}) {
	const hasAny = Object.values(stats).some((v) => v > 0);
	if (!hasAny) return null;
	const items = [
		{ label: "Participações", value: stats.participations },
		{ label: "Pontos", value: stats.points },
		{ label: "Temp. Completas", value: stats.seasons },
		{ label: "Vitórias", value: stats.wins },
		{ label: "Vit. Sprint", value: stats.sprintWins },
		{ label: "Pódios", value: stats.podiums },
		{ label: "Pód. Sprint", value: stats.sprintPodiums },
		{ label: "Poles", value: stats.poles },
		{ label: "Volt. Rápidas", value: stats.fastestLaps },
		{ label: "Campeonatos", value: stats.championships },
		{ label: "Camp. Equipe", value: stats.teamChampionships },
		...raceAwards
			.filter((a) => a.id !== "fastestLap")
			.map((a) => ({ label: a.label, value: stats.awards?.[a.id] ?? 0 })),
	].filter((item) => item.value > 0);

	// Group items into rows of 2
	const rows: (typeof items)[] = [];
	for (let i = 0; i < items.length; i += 2) {
		rows.push(items.slice(i, i + 2));
	}

	return (
		<div>
			<StatsHeader title={label} />
			<div className="flex flex-col">
				{rows.map((row, rowIdx) => (
					<div
						key={rowIdx}
						className={`grid grid-cols-2 py-2 ${rowIdx < rows.length - 1 ? "border-b border-black/10" : ""}`}
					>
						{row.map((item) => (
							<div
								key={item.label}
								className="flex flex-col gap-1 pr-3"
							>
								<span className="text-[10px] uppercase tracking-wider text-f1-lighterCarbon">
									{item.label}
								</span>
								<span className="text-xl font-extrabold text-f1-text tabular-nums leading-none">
									{item.value}
								</span>
							</div>
						))}
					</div>
				))}
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
				<span className="tenant-profile-info-label text-[10px] uppercase tracking-wider text-f1-text">
					{label}
				</span>
				<a
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: "var(--color-brand-primary)" }}
					className="hover:opacity-80 flex items-center gap-1 text-sm font-semibold"
				>
					Assistir
					<LiveTvIcon
						fontSize="small"
						aria-hidden="true"
						className="mb-0.5 max-md:-translate-y-0.5"
					/>
				</a>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-1">
			<span className="tenant-profile-info-label text-[10px] uppercase tracking-wider text-f1-text">
				{label}
			</span>
			<span className="text-sm font-medium">{value}</span>
		</div>
	);
}

function StatsHeader({ title }: { title: string }) {
	return (
		<div className="mb-3">
			<p className="text-xs font-bold uppercase tracking-wide text-f1-text">
				{title}
			</p>
		</div>
	);
}

export function Profile() {
	const { defaultPhotoStyle } = useTenantConfig();
	const { driverName } = useParams<{ driverName: string }>();
	const { activeTab } = useTab();

	const { applyProfile, isInGrid } = useDriverProfiles();
	const { drivers: driversList } = useFirebaseDrivers();
	const { teams: teamsData } = useFirebaseTeams();
	const navigate = useNavigate();
	const [cardView, setCardView] = useState<"current" | "best">("current");
	const cardRef = useRef<HTMLDivElement>(null);

	// Build a name→logo map from the teams collection directly (more reliable than
	// reading through driver.team.photo, which can be broken in cloned Hygraph projects)
	const teamLogoByName = useMemo(() => {
		const map: Record<string, string> = {};
		(teamsData ?? []).forEach((t) => {
			if (t.name && t.photo?.url) map[t.name] = t.photo.url;
		});
		driversList.forEach((d) => {
			if (d.team?.name && d.team?.photo?.url && !map[d.team.name]) {
				map[d.team.name] = d.team.photo.url;
			}
		});
		return map;
	}, [teamsData, driversList]);

	// Get real life team logos and nationalities for drivers in current grid
	const {
		logos: realLifeTeamLogos,
		nationalities,
		nationalityCodes,
	} = useRealLifeTeamLogos(activeTab.id);

	const filteredDrivers = useMemo(
		() =>
			driversList
				.filter((driver) => isInGrid(driver.id, activeTab.id))
				.map((driver) => {
					const applied = applyProfile(driver, activeTab.id);
					const resolvedTeamName =
						applied.team?.name ?? applied.teamName ?? "";
					return {
						...applied,
						photo: applied.photo?.url ?? applied.photo ?? "",
						teamColor:
							applied.team?.color?.hex ?? applied.teamColor ?? "",
						teamName: resolvedTeamName,
						teamLogo:
							applied.team?.photo?.url ??
							applied.teamLogo ??
							teamLogoByName[resolvedTeamName] ??
							"",
						realLifeTeamLogoUrl: realLifeTeamLogos[driver.id] ?? "",
						nationality: nationalities[driver.id] ?? "",
						nationalityCode: nationalityCodes[driver.id] ?? "",
						num: applied.number ?? "",
						stats: applied.stats ?? {},
					};
				})
				.filter((driver) => !driver.reserve && !driver.exDriver)
				.sort((a, b) => a.name.localeCompare(b.name, "pt-BR")),
		[
			driversList,
			activeTab.id,
			isInGrid,
			applyProfile,
			teamLogoByName,
			realLifeTeamLogos,
			nationalities,
			nationalityCodes,
		],
	);

	const currentIndex = useMemo(() => {
		if (!driverName || filteredDrivers.length === 0) return null;
		return filteredDrivers.findIndex(
			(driver) =>
				normalizeString(driver.name.toLowerCase()) ===
				normalizeString(driverName.toLowerCase()),
		);
	}, [driverName, filteredDrivers]);

	const handlePrevClick = () => {
		if (currentIndex !== null && currentIndex > 0) {
			const prevDriver = filteredDrivers[currentIndex - 1];
			const scrollPos = window.scrollY;
			navigate(`/pilotos/${normalizeString(prevDriver.name)}`);
			setTimeout(() => window.scrollTo(0, scrollPos), 0);
		}
	};

	const handleNextClick = () => {
		if (
			currentIndex !== null &&
			currentIndex < filteredDrivers.length - 1
		) {
			const nextDriver = filteredDrivers[currentIndex + 1];
			const scrollPos = window.scrollY;
			navigate(`/pilotos/${normalizeString(nextDriver.name)}`);
			setTimeout(() => window.scrollTo(0, scrollPos), 0);
		}
	};

	const driverData =
		currentIndex !== null && currentIndex >= 0
			? filteredDrivers[currentIndex]
			: null;

	const {
		season: seasonStats,
		career: careerStats,
		perRoundCards,
	} = useDriverStats(driverData?.id, activeTab.id);

	const driverCards = useDriverCards(activeTab.id);
	const cardStats = driverData?.id ? driverCards[driverData.id] : null;
	const bestSeasonCard = useBestSeasonCard(driverData?.id, activeTab.id);

	if (driverName && filteredDrivers.length > 0 && currentIndex === -1) {
		return <Navigate to={"/pilotos" + window.location.search} replace />;
	}

	return (
		currentIndex !== null &&
		currentIndex >= 0 &&
		filteredDrivers.length > 0 && (
			<aside
				id="perfil"
				className="tenant-section tenant-section-profile bg-f1-bg-silver flex flex-col grow pb-6"
			>
				<div className="max-w-screen-xl w-full mx-auto md:px-3">
					<Divider className="px-3 md:px-0" />
					<div className="mb-8 flex flex-col sm:flex-row justify-between px-3 md:px-0">
						<h1
							className="tenant-section-title font-f1Title uppercase font-extrabold text-4xl md:text-6xl tracking-wide md:self-end border-b-10 w-full"
							style={{
								borderColor:
									tenant.grids.length > 1
										? (getGridConfig(activeTab.id)
												?.primaryColor ??
											"var(--color-brand-primary)")
										: "var(--color-brand-primary)",
							}}
						>
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
										? `Piloto anterior: ${filteredDrivers[currentIndex - 1]?.name ?? ""}`
										: "Piloto anterior"
								}
								className={`tenant-profile-nav bg-f1-lightSilver text-f1-text font-bold px-2 rounded-l border-b-4 md:w-[180px] overflow-hidden transition-all duration-200 w-full ${
									currentIndex === null || currentIndex === 0
										? "opacity-50 cursor-not-allowed"
										: "hover:opacity-80 cursor-pointer"
								}`}
								style={{
									borderColor:
										currentIndex > 0
											? (filteredDrivers[currentIndex - 1]
													?.teamColor ?? "")
											: "",
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
										{defaultPhotoStyle === "round" ? (
											<HygraphImg
												src={
													filteredDrivers[
														currentIndex - 1
													]?.photo ||
													tenant.fallbackDriverPhoto
												}
												alt={
													filteredDrivers[
														currentIndex - 1
													]?.name ?? ""
												}
												imgWidth={80}
												imgHeight={80}
												className="w-20 h-20 rounded-full object-cover border-2 border-f1-text"
											/>
										) : defaultPhotoStyle === "bust" ? (
											<div
												className="w-22 h-22 bg-cover translate-y-[8px]"
												style={{
													backgroundImage: `url(${resizeHygraphUrl(
														filteredDrivers[
															currentIndex - 1
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
															currentIndex - 1
														]?.photo ||
															tenant.fallbackDriverPhoto,
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
										? `Próximo piloto: ${filteredDrivers[currentIndex + 1]?.name ?? ""}`
										: "Próximo piloto"
								}
								className={`tenant-profile-nav bg-f1-lightSilver text-f1-text font-bold pr-2 rounded-r border-b-4 md:w-[180px] overflow-hidden transition-all duration-200 w-full ${
									currentIndex === null ||
									currentIndex === filteredDrivers.length - 1
										? "opacity-50 cursor-not-allowed"
										: "hover:opacity-80 cursor-pointer"
								}`}
								style={{
									borderColor:
										currentIndex <
										filteredDrivers.length - 1
											? (filteredDrivers[currentIndex + 1]
													?.teamColor ?? "")
											: "",
								}}
							>
								<div className="pt-2 flex items-center justify-around">
									<div className="flex items-center">
										{defaultPhotoStyle === "round" ? (
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
										) : defaultPhotoStyle === "bust" ? (
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
					<div className="w-full md:rounded-lg overflow-hidden">
						<div className="flex flex-col md:flex-row">
							{/* Left Half - Fixed Card */}
							<div
								className="md:w-1/2 flex justify-center items-center py-10 px-6 relative"
								style={{
									background: driverData?.teamColor
										? `linear-gradient(160deg, ${driverData.teamColor} 0%, ${driverData.teamColor}dd 40%, #1a1a1a 100%)`
										: "#1a1a1a",
								}}
							>
								<div
									className="absolute inset-0 opacity-[0.07]"
									style={{
										backgroundImage:
											"repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.5) 20px, rgba(255,255,255,0.5) 21px)",
									}}
								/>
								<div className="flex flex-col items-center gap-6 relative z-10 w-full">
									{false && bestSeasonCard && (
										<div className="flex font-f1Title">
											{(["current", "best"] as const).map(
												(view, i) => (
													<>
														{i > 0 && (
															<div
																key="sep"
																className="w-px bg-white/50 self-stretch mx-1"
															/>
														)}
														<button
															key={view}
															onClick={() =>
																setCardView(
																	view,
																)
															}
															className={`px-5 py-3 uppercase text-xs tracking-widest transition-all duration-200 hover:cursor-pointer border-b-2 ${
																cardView ===
																view
																	? "text-white border-white"
																	: "text-gray-400 border-transparent hover:text-white/70"
															}`}
														>
															{view === "current"
																? "Carta Atual"
																: "Melhor Carta"}
														</button>
													</>
												),
											)}
										</div>
									)}
									<div
										className="flex flex-col"
										style={{
											filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5)) drop-shadow(0 2px 8px rgba(0,0,0,0.4))",
										}}
									>
										{driverData ? (
											<PlayerCard
												ref={cardRef}
												data={{
													...driverData,
													rating:
														(cardView === "best"
															? bestSeasonCard?.rating
															: cardStats?.rating
														)?.toString() ?? "",
													prevRating:
														cardView === "best"
															? ""
															: (cardStats?.prevRating?.toString() ??
																""),
													racecraft:
														(cardView === "best"
															? bestSeasonCard?.racecraft
															: cardStats?.racecraft
														)?.toString() ?? "",
													awareness:
														(cardView === "best"
															? bestSeasonCard?.awareness
															: cardStats?.awareness
														)?.toString() ?? "",
													pace:
														(cardView === "best"
															? bestSeasonCard?.pace
															: cardStats?.pace
														)?.toString() ?? "",
													consistency:
														(cardView === "best"
															? bestSeasonCard?.consistency
															: cardStats?.consistency
														)?.toString() ?? "",
												}}
											/>
										) : (
											<p>Driver not found</p>
										)}
									</div>
								</div>
							</div>

							{/* Right Half - Stats */}
							<div className="tenant-profile-stats md:w-1/2 flex flex-col gap-4 bg-white py-8 px-6">
								{/* Driver info */}
								{(driverData?.city ||
									driverData?.equipment ||
									driverData?.stream) && (
									<div className="tenant-profile-card bg-f1-bg-silver rounded-lg p-4">
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
														value={
															driverData.stream
														}
														link={driverData.stream}
													/>
												</div>
											)}
										</div>
									</div>
								)}

								{/* Season stats */}
								{seasonStats &&
									Object.values(seasonStats).some(
										(v) => v > 0,
									) && (
										<div className="tenant-profile-card bg-f1-bg-silver rounded-lg p-4">
											<StatsBlock
												label="Temporada Atual"
												stats={seasonStats}
												raceAwards={getEffectiveRaceAwards(
													activeTab.id,
												)}
											/>
										</div>
									)}

								{/* Career stats */}
								{careerStats &&
									Object.values(careerStats).some(
										(v) => v > 0,
									) && (
										<div className="tenant-profile-card bg-f1-bg-silver rounded-lg p-4">
											<StatsBlock
												label="Carreira"
												stats={careerStats}
												raceAwards={getEffectiveRaceAwards(
													activeTab.id,
												)}
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
