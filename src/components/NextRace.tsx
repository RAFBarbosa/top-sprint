import Countdown, { CountdownRendererFn } from "react-countdown";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface NextRaceProps {
	track: string;
	date: Date;
	flag: { url: string };
}

const countdownRenderer: CountdownRendererFn = ({
	days,
	hours,
	minutes,
	completed,
}) => {
	if (completed) {
		return <span>Race is on!</span>;
	} else {
		return (
			<div className="text-lg">
				<div>
					<span className="font-bold">{days}</span> DIAS
				</div>
				<div>
					<span className="font-bold">{hours}</span> HRS
				</div>
				<div>
					<span className="font-bold">{minutes}</span> MINS
				</div>
			</div>
		);
	}
};

export function NextRace(props: NextRaceProps) {
	const formattedDate = format(new Date(props.date), "dd 'de' MMMM", {
		locale: ptBR,
	});

	const [dayPart, monthPart] = formattedDate.split(" de ");
	const capitalizedMonth =
		monthPart.charAt(0).toUpperCase() + monthPart.slice(1);

	const formattedDateCapitalized = `${dayPart} de ${capitalizedMonth}`;

	return (
		<div className="text-white md:flex justify-between max-w-screen-xl px-3 mx-auto">
			<div className="flex flex-col">
				<div className="block text-lg mb-2">
					{formattedDateCapitalized}
				</div>
				<div className="flex items-center">
					<img
						src={props.flag?.url}
						alt={`${props.track} flag`}
						className="w-[57px] h-auto object-cover rounded-lg shadow-lg mt-3"
					/>
					<p className="text-xl font-bold uppercase">
						{props.track}{" "}
					</p>
				</div>
			</div>
			<Countdown date={props.date} renderer={countdownRenderer} />
		</div>
	);
}
