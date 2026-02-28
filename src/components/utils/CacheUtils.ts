import { ApolloCache } from "@apollo/client";
import { GetDriversRegistrationDocument } from "../../graphql/generated";
// import other documents as needed

export const addToCache = <T extends { id: string }>(
	cache: ApolloCache<any>,
	document: any,
	variables: Record<string, any>,
	listKey: string,
	newItem: T,
) => {
	const existing = cache.readQuery({ query: document, variables });
	if (!existing) return;
	cache.writeQuery({
		query: document,
		variables,
		data: {
			[listKey]: [newItem, ...existing[listKey]],
		},
	});
};
