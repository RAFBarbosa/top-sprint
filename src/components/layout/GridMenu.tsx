import { useTab } from "../../contexts/TabContext";
import { TabSwitch } from "../standings/csv/TabSwitch";
import { Socials } from "../utils/Socials";
import { useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";

export function GridMenu() {
	const { activeTab, tabs, setActiveTab } = useTab();
	const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

	const handleMobileTabSelect = (tabId: string) => {
		setActiveTab(tabId);
		setIsMobileDropdownOpen(false);
	};

	const getTabColor = (tabId: string) => {
		switch (tabId) {
			case "gridA": // Heat
				return "bg-purple-600";
			case "gridB": // Carbon
				return "bg-f1-lightSilver";
			case "gridC": // Academy
				return "bg-f1-academy";
			default:
				return "bg-white";
		}
	};

	return (
		<div className="md:bg-f1-carbon text-white h-9 md:h-11">
			<div className="max-w-screen-xl flex justify-between mx-auto px-3">
				<div className="flex md:gap-4 items-center">
					<h3 className="font-semibold uppercase hidden md:block">
						Grids Top Sprint
					</h3>
					<h3 className="font-semibold md:hidden">Grid</h3>

					<div className="hidden md:block">
						<TabSwitch />
					</div>

					<div className="md:hidden relative">
						<button
							className="flex items-center gap-1 px-1 md:px-3"
							onClick={() =>
								setIsMobileDropdownOpen(!isMobileDropdownOpen)
							}
						>
							<span>{activeTab.label}</span>
							<ArrowDropDown fontSize="medium" />
						</button>

						{isMobileDropdownOpen && (
							<div className="fixed left-1/2 transform -translate-x-1/2 top-14 w-2/3 bg-f1-carbon border border-white/30 rounded shadow-lg z-50">
								{tabs.map((tab) => (
									<div
										key={tab.id}
										className="relative group"
									>
										<button
											className={`w-full text-left px-3 py-2 text-base hover:bg-white/10 relative ${
												activeTab.id === tab.id
													? "bg-white/20"
													: ""
											}`}
											onClick={() =>
												handleMobileTabSelect(tab.id)
											}
										>
											Grid {tab.label}
											<span
												className={`absolute bottom-0 left-0 h-0.5 ${getTabColor(
													tab.id
												)} ${
													activeTab.id === tab.id
														? "w-full"
														: "w-0 group-hover:w-full transition-all duration-150 ease-out"
												}`}
											></span>
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				<div className="hidden md:block scale-75 translate-x-6">
					<Socials />
				</div>
			</div>
		</div>
	);
}
