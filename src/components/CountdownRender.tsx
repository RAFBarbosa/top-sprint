import { CountdownRendererFn } from "react-countdown";
import Watch from "/src/assets/casio.png";

export const CountdownRenderer: CountdownRendererFn = ({
	days,
	hours,
	minutes,
	completed,
}) => {
	if (completed) {
		return <span>Race is on!</span>;
	} else {
		return (
			<div className="bg-rolex rounded-lg p-2 text-center mt-3 md:mt-0 md:w-[500px] flex justify-between items-center">
				<div className="flex flex-col w-full">
					<span className="font-bold uppercase text-center">
						Sprint e Corrida
					</span>
					<hr className="my-1 border-t border-f1-lightSilver ml-2 mr-4 opacity-50" />
					<div className="flex w-full justify-center mt-1">
						<div className="flex flex-col items-center px-3">
							<span className="font-bold text-4xl">
								{days < 10 ? "0" + days : days}
							</span>
							<p className="text-sm tracking-tight -mt-1">
								{days == 1 ? "DIA" : "DIAS"}
							</p>
						</div>

						<div className="self-center h-11 w-[1px] bg-f1-lightSilver opacity-50"></div>

						<div className="flex flex-col items-center px-3">
							<span className="font-bold text-4xl">
								{hours < 10 ? "0" + hours : hours}
							</span>
							<p className="text-sm tracking-tight -mt-1">
								{hours == 1 ? "HR" : "HRS"}
							</p>
						</div>

						<div className="self-center h-11 w-[1px] bg-f1-lightSilver opacity-50"></div>

						<div className="flex flex-col items-center px-3">
							<span className="font-bold text-4xl">
								{minutes < 10 ? "0" + minutes : minutes}
							</span>
							<p className="text-sm tracking-tight -mt-1">
								{minutes == 1 ? "MIN" : "MINS"}
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
};
