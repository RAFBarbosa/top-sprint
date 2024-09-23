import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Menu } from "./Menu";

export function Header() {
	return (
		<header>
			<div className="fixed top-0 left-0 w-full bg-f1-red text-white h-[56px] md:h-[74px] px-2 z-50">
				<Menu />
			</div>
			<div className="bg-f1-black p-16 mt-[56px] md:mt-[74px]">
				{/* countdown */}
			</div>
		</header>
	);
}
