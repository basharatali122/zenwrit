import { createFileRoute } from "@tanstack/react-router";
import { TOOLS } from "@/lib/tools";
import { BLOG_POSTS } from "@/lib/blog";

const STATIC_PATHS = [
  "/",
  "/tools",
  "/pricing",
  "/blog",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/refund-policy",
  "/disclaimer",
];

export const Route = createFileRoute("/sitemap[.]xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const url = new URL(request.url);
        const origin = `${request.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "")}://${
          request.headers.get("host") ?? url.host
        }`;

        const urls = [
          ...STATIC_PATHS.map((path) => ({ loc: `${origin}${path}`, priority: path === "/" ? "1.0" : "0.7" })),
          ...TOOLS.map((tool) => ({ loc: `${origin}/tools/${tool.slug}`, priority: "0.9" })),
          ...BLOG_POSTS.map((post) => ({ loc: `${origin}/blog/${post.slug}`, priority: "0.6" })),
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((entry) => `  <url>\n    <loc>${entry.loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`)
  .join("\n")}
</urlset>`;

        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
