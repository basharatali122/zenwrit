import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";
import {
  createAiProvider,
  FREE_MODEL,
  getQuota,
  recordGeneration,
  resolveIpHash,
  resolveOptionalUserId,
} from "./ai.server";

const GenerateInput = z.object({
  slug: z.string().min(1),
  visitorKey: z.string().min(6).max(64),
  values: z.record(z.string().max(4000)),
});

const QuotaInput = z.object({ visitorKey: z.string().min(6).max(64) });

export const getUsageQuota = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => QuotaInput.parse(input))
  .handler(async ({ data }) => {
    const userId = await resolveOptionalUserId();
    const quota = await getQuota(userId, data.visitorKey, resolveIpHash());
    return {
      isPro: quota.isPro,
      used: quota.used,
      limit: quota.isPro ? null : quota.limit,
      remaining: quota.isPro ? null : quota.remaining,
      signedIn: Boolean(userId),
    };
  });

export const generateContent = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => GenerateInput.parse(input))
  .handler(async ({ data }) => {
    const { getPublicSupabase } = await import("./content.server");
    const { data: toolRow } = await getPublicSupabase()
      .from("tools")
      .select("slug, form_fields, system_prompt")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (!toolRow) throw new Error("Unknown tool");
    const tool = toolRow as unknown as {
      form_fields: { name: string; label: string }[];
      system_prompt: string;
    };

    const apiKey = process.env["OPENAI_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured yet. Please try again later.");

    const userId = await resolveOptionalUserId();
    const ipHash = resolveIpHash();
    const quota = await getQuota(userId, data.visitorKey, ipHash);

    if (!quota.isPro && quota.remaining <= 0) {
      return {
        ok: false as const,
        reason: "limit" as const,
        output: "",
        used: quota.used,
        limit: quota.limit,
        remaining: 0,
        isPro: false,
      };
    }

    const details = tool.form_fields
      .map((field) => {
        const value = (data.values[field.name] ?? "").trim();
        return value ? `${field.label}: ${value}` : null;
      })
      .filter(Boolean)
      .join("\n");

    const openai = createAiProvider(apiKey);

    let text: string;
    try {
      const result = streamText({
        model: openai(FREE_MODEL),
        system: tool.system_prompt,
        prompt: `${details}\n\nProduce the output now.`,
        maxOutputTokens: 1800,
      });
      text = (await result.text).trim();
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (message.includes("429")) throw new Error("Too many requests right now — please retry in a moment.");
      if (message.includes("402")) throw new Error("AI credits are exhausted. Please try again later.");
      throw new Error("Generation failed. Please try again.");
    }

    await recordGeneration({
      userId,
      visitorKey: data.visitorKey,
      ipHash,
      toolSlug: data.slug,
      input: data.values,
      output: text,
    });

    const used = quota.used + 1;
    return {
      ok: true as const,
      reason: null,
      output: text,
      used,
      limit: quota.isPro ? Number.POSITIVE_INFINITY : quota.limit,
      remaining: quota.isPro ? Number.POSITIVE_INFINITY : Math.max(0, quota.limit - used),
      isPro: quota.isPro,
    };
  });
