import NextDocument, {Head, Html, Main, NextScript} from 'next/document'
import {ColorModeScript} from "@chakra-ui/react";
import Script from "next/script";

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang='en'>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                <ColorModeScript/>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}