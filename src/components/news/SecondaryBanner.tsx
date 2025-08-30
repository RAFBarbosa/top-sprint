import GenericLogo from "/src/assets/img/white-logo.png";

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
				className="h-full grid place-items-center content-center"
			>
				{/* Title */}
				<div className="text-sm font-bold text-f1-red uppercase mb-2 w-full">
					{props.title}
				</div>

				{/* Content and image */}
				<div className="group flex gap-6 items-center w-full">
					<div className="w-2/3 space-y-1">
						<div className="leading-4 md:leading-5 text-base md:text-base font-semibold group-hover:underline">
							{props.content}
						</div>
					</div>
					<div className="overflow-hidden w-1/3 flex items-center justify-center">
						<div className="w-full h-24 flex items-center justify-center overflow-hidden rounded">
							<img
								src={props.photo?.url || GenericLogo}
								alt={`${props.title} photo`}
								className="min-h-full min-w-full object-cover transform transition-transform duration-150 group-hover:scale-105"
							/>
						</div>
					</div>
				</div>
			</a>
		</div>
	);
}
