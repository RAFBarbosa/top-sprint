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
		<div className="mr-3">
			{loading && (
				<Skeleton
					variant="rounded"
					width="100%"
					height={410}
					className="relative"
				/>
			)}
			<img
				src={props.photo?.url}
				alt={`${props.name} photo`}
				className={`w-full h-auto object-cover rounded-lg shadow-lg mt-3 absolute ${
					loading ? "hidden" : "block"
				}`}
				onLoad={handleImageLoad}
			/>
		</div>
	);
}
