import { useEffect, useState } from "react";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { addHours } from "date-fns";
import { Link } from "react-router-dom";
import { HygraphImg } from "../utils/HygraphImg";

interface RoundProps {
	round: string;
	track: string;
	flag: { url: string };
	description: string;
	link: string;
	date: Date;
	isExternal?: boolean;
}

export function Round(props: RoundProps) {
	const isExternal = props.isExternal ?? true;
	const [isWithinTwoHours, setIsWithinTwoHours] = useState(false);
	const [isFutureDate, setIsFutureDate] = useState(false);

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

	const LinkComponent = ({ children }: { children: React.ReactNode }) => {
		const commonClasses = isFutureDate
			? "cursor-default"
			: "cursor-pointer";

		if (isFutureDate || !props.link) {
			return <div>{children}</div>;
		}

		if (isExternal) {
			return (
				<a
					href={isFutureDate ? undefined : props.link}
					target="_blank"
					className={commonClasses}
				>
					{children}
				</a>
			);
		}

		return (
			<Link to={props.link} className={commonClasses}>
				{children}
			</Link>
		);
	};

	return (
		<div
			className={`relative border-r-2 border-t-2 rounded-lg pr-2 pt-3 rounded-br-none rounded-tl-none group hover:opacity-100 transition-all duration-200 w-full sm:w-[48%] ${
				isPastTwoHours
					? "opacity-60 hover:border-f1-red"
					: "opacity-100"
			} ${isFutureDate ? "cursor-default" : "cursor-pointer"}`}
		>
			<LinkComponent>
				<div className="text-f1-red font-bold text-sm pr-2 absolute bg-white -top-[12px] md:-top-[12px] uppercase ">
					{props.round}
				</div>
				<div className="flex pb-5 mb-5 border-b-1 border-f1-black/20 items-center md:items-start ">
					<div className="w-full md:mr-3 text-justify">
						<div className=" flex md:flex-col gap-1 md:gap-0 divide-black ">
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
									<ArrowForwardIos
										className="text-f1-red p-[2px] ml-1 translate-y-[-1px]"
										fontSize="small"
									/>
								</div>
							</div>
						</div>
						{props.description && (
							<p className="md:text-base/5">
								{props.description}
							</p>
						)}
					</div>

					<HygraphImg
						src={props.flag?.url}
						alt={`${props.track} flag`}
						imgWidth={46}
						imgHeight={30}
						fit="clip"
						className="rounded-md w-[46px] h-auto border border-f1-black/70 self-start md:mt-3"
					/>
				</div>
			</LinkComponent>
		</div>
	);
}
