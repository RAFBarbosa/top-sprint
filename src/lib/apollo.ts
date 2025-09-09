import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const createClient = (token: string) =>
	new ApolloClient({
		link: createUploadLink({
			uri: import.meta.env.VITE_API_URL,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
		cache: new InMemoryCache(),
	});

export const publicClient = createClient(import.meta.env.VITE_API_PUBLIC_TOKEN);

export const adminClient = createClient(import.meta.env.VITE_API_ADMIN_TOKEN);
