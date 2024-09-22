interface BannerProps {
	photo: { url: string };
}

export function Banner(props: BannerProps) {
	return (
		<div className="w-full">
			<img
				src={props.photo?.url}
				alt={`${props.photo} photo`}
				className="shadow-lg"
			/>
		</div>
	);
}
