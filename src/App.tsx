import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/apollo";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Router } from "./Router";
import { Analytics } from "@vercel/analytics/react";

function App() {
	return (
		<div className="flex flex-col min-h-screen">
			<ApolloProvider client={client}>
				<BrowserRouter>
					<Header />
					<Router />
					<Analytics />
					<Footer />
				</BrowserRouter>
			</ApolloProvider>
		</div>
	);
}

export default App;
