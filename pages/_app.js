import {ChakraProvider} from '@chakra-ui/react'
import theme from "../utils/theme";
import Head from "next/head";

function MyApp({Component, pageProps}) {
    return (
        <ChakraProvider theme={theme}>
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