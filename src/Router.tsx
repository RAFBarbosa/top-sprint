import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Rules } from "./pages/Rules";
import { Profile } from "./pages/Profile";
import { Champions } from "./pages/Champions";
import { Results } from "./pages/Results";
import Drivers from "./pages/Drivers";
import { Registration } from "./pages/Registration";
import { Calendar } from "./pages/Calendar";

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
			<Route path="/cadastro" element={<Registration />} />
		</Routes>
	);
}
