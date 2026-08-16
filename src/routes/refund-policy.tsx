import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy | ZenWrit" },
      {
        name: "description",
        content: "ZenWrit's refund policy for the Pro subscription, including our 30-day money-back guarantee and how Paddle processes refunds.",
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
      updated="16 August 2026"
      sections={[
        {
          heading: "30-day money-back guarantee",
          paragraphs: [
            "ZenWrit is operated by SaaScript. If ZenWrit Pro is not right for you, you can request a full refund within 30 days of your order date — no questions asked.",
          ],
        },
        {
          heading: "How to request a refund",
          paragraphs: [
            "Refunds are processed by our payment provider and Merchant of Record, Paddle.com. To request a refund, visit paddle.net and enter the email address used at checkout, or email support@zenwrit.app and we will help you arrange it with Paddle.",
            "Approved refunds are returned to the original payment method, usually within five to ten business days.",
          ],
        },
        {
          heading: "Renewals",
          paragraphs: [
            "Subscription renewals are also covered by the 30-day window from the date of the renewal charge. If you were charged after intending to cancel, contact us — we resolve honest mistakes in your favour.",
          ],
        },
        {
          heading: "Cancelling",
          paragraphs: [
            "You can cancel at any time from your dashboard, or through Paddle at paddle.net. Cancelling stops future charges and keeps Pro active until the end of the period you already paid for.",
          ],
        },
        {
          heading: "Paddle's refund policy",
          paragraphs: [
            "Paddle's own refund policy also applies to all orders and is available at https://www.paddle.com/legal/refund-policy.",
          ],
        },
      ]}
    />
  ),
});
