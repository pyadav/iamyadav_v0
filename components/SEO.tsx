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

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      </Head>

      <NextSeo
        title={seo.title}
        description={seo.description}
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
            property: "og:image",
            content: seo.image,
          },
        ]}
      />
    </>
  );
};
