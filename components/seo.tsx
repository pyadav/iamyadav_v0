import { ArticleJsonLd, NextSeo, SocialProfileJsonLd } from "next-seo";
import { OpenGraph } from "next-seo/lib/types";
import Head from "next/head";
import { useRouter } from "next/router";
import data from "~/config/seo.json";
import { Breadcrumbs, Frontmatter } from "~/types/blog";
import { formateDate } from "~/utils/helpers";

interface SEOProps {
  title?: string;
  description?: string;
  blog?: Frontmatter;
  isBlog?: boolean;
  breadcrumbs?: Breadcrumbs;
}

const {
  author,
  image,
  siteName,
  siteUrl,
  social,
  firstName,
  lastName,
  title: defaultTitle,
  description: defaultDescription,
} = data.siteMetadata;

const socials = [
  "https://www.linkedin.com/in/osfreak",
  "https://github.com/pyadav",
  "https://twitter.com/osfreak",
  "https://dev.to/pyadav",
  "https://osfreak.medium.com",
];

export const SEO = ({
  title = defaultTitle,
  isBlog,
  blog,
  description,
  breadcrumbs,
}: SEOProps) => {
  const router = useRouter();
  const url = siteUrl.concat(router.asPath);
  const ogImage = {
    url: `https://iamyadav.com/api/og?title=${encodeURI(title)}`,
    alt: title,
  };
  const ogImages = blog?.ogImage
    ? [
        {
          url: siteUrl.concat(blog?.ogImage),
          title: title,
        },
        ogImage,
      ]
    : [ogImage];
  description = description || defaultDescription;

  const seo = {
    title: title || defaultTitle,
    description: blog?.description || blog?.excerpt || description,
    image: blog?.ogImage ? `${siteUrl + blog?.ogImage}` : ogImage.url,
    url: `${siteUrl}`,
  };

  const openGraph: OpenGraph = {
    title,
    url,
    type: "website",
    site_name: siteName,
    images: ogImages,
    locale: router.locale,
    profile: {
      firstName,
      lastName,
      gender: "male",
    },
  };

  const blogOpenGraph: OpenGraph = {
    type: "article",
    article: {
      section: "Technology",
      publishedTime: formateDate(blog?.publishedAt),
      modifiedTime: formateDate(blog?.updatedAt),
      authors: [author],
    },
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
      </Head>

      <NextSeo
        title={seo.title}
        defaultTitle="Home"
        titleTemplate="%s | iamyadav"
        description={seo.description}
        canonical={url}
        openGraph={isBlog ? { ...openGraph, ...blogOpenGraph } : openGraph}
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
        ]}
      />
      <SocialProfileJsonLd
        name={author}
        type="Person"
        url={url}
        sameAs={Object.values(socials)}
      />
      {isBlog && (
        <ArticleJsonLd
          url={url}
          title={title}
          authorName={author}
          datePublished={formateDate(blog?.publishedAt)}
          dateModified={formateDate(blog?.updatedAt)}
          description={seo.description}
          images={[siteUrl + blog?.ogImage, ogImage.url]}
          publisherLogo={siteUrl + image}
          publisherName={siteName}
        />
      )}
    </>
  );
};
