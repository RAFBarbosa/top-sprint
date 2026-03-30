import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/apollo";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Router } from "./Router";
import { Analytics } from "@vercel/analytics/react";
import { TabProvider } from "./contexts/TabContext";
import { GridsProvider } from "./contexts/GridsContext";
import { DriverProfilesProvider } from "./contexts/DriverProfilesContext";
import { SeasonsProvider } from "./contexts/SeasonsContext";
import { CalendarSeasonsProvider } from "./contexts/CalendarSeasonsContext";
import { tenant } from "./shared/config/tenants";
import { useEffect } from "react";

function ScrollToTop() {
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [pathname]);
	return null;
}

function AppLayout() {
	const { pathname } = useLocation();
	const isAdmin = pathname.startsWith("/admin");

	return (
		<GridsProvider>
			<SeasonsProvider>
				<CalendarSeasonsProvider>
					<DriverProfilesProvider>
					<TabProvider>
						{!isAdmin && <Header />}
						<Router />
						<Analytics />
						{!isAdmin && <Footer />}
					</TabProvider>
					</DriverProfilesProvider>
				</CalendarSeasonsProvider>
			</SeasonsProvider>
		</GridsProvider>
	);
}

function App() {
	const style = Object.fromEntries(
		Object.entries(tenant.cssVars),
	) as React.CSSProperties;

	return (
		<div style={style} className="flex flex-col min-h-screen">
			<ApolloProvider client={client}>
				<BrowserRouter>
					<ScrollToTop />
					<AppLayout />
				</BrowserRouter>
			</ApolloProvider>
		</div>
	);
}

export default App;
