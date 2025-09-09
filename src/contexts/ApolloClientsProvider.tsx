import { ReactNode, useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { onAuthChange } from "../components/auth/auth";
import { publicClient, adminClient } from "../lib/apollo";

export function ApolloClientsProvider({ children }: { children: ReactNode }) {
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthChange((user) => {
			setIsAdmin(!!user); // if logged in -> admin client
		});
		return unsubscribe;
	}, []);

	const client = isAdmin ? adminClient : publicClient;

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
