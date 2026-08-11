import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AdSlot } from "@/components/site/AdSlot";
import { ToolIcon } from "@/components/site/ToolIcon";
import { ToolRunner } from "@/components/site/ToolRunner";
import { TOOLS, getTool } from "@/lib/tools";

export const Route = createFileRoute("/tools/$slug")({
  loader: ({ params }) => {
    const tool = getTool(params.slug);
    if (!tool) throw notFound();
    return { tool };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Tool not found | SaaScript" }, { name: "robots", content: "noindex" }] };
    }
    const { tool } = loaderData;
    return {
      meta: [
        { title: tool.seoTitle },
        { name: "description", content: tool.seoDescription },
        { property: "og:title", content: tool.seoTitle },
        { property: "og:description", content: tool.seoDescription },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: tool.name,
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web",
                description: tool.seoDescription,
                offers: [
                  { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
                  { "@type": "Offer", price: "5", priceCurrency: "USD", name: "Pro (monthly)" },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: tool.faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.q,
                  acceptedAnswer: { "@type": "Answer", text: faq.a },
                })),
              },
            ],
          }),
        },
      ],
    };
  },
  component: ToolPage,
});

function ToolPage() {
  const { tool } = Route.useLoaderData();
  const others = TOOLS.filter((t) => t.slug !== tool.slug).slice(0, 4);
  const { intro, sections, title } = tool.article;

  return (
    <div className="container-page py-10">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="px-1.5">/</span>
        <Link to="/tools" className="hover:text-foreground">Tools</Link>
        <span className="px-1.5">/</span>
        <span className="text-foreground">{tool.name}</span>
      </nav>

      <header className="mt-5 flex items-start gap-4">
        <span className="hidden size-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground sm:flex">
          <ToolIcon icon={tool.icon} className="size-6" />
        </span>
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">{tool.name}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">{tool.tagline}</p>
        </div>
      </header>

      <div className="mt-6">
        <AdSlot id="ad-slot-1" label="Ad slot 1 — below hero" />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <ToolRunner tool={tool} />

          <article className="prose-article mt-12 max-w-none">
            <h2 className="!mt-0 text-2xl">{title}</h2>
            {intro.map((paragraph, index) => (
              <div key={index}>
                <p>{paragraph}</p>
                {index === 1 ? (
                  <AdSlot
                    id="ad-slot-2"
                    label="Ad slot 2 — in content"
                    variant="inline"
                    className="my-6"
                  />
                ) : null}
              </div>
            ))}

            {sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <h2>Frequently asked questions</h2>
            <dl>
              {tool.faqs.map((faq) => (
                <div key={faq.q} className="mb-4">
                  <dt className="font-semibold">{faq.q}</dt>
                  <dd className="mt-1 text-muted-foreground">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <AdSlot id="ad-slot-3" label="Ad slot 3 — sidebar" variant="square" />
            <div className="surface-panel p-5">
              <h2 className="text-sm font-semibold">Other tools</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {others.map((other) => (
                  <li key={other.slug}>
                    <Link
                      to="/tools/$slug"
                      params={{ slug: other.slug }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {other.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="surface-panel border-primary/50 p-5">
              <h2 className="text-sm font-semibold">Go unlimited</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                $5/month for unlimited generations, no ads and priority speed.
              </p>
              <Link
                to="/pricing"
                className="mt-3 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
