import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

interface IDocumentProps {
  styleTags: React.ReactElement[];
}

export default class MyDocument extends Document<IDocumentProps> {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" type="image/png" />
          <link rel="apple-touch-icon" href="/favicon.ico" />
          <link
            href="https://unpkg.com/prism-theme-night-owl@1.4.0/build/style.css"
            rel="stylesheet"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
