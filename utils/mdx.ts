import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import rehypePrism from "@mapbox/rehype-prism";
import rehypeSlug from "rehype-slug";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import rehypeHeadings from "rehype-autolink-headings";
import readingTime from "reading-time";
import { Frontmatter, Blog } from "types/blog";

import { ROOT, paths } from "utils/constants";

function firstFourLines(file: any, options: any) {
  file.excerpt = file.content.substring(0, 120) + "...";
}
const getFileContent = (filename: string) => fs.readFileSync(filename, "utf8");
const parseFileContent = (source: string) =>
  matter(source.trim(), { excerpt: firstFourLines as any });
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
  const { code, frontmatter } = await getCompiledMDX(source);
  const { content, excerpt } = parseFileContent(source) as any;

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
