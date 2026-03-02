import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import useNavigateToDriver from "../../../shared/hooks/useNavigateToDriver";
import { normalizeString } from "../../../shared/utils/normalizeString";
import { usePositionDifference } from "../../../shared/hooks/usePositionDifference";
import {
	GridId,
	getGridConfig,
	getGridColors,
} from "../../../shared/config/grids";
import { tenant } from "../../../shared/config/tenants";
import { HygraphImg } from "../../utils/HygraphImg";

interface StandingCardProps {
	position: number;
	name: string;
	photo: string;
	grid?: GridId;
	class?: string;
	standingTab?: string;
	teamName?: string;
	teamColor?: string;
	teamLogo?: string;
	teamDrivers?: string[];
	badge: Array<{ url: string }>;
	badgeTitle: string;
	valueKey: string;
	valueLabel: string;
	activeTab: GridId;
	activeGrid: "drivers" | "teams";
	isActive: boolean;
	onClick: () => void;
	newData: { name: string }[];
	oldData: { name: string }[];
	photoStyle?: "portrait" | "round";
}

export function StandingCard(props: StandingCardProps) {
	const [firstName, secondName] = (() => {
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

	const isDrivers = props.activeGrid === "drivers";

	const cleanedTeamDrivers = !isDrivers
		? props.teamDrivers?.map((driver) => driver.replace(/-[BC]$/, "")) || []
		: props.teamDrivers || [];

	const navigateToDriver = useNavigateToDriver();

	const positionDifference = usePositionDifference(
		props.newData,
		props.oldData,
		props.name,
	);

	const handleCardClick = () => {
		if (isDrivers) {
			navigateToDriver(normalizeString(props.name));
		}
	};

	const getColorClasses = () => {
		if (!props.activeTab)
			return {
				colorClass: "bg-gray-500",
				hoverClass: "hover:bg-gray-600 hover:text-white",
			};

		if (props.class) {
			const colors = getGridColors(props.activeTab, props.class);
			if (colors) {
				return {
					colorClass: colors.colorClass,
					hoverClass: colors.hoverClass,
				};
			}
		}

		const gridConfig = getGridConfig(props.activeTab);
		if (gridConfig) {
			return {
				colorClass: gridConfig.accentColor,
				hoverClass: gridConfig.hoverPrimaryColor,
			};
		}

		return {
			colorClass: "bg-gray-500",
			hoverClass: "hover:bg-gray-600 hover:text-white",
		};
	};

	const { colorClass, hoverClass } = getColorClasses();

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
		}
		return <span className="text-f1-lighterCarbon font-bold">–</span>;
	};

	const getDisplayInfo = () => {
		if (isDrivers) {
			return {
				primaryName: firstName,
				secondaryName: secondName,
				detail: props.teamName,
			};
		}

		return {
			primaryName: firstName,
			secondaryName: secondName,
			detail: cleanedTeamDrivers.join(" / ") || "No drivers",
		};
	};

	const displayInfo = getDisplayInfo();

	return (
		<button
			onClick={handleCardClick}
			aria-label={isDrivers ? `Ver perfil de ${props.name}` : props.name}
			className={`tracking-wide overflow-hidden w-full group ${
				isDrivers ? "md:cursor-pointer" : ""
			}`}
		>
			<div
				className={`flex px-2 md:p-4 items-center relative rounded-md md:bg-white md:text-f1-text transition-colors duration-200 ${
					props.isActive
						? "bg-f1-silver text-white h-32 md:h-15 py-4"
						: "bg-white py-2"
				} ${isDrivers ? hoverClass : ""}`}
			>
				<div className="flex items-center flex-grow z-30 h-full md:h-4">
					<span
						className={`font-bold w-5 flex justify-center ${
							props.isActive ? "text-2xl" : "md:text-lg"
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
								isDrivers && props.isActive
									? "flex flex-col md:flex-row items-start"
									: "-translate-y-[3px] md:translate-y-0"
							}`}
						>
							<span
								className={`leading-7 ${
									isDrivers
										? displayInfo.secondaryName
											? "font-regular"
											: "font-bold uppercase"
										: "font-bold"
								}`}
							>
								{displayInfo.primaryName}
							</span>
							{displayInfo.secondaryName && (
								<span
									className={`font-bold md:ml-1
										${isDrivers ? "uppercase" : "ml-1"}
										${!props.isActive && "ml-1"}`}
								>
									{displayInfo.secondaryName}
								</span>
							)}
						</div>

						<span
							className={`md:ml-2 text-sm font-light flex text-start ${
								props.isActive &&
								"bg-f1-silver rounded-lg pr-1 md:bg-transparent"
							}`}
						>
							{displayInfo.detail}
						</span>
					</div>
				</div>

				<div
					className={`bg-f1-bg-silver rounded-xl text-sm flex z-30 gap-2 text-white ${
						props.isActive ? "self-end" : "self-center"
					} ${
						isDrivers &&
						"group-hover:bg-white transition-colors duration-200"
					}`}
				>
					<div className="pl-2">{renderPositionDifference()}</div>
					<div
						className={`font-light rounded-xl px-2 min-w-[70px] ${colorClass} ${
							isDrivers &&
							"group-hover:bg-f1-bg-silver group-hover:text-f1-text transition-colors duration-200"
						}`}
					>
						<span className="font-bold">{props.valueKey}</span>{" "}
						{props.valueKey === "1" ? "PT" : props.valueLabel}
					</div>
				</div>

				{props.isActive ? (
					<div
						className={`absolute top-0 right-0 bottom-0 flex justify-end z-10 md:hidden ${isDrivers ? "items-end" : "items-center"}`}
					>
						<div className="relative w-full h-full">
							{props.photoStyle === "round" && isDrivers ? (
								<div className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-white/20 absolute right-4 top-1/2 transform -translate-y-1/2">
									<HygraphImg
										src={
											props.photo ||
											tenant.fallbackDriverPhoto
										}
										alt={props.name}
										imgWidth={120}
										imgHeight={120}
										className="w-full h-full object-cover"
									/>
								</div>
							) : (
								<HygraphImg
									src={
										isDrivers
											? props.photo ||
												tenant.fallbackDriverPhoto
											: props.teamLogo || tenant.logo.url
									}
									alt={
										isDrivers
											? props.name
											: `${props.name} logo`
									}
									imgWidth={200}
									fit={isDrivers ? "crop" : "clip"}
									style={{
										objectFit: isDrivers
											? "cover"
											: "contain",
										width: isDrivers ? "auto" : "auto",
										height: isDrivers ? "160%" : "90%",
										maxWidth: "100%",
										maxHeight: isDrivers ? "160%" : "90%",
										transform: isDrivers
											? "translateX(5%)"
											: "translateY(5%) translateX(-10%)",
									}}
								/>
							)}
						</div>
					</div>
				) : (
					isDrivers && (
						<div className="absolute top-0 right-0 bottom-0 flex justify-end items-end z-10">
							<div className="relative w-full h-full hidden md:block">
								{props.photoStyle === "round" ? (
									<div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-f1-carbon/20 absolute right-36 top-1/2 -translate-y-1/2">
										<HygraphImg
											src={
												props.photo ||
												tenant.fallbackDriverPhoto
											}
											alt={props.name}
											imgWidth={50}
											imgHeight={50}
											className="w-full h-full object-cover"
										/>
									</div>
								) : (
									<HygraphImg
										src={
											props.photo ||
											tenant.fallbackDriverPhoto
										}
										alt={props.name}
										imgWidth={200}
										style={{
											objectFit: "cover",
											width: "auto",
											height: "280%",
											maxWidth: "100%",
											maxHeight: "350%",
											transform:
												"translateY(-3%) translateX(-62%)",
										}}
									/>
								)}
							</div>
						</div>
					)
				)}
			</div>
		</button>
	);
}
