import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AdSlot } from "@/components/site/AdSlot";
import { MarkdownArticle } from "@/components/site/MarkdownArticle";
import { ReadingProgress } from "@/components/site/ReadingProgress";
import { ShareButtons } from "@/components/site/ShareButtons";
import { NewsletterSignup } from "@/components/site/NewsletterSignup";
import { ArticleRating } from "@/components/site/ArticleRating";
import { TableOfContentsMobile, TableOfContentsSidebar } from "@/components/site/TableOfContents";
import { RelatedPosts, pickRelated } from "@/components/site/RelatedPosts";
import { getPublishedPost, listPublishedPosts } from "@/lib/content.functions";
import { getArticleRating } from "@/lib/engagement.functions";
import { categoryBadgeClass, extractHeadings, formatPostDate, readingMinutes } from "@/lib/content";
import type { BlogPostRecord } from "@/lib/content";
import { SITE_AUTHOR, SITE_AUTHOR_SHORT_BIO } from "@/lib/author";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const [post, all, rating] = await Promise.all([
      getPublishedPost({ data: { slug: params.slug } }),
      listPublishedPosts(),
      getArticleRating({ data: { slug: params.slug } }),
    ]);
    if (!post) throw notFound();
    return { post, related: pickRelated(all, post), rating };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found | ZenWrit" }, { name: "robots", content: "noindex" }] };
    }
    const { post, rating } = loaderData;
    const title = post.meta_title || `${post.title} | ZenWrit Blog`;
    const description = post.meta_description || post.excerpt;
    const image = post.cover_image_url && /^https?:\/\//.test(post.cover_image_url) ? post.cover_image_url : "https://zenwrit.com/og-image.png";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "author", content: SITE_AUTHOR.name },
        { property: "article:author", content: SITE_AUTHOR.profileUrlAbsolute },
        { property: "og:title", content: post.title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `https://zenwrit.com/blog/${post.slug}` },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: `https://zenwrit.com/blog/${post.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                headline: post.title,
                description,
                datePublished: post.published_at,
                image: [post.cover_image_url || "https://zenwrit.com/favicon.png"],
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `https://zenwrit.com/blog/${post.slug}`,
                },
                author: {
                  "@type": "Organization",
                  name: SITE_AUTHOR.name,
                  url: SITE_AUTHOR.profileUrlAbsolute,
                },
                ...(rating && rating.count > 0
                  ? {
                      aggregateRating: {
                        "@type": "AggregateRating",
                        ratingValue: String(rating.average),
                        ratingCount: String(rating.count),
                        bestRating: "5",
                        worstRating: "1",
                      },
                    }
                  : {}),
                publisher: {
                  "@type": "Organization",
                  name: "ZenWrit",
                  url: "https://zenwrit.com",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://zenwrit.com/favicon.png",
                  },
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://zenwrit.com/" },
                  { "@type": "ListItem", position: 2, name: "Blog", item: "https://zenwrit.com/blog" },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: post.category || post.title,
                    item: `https://zenwrit.com/blog/${post.slug}`,
                  },
                ],
              },
            ],
          }),
        },
      ],

    };
  },
  component: BlogPostPage,
});

function ArticleHero({ post }: { post: BlogPostRecord }) {
  if (post.cover_image_url) {
    return (
      <img
        src={post.cover_image_url}
        alt={post.title}
        className="h-[220px] w-full object-cover sm:h-[320px] lg:h-[400px]"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={post.title}
      className="flex h-[200px] w-full items-end bg-gradient-to-br from-brand via-brand-soft to-primary sm:h-[280px] lg:h-[340px]"
    >
      <div className="container-page pb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">{post.category}</p>
        <p className="mt-2 max-w-3xl text-2xl font-bold leading-snug text-brand-foreground sm:text-4xl">
          {post.title}
        </p>
      </div>
    </div>
  );
}

function AuthorCard() {
  return (
    <aside className="mt-12 rounded-xl border border-border bg-surface p-6 sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row">
        <img
          src={SITE_AUTHOR.avatar}
          alt={`${SITE_AUTHOR.name} avatar`}
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-full bg-card p-1.5"
        />
        <div>
          <p className="text-base font-semibold text-foreground">
            Written by{" "}
            <Link to="/author/basharat-ali" className="text-primary hover:underline">
              {SITE_AUTHOR.name}
            </Link>
          </p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{SITE_AUTHOR.role}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{SITE_AUTHOR_SHORT_BIO}</p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground transition-opacity hover:opacity-90"
          >
            Check your ATS score free →
          </Link>
        </div>
      </div>
    </aside>
  );
}

function BlogPostPage() {
  const { post, related, rating } = Route.useLoaderData() as {
    post: BlogPostRecord;
    related: BlogPostRecord[];
    rating: { average: number; count: number };
  };
  const headings = extractHeadings(post.content);
  const url = `https://zenwrit.com/blog/${post.slug}`;
  const readTime = post.reading_time || readingMinutes(post.content);

  return (
    <div>
      <ReadingProgress />
      <ArticleHero post={post} />

      <div className="container-page py-10 sm:py-12">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="px-1.5">›</span>
          <Link to="/blog" className="hover:text-foreground">Blog</Link>
          <span className="px-1.5">›</span>
          <Link to="/blog" search={{ category: post.category }} className="hover:text-foreground">
            {post.category}
          </Link>
          <span className="px-1.5">›</span>
          <span className="text-foreground">{post.title}</span>
        </nav>

        <div className="mt-6 gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_260px]">
          <article className="mx-auto w-full max-w-[720px]">
            <h1 className="text-3xl font-bold leading-tight sm:text-[2.6rem]">{post.title}</h1>
            {post.excerpt ? (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>
            ) : null}

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-border py-4 text-sm">
              <img src={SITE_AUTHOR.avatar} alt="" width={36} height={36} className="h-9 w-9 rounded-full bg-surface p-1" />
              <Link to="/author/basharat-ali" className="font-semibold text-foreground hover:text-primary">
                {SITE_AUTHOR.name}
              </Link>
              <span className="text-muted-foreground">·</span>
              <span className={`rounded-full border px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide ${categoryBadgeClass(post.category)}`}>
                {post.category}
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">{formatPostDate(post.published_at)}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">{readTime}</span>
            </div>

            <ShareButtons url={url} title={post.title} className="mt-4" />

            <AdSlot id="ad-slot-1" label="Ad slot 1 — below hero" className="my-8" />

            <TableOfContentsMobile headings={headings} />

            <div className="prose-article mt-8">
              <MarkdownArticle markdown={post.content} />
            </div>

            <ShareButtons
              url={url}
              title={post.title}
              heading="Found this helpful? Share it:"
              className="mt-10 border-t border-border pt-6"
            />

            <ArticleRating
              slug={post.slug}
              initialAverage={rating?.average ?? 0}
              initialCount={rating?.count ?? 0}
            />

            <NewsletterSignup source="blog_post" className="mt-8" />

            <AuthorCard />
            <RelatedPosts posts={related} />

            <div className="mt-12 rounded-xl border border-border bg-brand p-6 text-center text-brand-foreground sm:p-8">
              <h2 className="text-xl font-bold sm:text-2xl">Is your resume ATS-ready?</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-brand-foreground/75">
                Run a free compatibility check — no account, no limits, nothing stored.
              </p>
              <Link
                to="/check"
                className="mt-5 inline-flex items-center rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground transition-opacity hover:opacity-90"
              >
                Check my resume
              </Link>
            </div>

            <div className="mt-10 text-sm">
              <Link to="/blog" className="font-medium text-primary hover:underline">
                ← Back to all articles
              </Link>
            </div>
          </article>

          <div className="hidden lg:block">
            <TableOfContentsSidebar headings={headings} />
          </div>
        </div>
      </div>
    </div>
  );
}
