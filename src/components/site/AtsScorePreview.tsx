import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, FileText, TriangleAlert, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { label: "ATS parsing", value: 92 },
  { label: "Keyword match", value: 78 },
  { label: "Impact & metrics", value: 71 },
  { label: "Structure", value: 88 },
];

const SIGNALS = [
  { ok: true, text: "Contact block parsed cleanly" },
  { ok: true, text: "Standard section headings detected" },
  { ok: false, text: "6 job-description keywords missing" },
];

const TARGET = 82;
const R = 52;
const C = 2 * Math.PI * R;

/**
 * Marketing preview of the ATS report: animates on mount so the homepage
 * shows the product's payoff before the visitor uploads anything.
 */
export function AtsScorePreview() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const score = Math.round(TARGET * progress);

  return (
    <div className="relative w-full min-w-0">
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-primary/10 blur-3xl" aria-hidden="true" />
      <div className="surface-panel overflow-hidden shadow-xl shadow-primary/5">
        <div className="flex items-center justify-between gap-3 border-b border-border bg-surface px-5 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <FileText className="size-4 text-primary" />
            ATS Resume Report
          </div>
          <span className="tag-pill">live sample</span>
        </div>

        <div className="grid gap-6 p-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:p-6">
          <div className="flex items-center justify-center">
            <div className="relative size-32">
              <svg viewBox="0 0 120 120" className="size-32 -rotate-90">
                <circle cx="60" cy="60" r={R} fill="none" strokeWidth="10" className="stroke-border" />
                <circle
                  cx="60"
                  cy="60"
                  r={R}
                  fill="none"
                  strokeWidth="10"
                  strokeLinecap="round"
                  className="stroke-primary"
                  strokeDasharray={C}
                  strokeDashoffset={C - (C * TARGET * progress) / 100}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-3xl font-bold tabular-nums">{score}</span>
                <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                  of 100
                </span>
              </div>
            </div>
          </div>

          <div className="min-w-0 space-y-3">
            {CATEGORIES.map((cat, i) => (
              <div key={cat.label}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{cat.label}</span>
                  <span className="tabular-nums text-muted-foreground">
                    {Math.round(cat.value * progress)}%
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary/80"
                    style={{
                      width: `${cat.value * progress}%`,
                      transitionDelay: `${i * 60}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <ul className="space-y-2 border-t border-border px-5 py-4 sm:px-6">
          {SIGNALS.map((signal) => (
            <li key={signal.text} className="flex items-start gap-2 text-sm text-muted-foreground">
              {signal.ok ? (
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
              ) : (
                <TriangleAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
              )}
              {signal.text}
            </li>
          ))}
        </ul>

        <div className="border-t border-border bg-surface px-5 py-4 sm:px-6">
          <Button asChild size="lg" className="w-full">
            <Link to="/tools/ats-resume-checker">
              <Upload /> Check my resume free <ArrowRight />
            </Link>
          </Button>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            PDF or DOCX · results in ~10 seconds · no signup
          </p>
        </div>
      </div>
    </div>
  );
}
