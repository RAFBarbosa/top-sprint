import { useGetDriversQuery, useGetTeamsQuery } from "../../graphql/generated";
import { DriverCard } from "./DriverCard";
import { Skeleton } from "@mui/material";
import { useTab } from "../../contexts/TabContext";
import { tenant } from "../../shared/config/tenants";
import { getGridConfig } from "../../shared/config/grids";
import { useDriverProfiles } from "../../contexts/DriverProfilesContext";

// Import Swiper components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const loadingSkeleton = () => (
	<div className="px-3 w-full md:max-w-screen-xl mx-auto">
		<div className="my-4">
			<Skeleton
				animation="wave"
				variant="rounded"
				height={350}
				sx={{ width: "100%" }}
			/>
		</div>
	</div>
);

export function Teams() {
	const { data: teamsData, error, loading } = useGetTeamsQuery();
	const { data: driversData } = useGetDriversQuery();
	const { activeTab } = useTab();
	const { isInGrid, applyProfile, profiles } = useDriverProfiles();

	if (loading || !driversData) return loadingSkeleton();
	if (error)
		return (
			<div className="text-red-500 text-center py-6">
				Erro: {error.message}
			</div>
		);

	const gridId = activeTab.id;
	const hasProfiles = Object.keys(profiles).length > 0;

	// Filter: prefer Firebase profile membership, fall back to Hygraph driver.grid
	// If the driver has no profile document at all, fall back to Hygraph grid field
	const filteredDrivers = driversData.drivers.filter((driver) => {
		if (!driver.deleted) {
			return isInGrid(driver.id, gridId) || (!profiles[driver.id] && driver.grid === gridId);
		}
		return false;
	});

	// Apply profile overrides (team, number, photo), exclude reserves, then sort by team name
	const sortedDrivers = filteredDrivers
		.map((driver) => {
			const driverTeam = teamsData?.teams.find(
				(team) => team.id === driver.team?.id,
			);
			const withTeam = {
				...driver,
				teamColor: driverTeam?.color?.hex,
				team: {
					...driver.team,
					class: driverTeam?.class,
					photo: driverTeam?.photo,
				},
			};
			const profiled = applyProfile(withTeam, gridId);
			// If the profile changed the team name, look up the new team's logo
			const resolvedTeam = teamsData?.teams.find((t) => t.name === profiled.team?.name);
			return {
				...profiled,
				team: {
					...profiled.team,
					photo: resolvedTeam?.photo ?? profiled.team?.photo,
					class: resolvedTeam?.class ?? profiled.team?.class,
				},
				teamColor: resolvedTeam?.color?.hex ?? profiled.teamColor,
			};
		})
		.filter((driver) => !driver.reserve)
		.sort((a, b) => {
			const teamNameA = a.team?.name || "";
			const teamNameB = b.team?.name || "";
			if (teamNameA < teamNameB) return -1;
			if (teamNameA > teamNameB) return 1;
			return 0;
		});

	// Cria um array de DriverCards individuais
	const driverCards = sortedDrivers.map((driver) => (
		<DriverCard key={driver.id} driver={driver} />
	));

	return (
		<aside className="py-10 overflow-hidden">
			<div className="max-w-screen-xl mx-auto">
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
							Equipes e Pilotos
						</h2>
					</div>
				</div>

				{/* Swiper Carousel */}
				{driverCards.length > 0 && (
					<div className="w-full mt-10 cursor-pointer overflow-visible relative px-3">
						<Swiper
							modules={[Navigation]}
							slidesPerView={"auto"}
							spaceBetween={12}
							navigation={true}
							className=""
							breakpoints={{
								640: {
									slidesPerView: "auto",
									spaceBetween: 12,
									centeredSlides: false,
								},
								768: {
									slidesPerView: "auto",
									spaceBetween: 12,
									centeredSlides: false,
								},
								1024: {
									slidesPerView: "auto",
									spaceBetween: 12,
									centeredSlides: false,
								},
								1280: {
									slidesPerView: "auto",
									spaceBetween: 12,
									centeredSlides: false,
								},
							}}
						>
							{driverCards.map((card, index) => (
								<SwiperSlide
									key={sortedDrivers[index].id}
									className="!w-auto !h-auto"
								>
									<div className="h-full">{card}</div>
								</SwiperSlide>
							))}
						</Swiper>
						<div className="pointer-events-none absolute -inset-y-2 left-0 -translate-x-full w-screen bg-white/88 z-10" />
						<div className="pointer-events-none absolute -inset-y-2 right-0 translate-x-full w-screen bg-white/88 z-10" />
					</div>
				)}
			</div>
		</aside>
	);
}

