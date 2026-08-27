import { createFileRoute, Link } from "@tanstack/react-router";
import { AdSlot } from "@/components/site/AdSlot";
import { BlogCover } from "@/components/site/BlogCover";
import { AUTHOR_NAME } from "@/components/site/AuthorBio";
import { listPublishedPosts } from "@/lib/content.functions";
import type { BlogPostRecord } from "@/lib/content";

export const Route = createFileRoute("/blog/")({
  loader: async () => ({ posts: await listPublishedPosts() }),
  head: () => ({
    meta: [
      { title: "Resume & Job Search Advice | ZenWrit Blog" },
      {
        name: "description",
        content:
          "Practical advice on resumes, ATS optimization, cover letters and job searching. Written for real job seekers, not recruiters.",
      },
      { property: "og:title", content: "Resume & Job Search Advice | ZenWrit Blog" },
      {
        property: "og:description",
        content: "Practical advice on resumes, ATS optimization, cover letters and job searching.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://zenwrit.com/blog" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://zenwrit.com/blog" }],
  }),

  component: BlogIndex,
});

function formatDate(value?: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function BlogIndex() {
  const { posts } = Route.useLoaderData() as { posts: BlogPostRecord[] };
  const [featured, ...rest] = posts;

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

        {featured ? (
          <article className="section-frame overflow-hidden p-0">
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="grid gap-0 md:grid-cols-2"
            >
              <div className="[&>*]:!rounded-none [&>*]:!h-full [&>*]:!border-b-0">
                <BlogCover src={featured.cover_image_url} title={featured.title} category={featured.category} />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-9">
                <span className="eyebrow">Featured · {featured.category}</span>
                <h2 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl">{featured.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                <p className="mt-5 text-xs text-muted-foreground">
                  {AUTHOR_NAME} · {formatDate(featured.published_at)} · {featured.reading_time}
                </p>
                <span className="mt-5 text-sm font-semibold text-primary">Read the guide →</span>
              </div>
            </Link>
          </article>
        ) : null}

        <h2 className="mt-14 text-xl font-bold sm:text-2xl">Latest articles</h2>
        <div className="mt-2 h-px w-16 bg-gold" />

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <li key={post.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="card-lift flex h-full flex-col overflow-hidden surface-panel p-0"
              >
                <BlogCover src={post.cover_image_url} title={post.title} category={post.category} />
                <div className="flex flex-1 flex-col p-5">
                  <p className="eyebrow">{post.category}</p>
                  <h3 className="mt-2 text-lg font-bold leading-snug">{post.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                  <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
                    {formatDate(post.published_at)} · {post.reading_time}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

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
