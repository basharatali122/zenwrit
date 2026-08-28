import { createFileRoute, Link } from "@tanstack/react-router";
import { AdSlot } from "@/components/site/AdSlot";

const TITLE = "About ZenWrit — Free ATS Resume Checker";
const DESCRIPTION = "ZenWrit builds one fast, focused tool: a free ATS resume checker for job seekers. No signup, no limits.";
const OG_IMAGE = "https://zenwrit.com/og-image.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://zenwrit.com/about" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://zenwrit.com/about" }],
  }),
  component: About,
});

function About() {
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">About ZenWrit</h1>
      <div className="prose-article mt-6 max-w-2xl">
        <p>
          ZenWrit does one thing: it tells you whether your resume will survive an applicant
          tracking system, and exactly what to change if it will not. No suite of tools, no blank
          chat box — one focused check that takes about 30 seconds.
        </p>
        <h2>What we build</h2>
        <p>
          Our ATS resume checker runs 20+ checks across parsing, keywords, content quality,
          structure and recruiter red flags. Paste a job description and it also shows the exact
          keywords you are missing from that specific posting. Every finding quotes your actual
          resume instead of handing you generic advice.
        </p>
        <h2>How we make money</h2>
        <p>
          The checker is free, forever, with no account and no usage limits. We cover costs with
          ads shown around the tool — never by paywalling your score or upselling a subscription.
        </p>
        <h2>Privacy</h2>
        <p>
          Your resume is read, analyzed and immediately discarded — we never store or share it. You
          can use the checker without an account; if you create one, we save your past reports so
          you can find them again, and you can delete them from your dashboard at any time. Read the{" "}
          <Link to="/privacy">privacy policy</Link> for the details.
        </p>

      </div>

      <AdSlot id="ad-slot-about" label="Ad slot — footer" className="mt-10 max-w-2xl" />
    </div>
  );
}
