import Link from "next/link";
import { Frontmatter } from "~/types/blog";
import ViewCounter from "./view";

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
          <Link
            href={"/blogs/[...slug]"}
            as={`/blogs/${slug}`}
            className="text-2xl font-bold text-purple-700 dark:text-yellow-700 font-display"
          >
            {`${title} ${subtitle ? subtitle : ""}`}
          </Link>
        </h3>
        <div className="mb-4 text-sm tracking-normal text-fore-subtle">
          <time>
            {new Date(publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          {updatedAt && (
            <>
              <span> • </span>
              <span className="italic">
                Last updated:{" "}
                <time>
                  {new Date(updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </span>
            </>
          )}
          <span> • </span>
          <span className="font-bold">{readingTime?.text}</span>
          <span> • </span>
          <ViewCounter slug={slug} trackView={false} />
        </div>
      </header>
      <section>
        <p className="mb-8">{description || excerpt}</p>
      </section>
    </article>
  );
};
