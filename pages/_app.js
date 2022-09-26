import {ChakraProvider} from '@chakra-ui/react'
import theme from "../utils/theme";
import Head from "next/head";
import Script from "next/script";

function MyApp({Component, pageProps}) {
    return (
        <ChakraProvider theme={theme}>
            <Script async defer data-website-id="d9fda726-51ca-4d2a-85d8-60afdb5e1790" src="https://analytics.kastelapp.com/umami.js"></Script>
            <Head>
                <title>Kastel - Coming Soon</title>
                <meta property="og:title" content={'Kastel - Coming Soon'} key="title"/>
                <meta property="og:url" content={'https://kastelapp.com'}/>
            </Head>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default MyApp