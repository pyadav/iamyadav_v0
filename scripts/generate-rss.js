const fs = require("fs");
const matter = require("gray-matter");
const path = require("path");
const RSS = require("rss");

const root = process.cwd();

const typeToPath = {
  blogs: "contents/blogs",
};

function getBlogs(type) {
  const files = fs.readdirSync(path.join(root, typeToPath[type]));
  const blogs = files.reduce((allBlogs, blogSlug) => {
    const source = fs.readFileSync(
      path.join(root, typeToPath[type], blogSlug),
      "utf8"
    );
    const { data } = matter(source);
    return [
      {
        ...data,
        slug: blogSlug.replace(".mdx", ""),
      },
      ...allBlogs,
    ];
  }, []);
  return blogs;
}

const isPublished = (blog) => blog?.isPublished;
const sortByDate = (a, b) => {
  return Number(new Date(b?.publishedAt)) - Number(new Date(a?.publishedAt));
};

(async () => {
  console.info(`info - Generating RSS feed`);

  try {
    const feed = new RSS({
      title: "Praveen Yadav's Blog",
      description:
        "Hi I'm Praveen Yadav, a versatile javascript & golang developer and this is my blog. Here, I share my own experience as a developer and everything I'm learning about Golang, Typescript, React, testing and life",
      site_url: "https://iamyadav.com",
      feed_url: "https://iamyadav.com/rss.xml",
      image_url: "https://iamyadav.com/static/profile.png",
      language: "en",
    });

    const content = [...getBlogs("blogs")].filter(isPublished).sort(sortByDate);
    content.forEach((blog) => {
      const url = `https://iamyadav.com/blogs/${blog.slug}`;

      feed.item({
        title: blog.title,
        description: blog.description,
        date: new Date(blog.publishedAt),
        author: "Praveen Yadav",
        url,
        guid: url,
      });
    });

    const rss = feed.xml({ indent: true });
    fs.writeFileSync(path.join(root, "./public/rss.xml"), rss);
    console.info(`info - Generating RSS feed done`);
  } catch (error) {
    console.error(`error - An error occurred while generating the RSS feed`);
    console.error(error);
    process.exit(1);
  }
})();
