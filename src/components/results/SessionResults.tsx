import { useParams } from "react-router-dom";
import { Calendars } from "../calendar/Calendars";
import { SessionResult } from "./SessionResult";
import { useGetCalendarsQuery } from "../../graphql/generated";
import { getGridConfig } from "../../shared/config/grids";
import { Divider } from "../layout/Divider";

const slugify = (str: string) =>
	str
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");

function toSlug(calendar: {
	date?: any;
	grid: string;
	round?: string | null;
	track?: { name?: string | null } | null;
}) {
	const year = new Date(calendar.date).getFullYear();
	const month = String(new Date(calendar.date).getMonth() + 1).padStart(
		2,
		"0",
	);
	const gridLabel = getGridConfig(calendar.grid)?.label ?? calendar.grid;
	return `${year}-${month}-${slugify(gridLabel)}-${slugify(calendar.round ?? "")}-${slugify(calendar.track?.name ?? "")}`;
}

export function SessionResults() {
	const { slug } = useParams();
	const { data } = useGetCalendarsQuery();

	const matched = slug
		? data?.calendars.find((c) => toSlug(c) === slug)
		: null;

	return (
		<aside className="bg-f1-bg-silver">
			<div className="w-full mx-auto max-w-screen-xl px-3 pt-8">
				<h1 className="font-extrabold text-4xl md:text-6xl tracking-wide mb-6">
					Resultados
				</h1>
				<Divider />
				{/* {!matched && (
					<p className="text-f1-text mt-6 mb-2">
						Selecione uma etapa abaixo para ver os resultados.
					</p>
				)} */}
			</div>
			<Calendars hideHeader />
			<SessionResult
				calendarId={matched?.id ?? null}
				calendarData={matched ?? null}
			/>
		</aside>
	);
}
