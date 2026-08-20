import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import type { ToolRecord } from "@/lib/content";
import { AdSlot } from "./AdSlot";

export function Footer({ tools }: { tools: ToolRecord[] }) {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <AdSlot id="ad-slot-footer" label="Ad slot — footer" variant="banner" className="container-page py-8" />
      <div className="container-page grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-base font-bold">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-3.5" />
            </span>
            ZenWrit
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Free, unlimited AI micro-tools for creators and professionals. No signup, no
            subscription, no limits.
          </p>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted-foreground">
            ZenWrit is committed to accurate, helpful content. Ads on this site help keep our
            tools free.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground">Tools</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">

            {tools.map((tool) => (
              <li key={tool.slug}>
                <Link
                  to="/tools/$slug"
                  params={{ slug: tool.slug }}
                  className="hover:text-foreground"
                >
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground">Company</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground">Legal</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">Terms of Service</Link></li>
            <li><Link to="/disclaimer" className="hover:text-foreground">Disclaimer</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ZenWrit. All rights reserved.</p>
          <p>Built for creators and job seekers.</p>
        </div>
      </div>
    </footer>
  );
}
