import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Calendars } from "../calendar/Calendars";
import { SessionResult } from "./SessionResult";
import { useGetCalendarsQuery } from "../../graphql/generated";
import { getGridConfig } from "../../shared/config/grids";
import { Divider } from "../layout/Divider";
import { useCalendarSeasons } from "../../contexts/CalendarSeasonsContext";
import { useTab } from "../../contexts/TabContext";

const slugify = (str: string) =>
	str
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");

export function SessionResults() {
	const { slug } = useParams();
	const { data } = useGetCalendarsQuery();
	const { getSeasonForCalendar } = useCalendarSeasons();
	const { activeTab, setActiveTab } = useTab();
	const navigate = useNavigate();
	const prevTabRef = useRef(activeTab.id);

	const matched = slug
		? data?.calendars.find((c) => {
				const gridLabel = getGridConfig(c.grid)?.label ?? c.grid;
				const seasonId = getSeasonForCalendar(c.id);
				const seasonPart = seasonId ? `${slugify(seasonId)}-` : "";
				const calSlug = `${seasonPart}${slugify(gridLabel)}-${slugify(c.round ?? "")}-${slugify(c.track?.name ?? "")}`;
				return calSlug === slug;
			})
		: null;

	// When arriving via news or direct URL on the wrong grid, sync to the result's grid.
	useEffect(() => {
		if (matched?.grid && matched.grid !== activeTab.id) {
			setActiveTab(matched.grid);
		}
	}, [matched?.id]);

	// When the user manually switches grid while on a result, go to results home.
	useEffect(() => {
		const prev = prevTabRef.current;
		prevTabRef.current = activeTab.id;
		if (slug && matched && prev === matched.grid && activeTab.id !== matched.grid) {
			navigate("/resultados", { replace: true });
		}
	}, [activeTab.id, matched?.id]);

	return (
		<aside className="tenant-section tenant-section-results bg-f1-bg-silver">
			<div className="w-full mx-auto max-w-screen-xl px-3 pt-8">
				<h1 className="tenant-section-title font-extrabold text-4xl md:text-6xl tracking-wide mb-6">
					Resultados
				</h1>
				<Divider />
			</div>
			<Calendars hideHeader noPadding preventScrollOnClick />
			<SessionResult
				calendarId={matched?.id ?? null}
				calendarData={matched ?? null}
			/>
		</aside>
	);
}
