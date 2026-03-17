import { useState } from "react";

interface SignatureProps {
	side?: string;
}

export function Signature(props: SignatureProps) {
	const [hovered, setHovered] = useState(false);
	const isLeft = props.side === "left";

	const signature = {
		name: "Rafael Barbosa",
		imageUrl:
			"https://www.rafbarbosa.dev/assets/favicon-32x32-BhriZ6KG.png",
		website: "https://rafbarbosa.dev",
	};

	return (
		<a
			href={signature.website}
			target="_blank"
			className="font-signature opacity-80 hover:opacity-100 transition-opacity duration-500"
		>
			{/* Mobile — logo first, centered */}
			<div className="flex items-center justify-center gap-2 md:hidden">
				<img
					src={signature.imageUrl}
					alt={signature.name}
					className="w-6 h-auto rounded-full p-1 bg-neutral-700 shrink-0"
				/>
				<p className="text-white text-xs">
					Desenvolvido por {signature.name}
				</p>
			</div>

			{/* Desktop — hover effect: logo sweeps left, text reveals right-to-left */}
			<div
				className="relative hidden md:inline-flex items-center"
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			>
				<p
					className="absolute top-1/2 -translate-y-1/2 text-xs whitespace-nowrap"
					style={{
						[isLeft ? "left" : "right"]: "0",
						[isLeft ? "paddingLeft" : "paddingRight"]: "4px",
						color: hovered ? "rgb(252 211 77)" : "white",
						clipPath: hovered
							? "inset(0 0 0 0%)"
							: isLeft
								? "inset(0 100% 0 0)"
								: "inset(0 0 0 100%)",
						transition: "clip-path 0.3s, color 0.2s",
					}}
				>
					Desenvolvido por {signature.name}
				</p>
				<img
					src={signature.imageUrl}
					alt={signature.name}
					className="w-6 h-auto rounded-full p-1 bg-neutral-700 shrink-0 relative z-10"
					style={{
						transform: hovered
							? `translateX(${isLeft ? "160px" : "-196px"})`
							: "translateX(0)",
						transition: "transform 0.3s",
					}}
				/>
			</div>
		</a>
	);
}

export default Signature;
