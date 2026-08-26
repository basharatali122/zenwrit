import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Clock,
  FileUp,
  Gauge,
  ListChecks,
  Lock,
  Sparkles,
  UserX,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/site/AdSlot";
import { AtsChecker } from "@/components/site/AtsChecker";
import { BlogCover } from "@/components/site/BlogCover";
import { Reveal } from "@/components/site/Reveal";
import { listPublishedPosts } from "@/lib/content.functions";
import type { BlogPostRecord } from "@/lib/content";

const TITLE = "Free ATS Resume Checker & AI Scanner (No Signup) | ZenWrit";
const DESCRIPTION =
  "Scan your resume for free with ZenWrit. Get an instant 0-100 ATS score, identify missing keywords, and fix formatting errors to land more interviews. No signup, no credit card.";


const FAQS = [
  {
    q: "What is an ATS resume checker?",
    a: "An ATS (Applicant Tracking System) checker analyzes your resume the same way automated hiring software does — looking at keywords, formatting, structure and content — and gives you a score with specific improvements.",
  },
  {
    q: "Is ZenWrit's ATS checker really free?",
    a: "Yes, completely free with no account required and no credit card. We earn through ads shown during the experience.",
  },
  {
    q: "Does ZenWrit store my resume?",
    a: "No. Your resume is read, analyzed, and immediately discarded. We never store, share, or use your resume data.",
  },
  {
    q: "How accurate is the ATS score?",
    a: "ZenWrit uses GPT-4o to simulate ATS analysis across 20+ checks. While no checker can replicate every ATS system exactly, our scoring is calibrated to real recruiter expectations and keyword-matching patterns used by major ATS platforms like Workday, Greenhouse, and Lever.",
  },
  {
    q: "Do I need to paste a job description?",
    a: "No — the tool works without one. But adding a job description enables keyword matching and shows exactly which keywords from that specific job you are missing, which significantly improves the accuracy.",
  },
  {
    q: "What file formats are supported?",
    a: "PDF and DOCX files up to 5MB.",
  },
] as const;

export const Route = createFileRoute("/")({
  loader: async () => ({ posts: await listPublishedPosts() }),
  head: () => ({
    meta: [
      { title: "Free ATS Resume Checker — Instant Score & Fixes | ZenWrit" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://zenwrit.com/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://zenwrit.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "ZenWrit ATS Resume Checker",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Free ATS resume checker with 20+ checks, keyword analysis, and specific fixes. No signup required.",
          url: "https://zenwrit.com",
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
    ],
  }),
  component: Home,
});

const HERO_BADGES = [
  { icon: Lock, label: "Never stored" },
  { icon: Clock, label: "~30 seconds" },
  { icon: ListChecks, label: "20+ checks" },
  { icon: UserX, label: "No account needed" },
];

const COMPANIES = ["Microsoft", "Google", "Amazon", "Meta", "Apple", "Stripe", "Shopify"];

const STEPS = [
  {
    icon: FileUp,
    title: "Upload your resume",
    body: "PDF or DOCX. We extract the text and never store your file.",
  },
  {
    icon: ListChecks,
    title: "Paste the job description",
    body: "Optional but adds keyword matching — shows exactly which keywords you're missing.",
  },
  {
    icon: Gauge,
    title: "Get your ATS report",
    body: "A 0–100 score, 20+ specific checks, missing keywords, and prioritised fixes — in about 30 seconds.",
  },
];

const COMPARISON = [
  { bad: "Jobscan: $49/month after trial", good: "ZenWrit: Free, forever" },
  { bad: "Most tools: Require signup first", good: "ZenWrit: Check instantly, no account" },
  {
    bad: "Generic feedback",
    good: "ZenWrit: 20+ specific checks with exact fixes, not vague suggestions",
  },
  { bad: "Your resume stored on their servers", good: "ZenWrit: Never stored, never shared" },
];

function Home() {
  const { posts } = Route.useLoaderData() as { posts: BlogPostRecord[] };

  return (
    <div>
      {/* HERO */}
      <section className="border-b border-border bg-surface/40">
        <div className="container-page py-16 text-center sm:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-accent px-3.5 py-1.5 text-xs font-semibold text-accent-foreground">
            <Sparkles className="size-3.5" />
            #1 Free ATS Resume Checker — No Signup
          </span>

          <h1 className="zw-fade-up mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Is your resume getting filtered out before a human sees it?
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Upload your resume and paste the job description. Get a 0–100 ATS score, missing
            keywords, format issues, and recruiter red flags — in under 30 seconds. Free, forever.
            No account needed.
          </p>

          <ul className="mx-auto mt-6 flex max-w-xl flex-col items-center gap-2 text-sm font-medium sm:flex-row sm:justify-center sm:gap-6">
            <li className="flex items-center gap-2">
              <Check className="size-4 text-green-600 dark:text-green-400" />
              20+ checks across 5 categories
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4 text-green-600 dark:text-green-400" />
              Your resume is never stored or shared
            </li>
          </ul>

          <div className="mt-9">
            <Button asChild size="lg" className="h-14 px-8 text-base">
              <a href="#ats-tool">Check My ATS Score Free →</a>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {HERO_BADGES.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
              >
                <Icon className="size-3.5 text-primary" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="border-b border-border">
        <div className="container-page flex flex-wrap items-center justify-center gap-3 py-6 text-xs text-muted-foreground">
          <span className="font-medium">Used by job seekers applying to</span>
          {COMPANIES.map((company) => (
            <span
              key={company}
              className="rounded-full bg-muted px-3 py-1 font-medium text-muted-foreground/90"
            >
              {company}
            </span>
          ))}
          <span>and more</span>
        </div>
      </section>

      <AdSlot id="ad-slot-1" label="Ad slot 1 — below hero" className="container-page pt-8" />

      {/* THE TOOL */}
      <section id="ats-tool" className="container-page scroll-mt-20 py-14">
        <Reveal>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Paste your resume below — results in ~30 seconds
          </h2>
        </Reveal>
        <div className="mx-auto mt-8 max-w-3xl">
          <AtsChecker />
        </div>
      </section>

      <AdSlot id="ad-slot-2" label="Ad slot 2 — below tool" className="container-page" />

      {/* HOW IT WORKS */}
      <section className="container-page py-16">
        <Reveal>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">How it works</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 90}>
              <div className="surface-panel card-lift h-full p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <step.icon className="size-5" />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-primary">
                  Step {index + 1}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY ZENWRIT */}
      <section className="border-y border-border bg-surface/40">
        <div className="container-page py-16">
          <Reveal>
            <h2 className="text-center text-2xl font-bold sm:text-3xl">
              Why job seekers choose ZenWrit over paid tools
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {COMPARISON.map((item, index) => (
              <Reveal key={item.good} delay={index * 80}>
                <div className="surface-panel card-lift h-full p-6">
                  <p className="flex items-start gap-2.5 text-sm text-muted-foreground line-through decoration-red-500/50">
                    <X className="mt-0.5 size-4 shrink-0 text-red-500 no-underline" />
                    <span>{item.bad}</span>
                  </p>
                  <p className="mt-4 flex items-start gap-2.5 text-sm font-semibold">
                    <Check className="mt-0.5 size-4 shrink-0 text-green-600 dark:text-green-400" />
                    <span>{item.good}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AdSlot id="ad-slot-3" label="Ad slot 3 — after comparison" className="container-page pt-10" />

      {/* FAQ */}
      <section className="container-page py-16">
        <Reveal>
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Frequently asked questions</h2>
        </Reveal>
        <dl className="mx-auto mt-10 max-w-3xl divide-y divide-border rounded-2xl border border-border bg-surface">
          {FAQS.map((faq) => (
            <div key={faq.q} className="p-6">
              <dt className="text-base font-semibold">{faq.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <AdSlot id="ad-slot-4" label="Ad slot 4 — after FAQ" className="container-page" />

      {/* BLOG PREVIEW */}
      {posts.length ? (
        <section className="container-page py-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-bold sm:text-3xl">Resume advice worth reading</h2>
            <Link to="/blog" className="text-sm font-medium text-primary hover:underline">
              Read all articles →
            </Link>
          </div>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <li key={post.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="flex h-full flex-col overflow-hidden surface-panel card-lift p-0"
                >
                  <BlogCover src={post.cover_image_url} title={post.title} category={post.category} />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-medium uppercase tracking-wide text-primary">
                      {post.category}
                    </p>
                    <h3 className="mt-2 text-base font-semibold">{post.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* FINAL CTA */}
      <section className="container-page pb-20">
        <div className="rounded-3xl border border-primary/30 bg-accent px-6 py-14 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to find out your ATS score?</h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Takes 30 seconds. Free forever.
          </p>
          <Button asChild size="lg" className="mt-7 h-14 px-8 text-base">
            <a href="#ats-tool">
              Check My Resume Now <ArrowRight />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
