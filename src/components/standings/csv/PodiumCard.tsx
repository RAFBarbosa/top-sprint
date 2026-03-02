import { normalizeString } from "../../../shared/utils/normalizeString";
import useNavigateToDriver from "../../../shared/hooks/useNavigateToDriver";
import { usePositionDifference } from "../../../shared/hooks/usePositionDifference";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import {
	getGridConfig,
	getGridColors,
	GridId,
} from "../../../shared/config/grids";
import { tenant } from "../../../shared/config/tenants";
import { HygraphImg } from "../../utils/HygraphImg";

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
	photoStyle?: "portrait" | "round";
	oldData: { name: string }[];
}

export function PodiumCard(props: PodiumCardProps) {
	const cleanName = (name: string) => name.replace(/-[BC]$/, "").trim();
	const nameParts = props.name.split(" ");
	const firstName = cleanName(nameParts[0]);
	const lastName =
		nameParts.length > 1 ? cleanName(nameParts.slice(1).join(" ")) : "";

	const isDrivers = props.activeTab === "drivers";

	const cleanedTeamDrivers = isDrivers
		? props.teamDrivers || []
		: props.teamDrivers?.map((d) => cleanName(d)) || [];

	const navigateToDriver = useNavigateToDriver();

	const handleDriverClick = () => {
		isDrivers && navigateToDriver(normalizeString(props.name));
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
			role={isDrivers ? "button" : undefined}
			tabIndex={isDrivers ? 0 : undefined}
			onKeyDown={
				isDrivers
					? (e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								handleDriverClick();
							}
						}
					: undefined
			}
			aria-label={isDrivers ? `Ver perfil de ${props.name}` : undefined}
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

			{/* <img
				src={props.photo || tenant.fallbackDriverPhoto}
				alt={`${props.name} foto`}
				className={`absolute object-cover max-w-none ${
					props.photoStyle === "round"
						? isDrivers
							? `bottom-0 scale-50 border-10 rounded-full border-f1-text ${
									props.position === 1
										? "h-[320px] -translate-y-[22px] right-0"
										: "h-[270px] -translate-y-[35px] right-1"
								} w-auto translate-x-[65px]`
							: `h-[180px] w-auto transform translate-x-[136%] translate-y-[-54%]`
						: isDrivers
							? `bottom-0 right-0 scale-70 ${
									props.position === 1
										? "h-[330px]"
										: "h-[290px]"
								} w-auto translate-x-[70px] translate-y-[15px]`
							: `bottom-0 left-1/2 -translate-x-1/2 scale-60 translate-y-[-20%]`
				}`}
			/> */}

			{props.photoStyle === "round" && isDrivers ? (
				<div
					className={`absolute overflow-hidden rounded-full border-4 border-f1-carbon/20 ${
						props.position === 1
							? "w-[160px] h-[160px] bottom-[104px] right-3"
							: "w-[134px] h-[134px] bottom-[104px] right-2"
					}`}
				>
					<HygraphImg
						src={props.photo || tenant.fallbackDriverPhoto}
						alt={`${props.name}`}
						imgWidth={props.position === 1 ? 160 : 134}
						imgHeight={props.position === 1 ? 160 : 134}
						className="w-full h-full object-cover"
					/>
				</div>
			) : isDrivers ? (
				<div
					className={`absolute overflow-hidden bottom-0 right-0 ${
						props.position === 1
							? "w-[200px] h-[260px]"
							: "w-[180px] h-[230px]"
					}`}
				>
					<HygraphImg
						src={props.photo || tenant.fallbackDriverPhoto}
						alt={`${props.name}`}
						imgWidth={props.position === 1 ? 200 : 180}
						imgHeight={props.position === 1 ? 260 : 230}
						className="w-full h-full object-cover object-top"
					/>
				</div>
			) : (
				<div className="absolute top-0 left-0 right-0 bottom-[90px] flex items-center justify-center">
					<HygraphImg
						src={props.teamLogo || props.photo || tenant.logo.url}
						alt={`${props.name} logo`}
						imgWidth={150}
						imgHeight={150}
						fit="clip"
						className="w-[150px] h-[150px] object-contain"
					/>
				</div>
			)}

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
				{isDrivers ? (
					<>
						<span
							className={
								lastName
									? "font-semibold"
									: "font-bold uppercase text-2xl"
							}
						>
							{firstName}
						</span>
						{lastName && (
							<span
								className={`font-bold uppercase leading-6 truncate ${lastName.length > 9 ? "text-xl" : "text-2xl"}`}
							>
								{lastName}
							</span>
						)}
						<span className="font-light text-sm leading-3 mt-auto">
							{props.teamName}
						</span>
					</>
				) : (
					<>
						<span className="font-bold uppercase text-2xl text-center">
							{cleanedTeamDrivers.join(" / ") || "Sem Pilotos"}
						</span>
						<span className="font-light text-base leading-3 mt-auto text-center">
							{props.name}
						</span>
					</>
				)}
			</div>
		</div>
	);
}
