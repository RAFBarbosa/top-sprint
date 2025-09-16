import useNormalizeString from "../../hooks/useNormalizeString";
import useNavigateToDriver from "../../hooks/useNavigateToDriver";
import { usePositionDifference } from "../../hooks/usePositionDifference";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

interface PodiumCardProps {
	position: number;
	name: string;
	photo: string;
	grid?: string;
	class?: string;
	points?: string;
	teamName?: string;
	teamColor?: string;
	teamLogo?: string;
	teamDrivers?: string[];
	activeTab: "drivers" | "teams";
	newData: { name: string }[]; // Add newData prop
	oldData: { name: string }[]; // Add oldData prop
}

export function PodiumCard(props: PodiumCardProps) {
	const [firstName, secondName] = (() => {
		const nameParts = props.name.split(" ");
		return [
			nameParts[0].replace(/B$/, ""),
			nameParts.length > 1
				? nameParts.slice(1).join(" ").replace(/B$/, "")
				: "",
		];
	})();

	const isDrivers = props.activeTab === "drivers";

	let cleanedTeamDrivers = props.teamDrivers || [];

	if (!isDrivers) {
		cleanedTeamDrivers =
			props.teamDrivers?.map((driver) => driver.replace(/B$/, "")) || [];
	}

	const navigateToDriver = useNavigateToDriver();

	const handleDriverClick = () => {
		isDrivers && navigateToDriver(useNormalizeString(props.name));
	};

	// Calculate the position difference using the hook
	const positionDifference = usePositionDifference(
		props.newData,
		props.oldData,
		props.name
	);

	// Arrow logic
	const renderPositionDifference = () => {
		if (positionDifference > 0) {
			return (
				<span className="font-bold text-sm flex items-center text-f1-text">
					<PlayArrowRoundedIcon
						fontSize="small"
						className="rotate-270 text-green-500 scale-90 translate-y-[1px]"
					/>
					{positionDifference}
				</span>
			);
		} else if (positionDifference < 0) {
			return (
				<span className="font-bold text-sm flex items-center text-f1-text">
					<PlayArrowRoundedIcon
						fontSize="small"
						className="rotate-90 text-f1-red scale-90"
					/>
					{Math.abs(positionDifference)}
				</span>
			);
		} else {
			return <span className="text-f1-lighterCarbon font-bold">–</span>;
		}
	};

	return (
		<div
			onClick={handleDriverClick}
			className={`relative hidden md:flex flex-col justify-end overflow-hidden rounded-2xl ${
				isDrivers
					? "hover:-translate-y-1 cursor-pointer h-[280px] transition-translate duration-200"
					: "h-[264px] mt-4"
			}`}
		>
			<div
				className={`text-6xl font-f1Podium font-thin hidden md:block ${
					props.position === 1
						? isDrivers
							? "mb-3 ml-7"
							: "mb-6 ml-15 text-3xl"
						: "-mb-1 ml-4"
				}`}
				style={{
					color:
						props.position <= 3
							? props.position === 1
								? "#FFD700"
								: props.position === 2
								? "#C0C0C0"
								: "#CD7F32"
							: props.teamColor,
				}}
			>
				{props.position}
			</div>

			<div className="bg-f1-bg-silver rounded-xl pl-2 text-sm flex self-end z-30 mr-4 mb-2 gap-2 text-white">
				<div>{renderPositionDifference()}</div>
				<div
					className={`rounded-xl px-2 ${
						props.grid === "gridA"
							? props.class === "classA"
								? "bg-f1-purple"
								: "bg-f1-lighterPurple"
							: props.grid === "gridB"
							? props.class === "classA"
								? "bg-f1-lightCarbon"
								: "bg-f1-silver"
							: "bg-f1-silver"
					} `}
				>
					<span className="font-bold">{props.points}</span>{" "}
					{props.points === "1" ? "PT" : "PTS"}
				</div>
			</div>

			<div
				className="w-full h-2 hidden md:block"
				style={{ backgroundColor: props.teamColor }}
			/>

			<img
				src={props.photo}
				alt={`${props.name} foto`}
				className={`absolute object-cover max-w-none ${
					isDrivers
						? `bottom-0 right-0 scale-70 ${
								props.position === 1 ? "h-[330px]" : "h-[290px]"
						  } w-auto translate-x-[70px] translate-y-[15px]`
						: `bottom-0 right-0 scale-60 translate-x-[-70%] translate-y-[-20%]`
				}`}
			/>

			<div
				// style={{
				// 	background: `linear-gradient(to bottom, ${props.teamColor} 0%, ${props.teamColor} 35%, #000 100%)`,
				// }}
				className={`absolute bottom-0 w-full -z-10 rounded-2xl bg-white ${
					props.position === 1
						? isDrivers
							? "h-[calc(67%+15px)]"
							: "h-full"
						: "h-[67%]"
				}`}
			/>

			<div
				className={`text-white p-4 h-[90px] relative flex flex-col leading-4 tracking-wider ${
					props.grid === "gridA"
						? props.class === "classA"
							? "bg-f1-purple"
							: "bg-f1-lighterPurple"
						: props.class === "classA"
						? "bg-f1-lightCarbon"
						: "bg-f1-silver"
				}`}
			>
				<span
					className={`${
						isDrivers
							? secondName
								? "font-semibold"
								: "font-bold uppercase text-2xl"
							: "font-bold uppercase text-2xl text-center"
					}`}
				>
					{isDrivers
						? firstName
						: Array.isArray(props.teamDrivers)
						? cleanedTeamDrivers.join(" / ")
						: cleanedTeamDrivers || "No drivers"}
				</span>

				{secondName && isDrivers && (
					<span
						className={`font-bold uppercase leading-6 truncate ${
							secondName.length > 9 ? "text-xl" : "text-2xl"
						}`}
					>
						{secondName}
					</span>
				)}
				<div
					className={`font-light leading-3 mt-auto ${
						isDrivers
							? "text-left text-sm"
							: "text-center text-base"
					}`}
				>
					{isDrivers ? props.teamName : props.name}
					{/* <img
						src={props.teamLogo}
						alt="Team Logo"
						className="ml-2 inline-block md:h-4 md:w-4 h-[14px] w-[14px] translate-y-[2px] group-hover:color-overlay-white"
					/> */}
				</div>
			</div>
		</div>
	);
}
