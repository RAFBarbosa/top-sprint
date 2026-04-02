// src/components/admin/Sidebar.tsx
import { NavLink, Outlet } from "react-router-dom";

const navLink = ({ isActive }: { isActive: boolean }) =>
	`block p-2 rounded hover:bg-f1-red/20 ${isActive ? "bg-f1-red/20 font-bold" : ""}`;


export default function Sidebar() {

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
				</ul>
			</nav>

			<div className="flex-1 bg-white md:p-6 rounded-lg md:border border-black/20 min-w-0">
				<Outlet />
			</div>
		</div>
	);
}
