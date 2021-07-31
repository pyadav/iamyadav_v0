import { GetStaticProps } from "next";
import Link from "next/link";

import { Layout, Bio } from "@components/index";
import { SEO } from "@components/SEO";
import { getAllPosts } from "@utils/posts";
import { Post } from "types/post";

type Props = {
  posts: Post[];
};

const Home: React.FC<Props> = ({ posts }: Props) => {
  return (
    <Layout>
      <SEO title="Praveen Yadav" />
      <Bio className="my-14" />
      {posts.map(
        ({
          frontmatter: {
            slug,
            title,
            description,
            publishedAt,
            updatedAt,
            excerpt,
            readingTime,
          },
        }: Post) => (
          <article key={slug}>
            <header className="mb-2">
              <h3 className="mb-2">
                <Link href={"/post/[...slug]"} as={`/post/${slug}`}>
                  <a className="text-3xl font-bold text-purple-700 dark:text-pink-700 font-display">
                    {title}
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
  const posts = await getAllPosts();
  return { props: { posts } };
};

export default Home;
