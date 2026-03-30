// src/apollo/adminClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../components/auth/firebase";

export const db = getFirestore(app);

async function getAdminToken() {
	const snap = await getDoc(doc(db, "Key", "vercel_admin"));
	if (snap.exists()) {
		return snap.data().token; // field in Firestore
	}
	throw new Error("Admin token not found in Firestore");
}

export async function createAdminApolloClient() {
	const token = await getAdminToken();
	return new ApolloClient({
		link: new HttpLink({
			uri: import.meta.env.VITE_API_URL,
			headers: { Authorization: `Bearer ${token}` },
		}),
		cache: new InMemoryCache(),
		defaultOptions: {
			watchQuery: {
				fetchPolicy: "cache-and-network",
				nextFetchPolicy: "cache-first",
			},
		},
	});
}
