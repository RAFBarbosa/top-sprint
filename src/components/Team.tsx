interface TeamProps {
	name: string;
	team: string;
	photo: { url: string };
}

export function Team(props: TeamProps) {
	return (
		<div className="mt-4 w-[500px]">
			{/* <h3 className="block text-f1-red text-xl font-bold mb-2">
				{props.team}
			</h3> */}
			<img
				src={props.photo?.url}
				alt={`${props.name} photo`}
				className="h-auto object-contain rounded-lg shadow-lg"
			/>
			{/* <span className="block text-f1-silver text-lg">{props.name}</span> */}
		</div>
	);
}
