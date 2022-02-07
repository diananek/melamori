import '../styles/null.css'
import "../styles/scss/base.scss"
import "../styles/scss/basket.scss"
import "../styles/scss/error.scss"
import "../styles/scss/cookie.scss"
import "../styles/scss/thanks.scss"
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: "https://service.melamori-mebel.ru/graphql",
    cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps }) {
  return(
      <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
      </ApolloProvider>
      )

}

export default MyApp