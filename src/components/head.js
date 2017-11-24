import React from 'react';
import Head from 'next/head';

export default function CustomHead() {
    return (
        <Head>
            <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <title>15 Puzzle Isomorphic!</title>
            <link href="/static/styles/main.css" rel="stylesheet" />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <link rel="stylesheet" href="/statics/styles.css" />
        </Head>
    );
}
