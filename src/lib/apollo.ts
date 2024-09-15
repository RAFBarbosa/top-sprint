import { ApolloClient, InMemoryCache } from "@apollo/client";

console.log("API URL:", import.meta.env.VITE_API_URL);
console.log("API Access Token:", import.meta.env.VITE_API_ACCESS_TOKEN);

export const client = new ApolloClient({
	uri: import.meta.env.VITE_API_URL,
	headers: {
		Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
	},
	cache: new InMemoryCache(),
});
