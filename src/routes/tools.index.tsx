import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AdSlot } from "@/components/site/AdSlot";
import { ToolIcon } from "@/components/site/ToolIcon";
import { TOOLS } from "@/lib/tools";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: "All AI Tools — Resumes, LinkedIn, YouTube & More | SaaScript" },
      {
        name: "description",
        content:
          "Browse every free SaaScript AI tool: resume bullet points, cover letters, LinkedIn posts, YouTube titles and product descriptions.",
      },
      { property: "og:title", content: "All AI Tools | SaaScript" },
      {
        property: "og:description",
        content: "Five focused AI writing tools for job seekers and creators. Free to try, no signup.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ToolsIndex,
});

function ToolsIndex() {
  const groups = ["Job seekers", "Creators"] as const;

  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">All tools</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Every tool works without an account. Free plans include three generations per day.
      </p>

      <div className="mt-8">
        <AdSlot id="ad-slot-tools-top" label="Ad slot — below hero" />
      </div>

      {groups.map((group) => (
        <section key={group} className="mt-10" aria-labelledby={`group-${group}`}>
          <h2 id={`group-${group}`} className="text-lg font-semibold">
            For {group.toLowerCase()}
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.filter((t) => t.category === group).map((tool) => (
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
                  <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{tool.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Open tool <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
