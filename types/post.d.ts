export type Post = {
  code: string;
  frontmatter: Frontmatter;
  nextPost: ?Post;
  previousPost: ?Post;
};

export type Frontmatter = {
  slug: string;
  title: string;
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
