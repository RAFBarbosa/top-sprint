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
import { TracksProvider } from "./contexts/TracksContext";
import { CalendarsProvider } from "./contexts/CalendarsContext";
import { ToastProvider } from "./contexts/ToastContext";
import { UserRoleProvider } from "./contexts/UserRoleContext";
import { TenantConfigProvider } from "./contexts/TenantConfigContext";
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
		<UserRoleProvider>
		<ToastProvider>
			<TracksProvider>
			<GridsProvider>
				<SeasonsProvider>
					<CalendarSeasonsProvider>
						<CalendarsProvider>
						<DriverProfilesProvider>
							<TabProvider>
								{!isAdmin && <Header />}
								<main className="flex-1 flex flex-col">
									<Router />
									<Analytics />
								</main>
								{!isAdmin && <Footer />}
							</TabProvider>
						</DriverProfilesProvider>
						</CalendarsProvider>
					</CalendarSeasonsProvider>
				</SeasonsProvider>
			</GridsProvider>
			</TracksProvider>
		</ToastProvider>
		</UserRoleProvider>
	);
}

function App() {
	return (
		<div
			data-tenant={import.meta.env.VITE_TENANT}
			className="font-f1 flex flex-col min-h-screen"
		>
			<ApolloProvider client={client}>
				<BrowserRouter>
					<TenantConfigProvider>
						<ScrollToTop />
						<AppLayout />
					</TenantConfigProvider>
				</BrowserRouter>
			</ApolloProvider>
		</div>
	);
}

export default App;
