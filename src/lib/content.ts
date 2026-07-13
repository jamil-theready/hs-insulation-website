import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  cover: string;
  readingTime: number;
};

export type PostFaq = { q: string; a: string };

export type Post = PostMeta & { html: string; toc: { id: string; text: string }[]; faqs: PostFaq[] };

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// Parses a "## Frequently asked questions" (or "## FAQ") section out of the raw
// markdown body into structured Q/A pairs, so every post's FAQ content can
// double as FAQPage JSON-LD without a separate authoring step.
function extractFaqs(markdown: string): PostFaq[] {
  const sectionMatch = markdown.match(/^##\s+(?:Frequently [Aa]sked [Qq]uestions|FAQs?)\s*$/m);
  if (!sectionMatch) return [];

  const start = sectionMatch.index! + sectionMatch[0].length;
  const rest = markdown.slice(start);
  const nextHeading = rest.search(/\n##\s+/);
  const block = nextHeading === -1 ? rest : rest.slice(0, nextHeading);

  const faqs: PostFaq[] = [];
  const paragraphs = block.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  for (const p of paragraphs) {
    const m = p.match(/^\*\*(.+?)\*\*\s*\n([\s\S]+)$/);
    if (!m) continue;
    const q = m[1].trim();
    const a = m[2].replace(/\s+/g, " ").trim();
    if (q && a) faqs.push({ q, a });
  }
  return faqs;
}

function listFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
}

export function getAllPostsMeta(): PostMeta[] {
  return listFiles()
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const words = content.split(/\s+/).length;
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title ?? "Untitled",
        description: data.description ?? "",
        date: data.date ?? "2026-01-01",
        author: data.author ?? "H&S Insulation",
        category: data.category ?? "Insulation",
        cover: data.cover ?? "/images/textures/sprayfoam-closeup.svg",
        readingTime: Math.max(1, Math.round(words / 200)),
      } as PostMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
  return listFiles().map((f) => f.replace(/\.md$/, ""));
}

export function getPost(slug: string): Post | null {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).length;

  const toc: { id: string; text: string }[] = [];
  const renderer = new marked.Renderer();
  renderer.heading = ({ text, depth }) => {
    const id = slugify(text);
    if (depth === 2) toc.push({ id, text });
    return `<h${depth} id="${id}">${text}</h${depth}>`;
  };
  // Wrap tables in a scroll container so wide comparison tables swipe
  // horizontally on phones while keeping real <table> display + semantics.
  const html = (marked.parse(content, { renderer, async: false }) as string)
    .replaceAll("<table>", '<div class="table-scroll"><table>')
    .replaceAll("</table>", "</table></div>");

  return {
    slug,
    title: data.title ?? "Untitled",
    description: data.description ?? "",
    date: data.date ?? "2026-01-01",
    author: data.author ?? "H&S Insulation",
    category: data.category ?? "Insulation",
    cover: data.cover ?? "/images/textures/sprayfoam-closeup.svg",
    readingTime: Math.max(1, Math.round(words / 200)),
    html,
    toc,
    faqs: extractFaqs(content),
  };
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
