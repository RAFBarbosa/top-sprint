import { PodiumCard } from "./PodiumCard";

interface PodiumProps {
	topThree: {
		name: string;
		photo: string;
		teamColor: string;
		teamDrivers: string;
		[key: string]: string;
	}[];
	activeTab: "drivers" | "teams";
}

export function Podium(props: PodiumProps) {
	if (props.topThree.length < 3) return null;

	return (
		<div className="mb-5">
			{props.activeTab === "drivers" ? (
				<div className="md:flex md:space-x-4 ">
					<div className="hidden md:block w-[31%]">
						<PodiumCard
							name={props.topThree[1].name}
							photo={props.topThree[1].photo}
							teamColor={props.topThree[1].teamColor}
							position={2}
							activeTab={props.activeTab}
						/>
					</div>
					<div className="md:block md:w-[38%]">
						<PodiumCard
							name={props.topThree[0].name}
							photo={props.topThree[0].photo}
							teamColor={props.topThree[0].teamColor}
							position={1}
							activeTab={props.activeTab}
						/>
					</div>
					<div className="hidden md:block w-[31%]">
						<PodiumCard
							name={props.topThree[2].name}
							photo={props.topThree[2].photo}
							teamColor={props.topThree[2].teamColor}
							position={3}
							activeTab={props.activeTab}
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
							position={1}
							teamDrivers={props.topThree[0].drivers || ""}
							activeTab={props.activeTab}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
