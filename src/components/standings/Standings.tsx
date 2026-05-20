import { Skeleton } from "@mui/material";
import DataLoader from "./csv/DataLoader";
import { useTab } from "../../contexts/TabContext";
import { getGridConfig } from "../../shared/config/grids";
import { useActiveSeason } from "../../shared/hooks/useActiveSeason";
import { useFirebaseStandings } from "../../shared/hooks/useFirebaseStandings";

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
	const { activeTab } = useTab();

	const gridConfig = getGridConfig(activeTab.id);
	const activeSeason = useActiveSeason(activeTab.id);
	const {
		standings,
		previousStandings,
		loading: standingsLoading,
	} = useFirebaseStandings(activeTab.id);

	if (standingsLoading) return loadingSkeleton();
	if (!activeSeason || standings.length === 0) return null;

	return (
		<aside className="tenant-section tenant-section-standings pb-10 flex flex-col relative bg-f1-lightSilver overflow-hidden">
			<div
				className={`md:h-[356px] h-[280px] w-full absolute left-0 ${
					gridConfig?.standingsBgClass ?? ""
				}`}
				style={
					!gridConfig?.standingsBgClass
						? {
								backgroundColor:
									gridConfig?.primaryColor ?? "#000000",
							}
						: undefined
				}
			>
				<div
					className="absolute inset-0 rounded-lg z-0 pointer-events-none"
					style={{
						backgroundColor: "rgba(0, 0, 0, 0.05)",
						backgroundImage:
							"radial-gradient(circle at .1px .1px, rgba(0, 0, 0, .5) 1px, transparent 0)",
						backgroundSize: "3px 3px",
					}}
				/>
				<div className="h-22 bg-divider bg-cover opacity-5 absolute left-0 bottom-0 w-full" />
			</div>

			<div className="px-3 w-full md:max-w-screen-xl mx-auto z-10">
				<div
					className="transition-opacity duration-300 md:min-h-full min-h-full opacity-100"
				>
					<DataLoader
						activeTab={activeTab.id}
						standings={standings}
						previousStandings={previousStandings}
					/>
				</div>
				{false && (
					<div
						className="absolute inset-0 flex items-center justify-center"
						role="status"
						aria-label="Carregando classificação..."
					>
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-f1-red"></div>
					</div>
				)}
			</div>
		</aside>
	);
}
