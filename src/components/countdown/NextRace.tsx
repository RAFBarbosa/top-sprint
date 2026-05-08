import Countdown from "react-countdown";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { CountdownRenderer } from "./CountdownRender";
import { CountryFlag } from "../utils/CountryFlag";

interface NextRaceProps {
	track: string;
	round: string;
	location: string;
	countryCode?: string;
	date: Date;
	link: string;
	grid: string;
	sprint: boolean;
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
		<div
			style={{ backgroundColor: "var(--color-countdown-bg)" }}
			className="tenant-countdown-bar text-white"
		>
			<div className="max-w-screen-xl mx-auto px-3 py-2 flex items-center justify-between gap-3 tracking-wide">
				<div className="flex flex-col min-w-0 leading-tight">
					<div className="flex items-center gap-2 text-[10px] md:text-xs text-white/70 uppercase tracking-wider">
						{props.round && (
							<span>
								{props.round} · {formattedDateCapitalized}
							</span>
						)}
						{/* {props.round && (
							<span className="h-3 w-px bg-white/30" />
						)} */}
						{/* <span className="whitespace-nowrap">
							· {formattedDateCapitalized}
						</span> */}
					</div>
					<div className="flex items-center gap-2 min-w-0">
						<CountryFlag
							code={props.countryCode}
							className="tenant-nextrace-flag rounded-xs w-[28px] h-[16px] border border-white/50 flex-shrink-0"
						/>
						<p className="tenant-nextrace-track font-bold uppercase tracking-wider text-sm md:text-base">
							{props.track}
						</p>
					</div>
				</div>

				<Countdown
					date={props.date}
					renderer={(countdownProps) => (
						<CountdownRenderer
							{...countdownProps}
							link={props.link}
						/>
					)}
				/>
			</div>
		</div>
	);
}
