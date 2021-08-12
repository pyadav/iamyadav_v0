import path from "path";

export const ROOT = process.cwd();

export const paths = {
  api: path.join(ROOT, "pages", "api"),
  posts: path.join(ROOT, "content", "posts"),
  drafts: path.join(ROOT, "content", "drafts"),
  components: path.join(ROOT, "components"),
};

export const regexes = {
  posts: /posts\//,
  archive: /(posts\/archive\/.+)/,
  contentPosts: /content\/posts\//,
  contentDrafts: /content\/drafts\//,
  mdx: /\.mdx?$/,
  tsx: /\.tsx?$/,
};
