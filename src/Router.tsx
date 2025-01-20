import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Rules } from "./pages/Rules";
import { Profile } from "./pages/Profile";
import { Champions } from "./pages/Champions";
import { Admin } from "./pages/Admin";

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/regras" element={<Rules />} />
			<Route path="/campeoes" element={<Champions />} />
			<Route path="/pilotos/:driverName" element={<Profile />} />
			<Route path="/admin" element={<Admin />} />
		</Routes>
	);
}
