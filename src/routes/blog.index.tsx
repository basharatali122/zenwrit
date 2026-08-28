import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AdSlot } from "@/components/site/AdSlot";
import { BlogCover } from "@/components/site/BlogCover";
import { AUTHOR_NAME } from "@/components/site/AuthorBio";
import { NewsletterSignup } from "@/components/site/NewsletterSignup";
import { listPublishedPosts } from "@/lib/content.functions";
import { categoryBadgeClass, formatPostDate } from "@/lib/content";
import type { BlogPostRecord } from "@/lib/content";

const TITLE = "Resume & Job Search Advice | ZenWrit Blog";
const DESCRIPTION = "Practical advice on resumes, ATS optimization, cover letters and job searching. Written for real job seekers, not recruiters.";
const OG_IMAGE = "https://zenwrit.com/og-image.png";

export const Route = createFileRoute("/blog/")({
  validateSearch: (search: Record<string, unknown>): { category?: string } =>
    typeof search['category'] === "string" ? { category: search['category'] as string } : {},
  loader: async () => ({ posts: await listPublishedPosts() }),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://zenwrit.com/blog" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://zenwrit.com/blog" }],
  }),

  component: BlogIndex,
});

function BlogIndex() {
function PostCard({ post }: { post: BlogPostRecord }) {
  return (
    <li>
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
  );
}

function BlogIndex() {
  const { posts } = Route.useLoaderData() as { posts: BlogPostRecord[] };
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(posts.map((post) => post.category).filter(Boolean))),
    [posts],
  );
  const activeCategory = search.category ?? "All";

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesQuery =
        !needle ||
        post.title.toLowerCase().includes(needle) ||
        post.excerpt.toLowerCase().includes(needle) ||
        post.content.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [posts, activeCategory, query]);

  const showFeatured = activeCategory === "All" && !query.trim();
  const featured = showFeatured ? filtered[0] : undefined;
  const rest = showFeatured ? filtered.slice(1) : filtered;

  const setCategory = (category: string) => {
    void navigate({ search: () => (category === "All" ? {} : { category }), replace: true });
  };

  return (
    <div>
      <header className="border-b border-border bg-brand text-brand-foreground">
        <div className="container-page py-14 text-center sm:py-16">
          <span className="eyebrow text-gold">The ZenWrit Journal</span>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Resume &amp; job search guides</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand-foreground/75 sm:text-base">
            Tested advice on applicant tracking systems, resume formatting and interviews — researched and
            fact-checked by the {AUTHOR_NAME}.
          </p>
        </div>
      </header>

      <div className="container-page py-12">
        <AdSlot id="ad-slot-blog-top" label="Ad slot — below hero" className="mb-10" />

        <div className="flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {["All", ...categories].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setCategory(category)}
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
          <label className="lg:w-72">
            <span className="sr-only">Search articles</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-lg border border-border bg-card px-4 py-2 text-sm outline-none focus:border-primary"
            />
          </label>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Showing {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        </p>

        {featured ? (
          <article className="section-frame mt-8 overflow-hidden p-0">
            <Link to="/blog/$slug" params={{ slug: featured.slug }} className="grid gap-0 md:grid-cols-2">
              <div className="[&>*]:!rounded-none [&>*]:!h-full [&>*]:!border-b-0">
                <BlogCover src={featured.cover_image_url} title={featured.title} category={featured.category} />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-9">
                <span className="eyebrow">Featured · {featured.category}</span>
                <h2 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl">{featured.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                <p className="mt-5 text-xs text-muted-foreground">
                  {AUTHOR_NAME} · {formatPostDate(featured.published_at)} · {featured.reading_time}
                </p>
                <span className="mt-5 text-sm font-semibold text-primary">Read the guide →</span>
              </div>
            </Link>
          </article>
        ) : null}

        <h2 className="mt-14 text-xl font-bold sm:text-2xl">
          {activeCategory === "All" ? "Latest articles" : activeCategory}
        </h2>
        <div className="mt-2 h-px w-16 bg-gold" />

        {rest.length === 0 ? (
          <p className="mt-8 text-sm text-muted-foreground">No articles match your search yet.</p>
        ) : (
          <>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.slice(0, 3).map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </ul>

            {rest.length > 3 ? (
              <>
                <NewsletterSignup source="blog_listing" compact className="mt-10" />
                <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.slice(3).map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </ul>
              </>
            ) : (
              <NewsletterSignup source="blog_listing" compact className="mt-10" />
            )}
          </>
        )}

        <section className="mt-16 rounded-xl border border-border bg-surface p-6 text-center sm:p-10">
          <span className="eyebrow">Free tool</span>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Check your resume against ATS rules</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Upload a PDF or DOCX and get a full compatibility score in under a minute. No signup, no limits.
          </p>
          <Link
            to="/check"
            className="mt-6 inline-flex items-center rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground transition-opacity hover:opacity-90"
          >
            Check my resume
          </Link>
        </section>
      </div>
    </div>
  );
}
