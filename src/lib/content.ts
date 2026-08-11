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

/** Renders admin-authored markdown to HTML for the shared `.prose-article` styles. */
export function renderMarkdown(markdown: string): string {
  const html = marked.parse(markdown, { async: false, gfm: true, breaks: false }) as string;
  return html.replace(STRIP_UNSAFE, "").replace(/\son\w+="[^"]*"/gi, "");
}

export function estimateReadingTime(markdown: string): string {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}
