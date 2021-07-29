import { GetStaticProps } from "next";
import Link from "next/link";

import { Layout, Bio, SEO } from "@components/index";
import { getAllPosts } from "@utils/posts";

type Props = {
  posts: any;
};

const Home: React.FC<Props> = ({ posts }: Props) => {
  return (
    <Layout>
      <SEO title="Praveen Yadav" />
      <Bio className="my-14" />
      {posts.map(
        ({
          frontmatter: { title, createdAt, slug, discription, excerpt },
        }: any) => (
          <article key={slug}>
            <header className="mb-2">
              <h3 className="mb-2">
                <Link href={"/post/[...slug]"} as={`/post/${slug}`}>
                  <a className="text-3xl font-bold text-purple-700 dark:text-pink-700 font-display">
                    {title}
                  </a>
                </Link>
              </h3>
              <span className="text-sm">{createdAt}</span>
            </header>
            <section>
              <p className="mb-8">{discription || excerpt}</p>
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
