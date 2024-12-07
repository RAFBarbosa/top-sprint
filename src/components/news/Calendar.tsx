interface CalendarProps {
	season: string;
	photo: { url: string };
}

export function Calendar(props: CalendarProps) {
	return (
		<div>
			<img
				src={props.photo?.url}
				alt={`${props.season} photo`}
				className="shadow-lg mb-2"
			/>
			{/* <p className="mx-2">{props.season}</p> */}
		</div>
	);
}
