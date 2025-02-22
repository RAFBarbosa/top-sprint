import React from "react";

interface SignatureProps {
	side?: string;
}

export function Signature(props: SignatureProps) {
	const signature = {
		name: "Rafael Barbosa",
		imageUrl:
			"https://www.rafbarbosa.dev/assets/favicon-32x32-BhriZ6KG.png",
		website: "https://rafbarbosa.dev",
	};

	return (
		<a href={signature.website} target="_blank">
			<div
				className={`flex items-center justify-center group cursor-pointer opacity-80 hover:opacity-100 transition-all duration-200 ${
					props.side === "left" && "flex-row-reverse"
				}`}
			>
				{/* Text */}
				<div className="overflow-hidden p-1">
					<p className="text-white text-sm group-hover:text-amber-300 transition-all duration-400 transform md:translate-x-full group-hover:-translate-x-0 ease-in-out md:opacity-0 group-hover:opacity-100">
						Desenvolvido por {signature.name}
					</p>
				</div>
				{/* Image */}
				<img
					src={signature.imageUrl}
					alt={signature.name}
					className="w-8 h-auto rounded-full p-1 bg-neutral-700 "
				/>
			</div>
		</a>
	);
}

export default Signature;
