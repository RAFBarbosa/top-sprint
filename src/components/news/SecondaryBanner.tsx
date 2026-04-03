import GenericLogo from "/src/assets/img/white-logo.png";
import { HygraphImg } from "../utils/HygraphImg";
import { Link } from "react-router-dom";

interface SecondaryBannerProps {
	link: string;
	category: string;
	title: string;
	content: string;
	photo: { url: string };
}

export function SecondaryBanner(props: SecondaryBannerProps) {
	const isInternal = props.link.startsWith("/");

	const inner = (
		<div className="flex flex-row md:flex-col w-full h-24 md:h-auto rounded-md border border-gray-200 overflow-hidden bg-f1-bg-silver">
			{/* Image */}
			<div className="relative w-24 shrink-0 md:w-full md:aspect-square overflow-hidden">
				<HygraphImg
					src={props.photo?.url || GenericLogo}
					alt={props.content}
					imgWidth={400}
					imgHeight={533}
					className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-150 will-change-transform group-hover:scale-105"
				/>
			</div>
			{/* Text */}
			<div className="flex-1 flex flex-col py-2 px-2 overflow-hidden md:h-[80px] md:flex-none">
				{props.title && (
					<p
						style={{ color: "var(--color-brand-primary)" }}
						className="text-xs font-bold uppercase tracking-wider leading-none mb-1 line-clamp-2"
					>
						{props.title}
					</p>
				)}
				<div className="flex-1 flex items-center">
					<p className="text-sm font-semibold leading-none text-f1-text line-clamp-2 group-hover:underline">
						{props.content}
					</p>
				</div>
			</div>
		</div>
	);

	const className = "group block h-full";

	if (!props.link) {
		return <div className={className}>{inner}</div>;
	}

	if (isInternal) {
		return (
			<Link to={props.link} state={{ fromNews: true }} className={className}>
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
