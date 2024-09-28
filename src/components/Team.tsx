import { useState } from "react";
import { Skeleton } from "@mui/material";

interface TeamProps {
	name: string;
	team: string;
	photo: { url: string };
}

export function Team(props: TeamProps) {
	const [loaded, setLoaded] = useState(false); // Track whether the image is loaded

	const handleImageLoad = () => {
		setLoaded(true); // Set to true when the image has finished loading
	};

	return (
		<div
			className={`mr-3 w-full h-auto rounded-lg shadow-lg mt-3 relative ${
				loaded ? "" : "bg-gray-300" // Set background color while loading
			}`}
		>
			{!loaded && (
				<Skeleton
					variant="rectangular"
					width="100%"
					className="rounded-lg"
				/>
			)}
			<img
				src={props.photo?.url}
				alt={`${props.name} photo`}
				className={`w-full h-auto object-cover rounded-lg transition-opacity duration-500 ${
					loaded ? "opacity-100" : "opacity-0" // Smooth transition to visible image
				}`}
				onLoad={handleImageLoad} // Trigger image load event
			/>
		</div>
	);
}
