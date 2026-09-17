import { useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
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
  onUploadImage,
}: {
  id: string;
  value: string;
  onChange: (next: string) => void;
  rows?: number;
  label?: string;
  onUploadImage?: (file: File) => Promise<string>;
}) {
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const insertImage = async (file: File) => {
    if (!onUploadImage) return;
    setUploading(true);
    try {
      const url = await onUploadImage(file);
      const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim() || "Article image";
      const snippet = `\n\n![${alt}](${url})\n\n*Optional caption — replace this text or remove this line.*\n\n`;
      const textarea = textareaRef.current;
      const start = textarea?.selectionStart ?? value.length;
      const end = textarea?.selectionEnd ?? start;
      const next = `${value.slice(0, start)}${snippet}${value.slice(end)}`;
      onChange(next);
      toast.success("Image added to article");
      requestAnimationFrame(() => {
        textarea?.focus();
        textarea?.setSelectionRange(start + snippet.length, start + snippet.length);
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Image upload failed");
    } finally {
      setUploading(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id}>{label}</Label>
        <div className="flex items-center gap-1">
          {onUploadImage && !preview ? (
            <>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void insertImage(file);
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={uploading}
                onClick={() => imageInputRef.current?.click()}
              >
                {uploading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <ImagePlus className="size-4" aria-hidden="true" />}
                {uploading ? "Uploading…" : "Add image"}
              </Button>
            </>
          ) : null}
          <Button type="button" variant="ghost" size="sm" onClick={() => setPreview((p) => !p)}>
            {preview ? "Edit" : "Preview"}
          </Button>
        </div>
      </div>
      {preview ? (
        <div
          className="prose-article mt-2 max-h-[32rem] overflow-auto rounded-md border border-border p-4"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
        />
      ) : (
        <Textarea
          ref={textareaRef}
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
