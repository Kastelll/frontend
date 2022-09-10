import NextDocument, {Head, Html, Main, NextScript} from 'next/document'
import {ColorModeScript} from "@chakra-ui/react";
import Script from "next/script";

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang='en'>
                <Head>
                    <Script strategy="beforeInteractive" id="loadtheme" dangerouslySetInnerHTML={{
                        __html: `(function setScript(initialValue) {
                        var mql = window.matchMedia("(prefers-color-scheme: dark)");
                        var systemPreference = mql.matches ? "dark" : "light";
                        var persistedPreference;
                        try {
                        persistedPreference = localStorage.getItem("chakra-ui-color-mode");
                    } catch (error) {
                        console.log("Chakra UI: localStorage is not available. Color mode persistence might not work as expected");
                    }
                        var isInStorage = typeof persistedPreference === "string";
                        var colorMode;
                        if (isInStorage) {
                        colorMode = persistedPreference;
                    } else {
                        colorMode = initialValue === "system" ? systemPreference : initialValue;
                    }
                        if (colorMode) {
                        var root = document.documentElement;
                        root.style.setProperty("--chakra-ui-color-mode", 'dark);
                    }
                    })('dark')`
                    }}
                    />
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