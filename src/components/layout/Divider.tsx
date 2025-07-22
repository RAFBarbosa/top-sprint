import React from "react";

type DividerProps = {
	imageUrl: string;
	linkUrl: string;
	alt?: string;
	className?: string; // in case you want to extend styling externally
};

export function Divider({
	imageUrl = "https://us-west-2.graphassets.com/AEeXs9JBOTq6bJXaWi87dz/cmde5tyc1s6ma07ljmdjt4mu1",
	linkUrl = "https://www.instagram.com/bmzchange/",
	alt = "Divider",
	className = "",
}: DividerProps) {
	return (
		<div className={`relative my-4 h-22 w-full ${className}`}>
			<div className="h-full w-full bg-divider bg-cover opacity-5" />
			<a
				href={linkUrl}
				target="_blank"
				rel="noopener noreferrer"
				className="pointer"
			>
				<img
					src={imageUrl}
					alt={alt}
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:h-20 h-16"
				/>
			</a>
		</div>
	);
}
