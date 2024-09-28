import { Skeleton } from "@mui/material";
import { useState } from "react";

interface TeamProps {
	name: string;
	team: string;
	photo: { url: string };
}

export function Team(props: TeamProps) {
	const [loading, setLoading] = useState(true); // Track loading state

	const handleImageLoad = () => {
		setLoading(false); // Set loading to false when the image has loaded
	};

	return (
		<div
			className={`mr-3 relative ${
				loading ? "bg-gray-300" : "" // Apply background color while loading
			}`}
		>
			{loading && (
				<Skeleton
					variant="rounded"
					width="100%"
					height={410} // You can adjust the height as per the layout
					className="absolute top-0 left-0 w-full h-full"
				/>
			)}
			<img
				src={props.photo?.url}
				alt={`${props.name} photo`}
				className={`w-full h-auto object-cover rounded-lg shadow-lg transition-opacity duration-500 ${
					loading ? "opacity-0" : "opacity-100" // Smooth transition from loading to visible
				}`}
				onLoad={handleImageLoad} // Trigger image load event
			/>
		</div>
	);
}
