import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/apollo";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Router } from "./Router";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
	return (
		<div>
			<ApolloProvider client={client}>
				<SkeletonTheme baseColor="#202020" highlightColor="#444">
					<BrowserRouter>
						<Header />
						<Router />
						<Footer />
					</BrowserRouter>
				</SkeletonTheme>
			</ApolloProvider>
		</div>
	);
}

export default App;
