import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Menu } from "./Menu";
import { NextRaces } from "./NextRaces";

export function Header() {
	return (
		<header>
			<div className="fixed top-0 left-0 w-full bg-f1-red text-white h-[56px] md:h-[74px] z-40">
				<Menu />
			</div>
			<div className="bg-f1-black mt-[56px] md:mt-[74px]">
				<NextRaces />
			</div>
		</header>
	);
}
