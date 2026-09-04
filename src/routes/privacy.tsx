import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | ZenWrit" },
      {
        name: "description",
        content:
          "How ZenWrit handles your resume: no account, no signup, nothing stored. Read what we collect, how cookies and ads work, and how to contact us.",
      },
      { property: "og:title", content: "Privacy Policy | ZenWrit" },
      {
        property: "og:description",
        content: "ZenWrit's ATS resume checker needs no account and never stores your resume.",
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
      updated="4 September 2026"
      sections={[
        {
          heading: "Who we are",
          paragraphs: [
            "ZenWrit (zenwrit.com) is a free ATS resume checker. This notice explains what happens to your information when you use the site. You can reach us at any time at support@zenwrit.app.",
          ],
        },
        {
          heading: "No account, no signup",
          paragraphs: [
            "You do not need to create an account, sign in or provide an email address to use the resume checker. There are no paid plans, no subscriptions and no usage limits, so we do not hold billing details or profile records for visitors.",
          ],
        },
        {
          heading: "Your resume is not stored",
          paragraphs: [
            "When you paste or upload a resume, the text is sent over an encrypted connection to our server, passed to the AI model that produces your score and suggestions, and then discarded. We do not save the file, we do not save the extracted text, and we do not keep a copy of your results. Closing or refreshing the page removes the report permanently.",
            "Your resume content is not used to train AI models.",
          ],
        },
        {
          heading: "What we do collect",
          paragraphs: [
            "Technical data: standard server and error logs containing a truncated or hashed IP address, browser type and the page requested. These are used to keep the site available and to block automated abuse, and are kept for a short period before deletion.",
            "Aggregate usage data: anonymous counts of page views and how often the checker is run. This tells us which pages are useful; it is not linked to an identifiable person.",
            "Messages you send us: if you email us or use the contact form, we keep your message and email address only for as long as needed to answer you.",
            "Optional email: if you ask us to email a copy of your report, or subscribe to article updates, we use your address only for that purpose and you can ask us to delete it at any time.",
          ],
        },
        {
          heading: "Cookies and advertising",
          paragraphs: [
            "We use a small amount of local storage to remember your light or dark theme preference. That is not tracking and cannot identify you.",
            "This site is supported by advertising. Advertising and analytics partners may set their own cookies or similar technologies to measure and personalise the ads you see, under their own privacy policies. You can manage these through your browser settings or any consent prompt shown to you. Ads never influence how your resume is scored or what advice we give.",
          ],
        },
        {
          heading: "Who we share data with",
          paragraphs: [
            "Our hosting provider, our email provider and the AI provider that processes your resume text to generate a report. They act on our instructions and process data only to deliver the service.",
            "We do not sell personal data, and we do not share your resume with recruiters, employers or anyone else.",
          ],
        },
        {
          heading: "Security",
          paragraphs: [
            "All traffic to the site is encrypted in transit (TLS). Because resume content is discarded straight after your report is generated, there is no stored copy of it to lose. Administrative access to our systems is restricted and credentials are held in a managed secret store rather than in application code.",
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
            "ZenWrit is intended for people of working age and is not directed at children under 13. We do not knowingly collect information from them.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "Because we do not keep your resume or hold an account for you, there is usually nothing stored to access or delete. Where we do hold something — a support email or a newsletter subscription — you can ask us to access, correct or erase it by emailing support@zenwrit.app, and we will respond within one month. If you are in the UK or EEA you also have the right to complain to your local data protection authority.",
          ],
        },
        {
          heading: "Changes and contact",
          paragraphs: [
            "If this notice changes we will update the date at the top of this page. Questions can be sent to support@zenwrit.app.",
          ],
        },
      ]}
    />
  ),
});
