import Head from "next/head";

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
    <Head>
      <title>{seo.title}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content={seo.title} />
      <meta name="og:title" property="og:title" content={title} />
      <meta
        name="og:description"
        property="og:description"
        content={seo.description}
      />
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={seo.description} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={social.twitter} />

      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Head>
  );
};
