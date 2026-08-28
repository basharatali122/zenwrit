import avatarAsset from "@/assets/basharat-ali.jpg.asset.json";

export const SITE_AUTHOR = {
  name: "Basharat Ali",
  slug: "basharat-ali",
  role: "Software Engineer & Founder of ZenWrit",
  avatar: avatarAsset.url,
  bio: "Basharat Ali is a software engineer and the builder behind ZenWrit. He started this project after noticing how many good resumes get rejected by hiring software for reasons no one explains clearly. ZenWrit is his attempt to fix that — a free ATS resume checker and a set of honest, no-fluff guides that show exactly what applicant tracking systems look for and how to fix what is holding your resume back. Every guide on ZenWrit is tested against real ATS behavior before it is published, and no advice here is influenced by advertisers or affiliates.",
  profileUrl: "/author/basharat-ali",
  profileUrlAbsolute: "https://zenwrit.com/author/basharat-ali",
} as const;

/** First two sentences of the bio, for compact author boxes on posts. */
export const SITE_AUTHOR_SHORT_BIO = SITE_AUTHOR.bio
  .split(/(?<=\.)\s+/)
  .slice(0, 2)
  .join(" ");
