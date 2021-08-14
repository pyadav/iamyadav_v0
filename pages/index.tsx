import React from "react";
import { GetStaticProps } from "next";
import { Layout } from "src/layout";
import { Seo } from "src/components/Seo";
import { getAllBlogs } from "utils/blogs";

import { Blog } from "types/blog";
import { BlogCard } from "src/components/BlogCard/BlogCard";

type Props = {
  blogs: Blog[];
};

const Home: React.FC<Props> = ({ blogs }: Props) => {
  return (
    <Layout>
      <Seo title="Praveen Yadav's blog" />
      <h1 className="mt-32 mb-32 text-4xl font-bold text-center text-gray-800 md:text-5xl md:leading-snug dark:text-white md:mt-20 md:mb-20">
        Resources to help you <br />
        make more versatile developer
      </h1>
      {blogs.map((blog) => (
        <BlogCard key={blog.frontmatter.slug} {...blog} />
      ))}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await getAllBlogs();
  return { props: { blogs } };
};

export default Home;
