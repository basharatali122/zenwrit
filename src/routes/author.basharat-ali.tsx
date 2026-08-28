import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BlogCover } from "@/components/site/BlogCover";
import { listPublishedPosts } from "@/lib/content.functions";
import { categoryBadgeClass, formatPostDate } from "@/lib/content";
import type { BlogPostRecord } from "@/lib/content";
import { SITE_AUTHOR } from "@/lib/author";

const TITLE = "Basharat Ali — Software Engineer & Founder of ZenWrit";
const DESCRIPTION =
  "Basharat Ali is a software engineer and the builder behind ZenWrit. He writes practical ATS and job search guides tested against real resumes.";
const OG_IMAGE = "https://zenwrit.com/og-image.png";

export const Route = createFileRoute("/author/basharat-ali")({
  loader: async () => ({ posts: await listPublishedPosts() }),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: SITE_AUTHOR.profileUrlAbsolute },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_AUTHOR.profileUrlAbsolute }],
  }),
  component: AuthorPage,
});

function AuthorPage() {
  const { posts } = Route.useLoaderData() as { posts: BlogPostRecord[] };
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => Array.from(new Set(posts.map((post) => post.category).filter(Boolean))),
    [posts],
  );
  const filtered =
    activeCategory === "All" ? posts : posts.filter((post) => post.category === activeCategory);

  return (
    <div className="container-page py-12 sm:py-16">
      <header className="mx-auto max-w-3xl text-center">
        <img
          src={SITE_AUTHOR.avatar}
          alt={`${SITE_AUTHOR.name} avatar`}
          width={80}
          height={80}
          className="mx-auto h-20 w-20 rounded-full object-cover ring-2 ring-gold/40"
        />
        <h1 className="mt-5 text-3xl font-bold sm:text-4xl">{SITE_AUTHOR.name}</h1>
        <span className="mt-3 inline-block rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-foreground dark:text-gold">
          {SITE_AUTHOR.role}
        </span>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{SITE_AUTHOR.bio}</p>
        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">
            {posts.length} {posts.length === 1 ? "article" : "articles"} published
          </span>
          <span aria-hidden="true">|</span>
          <span>Est. 2026</span>
          <span aria-hidden="true">|</span>
          <span>Free tools: 1</span>
        </p>
      </header>

      <hr className="mx-auto mt-10 max-w-3xl border-border" />

      <h2 className="mt-12 text-xl font-bold sm:text-2xl">All articles</h2>
      <div className="mt-2 h-px w-16 bg-gold" />

      <div className="mt-6 flex flex-wrap gap-2">
        {["All", ...categories].map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
              activeCategory === category
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">No articles published yet.</p>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <li key={post.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="card-lift flex h-full flex-col overflow-hidden surface-panel p-0"
              >
                <BlogCover src={post.cover_image_url} title={post.title} category={post.category} />
                <div className="flex flex-1 flex-col p-5">
                  <span
                    className={`w-fit rounded-full border px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide ${categoryBadgeClass(post.category)}`}
                  >
                    {post.category}
                  </span>
                  <h3 className="mt-3 text-lg font-bold leading-snug">{post.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                  <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
                    {formatPostDate(post.published_at)} · {post.reading_time}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
