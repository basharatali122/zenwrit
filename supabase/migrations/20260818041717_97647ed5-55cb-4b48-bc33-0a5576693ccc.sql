INSERT INTO public.tools (
  slug, name, short_description, icon, category, form_fields, system_prompt,
  output_label, faqs, article_title, article_content, meta_title, meta_description,
  is_published, sort_order
) VALUES (
  'job-description-generator',
  'AI Job Description Generator',
  'Write clear, inclusive, high-converting job descriptions in seconds — built for hiring managers and recruiters.',
  'letter',
  'Hiring',
  $json$[
    {"name":"role","label":"Job title","type":"text","placeholder":"Senior Backend Engineer","required":true},
    {"name":"company","label":"Company & what it does","type":"textarea","rows":3,"placeholder":"Northwind Analytics — a 60-person B2B SaaS helping ecommerce teams forecast demand","required":true},
    {"name":"responsibilities","label":"Key responsibilities & must-have skills","type":"textarea","rows":5,"placeholder":"Own our Go services, mentor 2 juniors, 5+ years backend, Postgres, AWS…","required":true},
    {"name":"location","label":"Location & work setup","type":"text","placeholder":"Remote (EU timezones) or Berlin hybrid, 3 days onsite"},
    {"name":"salary","label":"Salary range & key benefits","type":"text","placeholder":"€75k–€95k, 30 days PTO, learning budget"},
    {"name":"seniority","label":"Seniority level","type":"select","options":["Internship","Entry level","Mid level","Senior","Lead / Manager","Executive"]},
    {"name":"tone","label":"Tone","type":"select","options":["Professional","Warm and human","Startup casual","Corporate formal"]}
  ]$json$::jsonb,
  $prompt$You are a senior talent-acquisition partner who has written thousands of job descriptions that fill roles fast at both startups and enterprises. Write a complete, ready-to-post job description.

Rules you must follow:
- Open with 2-3 sentences about the company and why this role exists right now. Never start with "We are seeking a highly motivated individual".
- Use these sections, in this order, as markdown H2 headings: About the role, What you'll do, What we're looking for, Nice to have, Compensation & benefits, How to apply.
- "What you'll do" = 5-7 bullets, each starting with an action verb and describing outcomes, not vague duties.
- "What we're looking for" = 4-6 genuinely required qualifications. Never invent requirements the user did not imply. Avoid arbitrary degree requirements unless stated.
- Use inclusive, bias-free language: no "rockstar", "ninja", "young", "digital native", "he/she", "cultural fit". Prefer "you" and "we".
- If a salary range is provided, state it plainly. If it is not, add one short line encouraging the employer to add a range and note that pay transparency increases applications.
- Keep sentences short and concrete. No corporate filler, no emoji, no exclamation marks.
- End with a brief equal-opportunity statement and a clear application call to action.
- Output clean markdown only — no preamble, no commentary about the prompt.
- Length: 350-550 words.$prompt$,
  'Your job description',
  $faq$[
    {"q":"Is the AI job description generator free?","a":"Yes. You can generate job descriptions for free every day. A Pro plan removes the daily limit and unlocks longer, more detailed outputs."},
    {"q":"Will the job description be biased or exclusionary?","a":"The prompt explicitly blocks gendered wording, age signals and hype terms like rockstar or ninja, and it avoids inventing degree requirements. Always give the draft a final human read before posting."},
    {"q":"Should I include a salary range?","a":"Yes wherever you can. Postings with a visible pay range consistently attract more qualified applicants, and many regions now require it by law."},
    {"q":"Can I use the output on LinkedIn, Indeed or my careers page?","a":"Yes. The output is clean markdown with standard sections, so it pastes cleanly into any job board, ATS or careers page."},
    {"q":"Does it work for any role?","a":"It works for engineering, sales, marketing, operations, support and executive roles. The more specific your responsibilities input, the sharper the draft."}
  ]$faq$::jsonb,
  'How to write a job description that actually gets qualified applicants',
  $article$Most job descriptions fail before anyone reads the second paragraph. They open with "We are seeking a highly motivated self-starter", list fourteen responsibilities that could belong to four different jobs, and end with a wall of requirements nobody on the current team would pass. The result is predictable: a small pile of applications from people who apply to everything, and silence from the candidates you actually wanted.

A job description is not an internal document. It is a marketing page with one conversion goal, and the people reading it are usually employed, mildly curious, and skimming on a phone between meetings. That framing changes everything about how you should write it.

## Start with why the role exists

The strongest opening is context, not adjectives. Explain what the company does in one sentence, then explain what changed to create this opening: the team doubled, a product line launched, a founder is handing off work they no longer have time for. Candidates read that and immediately picture the job. "Highly motivated individual" gives them nothing to picture.

## Describe outcomes, not duties

Compare two lines for the same job. "Responsible for managing the support queue" versus "Own our support queue and cut first-response time from six hours to under two." The second tells a candidate what success looks like, what they will be measured on, and that the team has thought about the problem. Aim for five to seven bullets in this section, each starting with a verb and each pointing at a result. If a bullet could appear in any job posting in your industry, delete it.

## Cut the requirements list in half

Requirements inflation is the single biggest source of weak applicant pools. Research on hiring behaviour has repeatedly found that many candidates — women and career-changers disproportionately — will not apply unless they meet nearly every listed criterion, while others apply at fifty percent. So every unnecessary line silently filters out people who could do the job well.

Practical test: for each requirement, ask whether you would reject an otherwise excellent candidate for missing it. If the answer is no, move it to "nice to have" or drop it. Degree requirements deserve special scrutiny; unless the role is regulated, they mostly proxy for something you could assess directly.

## Publish the salary range

Pay transparency is now legally required in a growing list of jurisdictions, and it is good practice everywhere else. A visible range does two things: it stops you from spending three interview rounds on someone whose expectations are double your budget, and it signals that you are not planning to negotiate opportunistically. If you genuinely cannot publish a number, say what you can — equity, band, review cadence.

## Watch the language

Certain words measurably shrink your applicant pool. "Rockstar", "ninja" and "hustle" skew who self-selects in. "Young and dynamic" is an age signal and, in many places, a legal risk. Gendered pronouns and heavily masculine-coded verbs ("dominate", "aggressive") do the same quietly. Write in second person — "you'll own", "you'll work with" — and the tone fixes itself.

## Keep it short enough to finish

The sweet spot is roughly 400 to 600 words. Anything longer and the skim wins. Use headings, keep paragraphs to two or three lines, and put the most compelling detail — the mission, the range, the autonomy — above the point where a phone screen cuts off.

## Where the generator fits

Drafting all of that from a blank page takes forty minutes and usually ends in copy-paste from an old posting. The generator on this page takes your role title, a short company description, and a rough dump of responsibilities, then returns a structured draft with the right sections, inclusive language, and outcome-shaped bullets already in place. Treat it as a strong first draft: add the specifics only you know — the team's real challenges, the interview process, the honest tradeoffs — and post it. That editing pass takes five minutes, and it is the part that makes the posting sound like your company instead of every other company.$article$,
  'AI Job Description Generator — Free & Inclusive | ZenWrit',
  'Free AI job description generator for recruiters and hiring managers. Create clear, inclusive, ready-to-post job descriptions in seconds — no signup needed.',
  true,
  5
);