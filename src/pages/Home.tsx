import { Teams } from "../components/Teams";
import { Standings } from "../components/Standings";
import { Calendars } from "../components/Calendars";
import { Banners } from "../components/Banners";

export function Home() {
	return (
		<div id="inicio" className="flex flex-col px-4 mt-4">
			<div className="h-16 bg-divider bg-cover mb-4 opacity-5"></div>
			<div className="md:flex w-full">
				<Banners />
				<Calendars />
			</div>
			<Standings />
			<Teams />
		</div>
	);
}
