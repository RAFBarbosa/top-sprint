import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Rules } from "./pages/Rules";
import { Champions } from "./pages/Champions";

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/regras" element={<Rules />} />
			<Route path="/campeoes" element={<Champions />} />
			{/* <Route path="/pontuacao" element={<Rules />} />
			<Route path="/calendario" element={<Rules />} />
			<Route path="/equipes" element={<Rules />} />
			<Route path="/classificacao" element={<Rules />} />
			<Route path="/tickets" element={<Rules />} /> */}
		</Routes>
	);
}
