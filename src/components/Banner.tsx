interface BannerProps {
	title: string;
	photo: { url: string };
}

export function Banner(props: BannerProps) {
	return (
		<div className="w-full">
			<div className="text-3xl md:text-4xl font-bold my-4 leading-8">
				{props.title}
			</div>
			<div className="overflow-hidden">
				<img
					src={props.photo?.url}
					alt={`${props.photo} photo`}
					className="shadow-lg transform transition-transform duration-150 group-hover:scale-105"
				/>
			</div>
		</div>
	);
}
