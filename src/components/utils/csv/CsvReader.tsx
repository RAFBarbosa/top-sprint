import React, { useEffect, useState } from "react";
import Papa from "papaparse";

interface CsvReaderProps {
	driverName: string;
}

const CsvReader: React.FC<CsvReaderProps> = ({ driverName }) => {
	const [data, setData] = useState<any[]>([]);

	useEffect(() => {
		fetch("/data.csv")
			.then((response) => response.text())
			.then((csvText) => {
				Papa.parse(csvText, {
					header: true,
					complete: (results) => {
						// Extract columns I to O (columns 8 to 14 in zero-indexed)
						const extractedData = results.data.map((row: any) => {
							return {
								Pilotos: row["Pilotos"],
								Num: row["Num"],
								Racecraft: row["Racecraft"],
								Awareness: row["Awareness"],
								Pace: row["Pace"],
								"TPS Experience": row["TPS Experience"],
								Rating: row["Rating"],
							};
						});
						// Filter data for the specific driver
						const filteredData = extractedData.filter(
							(row) => row.Pilotos === driverName
						);
						setData(filteredData);
					},
				});
			});
	}, [driverName]);

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Pilotos</th>
						<th>Num</th>
						<th>Racecraft</th>
						<th>Awareness</th>
						<th>Pace</th>
						<th>TPS Experience</th>
						<th>Rating</th>
					</tr>
				</thead>
				<tbody>
					{data.map((row, index) => (
						<tr key={index}>
							<td>{row.Pilotos}</td>
							<td>{row.Num}</td>
							<td>{row.Racecraft}</td>
							<td>{row.Awareness}</td>
							<td>{row.Pace}</td>
							<td>{row["TPS Experience"]}</td>
							<td>{row.Rating}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CsvReader;
