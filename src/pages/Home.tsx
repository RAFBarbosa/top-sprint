import { Teams } from "../components/teams/Teams";
import { Standings } from "../components/standings/Standings";
import { Calendars } from "../components/calendar/Calendars";
import { Banners } from "../components/news/Banners";
import { Divider } from "../components/layout/Divider";

export function Home() {
	return (
		<div id="inicio">
			<div style={{ backgroundColor: "var(--color-news-bg)", color: "var(--color-news-text)" }}>
				<div className="flex flex-col max-w-screen-xl px-3 mx-auto pb-10">
					<Divider />
					<Banners />
				</div>
			</div>
			<Calendars />
			<Standings />
			<Teams />
		</div>
	);
}
