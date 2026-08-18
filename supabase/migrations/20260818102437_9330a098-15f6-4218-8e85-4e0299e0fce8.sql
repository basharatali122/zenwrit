UPDATE public.tools SET article_content = article_content || E'\n\nOnce your resume passes the checker, tighten the wording itself with the [resume bullet point generator](/tools/resume-bullet-point-generator), then pair the application with a tailored letter from the [AI cover letter generator](/tools/cover-letter-generator).'
WHERE slug = 'ats-resume-checker' AND article_content NOT LIKE '%/tools/resume-bullet-point-generator%';

UPDATE public.tools SET article_content = article_content || E'\n\nIf the letter points at achievements your resume states weakly, rewrite those lines first with the [resume bullet point generator](/tools/resume-bullet-point-generator) so both documents tell the same story.'
WHERE slug = 'cover-letter-generator' AND article_content NOT LIKE '%/tools/resume-bullet-point-generator%';

UPDATE public.tools SET article_content = article_content || E'\n\nRepurposing the same idea into video? Package it with the [YouTube title generator](/tools/youtube-title-generator) so the hook that worked on LinkedIn also earns the click on YouTube.'
WHERE slug = 'linkedin-post-generator' AND article_content NOT LIKE '%/tools/youtube-title-generator%';