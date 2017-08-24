import React from 'react';
import Document, {Head, Main, NextScript} from 'next/document';
import {getContext, setContext} from '../styles/context';

class MyDocument extends Document {
    static getInitialProps(ctx) {
        // Resolution order
        //
        // On the server:
        // 1. page.getInitialProps
        // 2. document.getInitialProps
        // 3. page.render
        // 4. document.render
        //
        // On the server with error:
        // 2. document.getInitialProps
        // 3. page.render
        // 4. document.render
        //
        // On the client
        // 1. page.getInitialProps
        // 3. page.render

        // Reset the context for handling a new request.
        setContext();
        const page = ctx.renderPage();
        // Get the context with the collected side effects.
        const context = getContext();
        return {
            ...page,
            styles: (
                <style id="jss-server-side" dangerouslySetInnerHTML={{__html: context.sheetsRegistry.toString()}} />
            ),
        };
    }

    render() {
        const context = getContext();
        return (
            <html lang="en" dir="ltr">
                <Head>
                    <title>My page</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport"
                        content="user-scalable=0, initial-scale=1, minimum-scale=1,width=device-width, height=device-height"
                    />
                    <link rel="manifest" href="/static/manifest.json" />
                    <meta name="theme-color" content={context.theme.palette.primary[500]} />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
                </Head>
                <body>
                    <Main /> <NextScript />
                </body>
            </html>
        );
    }
}

export default MyDocument;
