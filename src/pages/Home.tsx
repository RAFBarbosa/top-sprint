import { Teams } from "../components/Teams";
import { Standings } from "../components/Standings";
import { Calendars } from "../components/Calendars";
import { Banners } from "../components/Banners";

export function Home() {
	return (
		<div id="inicio">
			<div className="flex flex-col max-w-screen-xl px-3 md:mx-auto pb-10">
				<div className="h-16 bg-divider bg-cover my-4 opacity-5"></div>
				<div className="md:flex w-full">
					<Banners />
					<Calendars />
				</div>
			</div>
			<Standings />
			<Teams />
		</div>
	);
}
