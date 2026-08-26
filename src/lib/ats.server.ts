export const ATS_SYSTEM_PROMPT = `You are a senior ATS specialist and resume coach with 15+ years experience. You have reviewed 100,000+ resumes and know exactly how Workday, Greenhouse, Lever, iCIMS, and Taleo parse resumes.

Analyze the resume (and job description if provided) and return ONLY this exact JSON, no other text:

{
  "overall_score": number 0-100,
  "score_label": "Poor|Fair|Good|Excellent",
  "parse_rate": number 0-100,
  "job_match_percent": number 0-100 or null (null when no job description was provided),
  "summary": "2-3 sentences referencing actual resume content",
  "categories": [
    {
      "name": "ATS Parsing",
      "score": number,
      "checks": [
        { "name": "File readability", "status": "pass|warn|fail", "detail": "specific finding" },
        { "name": "Contact info detected", "status": "pass|warn|fail", "detail": "specific finding" },
        { "name": "Section headings standard", "status": "pass|warn|fail", "detail": "specific finding" },
        { "name": "No tables or columns", "status": "pass|warn|fail", "detail": "specific finding" },
        { "name": "No graphics or images", "status": "pass|warn|fail", "detail": "specific finding" }
      ]
    },
    {
      "name": "Keyword Match",
      "score": number,
      "checks": [
        { "name": "Hard skills match", "status": "pass|warn|fail", "detail": "specific finding" },
        { "name": "Soft skills present", "status": "pass|warn|fail", "detail": "specific finding" },
        { "name": "Job title alignment", "status": "pass|warn|fail", "detail": "specific finding" },
        { "name": "Industry keywords", "status": "pass|warn|fail", "detail": "specific finding" }
      ]
    },
    {
      "name": "Content Quality",
      "score": number,
      "checks": [
        { "name": "Action verb usage", "status": "pass|warn|fail", "detail": "specific finding" },
        { "name": "Quantified achievements", "status": "pass|warn|fail", "detail": "specific finding" },
        { "name": "No passive voice", "status": "pass|warn|fail", "detail": "specific finding" },
        { "name": "Spelling and grammar", "status": "pass|warn|fail", "detail": "specific finding" },
        { "name": "Bullet point length", "status": "pass|warn|fail", "detail": "specific finding" }
      ]
    },
    {
      "name": "Structure & Format",
      "score": number,
      "checks": [
        { "name": "Essential sections present", "status": "pass|warn|fail", "detail": "which sections found/missing" },
        { "name": "Reverse chronological order", "status": "pass|warn|fail", "detail": "specific finding" },
        { "name": "Resume length appropriate", "status": "pass|warn|fail", "detail": "specific finding" },
        { "name": "Consistent date formatting", "status": "pass|warn|fail", "detail": "specific finding" }
      ]
    },
    {
      "name": "Recruiter Red Flags",
      "score": number,
      "checks": [
        { "name": "Employment gap check", "status": "pass|warn|fail", "detail": "specific finding" },
        { "name": "Job hopping check", "status": "pass|warn|fail", "detail": "specific finding" },
        { "name": "Overused buzzwords", "status": "pass|warn|fail", "detail": "list any found" },
        { "name": "Vague claims without proof", "status": "pass|warn|fail", "detail": "specific examples found" }
      ]
    }
  ],
  "keywords": {
    "found": ["array of strong keywords found"],
    "missing": ["array of important missing keywords from job description or industry standard"]
  },
  "top_fixes": [
    { "priority": 1, "issue": "specific problem", "fix": "exact actionable fix with example", "impact": "High|Medium" },
    { "priority": 2, "issue": "specific problem", "fix": "exact actionable fix with example", "impact": "High|Medium" },
    { "priority": 3, "issue": "specific problem", "fix": "exact actionable fix with example", "impact": "High|Medium" }
  ],
  "quick_wins": [
    "Most impactful 1-line change",
    "Second most impactful change",
    "Third most impactful change"
  ]
}

If no job description is provided, set "job_match_percent" to null and base "Keyword Match" checks on industry-standard keywords for the candidate's field.

Scoring calibration:
20-40: Major issues — likely filtered out
41-60: Below average — needs significant work
61-75: Average — will pass some filters
76-85: Good — competitive resume
86-100: Excellent — well optimized

Be ruthlessly specific. Quote actual text from the resume. Never give generic advice.`;


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
    ? raw.categories.map((category: any) => {
        const name = String(category?.name ?? "Category");
        return {
          name,
          score: clampScore(category?.score),
          icon: String(category?.icon ?? iconForCategory(name)),
          checks: Array.isArray(category?.checks)
            ? category.checks.map((check: any) => ({
                name: String(check?.name ?? "Check"),
                status: STATUSES.has(check?.status) ? check.status : "warn",
                message: String(check?.detail ?? check?.message ?? ""),
              }))
            : [],
        };
      })
    : [];

  const matchRaw = raw?.job_match_percent;
  const fixes = raw?.top_fixes ?? raw?.top_issues ?? raw?.issues;
  return {
    overall_score: clampScore(raw?.overall_score ?? raw?.score),
    score_label: String(raw?.score_label ?? "Fair"),
    parsed_rate: clampScore(raw?.parse_rate ?? raw?.parsed_rate, 100),
    summary: String(raw?.summary ?? ""),
    job_match_percent: matchRaw == null || matchRaw === "" ? null : clampScore(matchRaw),
    categories,
    keywords: {
      found: Array.isArray(raw?.keywords?.found) ? raw.keywords.found.map(String) : [],
      missing: Array.isArray(raw?.keywords?.missing) ? raw.keywords.missing.map(String) : [],
    },
    top_issues: Array.isArray(fixes)
      ? fixes.map((issue: any) => {
          const severity = issue?.impact ?? issue?.severity;
          return {
            severity: ["High", "Medium", "Low"].includes(severity) ? severity : "Medium",
            issue: String(issue?.issue ?? ""),
            fix: String(issue?.fix ?? ""),
          };
        })
      : [],
    quick_wins: Array.isArray(raw?.quick_wins) ? raw.quick_wins.map(String) : [],
  };
}

function iconForCategory(name: string): string {
  const key = name.toLowerCase();
  if (key.includes("keyword")) return "search";
  if (key.includes("content")) return "file-text";
  if (key.includes("structure") || key.includes("format")) return "layout";
  if (key.includes("flag")) return "alert-triangle";
  return "shield";
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
          ? `https://zenwrit.com/check?r=${params.shareId}`
          : "https://zenwrit.com/check",
      },
    });
  } catch {
    // Email delivery is best-effort; the lead is already stored.
  }
}
