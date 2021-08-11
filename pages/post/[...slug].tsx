import React from "react";
import { NextSeo } from "next-seo";

import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";

import clsx from "clsx";
import { paths, regexes } from "utils/constants";
import { getFileSlugs, getAllPosts } from "utils/posts";
import { getMdxBySlug } from "utils/mdx";

import { BlogLayout } from "src/layout";
import { Bio } from "src/components/Bio";
import { Seo } from "src/components/Seo";
import { Comment } from "src/components/Comment";
import { Toc } from "src/components/Toc";
import components from "src/components/MDX/MDX";
import { Post } from "types/post";

export default function PostPage({ code, frontmatter }: Post) {
  const MDXComponent = React.useMemo(() => getMDXComponent(code), [code]);

  const seo = {
    title: frontmatter.title,
    ogImage: frontmatter.ogImage,
    description: frontmatter.description || frontmatter.excerpt,
    canonical: `https://iamyadav.com/post/${frontmatter.slug}`,
  };
  return (
    <BlogLayout>
      <Seo
        blog
        title={seo.title}
        ogImage={seo.ogImage}
        description={seo.description}
      />
      <NextSeo
        canonical={seo.canonical}
        openGraph={{
          url: seo.canonical,
          type: "article",
          article: {
            publishedTime: frontmatter.publishedAt,
            authors: ["https://iamyadav.com"],
            tags: frontmatter.tags,
          },
        }}
        twitter={{
          site: seo.canonical,
        }}
      />
      <div
        className={clsx("relative flex justify-between mt-12 mb-12", {
          "xl:flex-row-reverse": Boolean(frontmatter.toc),
          "xl:-mr-48": Boolean(frontmatter.toc),
        })}
      >
        {frontmatter.toc && (
          <aside className="sticky hidden h-screen max-w-sm mt-8 ml-8 top-16 xl:block">
            <Toc />
          </aside>
        )}
        <article className="max-w-3xl min-w-0 text-base lg:text-lg text-fore-subtle">
          <header className="mb-8">
            <h1 className="mb-2 text-4xl font-black leading-none lg:text-5xl font-display">
              {frontmatter.title}
            </h1>
            <div className="mb-10 text-sm tracking-normal text-fore-subtle">
              <time>{frontmatter.publishedAt}</time>
              <span> • </span>
              <span className="font-bold">{frontmatter.readingTime?.text}</span>
              {frontmatter.updatedAt && (
                <>
                  <span> • </span>
                  <span className="italic">
                    Last updated: <time>{frontmatter.updatedAt}</time>
                  </span>
                </>
              )}
            </div>
            {frontmatter.ogImage && (
              <Image
                alt="blog header"
                src={frontmatter.ogImage}
                width={1920}
                height={900}
                quality={100}
                priority={true}
                placeholder="blur"
                blurDataURL={frontmatter.ogImage}
              />
            )}
          </header>
          <div className="max-w-3xl mb-8 prose dark:prose-dark">
            <MDXComponent components={components} />
          </div>

          <Comment />

          <hr className="mt-4" />
          <footer>
            <Bio className="mt-8 mb-16" />
          </footer>
        </article>
      </div>
    </BlogLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  try {
    const post = await getMdxBySlug(params.slug.join("/"));
    const posts = await getAllPosts();

    return {
      props: {
        ...post,
        nextPost:
          posts.find((p: any) => p.nextPost === post.frontmatter.slug)
            ?.frontmatter.slug || null,
        previousPost:
          posts.find((p: any) => p.previousPost === post.frontmatter.slug)
            ?.frontmatter.slug || null,
      },
    };
  } catch (e) {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const filePaths = getFileSlugs(paths.posts, regexes.contentPosts)
    // Remove file extensions for page paths.
    .map((path) => path.replace(regexes.mdx, ""))
    // Map the path into the static paths object required by Next.js
    // "slug" is declares as a catch-all route in the file system
    // so it needs to be an array.
    .map((slug) => ({ params: { slug: slug.split("/") } }));

  return {
    fallback: false,
    paths: filePaths,
  };
};
