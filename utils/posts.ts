import matter from "gray-matter";
import fs from "fs";
import { paths, regexes } from "@utils/constants";
import { getMdxBySlug } from "./mdx";
import { EXTReplacer } from "./helpers";

// Get day in format: Month day, Year. e.g. April 19, 2020
export function getFormattedDate(date: Date) {
  const options = { year: "numeric", month: "long", day: "numeric" } as const;
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);

  return formattedDate;
}

export const dateSorter = (a: any, b: any) => {
  return (
    Number(new Date(b?.frontmatter?.createdAt as string)) -
    Number(new Date(a?.frontmatter?.createdAt as string))
  );
};

const recursiveDirScanner = (dir: string, list: Array<string>) => {
  const f = fs.readdirSync(dir, "utf-8");
  return f.reduce((cache, file) => {
    const filePath = `${dir}/${file}`;

    if (fs.statSync(filePath).isDirectory()) {
      cache = recursiveDirScanner(filePath, list);
    } else {
      cache.push(filePath);
    }

    return cache;
  }, list);
};

const getPostSlugs = (regex: RegExp) => (filePath: string) => {
  const [_, slug] = filePath.split(regex);
  return slug;
};

export function getFileSlugs(path: string, regex: RegExp) {
  const fileSlugs = recursiveDirScanner(path, [])
    .map(getPostSlugs(regex))
    // filter file with mdx extensions
    .filter((ext) => regexes.mdx.test(ext));

  return fileSlugs;
}

export const parsePosts = async (fileSlugs: Array<string>) => {
  const posts = await Promise.all(
    fileSlugs.map(
      async (slug: string) =>
        await getMdxBySlug(EXTReplacer(slug, regexes.mdx)),
    ),
  );
  return posts;
};

export const getAllPosts = async () => {
  const fileSlugs = getFileSlugs(paths.posts, regexes.contentPosts);
  const posts = (await parsePosts(fileSlugs)).sort(dateSorter);

  return posts;
};
