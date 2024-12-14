interface StandingCardProps {
	position: number;
	name: string;
	photo: string;
	teamName?: string;
	teamColor?: string;
	teamDrivers?: string;
	valueKey: string;
	valueLabel: string;
	activeTab: "drivers" | "teams";
	isActive: boolean;
	onClick: () => void;
}

export function StandingCard(props: StandingCardProps) {
	const nameParts = props.name.split(" ");
	const firstName = nameParts[0];
	const secondName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

	const isDrivers = props.activeTab === "drivers";

	return (
		<button
			onClick={props.onClick}
			className="tracking-wide overflow-hidden w-full pointer-events-none transition-all duration-300"
		>
			{/* <div className="tracking-wide overflow-hidden"> */}
			<div
				className={`flex justify-around p-4 items-center relative ${
					props.isActive
						? "bg-f1-silver text-white rounded-md md:bg-white md:text-f1-text h-32 md:h-auto"
						: "bg-white rounded-md"
				} `}
			>
				<div className="flex items-center flex-grow z-30 h-full ">
					<span
						className={`font-bold md:text-lg ${
							props.isActive && "text-xl"
						}`}
					>
						{props.position}
					</span>
					<span
						className="mx-2 w-1 self-stretch"
						style={{ backgroundColor: props.teamColor }}
					></span>
					<div
						className={`flex flex-col md:flex-row items-baseline md:text-lg h-full justify-between ${
							props.isActive ? "text-3xl leading-8" : "text-lg"
						}`}
					>
						<div
							className={`${
								isDrivers &&
								props.isActive &&
								"flex flex-col md:flex-row items-start"
							}`}
						>
							<span
								className={`${
									isDrivers
										? secondName
											? "font-regular"
											: "font-bold uppercase"
										: "font-bold"
								}`}
							>
								{firstName}
							</span>
							{secondName && (
								<span
									className={`
										font-bold md:ml-1 
										${isDrivers ? "uppercase" : "ml-1"} 
										${!props.isActive && "ml-1"}`}
								>
									{secondName}
								</span>
							)}
						</div>

						<span
							className={`md:ml-2 text-sm font-light ${
								props.isActive &&
								"bg-f1-silver rounded-lg pr-1 md:bg-transparent"
							}`}
						>
							{isDrivers
								? props.teamName
								: Array.isArray(props.teamDrivers)
								? props.teamDrivers.join(" / ")
								: props.teamDrivers || "No drivers"}
						</span>
					</div>
				</div>

				<div
					className={`bg-f1-bg-silver rounded-xl px-2 text-f1-text z-30 ${
						props.isActive && "self-end"
					}
					}`}
				>
					<span className="font-bold">{props.valueKey}</span>{" "}
					{props.valueKey === "1" ? "PT" : props.valueLabel}
				</div>

				{props.isActive && (
					<div className="absolute top-0 right-0 bottom-0 flex justify-end items-end z-10 md:hidden">
						<div className="relative w-full h-full">
							<img
								src={props.photo}
								alt={`${props.name} foto`}
								style={{
									objectFit: "cover",
									width: isDrivers ? "auto" : "100%",
									height: isDrivers ? "130%" : "140%",
									maxWidth: "100%",
									maxHeight: "150%",
									transform: isDrivers
										? "translateY(7%)"
										: "translateY(-6%) translateX(15%)",
								}}
							/>

							{!isDrivers && (
								<div
									className="lg:hidden absolute bg-f1-silver rounded-tl-lg"
									style={{
										width: "60%",
										height: "30%",
										top: 0,
										left: 40,
									}}
								></div>
							)}
						</div>
					</div>
				)}
			</div>
			{/* </div> */}
		</button>
	);
}
