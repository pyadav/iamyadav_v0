import path from "path";
import { bundleMDX } from "mdx-bundler";
import rehypePrism from "@mapbox/rehype-prism";
import rehypeSlug from "rehype-slug";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import rehypeHeadings from "rehype-autolink-headings";
import readingTime from "reading-time";
import { Frontmatter, Blog } from "types/blog";
import { getFileContent, parseFileContent } from "utils/blogs";
import { ROOT, paths } from "utils/constants";

const getCompiledMDX = async (content: string) => {
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      ROOT,
      "node_modules",
      "esbuild",
      "esbuild.exe",
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      ROOT,
      "node_modules",
      "esbuild",
      "bin",
      "esbuild",
    );
  }

  const remarkPlugins = [require("remark-gfm")];
  const rehypePlugins = [
    rehypePrism,
    rehypeAccessibleEmojis,
    rehypeSlug,
    [rehypeHeadings, { behavior: "prepend" }],
  ];

  try {
    return await bundleMDX(content, {
      xdmOptions(options) {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          ...remarkPlugins,
        ];
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          ...rehypePlugins,
        ];

        return options;
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
export const getMdxBySlug = async (filename: string): Promise<Blog> => {
  const source = getFileContent(`${paths.blogs}/${filename}.mdx`);
  const { content, excerpt } = parseFileContent(source) as any;
  const { code, frontmatter } = await getCompiledMDX(source);

  return {
    code,
    frontmatter: {
      ...frontmatter,
      excerpt,
      slug: filename,
      readingTime: readingTime(content),
    } as Frontmatter,
    nextBlog: null,
    previousBlog: null,
  };
};
