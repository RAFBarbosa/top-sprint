import { Menu } from "./Menu";
import { NextRaces } from "../countdown/NextRaces";
import { useLocation } from "react-router-dom";

export function Header() {
	const location = useLocation();
	const isResultsPage = location.pathname.includes("/resultado/");

	return (
		<header>
			<div className="fixed top-0 left-0 w-full bg-f1-red text-white h-[56px] md:h-[74px] z-40">
				<Menu />
			</div>

			{!isResultsPage && (
				<div className="bg-f1-text mt-[56px] md:mt-[74px]">
					<NextRaces />
				</div>
			)}
		</header>
	);
}
