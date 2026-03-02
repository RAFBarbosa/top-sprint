import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowForwardIos as MenuArrow } from "@mui/icons-material";
import { addHours } from "date-fns";
import { tenant } from "../../shared/config/tenants";

interface CalendarProps {
	round: string;
	sprint: boolean;
	track: string;
	location: string;
	flag: { url: string };
	link: string;
	winnerA: any;
	winnerB: any;
	date: Date;
	map?: { url: string };
}

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

	// Add name filtering logic - remove any suffix with -
	const filterDriverName = (name: string) => {
		return name.replace(/-.*$/, "");
	};

	// Helper function to extract and filter names from winner objects
	const getFilteredWinnerName = (winner: any) => {
		if (!winner) return "";

		// If winner has a name property, use that
		if (winner.name) {
			return filterDriverName(winner.name.toString());
		}

		// If winner is an array of objects with name properties
		if (Array.isArray(winner)) {
			return winner
				.map((w) => (w.name ? filterDriverName(w.name.toString()) : ""))
				.join(" / ");
		}

		// Fallback: try to convert to string and filter
		return filterDriverName(winner.toString());
	};

	return (
		<div
			className={`relative border-r-2 border-t-2 rounded-lg pr-2 pt-3 rounded-br-none rounded-tl-none hover:opacity-100 transition-all duration-200 min-h-[180px] h-full w-[250px] ${
				isPastTwoHours ? "calendar-card-hover" : ""
			} cursor-pointer`}
		>
			<a
				href={isFutureDate ? undefined : props.link}
				target={isFutureDate ? undefined : "_blank"}
				onClick={(e) => {
					if (isFutureDate) {
						e.preventDefault();
					}
				}}
				className="h-full flex flex-col group"
			>
				<div
					style={{ color: "var(--color-brand-primary)" }}
					className="font-bold text-sm pr-2 absolute bg-f1-bg-silver -top-[12px] uppercase"
				>
					{props.round}
					{props.sprint && (
						<span className="text-f1-red ml-0.5"></span>
					)}
					{isPastTwoHours && <span> Finalizada</span>}
				</div>
				<div className="flex pb-3 mb-0 border-b border-f1-black/20 items-start flex-grow">
					<div className="w-full mr-3 flex flex-col justify-between h-full">
						<span className="text-sm font-semibold text-f1-text uppercase tracking-wide">
							{formattedDateCapitalized}
						</span>
						<div className="flex items-center gap-1 mt-0.5">
							<span className="text-lg font-bold uppercase leading-5 tracking-wide">
								{props.track}
							</span>
							{!isFutureDate && (
								<span className="transition-transform duration-200 group-hover:translate-x-1 inline-flex">
									<MenuArrow
										style={{
											color: "var(--color-brand-primary)",
											fontSize: "16px",
										}}
									/>
								</span>
							)}
						</div>
						{props.location && (
							<span className="text-f1-text mt-2 leading-4">
								{props.location}
							</span>
						)}
					</div>

					<div className="flex flex-col items-center flex-shrink-0">
						<img
							src={props.flag?.url}
							alt={`${props.track} flag`}
							className="rounded w-[42px] h-auto border border-f1-black/20 self-start"
						/>
						{props.sprint && (
							<span className="text-[10px] font-bold text-f1-red mt-1 tracking-wide uppercase">
								Sprint
							</span>
						)}
					</div>
				</div>

				<div
					className={`bg-map-bg h-29 w-60 absolute bottom-2 -z-10 ${
						!isFutureDate && props.winnerA
							? "opacity-5"
							: isFutureDate
								? "opacity-35"
								: "opacity-20"
					}`}
				/>

				<div className="py-4 h-33 px-2 z-10 relative">
					{/* Map always as watermark */}
					{props.map?.url && (
						<img
							src={props.map.url}
							alt=""
							className={`absolute inset-0 w-full h-full object-contain p-3 pointer-events-none transition-opacity duration-300 ${
								!isFutureDate && props.winnerA
									? "opacity-3"
									: isFutureDate
										? "opacity-85"
										: "opacity-20"
							}`}
						/>
					)}

					{!isFutureDate && props.winnerA ? (
						<div className="relative z-10 h-full flex items-center gap-3 px-1">
							{/* Photo */}
							<div
								className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden border-1"
								style={{
									backgroundColor:
										props.winnerA.team?.color?.hex ||
										"var(--color-brand-primary)",
								}}
							>
								{tenant.defaultPhotoStyle === "round" ? (
									<img
										src={
											props.winnerA.photo?.url ||
											tenant.fallbackDriverPhoto
										}
										alt={getFilteredWinnerName(
											props.winnerA,
										)}
										className="w-full h-full object-cover scale-123 translate-y-[5px]"
									/>
								) : (
									<img
										src={
											props.winnerA.photo?.url ||
											tenant.fallbackDriverPhoto
										}
										alt={getFilteredWinnerName(
											props.winnerA,
										)}
										className="w-full h-full object-cover scale-200 translate-y-[24px]"
									/>
								)}
							</div>
							{/* Name + label */}
							<div className="flex flex-col min-w-0">
								<span
									className="text-xs uppercase tracking-wide font-semibold"
									style={{
										color: "var(--color-brand-primary)",
									}}
								>
									Vencedor
								</span>
								<span className="font-bold uppercase tracking-wide leading-5 truncate">
									{getFilteredWinnerName(props.winnerA)}
								</span>
								{/* {props.winnerA.team?.name && (
									<span
										className="text-[10px] font-medium mt-0.5 truncate"
										style={{
											color:
												props.winnerA.team?.color
													?.hex ||
												"var(--color-brand-primary)",
										}}
									>
										{props.winnerA.team.name}
									</span>
								)} */}
							</div>
						</div>
					) : null}
				</div>
			</a>
		</div>
	);
}

