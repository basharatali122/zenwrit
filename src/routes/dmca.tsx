import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/dmca")({
  head: () => ({
    meta: [
      { title: "DMCA Policy | ZenWrit" },
      {
        name: "description",
        content:
          "How to submit a copyright infringement notice or counter-notification to ZenWrit under the Digital Millennium Copyright Act (DMCA).",
      },
      { property: "og:title", content: "DMCA Policy | ZenWrit" },
      {
        property: "og:description",
        content: "Copyright takedown and counter-notice procedure for ZenWrit.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "https://zenwrit.com/dmca" },
    ],
    links: [{ rel: "canonical", href: "https://zenwrit.com/dmca" }],
  }),
  component: () => (
    <LegalPage
      title="DMCA Policy"
      updated="27 August 2026"
      sections={[
        {
          heading: "Our commitment",
          paragraphs: [
            "ZenWrit respects the intellectual property rights of others and expects our users to do the same. We respond to notices of alleged copyright infringement that comply with the Digital Millennium Copyright Act (DMCA) and other applicable laws.",
          ],
        },
        {
          heading: "Filing a copyright infringement notice",
          paragraphs: [
            "If you believe that content on ZenWrit infringes your copyright, send a written notice to support@zenwrit.app with the subject line \"DMCA Notice\" that includes all of the following:",
            "1. A physical or electronic signature of the copyright owner or a person authorised to act on their behalf.",
            "2. Identification of the copyrighted work you claim has been infringed.",
            "3. Identification of the material on ZenWrit that you claim is infringing, including the exact URL(s), so we can locate it.",
            "4. Your name, mailing address, telephone number and email address.",
            "5. A statement that you have a good-faith belief that the disputed use is not authorised by the copyright owner, its agent or the law.",
            "6. A statement, made under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorised to act on the owner's behalf.",
          ],
        },
        {
          heading: "What happens next",
          paragraphs: [
            "When we receive a complete and valid notice, we will remove or disable access to the allegedly infringing material promptly and notify the person who posted it. We may share your notice, including your contact details, with that person.",
          ],
        },
        {
          heading: "Counter-notification",
          paragraphs: [
            "If you believe material was removed by mistake or misidentification, you may send a counter-notification to support@zenwrit.app that includes your signature, identification of the removed material and where it appeared, a statement under penalty of perjury that you have a good-faith belief the removal was a mistake, and your consent to the jurisdiction of the courts where ZenWrit is established.",
            "Where a valid counter-notification is received, we may restore the material after 10–14 business days unless the original complainant files a court action.",
          ],
        },
        {
          heading: "Repeat infringers",
          paragraphs: [
            "In accordance with the DMCA and our Terms of Service, accounts of users who repeatedly infringe copyright will be terminated.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "All DMCA notices and counter-notifications should be sent to support@zenwrit.app.",
          ],
        },
      ]}
    />
  ),
});
