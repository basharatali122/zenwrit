import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type Heading = { id: string; text: string };

function scrollToHeading(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

function List({ headings }: { headings: Heading[] }) {
  return (
    <ol className="mt-3 space-y-2 text-sm">
      {headings.map((heading, index) => (
        <li key={heading.id} className="flex gap-2 leading-snug">
          <span className="text-xs font-semibold text-gold">{index + 1}.</span>
          <a
            href={`#${heading.id}`}
            onClick={(event) => scrollToHeading(event, heading.id)}
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Collapsible TOC shown above the article on mobile / narrow screens. */
export function TableOfContentsMobile({ headings }: { headings: Heading[] }) {
  const [open, setOpen] = useState(false);
  if (headings.length < 3) return null;

  return (
    <div className="my-6 rounded-xl border border-border bg-surface p-4 lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-sm font-bold text-foreground"
      >
        In this article:
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open ? <List headings={headings} /> : null}
    </div>
  );
}

/** Sticky sidebar TOC for desktop. */
export function TableOfContentsSidebar({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-24 rounded-xl border border-border bg-surface p-5">
      <p className="text-sm font-bold text-foreground">In this article:</p>
      <div className="mt-2 h-px w-10 bg-gold" />
      <List headings={headings} />
    </nav>
  );
}
