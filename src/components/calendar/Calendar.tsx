import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowForwardIos as MenuArrow } from "@mui/icons-material";
import { addHours } from "date-fns";

// Import Swiper styles and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CalendarProps {
	round: string;
	track: string;
	flag: { url: string };
	description: string;
	link: string;
	winnerA: string[];
	winnerB: string[];
	date: Date;
	map?: { url: string };
}

// This will be the container component that handles the carousel
export function CalendarCarousel({ events }: { events: CalendarProps[] }) {
	return (
		<div className="w-full hidden md:block">
			<Swiper
				modules={[Navigation, Pagination]}
				spaceBetween={16}
				slidesPerView={1.5}
				slidesPerGroup={1}
				navigation
				pagination={{ clickable: true }}
				breakpoints={{
					640: {
						slidesPerView: 2,
					},
					768: {
						slidesPerView: 2.5,
						spaceBetween: 20,
					},
					1024: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
					1280: {
						slidesPerView: 3.5,
						spaceBetween: 20,
					},
				}}
				className="calendar-swiper"
			>
				{events.map((event, index) => (
					<SwiperSlide key={index} className="md:h-full">
						<Calendar {...event} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

// This will display the regular grid on mobile and the carousel items on desktop
export function CalendarGrid({ events }: { events: CalendarProps[] }) {
	return (
		<>
			{/* Mobile view - grid layout */}
			<div className="flex flex-wrap gap-4 md:hidden">
				{events.map((event, index) => (
					<Calendar key={index} {...event} />
				))}
			</div>

			{/* Desktop view - carousel */}
			<CalendarCarousel events={events} />
		</>
	);
}

// Your original Calendar component with consistent sizing for MD screens
export function Calendar(props: CalendarProps) {
	const [isWithinTwoHours, setIsWithinTwoHours] = useState(false);
	const [isFutureDate, setIsFutureDate] = useState(true);

	useEffect(() => {
		const eventStartTime = new Date(props.date);
		const eventEndTime = addHours(eventStartTime, 2);
		const currentTime = new Date();

		if (currentTime >= eventStartTime && currentTime <= eventEndTime) {
			setIsWithinTwoHours(true);
			setIsFutureDate(false);

			const timeUntilEnd = eventEndTime.getTime() - currentTime.getTime();
			const timeoutId = setTimeout(() => {
				setIsWithinTwoHours(false);
				setIsFutureDate(currentTime > eventEndTime);
			}, timeUntilEnd);

			return () => clearTimeout(timeoutId);
		} else {
			setIsWithinTwoHours(false);
			setIsFutureDate(currentTime < eventStartTime);
		}
	}, [props.date]);

	const formattedDate = format(new Date(props.date), "dd '-' MMM", {
		locale: ptBR,
	});

	const [dayPart, monthPart] = formattedDate.split(" - ");
	const capitalizedMonth =
		monthPart.charAt(0).toUpperCase() + monthPart.slice(1);

	const formattedDateCapitalized = `${dayPart} ${capitalizedMonth}`;

	const isPastDate = new Date(props.date) < new Date();
	const isPastTwoHours = isPastDate && !isWithinTwoHours;

	return (
		<div
			className={`relative border-r-2 border-t-2 rounded-lg pr-2 pt-3 rounded-br-none rounded-tl-none group hover:opacity-100 transition-all duration-200 w-full md:min-h-[180px] md:h-full md:min-w-[250px] ${
				isPastTwoHours && " hover:border-f1-red"
			} ${isFutureDate ? "cursor-pointer" : "cursor-pointer"}`}
		>
			<a
				href={isFutureDate ? undefined : props.link}
				target={isFutureDate ? undefined : "_blank"}
				onClick={(e) => {
					if (isFutureDate) {
						e.preventDefault();
					}
				}}
				className={`h-full flex flex-col ${
					isFutureDate ? "cursor-pointer" : "cursor-pointer"
				}`}
			>
				<div className="text-f1-red font-bold text-sm pr-2 absolute bg-f1-bg-silver -top-[12px] uppercase">
					{props.round}
					{isPastTwoHours && " Finalizada"}
				</div>
				<div className="flex pb-5 mb-5 md:mb-0 items-center border-b-1 border-f1-black/20 md:items-start flex-grow">
					<div className="w-full md:mr-3 text-justify flex flex-col justify-between h-full">
						<div className="flex md:flex-col gap-1 md:gap-0 divide-black">
							<div className="text-lg/5 font-semibold md:leading-6">
								{formattedDateCapitalized}
								<span className="md:hidden"> - </span>
							</div>
							<div className="flex text-lg/5 font-bold uppercase md:leading-6">
								{props.track}
								<div
									className={`group-hover:translate-x-1 transition-all duration-200 ${
										isFutureDate && "hidden"
									}`}
								>
									<MenuArrow
										className="text-f1-red p-[2px] ml-1 translate-y-[-1px]"
										fontSize="small"
									/>
								</div>
							</div>
						</div>
						{props.description && (
							<p className="md:text-base/5 md:mt-2 line-clamp-2">
								{props.description}
							</p>
						)}
					</div>

					<img
						src={props.flag?.url}
						alt={`${props.track} flag`}
						className="rounded-md w-[46px] h-auto border border-f1-black/70 self-center md:self-start md:mt-3 flex-shrink-0"
					/>
				</div>

				{/* Background element - moved to not interfere with content */}
				<div className="hidden md:block bg-map-bg opacity-12 h-29 w-60 absolute bottom-2 -z-10" />

				<div className="hidden md:block py-4 h-33 px-2 z-10">
					{isFutureDate ? (
						<img
							src={props.map?.url}
							alt={`${props.track} map`}
							className="w-full h-full object-contain mx-auto scale-80"
						/>
					) : (
						<div className="h-full flex flex-col gap-2 items-center justify-center">
							<p className="font-f1Podium tracking-wider text-center bg-f1-bg-silver px-6">
								Vencedores
							</p>
							<div className="flex flex-col gap-1">
								{props.winnerA && (
									<div className="flex gap-2 rounded bg-f1-bg-silver px-4 py-1">
										<p className="font-black">A</p>
										<p className="font-semibold">
											{props.winnerA.name.toString()}
										</p>
									</div>
								)}
								{props.winnerB && (
									<div className="flex gap-2 rounded bg-f1-bg-silver px-4 py-1">
										<p className="font-black">B</p>
										<p className="font-semibold">
											{props.winnerB.name.toString()}
										</p>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</a>
		</div>
	);
}
