import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowForwardIos as MenuArrow } from "@mui/icons-material";

interface CalendarProps {
	round: string;
	track: string;
	flag: { url: string };
	description: string;
	link: string;
	date: Date;
}

export function Calendar(props: CalendarProps) {
	const formattedDate = format(new Date(props.date), "dd '-' MMM", {
		locale: ptBR,
	});

	const [dayPart, monthPart] = formattedDate.split(" - ");
	const capitalizedMonth =
		monthPart.charAt(0).toUpperCase() + monthPart.slice(1);

	const formattedDateCapitalized = `${dayPart} ${capitalizedMonth}`;

	const isPastDate = new Date(props.date) < new Date();
	const isFutureDate = new Date(props.date) > new Date();

	return (
		<div
			className={`relative border-r-2 border-t-2 rounded-lg pr-2 pt-3 rounded-br-none rounded-tl-none group hover:opacity-100 transition-all duration-200 w-full sm:w-[48%] ${
				isPastDate && "opacity-60 hover:border-f1-red"
			} ${isFutureDate ? "cursor-default" : "cursor-pointer"}`}
		>
			<a
				href={isFutureDate ? undefined : props.link}
				target={isFutureDate ? undefined : "_blank"}
				onClick={(e) => {
					if (isFutureDate) {
						e.preventDefault(); // Prevents navigation if the date is in the future
					}
				}}
				className={`${
					isFutureDate ? "cursor-default" : "cursor-pointer"
				}`}
			>
				<div className="text-f1-red font-bold text-sm md:text-lg pr-2 absolute bg-white -top-[12px] md:-top-[16px] uppercase ">
					{props.round}
				</div>
				<div className="flex pb-5 mb-5 border-b-1 border-f1-black/20 items-center md:items-start ">
					<div className="w-full md:mr-3 text-justify">
						<div className="text-xl md:text-2xl font-bold flex md:flex-col gap-1 md:gap-0 divide-black leading-5 md:leading-7">
							<div>
								{formattedDateCapitalized}
								<span className="md:hidden"> - </span>
							</div>
							<div className="flex">
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
							<p className="md:text-xl">{props.description}</p>
						)}
					</div>

					<img
						src={props.flag?.url}
						alt={`${props.track} flag`}
						className="rounded-md min-w-[57px] min-h-[32px] border border-f1-black/70 self-start md:mt-3"
					/>
				</div>
				{/* <p className="text-xl md:text-2xl font-bold uppercase w-full tracking-wider text-justify">
				{props.track}
			</p> */}
			</a>
		</div>
	);
}
