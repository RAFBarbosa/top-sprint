import React from "react";

export type SkeletonVariant = "box" | "text" | "circle" | "square";

export interface SkeletonProps {
	width?: string;
	height?: string;
	className?: string;
	variant?: SkeletonVariant;
}

const Skeleton: React.FC<SkeletonProps> = ({
	width = "w-full",
	height = "h-4",
	className = "",
	variant = "square",
}) => {
	const variantClasses = {
		box: "rounded-md",
		text: "rounded",
		circle: "rounded-full",
		square: "rounded-none",
	};

	return (
		<div
			className={`animate-pulse bg-gray-400 ${width} ${height} ${variantClasses[variant]} ${className}`}
		/>
	);
};

export default Skeleton;
