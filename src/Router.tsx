import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Champions } from "./pages/Champions";
import Drivers from "./pages/Drivers";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import TeamsAdmin from "./pages/admin/TeamsAdmin";
import CalendarAdmin from "./pages/admin/CalendarAdmin";
import NewsAdmin from "./pages/admin/NewsAdmin";
import ResultsAdmin from "./pages/admin/ResultsAdmin";
import DriversAdmin from "./pages/admin/DriversAdmin";
import HallOfFameAdmin from "./pages/admin/HallOfFameAdmin";
import { SessionResults } from "./components/results/SessionResults";
import PartnerAdmin from "./pages/admin/PartnerAdmin";
import { TopSprintRules } from "./pages/rules/TopSprintRules";
import { FeliplayRules } from "./pages/rules/FeliplayRules";
import { BrazukaRules } from "./pages/rules/BrazukaRules";
import { Archive } from "./pages/Archive";
import { tenant } from "./shared/config/tenants";
import { ManualResultsRegistration } from "./components/admin/ManualResultsRegistration";
import { GridsAdmin } from "./components/admin/GridsAdmin";
import TracksAdmin from "./pages/admin/TracksAdmin";
import { GridConfigAdmin } from "./components/admin/GridConfigAdmin";
import { GridDriversAdmin } from "./components/admin/GridDriversAdmin";
import { GridStandings } from "./components/admin/GridStandings";
import { GridManualResults } from "./components/admin/GridManualResults";
import { SeasonsAdmin } from "./components/admin/SeasonsAdmin";
import { PointAdjustmentsAdmin } from "./components/admin/PointAdjustmentsAdmin";
import { DriverStatsOffsetsAdmin } from "./components/admin/DriverStatsOffsetsAdmin";
import { UsersAdmin } from "./pages/admin/UsersAdmin";
import TenantConfigAdmin from "./pages/admin/TenantConfigAdmin";
import WinnerCardGenerator from "./components/utils/winner-card-generator";
import { ElevatedOnly } from "./components/auth/ElevatedOnly";

export function Router() {
	const RulesPage = {
		topSprint: TopSprintRules,
		feliplay: FeliplayRules,
		brazuka: BrazukaRules,
	}[tenant.id];

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/regras" element={<RulesPage />} />
			<Route path="/campeoes" element={<Champions />} />
			<Route path="/pilotos" element={<Drivers />} />
			<Route path="/pilotos/:driverName" element={<Profile />} />
			<Route path="/resultados" element={<SessionResults />} />
			<Route path="/resultados/:slug" element={<SessionResults />} />
			<Route path="/historico" element={<Archive />} />
			<Route path="/admin" element={<AdminLogin />} />
			<Route element={<ProtectedRoute />}>
				<Route path="/admin/painel" element={<AdminDashboard />}>
					<Route path="pilotos" element={<DriversAdmin />} />
					<Route path="equipes" element={<TeamsAdmin />} />
					<Route path="parceiros" element={<PartnerAdmin />} />
					<Route path="resultados" element={<ResultsAdmin />} />
					<Route path="noticias" element={<NewsAdmin />} />
					<Route path="campeoes" element={<HallOfFameAdmin />} />
					<Route path="temporadas" element={<SeasonsAdmin />} />
					<Route path="pistas" element={<ElevatedOnly><TracksAdmin /></ElevatedOnly>} />
					<Route path="grids" element={<GridsAdmin />} />
					<Route path="grids/:gridId" element={<GridConfigAdmin />} />
					<Route
						path="grids/:gridId/pilotos"
						element={<GridDriversAdmin />}
					/>
					<Route
						path="grids/:gridId/calendarios"
						element={<CalendarAdmin />}
					/>
					<Route
						path="grids/:gridId/classificacao"
						element={<GridStandings />}
					/>
					<Route
						path="grids/:gridId/resultado-manual"
						element={<GridManualResults />}
					/>
					<Route
						path="grids/:gridId/ajustes"
						element={<PointAdjustmentsAdmin />}
					/>
					<Route path="historico-pilotos" element={<ElevatedOnly><DriverStatsOffsetsAdmin /></ElevatedOnly>} />
					<Route path="usuarios" element={<ElevatedOnly><UsersAdmin /></ElevatedOnly>} />
					<Route path="configuracao" element={<ElevatedOnly><TenantConfigAdmin /></ElevatedOnly>} />
					<Route path="gerar-imagens" element={<WinnerCardGenerator />} />
				</Route>
			</Route>
		</Routes>
	);
}
