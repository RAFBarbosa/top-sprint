import { useEffect, useState } from "react";
import { useCalendars, FirestoreCalendar } from "../../contexts/CalendarsContext";
import { useTracks } from "../../contexts/TracksContext";
import { NextRace } from "./NextRace";
import { Skeleton } from "@mui/material";
import { parseISO, addHours, isAfter } from "date-fns";
import { useTab } from "../../contexts/TabContext";

const loadingSkeleton = () => {
	return (
		<div className="md:flex justify-between max-w-screen-xl mx-auto px-3">
			<div className="flex flex-col md:w-1/3">
				<Skeleton
					animation="wave"
					variant="text"
					sx={{ fontSize: "1.2rem", bgcolor: "grey.900" }}
				/>
				<Skeleton
					animation="wave"
					variant="text"
					sx={{ fontSize: "1.5rem", bgcolor: "grey.900" }}
				/>
			</div>
			<div className="md:w-1/3 mt-3 md:mt-0">
				<Skeleton
					animation="wave"
					variant="rectangular"
					height={100}
					sx={{ bgcolor: "grey.900" }}
				/>
			</div>
		</div>
	);
};

export function NextRaces() {
	const { calendars, loading, refetch } = useCalendars();
	const { getTrack } = useTracks();
	const [nextRace, setNextRace] = useState<FirestoreCalendar | null>(null);
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
	const { activeTab } = useTab();

	useEffect(() => {
		const currentDate = new Date();

		// ✅ only races from the selected grid
		const filteredCalendars = calendars.filter(
			(race) => race.grid === activeTab.id,
		);

		const sortedCalendars = [...filteredCalendars].sort(
			(a, b) =>
				parseISO(a.date).getTime() - parseISO(b.date).getTime(),
		);

		let activeRace = null;
		let nextUpcomingRace = null;

		for (const race of sortedCalendars) {
			const raceStartTime = parseISO(race.date);
			const raceEndTime = addHours(raceStartTime, 2);

			if (
				currentDate >= raceStartTime &&
				currentDate <= raceEndTime
			) {
				activeRace = race;
				break;
			}

			if (isAfter(raceStartTime, currentDate)) {
				nextUpcomingRace = race;
				break;
			}
		}

		const raceToDisplay = activeRace || nextUpcomingRace;
		setNextRace(raceToDisplay);

		if (activeRace) {
			const raceEndTime = addHours(parseISO(activeRace.date), 2);
			const timeUntilEnd =
				raceEndTime.getTime() - currentDate.getTime();

			if (timeUntilEnd > 0) {
				const timeoutId = setTimeout(() => {
					refetch();
				}, timeUntilEnd);
				setTimeoutId(timeoutId);
			}
		}
	}, [calendars, refetch, activeTab.id]);

	useEffect(() => {
		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [timeoutId]);

	if (loading) return loadingSkeleton();

	return (
		<div className="text-white">
			{
				nextRace && nextRace.date ? (
					<NextRace
						key={nextRace.id}
						track={getTrack(nextRace.trackId)?.name || nextRace.round || ""}
						round={nextRace.round || ""}
						location={getTrack(nextRace.trackId)?.location || ""}
						countryCode={getTrack(nextRace.trackId)?.countryCode}
						date={parseISO(nextRace.date)}
						link={nextRace.link || ""}
						grid={nextRace.grid || ""}
						sprint={nextRace.sprint || false}
					/>
				) : (
					""
				)
				// (
				// 	<p className="text-white text-center">Sem corridas futuras</p>

				// )
			}
		</div>
	);
}
