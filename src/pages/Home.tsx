import { Teams } from "../components/teams/Teams";
import { Standings } from "../components/standings/Standings";
import { Calendars } from "../components/news/Calendars";
import { Banners } from "../components/news/Banners";

export function Home() {
	return (
		<div id="inicio">
			<div className="flex flex-col max-w-screen-xl px-3 md:mx-auto pb-10">
				<div className="h-16 bg-divider bg-cover my-4 opacity-5"></div>
				<div className="flex flex-col md:flex-row w-full gap-6 relative">
					<Banners />
					<Calendars />
				</div>
			</div>
			<Standings />
			<Teams />
		</div>
	);
}
