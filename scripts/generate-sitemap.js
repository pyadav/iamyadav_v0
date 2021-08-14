const fs = require("fs");
const chalk = require("chalk");
const globby = require("globby");
const prettier = require("prettier");

const excludesFile = ["pages/blogs/[...slug].tsx"];
(async () => {
  console.info(chalk.cyan("info"), ` - Generating sitemap`);

  const prettierConfig = await prettier.resolveConfig("./.prettierrc");
  const pages = (
    await globby([
      "pages/**/*.tsx",
      "content/**/*{.md,.mdx}",
      "!content/drafts/*{.md,.mdx}",
      "!pages/_*.tsx",
      "!pages/404.tsx",
      "!pages/500.tsx",
      "!pages/tags/[tag].tsx",
      "!pages/api",
    ])
  ).filter((file) => {
    return !excludesFile.includes(file);
  });
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace("pages", "")
                  .replace("content", "")
                  .replace(".tsx", "")
                  .replace(".mdx", "")
                  .replace("/index", "");
                const route = path === "/index" ? "" : path;
                return `
                      <url>
                          <loc>${`https://iamyadav.com${route}`}</loc>
                          <changefreq>${
                            route.includes("/blogs") ? "monthly" : "daily"
                          }</changefreq>
                          <priority>${
                            route.includes("/blogs") ? 0.7 : 0.2
                          }</priority>
                      </url>   
                    `;
              })
              .join("")}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  // eslint-disable-next-line no-sync
  fs.writeFileSync("public/sitemap.xml", formatted);
  console.info(chalk.cyan("info"), ` - Generating sitemap done`);
})();
