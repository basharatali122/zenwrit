import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | ZenWrit" },
      {
        name: "description",
        content: "The terms governing your use of ZenWrit's free and Pro AI writing tools, including acceptable use, billing and our reseller Paddle.",
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
      updated="16 August 2026"
      sections={[
        {
          heading: "Who you are contracting with",
          paragraphs: [
            "ZenWrit is owned and operated by SaaScript (\"SaaScript\", \"we\", \"us\"). These terms form an agreement between you and SaaScript. By creating an account or continuing to use ZenWrit you agree to them. If you are using ZenWrit on behalf of an organisation, you confirm you have authority to bind it; otherwise you confirm you are of legal age to enter this agreement.",
          ],
        },
        {
          heading: "The service",
          paragraphs: [
            "ZenWrit provides AI-assisted writing tools (resume bullet points, cover letters, LinkedIn posts, YouTube titles and product descriptions). Free accounts may generate up to three outputs per day; Pro subscribers have unlimited generations subject to fair use to prevent automated abuse.",
            "We grant you a limited, non-exclusive, non-transferable right to use the service within the plan you have selected.",
          ],
        },
        {
          heading: "Acceptable use",
          paragraphs: [
            "You may not use ZenWrit for any unlawful purpose, for fraud or spam, to infringe anyone's intellectual property, to produce harassing, defamatory, hateful or deliberately misleading content, to impersonate another person, or to generate deceptive synthetic content about real people.",
            "You may not interfere with the security of the service: no malware, probing, scraping, reverse engineering, circumventing usage limits, or reselling or redistributing the service.",
            "You are responsible for your prompts, for having the rights to any content you submit, for verifying the accuracy of outputs, and for how you use them. AI output may be inaccurate and is not a substitute for professional legal, financial, medical or employment advice.",
          ],
        },
        {
          heading: "Content, moderation and IP",
          paragraphs: [
            "You retain ownership of the text you submit and of the output produced for you, and you grant us a limited licence to host and process that content solely to operate the service. SaaScript retains all ownership of ZenWrit itself, including its software, documentation and branding.",
            "We may remove or restrict content, filter or refuse outputs, and suspend accounts where use breaches these terms. Rights-holders can report infringing content to support@zenwrit.app; repeat infringers will have their accounts terminated.",
          ],
        },
        {
          heading: "Payments and our reseller",
          paragraphs: [
            "Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our orders. Paddle provides all customer service inquiries and handles returns.",
            "Pro costs $5 per month (or $50 per year) and renews automatically until cancelled. Payment, billing, tax, invoicing, cancellation and refund mechanics are governed by Paddle's Buyer Terms at https://www.paddle.com/legal/checkout-buyer-terms and our Refund Policy. You can cancel at any time from your dashboard and retain access until the end of the paid period.",
          ],
        },
        {
          heading: "Suspension and termination",
          paragraphs: [
            "We may suspend or terminate your access, with notice where practicable, for material breach of these terms, non-payment, suspected fraud or security risk, or repeated or serious policy violations. You may close your account at any time from your dashboard.",
            "On termination your access ends and your account data is deleted; export anything you need beforehand from your dashboard.",
          ],
        },
        {
          heading: "Availability, warranties and liability",
          paragraphs: [
            "The service is provided as-is. We do not guarantee uninterrupted or error-free performance, and to the fullest extent permitted by law we disclaim all implied warranties including merchantability and fitness for a particular purpose.",
            "To the maximum extent permitted by law, our aggregate liability is limited to the amount you paid us in the preceding twelve months, and we exclude indirect, consequential or special damages including loss of profits, data or goodwill. Nothing limits liability for fraud, death or personal injury where the law does not allow it.",
            "You indemnify SaaScript against claims arising from your content, your unlawful use of the service, or your breach of these terms.",
          ],
        },
        {
          heading: "General",
          paragraphs: [
            "You may not assign this agreement without our consent; we may assign it in connection with a merger or acquisition. Neither party is liable for delays caused by events beyond reasonable control. These terms are governed by the laws of the jurisdiction in which SaaScript is established, and disputes will be heard by its competent courts. Questions: support@zenwrit.app.",
          ],
        },
      ]}
    />
  ),
});
