import { createFileRoute } from "@tanstack/react-router";

const BASE_URL = "https://zenwrit.com";

const STATIC_ENTRIES: { path: string; changefreq: string; priority: string; lastmod: string }[] = [
  { path: "/", changefreq: "daily", priority: "1.0", lastmod: "2026-10-02" },
  { path: "/check", changefreq: "weekly", priority: "0.9", lastmod: "2026-10-02" },
  { path: "/resume-scanner", changefreq: "weekly", priority: "0.9", lastmod: "2026-09-20" },
  { path: "/blog", changefreq: "daily", priority: "0.8", lastmod: "2026-10-02" },
  { path: "/author/basharat-ali", changefreq: "weekly", priority: "0.5", lastmod: "2026-10-03" },
  { path: "/about", changefreq: "monthly", priority: "0.5", lastmod: "2026-09-15" },
  { path: "/contact", changefreq: "monthly", priority: "0.5", lastmod: "2026-09-15" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3", lastmod: "2026-10-02" },
  { path: "/terms", changefreq: "yearly", priority: "0.3", lastmod: "2026-10-02" },
  { path: "/disclaimer", changefreq: "yearly", priority: "0.3", lastmod: "2026-10-02" },
  { path: "/dmca", changefreq: "yearly", priority: "0.3", lastmod: "2026-10-02" },
  { path: "/editorial-guidelines", changefreq: "yearly", priority: "0.3", lastmod: "2026-10-02" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const origin = BASE_URL;

        const { getPublicSupabase } = await import("@/lib/content.server");
        const client = getPublicSupabase();
        const postsRes = await client
          .from("blog_posts")
          .select("slug, published_at, created_at")
          .eq("is_published", true);

        const urls = [
          ...STATIC_ENTRIES.map((entry) => ({
            loc: `${origin}${entry.path}`,
            changefreq: entry.changefreq,
            priority: entry.priority,
            lastmod: entry.lastmod,
          })),
          ...(postsRes.data ?? []).map((post) => ({
            loc: `${origin}/blog/${post.slug}`,
            changefreq: "monthly",
            priority: "0.7",
            lastmod: (post.published_at ?? post.created_at ?? "").slice(0, 10),
          })),
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) =>
      `  <url>\n    <loc>${entry.loc}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`,
  )
  .join("\n")}
</urlset>`;

        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "no-store" },
        });
      },
    },
  },
});
