import { GetStaticProps } from "next";
import Link from "next/link";
import { SEO } from "~/components/seo";
import Notify from "~/icons/notify";
import Layout from "~/layouts/base";

import { Blog } from "~/types/blog";
import { getAllBlogs } from "~/utils/blogs";

type Props = {
  blogs: Blog[];
};

const Home: React.FC<Props> = ({ blogs }: Props) => {
  return (
    <Layout>
      <SEO title="Praveen Yadav's blogs" />

      <div className="flex justify-center text-center lg:pt-5 lg:pb-7 lg:text-left">
        <div className="flex max-w-[37rem] flex-col py-16 lg:pt-12 lg:pb-11">
          <h1 className="mt-32 text-4xl font-bold text-gray-800 md:text-5xl md:leading-snug dark:text-white md:mt-20">
            Blog lists
          </h1>
          <p className="mb-32 md:mb-20">
            Here are some of my thoughts about programming and software
            development.
          </p>
        </div>
        <div className="hidden lg:flex lg:flex-auto lg:justify-center">
          <Notify />
        </div>
      </div>

      {blogs.map(
        ({
          frontmatter: {
            slug,
            title,
            subtitle,
            description,
            publishedAt,
            updatedAt,
            excerpt,
            readingTime,
          },
        }: Blog) => (
          <article key={slug}>
            <header className="mb-2">
              <h3 className="mb-2">
                <Link
                  href={"/blogs/[...slug]"}
                  as={`/blogs/${slug}`}
                  className="text-3xl font-bold text-purple-700 dark:text-yellow-700 font-display"
                >
                  {`${title} ${subtitle ? subtitle : ""}`}
                </Link>
              </h3>
              <div className="mb-4 text-sm tracking-normal text-fore-subtle">
                <time>
                  {new Date(publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                {updatedAt && (
                  <>
                    <span> • </span>
                    <span className="italic">
                      Last updated:{" "}
                      <time>
                        {new Date(updatedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </span>
                  </>
                )}
                <span> • </span>
                <span className="font-bold">{readingTime?.text}</span>
              </div>
            </header>
            <section>
              <p className="mb-8">{description || excerpt}</p>
            </section>
          </article>
        )
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await getAllBlogs();
  return { props: { blogs } };
};

export default Home;
