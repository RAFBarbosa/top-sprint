import { Teams } from "../components/teams/Teams";
import { Standings } from "../components/standings/Standings";
import { Calendars } from "../components/calendar/Calendars";
import { Banners } from "../components/news/Banners";
import { Divider } from "../components/layout/Divider";

export function Home() {
	return (
		<div id="inicio">
			<div className="flex flex-col max-w-screen-xl px-3 mx-auto pb-10">
				<Divider />
				<Banners />
			</div>
			<Calendars />
			<Standings />
			<Teams />
		</div>
	);
}
