import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";
import { onAuthChange } from "./auth";
import { ApolloProvider, ApolloClient } from "@apollo/client";
import { createAdminApolloClient } from "../../lib/adminClient";

export const ProtectedRoute = () => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [client, setClient] = useState<ApolloClient<any> | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthChange((currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	useEffect(() => {
		if (user) {
			createAdminApolloClient().then(setClient).catch(console.error);
		}
	}, [user]);

	if (loading) return <div>Loading...</div>;
	if (!user) return <Navigate to="/admin" replace />;

	if (!client) return <div>Loading admin client...</div>;

	return (
		<ApolloProvider client={client}>
			<Outlet />
		</ApolloProvider>
	);
};
