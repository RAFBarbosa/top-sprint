import { Menu } from "./Menu";
import { NextRaces } from "../countdown/NextRaces";
import { useLocation } from "react-router-dom";
import { GridMenu } from "./GridMenu";
import { useTab } from "../../contexts/TabContext";

export function Header() {
	const location = useLocation();
	const isAdminPage = location.pathname.includes("/admin/");
	const { tabs } = useTab();
	const hasGridBar = tabs.length > 1;

	return (
		<header>
			<div className="fixed top-0 left-0 w-full z-50 hidden md:block">
				<GridMenu />
			</div>

			<div
				className={`fixed top-0 ${hasGridBar ? "md:top-11" : ""} left-0 w-full z-40`}
			>
				<Menu />
			</div>

			{!isAdminPage && (
				<div
					className={`bg-f1-black mt-[56px] ${hasGridBar ? "md:mt-[118px]" : "md:mt-[74px]"}`}
				>
					<NextRaces />
				</div>
			)}
		</header>
	);
}
