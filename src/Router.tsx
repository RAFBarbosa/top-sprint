import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Rules } from "./pages/Rules";
import { Profile } from "./pages/Profile";
import { Champions } from "./pages/Champions";
import { Login } from "./pages/Login";
import Drivers from "./pages/Drivers";
import { Registration } from "./pages/Registration";

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/regras" element={<Rules />} />
			<Route path="/campeoes" element={<Champions />} />
			<Route path="/pilotos" element={<Drivers />} />
			<Route path="/pilotos/:driverName" element={<Profile />} />
			<Route path="/login" element={<Login />} />
			<Route path="/cadastro" element={<Registration />} />
		</Routes>
	);
}
