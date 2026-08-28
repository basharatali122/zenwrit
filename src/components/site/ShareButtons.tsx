import { useEffect, useState } from "react";
import { Check, Link2, Linkedin, Twitter } from "lucide-react";

const BTN =
  "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary";

export function ShareButtons({
  url,
  title,
  heading,
  className = "",
}: {
  url: string;
  title: string;
  heading?: string;
  className?: string;
}) {
  const [href, setHref] = useState(url);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") setHref(window.location.href);
  }, [url]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {heading ? <span className="mr-1 text-sm font-semibold text-foreground">{heading}</span> : null}
      <a
        className={BTN}
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(href)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Twitter className="h-3.5 w-3.5" aria-hidden="true" /> Share on X
      </a>
      <a
        className={BTN}
        href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(href)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linkedin className="h-3.5 w-3.5" aria-hidden="true" /> Share on LinkedIn
      </a>
      <button type="button" onClick={copy} className={BTN}>
        {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Link2 className="h-3.5 w-3.5" aria-hidden="true" />}
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
