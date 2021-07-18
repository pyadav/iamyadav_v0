import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { Layout } from "@components/index";

function NotFound() {
  return (
    <Layout>
      <NextSeo title="404 Not Found — praveen yadav" />
      <div className="max-w-sm py-16 mx-auto space-y-5">
        <h1 className="text-6xl font-bold text-center">404</h1>
        <p className="text-gray-700 dark:text-gray-300">
          You appear to have lost your way. Double check the URL or head back to
          the homepage.
        </p>
        <Image
          src="/assets/planet.svg"
          alt="Page not found"
          width={400}
          height={235}
        />
        <Link href="/">
          <a className="flex items-center justify-center w-full px-6 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800">
            Go home
          </a>
        </Link>
      </div>
    </Layout>
  );
}

export default NotFound;
