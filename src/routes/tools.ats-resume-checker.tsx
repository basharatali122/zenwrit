import { createFileRoute, Link } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { AdSlot } from "@/components/site/AdSlot";
import { AtsChecker } from "@/components/site/AtsChecker";
import { MarkdownArticle } from "@/components/site/MarkdownArticle";
import { ToolSummary } from "@/components/site/ToolSummary";
import { getPublishedTool } from "@/lib/content.functions";
import type { ToolRecord } from "@/lib/content";

const TITLE = "Free ATS Resume Checker — Instant ATS Score | ZenWrit";
const DESCRIPTION =
  "Use this free ATS resume checker to get your ATS compatibility score instantly, with missing keywords, format issues and exact fixes. No signup needed.";

export const Route = createFileRoute("/tools/ats-resume-checker")({
  loader: async () => await getPublishedTool({ data: { slug: "ats-resume-checker" } }),
  head: ({ loaderData }) => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
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
              name: "ATS Resume Checker",
              url: "https://zenwrit.com/tools/ats-resume-checker",
              applicationCategory: "BusinessApplication",
              operatingSystem: "All (Web-based)",
              description: DESCRIPTION,
              offers: [
                { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
                { "@type": "Offer", price: "5", priceCurrency: "USD", name: "Pro (monthly)" },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: (loaderData?.tool.faqs ?? []).map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://zenwrit.com/" },
                { "@type": "ListItem", position: 2, name: "Tools", item: "https://zenwrit.com/tools" },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "ATS Resume Checker",
                  item: "https://zenwrit.com/tools/ats-resume-checker",
                },
              ],
            },
          ],

        }),
      },
    ],
  }),
  component: AtsPage,
});

function AtsPage() {
  const data = Route.useLoaderData() as {
    tool: ToolRecord;
    others: { slug: string; name: string }[];
  } | null;
  const tool = data?.tool ?? null;

  return (
    <div className="container-page py-10">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="px-1.5">/</span>
        <Link to="/tools" className="hover:text-foreground">Tools</Link>
        <span className="px-1.5">/</span>
        <span className="text-foreground">ATS Resume Checker</span>
      </nav>

      <header className="mt-5 flex items-start gap-4">
        <span className="hidden size-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground sm:flex">
          <Gauge className="size-6" />
        </span>
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">Free ATS Resume Checker</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            This free ATS resume checker scores your resume for ATS compatibility and gives you
            specific fixes in seconds.
          </p>
        </div>
      </header>

      <AdSlot id="ad-slot-1" label="Ad slot 1 — below hero" className="mt-6" />

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <AtsChecker />

          <ToolSummary
            name="ATS Resume Checker"
            summary="ZenWrit's ATS Resume Checker is a free AI tool that scores your resume for applicant tracking system compatibility in about 30 seconds. It flags missing keywords, formatting problems and red flags, then gives you the exact fixes. No signup required, and it is free to use 3 times per day."
          />

          {tool ? (
            <article className="prose-article mt-12 max-w-none">
              {tool.article_title ? <h2 className="!mt-0 text-2xl">{tool.article_title}</h2> : null}
              <MarkdownArticle markdown={tool.article_content} />

              {tool.faqs.length ? (
                <>
                  <h2>Frequently asked questions</h2>
                  <dl>
                    {tool.faqs.map((faq) => (
                      <div key={faq.q} className="mb-4">
                        <dt className="font-semibold">{faq.q}</dt>
                        <dd className="mt-1 text-muted-foreground">{faq.a}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              ) : null}
            </article>
          ) : null}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <AdSlot id="ad-slot-3" label="Ad slot 3 — sidebar" variant="square" />
            <div className="surface-panel p-5">
              <h2 className="text-sm font-semibold">Other tools</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {(data?.others ?? []).map((other) => (
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
                $5/month for unlimited checks, no ads and priority speed.
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
