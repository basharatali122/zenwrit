import { marked } from "marked";

export const TOOL_ICONS = ["resume", "letter", "linkedin", "youtube", "product"] as const;
export type ToolIconName = (typeof TOOL_ICONS)[number];

export const TOOL_CATEGORIES = ["Job seekers", "Creators"] as const;
export type ToolCategory = (typeof TOOL_CATEGORIES)[number];

export type ToolField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "select";
  placeholder?: string;
  options?: string[];
  required?: boolean;
  rows?: number;
};

export type Faq = { q: string; a: string };

export type ToolRecord = {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  icon: string;
  category: string;
  form_fields: ToolField[];
  system_prompt: string;
  output_label: string;
  faqs: Faq[];
  article_title: string;
  article_content: string;
  meta_title: string;
  meta_description: string;
  is_published: boolean;
  sort_order: number;
  created_at?: string;
};

export type BlogPostRecord = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  reading_time: string;
  meta_title: string;
  meta_description: string;
  is_published: boolean;
  published_at: string | null;
  created_at?: string;
};

export const FREE_DAILY_LIMIT = 3;

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Splits markdown into top-level blocks so ad slots can be interleaved. */
export function splitMarkdownBlocks(markdown: string): string[] {
  return markdown
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
}

const STRIP_UNSAFE = /<\/?(script|iframe|object|embed|style)[^>]*>/gi;

function stripTags(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

/** Renders admin-authored markdown to HTML for the shared `.prose-article` styles. */
export function renderMarkdown(markdown: string): string {
  const html = marked.parse(markdown, { async: false, gfm: true, breaks: false }) as string;
  return html
    .replace(STRIP_UNSAFE, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/<h2>([\s\S]*?)<\/h2>/g, (_m, inner: string) => `<h2 id="${slugify(stripTags(inner))}">${inner}</h2>`);
}

/** Top-level H2 headings of a markdown document, for the table of contents. */
export function extractHeadings(markdown: string): { id: string; text: string }[] {
  const out: { id: string; text: string }[] = [];
  for (const line of markdown.split("\n")) {
    const match = /^##\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const text = match[1].replace(/[*_`]/g, "").trim();
    out.push({ id: slugify(text), text });
  }
  return out;
}

export function estimateReadingTime(markdown: string): string {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

/** Reading time for article pages: 200 wpm, minimum 3 minutes. */
export function readingMinutes(markdown: string): string {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(3, Math.round(words / 200))} min read`;
}

const CATEGORY_BADGES = [
  "bg-primary/10 text-primary border-primary/20",
  "bg-gold/20 text-gold-foreground border-gold/40 dark:text-gold",
  "bg-success/10 text-success border-success/25",
  "bg-accent text-accent-foreground border-border",
];

/** Deterministic badge colour per category, shared by cards and article pages. */
export function categoryBadgeClass(category: string): string {
  let hash = 0;
  for (let i = 0; i < category.length; i += 1) hash = (hash * 31 + category.charCodeAt(i)) >>> 0;
  return CATEGORY_BADGES[hash % CATEGORY_BADGES.length];
}

export function formatPostDate(value?: string | null): string {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
