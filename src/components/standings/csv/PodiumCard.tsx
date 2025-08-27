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
	teamDrivers?: string;
	activeTab: "gridA" | "gridB";
	newData: { name: string }[]; // Add newData prop
	oldData: { name: string }[]; // Add oldData prop
}

export function PodiumCard(props: PodiumCardProps) {
	// const nameParts = props.name.split(" ");
	// const firstName = nameParts[0];
	// const secondName = nameParts.length > 1 && nameParts.slice(1).join(" ");
	const [firstName, secondName] = (() => {
		const nameParts = props.name.split(" ");
		return [
			nameParts[0].replace(/B$/, ""),
			nameParts.length > 1
				? nameParts.slice(1).join(" ").replace(/B$/, "")
				: "",
		];
	})();

	const isDrivers = true;

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
			return <span className="text-f1-lightSilver font-bold">–</span>;
		}
	};

	return (
		<div
			onClick={handleDriverClick}
			className={`relative hidden md:flex flex-col justify-end overflow-hidden rounded-2xl transition-translate duration-200 ${
				isDrivers
					? "hover:-translate-y-1 cursor-pointer h-[280px]"
					: "h-[320px]"
			}`}
		>
			<div
				className={`ml-5 text-2xl font-f1Title hidden md:block ${
					props.position === 1
						? isDrivers
							? "mb-10"
							: "mb-15 ml-15 text-3xl"
						: "mb-6"
				}`}
				style={{ color: props.teamColor }}
			>
				{props.position}
			</div>

			<div className="bg-f1-bg-silver rounded-xl pl-2 text-sm flex self-end z-30 mr-2 mb-1 gap-2 text-white scale-90">
				<div>{renderPositionDifference()}</div>
				<div
					className={`rounded-xl px-2 ${
						props.grid === "gridA"
							? props.class === "classA"
								? "bg-f1-purple"
								: "bg-f1-lighterPurple"
							: props.grid === "gridB"
							? props.class === "classA"
								? "bg-f1-carbon"
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
			></div>

			{/* <img
				src={photo}
				alt={`${name} foto`}
				className={`absolute w-full h-auto ${
					isDrivers && `right-[-25px] ${position === 1 && "top-0"}`
				}`}
			/> */}

			<img
				src={props.photo}
				alt={`${props.name} foto`}
				className={`absolute object-cover max-w-none ${
					isDrivers
						? `bottom-0 right-0 scale-70 ${
								props.position === 1 ? "h-[330px]" : "h-[290px]"
						  } w-auto translate-x-[70px] translate-y-[15px]`
						: `bottom-0 right-0 scale-70 translate-x-[-74%] translate-y-[-27%]`
				}`}
			/>

			<div
				className={`absolute bottom-0 bg-white w-full -z-10 rounded-2xl ${
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
						: props.grid === "gridB"
						? props.class === "classA"
							? "bg-f1-carbon"
							: "bg-f1-silver"
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
						? props.teamDrivers.join(" / ")
						: props.teamDrivers || "No drivers"}
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
				</div>
			</div>
		</div>
	);
}
