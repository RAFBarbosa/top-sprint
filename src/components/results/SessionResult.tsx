import clsx from "clsx";

const racePoints = [20, 16, 14, 12, 10, 8, 6, 4, 2, 1];
const sprintPoints = [8, 7, 6, 5, 4, 3, 2, 1];
const qualiPolePoint = 1;

export function SessionResultsTable({ results, sessionType, showGridOrder }) {
	let gridAFirstDriverAssigned = false;
	let gridBFirstDriverAssigned = false;

	const activeDrivers = results.filter(
		(d) => d.grid !== "Reserva" && d.position !== "NC"
	);

	const gridARanked = activeDrivers
		.filter((d) => d.grid === "gridA")
		.sort((a, b) => parseInt(a.position) - parseInt(b.position));

	const gridBRanked = activeDrivers
		.filter((d) => d.grid === "gridB")
		.sort((a, b) => parseInt(a.position) - parseInt(b.position));

	const gridAWinner = gridARanked[0];
	const gridBWinner = gridBRanked[0];

	const fastestLapDriverA = gridARanked.find((driver) => driver.fastestLap);
	const fastestLapDriverB = gridBRanked.find((driver) => driver.fastestLap);

	const rows = results.map((driver) => {
		const originalGrid = driver.grid;
		const displayGrid = originalGrid === "Reserva" ? "Res" : originalGrid;
		const gridPosition = parseInt(driver.gridPosition);
		const overallPosition = parseInt(driver.position);

		let points = 0;

		if (originalGrid === "Reserva" || driver.position === "NC") {
			points = 0;
		} else {
			const gridList =
				originalGrid === "gridA" ? gridARanked : gridBRanked;
			const gridPositionIndex = gridList.findIndex(
				(d) => d.driverId === driver.driverId
			);
			const driverPlaceInGrid = gridPositionIndex + 1;

			if (
				sessionType === "race" &&
				driverPlaceInGrid <= racePoints.length
			) {
				points = racePoints[driverPlaceInGrid - 1];
				driver.fastestLap ? (points += 1) : points;
			} else if (
				sessionType === "sprint" &&
				driverPlaceInGrid <= sprintPoints.length
			) {
				points = sprintPoints[driverPlaceInGrid - 1];
			} else if (
				sessionType === "quali" &&
				originalGrid === "gridA" &&
				!gridAFirstDriverAssigned
			) {
				points = qualiPolePoint;
				gridAFirstDriverAssigned = true;
			} else if (
				sessionType === "quali" &&
				originalGrid === "gridB" &&
				!gridBFirstDriverAssigned
			) {
				points = qualiPolePoint;
				gridBFirstDriverAssigned = true;
			}
		}

		const gridList = originalGrid === "gridA" ? gridARanked : gridBRanked;
		const posGrid =
			originalGrid !== "Reserva" &&
			driver.position !== "NC" &&
			gridList.findIndex((d) => d.driverId === driver.driverId) + 1;

		const positionChange =
			sessionType === "race" &&
			originalGrid !== "Reserva" &&
			driver.position !== "NC"
				? gridPosition - overallPosition
				: null;

		return {
			id: driver.driverId,
			position: driver.position,
			grid: displayGrid,
			driverName: driver.driverName,
			driverGridPosition: posGrid,
			teamName: driver.team?.name || "Reserva",
			points,
			positionChange,
		};
	});

	const sortedRows = showGridOrder
		? [...rows].sort((a, b) => {
				const aIsNC = a.position === "NC";
				const bIsNC = b.position === "NC";

				if (aIsNC && bIsNC) return 0;
				if (aIsNC) return 1;
				if (bIsNC) return -1;

				const gridComparison = a.grid.localeCompare(b.grid);
				if (gridComparison !== 0) return gridComparison;

				const aPos = a.driverGridPosition || 0;
				const bPos = b.driverGridPosition || 0;
				return aPos - bPos;
		  })
		: rows;

	const headers = [
		{ label: "Pos Geral", show: true },
		{
			label: "Δ",
			show: sessionType === "race",
			tooltip: showGridOrder
				? "Diferença na posição dentro do grid"
				: "Diferença entre posição de largada e final",
		},
		{ label: "Pos Grid", show: true },
		{ label: "Piloto", show: true },
		{ label: "Equipe", show: true },
		{ label: "Pts", show: true },
	];

	return (
		<div className="flex flex-col md:flex-row gap-2 items-center md:items-start">
			<div className="flex gap-2 w-[280px] flex-row md:flex-col">
				<h2 className="border-b border-black/10 py-4 text-xl font-bold uppercase mb-2">
					Destaques
				</h2>
				<div className="flex md:flex-col gap-2 w-full">
					<div className="border border-black/10">
						<div className="bg-f1-carbon text-white text-center px-4 py-2 uppercase mb-5">
							<h3 className="text-lg font-semibold">Grid A</h3>
							<p className="text-sm -mt-1">
								{[
									"Carolinne Walker",
									"Micaely Gusmão",
									"Lesly Stoeberl",
								].includes(gridAWinner?.driverName)
									? sessionType !== "quali"
										? "Vencedora"
										: "Pole Position"
									: sessionType !== "quali"
									? "Vencedor"
									: "Pole Position"}
							</p>
						</div>
						{gridAWinner && (
							<div>
								<div className="flex-1 flex items-center justify-center w-9/10 mx-auto overflow-hidden">
									<img
										src={gridAWinner.photo?.url}
										alt={gridAWinner.driverName}
										className="max-w-full object-contain scale-140 transform translate-y-13"
									/>
								</div>
								<div className="mb-1 -mt-10 py-3 bg-white relative text-center uppercase text-sm">
									<div className="font-bold text-2xl">
										{gridAWinner.driverName}
									</div>
									<div className="-mt-1">
										{gridAWinner.team.name}
									</div>
								</div>
								{sessionType === "race" && (
									<div className="uppercase bg-f1-purple px-4 py-2 text-white flex gap-3 justify-between items-center">
										<div>
											<p className="font-bold">
												{fastestLapDriverA?.driverName}
											</p>
											<p className="text-xs -mt-1">
												{fastestLapDriverA?.team.name}
											</p>
										</div>
										<p className="text-sm">+ 1 Ponto</p>
									</div>
								)}
							</div>
						)}
					</div>
					<div className="border border-black/10">
						<div className="bg-f1-red text-white text-center px-4 py-2 uppercase mb-5">
							<h3 className="text-lg font-semibold">Grid B</h3>
							<p className="text-sm -mt-1">
								{[
									"Carolinne Walker",
									"Micaely Gusmão",
									"Lesly Stoeberl",
								].includes(gridBWinner?.driverName)
									? sessionType !== "quali"
										? "Vencedora"
										: "Pole Position"
									: sessionType !== "quali"
									? "Vencedor"
									: "Pole Position"}
							</p>
						</div>
						{gridBWinner && (
							<div>
								<div className="flex-1 flex items-center justify-center w-9/10 mx-auto overflow-hidden">
									<img
										src={gridBWinner.photo?.url}
										alt={gridBWinner.driverName}
										className="max-w-full object-contain scale-140 transform translate-y-13"
									/>
								</div>
								<div className="mb-1 -mt-10 py-3 bg-white relative text-center uppercase text-sm text-f1-red">
									<div className="font-bold text-2xl">
										{gridBWinner.driverName}
									</div>
									<div className="-mt-1">
										{gridBWinner.team.name}
									</div>
								</div>
								{sessionType === "race" && (
									<div className="uppercase bg-f1-purple px-4 py-2 text-white flex gap-3 justify-between items-center">
										<div>
											<p className="font-bold">
												{fastestLapDriverB?.driverName}
											</p>
											<p className="text-xs -mt-1">
												{fastestLapDriverB?.team.name}
											</p>
										</div>
										<p className="text-sm">+ 1 Ponto</p>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="flex-1 overflow-x-auto">
				<table className="min-w-full">
					<thead>
						<tr className="font-semibold uppercase text-left border-b-1 border-f1-bg-silver">
							{headers.map((h, i) =>
								h.show ? (
									<th
										key={h.label}
										className={clsx(
											"pb-3 px-3",
											i <= 1 && "w-[90px]",
											h.tooltip && "cursor-help"
										)}
										title={h.tooltip}
									>
										{h.label}
									</th>
								) : null
							)}
						</tr>
					</thead>
					<tbody>
						{sortedRows.map((row, index) => {
							const isGridB = row.grid === "gridB";
							const textColorClass = isGridB ? "text-f1-red" : "";

							return (
								<tr
									key={row.id}
									className={clsx(
										index % 2 === 0
											? "bg-white"
											: "bg-f1-bg-silver",
										"text-base"
									)}
								>
									<td className="p-3 text-left">
										{row.position}
									</td>
									{sessionType === "race" && (
										<td className="p-3 text-left">
											{row.positionChange !== null ? (
												row.positionChange > 0 ? (
													<span className="text-green-600">
														▲ {row.positionChange}
													</span>
												) : row.positionChange < 0 ? (
													<span className="text-red-600">
														▼{" "}
														{Math.abs(
															row.positionChange
														)}
													</span>
												) : (
													"-"
												)
											) : (
												"-"
											)}
										</td>
									)}
									<td
										className={clsx(
											"p-3 text-left",
											textColorClass
										)}
									>
										{row.grid === "gridA"
											? "A "
											: row.grid === "gridB"
											? "B "
											: "Res"}
										{row.driverGridPosition}
									</td>
									<td className="p-3 text-left">
										{row.driverName}
									</td>
									<td className="p-3 text-left">
										{row.teamName}
									</td>
									<td
										className={clsx(
											"p-3 text-left",
											textColorClass
										)}
									>
										{row.points}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
