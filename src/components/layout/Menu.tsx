import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import OpenInNew from "@mui/icons-material/OpenInNew";
import useNavigateToDriver from "../../shared/hooks/useNavigateToDriver";
import MenuDriverList from "../drivers/MenuDriverList";
import { useTab } from "../../contexts/TabContext";
import { GridMenu } from "./GridMenu";
import { useTenantConfig } from "../../contexts/TenantConfigContext";
import { useDriverProfiles } from "../../contexts/DriverProfilesContext";
import { useFirebaseDrivers } from "../../shared/hooks/useFirebaseDrivers";

// ── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
	id: string;
	label: string;
	external?: boolean;
	isDropdown?: boolean;
	hidden?: boolean;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

// ── Helpers ──────────────────────────────────────────────────────────────────

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

// ── Component ────────────────────────────────────────────────────────────────

export function Menu() {
	const { defaultPhotoStyle, features, nav } = useTenantConfig();
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const navigateToDriver = useNavigateToDriver();
	const { activeTab, tabs } = useTab();
	const { isInGrid, applyProfile } = useDriverProfiles();
	const { drivers: data, loading } = useFirebaseDrivers();

	const menuItems = useMemo<NavItem[]>(() => [
		{ id: "/", label: "Início" },
		{ id: "/resultados", label: "Resultados" },
		{ id: "/pilotos", label: "Pilotos", isDropdown: true },
		{ id: "/campeoes", label: "Mural dos Campeões", hidden: !features.hallOfFame },
		{ id: "/historico", label: "Histórico", hidden: !features.archive },
		{ id: nav.ticketUrl ?? "", label: "Abrir Ticket", external: true, hidden: !nav.ticketUrl },
		{ id: nav.registrationUrl ?? "", label: "Inscrições", external: true, hidden: !nav.registrationUrl },
	].filter((item) => !item.hidden && item.id !== ""), [features, nav]);

	const teamLogoByName = useMemo(() => {
		const map: Record<string, string> = {};
		(data).forEach((d) => {
			if (d.team?.name && d.team?.photo?.url) {
				map[d.team.name] = d.team.photo.url;
			}
		});
		return map;
	}, [data]);

	const activeGridDrivers = (data)
		.filter((driver) => isInGrid(driver.id, activeTab.id))
		.map((driver) => {
			const applied = applyProfile(driver, activeTab.id);
			const resolvedTeamName =
				applied.team?.name ?? applied.teamName ?? "";
			return {
				...applied,
				photo: applied.photo?.url ?? applied.photo ?? "",
				teamColor: applied.team?.color?.hex ?? applied.teamColor ?? "",
				teamName: resolvedTeamName,
				teamLogo: teamLogoByName[resolvedTeamName] ?? "",
				grid: activeTab.id,
			};
		})
		.filter((driver) => !driver.reserve && !driver.exDriver)
		.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

	const handleLinkClick = () => {
		setIsOpen(false);
		scrollToTop();
	};

	const handleDriverClick = (driverName: string) => {
		setIsOpen(false);
		navigateToDriver(driverName);
	};

	const handleAllDriversClick = () => {
		setIsOpen(false);
		navigateToDriver("");
	};

	const isActive = (id: string) =>
		location.pathname === id ||
		(id === "/pilotos" && location.pathname.startsWith("/pilotos")) ||
		(id === "/resultados" && location.pathname.startsWith("/resultados"));

	return (
		<nav
			style={{ backgroundColor: "var(--color-brand-nav)" }}
			className="text-white h-[56px] md:h-[74px]"
		>
			<div className="flex items-center justify-between md:justify-center h-full md:gap-x-10">
				{/* Logo */}
				<Link
					to="/"
					onClick={handleLinkClick}
					aria-label="Ir para a página inicial"
					className="h-10 md:h-14 max-w-[5.5rem] md:max-w-40 w-auto relative z-[60] ml-3 md:ml-0 flex items-center flex-shrink-0 overflow-hidden"
				>
					<Logo />
				</Link>

				{/* Mobile — grid switcher + hamburger */}
				{tabs.length > 1 && (
					<div className="text-xl absolute left-7 inset-x-0 font-semibold md:hidden z-50 mt-1">
						<GridMenu />
					</div>
				)}
				<button
					className="text-3xl md:hidden relative z-[60] w-[40px] h-[50px] mr-3"
					onClick={() => setIsOpen(!isOpen)}
					aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
					aria-expanded={isOpen}
				>
					{isOpen ? (
						<CloseIcon fontSize="large" aria-hidden="true" />
					) : (
						<MenuIcon fontSize="large" aria-hidden="true" />
					)}
				</button>

				{/* Mobile overlay bg */}
				<div
					style={{ backgroundColor: "var(--color-brand-nav)" }}
					className="md:hidden absolute w-full h-full z-40"
				/>

				{/* Mobile drawer */}
				<div
					style={{ backgroundColor: "var(--color-brand-nav)" }}
					className={`fixed top-0 right-0 px-2 py-6 transition-transform duration-300 ${
						isOpen ? "translate-y-[56px]" : "translate-y-[-468px]"
					} md:hidden w-full z-30`}
				>
					<ul className="space-y-2">
						{menuItems.map((item) => (
							<li
								key={item.id}
								className={`border-b border-r border-white rounded-br-lg py-2 flex justify-between px-2 ${
									isActive(item.id)
										? "border-b-2 border-r-2"
										: ""
								}`}
							>
								{item.external ? (
									<a
										href={item.id}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={`${item.label} (abre em nova janela)`}
										className="tenant-menu-item text-lg w-full flex justify-between items-center py-2 px-2"
										onClick={handleLinkClick}
									>
										<span className="tenant-menu-item-label">
											{item.label}
										</span>
										<OpenInNew
											fontSize="small"
											aria-hidden="true"
										/>
									</a>
								) : (
									<Link
										to={item.id}
										className="tenant-menu-item text-lg w-full flex justify-between items-center py-2 px-2"
										onClick={handleLinkClick}
									>
										<span className="tenant-menu-item-label">
											{item.label}
										</span>
										<ArrowForwardIos
											fontSize="small"
											aria-hidden="true"
										/>
									</Link>
								)}
							</li>
						))}
					</ul>
				</div>

				{/* Desktop nav */}
				<div className="hidden md:flex h-full items-center">
					{menuItems.map((item) => (
						<React.Fragment key={item.id}>
							{item.external ? (
								<a
									href={item.id}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`${item.label} (abre em nova janela)`}
									className="tenant-menu-item text-lg h-full flex items-center px-4 nav-link-hover transition-colors duration-300"
								>
									<span className="tenant-menu-item-label">
										{item.label}
									</span>
								</a>
							) : item.isDropdown ? (
								<div
									className={`relative h-full group ${
										isActive(item.id)
											? "nav-link-active"
											: ""
									}`}
								>
									<button
										onClick={handleAllDriversClick}
										className="tenant-menu-item text-lg h-full flex items-center px-4 nav-link-hover transition-colors duration-300 cursor-pointer"
									>
										<span className="tenant-menu-item-label">
											{item.label}
										</span>
										<ArrowForwardIos
											className="ml-2 rotate-90"
											fontSize="small"
											aria-hidden="true"
										/>
									</button>

									{/* Dropdown panel */}
									<div className="fixed left-0 z-50 hidden group-hover:block w-full py-8 nav-dropdown-bg">
										<div className="flex flex-col max-w-screen-xl mx-auto gap-10">
											<div className="flex justify-between gap-6">
												{loading ? (
													<div className="text-white p-4">
														Carregando pilotos...
													</div>
												) : activeGridDrivers.length ===
												  0 ? (
													<div className="text-white/60 p-4 text-sm">
														Nenhum piloto neste
														grid.
													</div>
												) : (
													<MenuDriverList
														drivers={
															activeGridDrivers
														}
														onDriverClick={
															handleDriverClick
														}
														photoStyle={
															defaultPhotoStyle
														}
													/>
												)}
											</div>
										</div>
									</div>
								</div>
							) : (
								<Link
									to={item.id}
									onClick={handleLinkClick}
									className={`tenant-menu-item text-lg h-full flex items-center px-4 nav-link-hover transition-colors duration-300 ${
										isActive(item.id)
											? "nav-link-active"
											: ""
									}`}
								>
									<span className="tenant-menu-item-label">
										{item.label}
									</span>
								</Link>
							)}
						</React.Fragment>
					))}
				</div>
			</div>
		</nav>
	);
}
