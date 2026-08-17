import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import {
  createAiProvider,
  FREE_MODEL,
  getQuota,
  PRO_MODEL,
  recordGeneration,
  resolveIpHash,
  resolveOptionalUserId,
} from "./ai.server";

const AtsInput = z.object({
  visitorKey: z.string().min(6).max(64),
  resumeText: z.string().min(100).max(30000),
});

export type AtsReport = {
  score: number;
  score_label: string;
  summary: string;
  keywords: { found: string[]; missing: string[] };
  issues: { category: string; severity: string; issue: string; fix: string }[];
  quick_wins: string[];
};

export const getAtsQuota = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ visitorKey: z.string().min(6).max(64) }).parse(input))
  .handler(async ({ data }) => {
    const userId = await resolveOptionalUserId();
    const quota = await getQuota(userId, data.visitorKey, resolveIpHash());
    return {
      isPro: quota.isPro,
      used: quota.used,
      limit: quota.isPro ? null : quota.limit,
      remaining: quota.isPro ? null : quota.remaining,
    };
  });

export const analyzeResume = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AtsInput.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["OPENAI_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured yet. Please try again later.");

    const userId = await resolveOptionalUserId();
    const ipHash = resolveIpHash();
    const quota = await getQuota(userId, data.visitorKey, ipHash);

    if (!quota.isPro && quota.remaining <= 0) {
      return {
        ok: false as const,
        report: null,
        used: quota.used,
        limit: quota.limit,
        remaining: 0,
        isPro: false,
      };
    }

    const { ATS_SYSTEM_PROMPT } = await import("./ats.server");
    const openai = createAiProvider(apiKey);
    let raw: string;
    try {
      const result = await generateText({
        model: openai(quota.isPro ? PRO_MODEL : FREE_MODEL),
        system: ATS_SYSTEM_PROMPT,
        prompt: `Resume text:\n\n${data.resumeText}\n\nReturn the JSON report now.`,
        maxOutputTokens: 2200,
      });
      raw = result.text.trim();
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (message.includes("429")) throw new Error("Too many requests right now — please retry in a moment.");
      throw new Error("Analysis failed. Please try again.");
    }

    const jsonText = raw.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
    let report: AtsReport;
    try {
      report = JSON.parse(jsonText) as AtsReport;
    } catch {
      const start = jsonText.indexOf("{");
      const end = jsonText.lastIndexOf("}");
      if (start === -1 || end === -1) throw new Error("Analysis failed. Please try again.");
      report = JSON.parse(jsonText.slice(start, end + 1)) as AtsReport;
    }

    report.score = Math.max(0, Math.min(100, Number(report.score) || 0));
    report.keywords = {
      found: report.keywords?.found ?? [],
      missing: report.keywords?.missing ?? [],
    };
    report.issues = report.issues ?? [];
    report.quick_wins = report.quick_wins ?? [];

    await recordGeneration({
      userId,
      visitorKey: data.visitorKey,
      ipHash,
      toolSlug: "ats-resume-checker",
      input: { resume: `${data.resumeText.slice(0, 500)}…` },
      output: JSON.stringify(report),
    });

    const used = quota.used + 1;
    return {
      ok: true as const,
      report,
      used,
      limit: quota.isPro ? Number.POSITIVE_INFINITY : quota.limit,
      remaining: quota.isPro ? Number.POSITIVE_INFINITY : Math.max(0, quota.limit - used),
      isPro: quota.isPro,
    };
  });
