import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | ZenWrit" },
      {
        name: "description",
        content:
          "ZenWrit's ATS resume checker requires no account and stores no resumes. Learn what data we collect and how we protect your privacy.",
      },
      { property: "og:title", content: "Privacy Policy | ZenWrit" },
      {
        property: "og:description",
        content:
          "No signup. No account. Your resume is parsed in memory and immediately discarded. Read how ZenWrit protects your data.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://zenwrit.com/privacy" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://zenwrit.com/privacy" }],
  }),
  component: () => (
    <LegalPage
      title="Privacy Policy"
      updated="5 September 2026"
      sections={[
        {
          heading: "What ZenWrit is",
          paragraphs: [
            "ZenWrit (zenwrit.com) is a free, single-purpose ATS resume checker. You can paste or upload a resume, receive an instant score and suggestions, and leave. You do not need to sign up, log in, or create any kind of account. We have no user dashboard, no membership tiers, no Pro plan, and no generation limits.",
          ],
        },
        {
          heading: "Your resume is never stored",
          paragraphs: [
            "When you submit a resume, the text is sent over an encrypted HTTPS connection to our server. It is parsed in memory, passed to the AI model that generates your score and feedback, and then discarded. We do not save the original file, the extracted text, or the report. Nothing is written to a user-specific database or file store. Closing or refreshing the page permanently removes the result from your browser.",
            "Your resume content is not used to train AI models and is not retained for any purpose after the report is returned.",
          ],
        },
        {
          heading: "What we collect",
          paragraphs: [
            "Usage analytics: anonymous page views, button clicks, and checker usage counts. This data is aggregated and cannot be used to identify you personally.",
            "Technical logs: standard server logs containing a truncated or hashed IP address, browser type, requested page, and error events. These are kept for a short time to keep the site running and to block abuse.",
            "Contact messages: if you email us or use the contact form, we keep your message and email address only for as long as needed to reply.",
            "Optional email subscriptions: if you choose to receive report copies or article updates by email, your address is used only for that purpose and you can ask us to delete it at any time.",
          ],
        },
        {
          heading: "Cookies and advertising",
          paragraphs: [
            "We use local storage only to remember your light or dark theme preference. This setting cannot identify you and is not used for tracking.",
            "The site is supported by advertising. Advertising and analytics partners may place their own cookies or use similar technologies to measure and personalise ads, under their own privacy policies. You can manage these through your browser settings or any consent prompt we show. Ads do not influence your ATS score or the advice we give.",
          ],
        },
        {
          heading: "Who we share data with",
          paragraphs: [
            "The AI provider that processes your resume text solely to generate the score and suggestions.",
            "Our hosting provider, email provider, and advertising/analytics partners, each acting only to deliver or support the service.",
            "We do not sell personal data. We do not share your resume with recruiters, employers, or anyone else.",
          ],
        },
        {
          heading: "Security",
          paragraphs: [
            "All traffic is encrypted with TLS. Because resume content is discarded immediately after the report is generated, there is no stored copy to lose. Administrative access is restricted and credentials are kept in a managed secret store.",
          ],
        },
        {
          heading: "International transfers",
          paragraphs: [
            "Our providers may process data outside your country, including in the United States. Where data leaves the UK or EEA we rely on adequacy decisions or Standard Contractual Clauses with appropriate safeguards.",
          ],
        },
        {
          heading: "Children",
          paragraphs: [
            "ZenWrit is intended for people of working age and is not directed at children under 13. We do not knowingly collect information from children.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "Because we do not store your resume or maintain accounts, there is usually nothing stored to access or delete. Where we do hold information, such as a support email or newsletter subscription, you can ask us to access, correct, or erase it by emailing support@zenwrit.app. We will respond within one month. If you are in the UK or EEA you also have the right to complain to your local data protection authority.",
          ],
        },
        {
          heading: "Changes and contact",
          paragraphs: [
            "If this notice changes we will update the date at the top of the page. Questions can be sent to support@zenwrit.app.",
          ],
        },
      ]}
    />
  ),
});
