import { createFileRoute, Link } from "@tanstack/react-router";
import { AdSlot } from "@/components/site/AdSlot";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ZenWrit — Small AI Tools, Fairly Priced" },
      {
        name: "description",
        content:
          "ZenWrit builds one fast, focused tool: a free ATS resume checker for job seekers. No signup, no limits.",
      },
      { property: "og:title", content: "About ZenWrit" },
      { property: "og:description", content: "Why we build one focused, free ATS resume checker instead of a bloated suite." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">About ZenWrit</h1>
      <div className="prose-article mt-6 max-w-2xl">
        <p>
          ZenWrit is a small collection of AI micro-tools built around a simple belief: most people
          do not want a general assistant, they want one specific piece of writing finished well and
          quickly. A resume bullet. A cover letter. Ten title options before a Sunday upload.
        </p>
        <h2>What we build</h2>
        <p>
          Every tool here is single-purpose and opinionated. Instead of a blank chat box, you get a
          short form built around what the output actually needs, and a prompt tuned by someone who
          has written that kind of copy for a living. That constraint is why the results are usable
          in one pass rather than five.
        </p>
        <h2>How we make money</h2>
        <p>
          Free users get three generations a day and see ads. Pro users pay $5 a month for unlimited
          generations, no ads and priority speed. There is no enterprise tier, no annual lock-in and
          no sales call — the whole point is that the price is small enough to be an easy decision.
        </p>
        <h2>Privacy</h2>
        <p>
          You can use every tool without an account. If you create one, we store your generations so
          you can find them again, and you can delete any of them from your dashboard at any time.
          Read the <Link to="/privacy">privacy policy</Link> for the details.
        </p>
      </div>

      <AdSlot id="ad-slot-about" label="Ad slot — footer" className="mt-10 max-w-2xl" />
    </div>
  );
}
