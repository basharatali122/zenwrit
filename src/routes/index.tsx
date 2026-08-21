import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Gauge,
  Linkedin,
  ListChecks,
  MousePointerClick,
  PenLine,
  ShieldOff,
  Sparkles,
  Star,
  UserX,
  Wand2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/site/AdSlot";
import { ToolIcon } from "@/components/site/ToolIcon";
import { HeroToolWidget } from "@/components/site/HeroToolWidget";
import { AtsScorePreview } from "@/components/site/AtsScorePreview";
import { Reveal } from "@/components/site/Reveal";
import { listPublishedTools } from "@/lib/content.functions";
import type { ToolRecord } from "@/lib/content";

export const Route = createFileRoute("/")({
  loader: async () => ({ tools: await listPublishedTools() }),
  head: () => ({
    meta: [
      { title: "ZenWrit — Free ATS Resume Checker & AI Writing Tools" },
      {
        name: "description",
        content:
          "Score your resume against any job description, generate LinkedIn posts and resume bullet points with free AI tools. Unlimited, no signup required.",
      },
      { property: "og:title", content: "ZenWrit — Free ATS Resume Checker & AI Writing Tools" },
      {
        property: "og:description",
        content:
          "Free ATS resume checker, LinkedIn post generator and resume bullet point generator. Unlimited generations, no signup.",
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
            "Free ATS resume checker plus AI micro-tools for resumes, cover letters, LinkedIn posts, YouTube titles and product copy.",
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
  { icon: Gauge, label: "Results in seconds" },
  { icon: Sparkles, label: "Unlimited and free, no credit card" },
  { icon: BadgeCheck, label: "Built by a developer, not a template" },
];

const FLAGSHIP = [
  {
    icon: Gauge,
    slug: "ats-resume-checker",
    eyebrow: "Most used",
    title: "ATS Resume Checker",
    body: "Upload your resume, paste the job description, and get a 0–100 score with 20+ checks across parsing, keywords, structure and red flags.",
    points: ["Job-description match %", "Parse-rate diagnostics", "Prioritised quick wins"],
    cta: "Score my resume",
  },
  {
    icon: Linkedin,
    slug: "linkedin-post-generator",
    eyebrow: "Creators",
    title: "LinkedIn Post Generator",
    body: "Turn a rough idea into a scroll-stopping post with a strong hook, readable line breaks and a natural call to action.",
    points: ["Hook-first structure", "Sounds human, not AI", "Ready to paste"],
    cta: "Write a post",
  },
  {
    icon: ListChecks,
    slug: "resume-bullet-point-generator",
    eyebrow: "Job seekers",
    title: "Resume Bullet Point Generator",
    body: "Rewrite flat duty statements into achievement bullets with strong verbs and measurable results recruiters actually read.",
    points: ["Action-verb openers", "Metrics baked in", "ATS-friendly phrasing"],
    cta: "Rewrite my bullets",
  },
];

const STEPS = [
  {
    icon: MousePointerClick,
    title: "Pick a tool",
    body: "Single-purpose tools — no prompt engineering, no blank page.",
  },
  {
    icon: PenLine,
    title: "Describe what you need",
    body: "A few short fields: the role, the topic, the product. That is it.",
  },
  {
    icon: Wand2,
    title: "Get results in seconds",
    body: "Copy-ready output in seconds, tuned for the outcome.",
  },
];

const USE_CASES = [
  "Beat the ATS filter",
  "Rewrite weak bullets",
  "Post on LinkedIn daily",
  "Tailor to a job ad",
  "Write cover letters fast",
  "Title YouTube videos",
  "Describe products that sell",
  "Draft job descriptions",
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
  const widgetTools = tools.filter((tool) => tool.slug !== "ats-resume-checker");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden="true" />
        <div className="container-page relative grid items-center gap-14 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)]">
          <div className="min-w-0">
            <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
              <Sparkles className="size-3.5 text-primary" />
              {tools.length} focused AI tools · free forever
            </p>
            <h1
              className="animate-fade-up mt-6 max-w-3xl text-[2.6rem] font-bold leading-[1.03] tracking-tight sm:text-5xl lg:text-[3.75rem]"
              style={{ animationDelay: "80ms" }}
            >
              Is your resume getting{" "}
              <span className="text-gradient-brand">filtered out by the ATS?</span>
            </h1>
            <p
              className="animate-fade-up mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              style={{ animationDelay: "160ms" }}
            >
              Get a free ATS score against any job description in seconds — then fix what is broken
              with our LinkedIn post generator and resume bullet point generator. No signup, no
              limits, no credit card.
            </p>
            <div
              className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "240ms" }}
            >
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <Link to="/tools/ats-resume-checker">
                  Check my resume score <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
                <Link to="/tools">Browse all tools</Link>
              </Button>
            </div>
            <ul
              className="animate-fade-up mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground"
              style={{ animationDelay: "320ms" }}
            >
              <li className="flex items-center gap-1.5">
                <Star className="size-4 fill-primary text-primary" /> Free forever
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldOff className="size-4 text-primary" /> Files never stored
              </li>
              <li className="flex items-center gap-1.5">
                <Zap className="size-4 text-primary" /> Results in ~10s
              </li>
            </ul>
          </div>

          <div className="motion-safe:animate-float">
            <AtsScorePreview />
          </div>
        </div>
      </section>

      {/* Use-case marquee */}
      <section aria-label="What people use ZenWrit for" className="overflow-hidden border-b border-border bg-surface py-3">
        <div className="marquee-track gap-3">
          {[...USE_CASES, ...USE_CASES].map((item, i) => (
            <span key={`${item}-${i}`} className="tag-pill whitespace-nowrap px-3 py-1 text-xs">
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <section aria-label="Why people trust ZenWrit" className="border-b border-border">
        <ul className="container-page grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((item, i) => (
            <Reveal as="li" key={item.label} delay={i * 70} className="flex items-center gap-2.5 text-sm font-medium">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <item.icon className="size-4" />
              </span>
              <span className="text-muted-foreground">{item.label}</span>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Flagship tools */}
      <section className="container-page py-16 sm:py-20" aria-labelledby="flagship-heading">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Our three most-used tools
          </p>
          <h2 id="flagship-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Land the interview. Then own the feed.
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Everything else on ZenWrit is a bonus — these three do the heavy lifting for job seekers
            and creators.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {FLAGSHIP.map((tool, i) => (
            <Reveal as="li" key={tool.slug} delay={i * 110}>
              <div className="surface-panel card-lift group flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <tool.icon className="size-6" />
                  </span>
                  <span className="tag-pill">{tool.eyebrow}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{tool.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tool.body}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {tool.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Zap className="size-3.5 shrink-0 text-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 w-full">
                  <Link to="/tools/$slug" params={{ slug: tool.slug }}>
                    {tool.cta} <ArrowRight />
                  </Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Live try-it widget */}
      <section className="border-y border-border bg-surface" aria-labelledby="try-heading">
        <div className="container-page grid items-start gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
          <Reveal className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              No signup wall
            </p>
            <h2 id="try-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Try a tool right here, right now
            </h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
              Pick a tool, type one or two lines, and hit generate. You will have copy-ready output
              before you finish reading this paragraph.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Zap className="size-4 shrink-0 text-primary" /> Unlimited generations, every day
              </li>
              <li className="flex items-center gap-2">
                <Zap className="size-4 shrink-0 text-primary" /> Optional free account to save history
              </li>
              <li className="flex items-center gap-2">
                <Zap className="size-4 shrink-0 text-primary" /> Works on mobile just as well
              </li>
            </ul>
          </Reveal>

          <Reveal delay={120} className="min-w-0">
            <HeroToolWidget tools={widgetTools} />
          </Reveal>
        </div>
      </section>

      <AdSlot id="ad-slot-home-hero" label="Ad slot — below hero" className="container-page py-10" />

      {/* All tools */}
      <section className="container-page py-16 sm:py-20" aria-labelledby="tools-heading">
        <Reveal>
          <h2 id="tools-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            Every tool in the toolkit
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            Single-purpose, mobile-friendly and completely free to use.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => (
            <Reveal as="li" key={tool.slug} delay={(i % 3) * 90}>
              <Link
                to="/tools/$slug"
                params={{ slug: tool.slug }}
                className="surface-panel card-lift group flex h-full flex-col p-6"
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
            </Reveal>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-surface" aria-labelledby="how-heading">
        <div className="container-page py-16 sm:py-20">
          <Reveal>
            <h2 id="how-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
              How it works
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
              Three steps, no onboarding, no credit card.
            </p>
          </Reveal>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 110}>
                <div className="surface-panel card-lift h-full p-6">
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
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="container-page py-16 sm:py-20" aria-labelledby="free-heading">
        <Reveal>
          <div className="surface-panel relative overflow-hidden p-8 sm:p-12">
            <div className="pointer-events-none absolute inset-0 hero-glow opacity-70" aria-hidden="true" />
            <div className="relative">
              <h2 id="free-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything is free. Really.
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                No plans, no paywalls, no credit card. Every tool is unlimited for everyone — ads on
                the site keep the lights on.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 px-6 text-base">
                  <Link to="/tools/ats-resume-checker">
                    Start with my resume score <ArrowRight />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
                  <Link to="/tools">See all tools</Link>
                </Button>
              </div>
              <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldOff className="size-3.5 text-primary" />
                No account required. No payment details, ever.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
