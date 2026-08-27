import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/editorial-guidelines")({
  head: () => ({
    meta: [
      { title: "Editorial Guidelines | ZenWrit" },
      {
        name: "description",
        content:
          "How ZenWrit researches, writes, fact-checks and updates its ATS resume guides — our editorial standards, sources and corrections policy.",
      },
      { property: "og:title", content: "Editorial Guidelines | ZenWrit" },
      {
        property: "og:description",
        content: "The standards behind every ZenWrit guide: accuracy, testing and independence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage
      title="Editorial Guidelines"
      updated="27 August 2026"
      sections={[
        {
          heading: "What we publish",
          paragraphs: [
            "ZenWrit publishes practical guides about applicant tracking systems (ATS), resume formatting, keyword optimisation and job applications. Every article exists to answer one question clearly: how do real ATS platforms treat your resume, and what should you do about it?",
          ],
        },
        {
          heading: "How our content is produced",
          paragraphs: [
            "Each guide is researched against documented behaviour of major ATS platforms — including Workday, Greenhouse, Lever, iCIMS and Taleo — recruiter-published guidance and real resume parsing tests. Drafts may be assisted by AI tools, but every article is reviewed, edited and verified by a human editor before publication.",
            "We test formatting claims (such as how tables, columns, headers and file types are parsed) rather than repeating common advice unverified. Where behaviour differs between platforms, we say so instead of presenting one rule as universal.",
          ],
        },
        {
          heading: "Accuracy and updates",
          paragraphs: [
            "ATS software changes frequently. We review and update our guides when platforms change their parsing behaviour, and each article displays the date it was last reviewed. Statistics and claims are checked against their original sources, and we link to primary sources wherever possible.",
          ],
        },
        {
          heading: "Independence and advertising",
          paragraphs: [
            "ZenWrit is funded by on-site advertising. Advertisers have no input into our content, our checker scores or our recommendations. We do not publish sponsored articles, paid placements or affiliate rankings, and we never accept payment in exchange for favourable coverage.",
          ],
        },
        {
          heading: "No guarantees",
          paragraphs: [
            "Our guidance reflects how ATS platforms generally behave, but every employer configures their system differently. Following our advice improves how your resume is parsed and ranked — it cannot guarantee an interview or a job offer.",
          ],
        },
        {
          heading: "Corrections",
          paragraphs: [
            "If you spot an error in any ZenWrit article, email support@zenwrit.app with the article URL and the correction. We review every report and correct verified errors promptly, noting material changes in the article.",
          ],
        },
      ]}
    />
  ),
});
