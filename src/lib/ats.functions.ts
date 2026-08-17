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
import type { AtsReport } from "./ats.server";

export type { AtsReport, AtsCategory, AtsCheck } from "./ats.server";

const AtsInput = z.object({
  visitorKey: z.string().min(6).max(64),
  resumeText: z.string().min(100).max(30000),
  jobDescription: z.string().max(12000).optional(),
});

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

export const getSharedAtsReport = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ shareId: z.string().min(4).max(64) }).parse(input))
  .handler(async ({ data }) => {
    const { loadSharedReport } = await import("./ats.server");
    return { report: await loadSharedReport(data.shareId) };
  });

export const emailAtsReport = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        email: z.string().email().max(200),
        shareId: z.string().min(4).max(64).nullable().optional(),
        marketingConsent: z.boolean().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { loadSharedReport, storeReportEmail } = await import("./ats.server");
    const report = data.shareId ? await loadSharedReport(data.shareId) : null;
    if (!report) return { ok: false as const, message: "Report expired — run the check again." };
    await storeReportEmail({
      email: data.email,
      shareId: data.shareId ?? null,
      marketingConsent: Boolean(data.marketingConsent),
      report,
    });
    return { ok: true as const, message: "Report sent — check your inbox." };
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
        shareId: null,
        used: quota.used,
        limit: quota.limit,
        remaining: 0,
        isPro: false,
      };
    }

    const { ATS_SYSTEM_PROMPT, normalizeReport, parseReportJson, saveSharedReport } = await import("./ats.server");
    const jobDescription = data.jobDescription?.trim() ?? "";
    const openai = createAiProvider(apiKey);
    let raw: string;
    try {
      const result = await generateText({
        model: openai(quota.isPro ? PRO_MODEL : FREE_MODEL),
        system: ATS_SYSTEM_PROMPT,
        prompt: jobDescription
          ? `Resume text:\n\n${data.resumeText}\n\nJob description:\n\n${jobDescription.slice(0, 12000)}\n\nReturn the JSON report now.`
          : `Resume text:\n\n${data.resumeText}\n\nNo job description was provided.\n\nReturn the JSON report now.`,
        maxOutputTokens: 5000,
      });
      raw = result.text.trim();
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (message.includes("429")) throw new Error("Too many requests right now — please retry in a moment.");
      throw new Error("Analysis failed. Please try again.");
    }

    const report: AtsReport = normalizeReport(parseReportJson(raw));
    if (!jobDescription) report.job_match_percent = null;

    const shareId = await saveSharedReport(report, Boolean(jobDescription));

    await recordGeneration({
      userId,
      visitorKey: data.visitorKey,
      ipHash,
      toolSlug: "ats-resume-checker",
      input: { resume: `${data.resumeText.slice(0, 500)}…`, job: jobDescription.slice(0, 300) },
      output: JSON.stringify(report),
    });

    const used = quota.used + 1;
    return {
      ok: true as const,
      report,
      shareId,
      used,
      limit: quota.isPro ? Number.POSITIVE_INFINITY : quota.limit,
      remaining: quota.isPro ? Number.POSITIVE_INFINITY : Math.max(0, quota.limit - used),
      isPro: quota.isPro,
    };
  });
