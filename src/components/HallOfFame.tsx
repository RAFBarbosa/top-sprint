interface HallOfFameProps {
	season: string;
	photo: { url: string };
}

export function HallOfFame(props: HallOfFameProps) {
	return (
		<div className="mr-3">
			{/* <span className="">{props.season}</span> */}
			<img
				src={props.photo?.url}
				alt={`${props.season} photo`}
				className="w-full h-auto object-cover rounded-lg"
			/>
		</div>
	);
}
