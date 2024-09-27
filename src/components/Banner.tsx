import Skeleton from "react-loading-skeleton";

interface BannerProps {
	link: string;
	title: string;
	photo: { url: string };
}

export function Banner(props: BannerProps) {
	return (
		<div className="w-full md:pr-3 pt-2 cursor-pointer text-lg hover:underline group">
			<a
				href={props.link || ""}
				target="_blank"
				rel="noopener noreferrer"
			>
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
			</a>
		</div>
	);
}
