import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/apollo";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Router } from "./Router";

function App() {
	return (
		<div>
			<ApolloProvider client={client}>
				<BrowserRouter>
					<Header />
					<Router />
					<Footer />
				</BrowserRouter>
			</ApolloProvider>
		</div>
	);
}

export default App;
