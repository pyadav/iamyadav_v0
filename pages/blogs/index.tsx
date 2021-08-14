import { GetStaticProps } from "next";
import Link from "next/link";

import { Layout } from "src/layout";
import { Seo } from "src/components/Seo";
import { getAllBlogs } from "utils/blogs";
import { Blog } from "types/blog";

type Props = {
  blogs: Blog[];
};

const Home: React.FC<Props> = ({ blogs }: Props) => {
  return (
    <Layout>
      <Seo title="Praveen Yadav's blogs" />
      <h1 className="mt-32 text-4xl font-bold text-gray-800 md:text-5xl md:leading-snug dark:text-white md:mt-20">
        Blog lists
      </h1>
      <p className="mb-32 md:mb-20">
        Here are some of my thoughts and musings about programming and software
        development.
      </p>
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
                <Link href={"/blogs/[...slug]"} as={`/blogs/${slug}`}>
                  <a className="text-3xl font-bold text-purple-700 dark:text-yellow-700 font-display">
                    {`${title} ${subtitle ? subtitle : ""}`}
                  </a>
                </Link>
              </h3>
              <div className="mb-4 text-sm tracking-normal text-fore-subtle">
                <time>{publishedAt}</time>
                <span> • </span>
                <span className="font-bold">{readingTime?.text}</span>
              </div>
            </header>
            <section>
              <p className="mb-8">{description || excerpt}</p>
            </section>
          </article>
        ),
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await getAllBlogs();
  return { props: { blogs } };
};

export default Home;
