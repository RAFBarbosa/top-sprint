import React from "react";
import PodiumCard from "./PodiumCard";

interface PodiumProps {
	topThree: {
		name: string;
		photo: string;
		teamColor: string;
		teamDrivers?: string[];
		[key: string]: string;
	}[];
	activeTab: "drivers" | "teams";
}

const Podium: React.FC<PodiumProps> = ({ topThree, activeTab }) => {
	if (topThree.length < 3) return null;

	return (
		<div className="mb-5">
			{activeTab === "drivers" ? (
				<div className="md:flex md:space-x-4 ">
					<div className="hidden md:block w-[31%]">
						<PodiumCard
							name={topThree[1].name}
							photo={topThree[1].photo}
							teamColor={topThree[1].teamColor}
							position={2}
							activeTab={activeTab}
						/>
					</div>
					<div className="md:block md:w-[38%]">
						<PodiumCard
							name={topThree[0].name}
							photo={topThree[0].photo}
							teamColor={topThree[0].teamColor}
							position={1}
							activeTab={activeTab}
						/>
					</div>
					<div className="hidden md:block w-[31%]">
						<PodiumCard
							name={topThree[2].name}
							photo={topThree[2].photo}
							teamColor={topThree[2].teamColor}
							position={3}
							activeTab={activeTab}
						/>
					</div>
				</div>
			) : (
				<div className="md:flex md:justify-center">
					<div className="md:w-2/3">
						<PodiumCard
							name={topThree[0].name}
							photo={topThree[0].photo}
							teamColor={topThree[0].teamColor}
							position={1}
							teamDrivers={topThree[0].drivers || []}
							activeTab={activeTab}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Podium;
