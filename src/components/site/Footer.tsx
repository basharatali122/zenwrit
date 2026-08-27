import { Link } from "@tanstack/react-router";
import { FileCheck2 } from "lucide-react";
import { AdSlot } from "./AdSlot";

export function Footer() {
  return (
    <footer className="mt-0 bg-brand text-brand-foreground">
      <AdSlot id="ad-slot-footer" label="Ad slot — footer" variant="banner" className="container-page py-8" />
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-base font-extrabold">
            <span className="flex size-7 items-center justify-center rounded-lg bg-gold text-gold-foreground">
              <FileCheck2 className="size-3.5" aria-hidden="true" />
            </span>
            ZenWrit
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-foreground/75">
            Free ATS Resume Checker — no signup, no limits, nothing stored.
          </p>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-brand-foreground/60">
            ZenWrit is committed to accurate, recruiter-reviewed content. Ads on this site help keep
            the tool free and never influence our scoring or advice.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Tool</p>
          <ul className="mt-4 space-y-2.5 text-sm text-brand-foreground/75">
            <li>
              <Link to="/check" className="hover:text-brand-foreground">
                ATS Resume Checker
              </Link>
            </li>
            <li>
              <Link to="/resume-scanner" className="hover:text-brand-foreground">
                Resume Scanner
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Company</p>
          <ul className="mt-4 space-y-2.5 text-sm text-brand-foreground/75">
            <li><Link to="/about" className="hover:text-brand-foreground">About</Link></li>
            <li><Link to="/blog" className="hover:text-brand-foreground">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-brand-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Legal</p>
          <ul className="mt-4 space-y-2.5 text-sm text-brand-foreground/75">
            <li><Link to="/privacy" className="hover:text-brand-foreground">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-brand-foreground">Terms of Service</Link></li>
            <li><Link to="/disclaimer" className="hover:text-brand-foreground">Disclaimer</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-foreground/15">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-brand-foreground/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ZenWrit. All rights reserved.</p>
          <p>Built for job seekers.</p>
        </div>
      </div>
    </footer>
  );
}
