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
import { Standings } from "./components/standings/Standings";
import { SessionResults } from "./components/results/SessionResults";
import PartnerAdmin from "./pages/admin/PartnerAdmin";
import { TopSprintRules } from "./pages/rules/TopSprintRules";
import { FeliplayRules } from "./pages/rules/FeliplayRules";
import { BrazukaRules } from "./pages/rules/BrazukaRules";
import { Archive } from "./pages/Archive";
import { tenant } from "./shared/config/tenants";
import { ManualResultsRegistration } from "./components/admin/ManualResultsRegistration";
import { GridsAdmin } from "./components/admin/GridsAdmin";
import { GridConfigAdmin } from "./components/admin/GridConfigAdmin";
import { GridDriversAdmin } from "./components/admin/GridDriversAdmin";

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
					<Route path="calendarios" element={<CalendarAdmin />} />
					<Route path="parceiros" element={<PartnerAdmin />} />
					<Route path="resultados" element={<ResultsAdmin />} />
					<Route path="noticias" element={<NewsAdmin />} />
					<Route path="campeoes" element={<HallOfFameAdmin />} />
					<Route path="classificacao" element={<Standings />} />
					<Route
						path="resultado-manual"
						element={<ManualResultsRegistration />}
					/>
<Route path="grids" element={<GridsAdmin />} />
					<Route path="grids/:gridId" element={<GridConfigAdmin />} />
					<Route path="grids/:gridId/pilotos" element={<GridDriversAdmin />} />
				</Route>
			</Route>
		</Routes>
	);
}
