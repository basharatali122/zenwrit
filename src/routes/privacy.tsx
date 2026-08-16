import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | ZenWrit" },
      {
        name: "description",
        content: "How SaaScript collects, uses, shares and retains your data when you use ZenWrit, including cookies, security and your rights.",
      },
      { property: "og:title", content: "Privacy Policy | ZenWrit" },
      { property: "og:description", content: "What data ZenWrit collects and how it is used." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <LegalPage
      title="Privacy Policy"
      updated="16 August 2026"
      sections={[
        {
          heading: "Who we are",
          paragraphs: [
            "ZenWrit is operated by SaaScript (\"SaaScript\", \"we\", \"us\"). SaaScript is the data controller for the personal data described in this notice. You can reach us at support@zenwrit.app.",
          ],
        },
        {
          heading: "What we collect and why",
          paragraphs: [
            "Account data (email address, display name, login credentials held by our authentication provider) — to create and secure your account. Legal basis: performance of our contract with you.",
            "Content data (the text you submit to our tools and the output generated for you) — to produce your results and show your history. Legal basis: performance of our contract.",
            "Usage and technical data (generation counts, an anonymous visitor identifier, a hashed IP address, device and browser information, error logs) — to enforce free-tier limits, prevent abuse and keep the service reliable. Legal basis: our legitimate interest in operating and securing the service.",
            "Support messages you send us — to answer you. Legal basis: legitimate interest.",
            "Marketing or product emails, where applicable — sent on the basis of your consent, which you can withdraw at any time.",
          ],
        },
        {
          heading: "Who we share data with",
          paragraphs: [
            "Service providers and subprocessors who host our infrastructure and database, send our transactional email, and provide the AI model that produces your output. They act on our instructions only.",
            "Paddle.com, our Merchant of Record, for the sale of subscriptions, subscription management, payments, invoicing and tax compliance. Payment and billing data is collected and processed by Paddle under its own privacy policy; we never see your full card details.",
            "Professional advisers (legal, accounting) where necessary, and authorities where required by law.",
            "We do not sell personal data, and we do not use your content to train AI models.",
          ],
        },
        {
          heading: "Retention",
          paragraphs: [
            "Account, content and subscription records are kept for as long as your account is active. If you delete your account, profile, generation, usage and subscription records are deleted immediately, except where we must keep transaction records for tax and accounting purposes (typically up to 7 years). Anonymous usage counters are kept for up to 12 months and then deleted or anonymised. Support emails are kept for up to 24 months.",
          ],
        },
        {
          heading: "Security",
          paragraphs: [
            "We apply appropriate technical and organisational measures to protect your data, including encryption in transit (TLS) and at rest, row-level access control on our database so users can only read their own records, hashed IP addresses, restricted administrative access, and secrets held in a managed secret store rather than in application code.",
          ],
        },
        {
          heading: "International transfers",
          paragraphs: [
            "Our providers may process data outside your country, including in the United States. Where data leaves the UK or EEA we rely on adequacy decisions or Standard Contractual Clauses with appropriate safeguards.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "You can delete individual generations or your entire account from your dashboard at any time. Depending on where you live, you also have the right to access, rectify, erase, restrict or object to processing of your data, to data portability, and to withdraw consent. Email support@zenwrit.app and we will respond within one month.",
            "If you are in the UK or EEA you also have the right to lodge a complaint with your local data protection supervisory authority.",
          ],
        },
        {
          heading: "Cookies and advertising",
          paragraphs: [
            "We use essential cookies and local storage to keep you signed in and to count free daily generations; these cannot be switched off without breaking the service. If analytics or advertising cookies are used, they are set by our partners under their own privacy policies and you can manage them through your browser settings or any consent prompt shown. Pro subscribers do not see ads.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: ["Questions about this notice can be sent to support@zenwrit.app."],
        },
      ]}
    />
  ),
});
