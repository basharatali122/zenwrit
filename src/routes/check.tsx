import { createFileRoute, Link } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { AdSlot } from "@/components/site/AdSlot";
import { AtsChecker } from "@/components/site/AtsChecker";

const TITLE = "Free Resume Checker — ATS Score & Fixes in 30 Seconds | ZenWrit";
const DESCRIPTION =
  "Free resume checker and ATS score checker. Upload a PDF or DOCX, paste the job description, and get a 0-100 ATS compatibility score with 20+ checks and exact fixes. No signup, no limits.";
const OG_IMAGE = "https://zenwrit.com/og-image.png";

const STEPS = [
  {
    title: "1. Upload your resume",
    body: "Drop in a PDF or DOCX up to 5MB. Nothing is stored after the check runs, and you never create an account.",
  },
  {
    title: "2. Paste the job description",
    body: "Optional, but it turns a generic check into a targeted one: the checker compares your resume against the exact terms in that posting.",
  },
  {
    title: "3. Read your ATS score report",
    body: "You get a 0-100 score, a breakdown by category, missing keywords, and fixes quoted from your own resume lines — usually in under 30 seconds.",
  },
] as const;

const CHECKS = [
  {
    title: "Parsing and file structure",
    body: "Columns, tables, text boxes, headers, footers, images and non-standard fonts are the top reasons an ATS reads a resume as gibberish. The checker flags each one it finds.",
  },
  {
    title: "Section headings",
    body: "Applicant tracking software maps content by heading. Creative labels like 'My Journey' instead of 'Experience' can drop entire blocks of your history.",
  },
  {
    title: "Keyword match",
    body: "Hard skills, tools, certifications and role titles from the job description are matched against your resume, with the misses listed explicitly.",
  },
  {
    title: "Dates and job history",
    body: "Inconsistent date formats, overlapping roles and unexplained gaps confuse parsers and slow recruiters down.",
  },
  {
    title: "Impact and measurability",
    body: "Bullets without numbers, weak verbs and duty-listing language get flagged, with rewrites suggested from your own content.",
  },
  {
    title: "Contact and formatting basics",
    body: "Email, phone and location must sit in the body text — not in a header or an image — for a parser to pick them up.",
  },
] as const;

const FAQS = [
  {
    q: "Is this resume checker really free?",
    a: "Yes. There is no account, no credit card, no trial and no daily limit. Ads displayed around the tool cover the running cost, so the checker itself stays free.",
  },
  {
    q: "What is a good ATS score?",
    a: "Above 80 is strong for the specific job you pasted, 60-79 usually means keyword or formatting gaps worth fixing, and below 60 means the resume likely needs structural changes before you apply. Scores are relative to one job description, so the same resume can score differently across roles.",
  },
  {
    q: "How is an ATS resume checker different from a resume scanner?",
    a: "They describe the same process from two angles. A resume scanner emphasises reading and extracting your file the way hiring software does; an ATS checker emphasises scoring the result. ZenWrit runs both in a single pass — the resume scanner page is the extraction-first view of the same engine.",
  },
  {
    q: "Do I need the job description to check my resume?",
    a: "No, but it matters. Without it you get formatting, parsing and content feedback. With it you also get keyword matching, which is where most rejections actually happen.",
  },
  {
    q: "Which file formats work best?",
    a: "PDF and DOCX. A PDF exported directly from a word processor parses most reliably; scanned or image-based PDFs have no text layer and cannot be read by any ATS.",
  },
  {
    q: "Is my resume stored or shared?",
    a: "No. Your file is processed to produce the report and is not kept or sold. See the privacy policy for the full detail.",
  },
] as const;

export const Route = createFileRoute("/check")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://zenwrit.com/check" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://zenwrit.com/check" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "ZenWrit ATS Resume Checker",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: "https://zenwrit.com/check",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Free ATS resume checker with 20+ checks, keyword analysis, and specific fixes. No signup required.",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to check your resume against an ATS",
          totalTime: "PT1M",
          step: STEPS.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.title.replace(/^\d+\.\s*/, ""),
            text: step.body,
          })),
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
              name: "Resume Checker",
              item: "https://zenwrit.com/check",
            },
          ],
        }),
      },
    ],
  }),
  component: CheckPage,
});

function CheckPage() {
  return (
    <div className="container-page py-10">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-1.5">/</span>
        <span className="text-foreground">Resume Checker</span>
      </nav>

      <header className="mt-5 flex items-start gap-4">
        <span className="hidden size-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground sm:flex">
          <Gauge className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">Free Resume Checker &amp; ATS Score Checker</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Upload your resume, paste the job description, and get a 0–100 ATS score with 20+ checks
            and exact fixes — in about 30 seconds. No signup, no limits.
          </p>
        </div>
      </header>

      <AdSlot id="ad-slot-check-top" label="Ad slot — below hero" className="mt-6" />

      <div className="mt-8 max-w-3xl">
        <AtsChecker />
      </div>

      <AdSlot id="ad-slot-check-bottom" label="Ad slot — below tool" className="mt-10" />

      <section className="mt-14 max-w-4xl">
        <h2 className="text-2xl font-bold">How the resume check works</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.title} className="surface-panel p-5">
              <h3 className="text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 max-w-4xl">
        <h2 className="text-2xl font-bold">What gets checked</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Most resumes are not rejected because of the person behind them — they are rejected
          because hiring software could not read the file, could not find the expected sections, or
          could not match the wording to the job. These are the areas the checker inspects.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {CHECKS.map((check) => (
            <div key={check.title} className="surface-panel p-5">
              <h3 className="text-base font-semibold">{check.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{check.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 max-w-2xl">
        <h2 className="text-2xl font-bold">Resume checker FAQ</h2>
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
          Prefer the extraction-first view? Try the{" "}
          <Link to="/resume-scanner" className="text-primary hover:underline">
            free resume scanner
          </Link>
          , or read the{" "}
          <Link to="/blog" className="text-primary hover:underline">
            ATS guides on the blog
          </Link>{" "}
          for the fixes behind each score.
        </p>
      </section>
    </div>
  );
}
