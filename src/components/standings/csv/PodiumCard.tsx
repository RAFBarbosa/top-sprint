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
	teamDrivers?: Array<string | { name: string; photo?: string }>;
	activeTab: "drivers" | "teams";
	newData: { name: string }[];
	photoStyle?: "portrait" | "round" | "bust";
	oldData: { name: string }[];
}

export function PodiumCard(props: PodiumCardProps) {
	const cleanName = (name: string) => name.replace(/-[BC]$/, "").trim();
	const nameParts = props.name.split(" ");
	const firstName = cleanName(nameParts[0]);
	const lastName =
		nameParts.length > 1 ? cleanName(nameParts.slice(1).join(" ")) : "";

	const isDrivers = props.activeTab === "drivers";
	const isTopSprint = tenant.id === "topSprint";

	const teamDriverList = (props.teamDrivers ?? []).map((d) =>
		typeof d === "string"
			? { name: d, photo: undefined as string | undefined }
			: d,
	);
	const cleanedTeamDrivers = isDrivers
		? teamDriverList
		: teamDriverList.map((d) => ({ ...d, name: cleanName(d.name) }));

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
	const gridConfig = props.grid ? getGridConfig(props.grid) : undefined;
	const podiumNameBgClass = gridConfig?.podiumNameBgClass || colorClass;
	const podiumPointsBgClass = gridConfig?.podiumPointsBgClass || colorClass;

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
					? "hover:-translate-y-1 cursor-pointer h-[300px] transition-translate duration-200"
					: "h-[284px] mt-4"
			}`}
		>
			{isTopSprint && (
				<div
					className={`absolute bottom-0 w-full overflow-hidden rounded-2xl pointer-events-none ${
						props.position === 1
							? isDrivers
								? "h-[calc(67%+15px)]"
								: "h-full"
							: "h-[67%]"
					}`}
				>
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: `linear-gradient(135deg, ${props.teamColor} 0%, ${props.teamColor} 45%, transparent 45%)`,
						}}
					/>
				</div>
			)}
			<div
				className={`z-10 ${isTopSprint ? "font-f1Title text-5xl" : "text-6xl font-f1Podium"} font-thin hidden md:block ${
					isTopSprint
						? isDrivers
							? `absolute ${props.position === 1 ? "left-5 top-23.5" : "left-4 top-26.5"}`
							: `mb-8 ml-15 text-6xl`
						: `relative ${
								props.position === 1
									? isDrivers
										? "mb-3 ml-7"
										: "mb-6 ml-15 text-3xl"
									: "-mb-1 ml-4"
							}`
				}`}
				style={
					isTopSprint
						? undefined
						: {
								color:
									props.position <= 3
										? props.position === 1
											? "#FFD700"
											: props.position === 2
												? "#C0C0C0"
												: "#CD7F32"
										: props.teamColor,
							}
				}
			>
				{props.position}
			</div>
			{isTopSprint && isDrivers && props.teamLogo && (
				<div
					className={`absolute z-10 hidden md:block ${
						props.position === 1
							? "left-3.5 top-35"
							: "left-5 top-37"
					}`}
				>
					<HygraphImg
						src={props.teamLogo}
						alt={`${props.teamName} logo`}
						imgWidth={56}
						imgHeight={56}
						className="w-7 h-7 object-contain"
					/>
				</div>
			)}

			<div className="bg-f1-bg-silver rounded-xl pl-2 text-sm flex self-end z-30 mr-4 mb-2 gap-2 text-white">
				<div>{renderPositionDifference()}</div>
				<div
					className={`rounded-xl px-2 pointer-events-none ${podiumPointsBgClass}`}
				>
					<span className="font-bold">{props.points}</span>{" "}
					<span className="text-[9px]">
						{props.points === "1" ? "PT" : "PTS"}
					</span>
				</div>
			</div>

			{isTopSprint ? (
				<div
					className={`absolute bottom-0 w-full overflow-hidden rounded-2xl hidden md:block pointer-events-none ${
						props.position === 1
							? isDrivers
								? "h-[calc(67%+15px)]"
								: "h-full"
							: "h-[67%]"
					}`}
				>
					<div
						className="absolute left-0 right-0 bottom-[90px] h-30 opacity-50"
						style={{
							backgroundImage: `linear-gradient(to top, ${props.teamColor}, transparent)`,
						}}
					/>
				</div>
			) : (
				<div
					className="w-full h-2 hidden md:block"
					style={{ backgroundColor: props.teamColor }}
				/>
			)}

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
			) : props.photoStyle === "bust" && isDrivers ? (
				<div
					className={`absolute overflow-hidden bottom-0 right-0 ${
						props.position === 1
							? "h-[180px] -translate-y-22"
							: "h-[160px] -translate-y-22"
					}`}
				>
					<HygraphImg
						src={props.photo || tenant.fallbackDriverPhoto}
						alt={`${props.name}`}
						imgWidth={props.position === 1 ? 200 : 180}
						// imgHeight={props.position === 1 ? 200 : 175}
						className="w-full h-full object-cover object-top"
					/>
				</div>
			) : isDrivers ? (
				<div
					className={`absolute overflow-hidden bottom-0 -right-5 ${
						props.position === 1
							? "w-[230px] h-[300px]"
							: "w-[210px] h-[268px]"
					}`}
				>
					<HygraphImg
						src={props.photo || tenant.fallbackDriverPhoto}
						alt={`${props.name}`}
						imgWidth={props.position === 1 ? 230 : 210}
						imgHeight={props.position === 1 ? 300 : 268}
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
				className={`absolute bottom-0 w-full -z-10 rounded-2xl ${
					isTopSprint ? "bg-black" : "bg-white"
				} ${
					props.position === 1
						? isDrivers
							? "h-[calc(67%+15px)]"
							: "h-full"
						: "h-[67%]"
				}`}
			/>

			<div
				className={`text-white p-4 h-[90px] relative flex flex-col leading-4 tracking-wider pointer-events-none overflow-hidden ${podiumNameBgClass}`}
			>
				{isTopSprint && (
					<div
						className="absolute inset-0 pointer-events-none"
						style={{
							backgroundImage:
								"linear-gradient(to top, transparent 60%, rgba(255, 255, 255, 0.2) 100%)",
						}}
					/>
				)}
				{isDrivers ? (
					<>
						<span
							className={
								isTopSprint
									? "font-f1Title uppercase"
									: lastName
										? "font-semibold"
										: "font-bold uppercase text-2xl"
							}
						>
							{firstName}
						</span>
						{lastName && (
							<span
								className={`uppercase leading-5.5 truncate font-bold ${
									isTopSprint ? "font-f1Title italic" : ""
								} ${
									isTopSprint
										? lastName.length > 9
											? "text-lg"
											: "text-xl"
										: lastName.length > 9
											? "text-xl"
											: "text-2xl"
								}`}
							>
								{lastName}
							</span>
						)}
						{isTopSprint && (
							<div className="mt-auto h-0.5 w-full bg-white/50 mb-1" />
						)}
						<span
							className={`leading-3 ${
								isTopSprint
									? "text-[10px] uppercase tracking-wider font-bold"
									: "text-sm mt-auto font-light"
							}`}
						>
							{props.teamName}
						</span>
					</>
				) : (
					<>
						{isTopSprint ? (
							<div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
								{cleanedTeamDrivers.length === 0 ? (
									<span className="font-f1Title uppercase text-sm text-center">
										Sem Pilotos
									</span>
								) : (
									cleanedTeamDrivers.map((d, i) => {
										const parts = d.name.split(" ");
										const first = parts[0];
										const last =
											parts.length > 1
												? parts.slice(1).join(" ")
												: "";
										return (
											<div
												key={i}
												className="flex items-center gap-1.5"
											>
												<div
													className="w-7 h-7 rounded-full overflow-hidden shrink-0"
													style={{
														backgroundColor:
															props.teamColor,
													}}
												>
													<HygraphImg
														src={
															d.photo ||
															tenant.fallbackDriverPhoto
														}
														alt={d.name}
														imgWidth={56}
														imgHeight={56}
														className={`w-full h-full object-cover ${
															tenant.defaultPhotoStyle ===
															"round"
																? "scale-125 translate-y-[3px]"
																: tenant.defaultPhotoStyle ===
																	  "bust"
																	? "translate-y-[2px]"
																	: "scale-200 translate-y-3"
														}`}
													/>
												</div>
												<span className="font-f1Title uppercase text-xs leading-tight">
													{last ? (
														<>
															<span>
																{first}{" "}
															</span>
															<span className="font-bold italic">
																{last}
															</span>
														</>
													) : (
														<span className="font-bold italic">
															{first}
														</span>
													)}
												</span>
											</div>
										);
									})
								)}
							</div>
						) : (
							<span className="font-bold uppercase text-2xl text-center">
								{cleanedTeamDrivers
									.map((d) => d.name)
									.join(" / ") || "Sem Pilotos"}
							</span>
						)}
						{isTopSprint && (
							<div className="my-auto h-0.5 w-full bg-white/50" />
						)}
						<span
							className={`leading-3 text-center ${
								isTopSprint
									? "text-sm uppercase tracking-wider font-bold"
									: "font-light text-base mt-auto"
							}`}
						>
							{props.name}
						</span>
					</>
				)}
			</div>
		</div>
	);
}
