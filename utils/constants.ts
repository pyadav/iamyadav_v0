import path from "path";

export const ROOT = process.cwd();

export const paths = {
  api: path.join(ROOT, "pages", "api"),
  posts: path.join(ROOT, "content", "posts"),
  components: path.join(ROOT, "components"),
};

export const regexes = {
  posts: /posts\//,
  archive: /(posts\/archive\/.+)/,
  contentPosts: /content\/posts\//,
  mdx: /\.mdx?$/,
  tsx: /\.tsx?$/,
};
