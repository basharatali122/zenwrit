import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { BlogPostRecord, ToolRecord } from "./content";

const TOOL_COLUMNS =
  "id, slug, name, short_description, icon, category, form_fields, system_prompt, output_label, faqs, article_title, article_content, meta_title, meta_description, is_published, sort_order, created_at";
const POST_COLUMNS =
  "id, slug, title, category, excerpt, content, cover_image_url, reading_time, meta_title, meta_description, is_published, published_at, created_at";

/* ------------------------------- public reads ------------------------------ */

export const listPublishedTools = createServerFn({ method: "GET" }).handler(async () => {
  const { getPublicSupabase } = await import("./content.server");
  const { data } = await getPublicSupabase()
    .from("tools")
    .select(TOOL_COLUMNS)
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return (data ?? []) as unknown as ToolRecord[];
});

export const getPublishedTool = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().min(1).max(120) }).parse(input))
  .handler(async ({ data }) => {
    const { getPublicSupabase } = await import("./content.server");
    const client = getPublicSupabase();
    const { data: tool } = await client
      .from("tools")
      .select(TOOL_COLUMNS)
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (!tool) return null;
    const { data: others } = await client
      .from("tools")
      .select("slug, name")
      .eq("is_published", true)
      .neq("slug", data.slug)
      .order("sort_order", { ascending: true })
      .limit(4);
    return { tool: tool as unknown as ToolRecord, others: (others ?? []) as { slug: string; name: string }[] };
  });

export const listPublishedPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { getPublicSupabase } = await import("./content.server");
  const { data } = await getPublicSupabase()
    .from("blog_posts")
    .select(POST_COLUMNS)
    .eq("is_published", true)
    .order("published_at", { ascending: false, nullsFirst: false });
  return (data ?? []) as unknown as BlogPostRecord[];
});

export const getPublishedPost = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().min(1).max(120) }).parse(input))
  .handler(async ({ data }) => {
    const { getPublicSupabase } = await import("./content.server");
    const { data: post } = await getPublicSupabase()
      .from("blog_posts")
      .select(POST_COLUMNS)
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    return (post as unknown as BlogPostRecord) ?? null;
  });

/* -------------------------------- admin area ------------------------------- */

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { isAdmin: data === true };
  });

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (data !== true) throw new Error("Forbidden");
}

export const adminListContent = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const [tools, posts] = await Promise.all([
      context.supabase.from("tools").select(TOOL_COLUMNS).order("sort_order", { ascending: true }),
      context.supabase.from("blog_posts").select(POST_COLUMNS).order("created_at", { ascending: false }),
    ]);
    return {
      tools: (tools.data ?? []) as unknown as ToolRecord[],
      posts: (posts.data ?? []) as unknown as BlogPostRecord[],
    };
  });

export const adminGetTool = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { data: tool } = await context.supabase
      .from("tools")
      .select(TOOL_COLUMNS)
      .eq("id", data.id)
      .maybeSingle();
    return (tool as unknown as ToolRecord) ?? null;
  });

export const adminGetPost = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { data: post } = await context.supabase
      .from("blog_posts")
      .select(POST_COLUMNS)
      .eq("id", data.id)
      .maybeSingle();
    return (post as unknown as BlogPostRecord) ?? null;
  });

const FieldSchema = z.object({
  name: z.string().min(1).max(60),
  label: z.string().min(1).max(120),
  type: z.enum(["text", "textarea", "select"]),
  placeholder: z.string().max(200).optional(),
  options: z.array(z.string().max(120)).optional(),
  required: z.boolean().optional(),
  rows: z.number().int().min(2).max(12).optional(),
});

const ToolSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  slug: z.string().min(1).max(120),
  name: z.string().min(1).max(160),
  short_description: z.string().max(400).default(""),
  icon: z.string().max(40).default("resume"),
  category: z.string().max(60).default("Job seekers"),
  form_fields: z.array(FieldSchema).default([]),
  system_prompt: z.string().max(8000).default(""),
  output_label: z.string().max(120).default("Your result"),
  faqs: z.array(z.object({ q: z.string().max(300), a: z.string().max(2000) })).default([]),
  article_title: z.string().max(300).default(""),
  article_content: z.string().max(80000).default(""),
  meta_title: z.string().max(200).default(""),
  meta_description: z.string().max(400).default(""),
  is_published: z.boolean().default(false),
  sort_order: z.number().int().min(0).max(999).default(0),
});

export const adminSaveTool = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => ToolSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { id, ...payload } = data;
    if (id) {
      const { error } = await context.supabase.from("tools").update(payload).eq("id", id);
      if (error) throw new Error(error.message);
      return { id };
    }
    const { data: row, error } = await context.supabase
      .from("tools")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: (row as { id: string }).id };
  });

const PostSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  slug: z.string().min(1).max(120),
  title: z.string().min(1).max(200),
  category: z.string().max(60).default("General"),
  excerpt: z.string().max(600).default(""),
  content: z.string().max(80000).default(""),
  cover_image_url: z.string().max(500).nullable().default(null),
  reading_time: z.string().max(40).default("5 min read"),
  meta_title: z.string().max(200).default(""),
  meta_description: z.string().max(400).default(""),
  is_published: z.boolean().default(false),
  published_at: z.string().nullable().default(null),
});

export const adminSavePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => PostSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { id, ...rest } = data;
    const payload = {
      ...rest,
      published_at: rest.is_published ? (rest.published_at ?? new Date().toISOString()) : rest.published_at,
    };
    if (id) {
      const { error } = await context.supabase.from("blog_posts").update(payload).eq("id", id);
      if (error) throw new Error(error.message);
      return { id };
    }
    const { data: row, error } = await context.supabase
      .from("blog_posts")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: (row as { id: string }).id };
  });

export const adminDeleteContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ kind: z.enum(["tool", "post"]), id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const table = data.kind === "tool" ? "tools" : "blog_posts";
    const { error } = await context.supabase.from(table).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminUploadCover = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        fileName: z.string().min(1).max(200),
        contentType: z.string().min(3).max(100),
        dataBase64: z.string().min(10).max(8_000_000),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    if (!/^image\/(png|jpeg|jpg|webp|gif|avif)$/.test(data.contentType)) {
      throw new Error("Only image files are allowed");
    }
    const bytes = Buffer.from(data.dataBase64, "base64");
    if (bytes.byteLength > 5_000_000) throw new Error("Image must be under 5 MB");

    const ext = (data.fileName.split(".").pop() ?? "png").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `covers/${crypto.randomUUID()}.${ext || "png"}`;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.storage
      .from("content-images")
      .upload(path, bytes, { contentType: data.contentType, upsert: false });
    if (error) throw new Error(error.message);

    return { url: `/api/public/image/${path}` };
  });
