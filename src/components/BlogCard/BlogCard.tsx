import { Blog, Frontmatter } from "types/blog";
import Link from "next/link";

export const BlogCard = ({
  slug,
  title,
  subtitle,
  description,
  publishedAt,
  updatedAt,
  excerpt,
  readingTime,
}: Frontmatter) => {
  return (
    <article key={slug}>
      <header className="mb-2">
        <h3 className="mb-2">
          <Link href={"/blogs/[...slug]"} as={`/blogs/${slug}`}>
            <a className="text-3xl font-bold text-purple-700 dark:text-yellow-700 font-display">
              {`${title} ${subtitle ? subtitle : ""}`}
            </a>
          </Link>
        </h3>
        <div className="mb-4 text-sm tracking-normal text-fore-subtle">
          <time>{publishedAt}</time>
          <span> • </span>
          <span className="font-bold">{readingTime?.text}</span>
        </div>
      </header>
      <section>
        <p className="mb-8">{description || excerpt}</p>
      </section>
    </article>
  );
};
