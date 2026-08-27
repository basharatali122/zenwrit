import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  FileUp,
  Gauge,
  ListChecks,
  Lock,
  ShieldCheck,
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
import heroImage from "@/assets/hero-resume.jpg";

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
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Free ATS Resume Checker — Instant Score | ZenWrit" },
      {
        property: "og:description",
        content:
          "Upload your resume and get a free ATS score in 30 seconds. 20+ checks, missing keywords, specific fixes. No signup needed.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://zenwrit.com/" },
      { property: "og:site_name", content: "ZenWrit" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Free ATS Resume Checker | ZenWrit" },
      {
        name: "twitter:description",
        content: "Free ATS score in 30 seconds. No signup needed.",
      },
    ],
    links: [{ rel: "canonical", href: "https://zenwrit.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "ZenWrit",
          url: "https://zenwrit.com",
          description: "Free ATS resume checker with instant scoring and specific fixes.",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://zenwrit.com/blog?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "ZenWrit ATS Resume Checker",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web Browser",
          url: "https://zenwrit.com",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            description: "Free, no signup required",
          },
          description:
            "Free ATS resume checker that scores your resume across 20+ checks including keyword matching, formatting, content quality and recruiter red flags.",
          featureList: [
            "0-100 ATS compatibility score",
            "Keyword gap analysis",
            "20+ resume checks",
            "No signup required",
            "PDF and DOCX support",
            "Results in 30 seconds",
          ],
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

const START_CARDS = [
  {
    icon: Gauge,
    title: "Score my resume",
    body: "Upload a PDF or DOCX and get a 0–100 ATS score with exact fixes.",
    cta: "Run the check",
    to: "/check" as const,
  },
  {
    icon: ListChecks,
    title: "Match a job description",
    body: "See the precise keywords a specific job posting expects you to have.",
    cta: "Try keyword match",
    to: "/resume-scanner" as const,
  },
  {
    icon: BookOpen,
    title: "Learn what recruiters see",
    body: "Practical, recruiter-reviewed guides on resumes, keywords and formatting.",
    cta: "Read the guides",
    to: "/blog" as const,
  },
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

function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: { label: string; to: "/blog" | "/check" };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      </div>
      {action ? (
        <Link
          to={action.to}
          className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary transition-colors hover:bg-accent"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}

function Home() {
  const { posts } = Route.useLoaderData() as { posts: BlogPostRecord[] };

  return (
    <div>
      {/* HERO */}
      <section className="bg-brand text-brand-foreground">
        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-foreground/25 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-foreground/85">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              Free forever — no signup
            </span>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Your Resume Deserves
              <br />
              A Real ATS Score.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-foreground/80 sm:text-lg">
              Upload your resume, paste the job description, and see exactly why hiring software
              filters you out — missing keywords, formatting faults and recruiter red flags, scored
              in about 30 seconds.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-13 bg-gold px-7 text-base font-semibold text-gold-foreground hover:bg-gold/90"
              >
                <a href="#ats-tool">Check My Resume Free</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 border-brand-foreground/30 bg-transparent px-7 text-base text-brand-foreground hover:bg-brand-foreground/10 hover:text-brand-foreground"
              >
                <Link to="/blog">Read Resume Guides</Link>
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
              {HERO_BADGES.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-xs font-medium text-brand-foreground/75"
                >
                  <Icon className="size-3.5 text-gold" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl border border-gold/40" aria-hidden="true" />
            <img
              src={heroImage}
              alt="Job seeker reviewing a resume next to an ATS score dashboard"
              width={1200}
              height={1008}
              className="relative aspect-[6/5] w-full rounded-2xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="border-b border-border bg-surface">
        <div className="container-page flex flex-wrap items-center justify-center gap-3 py-5 text-xs text-muted-foreground">
          <span className="font-semibold uppercase tracking-widest">
            Used by job seekers applying to
          </span>
          {COMPANIES.map((company) => (
            <span key={company} className="rounded-full bg-background px-3 py-1 font-medium">
              {company}
            </span>
          ))}
        </div>
      </section>

      {/* START HERE */}
      <section className="container-page py-14">
        <Reveal>
          <h2 className="text-center font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Where would you like to start?
          </h2>
        </Reveal>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {START_CARDS.map((card, index) => (
            <Reveal key={card.title} delay={index * 80}>
              <Link
                to={card.to}
                className="surface-panel card-lift flex h-full flex-col p-6 hover:border-primary/40"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand text-brand-foreground">
                  <card.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{card.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {card.body}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                  {card.cta} <ArrowRight className="size-3.5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <AdSlot id="ad-slot-1" label="Ad slot 1 — below hero" className="container-page pt-2" />

      {/* THE TOOL */}
      <section id="ats-tool" className="border-y border-border bg-surface scroll-mt-20">
        <div className="container-page py-14">
          <Reveal>
            <div className="text-center">
              <span className="eyebrow">The tool</span>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Scan your resume — results in ~30 seconds
              </h2>
            </div>
          </Reveal>
          <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-6">
            <AtsChecker />
          </div>
        </div>
      </section>

      <AdSlot id="ad-slot-2" label="Ad slot 2 — below tool" className="container-page pt-10" />

      {/* HOW IT WORKS */}
      <section className="container-page py-16">
        <Reveal>
          <SectionHeading eyebrow="Process" title="How the ATS check works" />
        </Reveal>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 90}>
              <div className="surface-panel card-lift h-full p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Step {index + 1}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY ZENWRIT */}
      <section className="border-y border-border bg-surface">
        <div className="container-page py-16">
          <Reveal>
            <SectionHeading eyebrow="Comparison" title="Why job seekers choose ZenWrit" />
          </Reveal>
          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            {COMPARISON.map((item, index) => (
              <Reveal key={item.good} delay={index * 80}>
                <div className="surface-panel card-lift h-full p-6">
                  <p className="flex items-start gap-2.5 text-sm text-muted-foreground line-through decoration-destructive/50">
                    <X className="mt-0.5 size-4 shrink-0 text-destructive no-underline" aria-hidden="true" />
                    <span>{item.bad}</span>
                  </p>
                  <p className="mt-4 flex items-start gap-2.5 text-sm font-semibold">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    <span>{item.good}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AdSlot id="ad-slot-3" label="Ad slot 3 — after comparison" className="container-page pt-10" />

      {/* BLOG */}
      {posts.length ? (
        <section className="container-page py-16">
          <div className="section-frame p-6 sm:p-8">
            <SectionHeading
              eyebrow="Latest"
              title="Resume advice worth reading"
              action={{ label: "See all", to: "/blog" }}
            />
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {posts.slice(0, 6).map((post) => (
                <li key={post.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="surface-panel card-lift flex h-full flex-col overflow-hidden p-0"
                  >
                    <BlogCover src={post.cover_image_url} title={post.title} category={post.category} />
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                        {post.category}
                      </p>
                      <h3 className="mt-2 font-display text-base font-bold leading-snug">
                        {post.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* TRUST / EDITORIAL */}
      <section className="border-y border-border bg-surface">
        <div className="container-page grid gap-8 py-16 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="eyebrow">Who is behind ZenWrit</span>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Built by people who read resumes for a living
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              ZenWrit exists because most resume tools sell a subscription before they tell you
              anything useful. Our checker applies the same parsing and keyword logic used by major
              applicant tracking systems, then explains every deduction in plain English.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Every guide we publish is written and reviewed against current recruiter practice, and
              updated when hiring platforms change. Ads keep the tool free — they never influence
              our scoring or our advice.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/about">More about ZenWrit</Link>
            </Button>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "20+ checks", d: "Across formatting, structure, keywords, content and red flags." },
              { t: "Nothing stored", d: "Your file is parsed in memory and discarded immediately." },
              { t: "No paywall", d: "Unlimited checks, no account, no credit card, ever." },
              { t: "Real ATS logic", d: "Calibrated to Workday, Greenhouse, Lever, iCIMS and Taleo." },
            ].map((item) => (
              <div key={item.t} className="surface-panel p-5">
                <dt className="font-display text-base font-bold">{item.t}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page py-16">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        </Reveal>
        <dl className="mt-9 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {FAQS.map((faq) => (
            <div key={faq.q} className="p-6">
              <dt>
                <h3 className="font-display text-base font-bold">{faq.q}</h3>
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <AdSlot id="ad-slot-4" label="Ad slot 4 — after FAQ" className="container-page" />

      {/* FINAL CTA */}
      <section className="bg-brand text-brand-foreground">
        <div className="container-page py-16 text-center">
          <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Ready to find out your ATS score?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-brand-foreground/80 sm:text-base">
            Takes about 30 seconds. Free forever, no account needed.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-7 h-13 bg-gold px-8 text-base font-semibold text-gold-foreground hover:bg-gold/90"
          >
            <a href="#ats-tool">
              Check My Resume Now <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
