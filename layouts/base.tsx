import { Josefin_Sans } from "next/font/google";
import Head from "next/head";
import React from "react";
import Footer from "~/components/footer";
import Header from "~/components/header";

const josefin = Josefin_Sans({
  style: ["normal"],
  subsets: ["latin"],
});

type Props = {
  children?: React.ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --josefin-font: ${josefin.style.fontFamily};
          }
        `}
      </style>

      <Head>
        <title>iamyadav.com</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={`${josefin.className} min-h-screen mx-auto max-w-5xl flex flex-col w-full`}
      >
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6">
          {children}
        </main>
        <Footer />
      </main>
    </>
  );
};

export default Layout;
