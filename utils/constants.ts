import path from "path";

export const ROOT = process.cwd();

export const paths = {
  api: path.join(ROOT, "pages", "api"),
  blogs: path.join(ROOT, "content", "blogs"),
  drafts: path.join(ROOT, "content", "drafts"),
  components: path.join(ROOT, "components"),
};

export const regexes = {
  blogs: /blogs\//,
  archive: /(blogs\/archive\/.+)/,
  contentBlogs: /content\/blogs\//,
  contentDrafts: /content\/drafts\//,
  mdx: /\.mdx?$/,
  tsx: /\.tsx?$/,
};
