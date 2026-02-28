type DividerProps = {
	className?: string;
};

export function Divider({ className = "" }: DividerProps) {
	return (
		<div className={`relative my-4 h-16 w-full ${className}`}>
			<div className="h-full w-full bg-divider bg-cover opacity-5" />
		</div>
	);
}
