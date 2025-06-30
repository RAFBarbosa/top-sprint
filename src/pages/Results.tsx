import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { TabSwitch } from "../components/standings/csv/TabSwitch";
import {
	useGetDriversQuery,
	useGetRoundResultsQuery,
} from "../graphql/generated";
import { SessionResultsTable } from "../components/results/SessionResult";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Skeleton } from "@mui/material";

interface Driver {
	id: string;
	name: string;
	grid: "gridA" | "gridB" | "Res";
	team: { name: string; color: { hex: string } };
	photo: { url: string };
	fastestLap?: boolean;
}

interface SessionResult {
	driverName: string;
	driverGrid: "gridA" | "gridB" | "Res" | null;
	isReserve: boolean;
	position: number;
	fastestLapInMs: number;
	totalTimeInMs: number;
	penaltySecsInGame: number;
	status: string;
}

interface Results {
	sessions: { type: string; name: string }[];
	results: { [sessionType: string]: SessionResult[] };
}

interface EnrichedSessionResult extends SessionResult {
	driverId: string;
	team: { name: string; color: { hex: string } };
	photo: { url: string };
}

interface EnrichedResults {
	sessions: Results["sessions"];
	results: { [sessionType: string]: EnrichedSessionResult[] };
}

const useEnrichedResults = (
	drivers: Driver[] = [],
	roundResults?: Results
): EnrichedResults => {
	return useMemo(() => {
		if (!roundResults) return { sessions: [], results: {} };

		const driverMap = new Map(
			drivers.map((driver) => [driver.name, driver])
		);

		return {
			sessions: roundResults.sessions,
			results: Object.fromEntries(
				Object.entries(roundResults.results).map(
					([sessionType, sessionResults]) => [
						sessionType,
						sessionResults.map((result) => ({
							...result,
							driverId: driverMap.get(result.driverName)?.id,
							team: driverMap.get(result.driverName)?.team,
							photo: driverMap.get(result.driverName)?.photo,
						})),
					]
				)
			),
		};
	}, [drivers, roundResults]);
};

export function Results() {
	const { id } = useParams();
	const { data: driversData } = useGetDriversQuery();
	const { data: resultsData, loading: isLoadingResults } =
		useGetRoundResultsQuery({ variables: { id: id! } });
	const [showGridOrder, setShowGridOrder] = useState(false);

	const tabs = useMemo(
		() =>
			resultsData?.round?.results?.sessions.map((session) => ({
				id: session.type,
				label: session.name,
			})) || [],
		[resultsData]
	);

	const [activeTab, setActiveTab] = useState(() => tabs[0]?.id || "");

	useMemo(() => {
		if (tabs.length) setActiveTab(tabs[0].id);
	}, [tabs]);

	const enrichedResults = useEnrichedResults(
		driversData?.drivers,
		resultsData?.round?.results
	);
	const formattedDate = format(
		new Date(resultsData?.round?.date || 0),
		"dd/MM/yyyy",
		{
			locale: ptBR,
		}
	);
	const capitalizedDate = formattedDate
		.split(" ")
		.map((word, index) =>
			index === 2 ? word.charAt(0).toUpperCase() + word.slice(1) : word
		)
		.join(" ");

	return (
		<aside className="flex flex-col flex-1 relative bg-f1-bg-silver items-center py-18">
			<div className="h-22 bg-divider bg-cover opacity-5 w-full my-4 md:max-w-screen-xl" />
			<div className="w-full flex flex-col flex-1">
				{isLoadingResults ? (
					<Skeleton
						height="h-full"
						width="w-full"
						className="flex-1"
					/>
				) : (
					<div className="bg-white w-full mx-auto z-10 flex flex-col md:flex-1 md:max-w-screen-xl md:px-10 pb-10 pt-4">
						{tabs.length > 0 && (
							<div className="w-full overflow-x-auto scrollbar-hide px-4 scroll-smooth">
								<div className="flex justify-center min-w-max">
									<TabSwitch
										tabs={tabs}
										activeTab={activeTab}
										setActiveTab={setActiveTab}
									/>
								</div>
							</div>
						)}
						<div className="flex flex-col items-start mt-10">
							<div className="flex gap-6 items-center justify-center md:justify-between w-full">
								<h2 className="uppercase text-lg md:text-5xl font-semibold">
									<span>Liga Brazuka</span>
									<br />
									{resultsData?.round?.track?.location}{" "}
									{resultsData?.round?.season?.name} <br />
									<span>Resultado </span>
									{activeTab === "race"
										? "Corrida"
										: activeTab === "quali"
										? "Classificação"
										: "Sprint"}
								</h2>
								<img
									className="scale-100 h-12 border-1 border-black/50"
									src={
										resultsData?.round?.track?.flag.url ||
										""
									}
								/>
							</div>
						</div>
						<div className="flex justify-between items-center my-5">
							<div className="flex gap-2">
								<h2 className="font-bold">{capitalizedDate}</h2>
								<p className="text-f1-silver">
									{resultsData?.round?.track?.circuit}
									{", "}
									{resultsData?.round?.track?.name}{" "}
								</p>
							</div>
							<div>
								<button
									onClick={() =>
										setShowGridOrder(!showGridOrder)
									}
									className="bg-f1-purple text-white px-4 py-2 rounded uppercase text-sm font-semibold hover:bg-f1-purple-dark transition-colors"
								>
									{showGridOrder
										? "Ordem Geral"
										: "Ordem por Grid"}
								</button>
							</div>
						</div>
						{activeTab && enrichedResults.results[activeTab] ? (
							<SessionResultsTable
								sessionType={activeTab}
								results={
									enrichedResults.results[activeTab] || []
								}
								showGridOrder={showGridOrder}
							/>
						) : (
							<div className="flex flex-col py-10 px-5 text-center justify-center">
								<h2 className="text-white">
									Os resultados desta etapa ainda não foram
									registrados. Por favor, aguarde!
								</h2>
							</div>
						)}
					</div>
				)}
			</div>
		</aside>
	);
}
