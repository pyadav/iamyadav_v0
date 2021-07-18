import React from "react";
import NextImage from "next/image";

import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths, GetStaticProps } from "next";

import { Layout, Bio, SEO } from "@components/index";
import { paths, regexes } from "@utils/constants";
import { getFileSlugs } from "@utils/posts";
import { getMdxBySlug } from "@utils/mdx";

import components from "@components/MDXPostComponents";

export default function PostPage({ code, frontmatter }: any) {
  const MDXComponent = React.useMemo(() => getMDXComponent(code), [code]);

  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description} />

      <article>
        <header className="mb-8">
          <h1 className="mb-2 text-4xl font-black leading-none font-display">
            {frontmatter.title}
          </h1>
          <p className="text-sm">{frontmatter.date}</p>
          <div className="mt-10 overflow-hidden rounded-2xl text-[0px]">
            <NextImage
              src={"/assets/mdx.png"}
              width={1920}
              height={900}
              placeholder="blur"
              blurDataURL={"/assets/mdx.png"}
            />
          </div>
        </header>
        <div className="mb-4 prose dark:prose-dark">
          <MDXComponent components={components} />
        </div>
        <hr className="mt-4" />
        <footer>
          <Bio className="mt-8 mb-16" />
        </footer>
      </article>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  try {
    const data = await getMdxBySlug(params.slug.join("/"));
    const { code, frontmatter } = data;
    return {
      props: {
        code,
        frontmatter,
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
