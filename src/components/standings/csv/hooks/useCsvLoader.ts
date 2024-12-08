import { useState, useEffect } from "react";
import Papa from "papaparse";

// Custom hook to load and parse CSV data
const useCsvLoader = () => {
	const [teams, setTeams] = useState<{ name: string; pts: string }[]>([]);
	const [drivers, setDrivers] = useState<{ name: string; pts: string }[]>([]);
	const [fastestLaps, setFastestLaps] = useState<
		{ name: string; qty: string }[]
	>([]);
	const [poles, setPoles] = useState<{ name: string; qty: string }[]>([]);

	useEffect(() => {
		const loadCsv = async () => {
			try {
				const response = await fetch("/csv/data.csv");
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

						setTeams(teamsData);
						setDrivers(driversData);
						setFastestLaps(fastestLapData);
						setPoles(poleData);
					},
					error: (error: unknown) => {
						console.error("Error parsing CSV:", error);
					},
				});
			} catch (error: unknown) {
				console.error("Error fetching CSV:", error);
			}
		};

		loadCsv();
	}, []);

	return { teams, drivers, fastestLaps, poles };
};

export default useCsvLoader;
