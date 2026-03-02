import GenericLogo from "/src/assets/img/white-logo.png";
import { HygraphImg } from "../utils/HygraphImg";

interface SecondaryBannerProps {
	link: string;
	category: string;
	title: string;
	content: string;
	photo: { url: string };
}

export function SecondaryBanner(props: SecondaryBannerProps) {
	return (
		<div className="w-full cursor-pointer text-lg group bg-f1-bg-silver p-3 rounded-lg h-full">
			<a
				href={props.link || ""}
				target="_blank"
				rel="noopener noreferrer"
				className="h-full flex flex-col justify-between"
			>
				{/* Title */}
				<div
					style={{ color: "var(--color-brand-primary)" }}
					className="text-sm font-bold uppercase mb-2 w-full"
				>
					{props.title}
				</div>

				{/* Content and image */}
				<div className="group flex gap-4 items-center w-full flex-grow">
					<div className="w-4/5 space-y-1">
						<div className="leading-4 text-base font-semibold group-hover:underline">
							{props.content}
						</div>
					</div>
					<div className="overflow-hidden w-1/5 flex items-center justify-center">
						<div className="w-full h-[110px] flex items-center justify-center overflow-hidden rounded">
							<HygraphImg
								src={props.photo?.url || GenericLogo}
								alt={props.content}
								imgWidth={110}
								imgHeight={110}
								className="h-full w-auto rounded object-cover transform transition-transform duration-150 group-hover:scale-105"
							/>
						</div>
					</div>
				</div>
			</a>
		</div>
	);
}
