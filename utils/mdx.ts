import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import mdxPrism from "mdx-prism";
import { ROOT, paths } from "@utils/constants";

const getFileContent = (filename: string) => fs.readFileSync(filename, "utf8");
const parseFileContent = (source: string) => matter(source.trim());
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

  try {
    return await bundleMDX(content, {
      xdmOptions(options) {
        // this is the recommended way to add custom remark/rehype plugins:
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          require("remark-capitalize"),
          require("remark-autolink-headings"),
        ];
        options.rehypePlugins = [...(options.rehypePlugins ?? []), mdxPrism];

        return options;
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
export const getMdxBySlug = async (filename: string) => {
  const source = getFileContent(`${paths.posts}/${filename}.mdx`);
  const { content, data } = parseFileContent(source);
  const { code } = await getCompiledMDX(content);

  return {
    code,
    frontmatter: {
      ...data,
      slug: filename,
    },
  };
};
