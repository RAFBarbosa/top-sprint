import { Skeleton } from "@mui/material";
import { useGetTeamsQuery } from "../../graphql/generated";
import DataLoader from "./csv/DataLoader";
import { TabSwitch } from "./csv/TabSwitch";
import { useState } from "react";

const loadingSkeleton = () => {
	return (
		<div className="px-3 w-full md:max-w-screen-xl mx-auto">
			<div className="my-4">
				<div className="flex flex-col md:flex-row gap-y-2 md:gap-x-4">
					<Skeleton
						animation="wave"
						variant="rounded"
						height={410}
						sx={{ width: "100%" }}
					/>
					<Skeleton
						animation="wave"
						variant="rounded"
						height={410}
						sx={{ width: "100%" }}
					/>
				</div>
			</div>
		</div>
	);
};

export function Standings() {
	const { data, error, loading } = useGetTeamsQuery();
	const [activeTab, setActiveTab] = useState<"drivers" | "teams">("drivers");

	if (loading) return loadingSkeleton();
	if (error)
		return (
			<div className="text-red-500 text-center py-6">
				{error?.message || "An error occurred"}
			</div>
		);

	return (
		<aside className="pb-10 flex flex-col relative bg-f1-lightSilver items-center">
			<div className="m-2.5">
				<TabSwitch activeTab={activeTab} setActiveTab={setActiveTab} />
			</div>

			<div className="bg-radial-[at_50%_100%] from-f1-silver to-f1-carbon to-70% md:h-[300px] h-[280px] w-full absolute left-0 top-12">
				<div className="h-22 bg-divider bg-cover opacity-5 absolute left-0 bottom-0 w-full"></div>
			</div>

			<div className="px-3 w-full md:max-w-screen-xl mx-auto z-10">
				<DataLoader data={data} activeTab={activeTab} />
			</div>
		</aside>
	);
}
