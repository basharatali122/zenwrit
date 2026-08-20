import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Gauge,
  MousePointerClick,
  PenLine,
  ShieldOff,
  Sparkles,
  UserX,
  Wand2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/site/AdSlot";
import { ToolIcon } from "@/components/site/ToolIcon";
import { listPublishedTools } from "@/lib/content.functions";
import type { ToolRecord } from "@/lib/content";

export const Route = createFileRoute("/")({
  loader: async () => ({ tools: await listPublishedTools() }),
  head: () => ({
    meta: [
      { title: "ZenWrit — Free AI Tools for Creators & Professionals" },
      {
        name: "description",
        content:
          "Free AI micro-tools for resumes, cover letters, LinkedIn posts, YouTube titles and product copy. Unlimited and free, no signup needed.",
      },
      { property: "og:title", content: "ZenWrit — Free AI Tools for Creators & Professionals" },
      {
        property: "og:description",
        content:
          "Focused AI writing tools for job seekers and creators. Unlimited generations, completely free.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "ZenWrit",
          url: "https://zenwrit.com/",
          description:
            "Free AI micro-tools for resumes, cover letters, LinkedIn posts, YouTube titles and product copy.",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://zenwrit.com/tools?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  component: Home,
});

const TRUST = [
  { icon: UserX, label: "No signup required" },
  { icon: Gauge, label: "Results in ~5 seconds" },
  { icon: Sparkles, label: "Unlimited and free, no credit card" },
  { icon: BadgeCheck, label: "Built by a developer, not a template" },
];

const STEPS = [
  {
    icon: MousePointerClick,
    title: "Pick a tool",
    body: "Five single-purpose tools — no prompt engineering, no blank page.",
  },
  {
    icon: PenLine,
    title: "Describe what you need",
    body: "A few short fields: the role, the topic, the product. That is it.",
  },
  {
    icon: Wand2,
    title: "Get results in seconds",
    body: "Copy-ready output in about five seconds, tuned for the outcome.",
  },
];

const TAGS: Record<string, string[]> = {
  resume: ["#resume", "#career"],
  letter: ["#coverletter", "#jobsearch"],
  linkedin: ["#linkedin", "#personalbrand"],
  youtube: ["#youtube", "#ctr"],
  product: ["#ecommerce", "#copywriting"],
  gauge: ["#ats", "#resume", "#jobsearch"],
};

function Home() {
  const { tools } = Route.useLoaderData() as { tools: ToolRecord[] };

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden="true" />
        <div className="container-page relative grid items-start gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
              <Sparkles className="size-3.5 text-primary" />
              {tools.length} focused AI tools · built for creators &amp; job seekers
            </p>
            <h1 className="mt-6 max-w-3xl text-[2.5rem] font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-gradient-brand">Free AI tools for creators &amp; professionals</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Resume bullets, cover letters, LinkedIn posts, YouTube titles and product copy — written
              in seconds, tuned for the outcome you actually want. Start typing on the right, no
              signup, no limits.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
                <Link to="/tools">
                  Browse all tools <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="h-12 px-6 text-base">
                <Link to="/tools/ats-resume-checker">Check my resume score</Link>
              </Button>
            </div>
          </div>

          <HeroToolWidget tools={tools} />
        </div>

      </section>

      <section aria-label="Why people trust ZenWrit" className="border-b border-border bg-surface">
        <ul className="container-page grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5 text-sm font-medium">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <item.icon className="size-4" />
              </span>
              <span className="text-muted-foreground">{item.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <AdSlot id="ad-slot-home-hero" label="Ad slot — below hero" className="container-page py-10" />

      <section className="container-page py-14" aria-labelledby="tools-heading">
        <h2 id="tools-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          Pick a tool and start writing
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
          Every tool is single-purpose, mobile-friendly and completely free to use.
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <li key={tool.slug}>
              <Link
                to="/tools/$slug"
                params={{ slug: tool.slug }}
                className="group flex h-full flex-col surface-panel p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <ToolIcon icon={tool.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{tool.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {tool.short_description}
                </p>
                <span className="mt-4 flex flex-wrap gap-1.5">
                  {(TAGS[tool.icon] ?? ["#ai", "#writing"]).map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </span>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Open tool <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-border bg-surface" aria-labelledby="how-heading">
        <div className="container-page py-16">
          <h2 id="how-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            Three steps, no onboarding, no credit card.
          </p>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="surface-panel p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <step.icon className="size-5" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/*
        Impact / usage stats section — intentionally hidden until we have real
        numbers from the database. Populate with actual generation counts only.

        <section className="container-page py-16" aria-labelledby="impact-heading">
          <h2 id="impact-heading">By the numbers</h2>
          <dl className="grid gap-5 sm:grid-cols-3">
            <div><dt>Generations created</dt><dd>{realCount}</dd></div>
          </dl>
        </section>
      */}

      <section className="container-page py-16" aria-labelledby="free-heading">
        <div className="surface-panel p-7 sm:p-10">
          <h2 id="free-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything is free. Really.
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            No plans, no paywalls, no credit card. Every tool is unlimited for everyone — ads on the
            site keep the lights on.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            <li className="flex gap-2 text-sm text-muted-foreground"><Zap className="size-4 shrink-0 text-primary" /> Unlimited generations, every day</li>
            <li className="flex gap-2 text-sm text-muted-foreground"><Zap className="size-4 shrink-0 text-primary" /> All tools, including the ATS resume checker</li>
            <li className="flex gap-2 text-sm text-muted-foreground"><Zap className="size-4 shrink-0 text-primary" /> No signup needed to start</li>
            <li className="flex gap-2 text-sm text-muted-foreground"><Zap className="size-4 shrink-0 text-primary" /> Free account to save your history</li>
          </ul>
          <Button asChild size="lg" className="mt-8">
            <Link to="/tools">Start writing — free forever</Link>
          </Button>
          <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldOff className="size-3.5 text-primary" />
            No account required. No payment details, ever.
          </p>
        </div>
      </section>
    </>
  );
}

