interface TeamProps {
	name: string;
	team: string;
	photo: { url: string };
}

export function Team(props: TeamProps) {
	return (
		<div className="p-4 rounded-lg text-center">
			<strong className="block text-f1-red text-xl font-bold mb-2">
				{props.team}
			</strong>
			<img
				src={props.photo?.url}
				alt={`${props.name} photo`}
				className="w-full h-auto object-contain rounded-lg mb-4"
			/>
			<span className="block text-f1-silver text-lg">{props.name}</span>
		</div>
	);
}
