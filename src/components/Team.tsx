interface TeamProps {
	name: string;
	team: string;
	photo: { url: string };
}

export function Team(props: TeamProps) {
	return (
		<div className="mr-2">
			{/* <div className=""> */}
			{/* <h3 className="block text-f1-red text-xl font-bold mb-2">
				{props.team}
			</h3> */}
			{/* <span className="block text-f1-silver text-lg">{props.name}</span> */}
			<img
				src={props.photo?.url}
				alt={`${props.name} photo`}
				className="w-full h-auto object-contain rounded-lg shadow-lg"
			/>
			{/* </div> */}
		</div>
	);
}
