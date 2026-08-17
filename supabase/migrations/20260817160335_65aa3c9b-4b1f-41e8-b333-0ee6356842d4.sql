-- Rebrand metadata to ZenWrit + keyword-targeted titles/descriptions/H1s
update public.tools set
  meta_title = 'Resume Bullet Point Generator — Free AI Tool | ZenWrit',
  meta_description = 'Use our free resume bullet point generator to turn plain job duties into measurable, recruiter-ready achievements in seconds. No signup needed.',
  short_description = 'A free resume bullet point generator that turns plain job duties into measurable, recruiter-ready achievements.'
where slug = 'resume-bullet-point-generator';

update public.tools set
  name = 'AI Cover Letter Generator',
  meta_title = 'AI Cover Letter Generator Free — Tailored in Seconds | ZenWrit',
  meta_description = 'A free AI cover letter generator that writes a personalised, non-generic letter from your background and the job description. No signup required.',
  short_description = 'A free AI cover letter generator that writes a tailored, human-sounding letter in under a minute.'
where slug = 'cover-letter-generator';

update public.tools set
  meta_title = 'LinkedIn Post Generator — Free AI Hooks That Convert | ZenWrit',
  meta_description = 'Our free LinkedIn post generator turns an idea, lesson or update into a scroll-stopping post with a strong hook and a real call to action.',
  short_description = 'A free LinkedIn post generator for hook-first posts that stop the scroll and start conversations.'
where slug = 'linkedin-post-generator';

update public.tools set
  meta_title = 'Free ATS Resume Checker — Instant ATS Score | ZenWrit',
  meta_description = 'Use this free ATS resume checker to get your ATS compatibility score instantly, with missing keywords, format issues and exact fixes. No signup needed.',
  short_description = 'A free ATS resume checker that scores your resume and gives specific fixes in seconds.'
where slug = 'ats-resume-checker';

update public.tools set
  meta_title = 'YouTube Title Generator — 10 Free AI Title Ideas | ZenWrit',
  meta_description = 'A free YouTube title generator that creates ten high-CTR titles from your video topic, with search keywords built in. No signup needed.',
  short_description = 'A free YouTube title generator that gives ten click-worthy titles which stay honest to your video.'
where slug = 'youtube-title-generator';

update public.tools set
  name = 'AI Product Description Generator',
  meta_title = 'Product Description Generator AI — Free Ecommerce Copy | ZenWrit',
  meta_description = 'This product description generator AI writes persuasive, SEO-friendly ecommerce copy with benefits, specs and a call to action. Free, no signup.',
  short_description = 'A product description generator AI that writes benefit-led store copy which converts browsers into buyers.'
where slug = 'product-description-generator';

update public.blog_posts set meta_title = replace(meta_title, 'SaaScript', 'ZenWrit'),
  meta_description = replace(meta_description, 'SaaScript', 'ZenWrit'),
  content = replace(content, 'SaaScript', 'ZenWrit'),
  excerpt = replace(excerpt, 'SaaScript', 'ZenWrit');

update public.tools set article_content = replace(article_content, 'SaaScript', 'ZenWrit'),
  article_title = replace(article_title, 'SaaScript', 'ZenWrit');

update public.blog_posts set reading_time = '2 min read' where slug = 'seo-for-product-pages';