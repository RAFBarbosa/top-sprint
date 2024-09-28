interface StandingProps {
	season: string;
	round: string;
	photos: string[];
}

export function Standing(props: StandingProps) {
	return (
		<div className="">
			{/* <strong className="text-f1-red text-lg font-bold block mb-2">
				{props.season}
			</strong> */}
			<div className="md:flex md:gap-x-4">
				{props.photos.map((photo, index) => (
					<img
						key={index}
						src={photo}
						alt={`${props.season} ${props.round} photo ${
							index + 1
						}`}
						className="md:w-1/2 h-auto object-contain rounded-lg shadow-lg mb-2 bg-inherit"
					/>
				))}
			</div>
			<span className="text-white mx-2">{props.round}</span>
		</div>
	);
}
