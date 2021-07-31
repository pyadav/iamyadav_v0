import React from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";

import { Layout, Bio } from "@components/index";
import { SEO } from "@components/SEO";
import clsx from "clsx";
import { paths, regexes } from "@utils/constants";
import { getFileSlugs, getAllPosts } from "@utils/posts";
import { getMdxBySlug } from "@utils/mdx";

import components from "@components/MDXComponents";
import { TOC } from "@components/TOC";
import { Post } from "types/post";

export default function PostPage({ code, frontmatter }: Post) {
  const MDXComponent = React.useMemo(() => getMDXComponent(code), [code]);

  const description = frontmatter.description || frontmatter.excerpt;
  return (
    <Layout>
      <SEO
        blog
        title={frontmatter.title}
        description={description}
        ogImage={frontmatter.seoImage}
      />
      <div
        className={clsx("relative flex justify-between mt-12 mb-12", {
          "xl:flex-row-reverse": Boolean(frontmatter.toc),
          "xl:-mr-80": Boolean(frontmatter.toc),
        })}
      >
        {frontmatter.toc && (
          <aside className="sticky hidden h-screen max-w-sm mt-8 ml-8 top-16 xl:block">
            <TOC />
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
            {frontmatter.seoImage && (
              <Image
                alt="blog header"
                src={frontmatter.seoImage}
                width={1920}
                height={900}
                quality={100}
                priority={true}
                placeholder="blur"
                blurDataURL={frontmatter.seoImage}
              />
            )}
          </header>
          <div className="max-w-3xl mb-4 prose dark:prose-dark">
            <MDXComponent components={components} />
          </div>

          <hr className="mt-4" />
          <footer>
            <Bio className="mt-8 mb-16" />
          </footer>
        </article>
      </div>
    </Layout>
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
