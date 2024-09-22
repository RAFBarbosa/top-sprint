interface HallOfFameProps {
	season: string;
	photo: { url: string };
}

export function HallOfFame(props: HallOfFameProps) {
	return (
		<div className="">
			<img
				src={props.photo?.url}
				alt={`${props.season} photo`}
				className="shadow-lg"
			/>
			<span className="">{props.season}</span>
		</div>
	);
}
