// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useGetCalendarsQuery } from "../../graphql/generated";
// import GenericLogo from "/src/assets/img/white-logo.png";
// import { Calendar } from "./Calendar";
// import { Skeleton } from "@mui/material";
// import { useTab } from "../../contexts/TabContext";
// import { TabSwitch } from "../standings/csv/TabSwitch";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// const loadingSkeleton = () => (
// 	<div className="w-[305px] my-6 md:mb-0 mx-auto">
// 		<Skeleton
// 			animation="wave"
// 			variant="rectangular"
// 			height={500}
// 			sx={{ my: 1, margin: "auto" }}
// 		/>
// 	</div>
// );

// function createSlug(calendar) {
// 	const track = calendar.track?.toLowerCase().replace(/\s+/g, "-") || "track";
// 	const grid = calendar.grid || "grid";
// 	const date = calendar.date?.split("T")[0] || "date";
// 	return `${track}-${grid}-${date}`;
// }

// export function Calendars({ onCalendarClick, selectedCalendar, initialSlug }) {
// 	const { data, error, loading } = useGetCalendarsQuery();
// 	const { activeTab } = useTab();
// 	const location = useLocation();
// 	const navigate = useNavigate();

// 	const isResultsPage = location.pathname.includes("resultados");

// 	if (loading) return loadingSkeleton();
// 	if (error) return <div>Erro: {error.message}</div>;

// 	const filteredCalendars = data?.calendars.filter(
// 		(calendar) => calendar.grid === activeTab.id
// 	);

// 	// Auto-select calendar if initialSlug is provided
// 	useEffect(() => {
// 		if (initialSlug && filteredCalendars?.length) {
// 			const match = filteredCalendars.find(
// 				(c) => createSlug(c) === initialSlug
// 			);
// 			if (
// 				match &&
// 				(!selectedCalendar || selectedCalendar.id !== match.id)
// 			) {
// 				onCalendarClick({ ...match, slug: createSlug(match) });
// 			}
// 		}
// 	}, [initialSlug, filteredCalendars]);

// 	const handleCalendarClick = (calendar) => {
// 		// const slug = createSlug(calendar);
// 		// if (isResultsPage) {
// 		// 	onCalendarClick({ ...calendar, slug });
// 		// } else {
// 		// 	navigate(`/resultados/${slug}`, {
// 		// 		state: { calendar: { ...calendar, slug } },
// 		// 	});
// 		// }
// 	};

// 	return (
// 		<aside className="bg-f1-bg-silver pt-10">
// 			<div className="flex flex-col overflow-hidden">
// 				<div className="w-full mx-auto max-w-screen-xl px-3">
// 					<div
// 						className={`border-t-8 border-r-8 rounded-tr-3xl pt-3 mb-6 px-0 md:max-w-screen-xl flex justify-between items-center ${
// 							activeTab.id === "gridA"
// 								? "border-f1-lighterPurple"
// 								: "border-f1-carbon"
// 						}`}
// 					>
// 						<h2 className="font-bold text-3xl md:text-4xl">
// 							Calendário
// 						</h2>
// 						<div className="w-full md:w-auto flex justify-end">
// 							<TabSwitch />
// 						</div>
// 					</div>
// 				</div>

// 				{filteredCalendars && filteredCalendars.length > 0 && (
// 					<div className="w-full mx-auto max-w-screen-xl">
// 						<div className="w-full mt-10 cursor-pointer overflow-visible relative">
// 							<Swiper
// 								modules={[Navigation]}
// 								slidesPerView={"auto"}
// 								navigation={true}
// 								className="!ml-0"
// 								breakpoints={{
// 									640: {
// 										slidesPerView: "auto",
// 										spaceBetween: 16,
// 									},
// 									768: {
// 										slidesPerView: "auto",
// 										spaceBetween: 16,
// 									},
// 									1024: {
// 										slidesPerView: "auto",
// 										spaceBetween: 16,
// 									},
// 									1280: {
// 										slidesPerView: "auto",
// 										spaceBetween: 16,
// 									},
// 								}}
// 							>
// 								{filteredCalendars.map((calendar) => {
// 									const slug = createSlug(calendar);
// 									return (
// 										<SwiperSlide
// 											key={calendar.id}
// 											className="!w-auto !h-auto max-w-[320px]"
// 										>
// 											<div className="px-2 h-full">
// 												<Calendar
// 													{...calendar}
// 													onCalendarClick={() =>
// 														handleCalendarClick(
// 															calendar
// 														)
// 													}
// 													isSelected={
// 														selectedCalendar?.slug ===
// 														slug
// 													}
// 												/>
// 											</div>
// 										</SwiperSlide>
// 									);
// 								})}
// 							</Swiper>

// 							<div className="pointer-events-none absolute -inset-y-2 left-0 -translate-x-full w-screen bg-f1-bg-silver/88 z-10" />
// 							<div className="pointer-events-none absolute -inset-y-2 right-0 translate-x-full w-screen bg-f1-bg-silver/88 z-10" />
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		</aside>
// 	);
// }

import { useGetCalendarsQuery } from "../../graphql/generated";
import GenericLogo from "/src/assets/img/white-logo.png";
import { Calendar } from "./Calendar";
import { Skeleton } from "@mui/material";
import { useTab } from "../../contexts/TabContext";
import { TabSwitch } from "../standings/csv/TabSwitch";

// Import Swiper components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const loadingSkeleton = () => {
	return (
		<div className="w-[305px] my-6 md:mb-0 mx-auto">
			<Skeleton
				animation="wave"
				variant="rectangular"
				height={500}
				sx={{ my: 1, margin: "auto" }}
			/>
		</div>
	);
};

export function Calendars() {
	const { data, error, loading } = useGetCalendarsQuery();
	const { activeTab } = useTab();

	if (loading) return loadingSkeleton();
	if (error) return <div>Erro: {error.message}</div>;

	const filteredCalendars = data?.calendars.filter((calendar) => {
		return calendar.grid === activeTab.id;
	});

	return (
		<aside className="bg-f1-bg-silver pt-10">
			<div className="flex flex-col overflow-hidden">
				<div className="w-full mx-auto max-w-screen-xl px-3">
					<div
						className={`border-t-8 border-r-8 rounded-tr-3xl pt-3 mb-6 px-0 md:max-w-screen-xl flex justify-between items-center ${
							activeTab.id === "gridA"
								? "border-f1-lighterPurple"
								: "border-f1-carbon"
						}`}
					>
						<h2 className="font-bold text-3xl md:text-4xl">
							Calendário
						</h2>
						<div className="w-full md:w-auto flex justify-end">
							<TabSwitch />
						</div>
					</div>
				</div>

				{/* Mobile view - grid layout */}
				{/* <div className="flex flex-wrap gap-4 w-full justify-between mt-10 px-3 md:px-0 md:hidden">
					{filteredCalendars && filteredCalendars.length > 0 ? (
						filteredCalendars.map((data) => (
							<Calendar
								key={data.id}
								round={data.round || ""}
								track={data.track || ""}
								description={data.description || ""}
								date={data.date || ""}
								link={data.link || ""}
								flag={data.flag || { url: GenericLogo }}
							/>
						))
					) : (
						<p>No calendar available</p>
					)}
				</div> */}

				{/* Desktop view - carousel */}
				{filteredCalendars && filteredCalendars.length > 0 && (
					<div className="w-full mx-auto max-w-screen-xl px-3">
						<div className="w-full mt-10 cursor-pointer overflow-visible relative">
							<Swiper
								modules={[Navigation]}
								slidesPerView={"auto"}
								navigation={true}
								className="!ml-0" // Force left alignment
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
								{filteredCalendars.map((data) => (
									<SwiperSlide
										key={data.id}
										className="!w-auto !h-auto max-w-[320px]"
									>
										<div className="px-2 h-full">
											<Calendar
												round={data.round || ""}
												track={data.track || ""}
												description={
													data.description || ""
												}
												date={data.date || ""}
												winnerA={data.winnerA || ""}
												winnerB={data.winnerB || ""}
												link={data.link || ""}
												map={
													data.map || {
														url: GenericLogo,
													}
												}
												flag={
													data.flag || {
														url: GenericLogo,
													}
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
				)}
			</div>
		</aside>
	);
}
