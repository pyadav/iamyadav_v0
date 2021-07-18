import matter from "gray-matter";
import fs from "fs";

// Get day in format: Month day, Year. e.g. April 19, 2020
function getFormattedDate(date: Date) {
  const options = { year: "numeric", month: "long", day: "numeric" } as const;
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}

export function getPostsFolders() {
  // Get all posts folders located in `content/posts`
  const postsFolders = fs
    .readdirSync(`${process.cwd()}/content/posts`)
    .map((folderName) => ({
      directory: folderName,
      filename: `${folderName}.md`,
    }));

  return postsFolders;
}

export const getPostItems = (filename: string, directory: string) => {
  // Get raw content from file
  const markdownWithMetadata = fs
    .readFileSync(`content/posts/${directory}/${filename}`)
    .toString();

  // Parse markdown, get frontmatter data, excerpt and content.
  const { data, excerpt, content } = matter(markdownWithMetadata);

  const frontmatter = {
    ...data,
    date: getFormattedDate(data.date),
  };

  // Remove .md file extension from post name
  const slug = filename.replace(".md", "");

  return {
    slug,
    frontmatter,
    excerpt,
    content,
  };
};

export const dateSorter = (a: any, b: any) =>
  (new Date(b.frontmatter.date) as any) - (new Date(a.frontmatter.date) as any);
export function getSortedPosts() {
  const postFolders = getPostsFolders();

  const posts = postFolders
    .map(({ filename, directory }) => getPostItems(filename, directory))
    .sort(dateSorter);

  return posts;
}

export function getPostsSlugs() {
  const postFolders = getPostsFolders();

  const paths = postFolders.map(({ filename }) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return paths;
}

export function getPostBySlug(slug: string) {
  const posts = getSortedPosts();

  const postIndex = posts.findIndex(({ slug: postSlug }) => postSlug === slug);

  const { frontmatter, content, excerpt } = posts[postIndex];

  const previousPost = posts[postIndex + 1];
  const nextPost = posts[postIndex - 1];

  return { frontmatter, post: { content, excerpt }, previousPost, nextPost };
}
