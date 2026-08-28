import { Link } from "@tanstack/react-router";
import { Mail, FileCheck2, BookOpen } from "lucide-react";
import { AdSlot } from "./AdSlot";
import logo from "@/assets/zenwrit-logo.png";

const usefulLinks = [
  { to: "/about", label: "About Us" },
  { to: "/author/basharat-ali", label: "About the Author" },
  { to: "/contact", label: "Contact Us" },
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/blog", label: "Blog" },
  { to: "/dmca", label: "DMCA" },
  { to: "/editorial-guidelines", label: "Editorial Guidelines" },
  { to: "/terms", label: "Terms of Service" },
] as const;

export function Footer() {
  return (
    <footer className="mt-0 bg-brand text-brand-foreground">
      <AdSlot id="ad-slot-footer" label="Ad slot — footer" variant="banner" className="container-page py-8" />

      <div className="container-page grid gap-12 py-14 md:grid-cols-3">
        {/* Brand + mission */}
        <div>
          <Link to="/" className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight">
            <img
              src={logo}
              alt="ZenWrit logo"
              width={34}
              height={34}
              loading="lazy"
              className="size-8 shrink-0 rounded-md bg-brand-foreground object-contain p-0.5"
            />
            Zen<span className="text-gold">Writ</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-foreground/75">
            ZenWrit exists for job seekers who are tired of being filtered out by software before a
            human ever reads their resume. Our free ATS Resume Checker shows you exactly how
            applicant tracking systems parse, score and rank your resume — and how to fix it.
          </p>
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-brand-foreground/60">
            Ads on this site help keep the tool free. They never influence our scoring or our
            advice.
          </p>
        </div>

        {/* Useful links */}
        <div className="md:justify-self-center">
          <p className="font-display text-base font-bold">Useful Links</p>
          <ul className="mt-5 space-y-2.5 text-sm text-brand-foreground/75">
            {usefulLinks.map((link) => (
              <li key={link.to} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-gold" aria-hidden="true" />
                <Link to={link.to} className="transition-colors hover:text-brand-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* The tool */}
        <div className="md:justify-self-end">
          <p className="font-display text-base font-bold">The Tool</p>
          <div className="mt-5 flex flex-col items-start gap-3">
            <Link
              to="/check"
              className="inline-flex items-center gap-2.5 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-gold/85"
            >
              <FileCheck2 className="size-4" aria-hidden="true" />
              ATS Resume Checker
            </Link>
            <Link
              to="/resume-scanner"
              className="inline-flex items-center gap-2.5 rounded-full border border-brand-foreground/25 px-5 py-2.5 text-sm font-medium text-brand-foreground/85 transition-colors hover:bg-brand-foreground/10"
            >
              <BookOpen className="size-4" aria-hidden="true" />
              Resume Scanner Guide
            </Link>
            <a
              href="mailto:support@zenwrit.app"
              className="inline-flex items-center gap-2.5 rounded-full border border-brand-foreground/25 px-5 py-2.5 text-sm font-medium text-brand-foreground/85 transition-colors hover:bg-brand-foreground/10"
            >
              <Mail className="size-4" aria-hidden="true" />
              support@zenwrit.app
            </a>
          </div>
        </div>
      </div>

      {/* Editorial promise */}
      <div className="container-page">
        <p className="mx-auto max-w-2xl border-t border-brand-foreground/15 pt-6 text-center text-sm text-brand-foreground/70">
          Every guide on ZenWrit is fact-checked, reviewed for accuracy, and carefully proofread
          against how real ATS platforms work before it goes live.
        </p>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 border-t border-brand-foreground/15">
        <div className="container-page flex flex-col items-center gap-1.5 py-6 text-center text-xs text-brand-foreground/65">
          <p>© {new Date().getFullYear()} ZenWrit | All Rights Reserved</p>
          <p>Built for job seekers. Free forever — no signup, no limits, nothing stored.</p>
        </div>
      </div>
    </footer>
  );
}
