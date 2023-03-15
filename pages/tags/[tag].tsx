import { GetStaticPaths, GetStaticProps } from "next";

import { BlogCard } from "~/components/blog/card";
import { SEO } from "~/components/seo";
import Layout from "~/layouts/base";
import { Frontmatter } from "~/types/blog";
import {
  getAllBlogsFrontmatter,
  getAllTags,
  getBlogsByTag,
} from "~/utils/blogs";

interface TagProps {
  blogs: Frontmatter[];
  tag: string;
  tags: string[];
}
const Home: React.FC<TagProps> = ({ blogs, tag, tags }) => {
  return (
    <Layout>
      <SEO
        title={tag}
        description={`All posts on Peaveen Yadav's blog that are tagged with the ${tag} tag.`}
      />

      <h1 className="mt-32 text-3xl font-bold text-gray-800 md:mb-20 md:text-4xl md:leading-snug dark:text-white md:mt-20">
        Posts tagged with: {tag}
      </h1>
      {blogs.map((blog) => (
        <BlogCard key={blog.slug} {...blog} />
      ))}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = await getAllBlogsFrontmatter();
  const filePaths = getAllTags(blogs).map((tag) => ({ params: { tag } }));

  return {
    fallback: false,
    paths: filePaths,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params: { tag },
}: any) => {
  const blogs = await getAllBlogsFrontmatter();
  const blogsByTag = getBlogsByTag(blogs, tag);

  const tags = getAllTags(blogs)
    // Remove the current tag from the list of all other tags.
    .filter((t) => t !== tag)
    .sort((a, b) => (a > b ? 1 : -1));

  try {
    return {
      props: {
        blogs: blogsByTag,
        tag,
        tags: tags,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export default Home;
