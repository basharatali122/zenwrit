export type ToolField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "select";
  placeholder?: string;
  options?: string[];
  required?: boolean;
  rows?: number;
};

export type ArticleSection = { heading: string; paragraphs: string[]; bullets?: string[] };

export type Tool = {
  slug: string;
  name: string;
  tagline: string;
  icon: "resume" | "letter" | "linkedin" | "youtube" | "product";
  category: "Job seekers" | "Creators";
  seoTitle: string;
  seoDescription: string;
  fields: ToolField[];
  systemPrompt: string;
  outputLabel: string;
  faqs: { q: string; a: string }[];
  article: { title: string; intro: string[]; sections: ArticleSection[] };
};

export const TOOLS: Tool[] = [
  {
    slug: "resume-bullet-point-generator",
    name: "Resume Bullet Point Generator",
    tagline: "Turn plain job duties into measurable, recruiter-ready bullet points.",
    icon: "resume",
    category: "Job seekers",
    seoTitle: "Free AI Resume Bullet Point Generator | SaaScript",
    seoDescription:
      "Turn boring job duties into achievement-driven resume bullet points with metrics and strong action verbs. Free AI tool, no signup needed.",
    outputLabel: "Your resume bullet points",
    fields: [
      { name: "role", label: "Job title", type: "text", placeholder: "Customer Support Specialist", required: true },
      { name: "company", label: "Company / industry", type: "text", placeholder: "B2B SaaS startup, 40 people" },
      {
        name: "duties",
        label: "What did you actually do?",
        type: "textarea",
        rows: 5,
        placeholder: "Answered tickets, wrote help docs, trained 3 new hires, cut response time…",
        required: true,
      },
      {
        name: "tone",
        label: "Seniority level",
        type: "select",
        options: ["Entry level", "Mid level", "Senior", "Leadership"],
      },
    ],
    systemPrompt:
      "You are an expert technical recruiter and resume writer. Rewrite the user's raw job duties into 6 concise, ATS-friendly resume bullet points. Each bullet: starts with a strong past-tense action verb, describes scope, and ends with a measurable or concrete outcome. If the user gave no numbers, insert clearly marked placeholders like [X%] or [N] so they can fill them in. Never invent employers or certifications. Output only a plain list of bullets, one per line, each starting with '• '. No preamble, no headings.",
    faqs: [
      {
        q: "How many bullet points should each job have on a resume?",
        a: "Three to six for your most recent role, and two to four for older roles. Recruiters skim, so front-load impact and drop duties that every candidate in your field already has.",
      },
      {
        q: "Is an AI-written resume bullet ATS-safe?",
        a: "Yes, as long as you keep plain text, standard characters and real keywords from the job posting. This tool avoids tables, columns and graphics that break applicant tracking systems.",
      },
      {
        q: "What if I have no metrics for my work?",
        a: "The generator inserts placeholders such as [X%] or [N]. Estimate honestly — ticket volume, team size, hours saved per week and number of releases are all valid metrics.",
      },
    ],
    article: {
      title: "How to write resume bullet points that actually get interviews",
      intro: [
        "Most resumes fail for a boring reason: they describe responsibilities instead of results. A line like \"responsible for handling customer support tickets\" tells a hiring manager nothing that a hundred other applicants have not already written. A line like \"resolved 60+ support tickets per day while cutting average first-response time from 9 hours to 45 minutes\" tells them exactly how you work and what changes when you join. The gap between those two sentences is rarely a difference in ability — it is a difference in how the work was written down.",
        "The Resume Bullet Point Generator exists to close that gap in seconds. You paste in the messy, honest description of what you did, and it returns tightened bullets built around a strong action verb, a clear scope, and a measurable outcome. Below is how to feed it well, how to edit what comes back, and the mistakes that quietly keep good candidates out of the interview pile.",
      ],
      sections: [
        {
          heading: "Start with a raw brain dump, not a polished draft",
          paragraphs: [
            "The single biggest quality driver is the input. Do not try to sound professional in the box — the tool handles the polish. Instead, write everything you can remember about the role for two or three minutes: the systems you touched, the people you trained, the processes you built, the fires you put out, the numbers you can vaguely recall. Include the awkward details, like the spreadsheet you maintained for eighteen months or the onboarding doc nobody asked you to write. Those are exactly the details that turn into distinctive bullets.",
            "Also give context that a stranger would not know. \"B2B SaaS startup, 40 people\" produces very different phrasing than \"Fortune 500 insurer, 12,000 employees\", because scope reads differently at each scale. A rewrite engine is only as specific as the facts you hand it.",
          ],
        },
        {
          heading: "The anatomy of a bullet that survives a six-second scan",
          paragraphs: [
            "Recruiters spend an average of six to eight seconds on a first pass. A strong bullet is engineered for that scan and follows a predictable shape: action verb, what you did, for whom or at what scale, and the result.",
          ],
          bullets: [
            "Action verb: led, rebuilt, automated, negotiated, reduced, launched. Avoid \"helped with\" and \"responsible for\".",
            "Scope: the number of clients, size of budget, team headcount, volume of data or tickets.",
            "Method: the tool, framework or process that makes the work credible.",
            "Outcome: the percentage, dollar figure, time saved or quality change — the reason the work mattered.",
          ],
        },
        {
          heading: "Finding metrics when you think you have none",
          paragraphs: [
            "Almost everyone claims their job cannot be measured, and almost everyone is wrong. Metrics do not have to come from a dashboard. Count things: how many people you trained, how many documents you produced, how many events you ran, how many recurring meetings you eliminated. Estimate time: if a report used to take four hours a week and your template cut it to one, that is roughly 150 hours a year returned to the team.",
            "Use ranges and approximations when exact numbers are unavailable — \"approximately 30%\" is honest and far stronger than silence. The one rule is that you must be able to explain any number out loud in an interview without flinching. If you cannot defend it, delete it.",
          ],
        },
        {
          heading: "Tailoring bullets to a specific job posting",
          paragraphs: [
            "Generic resumes lose to tailored ones, and tailoring is mostly vocabulary work. Open the job description and highlight the nouns: the tools, the responsibilities, the outcomes the employer keeps repeating. If a posting says \"stakeholder management\" four times, your bullets should use that phrase where it is truthful, rather than your internal wording of \"talking to other teams\".",
            "This matters twice over. Applicant tracking systems rank documents partly on keyword overlap, and the human reading afterwards is subconsciously matching your language against the requisition they wrote. Regenerate your bullets once per application with the posting's phrasing in the duties box, and you get both effects for about ninety seconds of effort.",
          ],
        },
        {
          heading: "Edit like a skeptic before you ship",
          paragraphs: [
            "Never paste AI output straight into a resume. Read every bullet and ask three questions: Is it true? Is it mine? Would I be comfortable being interrogated about it? Replace any placeholder brackets, cut adjectives that carry no information — \"successfully\", \"various\", \"numerous\" — and make sure no two bullets start with the same verb.",
            "Then check length. A bullet that runs past two lines on screen stops being scannable, so split it or trim the setup. Finally, read the whole block aloud. If it sounds like a person describing real work rather than a template, you are done. Run a fresh set for your next application and keep the winners in a personal swipe file — over a job hunt, that file becomes the fastest asset you own.",
          ],
        },
      ],
    },
  },
  {
    slug: "cover-letter-generator",
    name: "Cover Letter Generator",
    tagline: "A tailored, human-sounding cover letter in under a minute.",
    icon: "letter",
    category: "Job seekers",
    seoTitle: "Free AI Cover Letter Generator — Tailored in Seconds | SaaScript",
    seoDescription:
      "Generate a personalised, non-generic cover letter from your background and the job description. Free AI cover letter writer, no signup required.",
    outputLabel: "Your cover letter",
    fields: [
      { name: "role", label: "Role you're applying for", type: "text", placeholder: "Product Marketing Manager", required: true },
      { name: "company", label: "Company", type: "text", placeholder: "Northwind Analytics", required: true },
      {
        name: "background",
        label: "Your background & highlights",
        type: "textarea",
        rows: 4,
        placeholder: "4 years in B2B marketing, led a launch that grew signups 38%, ex-agency…",
        required: true,
      },
      {
        name: "jobDescription",
        label: "Paste key parts of the job description",
        type: "textarea",
        rows: 4,
        placeholder: "We're looking for someone who can own positioning, run launches…",
      },
      { name: "tone", label: "Tone", type: "select", options: ["Warm and professional", "Direct and confident", "Formal", "Friendly startup"] },
    ],
    systemPrompt:
      "You are a career coach who writes cover letters that sound like a real, thoughtful human. Write a cover letter of 250-320 words with: a specific opening that references the company and role (no 'I am writing to apply'), two short middle paragraphs that connect the candidate's real experience to the employer's stated needs with concrete evidence, and a confident closing with a clear call to action. Never invent employers, degrees, or metrics that were not provided. Avoid clichés such as 'team player', 'passionate', 'fast-paced environment'. Output only the letter body, no subject line and no placeholders other than [Your Name] at the end.",
    faqs: [
      {
        q: "Do employers still read cover letters in 2026?",
        a: "Many do, particularly at small companies and for competitive roles where the shortlist is decided by a hiring manager rather than a screening tool. A short, specific letter is a low-cost tiebreaker.",
      },
      {
        q: "How long should a cover letter be?",
        a: "Between 250 and 350 words, or roughly half a page. Anything longer competes with your resume instead of supporting it.",
      },
      {
        q: "Will a recruiter know it was AI-generated?",
        a: "Not if you edit it. Add one specific detail only you could know — a product you used, a launch you followed, a person you spoke to — and the letter reads as unmistakably yours.",
      },
    ],
    article: {
      title: "How to write a cover letter that gets read (and what to skip)",
      intro: [
        "The cover letter is the most misunderstood document in hiring. Candidates either skip it entirely or produce a formal five-paragraph essay that restates the resume in weaker language. Both approaches waste the one chance you have to explain why you specifically want this job at this company — the only question a resume genuinely cannot answer.",
        "A good cover letter is short, specific and readable in under sixty seconds. It answers three things: why this company, why this role, and what evidence you bring. This tool assembles that structure from your background and the job description, and the guidance below shows how to make what comes back sound like you rather than like a template.",
      ],
      sections: [
        {
          heading: "Never open with \"I am writing to apply for…\"",
          paragraphs: [
            "The first sentence decides whether the rest gets read. Restating the job title you already put in the subject line signals that the reader is about to receive boilerplate. Instead, open with a point of contact between you and the company: a product decision you admire, a problem the role clearly exists to solve, or a relevant result you produced last year.",
            "Compare \"I am writing to apply for the Product Marketing Manager position\" to \"Your changelog says you shipped self-serve onboarding in March — I spent last year running the same transition at a 40-person analytics company, and I would like to do it again here.\" The second version proves research, relevance and momentum in one line, and costs nothing extra to write.",
          ],
        },
        {
          heading: "Mirror the job description without copying it",
          paragraphs: [
            "Read the posting and pull out the two or three requirements the employer clearly cares most about — usually the ones repeated in both the responsibilities and the requirements list. Those are the hooks your middle paragraphs should hang on. Everything else is noise for this application.",
            "For each hook, give one piece of evidence with a result attached. Do not list five accomplishments; pick the two that map most directly and describe them in a sentence each. A letter that addresses two requirements convincingly beats one that gestures vaguely at eight, because the hiring manager is mentally checking boxes as they read.",
          ],
        },
        {
          heading: "Write like a person, not a press release",
          paragraphs: [
            "The fastest way to make a letter feel generated — by a human or a machine — is stacked abstractions: passionate, dynamic, results-driven, fast-paced. They are filler words that survive because they feel safe. Cut every one and the letter gets shorter and more credible immediately.",
          ],
          bullets: [
            "Use contractions. \"I've\" and \"I'd\" read as human; \"I have\" and \"I would\" throughout read as legalese.",
            "Prefer short sentences. Two clauses maximum, most of the time.",
            "Name real things: tools, products, customers, numbers, dates.",
            "Delete any sentence that would be equally true for a different applicant.",
          ],
        },
        {
          heading: "Handle the awkward parts on purpose",
          paragraphs: [
            "Career gaps, industry switches and being slightly under-qualified are all survivable — silence about them is not. One clear sentence defuses a concern that would otherwise sit unanswered in the reader's mind: \"I spent 2025 caring for a family member and kept my skills current with two freelance projects, both listed on my resume.\"",
            "For a career change, do the translation work yourself rather than hoping the reader does it. Explain which parts of your previous field transfer — the customer research, the compliance rigour, the shift-lead scheduling that is really operations management — and give one example that proves the transfer already happened at least once.",
          ],
        },
        {
          heading: "Edit, personalise, and keep a reusable core",
          paragraphs: [
            "After generating, do three passes. First, factual: every claim must be true and defensible. Second, specific: add at least one detail that could only apply to this employer, ideally in the opening or closing. Third, mechanical: correct company name everywhere, correct hiring manager name if you can find it, no leftover placeholder text. Getting the company name wrong is the single most common instant rejection, and it happens most often to people reusing a previous letter.",
            "Over time you will notice that roughly a third of your letter — the evidence paragraphs — stays stable across applications, while the opening and the hooks change every time. Keep that stable third in a note and regenerate the rest per job. A tailored letter should take you about five minutes, not an evening, and five minutes is a price worth paying for the applications you actually want.",
          ],
        },
      ],
    },
  },
  {
    slug: "linkedin-post-generator",
    name: "LinkedIn Post Generator",
    tagline: "Hook-first posts that stop the scroll and start conversations.",
    icon: "linkedin",
    category: "Creators",
    seoTitle: "Free AI LinkedIn Post Generator — Hooks That Convert | SaaScript",
    seoDescription:
      "Turn an idea, lesson or update into a scroll-stopping LinkedIn post with a strong hook, readable structure and a real call to action. Free, no signup.",
    outputLabel: "Your LinkedIn post",
    fields: [
      { name: "topic", label: "What's the post about?", type: "textarea", rows: 4, placeholder: "A lesson from shipping our first paid feature…", required: true },
      { name: "audience", label: "Who is it for?", type: "text", placeholder: "Early-stage founders and product managers" },
      { name: "goal", label: "Goal", type: "select", options: ["Build authority", "Start a discussion", "Share a lesson", "Promote something", "Tell a story"] },
      { name: "tone", label: "Tone", type: "select", options: ["Conversational", "Analytical", "Bold and opinionated", "Warm and personal"] },
    ],
    systemPrompt:
      "You are a LinkedIn ghostwriter for operators and founders. Write one post of 120-220 words. Rules: line 1 is a hook under 12 words that creates curiosity or tension without clickbait; use short single-sentence paragraphs separated by blank lines; include one concrete specific detail or number; end with a genuine question or invitation, not 'thoughts?'. No hashtags-stuffing (max 3, only if natural), no emoji bullet spam, no 'In today's fast-paced world'. Output only the post text.",
    faqs: [
      {
        q: "How long should a LinkedIn post be?",
        a: "Roughly 120 to 220 words. Long enough to say something real, short enough that the whole post fits in a couple of screens on mobile where most people read it.",
      },
      {
        q: "Do hashtags still help on LinkedIn?",
        a: "Marginally. One to three relevant hashtags is fine; a wall of twenty looks spammy and does not measurably improve reach.",
      },
      {
        q: "How often should I post?",
        a: "Two to three times a week beats daily posting you cannot sustain. Consistency over months matters more than volume in any single week.",
      },
    ],
    article: {
      title: "How to write LinkedIn posts people actually stop for",
      intro: [
        "LinkedIn rewards a very particular kind of writing: fast, concrete, and generous. The feed shows roughly the first two lines of your post before it collapses behind a \"see more\" link, so the whole game is won or lost in about twelve words. Everything after that only matters if the opening earned the click.",
        "The LinkedIn Post Generator drafts that structure for you — hook, short paragraphs, one specific detail, a real closing question. This guide explains what makes each part work so you can edit the draft with judgement instead of guessing.",
      ],
      sections: [
        {
          heading: "The hook is 80% of the work",
          paragraphs: [
            "A good hook creates an open loop: it promises a payoff that the reader has to expand the post to receive. The four reliable patterns are the contrarian claim (\"Hiring for culture fit is how teams get worse\"), the specific result (\"We cut churn 22% by deleting a feature\"), the confession (\"I misread our best customer for eight months\") and the crisp question (\"When did 'busy' become a personality?\").",
            "What kills hooks is throat-clearing. Any sentence that starts with \"I wanted to share some thoughts about\" has spent your entire visible allowance on nothing. Write the post first if it helps, then delete the first two paragraphs — the real hook is usually hiding in paragraph three.",
          ],
        },
        {
          heading: "Format for a phone, not a document",
          paragraphs: [
            "Most of your readers are on mobile, one-handed, between other tasks. Dense paragraphs read as work and get skipped. The convention on LinkedIn — one or two sentences per paragraph with a blank line between — is not a stylistic fad, it is an accessibility feature for a hostile reading environment.",
          ],
          bullets: [
            "Keep paragraphs to one idea and one or two sentences.",
            "Use white space as punctuation; it slows the eye at the point you want emphasis.",
            "Save lists for three to five items, never more, and never nested.",
            "Put the single most quotable sentence on its own line.",
          ],
        },
        {
          heading: "Specificity is what makes a post credible",
          paragraphs: [
            "\"Consistency is key\" is true and worthless. \"I posted twice a week for eleven months before a single post did anything, and it was the one I almost deleted\" carries the same lesson with proof attached. Numbers, timeframes, names of tools, and the details of what went wrong are what separate a post that gets saved from one that gets scrolled.",
            "This is also the part AI cannot invent for you. Whatever the generator returns, your job in editing is to swap at least one generic statement for a fact from your own week. That single substitution is usually the difference between a post that sounds like everyone and one that sounds like you.",
          ],
        },
        {
          heading: "Endings that earn comments",
          paragraphs: [
            "The comment section is where reach is decided, and \"Thoughts?\" does not earn any. Ask something a reader can answer from experience in one sentence: \"What's the last feature you removed, and did anyone notice?\" is easy to reply to because the reader already knows their answer.",
            "Then actually reply. Answering the first ten comments within an hour or two does more for a post's distribution than any posting-time trick, and it turns a broadcast into the conversation that makes people follow you. Treat your own comment section as part of the post, not as an afterthought.",
          ],
        },
        {
          heading: "Build a system so you never stare at a blank box",
          paragraphs: [
            "The hardest part of posting consistently is not writing, it is deciding what to write about. Solve that with a running notes file: every time something surprises you at work, a customer says something memorable, or you change your mind about a belief, write one line. Each line is a future post, and the generator can turn any of them into a draft in seconds.",
            "Batch the drafting. Pull three ideas on a Sunday, generate three drafts, edit them for facts and voice, and schedule them across the week. You keep the consistency the platform rewards without the daily dread, and because the raw material comes from your actual work, you never run out. Publishing becomes a fifteen-minute weekly habit rather than a daily performance.",
          ],
        },
      ],
    },
  },
  {
    slug: "youtube-title-generator",
    name: "YouTube Title Generator",
    tagline: "Ten click-worthy titles that stay honest to your video.",
    icon: "youtube",
    category: "Creators",
    seoTitle: "Free AI YouTube Title Generator — 10 Ideas Instantly | SaaScript",
    seoDescription:
      "Generate ten high-CTR YouTube titles from your video topic, plus search keywords built in. Free AI title generator for creators, no signup needed.",
    outputLabel: "Your title ideas",
    fields: [
      { name: "topic", label: "What's the video about?", type: "textarea", rows: 4, placeholder: "A beginner's guide to home espresso under $300…", required: true },
      { name: "audience", label: "Target viewer", type: "text", placeholder: "Coffee beginners buying their first machine" },
      { name: "style", label: "Style", type: "select", options: ["Tutorial / how-to", "Listicle", "Story / vlog", "Review", "Opinion / essay"] },
      { name: "keyword", label: "Main search keyword (optional)", type: "text", placeholder: "home espresso setup" },
    ],
    systemPrompt:
      "You are a YouTube packaging strategist. Generate exactly 10 title options for the described video. Rules: 45-65 characters where possible, front-load the main keyword, use curiosity or specificity rather than false promises, vary the formats (how-to, number list, mistake/warning, transformation, question, comparison). No ALL CAPS words except a single word for emphasis at most, no misleading claims, no clickbait the video cannot deliver. Output a numbered list of 10 titles only, with a character count in parentheses at the end of each line.",
    faqs: [
      {
        q: "What is the ideal YouTube title length?",
        a: "Around 45 to 65 characters. Longer titles get truncated on mobile and in search results, which usually cuts off the most interesting part.",
      },
      {
        q: "Do keywords in titles still matter for YouTube SEO?",
        a: "Yes. YouTube reads the title for topic matching, so the phrase a viewer would actually search should appear near the front — but click-through rate still decides how far the video travels.",
      },
      {
        q: "Should the title match the thumbnail text?",
        a: "They should complement, not duplicate. Use the thumbnail for three to five punchy words and let the title add the missing context.",
      },
    ],
    article: {
      title: "How to write YouTube titles that earn the click honestly",
      intro: [
        "A YouTube title has two jobs that pull in opposite directions. It has to be findable, which pushes you toward plain search language, and it has to be interesting, which pushes you toward curiosity and drama. Titles that only do the first get impressions and no clicks. Titles that only do the second get clicks from the wrong people, who leave in twenty seconds and quietly teach the algorithm to stop recommending you.",
        "The YouTube Title Generator gives you ten options across different formats so you can pick the balance that fits the video you actually made. Here is how to judge those options instead of grabbing the first one.",
      ],
      sections: [
        {
          heading: "Front-load the words a viewer would type",
          paragraphs: [
            "Search on YouTube still starts with language matching, and the beginning of your title carries the most weight — both for the platform and for a human scanning a results page on a phone where the last third may be cut off. If your video is about setting up home espresso on a budget, \"Home espresso setup\" belongs in the first few words, not after a clever aside.",
            "Do the keyword check the cheap way: type your topic into YouTube's search bar and read the autocomplete suggestions. Those are real queries from real viewers, ordered roughly by volume. Feed the best-matching one into the generator's keyword field and every option will be built around language people already use.",
          ],
        },
        {
          heading: "Curiosity gaps beat superlatives",
          paragraphs: [
            "\"The BEST espresso machine EVER\" is a claim; nobody believes claims. \"I tested 6 espresso machines under $300 — one broke in a week\" is a story with an unanswered question, and unanswered questions are what make people click.",
          ],
          bullets: [
            "Specific numbers outperform vague quantities: \"6 machines\", \"in 14 days\", \"under $300\".",
            "Stakes and consequences travel: what broke, what failed, what it cost.",
            "Contrast frames work: before/after, expensive vs cheap, expert vs beginner.",
            "A hint of the outcome without the full reveal keeps the gap open.",
          ],
        },
        {
          heading: "Match the title to the promise you can keep",
          paragraphs: [
            "Click-through rate is only half the equation; average view duration is the other half. A title that oversells produces a spike of clicks followed by a cliff of exits, and YouTube reads that pattern as a bad recommendation. Over a few uploads it will show your videos to fewer people, which is a slow and confusing way to lose a channel.",
            "The practical rule: write the title only after the video is edited, and only make promises the first two minutes deliver. If the title says you tested six machines, show all six early. Honest packaging is not a moral position here, it is retention strategy.",
          ],
        },
        {
          heading: "Design title and thumbnail as one unit",
          paragraphs: [
            "Viewers process the thumbnail first and the title second, in roughly a third of a second. If both say the same thing you have wasted one of them. The strongest combinations split the message: the thumbnail shows the visual hook or the emotional state, and the title supplies the specifics the image cannot carry.",
            "Try writing three words for the thumbnail and checking whether your title still makes sense without them. If it does, and adding them makes the pairing sharper, you have a working set. If the title collapses without the thumbnail, rewrite it — search results and suggested feeds sometimes show your title next to a very different image than you planned.",
          ],
        },
        {
          heading: "Test, then keep what wins",
          paragraphs: [
            "Titles are one of the few things you can change after publishing. If a video underperforms in its first 48 hours relative to your channel average, swap the title for a different format from your generated list and watch the impressions-to-click ratio over the next few days. Change one variable at a time so you learn something.",
            "Keep a simple log of the titles that worked and the formats behind them. Most channels discover that two or three patterns consistently outperform for their specific audience — perhaps mistake-driven titles and cost comparisons — and once you know yours, packaging stops being a guessing game. Generate ten, pick two, test both, and let your own data narrow the field.",
          ],
        },
      ],
    },
  },
  {
    slug: "product-description-generator",
    name: "Product Description Generator",
    tagline: "Benefit-led store copy that converts browsers into buyers.",
    icon: "product",
    category: "Creators",
    seoTitle: "Free AI Product Description Generator for Ecommerce | SaaScript",
    seoDescription:
      "Write persuasive, SEO-friendly product descriptions with benefits, specs and a call to action. Free AI product copy generator, no signup required.",
    outputLabel: "Your product description",
    fields: [
      { name: "product", label: "Product name", type: "text", placeholder: "Merino Everyday Crew Socks", required: true },
      { name: "features", label: "Key features & specs", type: "textarea", rows: 4, placeholder: "80% merino wool, reinforced heel, 3-pack, machine washable…", required: true },
      { name: "audience", label: "Who buys it?", type: "text", placeholder: "Commuters and hikers who hate sweaty feet" },
      { name: "tone", label: "Brand voice", type: "select", options: ["Clean and premium", "Playful", "Technical", "Warm and homey", "Bold DTC"] },
    ],
    systemPrompt:
      "You are an ecommerce conversion copywriter. Produce: (1) a one-sentence hook, (2) a 60-90 word benefit-led paragraph translating features into outcomes for the buyer, (3) a 'Why you'll love it' list of 4 short benefit bullets each tied to a real feature, (4) a 'Details' list of the raw specs provided, (5) a one-line call to action. Never invent certifications, materials, guarantees or claims not provided. Avoid 'game-changer', 'revolutionary', 'unleash'. Use plain headings and hyphen bullets. Output only the description.",
    faqs: [
      {
        q: "How long should a product description be?",
        a: "Around 100 to 200 words for most items, with the specs in a scannable list underneath. Complex or expensive products justify more; commodity items rarely do.",
      },
      {
        q: "Are AI product descriptions bad for SEO?",
        a: "No — duplicate descriptions are. Unique, specific copy that answers real buyer questions performs well regardless of how the first draft was written.",
      },
      {
        q: "Should I list features or benefits?",
        a: "Both, in that order of prominence: lead with the benefit the shopper feels, then back it with the feature that makes it true, then list raw specs for people who compare.",
      },
    ],
    article: {
      title: "How to write product descriptions that sell without hype",
      intro: [
        "Shoppers do not read product pages so much as interrogate them. They arrive with a specific worry — will it fit, will it last, will it work with what I already own — and they scan until they find an answer or run out of patience. A description that lists materials without addressing those worries is technically informative and commercially useless.",
        "The Product Description Generator produces a structure built for that behaviour: a hook, a short benefit paragraph, scannable benefits, hard specs and a call to action. The sections below explain how to feed it well and how to edit for the details that actually close a sale.",
      ],
      sections: [
        {
          heading: "Translate every feature into a consequence",
          paragraphs: [
            "\"80% merino wool\" is a fact. \"Stays dry on a two-hour commute and doesn't smell after a full day\" is why someone buys. The translation from one to the other is the entire craft of product copy, and it is where most store listings stop short because the seller already knows why the material matters and forgets the buyer does not.",
            "A useful drill: for each spec you list, finish the sentence \"which means you…\". Reinforced heel — which means you get twice the life out of them. Three-pack — which means laundry day is never a crisis. Feed those consequences into the features box alongside the raw specs and the output gets dramatically more persuasive.",
          ],
        },
        {
          heading: "Answer objections before they become exits",
          paragraphs: [
            "Every product has three or four recurring doubts. You already know them: they are in your support inbox, your returns reasons and your review section. Copy that names them directly outperforms copy that pretends they do not exist, because a shopper who cannot resolve a doubt on the page simply leaves.",
          ],
          bullets: [
            "Sizing and fit: give a reference point, not just a chart.",
            "Compatibility: state plainly what it does and does not work with.",
            "Care and durability: washing, wear, expected lifespan.",
            "Risk: returns window, warranty, what happens if it is wrong.",
          ],
        },
        {
          heading: "Structure for scanners first, readers second",
          paragraphs: [
            "Assume the shopper reads the first line, the bullets and nothing else. That means the hook has to carry the core promise on its own, and each bullet has to make sense out of context. The paragraph in between is for the minority who are seriously considering and want the story — write it well, but never hide critical information there.",
            "On mobile, where most ecommerce traffic now lives, the specs block below the fold does real work: it is what a comparison shopper scrolls to when weighing you against a competitor tab. Keep it factual, complete and boring. This is the one place where personality should get out of the way.",
          ],
        },
        {
          heading: "Keep SEO honest and specific",
          paragraphs: [
            "Product pages rank on specificity, not repetition. Use the words a buyer would search — the material, the use case, the problem — naturally in the hook and the first paragraph, and let the specs list carry the long-tail terms like exact dimensions and model numbers. Cramming the same keyword six times reads badly to humans and no longer helps with search engines.",
            "The bigger SEO risk in ecommerce is duplication: pasting the manufacturer's supplied blurb onto your page, exactly as fifty other stores did. Unique copy is the cheapest competitive advantage available on a product page, which is precisely why generating a distinct description per SKU is worth the two minutes it takes.",
          ],
        },
        {
          heading: "Edit for truth, then test the hook",
          paragraphs: [
            "Read the generated copy against your actual product data and strike anything you cannot prove. Invented certifications, implied guarantees and vague health claims are legal exposure in most markets, not just bad writing. If the model added a claim you did not supply, delete it rather than softening it.",
            "Once the copy is accurate, the highest-leverage thing left to test is the first line. Swap it for a different angle — outcome, objection or comparison — and watch add-to-cart rate over a couple of weeks on your higher-traffic products. Small stores often find a five to ten percent difference between hooks on identical products, which is a better return than most redesigns and takes about a minute to try.",
          ],
        },
      ],
    },
  },
];

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export const FREE_DAILY_LIMIT = 3;
