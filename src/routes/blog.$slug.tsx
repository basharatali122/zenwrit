import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AdSlot } from "@/components/site/AdSlot";
import { getPost, type BlogPost } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found | SaaScript" }, { name: "robots", content: "noindex" }] };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | SaaScript` },
        { name: "description", content: post.description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
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
            description: post.description,
            datePublished: post.date,
            author: { "@type": "Organization", name: "SaaScript" },
          }),
        },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData() as { post: BlogPost };

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
          {new Date(post.date).toLocaleDateString()} · {post.readingTime}
        </p>

        <div className="my-8">
          <AdSlot id="ad-slot-1" label="Ad slot 1 — below hero" />
        </div>

        <div className="prose-article">
          {post.body.map((block, index) => (
            <section key={index}>
              {block.heading ? <h2>{block.heading}</h2> : null}
              {block.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              {index === 1 ? (
                <AdSlot id="ad-slot-2" label="Ad slot 2 — in content" variant="inline" className="my-6" />
              ) : null}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
