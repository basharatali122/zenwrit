import logo from "@/assets/zenwrit-logo.png";

export const SITE_AUTHOR = {
  name: "ZenWrit Editorial Team",
  slug: "editorial-team",
  role: "Resume & Career Content Specialists",
  avatar: logo,
  bio: "The ZenWrit team has reviewed thousands of resumes and job postings. Our guides are written by practitioners who work with ATS data directly — not journalists summarizing other articles. Every piece we publish is tested against real resumes before it goes live. ZenWrit was built because too many strong candidates get filtered out by systems they do not understand.",
  profileUrl: "/author/editorial-team",
  profileUrlAbsolute: "https://zenwrit.com/author/editorial-team",
} as const;

/** First two sentences of the bio, for compact author boxes on posts. */
export const SITE_AUTHOR_SHORT_BIO = SITE_AUTHOR.bio
  .split(/(?<=\.)\s+/)
  .slice(0, 2)
  .join(" ");
