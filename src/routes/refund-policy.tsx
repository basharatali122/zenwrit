import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy | ZenWrit" },
      {
        name: "description",
        content: "ZenWrit's refund policy for the $5/month Pro subscription, including our 7-day money-back window.",
      },
      { property: "og:title", content: "Refund Policy | ZenWrit" },
      { property: "og:description", content: "How refunds work for the ZenWrit Pro subscription." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <LegalPage
      title="Refund Policy"
      updated="1 March 2026"
      sections={[
        {
          heading: "7-day money-back guarantee",
          paragraphs: [
            "If ZenWrit Pro is not right for you, email support@saascript.app within seven days of your first payment and we will refund it in full, no questions asked.",
          ],
        },
        {
          heading: "Renewals",
          paragraphs: [
            "Because Pro is billed monthly at a low price, renewal payments are generally non-refundable. If you were charged after intending to cancel, contact us — we resolve honest mistakes in your favour.",
          ],
        },
        {
          heading: "Cancelling",
          paragraphs: [
            "You can cancel at any time from your dashboard. Cancelling stops future charges and keeps Pro active until the end of the period you already paid for.",
          ],
        },
        {
          heading: "How to request a refund",
          paragraphs: [
            "Email support@saascript.app from the address on your account with the date of the charge. Approved refunds are returned to the original payment method, usually within five to ten business days.",
          ],
        },
      ]}
    />
  ),
});
