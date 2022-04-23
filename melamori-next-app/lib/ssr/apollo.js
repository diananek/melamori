import {ApolloClient, createHttpLink, from, InMemoryCache} from "@apollo/client";
import {isEqual, merge} from "lodash";
import {useMemo} from "react";
import {RetryLink} from "@apollo/client/link/retry";

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';


let apolloClient;


const linkCascade = () => createHttpLink({uri: 'https://service.melamori-mebel.ru/graphql'})


export const createApolloClient = () => new ApolloClient({
    link: from([
        new RetryLink(),
        linkCascade()
    ]),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    // events: relayStylePagination(),
                },
            },
        },
    }),
});

export const createSysClient = (token) => new ApolloClient({
    link: from([
        new RetryLink(),
        createHttpLink({uri: 'https://service.melamori-mebel.ru/graphql', headers: {"Authorization": `Bearer ${token}`}}),
    ]),
    cache: new InMemoryCache(),
});



export const initializeApollo = (initialState = null, token = null) => {
    // @ts-ignore
    const _apolloClient = apolloClient ?? createApolloClient(token)

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Merge the existing cache into data passed from getStaticProps/getServerSideProps
        const data = merge(initialState, existingCache, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter((d) =>
                    sourceArray.every((s) => !isEqual(d, s))),
            ],
        });

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined')
        return _apolloClient;
    // Create the Apollo Client once in the client
    // @ts-ignore
    if (!apolloClient)
        apolloClient = _apolloClient;

    return _apolloClient;
};


export function useApollo(pageProps, token){
    const state = pageProps[APOLLO_STATE_PROP_NAME];
    return useMemo(() => initializeApollo(state, token), [state, token]);
}
