import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Check, Copy, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getVisitorKey } from "@/hooks/useAuth";
import { generateContent, getUsageQuota } from "@/lib/generate.functions";
import type { ToolRecord } from "@/lib/content";

type Quota = { isPro: boolean; used: number; limit: number | null; remaining: number | null };

export function ToolRunner({ tool }: { tool: ToolRecord }) {
  const generate = useServerFn(generateContent);
  const fetchQuota = useServerFn(getUsageQuota);

  const [values, setValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [quota, setQuota] = useState<Quota | null>(null);

  useEffect(() => {
    let active = true;
    fetchQuota({ data: { visitorKey: getVisitorKey() } })
      .then((result) => {
        if (active) setQuota(result);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [fetchQuota]);


  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const missing = tool.form_fields.find((f) => f.required && !(values[f.name] ?? "").trim());
    if (missing) {
      toast.error(`Please fill in "${missing.label}"`);
      return;
    }

    setBusy(true);
    setOutput("");
    try {
      const result = await generate({
        data: { slug: tool.slug, visitorKey: getVisitorKey(), values },
      });
      setQuota({
        isPro: result.isPro,
        used: result.used,
        limit: result.isPro ? null : result.limit,
        remaining: result.isPro ? null : result.remaining,
      });
      setOutput(result.output);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Couldn't copy — select the text and copy manually.");
    }
  }

  return (
    <div className="surface-panel p-5 sm:p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        {tool.form_fields.map((field) => (
          <div key={field.name} className="space-y-1.5">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required ? <span className="text-destructive"> *</span> : null}
            </Label>
            {field.type === "textarea" ? (
              <Textarea
                id={field.name}
                rows={field.rows ?? 4}
                placeholder={field.placeholder}
                value={values[field.name] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
              />
            ) : field.type === "select" ? (
              <select
                id={field.name}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={values[field.name] ?? field.options?.[0] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
              >
                {(field.options ?? []).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                id={field.name}
                placeholder={field.placeholder}
                value={values[field.name] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
              />
            )}
          </div>
        ))}

        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" disabled={busy} size="lg" className="sm:w-auto">
            {busy ? <Loader2 className="animate-spin" /> : <Sparkles />}
            {busy ? "Generating…" : "Generate"}
          </Button>
          <p className="text-xs text-muted-foreground" aria-live="polite">
            Unlimited free generations — no account needed.
          </p>
        </div>
      </form>


      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold">{tool.output_label}</h2>
          <Button variant="outline" size="sm" onClick={copy} disabled={!output}>
            {copied ? <Check /> : <Copy />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <div className="min-h-[180px] whitespace-pre-wrap rounded-lg border border-border bg-surface p-4 text-sm leading-relaxed">
          {output || (
            <span className="text-muted-foreground">
              Your generated result will appear here. Fill in the form and hit Generate.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
