import { Link } from "@tanstack/react-router";
import { SITE_AUTHOR } from "@/lib/author";

export const AUTHOR_NAME = SITE_AUTHOR.name;
export const AUTHOR_ROLE = SITE_AUTHOR.role;
export const AUTHOR_BIO = SITE_AUTHOR.bio;

export function AuthorByline({ date, readingTime }: { date?: string | null; readingTime?: string }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-4">
      <img
        src={SITE_AUTHOR.avatar}
        alt={SITE_AUTHOR.name}
        width={36}
        height={36}
        className="h-9 w-9 rounded-full object-cover"
      />
      <div className="text-sm">
        <p className="font-semibold text-foreground">
          <Link to="/author/basharat-ali" className="hover:text-primary hover:underline">
            {AUTHOR_NAME}
          </Link>
        </p>
        <p className="text-xs text-muted-foreground">
          {date ? `${new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}` : "Updated regularly"}
          {readingTime ? ` · ${readingTime}` : ""}
        </p>
      </div>
    </div>
  );
}

export function AuthorBio() {
  return (
    <aside className="mt-12 rounded-xl border border-border bg-surface p-6 sm:p-7">
      <span className="eyebrow">About the author</span>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row">
        <Link to="/author/basharat-ali" className="shrink-0">
          <img
            src={SITE_AUTHOR.avatar}
            alt={SITE_AUTHOR.name}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover"
          />
        </Link>
        <div>
          <p className="text-base font-semibold text-foreground">
            <Link to="/author/basharat-ali" className="hover:text-primary hover:underline">
              {AUTHOR_NAME}
            </Link>
          </p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{AUTHOR_ROLE}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{AUTHOR_BIO}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link to="/author/basharat-ali" className="font-medium text-primary hover:underline">
              View author profile
            </Link>
            <Link to="/about" className="font-medium text-primary hover:underline">
              Editorial policy
            </Link>
            <Link to="/contact" className="font-medium text-primary hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
