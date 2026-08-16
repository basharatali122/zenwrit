import { createFileRoute, Link } from "@tanstack/react-router";
import { AdSlot } from "@/components/site/AdSlot";
import { BlogCover } from "@/components/site/BlogCover";
import { listPublishedPosts } from "@/lib/content.functions";
import type { BlogPostRecord } from "@/lib/content";

export const Route = createFileRoute("/blog/")({
  loader: async () => ({ posts: await listPublishedPosts() }),
  head: () => ({
    meta: [
      { title: "Blog — Career & Creator Writing Guides | ZenWrit" },
      {
        name: "description",
        content:
          "Practical guides on job searching with AI, LinkedIn writing cadence and ecommerce SEO — from the team behind ZenWrit's free AI tools.",
      },
      { property: "og:title", content: "ZenWrit Blog" },
      { property: "og:description", content: "Guides on AI job searching, LinkedIn writing and ecommerce SEO." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { posts } = Route.useLoaderData() as { posts: BlogPostRecord[] };

  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">Blog</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Writing, careers and distribution — the things our tools can't do for you.
      </p>

      <AdSlot id="ad-slot-blog-top" label="Ad slot — below hero" className="mt-8" />

      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="flex h-full flex-col overflow-hidden surface-panel p-0 transition-colors hover:border-primary/50"
            >
              <BlogCover src={post.cover_image_url} title={post.title} category={post.category} />
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-primary">{post.category}</p>
                <h2 className="mt-2 text-lg font-semibold">{post.title}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {post.published_at ? `${new Date(post.published_at).toLocaleDateString()} · ` : ""}
                  {post.reading_time}
                </p>
              </div>
            </Link>
          </li>
        ))}

      </ul>
    </div>
  );
}
