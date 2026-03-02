import Papa from "papaparse";

// Helper function to normalize header names for comparison
export const normalizeHeader = (header: string): string => {
    return header
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ")
        .trim();
};

// Function to find the correct header index
export const findHeaderIndex = (
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
export const calculatePositionChanges = <T extends { name: string; pts: string }>(
    currentData: T[],
    oldData: T[],
): (T & { positionChange: number })[] => {
    return currentData.map((currentItem) => {
        const oldItem = oldData.find((old) =>
            currentItem.id && (old as any).id
                ? (old as any).id === (currentItem as any).id
                : normalizeHeader((old as any).name) ===
                      normalizeHeader(currentItem.name),
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
            (item) => normalizeHeader(item.name) === normalizeHeader(currentItem.name),
        );
        const oldPosition = oldSorted.findIndex(
            (item) => normalizeHeader(item.name) === normalizeHeader((oldItem as any).name),
        );

        const positionChange = oldPosition - currentPosition;

        return { ...currentItem, positionChange };
    });
};

// Cache for CSV processing results (in-memory cache)
const csvProcessCache = new Map<
    string,
    {
        data: any;
        timestamp: number;
    }
>();

// Cache duration: 5 minutes
export const CACHE_DURATION = 5 * 60 * 1000;

// Process CSV data function with caching
export const processCsvData = async (
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

        const result = await new Promise<any>((resolve) => {
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
                    const teamIdIdx = findHeaderIndex(headers, ["ID Equipes"]);
                    const teamNameIdx = findHeaderIndex(headers, ["Nome Equipes"]);
                    const teamPtsHeaderIdx = findHeaderIndex(headers, ["Ponto Equipes"]);
                    const driverIdIdx = findHeaderIndex(headers, ["ID Pilotos"]);
                    const driverNameIdx = findHeaderIndex(headers, ["Nome Pilotos"]);
                    const driverPtsHeaderIdx = findHeaderIndex(headers, ["Ponto Pilotos"]);

                    const cardIdIdx = findHeaderIndex(headers, ["ID Cartas"]);
                    const cardNameIdx = findHeaderIndex(headers, ["Carta Nome"]);
                    const cardPrevRatingIdx = findHeaderIndex(headers, ["Anterior"]);
                    const cardRatingIdx = findHeaderIndex(headers, ["Atual"]);
                    const racecraftIdx = findHeaderIndex(headers, ["Racecraft"]);
                    const awarenessIdx = findHeaderIndex(headers, ["Awareness"]);
                    const paceIdx = findHeaderIndex(headers, ["Pace"]);
                    const experienceIdx = findHeaderIndex(headers, ["Experience", " Experience"]);
                    const bestCardIdx = findHeaderIndex(headers, ["Melhor Carta"]);

                    // Stats data
                    const participationsIdx = findHeaderIndex(headers, ["Presencas"]);
                    const pointsIdx = findHeaderIndex(headers, ["Pontos"]);
                    const avgIdx = findHeaderIndex(headers, ["Media"]);
                    const avgQualiIdx = findHeaderIndex(headers, ["Media Quali"]);
                    const polesIdx = findHeaderIndex(headers, ["Poles"]);
                    const fastestLapIdx = findHeaderIndex(headers, ["VR"]);
                    const posGanhasIdx = findHeaderIndex(headers, ["Pos Ganhas"]);
                    const raceWinsIdx = findHeaderIndex(headers, ["Vitorias GP"]);
                    const sprintWinsIdx = findHeaderIndex(headers, ["Vitorias Sprint"]);
                    const champWinsIdx = findHeaderIndex(headers, ["Vitoria Campeonato"]);
                    const teamWinsIdx = findHeaderIndex(headers, ["Vitoria Equipe"]);
                    const podiumsIdx = findHeaderIndex(headers, ["Podios"]);
                    const temporadasIdx = findHeaderIndex(headers, ["Temporadas"]);
                    const tempoIdx = findHeaderIndex(headers, ["Tempo"]);

                    // Find points columns
                    let teamPtsIdx = teamPtsHeaderIdx !== -1 ? teamPtsHeaderIdx : 2;
                    let driverPtsIdx = driverPtsHeaderIdx !== -1 ? driverPtsHeaderIdx : 5;

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

                                if (teamName && teamName.trim() !== "" && teamName !== "N/A" && teamPts && teamPts.trim() !== "" && teamPts !== "N/A") {
                                    teamsData.push({ name: teamName.trim(), pts: teamPts.trim() });
                                }
                            }

                            if (driverNameIdx !== -1 && driverPtsIdx !== -1) {
                                const driverName = row[headers[driverNameIdx]];
                                const driverPts = row[headers[driverPtsIdx]];

                                if (driverName && driverName.trim() !== "" && driverName !== "N/A" && driverPts && driverPts.trim() !== "" && driverPts !== "N/A") {
                                    driversData.push({ name: driverName.trim(), pts: driverPts.trim() });
                                }
                            }
                        });

                        result.teams = teamsData;
                        result.drivers = driversData;
                    } else {
                        const teamsData: { id?: string; name: string; pts: string }[] = [];
                        const driversData: { id?: string; name: string; pts: string }[] = [];
                        const fastestLapData: { name: string; qty: string }[] = [];
                        const poleData: { name: string; qty: string }[] = [];
                        const cardData: any[] = [];
                        const statsData: any[] = [];

                        rows.forEach((row, rowIndex) => {
                            if (teamNameIdx !== -1 && teamPtsIdx !== -1) {
                                const teamName = row[headers[teamNameIdx]];
                                const teamPts = row[headers[teamPtsIdx]];

                                if (teamName && teamName.trim() !== "" && teamName !== "N/A" && teamPts && teamPts.trim() !== "" && teamPts !== "N/A") {
                                    teamsData.push({
                                        id: teamIdIdx !== -1 ? (row[headers[teamIdIdx]] || "").trim() : "",
                                        name: teamName.trim(),
                                        pts: teamPts.trim(),
                                    });
                                }
                            }

                            if (driverNameIdx !== -1 && driverPtsIdx !== -1) {
                                const driverName = row[headers[driverNameIdx]];
                                const driverPts = row[headers[driverPtsIdx]];

                                if (driverName && driverName.trim() !== "" && driverName !== "N/A" && driverPts && driverPts.trim() !== "" && driverPts !== "N/A") {
                                    driversData.push({
                                        id: driverIdIdx !== -1 ? (row[headers[driverIdIdx]] || "").trim() : "",
                                        name: driverName.trim(),
                                        pts: driverPts.trim(),
                                    });
                                }
                            }

                            if (fastestLapIdx !== -1 && driverNameIdx !== -1) {
                                const fastestLapValue = row[headers[fastestLapIdx]];
                                const driverName = row[headers[driverNameIdx]];

                                if (fastestLapValue && fastestLapValue.trim() !== "" && fastestLapValue !== "N/A" && driverName && driverName.trim() !== "" && driverName !== "N/A") {
                                    fastestLapData.push({ name: driverName.trim(), qty: fastestLapValue.trim() });
                                }
                            }

                            if (polesIdx !== -1 && driverNameIdx !== -1) {
                                const poleValue = row[headers[polesIdx]];
                                const driverName = row[headers[driverNameIdx]];

                                if (poleValue && poleValue.trim() !== "" && poleValue !== "N/A" && driverName && driverName.trim() !== "" && driverName !== "N/A") {
                                    poleData.push({ name: driverName.trim(), qty: poleValue.trim() });
                                }
                            }

                            // Cards data collection
                            if (cardNameIdx !== -1 && racecraftIdx !== -1 && awarenessIdx !== -1 && paceIdx !== -1 && experienceIdx !== -1 && bestCardIdx !== -1 && cardPrevRatingIdx !== -1 && cardRatingIdx !== -1) {
                                const cardName = row[headers[cardNameIdx]];
                                if (cardName && cardName.trim() !== "" && cardName !== "N/A") {
                                    const cardItem = {
                                        id: cardIdIdx !== -1 ? (row[headers[cardIdIdx]] || "").trim() : "",
                                        name: cardName.trim(),
                                        num: "",
                                        racecraft: (row[headers[racecraftIdx]] || "").trim(),
                                        awareness: (row[headers[awarenessIdx]] || "").trim(),
                                        pace: (row[headers[paceIdx]] || "").trim(),
                                        experience: (row[headers[experienceIdx]] || "").trim(),
                                        bestRating: (row[headers[bestCardIdx]] || "").trim(),
                                        prevRating: (row[headers[cardPrevRatingIdx]] || "").trim(),
                                        rating: (row[headers[cardRatingIdx]] || "").trim(),
                                    };

                                    cardData.push(cardItem);
                                }
                            }

                            // Stats data collection
                            if (cardNameIdx !== -1 && participationsIdx !== -1 && pointsIdx !== -1 && avgIdx !== -1) {
                                const driverName = row[headers[cardNameIdx]];
                                if (driverName && driverName.trim() !== "" && driverName !== "N/A") {
                                    const statsItem = {
                                        id: cardIdIdx !== -1 ? (row[headers[cardIdIdx]] || "").trim() : "",
                                        name: driverName.trim(),
                                        championships: champWinsIdx !== -1 ? (row[headers[champWinsIdx]] || "0").trim() : "0",
                                        totalPart: participationsIdx !== -1 ? (row[headers[participationsIdx]] || "0").trim() : "0",
                                        totalPoints: pointsIdx !== -1 ? (row[headers[pointsIdx]] || "0").trim() : "0",
                                        pointsPerDay: avgIdx !== -1 ? (row[headers[avgIdx]] || "0").trim() : "0",
                                        raceFinishedPercentage: "",
                                        poles: polesIdx !== -1 ? (row[headers[polesIdx]] || "0").trim() : "0",
                                        fastestLaps: fastestLapIdx !== -1 ? (row[headers[fastestLapIdx]] || "0").trim() : "0",
                                        totalWins: raceWinsIdx !== -1 ? (row[headers[raceWinsIdx]] || "0").trim() : "0",
                                        totalSprintWins: sprintWinsIdx !== -1 ? (row[headers[sprintWinsIdx]] || "0").trim() : "0",
                                        totalPodiums: podiumsIdx !== -1 ? (row[headers[podiumsIdx]] || "0").trim() : "0",
                                        totalPointsNoBonus: "",
                                        totalPointsPerDayNoBonus: "",
                                        powerRanking: "",
                                    };

                                    statsData.push(statsItem);
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
                    resolve({});
                },
            });
        });

        return result;
    } catch (fetchError: unknown) {
        return {};
    }
};
