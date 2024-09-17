interface StandingProps {
	season: string;
	round: string;
	photos: string[];
}

export function Standing(props: StandingProps) {
	return (
		<div className="group mx-2">
			<strong className="text-xl">{props.season}</strong>
			<div className="flex space-x-2">
				{props.photos.map((photo, index) => (
					<img
						key={index}
						src={photo}
						alt={`${props.season} ${props.round} photo ${
							index + 1
						}`}
						className="w-1/2 h-auto object-contain my-2"
					/>
				))}
			</div>
			<span className="text-xl">{props.round}</span>
		</div>
	);
}
