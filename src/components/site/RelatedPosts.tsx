import { Link } from "@tanstack/react-router";
import { BlogCover } from "./BlogCover";
import { categoryBadgeClass } from "@/lib/content";
import type { BlogPostRecord } from "@/lib/content";

/** Same-category posts first, topped up with the most recent ones. */
export function pickRelated(posts: BlogPostRecord[], current: BlogPostRecord, limit = 3): BlogPostRecord[] {
  const others = posts.filter((post) => post.slug !== current.slug);
  const sameCategory = others.filter((post) => post.category === current.category);
  const rest = others.filter((post) => post.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export function RelatedPosts({ posts }: { posts: BlogPostRecord[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-14">
      <h2 className="text-2xl font-bold">Keep reading</h2>
      <div className="mt-2 h-px w-16 bg-gold" />
      <ul className="mt-6 grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="card-lift flex h-full flex-col overflow-hidden surface-panel p-0"
            >
              <BlogCover src={post.cover_image_url} title={post.title} category={post.category} />
              <div className="flex flex-1 flex-col p-5">
                <span className={`w-fit rounded-full border px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide ${categoryBadgeClass(post.category)}`}>
                  {post.category}
                </span>
                <h3 className="mt-3 text-base font-bold leading-snug">{post.title}</h3>
                <p className="mt-2 flex-1 text-xs text-muted-foreground">{post.reading_time}</p>
                <span className="mt-4 text-sm font-semibold text-primary">Read article →</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
