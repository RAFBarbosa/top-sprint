// src/components/admin/Sidebar.tsx
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useUserRole } from "../../contexts/UserRoleContext";

const navLink = ({ isActive }: { isActive: boolean }) =>
	`block p-2 rounded hover:bg-f1-red/20 ${isActive ? "bg-f1-red/20 font-bold" : ""}`;

const subNavLink = ({ isActive }: { isActive: boolean }) =>
	`block px-3 py-1.5 rounded text-sm hover:bg-f1-red/20 ${isActive ? "bg-f1-red/20 font-bold" : ""}`;

export default function Sidebar() {
	const { isOwner, role } = useUserRole();
	const hasElevatedAccess = role === "owner" || role === "admin";
	const [advancedOpen, setAdvancedOpen] = useState(false);

	return (
		<div className="flex flex-col md:flex-row gap-4 mb-8">
			<nav className="bg-white p-4 rounded-lg border border-black/20 w-full md:w-64 shrink-0">
				<ul className="space-y-1 md:space-y-2">
					<li>
						<NavLink
							to="/admin/painel/noticias"
							className={navLink}
						>
							Notícias
						</NavLink>
					</li>
					<li>
						<NavLink to="/admin/painel/pilotos" className={navLink}>
							Pilotos
						</NavLink>
					</li>
					<li>
						<NavLink to="/admin/painel/equipes" className={navLink}>
							Equipes
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/admin/painel/parceiros"
							className={navLink}
						>
							Parceiros
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/admin/painel/campeoes"
							className={navLink}
						>
							Mural dos Campeões
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/admin/painel/temporadas"
							className={navLink}
						>
							Temporadas
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/admin/painel/grids"
							className={navLink}
						>
							Grids
						</NavLink>
					</li>
					{hasElevatedAccess && (
						<li>
							<button
								type="button"
								onClick={() => setAdvancedOpen((o) => !o)}
								className="w-full flex items-center justify-between p-2 rounded hover:bg-f1-red/20 cursor-pointer duration-120"
							>
								<span>Avançado</span>
								<ChevronDownIcon
									className={`h-4 w-4 transition-transform duration-150 ${advancedOpen ? "rotate-180" : ""}`}
								/>
							</button>
							{advancedOpen && (
								<ul className="mt-1 ml-2 space-y-1 border-l-2 border-f1-red/30 pl-2">
									<li>
										<NavLink
											to="/admin/painel/historico-pilotos"
											className={subNavLink}
										>
											Histórico Pilotos
										</NavLink>
									</li>
									<li>
										<NavLink
											to="/admin/painel/pistas"
											className={subNavLink}
										>
											Pistas
										</NavLink>
									</li>
									<li>
										<NavLink
											to="/admin/painel/usuarios"
											className={subNavLink}
										>
											Usuários
										</NavLink>
									</li>
									<li>
										<NavLink
											to="/admin/painel/configuracao"
											className={subNavLink}
										>
											Configuração do Site
										</NavLink>
									</li>
									<li>
										<NavLink
											to="/admin/painel/gerar-imagens"
											className={subNavLink}
										>
											Gerar Imagens
										</NavLink>
									</li>
								</ul>
							)}
						</li>
					)}
				</ul>
			</nav>

			<div className="flex-1 bg-white md:p-6 rounded-lg md:border border-black/20 min-w-0">
				<Outlet />
			</div>
		</div>
	);
}
