import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | ZenWrit" },
      {
        name: "description",
        content:
          "The terms governing your use of ZenWrit's free ATS resume checker, including acceptable use, content ownership and liability.",
      },
      { property: "og:title", content: "Terms of Service | ZenWrit" },
      { property: "og:description", content: "Acceptable use and liability terms for ZenWrit." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://zenwrit.com/terms" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://zenwrit.com/terms" }],
  }),
  component: () => (
    <LegalPage
      title="Terms of Service"
      updated="4 September 2026"
      sections={[
        {
          heading: "Agreement to these terms",
          paragraphs: [
            "These terms form an agreement between you and ZenWrit (\"ZenWrit\", \"we\", \"us\"), the operator of zenwrit.com. By using the site you agree to them. If you are using ZenWrit on behalf of an organisation, you confirm you have authority to do so; otherwise you confirm you are of legal age to enter this agreement.",
          ],
        },
        {
          heading: "The service",
          paragraphs: [
            "ZenWrit provides a free, AI-assisted ATS resume checker. It requires no account and no payment, and there are no usage limits beyond fair use to prevent automated abuse. There are no paid plans, subscriptions or refunds.",
            "We grant you a limited, non-exclusive, non-transferable right to use the service for your own personal or internal business purposes.",
          ],
        },
        {
          heading: "Acceptable use",
          paragraphs: [
            "You may not use ZenWrit for any unlawful purpose, for fraud or spam, to infringe anyone's intellectual property, to produce harassing, defamatory, hateful or deliberately misleading content, or to impersonate another person.",
            "You may not interfere with the security or availability of the service: no malware, probing, bulk scraping, reverse engineering, circumventing fair-use limits, or reselling and redistributing the service.",
            "You are responsible for having the rights to any content you submit, for verifying the accuracy of the output, and for how you use it. AI output may be inaccurate and is not a substitute for professional legal, financial, medical or employment advice.",
          ],
        },
        {
          heading: "Your content",
          paragraphs: [
            "You keep ownership of the resume text you submit and of the report produced for you. Resume content is processed to generate your report and then discarded — we do not store it. See our Privacy Policy for detail.",
            "ZenWrit retains all ownership of the site itself, including its software, articles and branding. Articles may not be republished without permission; rights-holders can report infringing content to support@zenwrit.app.",
          ],
        },
        {
          heading: "Availability and changes",
          paragraphs: [
            "The service is provided as-is and free of charge. We may change, suspend or discontinue any part of it at any time, and we may block access where use breaches these terms or threatens the security of the service.",
            "We do not guarantee uninterrupted or error-free performance, and to the fullest extent permitted by law we disclaim all implied warranties including merchantability and fitness for a particular purpose. Nothing here guarantees an interview or a job offer.",
          ],
        },
        {
          heading: "Liability",
          paragraphs: [
            "To the maximum extent permitted by law, our aggregate liability is limited to USD 100, and we exclude indirect, consequential or special damages including loss of profits, data, opportunities or goodwill. Nothing limits liability for fraud, death or personal injury where the law does not allow it.",
            "You indemnify ZenWrit against claims arising from your content, your unlawful use of the service, or your breach of these terms.",
          ],
        },
        {
          heading: "General",
          paragraphs: [
            "You may not assign this agreement without our consent; we may assign it in connection with a merger or acquisition. Neither party is liable for delays caused by events beyond reasonable control. If a provision is unenforceable, the rest remains in force. Questions: support@zenwrit.app.",
          ],
        },
      ]}
    />
  ),
});
