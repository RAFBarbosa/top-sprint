interface BannerProps {
	title: string;
	photo: { url: string };
}

export function Banner(props: BannerProps) {
	return (
		<div className="w-full">
			<div className="text-3xl font-bold my-4">{props.title}</div>
			<img
				src={props.photo?.url}
				alt={`${props.photo} photo`}
				className="shadow-lg"
			/>
		</div>
	);
}
