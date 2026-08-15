# Content Creator Toolkit

Build a modern, fast, mobile-first SaaS website called SaaScript — 

a collection of free/premium AI-powered micro-tools for content creators 

and job seekers.

CORE CONCEPT:

Free users get limited daily generations (with ads shown). Paid users 

($5/month) get unlimited generations, no ads, and priority speed.

PAGES & STRUCTURE:

1. Homepage:

   - Hero: "Free AI Tools for Creators & Professionals" + subheading + 

     "Try free, no signup needed" CTA

   - Grid of tool cards (icon, name, 1-line description) — link to each tool

   - "Why go Pro" section comparing Free vs Pro tier

   - Simple pricing card: Free ($0 - 3 generations/day) vs Pro ($5/month - unlimited)

2. Individual tool pages (/tools/[tool-slug]) for these tools:

   - Resume Bullet Point Generator

   - Cover Letter Generator

   - LinkedIn Post Generator

   - YouTube Title Generator

   - Product Description Generator

   Each page has:

   - Input form (relevant fields/textarea)

   - "Generate" button

   - Output box with copy-to-clipboard

   - Usage counter for free users ("2/3 free generations left today")

   - Below the tool: 700-900 word SEO article about how to use this tool, 

     tips, examples

   - Ad placeholder divs: below hero, in-content (after 2nd paragraph), 

     sidebar (desktop only), footer — clearly marked <div id="ad-slot-x">, 

     no real ad code yet

3. Pricing page (/pricing):

   - Free vs Pro comparison table

   - Stripe checkout button for Pro plan ($5/month subscription)

4. Auth pages: Sign up / Log in (email + password, or Google OAuth)

5. Dashboard (/dashboard) for logged-in users:

   - Shows subscription status, generation history, account settings

6. Blog (/blog) — supporting SEO articles, separate from tool pages

7. Static pages: About, Contact, Privacy Policy, Terms of Service, 

   Refund Policy, Disclaimer

BACKEND REQUIREMENTS:

- Use Supabase for: user authentication, database (users, subscriptions, 

  usage_logs tables), and storing generation history

- Create a secure serverless/edge function to call the AI API — 

  never expose API key in frontend code

- Track daily free-tier usage per user (or per IP for non-logged-in users) 

  and enforce the 3/day limit

- Integrate Stripe for the $5/month subscription — checkout flow + webhook 

  to update user's "pro" status in database

DESIGN:

- Clean modern SaaS aesthetic (Notion/Linear style), light + dark mode

- Mobile-first, minimal load time, avoid unnecessary heavy JS

- Consistent branding: pick one accent color, clean typography

TECHNICAL / SEO:

- Unique meta title + description per tool page

- Semantic HTML, fast Core Web Vitals (optimize LCP/CLS)

- sitemap.xml, robots.txt

- FAQPage or SoftwareApplication schema markup on tool pages where relevant

Do not hardcode any API keys (AI provider or Stripe) in frontend code — 

use environment variables and Supabase edge functions for all secure calls.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://ai-scribe-studio-51.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d7539bb5-9336-4f15-aeb3-ed9b9f13dc67).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
