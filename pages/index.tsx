import { GetStaticProps } from "next";
import Link from "next/link";

import { Layout, Bio, SEO } from "@components/index";
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
          frontmatter: { title, publishedAt, slug, description, excerpt },
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
              <span className="text-sm">{publishedAt}</span>
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
