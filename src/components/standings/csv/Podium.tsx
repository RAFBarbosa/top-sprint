import { PodiumCard } from "./PodiumCard";
import { GridId } from "../../../shared/config/grids"; // Import GridId for type safety

interface PodiumProps {
	grid?: GridId;
	class?: string;
	topThree: {
		name: string;
		photo: string;
		teamColor: string;
		teamDrivers: string;
		teamLogo: string;
		points: string;
		teamName: string;
		[key: string]: string;
	}[];
	photoStyle?: "portrait" | "round";
	activeTab: "drivers" | "teams";
	newData: { name: string }[];
	oldData?: { name: string }[];
}

export function Podium(props: PodiumProps) {
	if (props.topThree.length < 3) return null;

	return (
		<div className="mb-1">
			{props.activeTab === "drivers" ? (
				<div className="md:flex md:gap-x-2">
					{/* Position 2 - Show on ALL screens */}
					<div className="w-full md:w-[31%] mb-2 md:mb-0">
						<PodiumCard
							name={props.topThree[1].name}
							photo={props.topThree[1].photo}
							teamColor={props.topThree[1].teamColor}
							teamName={props.topThree[1].teamName}
							points={props.topThree[1].pts}
							position={2}
							photoStyle={props.photoStyle}
							grid={props.grid}
							class={props.class}
							activeTab={props.activeTab}
							newData={props.newData}
							oldData={props.oldData || []}
						/>
					</div>
					{/* Position 1 */}
					<div className="w-full md:w-[38%] mb-2 md:mb-0 md:mx-auto">
						<PodiumCard
							name={props.topThree[0].name}
							photo={props.topThree[0].photo}
							teamColor={props.topThree[0].teamColor}
							teamName={props.topThree[0].teamName}
							teamLogo={props.topThree[0].teamLogo}
							photoStyle={props.photoStyle}
							points={props.topThree[0].pts}
							position={1}
							grid={props.grid}
							class={props.class}
							activeTab={props.activeTab}
							newData={props.newData}
							oldData={props.oldData || []}
						/>
					</div>
					{/* Position 3 - Show on ALL screens */}
					<div className="w-full md:w-[31%]">
						<PodiumCard
							name={props.topThree[2].name}
							photo={props.topThree[2].photo}
							teamColor={props.topThree[2].teamColor}
							teamName={props.topThree[2].teamName}
							photoStyle={props.photoStyle}
							points={props.topThree[2].pts}
							position={3}
							grid={props.grid}
							class={props.class}
							activeTab={props.activeTab}
							newData={props.newData}
							oldData={props.oldData || []}
						/>
					</div>
				</div>
			) : (
				<div className="md:flex md:justify-center">
					<div className="w-full">
						<PodiumCard
							name={props.topThree[0].name}
							photo={props.topThree[0].photo}
							teamColor={props.topThree[0].teamColor}
							photoStyle={props.photoStyle}
							points={props.topThree[0].pts}
							position={1}
							class={props.class}
							grid={props.grid}
							teamDrivers={props.topThree[0].drivers || ""}
							activeTab={props.activeTab}
							newData={props.newData}
							oldData={props.oldData || []}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
