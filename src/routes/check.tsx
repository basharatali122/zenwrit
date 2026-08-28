import { createFileRoute, Link } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { AdSlot } from "@/components/site/AdSlot";
import { AtsChecker } from "@/components/site/AtsChecker";

const TITLE = "Check Your ATS Resume Score Free — Instant Results | ZenWrit";
const DESCRIPTION =
  "Upload your resume (PDF or DOCX) and paste a job description. Get a 0-100 ATS compatibility score with 20+ checks and specific fixes in under 30 seconds.";
const OG_IMAGE = "https://zenwrit.com/og-image.png";

export const Route = createFileRoute("/check")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://zenwrit.com/check" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://zenwrit.com/check" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "ZenWrit ATS Resume Checker",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: "https://zenwrit.com/check",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Free ATS resume checker with 20+ checks, keyword analysis, and specific fixes. No signup required.",
        }),
      },
    ],
  }),
  component: CheckPage,
});

function CheckPage() {
  return (
    <div className="container-page py-10">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
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
            Upload your resume, paste the job description, and get a 0–100 ATS score with 20+ checks
            and exact fixes — in about 30 seconds.
          </p>
        </div>
      </header>

      <AdSlot id="ad-slot-check-top" label="Ad slot — below hero" className="mt-6" />

      <div className="mt-8 max-w-3xl">
        <AtsChecker />
      </div>

      <AdSlot id="ad-slot-check-bottom" label="Ad slot — below tool" className="mt-10" />
    </div>
  );
}
