import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../lib/adminClient";
import {
	useGetCalendarsQuery,
	useGetDriversQuery,
} from "../../graphql/generated";
import { tenant } from "../../shared/config/tenants";
import { getGridConfig } from "../../shared/config/grids";
import { useDriverProfiles } from "../../contexts/DriverProfilesContext";
import { Calendar } from "./Calendar";
import { Skeleton } from "@mui/material";
import { useTab } from "../../contexts/TabContext";
import { useSeasons } from "../../contexts/SeasonsContext";
import { useCalendarSeasons } from "../../contexts/CalendarSeasonsContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const loadingSkeleton = () => (
	<div className="w-[305px] my-6 md:mb-0 mx-auto">
		<Skeleton
			animation="wave"
			variant="rectangular"
			height={500}
			sx={{ my: 1, margin: "auto" }}
		/>
	</div>
);

export function Calendars({
	hideHeader = false,
	noPadding = false,
}: { hideHeader?: boolean; noPadding?: boolean } = {}) {
	const { data, error, loading } = useGetCalendarsQuery();
	const { data: driversData } = useGetDriversQuery();
	const { activeTab } = useTab();
	const { applyProfile } = useDriverProfiles();
	const { seasons } = useSeasons();
	const { getSeasonForCalendar } = useCalendarSeasons();

	const [raceResultsMap, setRaceResultsMap] = useState<Record<string, any>>(
		{},
	);

	useEffect(() => {
		const fetchResults = async () => {
			try {
				const snap = await getDocs(collection(db, "race_results"));
				const map: Record<string, any> = {};
				snap.forEach((doc) => {
					map[doc.id] = doc.data();
				});
				setRaceResultsMap(map);
			} catch (e) {
				console.error("Failed to fetch race results", e);
			}
		};
		fetchResults();
	}, []);

	const driverLookup = Object.fromEntries(
		(driversData?.drivers ?? []).map((d) => [d.id, d]),
	);

	const getWinner = (
		calendarId: string,
		targetGrid: string,
		hygraphWinner?: any,
	) => {
		const result = raceResultsMap[calendarId];
		if (result?.results && result.results.length > 0) {
			const snapshot = result.driverSnapshots ?? {};
			// The first driver in the results array is the winner, regardless of grid
			const winnerId = result.results[0];
			const driver = driverLookup[winnerId];
			if (!driver) return null;
			const snap = snapshot[winnerId];
			const base = {
				...driver,
				team: {
					...driver.team,
					color: snap?.teamColor
						? { hex: snap.teamColor }
						: driver.team?.color,
					name: snap?.teamName ?? driver.team?.name,
				},
				photo: snap?.photoUrl ? { url: snap.photoUrl } : driver.photo,
			};
			return applyProfile(base, targetGrid);
		}
		return hygraphWinner ?? null;
	};

	if (loading) return loadingSkeleton();
	if (error) return <div>Erro: {error.message}</div>;

	const gridCalendarIds = new Set(
		(data?.calendars ?? []).filter((c) => c.grid === activeTab.id).map((c) => c.id),
	);
	const gridSeasonIds = new Set(
		[...gridCalendarIds].map((cid) => getSeasonForCalendar(cid)).filter(Boolean) as string[],
	);
	const activeSeason = seasons.find((s) => s.active && gridSeasonIds.has(s.id)) ?? null;

	// Filter calendars by grid and active season only
	const gridCalendars = activeSeason
		? (data?.calendars ?? []).filter((calendar) => {
			if (calendar.grid !== activeTab.id) return false;
			const sid = getSeasonForCalendar(calendar.id);
			return sid === activeSeason.id;
		})
		: [];

	// Group calendars by season
	const calendarsBySeason = gridCalendars.reduce(
		(acc, calendar) => {
			const seasonId = getSeasonForCalendar(calendar.id);
			const season = seasons.find((s) => s.id === seasonId);

			const seasonKey = seasonId || "no-season";

			if (!acc[seasonKey]) {
				acc[seasonKey] = {
					season: season || null,
					calendars: [],
				};
			}

			acc[seasonKey].calendars.push(calendar);
			return acc;
		},
		{} as Record<string, { season: any; calendars: any[] }>,
	);

	// Sort seasons by year (newest first), and put 'no-season' at the end
	const sortedSeasonKeys = Object.keys(calendarsBySeason).sort((a, b) => {
		if (a === "no-season") return 1;
		if (b === "no-season") return -1;
		const seasonA = calendarsBySeason[a].season;
		const seasonB = calendarsBySeason[b].season;
		if (!seasonA || !seasonB) return 0;
		return seasonB.year - seasonA.year;
	});

	// Find the current season (season containing next upcoming race, or most recent season)
	let initialSlide = 0;
	let slideIndex = 0;
	let currentSeason = null;
	const today = new Date();

	// First, try to find the season with the next upcoming race
	for (const seasonKey of sortedSeasonKeys) {
		const { season, calendars } = calendarsBySeason[seasonKey];
		const upcomingIndex = calendars.findIndex((calendar) => {
			return new Date(calendar.date) >= today;
		});
		if (upcomingIndex !== -1) {
			initialSlide = slideIndex + upcomingIndex;
			currentSeason = season;
			break;
		}
		slideIndex += calendars.length;
	}

	// If no upcoming races found, use the season that contains today's date
	if (!currentSeason) {
		for (const seasonKey of sortedSeasonKeys) {
			const { season } = calendarsBySeason[seasonKey];
			if (
				season &&
				today >= new Date(season.startDate) &&
				today <= new Date(season.endDate)
			) {
				currentSeason = season;
				break;
			}
		}
	}

	// If still no season found, use the most recent season
	if (!currentSeason) {
		for (const seasonKey of sortedSeasonKeys) {
			const { season } = calendarsBySeason[seasonKey];
			if (season && season !== "no-season") {
				currentSeason = season;
				break;
			}
		}
	}
	return (
		<aside className={`bg-f1-bg-silver ${noPadding ? "" : "pt-10 pb-4.5"}`}>
			<div className="flex flex-col overflow-hidden">
				{!hideHeader && (
					<div className="w-full mx-auto max-w-screen-xl px-3">
						<div
							style={{
								borderColor:
									tenant.grids.length > 1
										? (getGridConfig(activeTab.id)
												?.primaryColor ??
											"var(--color-brand-primary)")
										: "var(--color-brand-primary)",
							}}
							className="border-t-8 border-r-8 rounded-tr-3xl pt-3 mb-6 px-0 md:max-w-screen-xl flex justify-between items-center"
						>
							<h2 className="font-bold text-3xl md:text-4xl">
								Calendário{" "}
								{currentSeason ? `${currentSeason.name}` : ""}
							</h2>
						</div>
					</div>
				)}
				{!activeSeason ? (
					<p className="text-f1-lighterCarbon text-sm py-6 text-center px-3">
						Nenhuma temporada ativa no momento.
					</p>
				) : (
				<>
				{sortedSeasonKeys.length > 0 && (
					<div className="w-full mx-auto max-w-screen-xl px-3 space-y-12">
						{sortedSeasonKeys.map((seasonKey) => {
							const { season, calendars } =
								calendarsBySeason[seasonKey];
							const seasonInitialSlide = calendars.findIndex(
								(calendar) => {
									return (
										new Date(calendar.date) >= new Date()
									);
								},
							);

							return (
								<div key={seasonKey} className="space-y-4">
									{/* <h3 className="font-bold text-2xl md:text-3xl border-b-2 border-f1-red pb-2">
										{season ? `${season.name} (${season.year})` : 'Sem Temporada'}
									</h3> */}

									<div className="w-full mt-6 cursor-pointer overflow-visible relative">
										<Swiper
											modules={[Navigation]}
											slidesPerView={"auto"}
											spaceBetween={16}
											navigation={true}
											initialSlide={
												seasonInitialSlide === -1
													? Math.max(
															0,
															calendars.length -
																1,
														)
													: seasonInitialSlide
											}
											className="!ml-0"
											breakpoints={{
												640: {
													slidesPerView: "auto",
													spaceBetween: 16,
													centeredSlides: false,
												},
												768: {
													slidesPerView: "auto",
													spaceBetween: 16,
													centeredSlides: false,
												},
												1024: {
													slidesPerView: "auto",
													spaceBetween: 16,
													centeredSlides: false,
												},
												1280: {
													slidesPerView: "auto",
													spaceBetween: 16,
													centeredSlides: false,
												},
											}}
										>
											{calendars.map((cal) => (
												<SwiperSlide
													key={cal.id}
													className="!w-auto !h-auto max-w-[320px]"
												>
													<div className="px-2 h-full">
														<Calendar
															round={
																cal.round || ""
															}
															sprint={
																cal.sprint ||
																false
															}
															track={
																cal.track
																	?.name ||
																cal.round ||
																""
															}
															location={
																cal.track
																	?.location ||
																""
															}
															date={
																cal.date || ""
															}
															grid={cal.grid}
															winnerA={getWinner(
																cal.id,
																cal.grid,
																cal.winnerA,
															)}
															winnerB={null}
															externalLink={
																!raceResultsMap[
																	cal.id
																] && cal.link
																	? cal.link
																	: undefined
															}
															map={
																cal.track
																	?.map || {
																	url: tenant
																		.logo
																		.url,
																}
															}
															flag={
																cal.track
																	?.flag || {
																	url: tenant
																		.logo
																		.url,
																}
															}
															seasonId={
																getSeasonForCalendar(
																	cal.id,
																) ?? undefined
															}
														/>
													</div>
												</SwiperSlide>
											))}
										</Swiper>
										<div className="pointer-events-none absolute -inset-y-2 left-0 -translate-x-full w-screen bg-f1-bg-silver/88 z-10" />
										<div className="pointer-events-none absolute -inset-y-2 right-0 translate-x-full w-screen bg-f1-bg-silver/88 z-10" />
									</div>
								</div>
							);
						})}
					</div>
				)}
				</>
				)}
			</div>
		</aside>
	);
}
