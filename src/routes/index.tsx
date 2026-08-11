import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Check, Gauge, ShieldOff, Sparkles, X, Zap } from "lucide-react";
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

function Home() {
  const { tools } = Route.useLoaderData() as { tools: ToolRecord[] };

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden="true" />
        <div className="container-page relative py-16 sm:py-24">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />5 focused AI tools · no signup to try
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] sm:text-6xl">
            <span className="text-gradient-brand">Free AI Tools for Creators &amp; Professionals</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Resume bullets, cover letters, LinkedIn posts, YouTube titles and product copy — written
            in seconds, tuned for the outcome you actually want.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/tools">
                Try free, no signup needed <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/pricing">See pricing</Link>
            </Button>
          </div>
          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Gauge className="size-4 text-primary" />
              <dt className="sr-only">Speed</dt>
              <dd>Results in ~5 seconds</dd>
            </div>
            <div className="flex items-center gap-2">
              <ShieldOff className="size-4 text-primary" />
              <dt className="sr-only">Privacy</dt>
              <dd>No account required to start</dd>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="size-4 text-primary" />
              <dt className="sr-only">Pricing</dt>
              <dd>Pro is $5/month, cancel anytime</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="container-page py-8">
        <AdSlot id="ad-slot-home-hero" label="Ad slot — below hero" />
      </div>

      <section className="container-page py-10" aria-labelledby="tools-heading">
        <h2 id="tools-heading" className="text-2xl font-bold sm:text-3xl">
          Pick a tool and start writing
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Every tool is single-purpose, mobile-friendly and free to try three times a day.
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <li key={tool.slug}>
              <Link
                to="/tools/$slug"
                params={{ slug: tool.slug }}
                className="group flex h-full flex-col surface-panel p-5 transition-colors hover:border-primary/50"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <ToolIcon icon={tool.icon} className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{tool.name}</h3>
                <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{tool.short_description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Open tool <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page py-14" aria-labelledby="pro-heading">
        <div className="surface-panel overflow-hidden">
          <div className="border-b border-border p-6 sm:p-8">
            <h2 id="pro-heading" className="text-2xl font-bold sm:text-3xl">
              Why go Pro
            </h2>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">
              Free covers the occasional draft. Pro is for the week you are applying to twenty jobs
              or shipping thirty product pages.
            </p>
          </div>
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
      </section>

      <section className="container-page pb-16" aria-labelledby="pricing-heading">
        <h2 id="pricing-heading" className="text-2xl font-bold sm:text-3xl">
          Simple pricing
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="surface-panel flex flex-col p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Free</h3>
            <p className="mt-3 text-4xl font-bold">$0</p>
            <p className="mt-1 text-sm text-muted-foreground">3 generations per day, with ads.</p>
            <ul className="mt-5 flex-1 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><Check className="size-4 text-success" /> All 5 tools</li>
              <li className="flex gap-2"><Check className="size-4 text-success" /> No signup to try</li>
              <li className="flex gap-2"><Check className="size-4 text-success" /> Copy to clipboard</li>
            </ul>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/tools">Start free</Link>
            </Button>
          </div>

          <div className="surface-panel relative flex flex-col border-primary/60 p-6">
            <span className="absolute right-5 top-5 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
              Most popular
            </span>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Pro</h3>
            <p className="mt-3 text-4xl font-bold">
              $5<span className="text-base font-medium text-muted-foreground">/month</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Unlimited generations, zero ads.</p>
            <ul className="mt-5 flex-1 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><Zap className="size-4 text-primary" /> Unlimited daily generations</li>
              <li className="flex gap-2"><Zap className="size-4 text-primary" /> Ad-free interface</li>
              <li className="flex gap-2"><Zap className="size-4 text-primary" /> Priority speed &amp; full history</li>
            </ul>
            <Button asChild className="mt-6">
              <Link to="/pricing">Go Pro — $5/month</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="size-4 text-success" aria-label="Included" />;
  if (value === false) return <X className="size-4 text-muted-foreground" aria-label="Not included" />;
  return <span>{value}</span>;
}
