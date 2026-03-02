import { HygraphImg } from "./HygraphImg";

interface SignatureProps {
	side?: string;
}

export function PoweredBy(props: SignatureProps) {
	const signature = {
		name: "Liga Top Sprint",
		imageUrl:
			"https://us-west-2.graphassets.com/AEeXs9JBOTq6bJXaWi87dz/cmf3gg5kf2kf107lkrxa2kdfd",
		website: "https://www.ligatopsprint.com/",
	};

	return (
		<a href={signature.website} target="_blank">
			<div
				className={`flex gap-1 items-center justify-center group cursor-pointer opacity-100 hover:opacity-80 transition-all duration-200 ${
					props.side === "left" && "flex-row-reverse"
				}`}
			>
				<div className="overflow-hidden font-light self-end translate-y-[-1px]">
					<p className="text-xs">Powered By</p>
				</div>
				<HygraphImg
					src={signature.imageUrl}
					alt={signature.name}
					imgWidth={24}
					imgHeight={24}
					className="w-6 h-auto rounded-full"
				/>
			</div>
		</a>
	);
}

export default PoweredBy;
