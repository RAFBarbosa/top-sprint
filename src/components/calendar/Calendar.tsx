import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { LiveTv, ArrowForwardIos as MenuArrow } from "@mui/icons-material";
import { addHours } from "date-fns";
import { tenant } from "../../shared/config/tenants";
import { getGridConfig } from "../../shared/config/grids";
import { HygraphImg } from "../utils/HygraphImg";
import { Link } from "react-router-dom";

interface CalendarProps {
	round: string;
	sprint: boolean;
	track: string;
	location: string;
	flag: { url: string };
	grid: string;
	winnerA: any;
	winnerB: any;
	date: Date;
	map?: { url: string };
	externalLink?: string;
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

	const slugify = (str: string) =>
		str
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-|-$/g, "");

	const year = new Date(props.date).getFullYear();
	const month = String(new Date(props.date).getMonth() + 1).padStart(2, "0");
	const gridLabel = getGridConfig(props.grid)?.label ?? props.grid;
	const resultsSlug = `/resultados/${year}-${month}-${slugify(gridLabel)}-${slugify(props.round)}-${slugify(props.track)}`;

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

	const cardInner = (
		<>
			<div
				style={{ color: "var(--color-brand-primary)" }}
				className="font-bold text-sm pr-2 absolute bg-f1-bg-silver -top-[12px] uppercase"
			>
				{isPastTwoHours ? (
					<span className="text-f1-text">
						{props.round} Finalizada
					</span>
				) : (
					props.round
				)}
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

				<div className="flex flex-col items-center flex-shrink-0 mt-1">
					<HygraphImg
						src={props.flag?.url}
						alt={`Bandeira ${props.track}`}
						imgWidth={180}
						imgHeight={100}
						className="rounded w-[45px] h-[25px] border border-black/20 self-start"
					/>
					{props.sprint && (
						<span className="text-[10px] font-bold text-f1-red tracking-wider uppercase">
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
				{props.map?.url && (
					<img
						src={props.map.url}
						alt=""
						className={`absolute inset-0 w-full h-full object-contain p-3 pointer-events-none transition-opacity duration-300 ${
							!isFutureDate && props.winnerA
								? "opacity-3"
								: isFutureDate
									? "opacity-85"
									: "opacity-3"
						}`}
					/>
				)}

				{!isFutureDate && props.winnerA ? (
					<div className="relative z-10 h-full flex items-center gap-3 px-1">
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
									src={props.winnerA.photo?.url || tenant.fallbackDriverPhoto}
									alt={getFilteredWinnerName(props.winnerA)}
									className="w-full h-full object-cover scale-123 translate-y-[5px]"
								/>
							) : tenant.defaultPhotoStyle === "bust" ? (
								<img
									src={props.winnerA.photo?.url || tenant.fallbackDriverPhoto}
									alt={getFilteredWinnerName(props.winnerA)}
									className="object-cover translate-y-[6px]"
								/>
							) : (
								<img
									src={props.winnerA.photo?.url || tenant.fallbackDriverPhoto}
									alt={getFilteredWinnerName(props.winnerA)}
									className="w-full h-full object-cover scale-200 translate-y-[24px]"
								/>
							)}
						</div>
						<div className="flex flex-col min-w-0">
							<span
								className="text-xs uppercase tracking-wide font-semibold"
								style={{ color: "var(--color-brand-primary)" }}
							>
								Vencedor
							</span>
							<span className="font-bold uppercase tracking-wide leading-5 truncate">
								{getFilteredWinnerName(props.winnerA)}
							</span>
							<div className="flex items-center gap-1 mt-1.5 transition-colors duration-150 group-hover:opacity-70">
								<LiveTv
									className="text-[var(--color-brand-primary)]"
									style={{ fontSize: "12px" }}
								/>
								<span className="text-[10px] mt-[2px] font-semibold uppercase tracking-wide text-[var(--color-brand-primary)]">
									Ver resultados
								</span>
							</div>
						</div>
					</div>
				) : !isFutureDate ? (
					<div className="relative z-10 h-full flex items-center justify-center px-1">
						<div className="flex items-center gap-1 transition-colors duration-150 group-hover:opacity-70">
							<LiveTv
								className="text-[var(--color-brand-primary)]"
								style={{ fontSize: "16px" }}
							/>
							<span className="text-sm font-semibold uppercase tracking-wide text-[var(--color-brand-primary)] pt-[1px]">
								Ver resultados
							</span>
						</div>
					</div>
				) : null}
			</div>
		</>
	);

	return (
		<div
			className={`relative border-r-2 border-t-2 rounded-lg pr-2 pt-3 rounded-br-none rounded-tl-none hover:opacity-100 transition-all duration-200 min-h-[180px] h-full w-[250px] ${
				isPastTwoHours ? "calendar-card-hover" : ""
			} cursor-pointer`}
		>
			{props.externalLink && !isFutureDate ? (
				<a
					href={props.externalLink}
					target="_blank"
					rel="noopener noreferrer"
					className="h-full flex flex-col group"
				>
					{cardInner}
				</a>
			) : (
				<Link
					to={isFutureDate ? "#" : resultsSlug}
					onClick={(e) => { if (isFutureDate) e.preventDefault(); }}
					className="h-full flex flex-col group"
				>
					{cardInner}
				</Link>
			)}
		</div>
	);
}
