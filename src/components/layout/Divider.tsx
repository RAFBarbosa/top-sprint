import React, { useEffect, useState } from "react";

type ImageAd = {
	imageUrl: string;
	linkUrl: string;
	alt?: string;
};

type DividerProps = {
	images?: ImageAd[];
	className?: string;
	interval?: number; // time in ms before switching
};

const DEFAULT_IMAGES: ImageAd[] = [
	{
		imageUrl: "https://us-west-2.graphassets.com/AEeXs9JBOTq6bJXaWi87dz/cmder4cgvgnmj07k83zkke2zv",
		linkUrl: "https://www.instagram.com/bmzchange/",
		alt: "BMZ Instagram",
	},
	{
		imageUrl: "https://us-west-2.graphassets.com/AEeXs9JBOTq6bJXaWi87dz/cmdeuu625muwo07lp8xy7nuyo",
		linkUrl: "https://wa.me/5511965032167",
		alt: "Danilo Personal",
	},
];

export function Divider({
	images = DEFAULT_IMAGES,
	className = "",
	interval = 7000, // default switch every 7 seconds
}: DividerProps) {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrent((prev) => (prev + 1) % images.length);
		}, interval);

		return () => clearInterval(timer);
	}, [images.length, interval]);

	return (
		<div className={`relative my-4 h-18 w-full ${className}`}>
			<div className="h-full w-full bg-divider bg-cover opacity-5" />

			{images.map((img, index) => (
				<a
					key={index}
					href={img.linkUrl}
					target="_blank"
					rel="noopener noreferrer"
					className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${
						index === current ? "opacity-100 z-10" : "opacity-0 z-0"
					}`}
				>
					<img
						src={img.imageUrl}
						alt={img.alt || "Sponsor"}
						className="md:h-16 h-14"
					/>
				</a>
			))}
		</div>
	);
}
