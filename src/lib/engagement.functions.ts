import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const EmailSchema = z.object({
  email: z.string().trim().email().max(255),
  source: z.enum(["blog_post", "blog_listing"]).default("blog_post"),
});

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => EmailSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const email = data.email.toLowerCase();

    const { data: existing } = await supabaseAdmin
      .from("newsletter_subscribers")
      .select("id")
      .eq("email", email)
      .maybeSingle();
    if (existing) return { status: "duplicate" as const };

    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .insert({ email, source: data.source });
    if (error) {
      if (error.code === "23505") return { status: "duplicate" as const };
      return { status: "error" as const };
    }
    return { status: "ok" as const };
  });

const SlugSchema = z.object({ slug: z.string().min(1).max(160) });

async function summarize(slug: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("article_ratings")
    .select("rating")
    .eq("post_slug", slug);
  const rows = (data ?? []) as { rating: number }[];
  if (rows.length === 0) return { average: 0, count: 0 };
  const total = rows.reduce((sum, row) => sum + row.rating, 0);
  return { average: Math.round((total / rows.length) * 10) / 10, count: rows.length };
}

export const getArticleRating = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => SlugSchema.parse(input))
  .handler(async ({ data }) => summarize(data.slug));

export const rateArticle = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    SlugSchema.extend({ rating: z.number().int().min(1).max(5) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { getRequest } = await import("@tanstack/react-start/server");
    const headers = getRequest().headers;
    const forwarded = headers.get("x-forwarded-for") ?? "";
    const ip =
      forwarded.split(",")[0]?.trim() ||
      headers.get("cf-connecting-ip") ||
      headers.get("x-real-ip") ||
      "unknown";

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("article_ratings")
      .upsert(
        { post_slug: data.slug, rating: data.rating, user_ip: ip },
        { onConflict: "post_slug,user_ip" },
      );
    const summary = await summarize(data.slug);
    return { ok: !error, ...summary };
  });
