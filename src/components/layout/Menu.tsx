import React, { useMemo, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import OpenInNew from "@mui/icons-material/OpenInNew";
import useNavigateToDriver from "../../shared/hooks/useNavigateToDriver";
import MenuDriverList from "../drivers/MenuDriverList";
import { useTab } from "../../contexts/TabContext";
import { GridMenu } from "./GridMenu";
import { useTenantConfig } from "../../contexts/TenantConfigContext";
import { Socials } from "../utils/Socials";
import { useDriverProfiles } from "../../contexts/DriverProfilesContext";
import { useFirebaseDrivers } from "../../shared/hooks/useFirebaseDrivers";
import { useActiveSeason } from "../../shared/hooks/useActiveSeason";

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
	const activeSeason = useActiveSeason(activeTab.id);

	const menuItems = useMemo<NavItem[]>(
		() =>
			[
				{ id: "/", label: "Início" },
				{ id: "/resultados", label: "Resultados" },
				{ id: "/pilotos", label: "Pilotos", isDropdown: true },
				{
					id: "/campeoes",
					label: "Mural dos Campeões",
					hidden: !features.hallOfFame,
				},
				{
					id: "/historico",
					label: "Histórico",
					hidden: !features.archive,
				},
				{
					id: nav.regulamentoUrl ?? "",
					label: "Regulamento",
					external: true,
					hidden: !nav.regulamentoUrl,
				},
				{
					id: nav.ticketUrl ?? "",
					label: "Abrir Ticket",
					external: true,
					hidden: !nav.ticketUrl,
				},
				{
					id: nav.registrationUrl ?? "",
					label: "Inscrições",
					external: true,
					hidden: !nav.registrationUrl,
				},
			].filter((item) => !item.hidden && item.id !== ""),
		[features, nav],
	);

	const teamLogoByName = useMemo(() => {
		const map: Record<string, string> = {};
		data.forEach((d) => {
			if (d.team?.name && d.team?.photo?.url) {
				map[d.team.name] = d.team.photo.url;
			}
		});
		return map;
	}, [data]);

	const activeGridDrivers = data
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

	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

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
			style={{
				backgroundColor: "var(--color-brand-nav)",
				color: "var(--color-brand-nav-text)",
			}}
			className="h-[56px] md:h-[74px]"
		>
			<div className="max-w-screen-xl mx-auto relative h-full px-3">
				<div className="flex items-center justify-between h-full">
					{/* Logo */}
					<Link
						to="/"
						onClick={handleLinkClick}
						aria-label="Ir para a página inicial"
						className="h-10 md:h-14 max-w-[5.5rem] md:max-w-40 w-auto relative z-[60] ml-3 flex items-center flex-shrink-0 overflow-hidden"
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
						className="text-3xl md:hidden relative z-[70] w-[40px] h-[50px] mr-3"
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

					{/* Mobile overlay bg (keeps nav bar filled) */}
					<div
						style={{ backgroundColor: "var(--color-brand-nav)" }}
						className="md:hidden absolute w-full h-full z-40"
					/>

					{/* Mobile full-screen overlay */}
					<div
						style={{ backgroundColor: "var(--color-brand-nav)" }}
						className={`fixed inset-0 z-[65] flex flex-col md:hidden transition-transform duration-300 ease-in-out overflow-y-auto ${
							isOpen ? "translate-y-0" : "-translate-y-full"
						}`}
						aria-hidden={!isOpen}
					>
						{/* Top accent bar */}
						<div
							className="absolute left-0 right-0 top-0 h-1"
							style={{
								backgroundColor: "var(--color-brand-primary)",
							}}
						/>

						{/* Centered logo */}
						<div className="flex justify-center pt-20 pb-2">
							<div className={`h-20 w-auto flex items-center transition-opacity duration-300 ${isOpen ? "opacity-100 delay-200" : "opacity-0 delay-0"}`}>
								<Logo />
							</div>
						</div>

						{/* Nav links */}
						<nav className="flex-1 flex flex-col justify-center px-8 pb-6 gap-1">
							{menuItems.map((item) => (
								<div
									key={item.id}
									className={`border-b border-r border-white/20 rounded-br-lg flex justify-between items-center px-2 ${
										isActive(item.id)
											? "border-b-2 border-r-2 border-white/60"
											: ""
									}`}
								>
									{item.external ? (
										<a
											href={item.id}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={`${item.label} (abre em nova janela)`}
											className="font-futosans uppercase tracking-wide text-xl w-full flex justify-between items-center py-5"
											onClick={handleLinkClick}
										>
											{item.label}
											<OpenInNew
												fontSize="small"
												aria-hidden="true"
											/>
										</a>
									) : (
										<Link
											to={item.id}
											className="font-futosans uppercase tracking-wide text-xl w-full flex justify-between items-center py-5"
											onClick={handleLinkClick}
										>
											{item.label}
											<ArrowForwardIos
												fontSize="small"
												aria-hidden="true"
											/>
										</Link>
									)}
								</div>
							))}
						</nav>

						{/* Bottom bar */}
						<div className="px-8 pb-10 pt-4 border-t border-white/10 flex items-center justify-between">
							<Socials />
							<Link
								to="/admin/painel"
								onClick={handleLinkClick}
								className="opacity-30 hover:opacity-100 transition-opacity"
							>
								<LockOutlinedIcon fontSize="small" />
							</Link>
						</div>
					</div>

					{/* Desktop nav */}
					<div className="hidden md:flex flex-1 justify-center h-full items-center">
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
										<div
											className="fixed left-0 z-50 hidden group-hover:block w-full py-8 nav-dropdown-bg"
											style={{
												color: "var(--color-brand-nav-dropdown-text)",
											}}
										>
											<div className="flex flex-col max-w-screen-xl mx-auto gap-10">
												<div className="flex justify-between gap-6">
													{loading ? (
														<div className="p-4">
															Carregando
															pilotos...
														</div>
													) : !activeSeason ? (
														<div className="p-4 text-sm opacity-60">
															Nenhuma temporada ativa.
														</div>
													) : activeGridDrivers.length === 0 ? (
														<div className="p-4 text-sm opacity-60">
															Nenhum piloto neste grid.
														</div>
													) : (
														<MenuDriverList
															drivers={activeGridDrivers}
															photoStyle={defaultPhotoStyle}
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
				<Link
					to="/admin/painel"
					className="hidden md:flex absolute right-3 top-0 h-full items-center opacity-30 hover:opacity-100 transition-opacity"
					title="Admin"
					aria-label="Admin"
				>
					<LockOutlinedIcon fontSize="small" />
				</Link>
			</div>
		</nav>
	);
}
