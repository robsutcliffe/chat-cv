import * as React from "react";
import Head from 'next/head'
import type { AppProps } from "next/app";
import "../styles/global.css"

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?IBM+Plex+Sans+Condensed:wght@500;800&display=swap" rel="stylesheet" />
            </Head>
            <Component {...pageProps} />
        </>

    );
};

export default MyApp;
