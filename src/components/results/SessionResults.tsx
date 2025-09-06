import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendars } from "../calendar/Calendars";
import { SessionResult } from "./SessionResult";

export function SessionResults() {
	const { slug } = useParams();
	const navigate = useNavigate();
	const [selectedCalendar, setSelectedCalendar] = useState<any | null>(null);

	const handleCalendarClick = (calendar: any) => {
		setSelectedCalendar(calendar);
		navigate(`/resultados/${calendar.slug}`);
	};

	return (
		<aside>
			<Calendars
				onCalendarClick={handleCalendarClick}
				selectedCalendar={selectedCalendar}
				initialSlug={slug}
			/>
			<SessionResult
				calendarId={selectedCalendar?.id || null}
				calendarData={selectedCalendar}
			/>
		</aside>
	);
}
