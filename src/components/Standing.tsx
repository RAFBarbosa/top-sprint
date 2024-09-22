interface StandingProps {
	season: string;
	round: string;
	photos: string[];
}

export function Standing(props: StandingProps) {
	return (
		<div className="bg-f1-carbon p-4 rounded-lg shadow-md">
			<strong className="text-f1-red text-lg font-bold block mb-2">
				{props.season}
			</strong>
			<div className="md:flex md:space-x-4">
				{props.photos.map((photo, index) => (
					<img
						key={index}
						src={photo}
						alt={`${props.season} ${props.round} photo ${
							index + 1
						}`}
						className="md:w-1/2 h-auto object-contain rounded-lg shadow-lg"
					/>
				))}
			</div>
			<span className="text-f1-silver text-sm block mt-2">
				{props.round}
			</span>
		</div>
	);
}
