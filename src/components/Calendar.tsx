interface CalendarProps {
	season: string;
	photo: { url: string };
}

export function Calendar(props: CalendarProps) {
	return (
		<div className="w-full">
			<strong className="">{props.season}</strong>
			<img
				src={props.photo?.url}
				alt={`${props.season} photo`}
				className="shadow-lg"
			/>
		</div>
	);
}
