import Flag from "react-world-flags";

interface CountryFlagProps {
	code?: string;
	className?: string;
}

export function CountryFlag({ code, className }: CountryFlagProps) {
	if (!code) return null;
	return (
		<div className={`overflow-hidden ${className ?? ""}`}>
			<Flag
				code={code}
				style={{ width: "100%", height: "100%", objectFit: "cover" }}
			/>
		</div>
	);
}
