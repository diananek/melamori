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
import Script from 'next/script'
import {GTM_ID, pageView} from "../lib/utils/gtm";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {Modal} from "../components/reboot/Modal";

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
    const router = useRouter()
    useEffect(() => {
        router.events.on('routeChangeComplete', pageView)
        return () => {
            router.events.off('routeChangeComplete', pageView)
        }
    }, [router.events])

    return (
        <>
            {/* Google Tag Manager - Global base code */}
            <Script
                id={'gtm'}
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
                }}
            />
            <GeneralCtx props={{main: {sub_data}}}>
                <Modal>
                    <ApolloProvider client={apolloClient}>
                        <Component {...pageProps} />
                    </ApolloProvider>
                </Modal>
            </GeneralCtx>
        </>

    )

}

const client = initializeApollo();

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);

    const sub_data = (await client.query({
        query: GET_META,
        fetchPolicy: 'network-only',
        ssrMode: true,
    })).data

    return {
        ...appProps,
        sub_data
    }
}


export default MyApp
