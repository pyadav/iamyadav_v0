import Head from "next/head";
import { NextSeo, SocialProfileJsonLd, ArticleJsonLd } from "next-seo";
import { useRouter } from "next/router";
import { OpenGraph } from "next-seo/lib/types";
import data from "config/seo.json";
import { Frontmatter } from "types/post";
import { formateDate } from "utils/helpers";

interface SEOProps {
  title?: string;
  post?: Frontmatter;
  isPost?: boolean;
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

export const Seo = ({ title = defaultTitle, isPost, post }: SEOProps) => {
  const router = useRouter();
  const url = siteUrl + router.asPath;
  const ogImage = {
    url: `https://cdn.statically.io/og/theme=dark/${encodeURI(title)}.png`,
    alt: title,
  };
  const ogImages = post?.ogImage
    ? [
        {
          url: siteUrl + post?.ogImage,
          title: title,
        },
        ogImage,
      ]
    : [ogImage];

  const seo = {
    title: title || defaultTitle,
    description: post?.description || post?.excerpt || defaultDescription,
    image: `${isPost ? `${siteUrl + post?.ogImage}` : ogImage}`,
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

  const postOpenGraph: OpenGraph = {
    type: "article",
    article: {
      section: "Technology",
      publishedTime: formateDate(post?.publishedAt),
      modifiedTime: formateDate(post?.updatedAt),
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
        description={seo.description}
        canonical={url}
        openGraph={isPost ? { ...openGraph, ...postOpenGraph } : openGraph}
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
        type="person"
        url={url}
        sameAs={Object.values(socials)}
      />
      {isPost && (
        <ArticleJsonLd
          authorName={author}
          datePublished={formateDate(post?.publishedAt)}
          dateModified={formateDate(post?.updatedAt)}
          description={seo.description}
          images={[siteUrl + post?.ogImage, ogImage.url]}
          publisherLogo={siteUrl + image}
          publisherName={siteName}
          title={title}
          url={url}
        />
      )}
    </>
  );
};
