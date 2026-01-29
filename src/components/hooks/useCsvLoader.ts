import { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import { useGetStatsDataQuery } from "../../graphql/generated";
import { GridId } from "../config/grids";

// Helper function to normalize header names for comparison
const normalizeHeader = (header: string): string => {
	return header
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/\s+/g, " ")
		.trim();
};

// Function to find the correct header index
const findHeaderIndex = (
	actualHeaders: string[],
	targetHeaders: string[],
): number => {
	const normalizedActualHeaders = actualHeaders.map(normalizeHeader);

	for (const target of targetHeaders) {
		const normalizedTarget = normalizeHeader(target);
		const index = normalizedActualHeaders.indexOf(normalizedTarget);
		if (index !== -1) {
			return index;
		}
	}
	return -1;
};

// Function to calculate position changes between old and new data
const calculatePositionChanges = <T extends { name: string; pts: string }>(
	currentData: T[],
	oldData: T[],
): (T & { positionChange: number })[] => {
	return currentData.map((currentItem) => {
		const oldItem = oldData.find(
			(old) =>
				normalizeHeader(old.name) === normalizeHeader(currentItem.name),
		);

		if (!oldItem) {
			return { ...currentItem, positionChange: 0 };
		}

		const currentSorted = [...currentData].sort(
			(a, b) => parseFloat(b.pts) - parseFloat(a.pts),
		);
		const oldSorted = [...oldData].sort(
			(a, b) => parseFloat(b.pts) - parseFloat(a.pts),
		);

		const currentPosition = currentSorted.findIndex(
			(item) =>
				normalizeHeader(item.name) ===
				normalizeHeader(currentItem.name),
		);
		const oldPosition = oldSorted.findIndex(
			(item) =>
				normalizeHeader(item.name) === normalizeHeader(oldItem.name),
		);

		const positionChange = oldPosition - currentPosition;

		return { ...currentItem, positionChange };
	});
};

// Cache for CSV processing results (in-memory cache, not Apollo cache)
const csvProcessCache = new Map<
	string,
	{
		data: any;
		timestamp: number;
	}
>();

// Cache duration: 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;

// Process CSV data function with caching
const processCsvData = async (
	csvUrl: string,
	cacheKey: string,
	isOldCsv: boolean = false,
) => {
	// Clean old cache entries
	const now = Date.now();
	for (const [key, cached] of csvProcessCache.entries()) {
		if (now - cached.timestamp > CACHE_DURATION) {
			csvProcessCache.delete(key);
		}
	}

	// Check cache first
	const cached = csvProcessCache.get(cacheKey);
	if (cached && now - cached.timestamp < CACHE_DURATION) {
		return cached.data;
	}

	try {
		const response = await fetch(csvUrl);
		const csvText = await response.text();

		const result = await new Promise<{
			teams?: { name: string; pts: string }[];
			drivers?: { name: string; pts: string }[];
			fastestLaps?: { name: string; qty: string }[];
			poles?: { name: string; qty: string }[];
			cards?: any[];
			stats?: any[];
		}>((resolve) => {
			Papa.parse<string[]>(csvText, {
				header: true,
				skipEmptyLines: true,
				complete: (results) => {
					const rows = results.data as Record<string, string>[];
					const headers = results.meta.fields || [];

					if (!headers || headers.length === 0) {
						resolve({});
						return;
					}

					// Find indices for each data type
					const teamNameIdx = findHeaderIndex(headers, [
						"Pontos Equipes",
					]);
					const driverNameIdx = findHeaderIndex(headers, [
						"Pontos Pilotos",
					]);

					// Cards data
					const cardNameIdx = findHeaderIndex(headers, [
						"Carta Nome",
					]);
					const cardPrevRatingIdx = findHeaderIndex(headers, [
						"Anterior",
					]);
					const cardRatingIdx = findHeaderIndex(headers, ["Atual"]);
					const racecraftIdx = findHeaderIndex(headers, [
						"Racecraft",
					]);
					const awarenessIdx = findHeaderIndex(headers, [
						"Awareness",
					]);
					const paceIdx = findHeaderIndex(headers, ["Pace"]);
					const experienceIdx = findHeaderIndex(headers, [
						"Experience",
						" Experience",
					]);
					const bestCardIdx = findHeaderIndex(headers, [
						"Melhor Carta",
					]);

					// Stats data
					const participationsIdx = findHeaderIndex(headers, [
						"Presencas",
					]);
					const pointsIdx = findHeaderIndex(headers, ["Pontos"]);
					const avgIdx = findHeaderIndex(headers, ["Media"]);
					const polesIdx = findHeaderIndex(headers, ["Poles"]);
					const fastestLapIdx = findHeaderIndex(headers, ["VR"]);
					const raceWinsIdx = findHeaderIndex(headers, [
						"Vitorias GP",
					]);
					const sprintWinsIdx = findHeaderIndex(headers, [
						"Vitorias Sprint",
					]);
					const champWinsIdx = findHeaderIndex(headers, [
						"Vitoria Campeonato",
					]);
					const podiumsIdx = findHeaderIndex(headers, ["Podios"]);

					// Find points columns
					let teamPtsIdx = -1;
					const possibleTeamPtsColumns = [1, 2, 5];
					for (const colIdx of possibleTeamPtsColumns) {
						if (colIdx < headers.length) {
							let hasNumericData = false;
							for (let i = 0; i < Math.min(3, rows.length); i++) {
								const value = rows[i]?.[headers[colIdx]];
								if (
									value &&
									value.trim() !== "" &&
									!isNaN(parseFloat(value))
								) {
									hasNumericData = true;
									break;
								}
							}
							if (hasNumericData) {
								teamPtsIdx = colIdx;
								break;
							}
						}
					}

					let driverPtsIdx = -1;
					const possibleDriverPtsColumns = [4, 5];
					for (const colIdx of possibleDriverPtsColumns) {
						if (colIdx < headers.length) {
							let hasNumericData = false;
							for (let i = 0; i < Math.min(3, rows.length); i++) {
								const value = rows[i]?.[headers[colIdx]];
								if (
									value &&
									value.trim() !== "" &&
									!isNaN(parseFloat(value))
								) {
									hasNumericData = true;
									break;
								}
							}
							if (hasNumericData) {
								driverPtsIdx = colIdx;
								break;
							}
						}
					}

					if (teamPtsIdx === -1) teamPtsIdx = 2;
					if (driverPtsIdx === -1) driverPtsIdx = 4;

					const result: any = {};

					if (isOldCsv) {
						const teamsData: { name: string; pts: string }[] = [];
						const driversData: { name: string; pts: string }[] = [];

						rows.forEach((row) => {
							if (teamNameIdx !== -1 && teamPtsIdx !== -1) {
								const teamName = row[headers[teamNameIdx]];
								const teamPts = row[headers[teamPtsIdx]];

								if (
									teamName &&
									teamName.trim() !== "" &&
									teamName !== "N/A" &&
									teamPts &&
									teamPts.trim() !== "" &&
									teamPts !== "N/A"
								) {
									teamsData.push({
										name: teamName.trim(),
										pts: teamPts.trim(),
									});
								}
							}

							if (driverNameIdx !== -1 && driverPtsIdx !== -1) {
								const driverName = row[headers[driverNameIdx]];
								const driverPts = row[headers[driverPtsIdx]];

								if (
									driverName &&
									driverName.trim() !== "" &&
									driverName !== "N/A" &&
									driverPts &&
									driverPts.trim() !== "" &&
									driverPts !== "N/A"
								) {
									driversData.push({
										name: driverName.trim(),
										pts: driverPts.trim(),
									});
								}
							}
						});

						result.teams = teamsData;
						result.drivers = driversData;
					} else {
						const teamsData: { name: string; pts: string }[] = [];
						const driversData: { name: string; pts: string }[] = [];
						const fastestLapData: { name: string; qty: string }[] =
							[];
						const poleData: { name: string; qty: string }[] = [];
						const cardData: any[] = [];
						const statsData: any[] = [];

						rows.forEach((row) => {
							if (teamNameIdx !== -1 && teamPtsIdx !== -1) {
								const teamName = row[headers[teamNameIdx]];
								const teamPts = row[headers[teamPtsIdx]];

								if (
									teamName &&
									teamName.trim() !== "" &&
									teamName !== "N/A" &&
									teamPts &&
									teamPts.trim() !== "" &&
									teamPts !== "N/A"
								) {
									teamsData.push({
										name: teamName.trim(),
										pts: teamPts.trim(),
									});
								}
							}

							if (driverNameIdx !== -1 && driverPtsIdx !== -1) {
								const driverName = row[headers[driverNameIdx]];
								const driverPts = row[headers[driverPtsIdx]];

								if (
									driverName &&
									driverName.trim() !== "" &&
									driverName !== "N/A" &&
									driverPts &&
									driverPts.trim() !== "" &&
									driverPts !== "N/A"
								) {
									driversData.push({
										name: driverName.trim(),
										pts: driverPts.trim(),
									});
								}
							}

							if (fastestLapIdx !== -1 && driverNameIdx !== -1) {
								const fastestLapValue =
									row[headers[fastestLapIdx]];
								const driverName = row[headers[driverNameIdx]];

								if (
									fastestLapValue &&
									fastestLapValue.trim() !== "" &&
									fastestLapValue !== "N/A" &&
									driverName &&
									driverName.trim() !== "" &&
									driverName !== "N/A"
								) {
									fastestLapData.push({
										name: driverName.trim(),
										qty: fastestLapValue.trim(),
									});
								}
							}

							if (polesIdx !== -1 && driverNameIdx !== -1) {
								const poleValue = row[headers[polesIdx]];
								const driverName = row[headers[driverNameIdx]];

								if (
									poleValue &&
									poleValue.trim() !== "" &&
									poleValue !== "N/A" &&
									driverName &&
									driverName.trim() !== "" &&
									driverName !== "N/A"
								) {
									poleData.push({
										name: driverName.trim(),
										qty: poleValue.trim(),
									});
								}
							}

							if (
								cardNameIdx !== -1 &&
								racecraftIdx !== -1 &&
								awarenessIdx !== -1 &&
								paceIdx !== -1 &&
								experienceIdx !== -1 &&
								bestCardIdx !== -1 &&
								cardPrevRatingIdx !== -1 &&
								cardRatingIdx !== -1
							) {
								const cardName = row[headers[cardNameIdx]];
								if (
									cardName &&
									cardName.trim() !== "" &&
									cardName !== "N/A"
								) {
									cardData.push({
										name: cardName.trim(),
										num: "",
										racecraft: (
											row[headers[racecraftIdx]] || ""
										).trim(),
										awareness: (
											row[headers[awarenessIdx]] || ""
										).trim(),
										pace: (
											row[headers[paceIdx]] || ""
										).trim(),
										experience: (
											row[headers[experienceIdx]] || ""
										).trim(),
										bestRating: (
											row[headers[bestCardIdx]] || ""
										).trim(),
										prevRating: (
											row[headers[cardPrevRatingIdx]] ||
											""
										).trim(),
										rating: (
											row[headers[cardRatingIdx]] || ""
										).trim(),
									});
								}
							}

							if (
								driverNameIdx !== -1 &&
								participationsIdx !== -1 &&
								pointsIdx !== -1 &&
								avgIdx !== -1
							) {
								const driverName = row[headers[driverNameIdx]];
								if (
									driverName &&
									driverName.trim() !== "" &&
									driverName !== "N/A"
								) {
									statsData.push({
										name: driverName.trim(),
										championships:
											champWinsIdx !== -1
												? (
														row[
															headers[
																champWinsIdx
															]
														] || "0"
													).trim()
												: "0",
										totalPart:
											participationsIdx !== -1
												? (
														row[
															headers[
																participationsIdx
															]
														] || "0"
													).trim()
												: "0",
										totalPoints:
											pointsIdx !== -1
												? (
														row[
															headers[pointsIdx]
														] || "0"
													).trim()
												: "0",
										pointsPerDay:
											avgIdx !== -1
												? (
														row[headers[avgIdx]] ||
														"0"
													).trim()
												: "0",
										raceFinishedPercentage: "",
										poles:
											polesIdx !== -1
												? (
														row[
															headers[polesIdx]
														] || "0"
													).trim()
												: "0",
										fastestLaps:
											fastestLapIdx !== -1
												? (
														row[
															headers[
																fastestLapIdx
															]
														] || "0"
													).trim()
												: "0",
										totalWins:
											raceWinsIdx !== -1
												? (
														row[
															headers[raceWinsIdx]
														] || "0"
													).trim()
												: "0",
										totalSprintWins:
											sprintWinsIdx !== -1
												? (
														row[
															headers[
																sprintWinsIdx
															]
														] || "0"
													).trim()
												: "0",
										totalPodiums:
											podiumsIdx !== -1
												? (
														row[
															headers[podiumsIdx]
														] || "0"
													).trim()
												: "0",
										totalPointsNoBonus: "",
										totalPointsPerDayNoBonus: "",
										powerRanking: "",
									});
								}
							}
						});

						result.teams = teamsData;
						result.drivers = driversData;
						result.fastestLaps = fastestLapData;
						result.poles = poleData;
						result.cards = cardData;
						result.stats = statsData;
					}

					// Cache the processed result
					csvProcessCache.set(cacheKey, {
						data: result,
						timestamp: Date.now(),
					});

					resolve(result);
				},
				error: (parseError: unknown) => {
					console.error("Error parsing CSV:", parseError);
					resolve({});
				},
			});
		});

		return result;
	} catch (fetchError: unknown) {
		console.error("Error fetching CSV:", fetchError);
		return {};
	}
};

interface UseCsvLoaderProps {
	gridId: GridId;
}

const useCsvLoader = ({ gridId }: UseCsvLoaderProps) => {
	const [csvData, setCsvData] = useState<{
		teams: { name: string; pts: string; positionChange: number }[];
		drivers: { name: string; pts: string; positionChange: number }[];
		oldTeams: { name: string; pts: string }[];
		oldDrivers: { name: string; pts: string }[];
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
			gridId: gridId,
		},
		skip: !gridId,
		fetchPolicy: "cache-and-network", // BEST PRACTICE: Show cached, fetch fresh
		// This ensures the query is re-run when gridId changes
		notifyOnNetworkStatusChange: true, // This makes loading update during refetch
	});

	const prevDataRef = useRef<Record<string, any>>({});

	useEffect(() => {
		const loadData = async () => {
			// Skip if no gridId or no data
			if (!gridId || !data?.datas) {
				return;
			}

			// Create a unique key for this grid's data
			const dataKey = `${gridId}-${data.datas[0]?.id || "no-data"}`;

			// Check if we need to process new data
			// We process if: 1) It's the initial mount, 2) Grid changed, or 3) Data changed
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
					// Get current (most recent) and old (previous) CSV for this grid
					const currentDataItem = data.datas[0];
					const oldDataItem = data.datas[1]; // Second most recent

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

					// Create cache keys for CSV processing
					const currentCacheKey = `${gridId}-current-${currentDataItem.id}`;
					const oldCacheKey = oldCsvUrl
						? `${gridId}-old-${oldDataItem?.id}`
						: null;

					// Load current CSV data (with caching)
					const currentData = await processCsvData(
						currentCsvUrl,
						currentCacheKey,
						false,
					);

					// Load old CSV data if available (with caching)
					let oldData = { teams: [], drivers: [] };
					if (oldCsvUrl && oldCacheKey) {
						oldData = (await processCsvData(
							oldCsvUrl,
							oldCacheKey,
							true,
						)) as any;
					}

					// Calculate position changes for teams and drivers
					const teamsWithChanges = calculatePositionChanges(
						currentData.teams || [],
						oldData.teams || [],
					);

					const driversWithChanges = calculatePositionChanges(
						currentData.drivers || [],
						oldData.drivers || [],
					);

					// Update state with all data for this grid
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
				// Data already loaded and processed for this grid
				setLoading(false);
			}
		};

		loadData();
	}, [data, gridId]);

	// Manual refresh function
	const refreshData = () => {
		if (gridId) {
			refetch({ gridId });
		}
	};

	return {
		// Data for the selected grid
		teams: csvData.teams,
		drivers: csvData.drivers,
		oldTeams: csvData.oldTeams,
		oldDrivers: csvData.oldDrivers,
		fastestLaps: csvData.fastestLaps,
		poles: csvData.poles,
		cards: csvData.cards,
		stats: csvData.stats,

		// Loading and error states
		loading: queryLoading || loading,
		error: queryError?.message || error,

		// Grid info
		gridId,

		// Refresh function
		refresh: refreshData,
	};
};

export default useCsvLoader;
