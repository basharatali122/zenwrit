import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MarkdownEditor } from "@/components/admin/MarkdownEditor";
import { ToolIcon } from "@/components/site/ToolIcon";
import { adminGetTool, adminSaveTool } from "@/lib/content.functions";
import { TOOL_CATEGORIES, TOOL_ICONS, slugify, type Faq, type ToolField } from "@/lib/content";

export const Route = createFileRoute("/admin/tools/$id")({
  component: ToolEditor,
});

type Form = {
  slug: string;
  name: string;
  short_description: string;
  icon: string;
  category: string;
  form_fields: ToolField[];
  system_prompt: string;
  output_label: string;
  faqs: Faq[];
  article_title: string;
  article_content: string;
  meta_title: string;
  meta_description: string;
  is_published: boolean;
  sort_order: number;
};

const EMPTY: Form = {
  slug: "",
  name: "",
  short_description: "",
  icon: "resume",
  category: "Job seekers",
  form_fields: [],
  system_prompt: "",
  output_label: "Your result",
  faqs: [],
  article_title: "",
  article_content: "",
  meta_title: "",
  meta_description: "",
  is_published: false,
  sort_order: 0,
};

function ToolEditor() {
  const { id } = useParams({ from: "/admin/tools/$id" });
  const isNew = id === "new";
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState<Form>(EMPTY);
  const [slugTouched, setSlugTouched] = useState(!isNew);

  const { data: existing, isLoading } = useQuery({
    queryKey: ["admin-tool", id],
    queryFn: () => adminGetTool({ data: { id } }),
    enabled: !isNew,
  });

  useEffect(() => {
    if (existing) {
      setForm({
        slug: existing.slug,
        name: existing.name,
        short_description: existing.short_description,
        icon: existing.icon,
        category: existing.category,
        form_fields: existing.form_fields ?? [],
        system_prompt: existing.system_prompt,
        output_label: existing.output_label,
        faqs: existing.faqs ?? [],
        article_title: existing.article_title,
        article_content: existing.article_content,
        meta_title: existing.meta_title,
        meta_description: existing.meta_description,
        is_published: existing.is_published,
        sort_order: existing.sort_order ?? 0,
      });
    }
  }, [existing]);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => setForm((prev) => ({ ...prev, [key]: value }));

  const updateField = (index: number, patch: Partial<ToolField>) =>
    setForm((prev) => ({
      ...prev,
      form_fields: prev.form_fields.map((field, i) => (i === index ? { ...field, ...patch } : field)),
    }));

  const save = useMutation({
    mutationFn: (publish: boolean) =>
      adminSaveTool({
        data: {
          ...form,
          id: isNew ? null : id,
          slug: form.slug || slugify(form.name),
          is_published: publish,
          form_fields: form.form_fields.map((field) => ({
            ...field,
            name: field.name || slugify(field.label).replace(/-/g, "_"),
          })),
        },
      }),
    onSuccess: () => {
      toast.success("Saved");
      void queryClient.invalidateQueries({ queryKey: ["admin-content"] });
      void navigate({ to: "/admin" });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  if (!isNew && isLoading) return <p className="text-sm text-muted-foreground">Loading tool…</p>;

  return (
    <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
      <h2 className="text-lg font-semibold">{isNew ? "Add new tool" : "Edit tool"}</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(event) => {
              const name = event.target.value;
              setForm((prev) => ({ ...prev, name, slug: slugTouched ? prev.slug : slugify(name) }));
            }}
            required
          />
        </div>
        <div>
          <Label htmlFor="tool-slug">Slug</Label>
          <Input
            id="tool-slug"
            value={form.slug}
            onChange={(event) => {
              setSlugTouched(true);
              set("slug", event.target.value);
            }}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="short_description">Short description</Label>
        <Textarea
          id="short_description"
          rows={2}
          value={form.short_description}
          onChange={(e) => set("short_description", e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label>Icon</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {TOOL_ICONS.map((icon) => (
              <button
                key={icon}
                type="button"
                aria-label={icon}
                aria-pressed={form.icon === icon}
                onClick={() => set("icon", icon)}
                className={`flex size-10 items-center justify-center rounded-lg border ${
                  form.icon === icon ? "border-primary bg-accent" : "border-border"
                }`}
              >
                <ToolIcon icon={icon} className="size-5" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            {TOOL_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="output_label">Output label</Label>
          <Input id="output_label" value={form.output_label} onChange={(e) => set("output_label", e.target.value)} />
        </div>
      </div>

      <section className="surface-panel p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Form fields</h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              set("form_fields", [
                ...form.form_fields,
                { name: "", label: "", type: "text", placeholder: "", required: false },
              ])
            }
          >
            <Plus className="size-4" /> Add field
          </Button>
        </div>

        <div className="mt-4 space-y-4">
          {form.form_fields.map((field, index) => (
            <div key={index} className="rounded-lg border border-border p-3">
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <Label htmlFor={`label-${index}`}>Label</Label>
                  <Input
                    id={`label-${index}`}
                    value={field.label}
                    onChange={(e) => updateField(index, { label: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor={`name-${index}`}>Field key</Label>
                  <Input
                    id={`name-${index}`}
                    value={field.name}
                    placeholder="auto from label"
                    onChange={(e) => updateField(index, { name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor={`type-${index}`}>Type</Label>
                  <select
                    id={`type-${index}`}
                    value={field.type}
                    onChange={(e) => updateField(index, { type: e.target.value as ToolField["type"] })}
                    className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="text">Text</option>
                    <option value="textarea">Textarea</option>
                    <option value="select">Dropdown</option>
                  </select>
                </div>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor={`placeholder-${index}`}>Placeholder</Label>
                  <Input
                    id={`placeholder-${index}`}
                    value={field.placeholder ?? ""}
                    onChange={(e) => updateField(index, { placeholder: e.target.value })}
                  />
                </div>
                {field.type === "select" ? (
                  <div>
                    <Label htmlFor={`options-${index}`}>Options (comma separated)</Label>
                    <Input
                      id={`options-${index}`}
                      value={(field.options ?? []).join(", ")}
                      onChange={(e) =>
                        updateField(index, {
                          options: e.target.value
                            .split(",")
                            .map((option) => option.trim())
                            .filter(Boolean),
                        })
                      }
                    />
                  </div>
                ) : null}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <Switch
                    checked={Boolean(field.required)}
                    onCheckedChange={(value) => updateField(index, { required: value })}
                  />
                  Required
                </label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    set(
                      "form_fields",
                      form.form_fields.filter((_, i) => i !== index),
                    )
                  }
                >
                  <Trash2 className="size-4" /> Remove
                </Button>
              </div>
            </div>
          ))}
          {!form.form_fields.length ? (
            <p className="text-sm text-muted-foreground">No fields yet — add the inputs users will fill in.</p>
          ) : null}
        </div>
      </section>

      <div>
        <Label htmlFor="system_prompt">AI system prompt</Label>
        <Textarea
          id="system_prompt"
          rows={6}
          value={form.system_prompt}
          onChange={(e) => set("system_prompt", e.target.value)}
          className="mt-2 font-mono text-xs"
        />
      </div>

      <div>
        <Label htmlFor="article_title">Article title</Label>
        <Input id="article_title" value={form.article_title} onChange={(e) => set("article_title", e.target.value)} />
      </div>

      <MarkdownEditor
        id="article_content"
        label="SEO article (markdown)"
        value={form.article_content}
        onChange={(next) => set("article_content", next)}
      />

      <section className="surface-panel p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">FAQs</h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => set("faqs", [...form.faqs, { q: "", a: "" }])}
          >
            <Plus className="size-4" /> Add FAQ
          </Button>
        </div>
        <div className="mt-4 space-y-3">
          {form.faqs.map((faq, index) => (
            <div key={index} className="rounded-lg border border-border p-3">
              <Input
                value={faq.q}
                placeholder="Question"
                onChange={(e) =>
                  set(
                    "faqs",
                    form.faqs.map((item, i) => (i === index ? { ...item, q: e.target.value } : item)),
                  )
                }
              />
              <Textarea
                rows={2}
                className="mt-2"
                value={faq.a}
                placeholder="Answer"
                onChange={(e) =>
                  set(
                    "faqs",
                    form.faqs.map((item, i) => (i === index ? { ...item, a: e.target.value } : item)),
                  )
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() =>
                  set(
                    "faqs",
                    form.faqs.filter((_, i) => i !== index),
                  )
                }
              >
                <Trash2 className="size-4" /> Remove
              </Button>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="tool_meta_title">Meta title</Label>
          <Input id="tool_meta_title" value={form.meta_title} onChange={(e) => set("meta_title", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="tool_meta_description">Meta description</Label>
          <Input
            id="tool_meta_description"
            value={form.meta_description}
            onChange={(e) => set("meta_description", e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Switch id="tool_published" checked={form.is_published} onCheckedChange={(v) => set("is_published", v)} />
        <Label htmlFor="tool_published">Published</Label>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="outline" disabled={save.isPending} onClick={() => save.mutate(false)}>
          Save as draft
        </Button>
        <Button type="button" disabled={save.isPending} onClick={() => save.mutate(true)}>
          Publish
        </Button>
        <Button type="button" variant="ghost" onClick={() => navigate({ to: "/admin" })}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
