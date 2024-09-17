import { ApolloProvider } from "@apollo/client";
import { Subscribe } from "./pages/Subscribe";
import { client } from "./lib/apollo";

function App() {
	return (
		<div>
			<ApolloProvider client={client}>
				<Subscribe />
			</ApolloProvider>
		</div>
	);
}

export default App;
