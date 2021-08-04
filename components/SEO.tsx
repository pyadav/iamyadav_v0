import Head from "next/head";
import { NextSeo } from "next-seo";
import data from "@config/seo.json";

interface SEOProps {
  title?: string;
  description?: string;
  blog?: boolean;
  ogImage?: string;
}

export const SEO = ({ title, description, blog, ogImage }: SEOProps) => {
  const {
    author,
    image,
    siteUrl,
    social,
    title: defaultTitle,
    description: defaultDescription,
  } = data.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${blog ? ogImage : image}`,
    url: `${siteUrl}`,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "Website",
    url: seo.url,
    name: seo.title,
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author,
    url: siteUrl,
    jobTitle: "Product Engineer",
    gender: "male",
    sameAs: [
      "https://www.linkedin.com/in/osfreak",
      "https://github.com/pyadav",
      "https://twitter.com/osfreak",
      "https://dev.to/pyadav",
      "https://osfreak.medium.com",
    ],
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed for iamyadav.com"
          href={`${siteUrl}/rss.xml`}
        ></link>

        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      </Head>

      <NextSeo
        title={seo.title}
        description={seo.description}
        canonical={siteUrl}
        openGraph={{
          type: "website",
          url: seo.url,
          title: seo.title,
          site_name: seo.title,
          description: seo.description,
        }}
        twitter={{
          handle: social.twitter,
          site: seo.url,
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            name: "image",
            content: seo.image,
          },
          {
            name: "HandheldFriendly",
            content: "true",
          },
          {
            property: "og:image",
            content: seo.image,
          },
        ]}
      />
    </>
  );
};
