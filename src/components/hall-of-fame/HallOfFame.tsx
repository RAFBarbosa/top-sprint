import { Skeleton } from "@mui/material";
import { useState } from "react";
import { HygraphImg } from "../utils/HygraphImg";

interface HallOfFameProps {
	season: string;
	photo: { url: string };
}

export function HallOfFame(props: HallOfFameProps) {
	const [loading, setLoading] = useState(true);

	const handleImageLoad = () => {
		setLoading(false);
	};

	return (
		<div
			className={`relative mt-2 min-h-[480px] ${
				loading && "bg-f1-lightSilver"
			} flex justify-center items-center`}
		>
			{loading && (
				<Skeleton
					variant="rounded"
					width="100%"
					height="100%"
					className="absolute top-0 left-0"
				/>
			)}
			<HygraphImg
				src={props.photo.url}
				alt={`${props.season} photo`}
				imgWidth={600}
				className={`max-h-[600px] w-auto max-w-full mx-auto object-contain rounded-lg shadow-lg transition-opacity duration-500 ${
					loading ? "opacity-0" : "opacity-100"
				}`}
				onLoad={handleImageLoad}
			/>
		</div>
	);
}
