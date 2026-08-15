import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CreditCard,
  Gauge,
  MousePointerClick,
  PenLine,
  ShieldOff,
  Sparkles,
  UserX,
  Wand2,
  X,
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
      { title: "SaaScript — Free AI Tools for Creators & Professionals" },
      {
        name: "description",
        content:
          "Free AI micro-tools for resumes, cover letters, LinkedIn posts, YouTube titles and product copy. Try free, no signup needed. Pro is $5/month.",
      },
      { property: "og:title", content: "SaaScript — Free AI Tools for Creators & Professionals" },
      {
        property: "og:description",
        content:
          "Five focused AI writing tools for job seekers and creators. 3 free generations a day, unlimited on Pro for $5/month.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const COMPARISON = [
  { feature: "Access to all 5 tools", free: true, pro: true },
  { feature: "Daily generations", free: "3 per day", pro: "Unlimited" },
  { feature: "Ads", free: "Shown", pro: "None" },
  { feature: "Priority generation speed", free: false, pro: true },
  { feature: "Saved generation history", free: "Last 3", pro: "Full history" },
  { feature: "Early access to new tools", free: false, pro: true },
];

const TRUST = [
  { icon: UserX, label: "No signup required" },
  { icon: Gauge, label: "Results in ~5 seconds" },
  { icon: CreditCard, label: "Free to try, no credit card" },
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
};

function Home() {
  const { tools } = Route.useLoaderData() as { tools: ToolRecord[] };

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden="true" />
        <div className="container-page relative py-20 sm:py-28">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
            <Sparkles className="size-3.5 text-primary" />
            5 focused AI tools · built for creators &amp; job seekers
          </p>
          <h1 className="mt-6 max-w-4xl text-[2.75rem] font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-gradient-brand">Free AI tools for creators &amp; professionals</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Resume bullets, cover letters, LinkedIn posts, YouTube titles and product copy — written
            in seconds, tuned for the outcome you actually want.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <Link to="/tools">
                Try free, no signup needed <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
              <Link to="/pricing">See pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      <section aria-label="Why people trust SaaScript" className="border-b border-border bg-surface">
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

      <div className="container-page py-10">
        <AdSlot id="ad-slot-home-hero" label="Ad slot — below hero" />
      </div>

      <section className="container-page py-14" aria-labelledby="tools-heading">
        <h2 id="tools-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          Pick a tool and start writing
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
          Every tool is single-purpose, mobile-friendly and free to try three times a day.
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

      <section className="container-page py-16" aria-labelledby="pro-heading">
        <div className="surface-panel overflow-hidden">
          <div className="border-b border-border p-6 sm:p-8">
            <h2 id="pro-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
              Why go Pro
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Free covers the occasional draft. Pro is for the week you are applying to twenty jobs
              or shipping thirty product pages.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="sr-only">Free plan compared with Pro plan</caption>
              <thead>
                <tr className="border-b border-border bg-surface text-left">
                  <th scope="col" className="p-4 font-semibold">Feature</th>
                  <th scope="col" className="p-4 font-semibold">Free</th>
                  <th scope="col" className="p-4 font-semibold text-primary">Pro</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="border-b border-border last:border-0">
                    <th scope="row" className="p-4 text-left font-medium">{row.feature}</th>
                    <td className="p-4 text-muted-foreground"><Cell value={row.free} /></td>
                    <td className="p-4 text-muted-foreground"><Cell value={row.pro} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="container-page pb-20" aria-labelledby="pricing-heading">
        <h2 id="pricing-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          Simple pricing
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="surface-panel flex flex-col p-7">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Free</h3>
            <p className="mt-3 text-4xl font-bold tracking-tight">$0</p>
            <p className="mt-1.5 text-sm text-muted-foreground">3 generations per day, with ads.</p>
            <ul className="mt-6 flex-1 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex gap-2"><Check className="size-4 shrink-0 text-success" /> All 5 tools</li>
              <li className="flex gap-2"><Check className="size-4 shrink-0 text-success" /> No signup to try</li>
              <li className="flex gap-2"><Check className="size-4 shrink-0 text-success" /> Copy to clipboard</li>
            </ul>
            <Button asChild variant="outline" className="mt-7">
              <Link to="/tools">Start free</Link>
            </Button>
          </div>

          <div className="surface-panel relative flex flex-col border-primary/60 p-7 shadow-lg">
            <span className="absolute right-5 top-5 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
              Most popular
            </span>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Pro</h3>
            <p className="mt-3 text-4xl font-bold tracking-tight">
              $5<span className="text-base font-medium text-muted-foreground">/month</span>
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">Unlimited generations, zero ads.</p>
            <ul className="mt-6 flex-1 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex gap-2"><Zap className="size-4 shrink-0 text-primary" /> Unlimited daily generations</li>
              <li className="flex gap-2"><Zap className="size-4 shrink-0 text-primary" /> Ad-free interface</li>
              <li className="flex gap-2"><Zap className="size-4 shrink-0 text-primary" /> Priority speed &amp; full history</li>
            </ul>
            <Button asChild className="mt-7">
              <Link to="/pricing">Go Pro — $5/month</Link>
            </Button>
          </div>
        </div>
        <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldOff className="size-3.5 text-primary" />
          No account required to start. Cancel Pro anytime.
        </p>
      </section>
    </>
  );
}

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="size-4 text-success" aria-label="Included" />;
  if (value === false) return <X className="size-4 text-muted-foreground" aria-label="Not included" />;
  return <span>{value}</span>;
}
