import useNormalizeString from "../../hooks/useNormalizeString";
import useNavigateToDriver from "../../hooks/useNavigateToDriver";
import { usePositionDifference } from "../../hooks/usePositionDifference";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { getGridConfig, getGridColors, GridId } from "../../config/grids";

interface PodiumCardProps {
	position: number;
	name: string;
	photo: string;
	grid?: GridId;
	class?: string;
	points?: string;
	teamName?: string;
	teamColor?: string;
	teamLogo?: string;
	teamDrivers?: string[];
	activeTab: "drivers" | "teams";
	newData: { name: string }[];
	oldData: { name: string }[];
}

export function PodiumCard(props: PodiumCardProps) {
	const [firstName, lastName] = (() => {
		const nameParts = props.name.split(" ");
		return [
			nameParts[0].replace(/-[BC]$/, ""),
			nameParts.length > 1
				? nameParts
						.slice(1)
						.join(" ")
						.replace(/-[BC]$/, "")
				: "",
		];
	})();

	const isDrivers = props.activeTab === "drivers";

	let cleanedTeamDrivers = props.teamDrivers || [];

	if (!isDrivers) {
		cleanedTeamDrivers =
			props.teamDrivers?.map((driver) => driver.replace(/-[BC]$/, "")) ||
			[];
	}

	const navigateToDriver = useNavigateToDriver();

	const handleDriverClick = () => {
		isDrivers && navigateToDriver(useNormalizeString(props.name));
	};

	const positionDifference = usePositionDifference(
		props.newData,
		props.oldData,
		props.name,
	);

	const getColorClass = () => {
		if (!props.grid) return "bg-gray-500";

		if (props.class) {
			const colors = getGridColors(props.grid, props.class);
			if (colors?.colorClass) {
				return colors.colorClass;
			}
		}

		const gridConfig = getGridConfig(props.grid);
		return gridConfig?.accentColor || "bg-gray-500";
	};

	const colorClass = getColorClass();

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
					className={`rounded-xl px-2 pointer-events-none ${colorClass}`}
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
						: `bottom-0 left-1/2 -translate-x-1/2 scale-60 translate-y-[-20%]`
				}`}
			/>

			<div
				className={`absolute bottom-0 w-full -z-10 rounded-2xl bg-white ${
					props.position === 1
						? isDrivers
							? "h-[calc(67%+15px)]"
							: "h-full"
						: "h-[67%]"
				}`}
			/>

			<div
				className={`text-white p-4 h-[90px] relative flex flex-col leading-4 tracking-wider pointer-events-none ${colorClass}`}
			>
				<span
					className={`${
						isDrivers
							? lastName
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

				{lastName && isDrivers && (
					<span
						className={`font-bold uppercase leading-6 truncate ${
							lastName.length > 9 ? "text-xl" : "text-2xl"
						}`}
					>
						{lastName}
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
