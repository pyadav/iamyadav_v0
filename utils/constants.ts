import path from "path";

export const ROOT = process.cwd();

export const paths = {
  api: path.join(ROOT, "pages", "api"),
  blogs: path.join(ROOT, "contents", "blogs"),
  drafts: path.join(ROOT, "contents", "drafts"),
  components: path.join(ROOT, "components"),
};

export const regexes = {
  blogs: /blogs\//,
  archive: /(blogs\/archive\/.+)/,
  contentBlogs: /contents\/blogs\//,
  contentDrafts: /contents\/drafts\//,
  mdx: /\.mdx?$/,
  tsx: /\.tsx?$/,
};
