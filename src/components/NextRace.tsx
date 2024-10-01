import Countdown from "react-countdown";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CountdownRenderer } from "./CountdownRender";

interface NextRaceProps {
	track: string;
	date: Date;
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
		<div className="text-white md:flex justify-between max-w-screen-xl p-4 mx-auto tracking-wide">
			<div className="flex flex-col w-full">
				<div className="text-lg mb-2 font-bold">
					{formattedDateCapitalized}
				</div>
				<div className="flex">
					<div className="border-r border-t rounded-lg pr-2 pt-3 rounded-br-none rounded-tl-none mr-3 border-opacity-50">
						<img
							src={props.flag?.url}
							alt={`${props.track} flag`}
							className="rounded-md"
						/>
					</div>
					<p className="text-xl md:text-2xl font-bold uppercase pt-2 border-t w-full md:mr-3 tracking-wider border-opacity-50">
						{props.track}
					</p>
				</div>
			</div>
			<Countdown date={props.date} renderer={CountdownRenderer} />
		</div>
	);
}
