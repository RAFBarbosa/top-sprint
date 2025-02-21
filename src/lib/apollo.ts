// import { ApolloClient, InMemoryCache } from "@apollo/client";

// export const client = new ApolloClient({
// 	uri: import.meta.env.VITE_API_URL,
// 	headers: {
// 		Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
// 	},
// 	cache: new InMemoryCache(),
// });

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

// Create an upload link for file uploads
const uploadLink = createUploadLink({
	uri: import.meta.env.VITE_API_URL, // Your GraphQL endpoint
	headers: {
		Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
	},
});

// Create the Apollo Client instance
export const client = new ApolloClient({
	link: uploadLink, // Use the upload link
	cache: new InMemoryCache(),
});
