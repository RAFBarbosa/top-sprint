import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/apollo";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Router } from "./Router";
import { Analytics } from "@vercel/analytics/react";
import { TabProvider } from "./contexts/TabContext";
import { tenant } from "./components/config/tenants";

function App() {
	const style = Object.fromEntries(
		Object.entries(tenant.cssVars),
	) as React.CSSProperties;

	return (
		<div style={style} className="flex flex-col min-h-screen">
			<ApolloProvider client={client}>
				<BrowserRouter>
					<TabProvider>
						<Header />
						<Router />
						<Analytics />
						<Footer />
					</TabProvider>
				</BrowserRouter>
			</ApolloProvider>
		</div>
	);
}

export default App;
