import { useState } from "react";
import { ToolRunner } from "@/components/site/ToolRunner";
import { ToolIcon } from "@/components/site/ToolIcon";
import type { ToolRecord } from "@/lib/content";

/**
 * Lets a first-time visitor actually use a tool straight from the homepage,
 * instead of having to click through to a tool page first.
 */
export function HeroToolWidget({ tools }: { tools: ToolRecord[] }) {
  const [activeSlug, setActiveSlug] = useState(tools[0]?.slug ?? "");
  const active = tools.find((tool) => tool.slug === activeSlug) ?? tools[0];

  if (!active) return null;

  return (
    <div className="w-full min-w-0">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Try it right here
        </p>
        <p className="text-xs text-muted-foreground">No signup · free</p>
      </div>

      <div
        role="tablist"
        aria-label="Choose a tool"
        className="mb-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tools.map((tool) => {
          const selected = tool.slug === active.slug;
          return (
            <button
              key={tool.slug}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveSlug(tool.slug)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              <ToolIcon icon={tool.icon} className="size-3.5" />
              {tool.name.replace(/ generator| checker/i, "")}
            </button>
          );
        })}
      </div>

      <ToolRunner key={active.slug} tool={active} />
    </div>
  );
}
