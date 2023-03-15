import fs from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Blog, Frontmatter } from "~/types/blog";
import { paths, regexes } from "./constants";
import { EXTReplacer } from "./helpers";
import { getMdxBySlug } from "./mdx";

const firstFourLines = (file: any, options: any) => {
  file.excerpt = file.content.substring(0, 120) + "...";
};

export const parseFileContent = (source: string) =>
  matter(source.trim(), { excerpt: firstFourLines as any });

export const getFileContent = (filename: string) =>
  fs.readFileSync(filename, "utf8");

// Get day in format: Month day, Year. e.g. April 19, 2020
export function getFormattedDate(date: Date) {
  const options = { year: "numeric", month: "long", day: "numeric" } as const;
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);

  return formattedDate;
}

export const sortByDate = (a: Blog, b: Blog) => {
  return (
    Number(new Date(b?.frontmatter?.publishedAt as string)) -
    Number(new Date(a?.frontmatter?.publishedAt as string))
  );
};

export const isPublished = (blog: Blog) => blog?.frontmatter?.isPublished;
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

const getBlogSlugs =
  (regex: RegExp) =>
  (filePath: string): string => {
    const [_, slug] = filePath.split(regex);
    return slug;
  };

export function getFileSlugs(path: string, regex: RegExp): string[] {
  const fileSlugs = recursiveDirScanner(path, [])
    .map(getBlogSlugs(regex))
    // filter file with mdx extensions
    .filter((ext) => regexes.mdx.test(ext));

  return fileSlugs;
}

export const parseBlogs = async (fileSlugs: Array<string>): Promise<Blog[]> => {
  const blogs = await Promise.all(
    fileSlugs.map(
      async (slug: string) => await getMdxBySlug(EXTReplacer(slug, regexes.mdx))
    )
  );
  return blogs;
};

export const blogsFrontmatter = async (
  fileSlugs: Array<string>
): Promise<Frontmatter[]> => {
  const blogs = await Promise.all(
    fileSlugs.map(async (slug: string) => {
      const source = getFileContent(`${paths.blogs}/${slug}`);
      const { content, excerpt } = parseFileContent(source) as any;
      const { data } = matter(source);
      return {
        ...(data as Frontmatter),
        slug: EXTReplacer(slug, regexes.mdx),
        readingTime: readingTime(content),
        excerpt,
      };
    })
  );
  return blogs;
};

export const getAllBlogsFrontmatter = async (): Promise<Frontmatter[]> => {
  const fileSlugs = getFileSlugs(paths.blogs, regexes.contentBlogs);

  const blogs = (await blogsFrontmatter(fileSlugs))
    .filter((blog: Frontmatter) => blog?.isPublished)
    .sort((a: Frontmatter, b: Frontmatter) => {
      return (
        Number(new Date(b?.publishedAt as string)) -
        Number(new Date(a?.publishedAt as string))
      );
    });
  return blogs;
};

export const getAllBlogs = async (): Promise<Blog[]> => {
  // TODO: support multiple dir support
  const fileSlugs = getFileSlugs(paths.blogs, regexes.contentBlogs);
  const blogs = (await parseBlogs(fileSlugs))
    .filter(isPublished)
    .sort(sortByDate)
    .reduce(addsPaginationToBlogs, []);

  return blogs;
};

export const addsPaginationToBlogs = (
  acc: any,
  current: any,
  index: number,
  blogs: Blog[]
): Blog[] => {
  acc.push({
    ...current,
    // If we are at the beginning of the iteration there is no "nextBlog": set to null.
    nextBlog: acc.length === 0 ? null : blogs[acc.length - 1].frontmatter.slug,
    // If we are at the end of the list of blogs there is no "previousBlog": set to null.
    previousBlog:
      blogs.length === acc.length + 1
        ? null
        : blogs[index + 1].frontmatter.slug,
  });
  return acc;
};

export const getAllTags = (blogs: Frontmatter[]) => {
  const tags = blogs.reduce((tags: string[], blog: Frontmatter) => {
    if (blog.tags) {
      return [...tags, ...blog.tags];
    }
    return tags;
  }, []);
  return [...new Set(tags)];
};

export function getBlogsByTag(
  blogs: Frontmatter[],
  tag: string
): Frontmatter[] {
  return blogs.reduce((acc, blog) => {
    if (blog.tags && blog.tags.includes(tag)) {
      acc.push(blog);
    }
    return acc;
  }, [] as Frontmatter[]);
}
