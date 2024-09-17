interface HallOfFameProps {
	season: string;
	photo: { url: string };
}

export function HallOfFame(props: HallOfFameProps) {
	return (
		<div className="group mx-2">
			<img
				src={props.photo?.url}
				alt={`${props.season} photo`}
				className="w-full my-2 shadow-lg"
			/>
			<span className="text-xl">{props.season}</span>
		</div>
	);
}
