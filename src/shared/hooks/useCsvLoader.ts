import { useState, useEffect, useRef } from "react";
import { useGetStatsDataQuery } from "../../graphql/generated";
import { GridId } from "../config/grids";
import {
	calculatePositionChanges,
	processCsvData,
} from "../../shared/utils/csv";

interface UseCsvLoaderProps {
	gridId: GridId;
}

const useCsvLoader = ({ gridId }: UseCsvLoaderProps) => {
	const [csvData, setCsvData] = useState<{
		teams: {
			id: string;
			name: string;
			pts: string;
			positionChange: number;
		}[];
		drivers: {
			id: string;
			name: string;
			pts: string;
			positionChange: number;
		}[];
		oldTeams: { id: string; name: string; pts: string }[];
		oldDrivers: { id: string; name: string; pts: string }[];
		fastestLaps: { name: string; qty: string }[];
		poles: { name: string; qty: string }[];
		cards: any[];
		stats: any[];
	}>({
		teams: [],
		drivers: [],
		oldTeams: [],
		oldDrivers: [],
		fastestLaps: [],
		poles: [],
		cards: [],
		stats: [],
	});

	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// Track previous gridId to detect changes
	const prevGridIdRef = useRef<string | null>(null);
	const isInitialMountRef = useRef(true);

	// Use GetStatsDataQuery with cache-and-network for best UX
	// This shows cached data immediately, then fetches fresh data
	const {
		data,
		loading: queryLoading,
		error: queryError,
		refetch,
	} = useGetStatsDataQuery({
		variables: {
			gridId: gridId as any,
		},
		skip: !gridId,
		fetchPolicy: "cache-and-network",
		notifyOnNetworkStatusChange: true,
	});

	const prevDataRef = useRef<Record<string, any>>({});

	useEffect(() => {
		const loadData = async () => {
			if (!gridId || !data?.datas) return;

			const dataKey = `${gridId}-${data.datas[0]?.id || "no-data"}`;

			const shouldProcess =
				isInitialMountRef.current ||
				prevGridIdRef.current !== gridId ||
				data !== prevDataRef.current[dataKey];

			if (shouldProcess) {
				isInitialMountRef.current = false;
				prevGridIdRef.current = gridId;
				prevDataRef.current[dataKey] = data;

				setLoading(true);
				setError(null);

				try {
					const currentDataItem = data.datas[0];
					const oldDataItem = data.datas[1];

					if (!currentDataItem) {
						throw new Error(`No data found for grid: ${gridId}`);
					}

					const currentCsvUrl = currentDataItem?.csv?.url;
					const oldCsvUrl = oldDataItem?.csv?.url;

					if (!currentCsvUrl) {
						throw new Error(
							`No current CSV URL found for ${gridId}`,
						);
					}

					const currentCacheKey = `${gridId}-current-${currentDataItem.id}`;
					const oldCacheKey = oldCsvUrl
						? `${gridId}-old-${oldDataItem?.id}`
						: null;

					const currentData = await processCsvData(
						currentCsvUrl,
						currentCacheKey,
						false,
					);

					let oldData = { teams: [], drivers: [] };
					if (oldCsvUrl && oldCacheKey) {
						oldData = (await processCsvData(
							oldCsvUrl,
							oldCacheKey,
							true,
						)) as any;
					}

					const teamsWithChanges = calculatePositionChanges(
						currentData.teams || [],
						oldData.teams || [],
					);
					const driversWithChanges = calculatePositionChanges(
						currentData.drivers || [],
						oldData.drivers || [],
					);

					setCsvData({
						teams: teamsWithChanges,
						drivers: driversWithChanges,
						oldTeams: oldData.teams || [],
						oldDrivers: oldData.drivers || [],
						fastestLaps: currentData.fastestLaps || [],
						poles: currentData.poles || [],
						cards: currentData.cards || [],
						stats: currentData.stats || [],
					});
				} catch (err: unknown) {
					setError(
						err instanceof Error
							? err.message
							: `Failed to load CSV data for ${gridId}`,
					);
				} finally {
					setLoading(false);
				}
			} else {
				setLoading(false);
			}
		};

		loadData();
	}, [data, gridId]);

	const refreshData = () => {
		if (gridId) refetch({ gridId: gridId as any });
	};

	return {
		teams: csvData.teams,
		drivers: csvData.drivers,
		oldTeams: csvData.oldTeams,
		oldDrivers: csvData.oldDrivers,
		fastestLaps: csvData.fastestLaps,
		poles: csvData.poles,
		cards: csvData.cards,
		stats: csvData.stats,
		loading: queryLoading || loading,
		error: queryError?.message || error,
		gridId,
		refresh: refreshData,
	};
};

export default useCsvLoader;
