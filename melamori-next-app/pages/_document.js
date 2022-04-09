import Document, {Html, Head, Main, NextScript} from 'next/document'
import {GTM_ID} from "../lib/utils/gtm";

export default class MyDocument extends Document {

    render() {
        // noinspection HtmlRequiredTitleElement
        return (
            <Html lang="ru">
                <Head>
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap"
                          rel="stylesheet"/>
                </Head>
                <body>
                <noscript>
                    <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>
                <Main/>
                <NextScript/>
                {/* eslint-disable @next/next/no-sync-scripts */}
                {/*<script src="static/js/productCard/ProductCardItem.js"/>*/}
                {/*<script src="/static/js/cookieConsent.js"/>*/}
                {/*<script src={"https://code.jquery.com/jquery-3.6.0.min.js"} />*/}
                {/*<script src="/static/js/dynamic-adapt.js"/>*/}
                {/*<script src="/static/js/script.js"/>*/}
                {/*<script src="/static/js/main.js"/>*/}
                </body>
            </Html>
        )
    }
}
