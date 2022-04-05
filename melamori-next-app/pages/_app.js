import '../styles/null.css'
import "../styles/scss/base.scss"
import "../styles/scss/basket.scss"
import "../styles/scss/error.scss"
import "../styles/scss/cookie.scss"
import "../styles/scss/thanks.scss"
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import {offsetLimitPagination} from "@apollo/client/utilities";
import {GeneralCtx} from "../components/reboot/GeneralCtx";
import App from "next/app";
import {initializeApollo} from "../lib/ssr/apollo";
import GET_META from "../graphql/schemas/getMeta.graphql";

const apolloClient = new ApolloClient({
    uri: "https://service.melamori-mebel.ru/graphql",
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    feed:
                        offsetLimitPagination()
                },
            },
        },
    }),
})

function MyApp({Component, pageProps, sub_data}) {

    // console.log(sub_data)

    return (
        <GeneralCtx props={{main: {sub_data}}}>

            <ApolloProvider client={apolloClient}>
                <Component {...pageProps} />
            </ApolloProvider>
        </GeneralCtx>
    )

}

const client = initializeApollo();

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);

    const sub_data = (await client.query({
        query: GET_META,
    })).data

    return {
        ...appProps,
        sub_data
    }
}


export default MyApp
