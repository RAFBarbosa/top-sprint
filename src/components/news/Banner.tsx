import { HygraphImg } from "../utils/HygraphImg";
import { Link } from "react-router-dom";

interface BannerProps {
	link: string;
	category: string;
	title: string;
	content: string;
	photo: { url: string };
}

export function Banner(props: BannerProps) {
	const isInternal = props.link.startsWith("/");

	const inner = (
		<>
			<div
				style={{ color: "var(--color-brand-primary)" }}
				className="text-sm font-semibold mt-2 uppercase"
			>
				{props.title}
			</div>
			<div>
				<div className="tenant-news-body tenant-news-body-primary text-2xl/6 md:text-3xl/8 font-semibold mb-4 group-hover:underline">
					{props.content}
				</div>
				<div className="overflow-hidden">
					<HygraphImg
						src={props.photo?.url}
						alt={props.content}
						imgWidth={600}
						className="shadow-lg w-full transform transition-transform duration-150 group-hover:scale-110"
					/>
				</div>
			</div>
		</>
	);

	const className = "w-full md:pr-3 pt-2 cursor-pointer text-lg group";

	if (!props.link) {
		return <div className={className}>{inner}</div>;
	}

	if (isInternal) {
		return (
			<Link
				to={props.link}
				state={{ fromNews: true }}
				className={className}
			>
				{inner}
			</Link>
		);
	}

	return (
		<a
			href={props.link}
			target="_blank"
			rel="noopener noreferrer"
			className={className}
		>
			{inner}
		</a>
	);
}
