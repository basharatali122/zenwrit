import { Link } from "@tanstack/react-router";

/** Content-relevant mid-article CTA that drives usage of the ATS checker. */
export function ArticleCta() {
  return (
    <aside className="my-9 rounded-xl border border-primary/25 bg-accent p-6 text-accent-foreground">
      <p className="text-lg font-bold text-foreground">Is your resume ATS-ready?</p>
      <p className="mt-1 text-sm text-muted-foreground">Find out in 30 seconds. Free, no signup needed.</p>
      <Link
        to="/"
        className="mt-4 inline-flex items-center rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground transition-opacity hover:opacity-90"
      >
        Check my ATS score →
      </Link>
    </aside>
  );
}
