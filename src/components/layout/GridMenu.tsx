import { useTab } from "../../contexts/TabContext";
import { TabSwitch } from "../standings/csv/TabSwitch";
import { Socials } from "../utils/Socials";

export function GridMenu() {
	return (
		<div className="bg-f1-carbon text-white">
			<div className="max-w-screen-xl flex justify-between items-center mx-auto px-3">
				<div className="flex gap-4 items-center">
					<h3 className="font-semibold uppercase">
						Grids Top Sprint
					</h3>
					<TabSwitch />
				</div>
				<div className="scale-75 translate-x-6">
					<Socials />
				</div>
			</div>
		</div>
	);
}
