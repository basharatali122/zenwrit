import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MarkdownEditor } from "@/components/admin/MarkdownEditor";
import { adminGetPost, adminSavePost, adminUploadCover } from "@/lib/content.functions";
import { estimateReadingTime, slugify } from "@/lib/content";

export const Route = createFileRoute("/admin/blog/$id")({
  component: BlogEditor,
});

type Form = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  meta_title: string;
  meta_description: string;
  is_published: boolean;
};

const EMPTY: Form = {
  slug: "",
  title: "",
  category: "Careers",
  excerpt: "",
  content: "",
  cover_image_url: null,
  meta_title: "",
  meta_description: "",
  is_published: false,
};

function BlogEditor() {
  const { id } = useParams({ from: "/admin/blog/$id" });
  const isNew = id === "new";
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState<Form>(EMPTY);
  const [slugTouched, setSlugTouched] = useState(!isNew);

  const { data: existing, isLoading } = useQuery({
    queryKey: ["admin-post", id],
    queryFn: () => adminGetPost({ data: { id } }),
    enabled: !isNew,
  });

  useEffect(() => {
    if (existing) {
      setForm({
        slug: existing.slug,
        title: existing.title,
        category: existing.category,
        excerpt: existing.excerpt,
        content: existing.content,
        cover_image_url: existing.cover_image_url,
        meta_title: existing.meta_title,
        meta_description: existing.meta_description,
        is_published: existing.is_published,
      });
    }
  }, [existing]);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => setForm((prev) => ({ ...prev, [key]: value }));

  const save = useMutation({
    mutationFn: (publish: boolean) =>
      adminSavePost({
        data: {
          id: isNew ? null : id,
          slug: form.slug || slugify(form.title),
          title: form.title,
          category: form.category,
          excerpt: form.excerpt,
          content: form.content,
          cover_image_url: form.cover_image_url,
          reading_time: estimateReadingTime(form.content),
          meta_title: form.meta_title,
          meta_description: form.meta_description,
          is_published: publish,
          published_at: null,
        },
      }),
    onSuccess: () => {
      toast.success("Saved");
      void queryClient.invalidateQueries({ queryKey: ["admin-content"] });
      void navigate({ to: "/admin" });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const upload = useMutation({
    mutationFn: async (file: File) => {
      const buffer = await file.arrayBuffer();
      let binary = "";
      const bytes = new Uint8Array(buffer);
      for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]!);
      return adminUploadCover({
        data: { fileName: file.name, contentType: file.type, dataBase64: btoa(binary) },
      });
    },
    onSuccess: (result) => {
      set("cover_image_url", result.url);
      toast.success("Cover uploaded");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  if (!isNew && isLoading) return <p className="text-sm text-muted-foreground">Loading post…</p>;

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        save.mutate(form.is_published);
      }}
    >
      <h2 className="text-lg font-semibold">{isNew ? "Add new blog post" : "Edit blog post"}</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(event) => {
              const title = event.target.value;
              setForm((prev) => ({ ...prev, title, slug: slugTouched ? prev.slug : slugify(title) }));
            }}
            required
          />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={form.slug}
            onChange={(event) => {
              setSlugTouched(true);
              set("slug", event.target.value);
            }}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input id="category" value={form.category} onChange={(e) => set("category", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="cover">Cover image (upload)</Label>
          <Input
            id="cover"
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) upload.mutate(file);
            }}
          />
        </div>
        <div>
          <Label htmlFor="thumbnail_url">Thumbnail image URL</Label>
          <Input
            id="thumbnail_url"
            type="url"
            placeholder="https://res.cloudinary.com/.../image.jpg"
            value={form.cover_image_url ?? ""}
            onChange={(e) => set("cover_image_url", e.target.value.trim() || null)}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Paste a full image URL (e.g. Cloudinary). Leave empty to use the gradient placeholder.
          </p>
          {form.cover_image_url ? (
            <img
              src={form.cover_image_url}
              alt="Cover preview"
              className="mt-2 h-24 rounded-md border border-border object-cover"
            />
          ) : null}
        </div>
      </div>

      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea id="excerpt" rows={2} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
      </div>

      <MarkdownEditor id="content" value={form.content} onChange={(next) => set("content", next)} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="meta_title">Meta title</Label>
          <Input id="meta_title" value={form.meta_title} onChange={(e) => set("meta_title", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="meta_description">Meta description</Label>
          <Input
            id="meta_description"
            value={form.meta_description}
            onChange={(e) => set("meta_description", e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Switch id="published" checked={form.is_published} onCheckedChange={(v) => set("is_published", v)} />
        <Label htmlFor="published">Published</Label>
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
