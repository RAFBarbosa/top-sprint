import { useMemo } from "react";
import { useSeasons } from "../../contexts/SeasonsContext";
import { useCalendarSeasons } from "../../contexts/CalendarSeasonsContext";
import { useCalendars } from "../../contexts/CalendarsContext";

export function useActiveSeason(gridId: string) {
	const { seasons } = useSeasons();
	const { mappings } = useCalendarSeasons();
	const { allCalendars } = useCalendars();

	return useMemo(() => {
		const gridCalendarIds = new Set(
			allCalendars
				.filter((c) => c.grid === gridId)
				.map((c) => c.id),
		);
		const gridSeasonIds = new Set(
			mappings
				.filter((m) => gridCalendarIds.has(m.calendarId))
				.map((m) => m.seasonId),
		);
		return (
			seasons.find((s) => s.active && gridSeasonIds.has(s.id)) ?? null
		);
	}, [seasons, mappings, allCalendars, gridId]);
}
