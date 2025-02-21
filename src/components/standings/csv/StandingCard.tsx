import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import useNavigateToDriver from "../../hooks/useNavigateToDriver";
import useNormalizeString from "../../hooks/useNormalizeString";
import { usePositionDifference } from "../../hooks/usePositionDifference"; // Import the hook

interface StandingCardProps {
	position: number;
	name: string;
	photo: string;
	grid?: string;
	teamName?: string;
	teamColor?: string;
	teamDrivers?: string;
	valueKey: string;
	valueLabel: string;
	activeTab: "drivers" | "teams";
	isActive: boolean;
	onClick: () => void;
	newData: { name: string }[]; // Add newData prop
	oldData: { name: string }[]; // Add oldData prop
}

export function StandingCard(props: StandingCardProps) {
	const nameParts = props.name.split(" ");
	const firstName = nameParts[0];
	const secondName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
	const isDrivers = props.activeTab === "drivers";

	const navigateToDriver = useNavigateToDriver();

	// Calculate the position difference using the hook
	const positionDifference = usePositionDifference(
		props.newData,
		props.oldData,
		props.name
	);

	const handleCardClick = () => {
		if (isDrivers) {
			navigateToDriver(useNormalizeString(props.name));
		}
	};

	// Arrow logic
	const renderPositionDifference = () => {
		if (positionDifference > 0) {
			return (
				<span className="font-bold text-sm text-f1-text">
					<PlayArrowRoundedIcon
						fontSize="small"
						className="rotate-270 text-green-500"
					/>
					{positionDifference}
				</span>
			);
		} else if (positionDifference < 0) {
			return (
				<span className="font-bold text-sm flex items-center text-f1-text">
					<PlayArrowRoundedIcon
						fontSize="small"
						className="rotate-90 text-f1-red"
					/>
					{Math.abs(positionDifference)}
				</span>
			);
		} else {
			return <span className="text-gray-500 font-bold">–</span>;
		}
	};

	return (
		<button
			onClick={handleCardClick}
			className="tracking-wide overflow-hidden w-full group"
		>
			<div
				className={`flex p-4 items-center relative rounded-md md:bg-white md:text-f1-text transition-colors duration-200 ${
					props.isActive
						? "bg-f1-silver text-white h-32 md:h-15"
						: "bg-white"
				} ${
					isDrivers
						? props.grid === "gridA"
							? "hover:bg-f1-carbon hover:text-white cursor-pointer"
							: "hover:bg-f1-red hover:text-white cursor-pointer"
						: ""
				}`}
			>
				<div className="flex items-center flex-grow z-30 h-full md:h-4">
					<span
						className={`font-bold md:text-lg ${
							props.isActive && "text-xl"
						}`}
					>
						{props.position}
					</span>
					<span
						className={`mx-2 w-1 self-center md:self-stretch  ${
							props.isActive ? "h-23 md:h-4" : "h-10 md:h-4"
						}`}
						style={{ backgroundColor: props.teamColor }}
					/>
					<div
						className={`flex flex-col md:flex-row items-baseline md:text-lg h-full md:h-auto justify-between ${
							props.isActive
								? "text-3xl leading-8 md:leading-7"
								: "text-lg"
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
								className={`leading-7 ${
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
					className={`bg-f1-bg-silver rounded-xl text-sm flex z-30 gap-2 text-white  ${
						props.isActive ? "self-end" : "self-center"
					} ${
						isDrivers &&
						"group-hover:bg-white transition-colors duration-200"
					}`}
				>
					<div className="pl-2">{renderPositionDifference()}</div>
					<div
						className={`font-light rounded-xl px-2 ${
							props.grid === "gridA"
								? "bg-f1-carbon"
								: props.grid === "gridB"
								? "bg-f1-red"
								: "bg-f1-silver"
						} ${
							isDrivers &&
							"group-hover:bg-f1-bg-silver group-hover:text-f1-text transition-colors duration-200"
						} `}
					>
						<span className="font-bold">{props.valueKey}</span>{" "}
						{props.valueKey === "1" ? "PT" : props.valueLabel}
					</div>
				</div>

				{props.isActive ? (
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
				) : (
					isDrivers && (
						<div className="absolute top-0 right-0 bottom-0 flex justify-end items-end z-10">
							<div className="relative w-full h-full hidden md:block">
								<img
									src={props.photo}
									alt={`${props.name} foto`}
									style={{
										objectFit: "cover",
										width: isDrivers ? "auto" : "100%",
										height: isDrivers ? "280%" : "140%",
										maxWidth: "100%",
										maxHeight: "350%",
										transform:
											"translateX(-60%) translateY(-3%)",
									}}
								/>
							</div>
						</div>
					)
				)}
			</div>
		</button>
	);
}
