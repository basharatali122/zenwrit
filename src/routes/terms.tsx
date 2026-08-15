import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | ZenWrit" },
      {
        name: "description",
        content: "The terms governing your use of ZenWrit's free and Pro AI writing tools, including acceptable use and billing.",
      },
      { property: "og:title", content: "Terms of Service | ZenWrit" },
      { property: "og:description", content: "Acceptable use, subscriptions and liability terms for ZenWrit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <LegalPage
      title="Terms of Service"
      updated="1 March 2026"
      sections={[
        {
          heading: "Using ZenWrit",
          paragraphs: [
            "By using ZenWrit you agree to these terms. Free accounts may generate up to three outputs per day; Pro subscribers have unlimited generations subject to fair use to prevent automated abuse.",
          ],
        },
        {
          heading: "Acceptable use",
          paragraphs: [
            "You may not use ZenWrit to produce unlawful, harassing, defamatory or deliberately misleading content, to impersonate another person, or to attempt to reverse-engineer, scrape or overload the service.",
            "You are responsible for reviewing every output before you publish or submit it. AI-generated text can contain errors.",
          ],
        },
        {
          heading: "Your content",
          paragraphs: [
            "You retain ownership of the text you submit and of the output produced for you. You grant us the limited right to process that content to operate the service.",
          ],
        },
        {
          heading: "Subscriptions and billing",
          paragraphs: [
            "Pro costs $5 per month and renews automatically until cancelled. You can cancel at any time from your dashboard and retain access until the end of the paid period.",
          ],
        },
        {
          heading: "Availability and liability",
          paragraphs: [
            "The service is provided as-is without warranties of uninterrupted availability. To the maximum extent permitted by law, our liability is limited to the amount you paid us in the preceding twelve months.",
          ],
        },
      ]}
    />
  ),
});
