import { ApolloCache } from "@apollo/client";

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

export default addToCache;
