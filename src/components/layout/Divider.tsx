import { useState, useEffect } from "react";
import { useGetPartnersQuery } from "../../graphql/generated";

type DividerProps = {
	className?: string;
	rotationInterval?: number; // in milliseconds
};

export function Divider({
	className = "",
	rotationInterval = 10000, // 5 seconds by default
}: DividerProps) {
	const { data, error, loading } = useGetPartnersQuery();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isVisible, setIsVisible] = useState(true);

	// Fallback default partner
	const defaultPartners = [
		{
			id: "default",
			name: "BMZ",
			altText: "Divider",
			image: {
				url: "https://us-west-2.graphassets.com/AEeXs9JBOTq6bJXaWi87dz/cmde5tyc1s6ma07ljmdjt4mu1",
			},
			linkUrl: "https://www.instagram.com/bmzchange/",
		},
	];

	const partners = data?.partners?.length ? data.partners : defaultPartners;

	useEffect(() => {
		if (partners.length <= 1) return; // No rotation needed if only one partner

		const rotate = () => {
			// Start fade out
			setIsVisible(false);

			// After fade out completes, change image and fade back in
			setTimeout(() => {
				setCurrentIndex((prev) => (prev + 1) % partners.length);
				setIsVisible(true);
			}, 500); // Half of the transition duration
		};

		const interval = setInterval(rotate, rotationInterval);
		return () => clearInterval(interval);
	}, [partners.length, rotationInterval]);

	const currentPartner = partners[currentIndex];

	return (
		<div className={`relative my-4 h-18 w-full ${className}`}>
			<div className="h-full w-full bg-divider bg-cover opacity-5" />
			<a
				href={currentPartner.linkUrl || currentPartner.link}
				target="_blank"
				rel="noopener noreferrer"
				className="pointer"
			>
				<img
					src={currentPartner.image?.url}
					alt={currentPartner.altText || currentPartner.altText}
					className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:h-20 h-16 transition-opacity duration-500 ${
						isVisible ? "opacity-100" : "opacity-0"
					}`}
				/>
			</a>
		</div>
	);
}
