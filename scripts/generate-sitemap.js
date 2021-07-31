const fs = require("fs");
const globby = require("globby");
const prettier = require("prettier");

(async () => {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc");
  const pages = await globby([
    "pages/**/*.tsx",
    "content/**/*{.md,.mdx}",
    "!pages/_*.tsx",
    "!pages/404.tsx",
    "!pages/500.tsx",
    "!pages/post/[...slug].tsx",
    "!pages/api",
  ]);
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace("pages", "")
                  .replace("content", "")
                  .replace(".tsx", "")
                  .replace(".mdx", "");
                const route = path === "/index" ? "" : path;
                return `
                      <url>
                          <loc>${`https://iamyadav.com${route}`}</loc>
                          <changefreq>${
                            route.includes("/post") ? "monthly" : "daily"
                          }</changefreq>
                          <priority>${
                            route.includes("/post") ? 0.7 : 0.2
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
})();
