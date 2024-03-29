import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import clsx from "clsx";

import { Bio } from "~/components/blog/bio";
import components from "~/components/blog/MDX";
import { Tag } from "~/components/blog/tag";
import { Toc } from "~/components/blog/toc";
import ViewCounter from "~/components/blog/view";
import { SEO } from "~/components/seo";
import data from "~/config/seo.json";
import NotifyWithoutIcon from "~/icons/notifywithouticon";
import { BlogLayout } from "~/layouts/blog";
import { Blog } from "~/types/blog";
import { getAllBlogs, getFileSlugs } from "~/utils/blogs";
import { paths, regexes } from "~/utils/constants";
import { getMdxBySlug } from "~/utils/mdx";

export default function BlogPage({
  code,
  frontmatter,
  previousBlog,
  nextBlog,
}: Blog) {
  const MDXComponent = React.useMemo(() => getMDXComponent(code), [code]);
  const { siteUrl } = data.siteMetadata;
  const seo = {
    title: frontmatter.title,
    subtitle: frontmatter.subtitle,
    ogImage: frontmatter.ogImage,
    description: frontmatter.description || frontmatter.excerpt,
  };

  const breadcrumbs = [
    {
      name: "Home",
      item: siteUrl,
    },
    {
      name: "Blogs",
      item: siteUrl + "/blogs",
    },
    {
      name: frontmatter.title,
    },
  ];
  return (
    <BlogLayout>
      <SEO
        isBlog
        blog={frontmatter}
        breadcrumbs={breadcrumbs}
        title={`${seo.title} ${seo.subtitle ? `${seo.subtitle}` : ""}`}
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
            <NotifyWithoutIcon />
          </aside>
        )}
        <article className="max-w-3xl min-w-0 text-base lg:text-lg text-fore-subtle">
          <header className="mb-8">
            <h1 className="mb-4 text-4xl font-black leading-none lg:text-5xl font-display">
              {frontmatter.title}
            </h1>
            <h1 className="mb-2 text-4xl font-black leading-none lg:text-5xl font-display">
              {frontmatter.subtitle}
            </h1>
            <div className="mb-10 text-sm tracking-normal text-fore-subtle">
              <time>
                {new Date(frontmatter.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <span> • </span>
              <span className="font-bold">{frontmatter.readingTime?.text}</span>
              {frontmatter.updatedAt && (
                <>
                  <span> • </span>
                  <span className="italic">
                    Last updated:{" "}
                    <time>
                      {new Date(frontmatter.updatedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </time>
                  </span>
                </>
              )}
              <span> • </span>
              <ViewCounter slug={frontmatter.slug} trackView />
              {frontmatter.tags.map((tag: any, id: any) => (
                <Tag key={id} tag={tag} />
              ))}
            </div>
            {frontmatter.ogImage && (
              <Image
                alt="blog header"
                src={frontmatter.ogImage}
                width={1200}
                height={628}
                quality={100}
                priority={true}
                placeholder="blur"
                blurDataURL={frontmatter.ogImage}
              />
            )}
          </header>

          <div className="max-w-3xl mb-8 prose dark:prose-invert">
            <MDXComponent components={components} />
          </div>
          <div className="pt-6 pb-8 space-y-2 md:space-y-5">
            <nav className="flex justify-between">
              {previousBlog?.slug ? (
                <div>
                  <h6>Previous post</h6>
                  <div className="font-medium text-purple-500 transition-colors dark:text-yellow-500 hover:text-purple-700 dark:hover:text-yellow-700">
                    <Link href={`/blogs/${previousBlog.slug}`}>
                      {previousBlog.title}
                    </Link>
                  </div>
                </div>
              ) : (
                <span />
              )}
              {nextBlog?.slug ? (
                <div>
                  <h6>Next post</h6>
                  <div className="font-medium text-purple-500 transition-colors dark:text-yellow-500 hover:text-purple-700 dark:hover:text-yellow-700">
                    <Link href={`/blogs/${nextBlog.slug}`}>
                      {nextBlog.title}
                    </Link>
                  </div>
                </div>
              ) : (
                <span />
              )}
            </nav>
          </div>
          <div className="pt-4 xl:pt-8">
            <Link href="/blogs">
              <span className="cursor-pointer text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                &larr; Back to the blogs
              </span>
            </Link>
          </div>

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
    const blog = await getMdxBySlug(params.slug.join("/"));
    const blogs = await getAllBlogs();

    return {
      props: {
        ...blog,
        nextBlog:
          blogs.find((p: any) => p.nextBlog === blog.frontmatter.slug)
            ?.frontmatter || null,
        previousBlog:
          blogs.find((p: any) => p.previousBlog === blog.frontmatter.slug)
            ?.frontmatter || null,
      },
    };
  } catch (e) {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const filePaths = getFileSlugs(paths.blogs, regexes.contentBlogs)
    // Remove file extensions for page paths.
    .map((path: string) => path.replace(regexes.mdx, ""))
    // Map the path into the static paths object required by Next.js
    // "slug" is declares as a catch-all route in the file system
    // so it needs to be an array.
    .map((slug: string) => ({ params: { slug: slug.split("/") } }));

  return {
    fallback: false,
    paths: filePaths,
  };
};
