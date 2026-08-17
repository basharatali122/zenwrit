export const ATS_SYSTEM_PROMPT = `You are an expert ATS (Applicant Tracking System) specialist and resume coach with 15 years of experience helping candidates at Fortune 500 companies.

Analyze the resume provided and run 22 checks across 5 categories. If a job description is provided, use it for keyword matching and tailor every finding to that role. If it is not provided, analyze the resume standalone and set the "Job Description Match" check status to "na".

Your response must be valid JSON, with no text outside the JSON, in EXACTLY this shape:
{
  "overall_score": number 0-100,
  "score_label": "Poor" | "Fair" | "Good" | "Excellent",
  "parsed_rate": number 0-100,
  "summary": "2-3 sentence overall assessment referencing THIS resume",
  "job_match_percent": number 0-100 or null (null when no job description was provided),
  "categories": [
    {
      "name": "ATS Compatibility",
      "score": number,
      "icon": "shield",
      "checks": [
        { "name": "File Format", "status": "pass|warn|fail", "message": "specific finding" },
        { "name": "Contact Information", "status": "pass|warn|fail", "message": "specific finding" },
        { "name": "Section Headings", "status": "pass|warn|fail", "message": "specific finding" },
        { "name": "Date Format Consistency", "status": "pass|warn|fail", "message": "specific finding" },
        { "name": "Resume Length", "status": "pass|warn|fail", "message": "specific finding" }
      ]
    },
    {
      "name": "Content Quality",
      "score": number,
      "icon": "file-text",
      "checks": [
        { "name": "Quantifiable Achievements", "status": "pass|warn|fail", "message": "specific finding with example" },
        { "name": "Action Verbs", "status": "pass|warn|fail", "message": "specific finding" },
        { "name": "Spelling & Grammar", "status": "pass|warn|fail", "message": "specific finding" },
        { "name": "Bullet Point Length", "status": "pass|warn|fail", "message": "specific finding" },
        { "name": "Professional Summary", "status": "pass|warn|fail", "message": "specific finding" }
      ]
    },
    {
      "name": "Keywords & Skills",
      "score": number,
      "icon": "search",
      "checks": [
        { "name": "Hard Skills Present", "status": "pass|warn|fail", "message": "specific finding" },
        { "name": "Soft Skills Present", "status": "pass|warn|fail", "message": "specific finding" },
        { "name": "Industry Keywords", "status": "pass|warn|fail", "message": "specific finding" },
        { "name": "Job Description Match", "status": "pass|warn|fail|na", "message": "specific finding or 'Add job description for match analysis'" }
      ]
    },
    {
      "name": "Structure & Format",
      "score": number,
      "icon": "layout",
      "checks": [
        { "name": "Essential Sections", "status": "pass|warn|fail", "message": "which sections present/missing" },
        { "name": "Section Order", "status": "pass|warn|fail", "message": "specific finding" },
        { "name": "Work History Completeness", "status": "pass|warn|fail", "message": "specific finding" },
        { "name": "Education Section", "status": "pass|warn|fail", "message": "specific finding" }
      ]
    },
    {
      "name": "Recruiter Red Flags",
      "score": number,
      "icon": "alert-triangle",
      "checks": [
        { "name": "Employment Gaps", "status": "pass|warn|fail", "message": "specific finding" },
        { "name": "Job Hopping", "status": "pass|warn|fail", "message": "specific finding" },
        { "name": "Vague Claims", "status": "pass|warn|fail", "message": "specific finding" },
        { "name": "Overused Buzzwords", "status": "pass|warn|fail", "message": "specific words found" }
      ]
    }
  ],
  "keywords": { "found": ["..."], "missing": ["..."] },
  "top_issues": [ { "severity": "High" | "Medium" | "Low", "issue": "specific problem", "fix": "specific actionable fix with example" } ],
  "quick_wins": ["exactly 3 most impactful changes to make right now"]
}

Scoring guide for overall_score:
- 0-40: Poor — major format/keyword issues
- 41-65: Fair — some issues need fixing
- 66-80: Good — minor improvements needed
- 81-100: Excellent — well optimized

Be specific and honest. Reference actual content from the resume in every message. Never return placeholder text.`;

export type AtsCheck = { name: string; status: "pass" | "warn" | "fail" | "na"; message: string };
export type AtsCategory = { name: string; score: number; icon: string; checks: AtsCheck[] };
export type AtsReport = {
  overall_score: number;
  score_label: string;
  parsed_rate: number;
  summary: string;
  job_match_percent: number | null;
  categories: AtsCategory[];
  keywords: { found: string[]; missing: string[] };
  top_issues: { severity: string; issue: string; fix: string }[];
  quick_wins: string[];
};

const STATUSES = new Set(["pass", "warn", "fail", "na"]);

function clampScore(value: unknown, fallback = 0): number {
  const num = Number(value);
  if (!Number.isFinite(num)) return fallback;
  return Math.max(0, Math.min(100, Math.round(num)));
}

/** Coerces a raw model response into a safe, fully-populated report object. */
export function normalizeReport(raw: any): AtsReport {
  const categories: AtsCategory[] = Array.isArray(raw?.categories)
    ? raw.categories.map((category: any) => ({
        name: String(category?.name ?? "Category"),
        score: clampScore(category?.score),
        icon: String(category?.icon ?? "shield"),
        checks: Array.isArray(category?.checks)
          ? category.checks.map((check: any) => ({
              name: String(check?.name ?? "Check"),
              status: STATUSES.has(check?.status) ? check.status : "warn",
              message: String(check?.message ?? ""),
            }))
          : [],
      }))
    : [];

  const matchRaw = raw?.job_match_percent;
  return {
    overall_score: clampScore(raw?.overall_score ?? raw?.score),
    score_label: String(raw?.score_label ?? "Fair"),
    parsed_rate: clampScore(raw?.parsed_rate, 100),
    summary: String(raw?.summary ?? ""),
    job_match_percent: matchRaw == null || matchRaw === "" ? null : clampScore(matchRaw),
    categories,
    keywords: {
      found: Array.isArray(raw?.keywords?.found) ? raw.keywords.found.map(String) : [],
      missing: Array.isArray(raw?.keywords?.missing) ? raw.keywords.missing.map(String) : [],
    },
    top_issues: Array.isArray(raw?.top_issues ?? raw?.issues)
      ? (raw.top_issues ?? raw.issues).map((issue: any) => ({
          severity: ["High", "Medium", "Low"].includes(issue?.severity) ? issue.severity : "Medium",
          issue: String(issue?.issue ?? ""),
          fix: String(issue?.fix ?? ""),
        }))
      : [],
    quick_wins: Array.isArray(raw?.quick_wins) ? raw.quick_wins.map(String) : [],
  };
}

/** Extracts the first JSON object from a model response. */
export function parseReportJson(text: string): any {
  const cleaned = text.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start === -1 || end === -1) throw new Error("Analysis failed. Please try again.");
    return JSON.parse(cleaned.slice(start, end + 1));
  }
}

function randomShareId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(9));
  return Array.from(bytes, (b) => b.toString(36).padStart(2, "0")).join("").slice(0, 14);
}

/** Persists a report so it can be reopened via a share link. Never throws. */
export async function saveSharedReport(report: AtsReport, hasJobDescription: boolean): Promise<string | null> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const shareId = randomShareId();
    const { error } = await supabaseAdmin
      .from("ats_reports")
      .insert({ share_id: shareId, report: report as unknown as never, has_job_description: hasJobDescription });
    if (error) return null;
    return shareId;
  } catch {
    return null;
  }
}

export async function loadSharedReport(shareId: string): Promise<AtsReport | null> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("ats_reports")
      .select("report")
      .eq("share_id", shareId)
      .maybeSingle();
    return (data?.report as AtsReport | undefined) ?? null;
  } catch {
    return null;
  }
}

/** Stores a lead email and emails the report summary. */
export async function storeReportEmail(params: {
  email: string;
  shareId: string | null;
  marketingConsent: boolean;
  report: AtsReport;
}): Promise<void> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await supabaseAdmin.from("contact_emails").insert({
    email: params.email,
    source: "ats-resume-checker",
    report_share_id: params.shareId,
    marketing_consent: params.marketingConsent,
  });

  try {
    const { sendTemplateEmail } = await import("./email-templates/send-email");
    await sendTemplateEmail("ats-report", params.email, {
      templateData: {
        score: params.report.overall_score,
        scoreLabel: params.report.score_label,
        summary: params.report.summary,
        quickWins: params.report.quick_wins,
        reportUrl: params.shareId
          ? `https://zenwrit.com/tools/ats-resume-checker?r=${params.shareId}`
          : "https://zenwrit.com/tools/ats-resume-checker",
      },
    });
  } catch {
    // Email delivery is best-effort; the lead is already stored.
  }
}
