import Countdown from "react-countdown";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CountdownRenderer } from "./CountdownRender";

interface NextRaceProps {
	track: string;
	date: Date;
	link: string;
	description: string;
	flag: { url: string };
}

export function NextRace(props: NextRaceProps) {
	const formattedDate = format(new Date(props.date), "dd 'de' MMMM", {
		locale: ptBR,
	});

	const [dayPart, monthPart] = formattedDate.split(" de ");
	const capitalizedMonth =
		monthPart.charAt(0).toUpperCase() + monthPart.slice(1);

	const formattedDateCapitalized = `${dayPart} de ${capitalizedMonth}`;

	return (
		<div className="text-white md:flex justify-between max-w-screen-xl px-3 py-4 mx-auto tracking-wide">
			<div className="flex flex-col w-full">
				<div className="text-lg mb-2 font-bold">
					{formattedDateCapitalized}
				</div>
				<div className="flex">
					<div className="border-r border-t rounded-lg pr-2 pt-3 rounded-br-none rounded-tl-none mr-3 border-white/50">
						<img
							src={props.flag?.url}
							alt={`${props.track} flag`}
							className="rounded-md min-w-[57px] min-h-[32px]"
						/>
					</div>
					<span className="md:pt-0 pt-2 border-t w-full md:mr-3 border-white/50 flex flex-col md:flex-row md:items-end justify-center md:justify-start">
						<p
							className={`font-bold uppercase tracking-wider leading-6 md:leading-8 ${
								props.description
									? "text-xl md:text-2xl"
									: "text-2xl"
							}`}
						>
							{props.track}
						</p>
						{props.description && (
							<p className="text-sm md:text-base md:ml-2 md:mb-[1px] leading-2 md:leading-6">
								{props.description}
							</p>
						)}
					</span>
				</div>
			</div>
			<Countdown
				date={props.date}
				renderer={(countdownProps) => (
					<CountdownRenderer {...countdownProps} link={props.link} />
				)}
			/>
		</div>
	);
}
