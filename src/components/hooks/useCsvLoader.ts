import { useState, useEffect } from "react";
import Papa from "papaparse";
import { useGetStatsDataQuery } from "../../graphql/generated";

const useCsvLoader = () => {
	const { data, error, loading } = useGetStatsDataQuery();
	const [teams, setTeams] = useState<{ name: string; pts: string }[]>([]);
	const [drivers, setDrivers] = useState<{ name: string; pts: string }[]>([]);
	const [fastestLaps, setFastestLaps] = useState<
		{
			name: string;
			qty: string;
		}[]
	>([]);
	const [poles, setPoles] = useState<{ name: string; qty: string }[]>([]);
	const [cards, setCards] = useState<
		{
			name: string;
			num: string;
			racecraft: string;
			awareness: string;
			pace: string;
			experience: string;
			rating: string;
			prevRating: string;
		}[]
	>([]);
	const [stats, setStats] = useState<
		{
			name: string;
			championships: string;
			totalPart: string;
			totalPoints: string;
			pointsPerDay: string;
			raceFinishedPercentage: string;
			poles: string;
			fastestLaps: string;
			totalWins: string;
			totalSprintWins: string;
			totalPodiums: string;
			totalPointsNoBonus: string;
			totalPointsPerDayNoBonus: string;
			powerRanking: string;
		}[]
	>([]);

	useEffect(() => {
		const loadCsv = async () => {
			if (!data?.datas[0]?.csv?.url) return;

			try {
				const response = await fetch(data.datas[0].csv.url);
				const csvText = await response.text();

				Papa.parse<string[]>(csvText, {
					header: false,
					skipEmptyLines: true,
					complete: (results) => {
						const rawData = results.data;

						// Filter out rows that are completely empty or contain "N/A"
						const validRows = rawData.filter((row) =>
							row.some(
								(cell) => cell && cell.trim() && cell !== "N/A"
							)
						);

						// Process rows for each section (skip header row)
						const teamsData = validRows
							.slice(1)
							.map((row) => ({
								name: row[0] || "N/A",
								pts: row[1] || "N/A",
							}))
							.filter(
								(item) =>
									item.name !== "N/A" && item.pts !== "N/A"
							);

						const driversData = validRows
							.slice(1)
							.map((row) => ({
								name: row[2] || "N/A",
								pts: row[3] || "N/A",
							}))
							.filter(
								(item) =>
									item.name !== "N/A" && item.pts !== "N/A"
							);

						const fastestLapData = validRows
							.slice(1)
							.map((row) => ({
								name: row[4] || "N/A",
								qty: row[5] || "N/A",
							}))
							.filter(
								(item) =>
									item.name !== "N/A" && item.qty !== "N/A"
							);

						const poleData = validRows
							.slice(1)
							.map((row) => ({
								name: row[6] || "N/A",
								qty: row[7] || "N/A",
							}))
							.filter(
								(item) =>
									item.name !== "N/A" && item.qty !== "N/A"
							);

						const cardData = validRows
							.slice(1)
							.map((row) => ({
								name: row[8] || "N/A",
								num: row[9] || "N/A",
								racecraft: row[10] || "N/A",
								awareness: row[11] || "N/A",
								pace: row[12] || "N/A",
								experience: row[13] || "N/A",
								rating: row[14] || "N/A",
								prevRating: row[15] || "N/A",
							}))
							.filter(
								(item) =>
									item.name !== "N/A" &&
									item.num !== "N/A" &&
									item.racecraft !== "N/A" &&
									item.awareness !== "N/A" &&
									item.pace !== "N/A" &&
									item.experience !== "N/A" &&
									item.rating !== "N/A" &&
									item.prevRating !== "N/A"
							);

						const statsData = validRows
							.slice(1)
							.map((row) => ({
								name: row[16] || "N/A",
								championships: row[45] || "N/A",
								totalPart: row[20] || "N/A",
								totalPoints: row[24] || "N/A",
								pointsPerDay: row[25] || "N/A",
								raceFinishedPercentage: row[29] || "N/A",
								poles: row[32] || "N/A",
								fastestLaps: row[35] || "N/A",
								totalWins: row[38] || "N/A",
								totalSprintWins: row[41] || "N/A",
								totalPodiums: row[44] || "N/A",
								totalPointsNoBonus: row[51] || "N/A",
								totalPointsPerDayNoBonus: row[52] || "N/A",
								powerRanking: row[56] || "N/A",
							}))
							.filter(
								(item) =>
									item.name !== "N/A" &&
									item.championships !== "N/A" &&
									item.totalPart !== "N/A" &&
									item.totalPoints !== "N/A" &&
									item.pointsPerDay !== "N/A" &&
									item.raceFinishedPercentage !== "N/A" &&
									item.poles !== "N/A" &&
									item.fastestLaps !== "N/A" &&
									item.totalWins !== "N/A" &&
									item.totalSprintWins !== "N/A" &&
									item.totalPodiums !== "N/A" &&
									item.totalPointsNoBonus !== "N/A" &&
									item.totalPointsPerDayNoBonus !== "N/A" &&
									item.powerRanking !== "N/A"
							);

						setTeams(teamsData);
						setDrivers(driversData);
						setFastestLaps(fastestLapData);
						setPoles(poleData);
						setCards(cardData);
						setStats(statsData);
					},
					error: (error: unknown) => {
						console.error("Error parsing CSV:", error);
					},
				});
			} catch (error: unknown) {
				console.error("Error fetching CSV:", error);
			}
		};

		if (!loading && !error && data) {
			loadCsv();
		}
	}, [data, loading, error]);

	return { teams, drivers, fastestLaps, poles, cards, stats, loading, error };
};

export default useCsvLoader;
