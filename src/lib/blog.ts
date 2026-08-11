export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  body: { heading?: string; paragraphs: string[] }[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "ai-tools-for-job-seekers-2026",
    title: "The realistic guide to using AI in your 2026 job search",
    description:
      "Where AI genuinely speeds up a job hunt, where it quietly hurts you, and a repeatable weekly workflow for applications.",
    date: "2026-02-18",
    readingTime: "6 min read",
    category: "Careers",
    body: [
      {
        paragraphs: [
          "AI has changed the mechanics of job hunting far more than it has changed the outcome. Applications take minutes instead of evenings, which means everyone applies to more roles, which means recruiters see more noise. The candidates who win are not the ones generating the most documents — they are the ones using the time they save to do the things that never scaled: research, referrals, and follow-up.",
        ],
      },
      {
        heading: "What AI is genuinely good at",
        paragraphs: [
          "Rewriting is the killer use case. Turning a messy description of your work into tight, measurable resume bullets is mechanical labour that a model does well and humans do slowly. The same is true for adapting a stable cover-letter core to a specific posting, or drafting a follow-up note you have been avoiding for three days.",
          "It is also excellent at pre-interview preparation: paste a job description and ask for the ten questions most likely to come up, then rehearse answers out loud. That is free, unlimited practice against a realistic brief.",
        ],
      },
      {
        heading: "What it is bad at",
        paragraphs: [
          "AI cannot know your actual numbers, and it will happily produce confident-sounding placeholders that read as lies in an interview. It also has a strong pull toward generic phrasing — the exact quality that makes an application forgettable. Every generated document needs a pass where you replace at least one abstraction with a fact only you could supply.",
        ],
      },
      {
        heading: "A weekly workflow that works",
        paragraphs: [
          "Block ninety minutes twice a week. In the first half, shortlist roles and generate tailored bullets and letters for each — five applications is a realistic target. In the second half, do the unscalable work: find one human at each company, send a short message, and follow up on anything from last week.",
          "Track everything in one sheet: company, role, date applied, contact, follow-up date. The tracker matters more than any single document, because job searches are lost to forgetting, not to writing quality.",
        ],
      },
    ],
  },
  {
    slug: "how-often-should-you-post-on-linkedin",
    title: "How often should you post on LinkedIn? An honest answer",
    description:
      "Posting cadence advice usually comes from people selling cadence advice. Here's what actually compounds, and what burns you out.",
    date: "2026-01-29",
    readingTime: "5 min read",
    category: "Creators",
    body: [
      {
        paragraphs: [
          "The standard advice is to post daily. It is also the advice that produces the most abandoned accounts. Daily posting works for people whose job is posting; for everyone else it means either running out of ideas by week three or publishing filler that trains your audience to scroll past you.",
        ],
      },
      {
        heading: "Two to three times a week is the sweet spot",
        paragraphs: [
          "At two to three posts a week you stay visible in the feed without needing to manufacture opinions. More importantly, it is a cadence you can hold for a year, and a year is roughly the timescale on which LinkedIn writing starts to produce inbound opportunities.",
          "The compounding does not come from volume. It comes from the same people seeing your name repeatedly next to a consistent point of view.",
        ],
      },
      {
        heading: "Batch the drafting, spread the publishing",
        paragraphs: [
          "Keep a running notes file of observations from your actual work. Once a week, pick three, draft them quickly, then edit for specifics and voice. Publishing becomes a fifteen-minute habit rather than a daily performance, and the raw material never runs dry because it comes from your job rather than from your imagination.",
        ],
      },
      {
        heading: "Spend your energy in the comments",
        paragraphs: [
          "If you have one extra hour a week, put it in replies — both on your own posts and on other people's. Distribution on LinkedIn is heavily conversation-weighted, and thoughtful comments on larger accounts put you in front of exactly the audience you are trying to reach, at zero cost of creation.",
        ],
      },
    ],
  },
  {
    slug: "seo-for-product-pages",
    title: "SEO for product pages: what actually moves rankings",
    description:
      "Duplicate manufacturer copy, thin descriptions and missing specs cost small stores more traffic than any technical issue.",
    date: "2026-01-12",
    readingTime: "6 min read",
    category: "Ecommerce",
    body: [
      {
        paragraphs: [
          "Most small stores worry about technical SEO while losing traffic to something simpler: their product pages say nothing that fifty other stores do not also say. When you paste the manufacturer's blurb, you are asking a search engine to pick you out of an identical crowd, and it usually picks the bigger domain.",
        ],
      },
      {
        heading: "Unique copy per SKU is the whole game",
        paragraphs: [
          "A distinct 120-word description per product, written around real buyer questions, outperforms almost any other on-page change available to a small store. It also improves conversion, which means the traffic you already have becomes worth more while the ranking effects build.",
        ],
      },
      {
        heading: "Answer the comparison questions on the page",
        paragraphs: [
          "Shoppers search in long, specific phrases: sizing, compatibility, materials, care instructions. Every one of those is a query you can rank for by simply answering it in your specs block. Pull the questions from your own support inbox — they are free keyword research written by actual customers.",
        ],
      },
      {
        heading: "Keep structure boring and complete",
        paragraphs: [
          "Descriptive title, one H1, real alt text on images, complete spec list, visible price and availability. Nothing here is clever, and that is the point. Product SEO rewards completeness far more than tactics, and completeness is something a small store can actually finish.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
