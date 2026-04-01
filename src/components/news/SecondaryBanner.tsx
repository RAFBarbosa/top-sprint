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
		<>
			{/* Image */}
			<div className="shrink-0 w-16 h-16 overflow-hidden rounded-lg">
				<HygraphImg
					src={props.photo?.url || GenericLogo}
					alt={props.content}
					imgWidth={200}
					imgHeight={200}
					className="w-full h-full object-cover transform transition-transform duration-150 group-hover:scale-105"
				/>
			</div>

			{/* Text */}
			<div className="flex flex-col gap-0.5 min-w-0">
				{props.title && (
					<span
						style={{ color: "var(--color-brand-primary)" }}
						className="text-xs font-bold uppercase tracking-wide leading-none"
					>
						{props.title}
					</span>
				)}
				<p className="text-sm font-semibold leading-snug line-clamp-2 group-hover:underline">
					{props.content}
				</p>
			</div>
		</>
	);

	const className = "group flex gap-4 items-center border-b border-black/8 last:border-0 py-3 first:pt-0 last:pb-0";

	if (!props.link) {
		return <div className={className}>{inner}</div>;
	}

	if (isInternal) {
		return (
			<Link to={props.link} className={className}>
				{inner}
			</Link>
		);
	}

	return (
		<a href={props.link} target="_blank" rel="noopener noreferrer" className={className}>
			{inner}
		</a>
	);
}
