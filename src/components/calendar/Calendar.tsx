import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowForwardIos as MenuArrow } from "@mui/icons-material";
import { addHours } from "date-fns";

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
			// className={`relative border-r-2 border-t-2 rounded-lg pr-2 pt-3 rounded-br-none rounded-tl-none group hover:opacity-100 transition-all duration-200 w-full md:min-h-[180px] md:h-full md:min-w-[250px] ${
			className={`relative border-r-2 border-t-2 rounded-lg pr-2 pt-3 rounded-br-none rounded-tl-none group hover:opacity-100 transition-all duration-200 w-full min-h-[180px] h-full min-w-[250px] ${
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
				{/* <div className="flex pb-5 mb-5 md:mb-0 items-center border-b-1 border-f1-black/20 md:items-start flex-grow"> */}
				<div className="flex pb-5 mb-0 border-b-1 border-f1-black/20 items-start flex-grow">
					{/* <div className="w-full md:mr-3 text-justify flex flex-col justify-between h-full"> */}
					<div className="w-full mr-3 text-justify flex flex-col justify-between h-full">
						{/* <div className="flex md:flex-col gap-1 md:gap-0 divide-black"> */}
						<div className="flex flex-col gap-0 divide-black">
							{/* <div className="text-lg/5 font-semibold md:leading-6"> */}
							<div className="text-lg font-semibold leading-6">
								{formattedDateCapitalized}
								{/* <span className="md:hidden"> - </span> */}
							</div>
							{/* <div className="flex text-lg/5 font-bold uppercase md:leading-6"> */}
							<div className="flex text-lg font-bold uppercase leading-6">
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
							// <p className="md:text-base/5 md:mt-2 line-clamp-2">
							<p className="text-base/5 mt-2 line-clamp-2">
								{props.description}
							</p>
						)}
					</div>

					<img
						src={props.flag?.url}
						alt={`${props.track} flag`}
						// className="rounded-md w-[46px] h-auto border border-f1-black/70 self-center md:self-start md:mt-3 flex-shrink-0"
						className="rounded-md w-[46px] h-auto border border-f1-black/70 self-start mt-3 flex-shrink-0"
					/>
				</div>

				{/* Background element - moved to not interfere with content */}
				{/* <div className="hidden md:block bg-map-bg opacity-12 h-29 w-60 absolute bottom-2 -z-10" /> */}
				<div
					className={`bg-map-bg h-29 w-60 absolute bottom-2 -z-10 ${
						isFutureDate ? "opacity-12" : "opacity-8"
					}`}
				/>

				{/* <div className="hidden md:block py-4 h-33 px-2 z-10"> */}
				<div className="py-4 h-33 px-2 z-10">
					{isFutureDate ? (
						<img
							src={props.map?.url}
							alt={`${props.track} map`}
							className="w-full h-full object-contain mx-auto scale-90 opacity-85"
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
