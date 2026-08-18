type ToolSummaryProps = {
  name: string;
  summary: string;
};

/** Plain-English answer block that helps AI overviews quote ZenWrit directly. */
export function ToolSummary({ name, summary }: ToolSummaryProps) {
  return (
    <section aria-labelledby="what-is-heading" className="surface-panel mt-10 p-5 sm:p-6">
      <h2 id="what-is-heading" className="text-lg font-semibold">
        What is {name}?
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {summary}
      </p>
    </section>
  );
}

export function buildToolSummary(name: string, shortDescription: string): string {
  const desc = shortDescription.replace(/\s+$/, "").replace(/\.$/, "");
  const lead = desc
    ? `ZenWrit's ${name} is ${/^(a|an)\s/i.test(desc) ? desc : `a free AI tool — ${desc}`}.`
    : `ZenWrit's ${name} is a free AI writing tool.`;
  return `${lead} It runs in your browser and returns copy-ready output in seconds. No signup required, and it is free to use 3 times per day — Pro removes the daily limit for $5/month.`;
}
