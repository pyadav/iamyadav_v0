const fs = require("fs");
const path = require("path");
const RSS = require("rss");
const chalk = require("chalk");
const matter = require("gray-matter");

const root = process.cwd();
const typeToPath = {
  blog: "content/posts",
};

function getPosts(type) {
  const files = fs.readdirSync(path.join(root, typeToPath[type]));
  const posts = files.reduce((allPosts, postSlug) => {
    const source = fs.readFileSync(
      path.join(root, typeToPath[type], postSlug),
      "utf8",
    );
    const { data } = matter(source);
    return [
      {
        ...data,
        slug: postSlug.replace(".mdx", ""),
      },
      ...allPosts,
    ];
  }, []);
  return posts;
}

const sortByDate = (a, b) => {
  return (
    Number(new Date(b?.frontmatter?.publishedAt)) -
    Number(new Date(a?.frontmatter?.publishedAt))
  );
};

(async () => {
  console.info(chalk.cyan("info"), ` - Generating RSS feed`);

  try {
    const feed = new RSS({
      title: "Praveen Yadav's Blog",
      description:
        "Hi I'm Praveen Yadav, a versatile javascript & golang developer and this is my blog. Here, I share my own experience as a developer and everything I'm learning about Golang, Typescript, React, testing and life",
      site_url: "https://iamyadav.com",
      feed_url: "https://iamyadav.com/rss.xml",
      image_url: "https://iamyadav.com/static/profile.jpeg",
      language: "en",
    });

    const content = [...getPosts("blog")].sort(sortByDate);
    content.forEach((post) => {
      const url = `https://iamyadav.com/post/${post.slug}`;

      feed.item({
        title: post.title,
        description: post.description,
        date: new Date(post.publishedAt),
        author: "Praveen Yadav",
        url,
        guid: url,
      });
    });

    const rss = feed.xml({ indent: true });
    fs.writeFileSync(path.join(__dirname, "../public/rss.xml"), rss);
    console.info(chalk.cyan("info"), ` - Generating RSS feed done`);
  } catch (error) {
    console.error(
      chalk.red("error"),
      ` - An error occurred while generating the RSS feed`,
    );
    console.error(error);
    process.exit(1);
  }
})();
