import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { renderMarkdown } from "@/lib/content";

export function MarkdownEditor({
  id,
  value,
  onChange,
  rows = 18,
  label = "Content (markdown)",
}: {
  id: string;
  value: string;
  onChange: (next: string) => void;
  rows?: number;
  label?: string;
}) {
  const [preview, setPreview] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id}>{label}</Label>
        <Button type="button" variant="ghost" size="sm" onClick={() => setPreview((p) => !p)}>
          {preview ? "Edit" : "Preview"}
        </Button>
      </div>
      {preview ? (
        <div
          className="prose-article mt-2 max-h-[32rem] overflow-auto rounded-md border border-border p-4"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
        />
      ) : (
        <Textarea
          id={id}
          rows={rows}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-2 font-mono text-xs"
          placeholder="## Heading&#10;&#10;Write your article in markdown…"
        />
      )}
    </div>
  );
}
