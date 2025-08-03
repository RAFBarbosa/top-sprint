// src/components/admin/Sidebar.tsx
import { NavLink, Outlet } from "react-router-dom";

export default function Sidebar() {
	return (
		<div className="flex flex-col md:flex-row gap-4 mb-8">
			<nav className="bg-white p-4 rounded-lg border border-black/20 w-full md:w-64">
				<ul className="space-y-2 md:space-y-4">
					<li>
						<NavLink
							to="/admin/painel/resultados"
							className={({ isActive }) =>
								`block p-2 rounded hover:bg-f1-red/20 ${
									isActive ? "bg-f1-red/20 font-bold" : ""
								}`
							}
						>
							Resultados
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/admin/painel/pilotos"
							className={({ isActive }) =>
								`block p-2 rounded hover:bg-f1-red/20 ${
									isActive ? "bg-f1-red/20 font-bold" : ""
								}`
							}
						>
							Pilotos
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/admin/painel/equipes"
							className={({ isActive }) =>
								`block p-2 rounded hover:bg-f1-red/20 ${
									isActive ? "bg-f1-red/20 font-bold" : ""
								}`
							}
						>
							Equipes
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/admin/painel/noticias"
							className={({ isActive }) =>
								`block p-2 rounded hover:bg-f1-red/20 ${
									isActive ? "bg-f1-red/20 font-bold" : ""
								}`
							}
						>
							Noticias
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/admin/painel/calendarios"
							className={({ isActive }) =>
								`block p-2 rounded hover:bg-gray-100 ${
									isActive ? "bg-f1-red/20 font-bold" : ""
								}`
							}
						>
							Calendario
						</NavLink>
					</li>
				</ul>
			</nav>

			<div className="flex-1 bg-white md:p-6 rounded-lg md:border border-black/20">
				<Outlet />
			</div>
		</div>
	);
}
