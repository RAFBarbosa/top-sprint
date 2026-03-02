import { useGetDriversQuery, useGetTeamsQuery } from "../../graphql/generated";
import { DriverCard } from "./DriverCard";
import { Skeleton } from "@mui/material";
import { useTab } from "../../contexts/TabContext";
import { tenant } from "../../shared/config/tenants";
import { getGridConfig } from "../../shared/config/grids";

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

	if (loading || !driversData) return loadingSkeleton();
	if (error)
		return (
			<div className="text-red-500 text-center py-6">
				Erro: {error.message}
			</div>
		);

	// Filtra drivers pelo grid ativo
	const filteredDrivers = driversData.drivers.filter(
		(driver) => driver.grid === activeTab.id,
	);

	// Ordena os drivers: primeiro por classe (A antes de B), depois por equipe em ordem alfabética
	const sortedDrivers = [...filteredDrivers].sort((a, b) => {
		const teamA = teamsData?.teams.find((team) => team.id === a.team?.id);
		const teamB = teamsData?.teams.find((team) => team.id === b.team?.id);

		const classA = teamA?.class || "";
		const classB = teamB?.class || "";
		const teamNameA = a.team?.name || "";
		const teamNameB = b.team?.name || "";

		// Primeiro ordena por classe (Class A vem antes de Class B)
		if (classA === "classA" && classB === "classB") return -1;
		if (classA === "classB" && classB === "classA") return 1;

		// Se mesma classe, ordena por nome da equipe em ordem alfabética
		if (teamNameA < teamNameB) return -1;
		if (teamNameA > teamNameB) return 1;

		return 0;
	});

	// Cria um array de DriverCards individuais
	const driverCards = sortedDrivers.map((driver) => {
		const driverTeam = teamsData?.teams.find(
			(team) => team.id === driver.team?.id,
		);

		return (
			<DriverCard
				key={driver.id}
				driver={{
					...driver,
					teamColor: driverTeam?.color?.hex,
					team: {
						...driver.team,
						class: driverTeam?.class,
						photo: driverTeam?.photo,
					},
				}}
			/>
		);
	});

	return (
		<aside className="py-10 px-3 overflow-hidden">
			<div className="md:max-w-screen-xl md:px-0 mx-auto">
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

