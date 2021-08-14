export type Blog = {
  code: string;
  frontmatter: Frontmatter;
  nextBlog: ?Blog;
  previousBlog: ?Blog;
};

export type Breadcrumbs = {
  name: string;
  item?: string;
}[];

export type Frontmatter = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  isPublished: boolean;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];

  toc?: boolean;
  ogImage?: string;
  excerpt?: string;
  readingTime?: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
};
