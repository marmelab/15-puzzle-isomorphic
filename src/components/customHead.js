import React from 'react';
import Head from 'next/head';

const CustomHead = () => (
    <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>15 Puzzle Isomorphic!</title>
        <link
            rel="icon"
            type="image/x-icon"
            href="/static/images/favicon.ico"
        />
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css"
        />
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link href="/static/styles/main.css" rel="stylesheet" />
        <link href="/static/styles/puzzle.css" rel="stylesheet" />
    </Head>
);

export default CustomHead;
