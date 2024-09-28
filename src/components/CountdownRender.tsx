import { CountdownRendererFn } from "react-countdown";

const CountdownRenderer: CountdownRendererFn = ({
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
