import { Skeleton } from "@mui/material";
import { useState } from "react";

interface TeamProps {
	name: string;
	team: string;
	photo: { url: string };
}

export function Team(props: TeamProps) {
	const [loading, setLoading] = useState(true);

	const handleImageLoad = () => {
		setLoading(false);
	};

	return (
		<div
			className={`mr-3 relative h-[410px] mt-2${
				loading ? "bg-f1-lightSilver" : ""
			}`}
		>
			{loading && (
				<Skeleton
					variant="rounded"
					width="100%"
					height="100%"
					className="absolute top-0 left-0"
				/>
			)}
			<img
				src={props.photo?.url}
				alt={`${props.name} photo`}
				className={`w-full h-auto object-cover rounded-lg shadow-lg transition-opacity duration-500 ${
					loading ? "opacity-0" : "opacity-100"
				}`}
				onLoad={handleImageLoad}
			/>
		</div>
	);
}
