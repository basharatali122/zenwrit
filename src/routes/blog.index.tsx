import { createFileRoute, Link } from "@tanstack/react-router";
import { AdSlot } from "@/components/site/AdSlot";
import { BLOG_POSTS } from "@/lib/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Career & Creator Writing Guides | SaaScript" },
      {
        name: "description",
        content:
          "Practical guides on job searching with AI, LinkedIn writing cadence and ecommerce SEO — from the team behind SaaScript's free AI tools.",
      },
      { property: "og:title", content: "SaaScript Blog" },
      { property: "og:description", content: "Guides on AI job searching, LinkedIn writing and ecommerce SEO." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">Blog</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Writing, careers and distribution — the things our tools can't do for you.
      </p>

      <div className="mt-8">
        <AdSlot id="ad-slot-blog-top" label="Ad slot — below hero" />
      </div>

      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {BLOG_POSTS.map((post) => (
          <li key={post.slug}>
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="flex h-full flex-col surface-panel p-5 transition-colors hover:border-primary/50"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-primary">{post.category}</p>
              <h2 className="mt-2 text-lg font-semibold">{post.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.description}</p>
              <p className="mt-4 text-xs text-muted-foreground">
                {new Date(post.date).toLocaleDateString()} · {post.readingTime}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
