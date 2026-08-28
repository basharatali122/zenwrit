import { createFileRoute, Link } from "@tanstack/react-router";
import { FileSearch } from "lucide-react";
import { AdSlot } from "@/components/site/AdSlot";
import { AtsChecker } from "@/components/site/AtsChecker";

const TITLE = "Free Resume Scanner — Scan Your Resume Against Any Job | ZenWrit";
const DESCRIPTION =
  "Scan your resume online for free. ZenWrit's AI resume scanner reads your PDF or DOCX like an ATS does, flags parsing and formatting issues, and lists the keywords you're missing.";
const OG_IMAGE = "https://zenwrit.com/og-image.png";

const SCANS = [
  {
    title: "Parsing scan",
    body: "Checks whether an ATS can actually read your file: text layers, columns, tables, headers, footers, graphics and unusual fonts.",
  },
  {
    title: "Keyword scan",
    body: "Paste a job description and the scanner compares it to your resume, listing the exact hard skills and terms that are missing.",
  },
  {
    title: "Structure scan",
    body: "Verifies standard section headings, reverse-chronological order, consistent dates and contact details a parser can map.",
  },
  {
    title: "Content scan",
    body: "Looks for measurable results, strong action verbs, filler phrases and clichés that make recruiters skim past you.",
  },
  {
    title: "Red-flag scan",
    body: "Surfaces employment gaps, inconsistent tenses, overlong bullets and other details that trigger recruiter hesitation.",
  },
  {
    title: "Scored report",
    body: "Everything rolls up into a 0–100 score with prioritised fixes quoted directly from your own resume text.",
  },
] as const;

const FAQS = [
  {
    q: "What does a resume scanner actually do?",
    a: "A resume scanner reads your resume the way applicant tracking software does — extracting the raw text, mapping it into fields like experience and education, then matching it against a job description. ZenWrit shows you what that extraction produced and where it broke down.",
  },
  {
    q: "Is this resume scanner free?",
    a: "Yes. There is no account, no credit card and no scan limit. Ads shown around the tool cover the cost.",
  },
  {
    q: "What is the difference between a resume scanner and an ATS checker?",
    a: "They are two names for the same job. A scanner emphasises reading and extracting your resume; an ATS checker emphasises scoring it. ZenWrit does both in one pass.",
  },
  {
    q: "Which file types can I scan?",
    a: "PDF and DOCX files up to 5MB. PDFs exported directly from a word processor scan most reliably.",
  },
] as const;

export const Route = createFileRoute("/resume-scanner")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://zenwrit.com/resume-scanner" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://zenwrit.com/resume-scanner" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "ZenWrit Resume Scanner",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web Browser",
          url: "https://zenwrit.com/resume-scanner",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            description: "Free, no signup required",
          },
          description: DESCRIPTION,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://zenwrit.com/" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Resume Scanner",
              item: "https://zenwrit.com/resume-scanner",
            },
          ],
        }),
      },
    ],
  }),
  component: ResumeScannerPage,
});

function ResumeScannerPage() {
  return (
    <div className="container-page py-10">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-1.5">/</span>
        <span className="text-foreground">Resume Scanner</span>
      </nav>

      <header className="mt-5 flex items-start gap-4">
        <span className="hidden size-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground sm:flex">
          <FileSearch className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">Free Resume Scanner</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Scan your resume the way hiring software does. Upload a PDF or DOCX, optionally paste
            the job description, and see what the parser reads, what it drops, and which keywords
            you're missing — in about 30 seconds.
          </p>
        </div>
      </header>

      <AdSlot id="ad-slot-scanner-top" label="Ad slot — below hero" className="mt-6" />

      <div className="mt-8 max-w-3xl">
        <AtsChecker />
      </div>

      <section className="mt-14 max-w-4xl">
        <h2 className="text-2xl font-bold">What the scanner looks at</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {SCANS.map((scan) => (
            <div key={scan.title} className="surface-panel p-5">
              <h3 className="text-base font-semibold">{scan.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{scan.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 max-w-2xl">
        <h2 className="text-2xl font-bold">Resume scanner FAQ</h2>
        <dl className="mt-6 space-y-6">
          {FAQS.map((faq) => (
            <div key={faq.q}>
              <dt>
                <h3 className="text-base font-semibold">{faq.q}</h3>
              </dt>
              <dd className="mt-2 text-sm text-muted-foreground">{faq.a}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-sm text-muted-foreground">
          Want the scoring-first view instead? Use the{" "}
          <Link to="/check" className="text-primary hover:underline">
            ATS resume checker
          </Link>{" "}
          or read more on the{" "}
          <Link to="/blog" className="text-primary hover:underline">
            blog
          </Link>
          .
        </p>
      </section>

      <AdSlot id="ad-slot-scanner-bottom" label="Ad slot — below content" className="mt-10" />
    </div>
  );
}
