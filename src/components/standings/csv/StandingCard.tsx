import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import useNavigateToDriver from "../../../shared/hooks/useNavigateToDriver";
import { normalizeString } from "../../../shared/utils/normalizeString";
import { contrastText } from "../../../shared/utils/color";
import { usePositionDifference } from "../../../shared/hooks/usePositionDifference";
import {
	GridId,
	getGridConfig,
	getGridColors,
} from "../../../shared/config/grids";
import { tenant } from "../../../shared/config/tenants";
import { useTenantConfig } from "../../../contexts/TenantConfigContext";
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
	teamDrivers?: Array<string | { name: string; photo?: string }>;
	badge: Array<{ url: string }>;
	badgeTitle: string;
	reserve?: boolean;
	valueKey: string;
	valueLabel: string;
	activeTab: GridId;
	activeGrid: "drivers" | "teams";
	isActive: boolean;
	onClick: () => void;
	newData: { name: string }[];
	oldData: { name: string }[];
	photoStyle?: "portrait" | "round" | "bust";
}

export function StandingCard(props: StandingCardProps) {
	const { defaultPhotoStyle } = useTenantConfig();
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

	const teamDriverNames = (props.teamDrivers ?? []).map((d) =>
		typeof d === "string" ? d : d.name,
	);
	const cleanedTeamDrivers = !isDrivers
		? teamDriverNames.map((driver) => driver.replace(/-[BC]$/, ""))
		: teamDriverNames;

	const teamDriverList = (props.teamDrivers ?? []).map((d) =>
		typeof d === "string"
			? { name: d, photo: undefined as string | undefined }
			: { name: d.name, photo: d.photo },
	);
	const cleanedTeamDriverList = !isDrivers
		? teamDriverList.map((d) => ({
				...d,
				name: d.name.replace(/-[BC]$/, ""),
			}))
		: teamDriverList;

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
	const gridConfig = getGridConfig(props.activeTab);
	const gridPrimaryColor = gridConfig?.primaryColor ?? "";
	const isHex = (c: string) => /^#[0-9a-f]{6}$/i.test(c);
	const effectivePrimary = isHex(gridPrimaryColor) ? gridPrimaryColor : undefined;
	const rowHoverColor = gridConfig?.rowHoverColor ?? gridPrimaryColor;
	const rowHoverText = isHex(rowHoverColor) ? contrastText(rowHoverColor) : "#ffffff";
	const accentHoverColor = gridConfig?.accentHoverColor ?? effectivePrimary;
	const accentHoverText = accentHoverColor ? contrastText(accentHoverColor) : undefined;
	const pointsHoverClass = accentHoverColor ? "" : (gridConfig?.hoverAccentColor ?? "");
	const secondaryColor = gridConfig?.secondaryColor ?? effectivePrimary;

	const renderPositionDifference = () => {
		if (positionDifference > 0) {
			return (
				<span className="tenant-position-difference font-bold text-sm flex items-center text-f1-text">
					<PlayArrowRoundedIcon
						fontSize="small"
						className="rotate-270 text-green-500 scale-90 translate-y-[1px]"
					/>
					<span className="tenant-position-number inline-block translate-y-[1.5px] md:translate-y-0">
						{positionDifference}
					</span>
				</span>
			);
		} else if (positionDifference < 0) {
			return (
				<span className="tenant-position-difference font-bold text-sm flex items-center text-f1-text">
					<PlayArrowRoundedIcon
						fontSize="small"
						className="rotate-90 text-f1-red scale-90"
					/>
					<span className="tenant-position-number inline-block translate-y-[1.5px] md:translate-y-0">
						{Math.abs(positionDifference)}
					</span>
				</span>
			);
		}
		return (
			<span className="tenant-position-difference text-f1-lighterCarbon font-bold inline-block translate-y-[1.5px] md:translate-y-0">
				–
			</span>
		);
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
			primaryName: props.name,
			secondaryName: "",
			detail: cleanedTeamDrivers.join(" / ") || "",
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
				className={`tenant-standing-card ${
					isDrivers ? "tenant-standing-card-clickable" : ""
				} flex px-2 md:p-4 items-center relative rounded-md transition-colors duration-200 ${
					props.isActive
						? "bg-f1-silver text-white h-32 md:h-15 py-4"
						: "bg-white py-2"
				} ${isDrivers ? hoverClass : ""}`}
				style={isDrivers ? {
					"--row-hover-bg": rowHoverColor,
					"--row-hover-text": rowHoverText,
				} as React.CSSProperties : undefined}
			>
				<div className="flex items-center flex-grow z-30 h-full md:h-4">
					<span
						className={`tenant-standing-position font-bold w-5 flex justify-center ${
							props.isActive ? "text-2xl" : "md:text-lg"
						}`}
					>
						{props.position}
					</span>
					<span
						className="tenant-standing-color-bar mx-2 w-1 my-[2px] self-stretch md:self-stretch md:h-4"
						style={{ backgroundColor: props.teamColor }}
					/>
					<div
						className={`flex flex-col md:flex-row items-baseline md:text-lg h-full md:h-auto justify-between ${
							props.isActive
								? "text-3xl leading-8 md:leading-7"
								: "text-lg"
						}`}
					>
						<div className="flex flex-col md:flex-row md:items-baseline items-start leading-none">
							<span
								className={`leading-tight ${props.isActive ? "text-xl md:text-2xl" : "text-xs md:text-sm"} ${
									displayInfo.secondaryName
										? "font-f1Title uppercase"
										: "font-f1Title uppercase font-bold italic"
								}`}
							>
								{displayInfo.primaryName}
							</span>
							{displayInfo.secondaryName && (
								<span className={`font-bold md:ml-1 ${props.isActive ? "text-xl md:text-2xl" : "text-xs md:text-sm"} font-f1Title uppercase italic leading-tight`}>
									{displayInfo.secondaryName}
								</span>
							)}
						</div>

						<div
							className={`md:ml-2 flex text-start text-xs font-bold uppercase tracking-wider flex-col md:flex-row leading-tight gap-1 md:gap-x-3 ${!props.isActive ? "mt-1" : ""}`}
						>
							{isDrivers && props.reserve ? (
								`Reserva`
							) : !isDrivers ? (
								props.isActive ? (
									cleanedTeamDriverList.map((d, i) => (
										<div
											key={i}
											className="flex items-center gap-1.5"
										>
											<div
												className="w-5 h-5 rounded-full overflow-hidden shrink-0"
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
													imgWidth={40}
													imgHeight={40}
													className={`w-full h-full object-cover ${
														defaultPhotoStyle ===
														"round"
															? "scale-125 translate-y-[3px]"
															: defaultPhotoStyle ===
																  "bust"
																? "translate-y-[2px]"
																: "scale-200 translate-y-3"
													}`}
												/>
											</div>
											<span>{d.name}</span>
										</div>
									))
								) : (
									<>
										<span className="md:hidden flex flex-col">
											{cleanedTeamDrivers.map((d, i) => (
												<span key={i}>{d}</span>
											))}
										</span>
										<span className="hidden md:inline">
											{cleanedTeamDrivers.join(" / ")}
										</span>
									</>
								)
							) : (
								<span className="tenant-standing-team-detail">
									{displayInfo.detail}
								</span>
							)}
						</div>
					</div>
				</div>

				<div
					className={`bg-f1-bg-silver rounded-xl text-sm flex z-30 gap-2 text-white ${
						props.isActive ? "self-end" : "self-center"
					} ${
						isDrivers &&
						"md:group-hover:bg-white transition-colors duration-200"
					}`}
				>
					<div className="pl-2">{renderPositionDifference()}</div>
					<div
						className={`tenant-standing-points-badge font-light rounded-xl px-2 min-w-[70px] ${secondaryColor ? "" : colorClass} ${
							isDrivers
								? `${secondaryColor ? "" : pointsHoverClass} transition-colors duration-200`
								: ""
						}`}
						style={{
							...(secondaryColor ? { backgroundColor: secondaryColor } : {}),
							...(isDrivers && accentHoverColor ? { "--accent-hover-bg": accentHoverColor, "--accent-hover-text": accentHoverText } as React.CSSProperties : {}),
						}}
					>
						<span className="font-bold inline-block translate-y-[1.5px] md:translate-y-0">
							{props.valueKey}
						</span>{" "}
						<span
							className="inline-block translate-y-[1.5px] md:translate-y-0 text-[9px]"
						>
							{props.valueKey === "1" ? "PT" : props.valueLabel}
						</span>
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
							) : props.photoStyle === "bust" ? (
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
										height: isDrivers ? "110%" : "90%",
										maxWidth: "100%",
										maxHeight: isDrivers ? "110%" : "90%",
										transform: isDrivers
											? "translateY(5%) translateX(-5%)"
											: "translateY(5%) translateX(-15%)",
									}}
								/>
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
											: "translateY(5%) translateX(-15%)",
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
								) : props.photoStyle === "bust" ? (
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
											height: "170%",
											maxWidth: "100%",
											maxHeight: "250%",
											transform: "translateX(-155%)",
										}}
									/>
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
