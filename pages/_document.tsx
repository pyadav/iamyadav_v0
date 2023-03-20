import { Head, Html, Main, NextScript } from "next/document";
import { GA } from "~/components/ga";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link
          href="https://unpkg.com/prism-theme-night-owl@1.4.0/build/style.css"
          rel="stylesheet"
        />
        {process.env.NODE_ENV === "production" && <GA />}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
