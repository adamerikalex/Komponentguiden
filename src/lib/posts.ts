import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

export type PostMeta = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  tags: string[];
  author?: string; // optional frontmatter override; falls back to Komponentguiden
};

export type Post = PostMeta & { contentHtml: string };

const postsDir = path.join(process.cwd(), "content", "blogg");

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
      const { data } = matter(raw);
      return data as PostMeta;
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content);
  return { ...(data as PostMeta), contentHtml: processed.toString() };
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
