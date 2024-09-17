import { Logo } from "./Logo";
import { Menu } from "./Menu";

export function Header() {
	return (
		<header>
			<div className="fixed top-0 left-0 z-50 p-2 md:py-3 px-4 flex w-full justify-between lg:justify-center bg-gray-700 border-b border-gray-600">
				<div className="">
					<Logo />
				</div>
				<div className="flex w-full justify-between lg:justify-center bg-gray-700">
					<Menu />
				</div>
			</div>
		</header>
	);
}
