import { useTab } from "../../contexts/TabContext";
import Watch from "/src/assets/img/casio.png";

interface CountdownRendererProps {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	completed: boolean;
	link?: string;
}

export function CountdownRenderer(props: CountdownRendererProps) {
	const { activeTab } = useTab();

	if (props.completed) {
		return (
			<a href={props.link} target="_blank" className="hover:opacity-90">
				<div
					className={`rounded-lg p-2 text-center mt-3 md:mt-0 md:w-[325px] flex justify-between items-center ${
						activeTab.id === "gridA"
							? "bg-f1-purple"
							: activeTab.id === "gridB"
							? "bg-f1-silver"
							: "bg-f1-academy-darker"
					}`}
				>
					<div className="flex flex-col w-full">
						<span className="font-bold uppercase text-center">
							{activeTab.id === "gridA"
								? "Grid Heat"
								: activeTab.id === "gridB"
								? "Grid Carbon"
								: "Grid Academy"}
						</span>
						<hr className="my-1 border-t border-white/50 ml-2 mr-4" />
						<div className="flex flex-col w-full justify-center mt-1">
							<span className="font-bold text-2xl a">
								Corrida ao vivo!
							</span>
							<p className="text-sm">Clique para assistir</p>
						</div>
					</div>
					<div className="w-[90px] h-auto mr-1">
						<img src={Watch} alt="Relogio" />
					</div>
				</div>
			</a>
		);
	} else {
		return (
			<div
				className={`rounded-lg p-2 text-center mt-3 md:mt-0 md:w-[325px] flex justify-between items-center	${
					activeTab.id === "gridA"
						? "bg-f1-purple"
						: activeTab.id === "gridB"
						? "bg-f1-silver"
						: "bg-f1-academy-darker"
				}`}
			>
				<div className="flex flex-col w-full">
					<span className="font-bold uppercase text-center">
						{activeTab.id === "gridA"
							? "Grid Heat"
							: activeTab.id === "gridB"
							? "Grid Carbon"
							: "Grid Academy"}
					</span>
					<hr className="my-1 border-t border-white/50 ml-2 mr-4" />
					<div className="flex w-full justify-center mt-1">
						<div className="flex flex-col items-center px-3">
							<span className="font-bold text-4xl">
								{props.days < 10
									? "0" + props.days
									: props.days}
							</span>
							<p className="text-sm tracking-tight -mt-1">
								{props.days == 1 ? "DIA" : "DIAS"}
							</p>
						</div>

						<div className="self-center h-11 w-[1px] bg-white/50"></div>

						<div className="flex flex-col items-center px-3">
							<span className="font-bold text-4xl">
								{props.hours < 10
									? "0" + props.hours
									: props.hours}
							</span>
							<p className="text-sm tracking-tight -mt-1">
								{props.hours == 1 ? "HR" : "HRS"}
							</p>
						</div>

						<div className="self-center h-11 w-[1px] bg-white/50"></div>

						<div className="flex flex-col items-center px-3">
							<span className="font-bold text-4xl flex">
								{props.minutes < 10
									? "0" + props.minutes
									: props.minutes}
								<span className="font-bold text-xs mt-1 ml-1">
									{props.seconds < 10
										? "0" + props.seconds
										: props.seconds}
								</span>
							</span>
							<p className="text-sm tracking-tight -mt-1 -ml-4">
								{props.minutes == 1 ? "MIN" : "MINS"}
							</p>
						</div>
					</div>
				</div>
				<div className="w-[90px] h-auto mr-1">
					<img src={Watch} alt="Relogio" />
				</div>
			</div>
		);
	}
}
