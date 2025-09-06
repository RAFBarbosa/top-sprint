import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import {
	Menu as MenuIcon,
	Close as CloseIcon,
	ArrowForwardIos as MenuArrow,
} from "@mui/icons-material";
import { useEnhancedCards } from "../hooks/useEnhancedCards";
import useNavigateToDriver from "../hooks/useNavigateToDriver";
import useNormalizeString from "../hooks/useNormalizeString";
import MenuDriverList from "../drivers/MenuDriverList";
import { useTab } from "../../contexts/TabContext";

const menuItems = [
	{ id: "/", label: "Inicio" },
	// { id: "/resultados/atual", label: "Resultados" },
	// { id: "/resultados", label: "Resultados" },
	{ id: "/pilotos", label: "Pilotos", isDropdown: true },
	{ id: "/campeoes", label: "Mural dos Campeões" },
	{ id: "/regras", label: "Regras e Formato" },
	{
		id: "https://docs.google.com/forms/d/e/1FAIpQLSfHN50Fhz16wKABFaKlBa-iLFSeDVENnuZyZ7pK40qXJkL5Nw/viewform",
		label: "Abrir Ticket",
		external: true,
	},
	{
		id: "https://docs.google.com/forms/d/19PHr-9GcvGMmp0SU2Nva9PEWDlm4R6JHjkIKD_L-YiI/edit",
		label: "Inscrições",
		external: true,
	},
];

const smoothScrolling = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};

export function Menu() {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const navigateToDriver = useNavigateToDriver();

	const { activeTab, setActiveTab } = useTab();

	const enhancedDrivers = useEnhancedCards(activeTab.id);

	// Group drivers by grid
	const gridA = enhancedDrivers.filter((driver) => driver.grid === "gridA");
	const gridB = enhancedDrivers.filter((driver) => driver.grid === "gridB");
	const reserves = enhancedDrivers.filter(
		(driver) => driver.grid === "reserva" || driver.grid === "inativo"
	);

	const handleLinkClick = () => {
		setIsOpen(false);
		smoothScrolling();
	};

	const handleDriverClick = (driverName: string) => {
		setIsOpen(false);

		// Find the driver to determine which grid they belong to
		const driver = enhancedDrivers.find(
			(driver) =>
				useNormalizeString(driver.name) ===
				useNormalizeString(driverName)
		);

		// Set the active tab to the driver's grid if found
		if (driver && driver.grid !== activeTab.id) {
			setActiveTab(driver.grid);
		}
		navigateToDriver(useNormalizeString(driverName));
	};

	const handleAllDriversClick = () => {
		setIsOpen(false);
		navigateToDriver("");
	};

	return (
		<div className="flex items-center justify-between md:justify-center h-full md:gap-x-10 text-white">
			<button className="w-[50px] md:w-[70px] z-50 ml-3 md:ml-0">
				<Link to="/" onClick={handleLinkClick}>
					<Logo />
				</Link>
			</button>

			{/* Mobile */}
			<button className="text-xl font-semibold md:hidden z-50">
				<Link to="/" onClick={handleLinkClick}>
					Liga Top Sprint
				</Link>
			</button>
			<button
				className="text-3xl md:hidden z-50 w-[40px] h-[50px] mr-3 md:mr-0"
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? (
					<CloseIcon fontSize="large" />
				) : (
					<MenuIcon fontSize="large" />
				)}
			</button>
			<div className="md:hidden absolute bg-f1-red w-full h-full z-40"></div>

			<div
				className={`fixed top-0 right-0 bg-f1-red px-2 py-6 transition-transform duration-300 transform ${
					isOpen ? "translate-y-[56px]" : "translate-y-[-468px]"
				} md:hidden w-full z-30`}
			>
				<ul className="space-y-2">
					{menuItems.map((data) => (
						<li
							key={data.id}
							className={`border-b border-r border-white rounded-br-lg py-2 flex justify-between px-2 ${
								location.pathname === data.id ||
								(location.pathname.startsWith("/pilotos") &&
									data.id.startsWith("/pilotos"))
									? "border-b-2 border-r-2"
									: ""
							}`}
						>
							{data.external ? (
								<a
									href={data.id}
									target="_blank"
									rel="noopener noreferrer"
									className="text-lg w-full flex justify-between items-center py-2 px-2"
									onClick={handleLinkClick}
								>
									<span>{data.label}</span>
									<span className="material-symbols-outlined text-sm"></span>
								</a>
							) : (
								<Link
									to={data.id}
									className="text-lg w-full flex justify-between items-center py-2 px-2"
									onClick={handleLinkClick}
								>
									<span>{data.label}</span>
									<MenuArrow fontSize="small" />
								</Link>
							)}
						</li>
					))}
				</ul>
			</div>

			{/* Larger screens */}
			<div className="hidden md:flex h-full my-2 items-center">
				{menuItems.map((data) => (
					<React.Fragment key={data.id}>
						{data.external ? (
							<a
								href={data.id}
								target="_blank"
								rel="noopener noreferrer"
								className={`text-lg h-full items-center flex px-4 hover:bg-f1-carbon transition-colors duration-300 ${
									location.pathname === data.id &&
									"bg-f1-carbon"
								}`}
							>
								<span>{data.label}</span>
							</a>
						) : data.isDropdown ? (
							<div
								key={data.id}
								className={`relative h-full group ${
									location.pathname.startsWith("/pilotos") &&
									"bg-f1-carbon"
								}`}
							>
								<a
									onClick={() => handleAllDriversClick()}
									className="text-lg h-full items-center flex px-4 hover:bg-f1-carbon transition-colors duration-300 cursor-pointer"
								>
									<span>{data.label}</span>
									<MenuArrow
										className="ml-2 rotate-90"
										fontSize="small"
									/>
								</a>
								<div className="fixed left-0 z-50 hidden group-hover:block w-full py-8 bg-f1-carbon">
									<div className="flex flex-col max-w-screen-xl mx-auto gap-10">
										<div className="flex justify-between gap-6">
											<MenuDriverList
												gridName="Grid Heat"
												drivers={gridA}
												onDriverClick={
													handleDriverClick
												}
											/>
											<MenuDriverList
												gridName="Grid Carbon"
												drivers={gridB}
												onDriverClick={
													handleDriverClick
												}
											/>
										</div>
										{/* <MenuDriverList
											gridName="Reservas e Ex-Pilotos"
											drivers={reserves}
											onDriverClick={handleDriverClick}
										/> */}
									</div>
								</div>
							</div>
						) : (
							<Link
								to={data.id}
								onClick={handleLinkClick}
								className={`text-lg h-full items-center flex px-4 hover:bg-f1-carbon transition-colors duration-300 ${
									(location.pathname === data.id ||
										(data.id === "/resultados" &&
											location.pathname.startsWith(
												"/resultados"
											))) &&
									"bg-f1-carbon"
								}`}
							>
								<span>{data.label}</span>
							</Link>
						)}
					</React.Fragment>
				))}
			</div>
		</div>
	);
}
