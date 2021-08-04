import fs from "fs";
import { paths, regexes } from "utils/constants";
import { getMdxBySlug } from "./mdx";
import { EXTReplacer } from "./helpers";
import { Frontmatter, Post } from "types/post";

// Get day in format: Month day, Year. e.g. April 19, 2020
export function getFormattedDate(date: Date) {
  const options = { year: "numeric", month: "long", day: "numeric" } as const;
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);

  return formattedDate;
}

export const sortByDate = (a: Post, b: Post) => {
  return (
    Number(new Date(b?.frontmatter?.publishedAt as string)) -
    Number(new Date(a?.frontmatter?.publishedAt as string))
  );
};

export const isPublished = (post: Post) => post?.frontmatter?.isPublished;
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

const getPostSlugs =
  (regex: RegExp) =>
  (filePath: string): string => {
    const [_, slug] = filePath.split(regex);
    return slug;
  };

export function getFileSlugs(path: string, regex: RegExp): string[] {
  const fileSlugs = recursiveDirScanner(path, [])
    .map(getPostSlugs(regex))
    // filter file with mdx extensions
    .filter((ext) => regexes.mdx.test(ext));

  return fileSlugs;
}

export const parsePosts = async (fileSlugs: Array<string>): Promise<Post[]> => {
  const posts = await Promise.all(
    fileSlugs.map(
      async (slug: string) =>
        await getMdxBySlug(EXTReplacer(slug, regexes.mdx)),
    ),
  );
  return posts;
};

export const getAllPosts = async (): Promise<Post[]> => {
  const fileSlugs = getFileSlugs(paths.posts, regexes.contentPosts);
  const posts = (await parsePosts(fileSlugs))
    .filter(isPublished)
    .sort(sortByDate)
    .reduce(addsPaginationToPosts, []);

  return posts;
};

export const addsPaginationToPosts = (
  acc: any,
  current: any,
  index: number,
  posts: Post[],
): Post[] => {
  acc.push({
    ...current,
    // If we are at the beginning of the iteration there is no "nextPost": set to null.
    nextPost: acc.length === 0 ? null : posts[acc.length - 1].frontmatter.slug,
    // If we are at the end of the list of posts there is no "previousPost": set to null.
    previousPost:
      posts.length === acc.length + 1
        ? null
        : posts[index + 1].frontmatter.slug,
  });
  return acc;
};
