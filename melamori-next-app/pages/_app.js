import '../styles/null.css'
import "../styles/scss/base.scss"
import "../styles/scss/basket.scss"
import "../styles/scss/error.scss"
import "../styles/scss/cookie.scss"
import "../styles/scss/thanks.scss"
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import {offsetLimitPagination} from "@apollo/client/utilities";
// import {AppWrapper} from "../context/state";

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

function MyApp({ Component, pageProps }) {
  return(
      // <AppWrapper>
          <ApolloProvider client={apolloClient}>
              <Component {...pageProps} />
          </ApolloProvider>
      // </AppWrapper>
      )

}

export default MyApp
