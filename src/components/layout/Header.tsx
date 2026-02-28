import { Menu } from "./Menu";
import { NextRaces } from "../countdown/NextRaces";
import { useLocation } from "react-router-dom";
import { GridMenu } from "./GridMenu";
import { tenant } from "../config/tenants";

export function Header() {
	const location = useLocation();
	const isAdminPage = location.pathname.includes("/admin/");

	return (
		<header>
			{tenant.grids.length > 1 && (
				<div className="fixed top-0 left-0 w-full z-50 hidden md:block">
					<GridMenu />
				</div>
			)}

			<div
				className={`fixed top-0 ${tenant.grids.length > 1 ? "md:top-11" : ""} left-0 w-full z-40`}
			>
				<Menu />
			</div>

			{!isAdminPage && (
				<div
					className={`bg-f1-black mt-[56px] ${tenant.grids.length > 1 ? "md:mt-[114px]" : "md:mt-[74px]"}`}
				>
					<NextRaces />
				</div>
			)}
		</header>
	);
}
