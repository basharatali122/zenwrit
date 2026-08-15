import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AdSlot } from "@/components/site/AdSlot";
import { MarkdownArticle } from "@/components/site/MarkdownArticle";
import { getPublishedPost } from "@/lib/content.functions";
import type { BlogPostRecord } from "@/lib/content";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPublishedPost({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found | ZenWrit" }, { name: "robots", content: "noindex" }] };
    }
    const { post } = loaderData;
    const title = post.meta_title || `${post.title} | ZenWrit`;
    const description = post.meta_description || post.excerpt;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description,
            datePublished: post.published_at,
            author: { "@type": "Organization", name: "ZenWrit" },
          }),
        },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData() as { post: BlogPostRecord };

  return (
    <div className="container-page py-12">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <Link to="/blog" className="hover:text-foreground">Blog</Link>
        <span className="px-1.5">/</span>
        <span className="text-foreground">{post.category}</span>
      </nav>

      <article className="mx-auto mt-5 max-w-2xl">
        <h1 className="text-3xl font-bold sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {post.published_at ? `${new Date(post.published_at).toLocaleDateString()} · ` : ""}
          {post.reading_time}
        </p>

        {post.cover_image_url ? (
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="mt-6 aspect-[16/9] w-full rounded-xl border border-border object-cover"
            loading="lazy"
          />
        ) : null}

      <AdSlot id="ad-slot-1" label="Ad slot 1 — below hero" className="my-8" />

        <div className="prose-article">
          <MarkdownArticle markdown={post.content} />
        </div>
      </article>
    </div>
  );
}
