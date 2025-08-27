import { PodiumCard } from "./PodiumCard";

interface PodiumProps {
	grid?: string;
	class?: string;
	topThree: {
		name: string;
		photo: string;
		teamColor: string;
		teamDrivers: string;
		points: string;
		teamName: string;
		[key: string]: string;
	}[];
	activeTab: "gridA" | "gridB";
	newData: { name: string }[]; // Add newData prop
	oldData: { name: string }[]; // Add oldData prop
}

export function Podium(props: PodiumProps) {
	if (props.topThree.length < 3) return null;

	return (
		<div className="mb-1">
			{props.activeTab === "gridA" || "gridB" ? (
				<div className="md:flex md:gap-x-2 ">
					<div className="hidden md:block w-[31%]">
						<PodiumCard
							name={props.topThree[1].name}
							photo={props.topThree[1].photo}
							teamColor={props.topThree[1].teamColor}
							teamName={props.topThree[1].teamName}
							points={props.topThree[1].pts}
							position={2}
							grid={props.grid}
							class={props.class}
							activeTab={props.activeTab}
							newData={props.newData}
							oldData={props.oldData || []}
						/>
					</div>
					<div className="md:block md:w-[38%]">
						<PodiumCard
							name={props.topThree[0].name}
							photo={props.topThree[0].photo}
							teamColor={props.topThree[0].teamColor}
							teamName={props.topThree[0].teamName}
							points={props.topThree[0].pts}
							position={1}
							grid={props.grid}
							class={props.class}
							activeTab={props.activeTab}
							newData={props.newData}
							oldData={props.oldData || []}
						/>
					</div>
					<div className="hidden md:block w-[31%]">
						<PodiumCard
							name={props.topThree[2].name}
							photo={props.topThree[2].photo}
							teamColor={props.topThree[2].teamColor}
							teamName={props.topThree[2].teamName}
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
					<div className="md:w-2/3">
						<PodiumCard
							name={props.topThree[0].name}
							photo={props.topThree[0].photo}
							teamColor={props.topThree[0].teamColor}
							points={props.topThree[0].pts}
							position={1}
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
