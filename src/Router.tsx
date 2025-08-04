import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Rules } from "./pages/Rules";
import { Profile } from "./pages/Profile";
import { Champions } from "./pages/Champions";
import { Results } from "./pages/Results";
import Drivers from "./pages/Drivers";
import { Calendar } from "./pages/Calendar";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import TeamsAdmin from "./pages/admin/TeamsAdmin";
import CalendarAdmin from "./pages/admin/CalendarAdmin";
import NewsAdmin from "./pages/admin/NewsAdmin";
import ResultsAdmin from "./pages/admin/ResultsAdmin";
import DriversAdmin from "./pages/admin/DriversAdmin";
import HallOfFameAdmin from "./pages/admin/HallOfFameAdmin";

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/regras" element={<Rules />} />
			<Route path="/campeoes" element={<Champions />} />
			<Route path="/pilotos" element={<Drivers />} />
			<Route path="/pilotos/:driverName" element={<Profile />} />
			<Route path="/resultados/:slug" element={<Calendar />} />
			<Route path="/resultado/:id" element={<Results />} />
			<Route path="/admin" element={<AdminLogin />} />
			<Route element={<ProtectedRoute />}>
				<Route path="/admin/painel" element={<AdminDashboard />}>
					<Route path="pilotos" element={<DriversAdmin />} />
					<Route path="equipes" element={<TeamsAdmin />} />
					<Route path="calendarios" element={<CalendarAdmin />} />
					<Route path="resultados" element={<ResultsAdmin />} />
					<Route path="noticias" element={<NewsAdmin />} />
					<Route path="campeoes" element={<HallOfFameAdmin />} />
				</Route>
			</Route>
		</Routes>
	);
}
