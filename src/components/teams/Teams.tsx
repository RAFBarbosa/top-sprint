import { useGetDriversQuery, useGetTeamsQuery } from "../../graphql/generated";
import { DriverCard } from "./DriverCard";
import { Skeleton } from "@mui/material";
import { useTab } from "../../contexts/TabContext";

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
		(driver) => driver.grid === activeTab.id
	);

	// Ordena os drivers por equipe para que pilotos do mesmo time fiquem em sequência
	const sortedDrivers = [...filteredDrivers].sort((a, b) => {
		const teamA = a.team?.name || "";
		const teamB = b.team?.name || "";

		if (teamA < teamB) return -1;
		if (teamA > teamB) return 1;
		return 0;
	});

	// Cria um array de DriverCards individuais
	const driverCards = sortedDrivers.map((driver) => {
		const driverTeam = teamsData?.teams.find(
			(team) => team.name === driver.team?.name
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

	console.log(
		"Drivers ordenados por equipe:",
		sortedDrivers.map((d) => ({
			name: d.name,
			team: d.team?.name,
			number: d.number,
		}))
	);

	return (
		<aside className="py-10 px-3 overflow-hidden">
			<div className="md:max-w-screen-xl md:px-0 mx-auto">
				<div className="w-full mx-auto max-w-screen-xl px-3">
					<div
						className={`border-t-8 border-r-8 rounded-tr-3xl pt-3 mb-6 px-0 md:max-w-screen-xl flex justify-between items-center ${
							activeTab.id === "gridA"
								? "border-f1-lighterPurple"
								: activeTab.id === "gridB"
								? "border-f1-carbon"
								: "border-f1-academy"
						}`}
					>
						<h2 className="font-bold text-3xl md:text-4xl">
							Equipes e Pilotos
						</h2>
					</div>
				</div>

				{/* Swiper Carousel */}
				{driverCards.length > 0 && (
					<div className="w-full mt-10 cursor-pointer overflow-visible relative px-2">
						<Swiper
							modules={[Navigation]}
							slidesPerView={"auto"}
							navigation={true}
							className="!ml-0"
							spaceBetween={12}
							freeMode={true}
						>
							{driverCards.map((card, index) => (
								<SwiperSlide
									key={sortedDrivers[index].id}
									className="!w-[192px] !h-auto" // 180px (w-45) + 12px gap
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
