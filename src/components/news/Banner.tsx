interface BannerProps {
	link: string;
	category: string;
	title: string;
	content: string;
	photo: { url: string };
}

export function Banner(props: BannerProps) {
	return (
		<div className="w-full md:pr-3 pt-2 cursor-pointer text-lg group">
			<a
				href={props.link || ""}
				target="_blank"
				rel="noopener noreferrer"
			>
				<div className="text-sm font-bold mt-2 text-f1-red uppercase">
					{props.title}
				</div>
				<div className="group-hover:underline">
					<div className="text-2xl/6 md:text-3xl/8 font-bold mb-4">
						{props.content}
					</div>
					<div className="overflow-hidden">
						<img
							src={props.photo?.url}
							alt={`${props.photo} photo`}
							className="shadow-lg w-full transform transition-transform duration-150 group-hover:scale-110"
						/>
					</div>
				</div>
			</a>
		</div>
	);
}
