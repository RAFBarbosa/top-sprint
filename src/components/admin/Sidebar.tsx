// src/components/admin/Sidebar.tsx
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useGrids } from "../../contexts/GridsContext";

const navLink = ({ isActive }: { isActive: boolean }) =>
	`block p-2 rounded hover:bg-f1-red/20 ${isActive ? "bg-f1-red/20 font-bold" : ""}`;

const subNavLink = ({ isActive }: { isActive: boolean }) =>
	`block px-3 py-1.5 rounded text-sm hover:bg-f1-red/20 ${isActive ? "bg-f1-red/20 font-bold" : "text-f1-lighterCarbon"}`;

export default function Sidebar() {
	const { grids } = useGrids();
	const location = useLocation();
	const isInGrids = location.pathname.includes("/admin/painel/grids");

	return (
		<div className="flex flex-col md:flex-row gap-4 mb-8">
			<nav className="bg-white p-4 rounded-lg border border-black/20 w-full md:w-64 shrink-0">
				<ul className="space-y-1 md:space-y-2">
					<li>
						<NavLink to="/admin/painel/resultados" className={navLink}>
							Resultados
						</NavLink>
					</li>
					<li>
						<NavLink to="/admin/painel/noticias" className={navLink}>
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
						<NavLink to="/admin/painel/parceiros" className={navLink}>
							Parceiros
						</NavLink>
					</li>
					<li>
						<NavLink to="/admin/painel/campeoes" className={navLink}>
							Mural dos Campeões
						</NavLink>
					</li>
					<li>
						<NavLink to="/admin/painel/temporadas" className={navLink}>
							Temporadas
						</NavLink>
					</li>
					{/* Grids section with sub-nav */}
					<li className="hidden md:block">
						<NavLink
							to="/admin/painel/grids"
							end
							className={navLink}
						>
							Grids
						</NavLink>
						{isInGrids && grids.length > 0 && (
							<ul className="mt-1 ml-2 space-y-0.5 border-l border-black/10 pl-2">
								{grids.map((grid) => {
									const base = `/admin/painel/grids/${grid.id}`;
									const isGridActive =
										location.pathname.startsWith(base);
									return (
										<li key={grid.id}>
											<NavLink
												to={base}
												end
												className={({ isActive }) =>
													`flex items-center gap-2 px-2 py-1.5 rounded text-sm hover:bg-f1-red/20 cursor-pointer ${
														isActive
															? "bg-f1-red/20 font-bold"
															: "text-f1-lighterCarbon"
													}`
												}
											>
												<span
													className="w-2 h-2 rounded-full shrink-0"
													style={{
														backgroundColor:
															grid.primaryColor,
													}}
												/>
												{grid.label}
											</NavLink>
											{isGridActive && (
												<ul className="mt-0.5 ml-4 space-y-0.5">
													<li>
														<NavLink
															to={`${base}/pilotos`}
															className={subNavLink}
														>
															Pilotos
														</NavLink>
													</li>
													<li>
														<NavLink
															to={`${base}/calendarios`}
															className={subNavLink}
														>
															Calendário
														</NavLink>
													</li>
													<li>
														<NavLink
															to={`${base}/classificacao`}
															className={subNavLink}
														>
															Classificação
														</NavLink>
													</li>
													<li>
														<NavLink
															to={`${base}/resultado-manual`}
															className={subNavLink}
														>
															Resultado Manual
														</NavLink>
													</li>
												</ul>
											)}
										</li>
									);
								})}
							</ul>
						)}
					</li>
				</ul>
			</nav>

			<div className="flex-1 bg-white md:p-6 rounded-lg md:border border-black/20 min-w-0">
				<Outlet />
			</div>
		</div>
	);
}
