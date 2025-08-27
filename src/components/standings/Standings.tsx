import { Skeleton } from "@mui/material";
import { useGetTeamsQuery } from "../../graphql/generated";
import DataLoader from "./csv/DataLoader";
import { TabSwitch } from "./csv/TabSwitch";
import { useState } from "react";
import { useTab } from "../../contexts/TabContext";

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
	const [isTabLoading, setIsTabLoading] = useState(false);
	const [previousData, setPreviousData] = useState(data);

	const { activeTab, setActiveTab } = useTab();
	const legacyTab = activeTab.id === "gridA" ? "gridA" : "gridB";

	if (loading && !previousData) return loadingSkeleton();
	if (error)
		return (
			<div className="text-red-500 text-center py-6">
				{error?.message || "An error occurred"}
			</div>
		);

	// const [activeTab, setActiveTab] =
	// 	useState<(typeof tabs)[number]["id"]>("drivers");

	// if (loading) return loadingSkeleton();
	// if (error)
	// 	return (
	// 		<div className="text-red-500 text-center py-6">
	// 			{error?.message || "An error occurred"}
	// 		</div>
	// 	);

	return (
		<aside className="pb-10 flex flex-col relative bg-f1-lightSilver">
			<TabSwitch />

			<div
				className={` md:h-[350px] h-[380px] w-full absolute left-0 top-12 ${
					activeTab.id === "gridA"
						? "bg-radial-[at_50%_100%] from-f1-silver to-f1-purple to-100%"
						: activeTab.id === "gridB"
						? "bg-radial-[at_50%_100%] from-f1-silver to-f1-text to-70%"
						: "bg-radial-[at_50%_100%] from-f1-silver to-f1-text to-70%"
				}`}
			>
				<div className="h-22 bg-divider bg-cover opacity-5 absolute left-0 bottom-0 w-full" />
			</div>

			<div className="px-3 w-full md:max-w-screen-xl mx-auto z-10">
				<div
					className={`transition-opacity duration-300 md:min-h-212 min-h-200 ${
						isTabLoading ? "opacity-50" : "opacity-100"
					}`}
				>
					<DataLoader
						data={isTabLoading ? previousData : data}
						activeTab={legacyTab}
					/>
				</div>
				{isTabLoading && (
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-f1-red"></div>
					</div>
				)}
			</div>
		</aside>
	);
}
