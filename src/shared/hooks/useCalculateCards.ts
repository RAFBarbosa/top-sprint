import { useCallback } from "react";
import { useGetCalendarsRegistrationQuery } from "../../graphql/generated";
import { useSeasons } from "../../contexts/SeasonsContext";
import { useCalendarSeasons } from "../../contexts/CalendarSeasonsContext";
import { useDriverProfiles } from "../../contexts/DriverProfilesContext";
import { calculateAndSaveCards } from "../utils/calculateDriverCards";

export function useCalculateCards() {
	const { data: calendarsData } = useGetCalendarsRegistrationQuery({ fetchPolicy: "cache-first" });
	const { seasons } = useSeasons();
	const { mappings } = useCalendarSeasons();
	const { profiles } = useDriverProfiles();

	const triggerForGrid = useCallback(
		async (gridId: string) => {
			const allCalendars = calendarsData?.calendars ?? [];

			const gridCalendarIds = new Set(
				allCalendars.filter((c) => c.grid === gridId).map((c) => c.id),
			);
			const gridSeasonIds = new Set(
				mappings.filter((m) => gridCalendarIds.has(m.calendarId)).map((m) => m.seasonId),
			);
			const activeSeason =
				seasons.find((s) => s.active && gridSeasonIds.has(s.id)) ??
				seasons.find((s) => s.active) ??
				seasons.filter((s) => gridSeasonIds.has(s.id)).slice(-1)[0];

			if (!activeSeason) return;

			const seasonCalendarIds = new Set(
				mappings.filter((m) => m.seasonId === activeSeason.id).map((m) => m.calendarId),
			);

			// All season calendars for this grid, sorted by date ascending
			const seasonCalendars = allCalendars
				.filter((c) => c.grid === gridId && seasonCalendarIds.has(c.id))
				.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

			const seasonCalIds = seasonCalendars.map((c) => c.id);

			// prevRating excludes the last calendar entry
			const prevCalIds = seasonCalIds.slice(0, -1);

			// All driver IDs in this grid from profiles
			const driverIds = Object.entries(profiles)
				.filter(([, gridProfiles]) => !!gridProfiles[gridId])
				.map(([driverId]) => driverId);

			if (driverIds.length === 0) return;

			await calculateAndSaveCards(gridId, seasonCalIds, prevCalIds, driverIds);
		},
		[calendarsData, seasons, mappings, profiles],
	);

	return { triggerForGrid };
}
