import { Link } from "@tanstack/react-router";
import logo from "@/assets/zenwrit-logo.png";

export const AUTHOR_NAME = "ZenWrit Editorial Team";
export const AUTHOR_ROLE = "Resume & ATS research desk";
export const AUTHOR_BIO =
  "We test resumes against real applicant tracking systems — Workday, Greenhouse, Lever, iCIMS and Taleo — and write up what actually changes callbacks. Every article is reviewed for accuracy before it goes live, and our advice is never influenced by advertising.";

export function AuthorByline({ date, readingTime }: { date?: string | null; readingTime?: string }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-4">
      <img
        src={logo}
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 rounded-full bg-surface p-1"
      />
      <div className="text-sm">
        <p className="font-semibold text-foreground">
          <Link to="/author/editorial-team" className="hover:text-primary hover:underline">
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
        <Link to="/author/editorial-team" className="shrink-0">
          <img
            src={logo}
            alt="ZenWrit editorial team"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full bg-card p-2"
          />
        </Link>
        <div>
          <p className="text-base font-semibold text-foreground">
            <Link to="/author/editorial-team" className="hover:text-primary hover:underline">
              {AUTHOR_NAME}
            </Link>
          </p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{AUTHOR_ROLE}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{AUTHOR_BIO}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link to="/author/editorial-team" className="font-medium text-primary hover:underline">
              View author profile
            </Link>
            <Link to="/about" className="font-medium text-primary hover:underline">
              Editorial policy
            </Link>
            <Link to="/contact" className="font-medium text-primary hover:underline">
              Contact the desk
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
