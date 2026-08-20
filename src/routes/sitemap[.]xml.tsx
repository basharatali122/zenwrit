import { createFileRoute } from "@tanstack/react-router";

const BASE_URL = "https://zenwrit.com";

const STATIC_PATHS = [
  "/",
  "/tools",
  "/blog",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/refund-policy",
  "/disclaimer",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const origin = BASE_URL;

        const { getPublicSupabase } = await import("@/lib/content.server");
        const client = getPublicSupabase();
        const [toolsRes, postsRes] = await Promise.all([
          client.from("tools").select("slug").eq("is_published", true),
          client.from("blog_posts").select("slug").eq("is_published", true),
        ]);

        const urls = [
          ...STATIC_PATHS.map((path) => ({ loc: `${origin}${path}`, priority: path === "/" ? "1.0" : "0.7" })),
          ...(toolsRes.data ?? []).map((tool) => ({ loc: `${origin}/tools/${tool.slug}`, priority: "0.9" })),
          ...(postsRes.data ?? []).map((post) => ({ loc: `${origin}/blog/${post.slug}`, priority: "0.6" })),
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((entry) => `  <url>\n    <loc>${entry.loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`)
  .join("\n")}
</urlset>`;

        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "no-store" },
        });
      },
    },
  },
});
