import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | ZenWrit" },
      {
        name: "description",
        content: "How ZenWrit collects, uses and stores your data, including generation history, usage tracking and cookies.",
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
      updated="1 March 2026"
      sections={[
        {
          heading: "What we collect",
          paragraphs: [
            "If you use ZenWrit without an account, we store an anonymous visitor identifier in your browser so we can count your three free daily generations. It is not linked to your identity and contains no personal data.",
            "If you create an account, we store your email address, the text you submit to our tools and the output generated for you, so that your history is available in your dashboard.",
          ],
        },
        {
          heading: "How we use your data",
          paragraphs: [
            "We use your data to operate the service: producing generations, enforcing daily limits, showing your history and managing your subscription. We do not sell personal data.",
            "The text you submit is sent to our AI provider solely to produce your output. We do not use your content to train models.",
          ],
        },
        {
          heading: "Advertising",
          paragraphs: [
            "Free accounts see advertising. Ad partners may set cookies to measure and target ads in accordance with their own privacy policies. Pro subscribers do not see ads.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "You can delete any saved generation from your dashboard at any time, and you can request full account deletion by contacting support. Depending on where you live, you may also have rights to access, correct or export your data.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: ["Questions about this policy can be sent to support@saascript.app."],
        },
      ]}
    />
  ),
});
