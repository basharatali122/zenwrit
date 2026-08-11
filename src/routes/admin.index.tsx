import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { adminDeleteContent, adminListContent } from "@/lib/content.functions";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
        published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
      }`}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}

function AdminDashboard() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-content"],
    queryFn: () => adminListContent(),
  });

  const remove = useMutation({
    mutationFn: (input: { kind: "tool" | "post"; id: string }) => adminDeleteContent({ data: input }),
    onSuccess: () => {
      toast.success("Deleted");
      void queryClient.invalidateQueries({ queryKey: ["admin-content"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading content…</p>;

  return (
    <div className="space-y-10">
      <section className="surface-panel p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Blog posts</h2>
          <Button asChild size="sm">
            <Link to="/admin/blog/$id" params={{ id: "new" }}>
              <Plus className="size-4" /> Add new blog post
            </Link>
          </Button>
        </div>
        <ul className="mt-4 divide-y divide-border">
          {(data?.posts ?? []).map((post) => (
            <li key={post.id} className="flex flex-wrap items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{post.title}</p>
                <p className="truncate text-xs text-muted-foreground">/blog/{post.slug}</p>
              </div>
              <StatusBadge published={post.is_published} />
              <Button asChild variant="outline" size="sm">
                <Link to="/admin/blog/$id" params={{ id: post.id }}>Edit</Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm(`Delete "${post.title}"?`)) remove.mutate({ kind: "post", id: post.id });
                }}
              >
                <Trash2 className="size-4" />
              </Button>
            </li>
          ))}
          {!data?.posts.length ? <li className="py-3 text-sm text-muted-foreground">No posts yet.</li> : null}
        </ul>
      </section>

      <section className="surface-panel p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Tools</h2>
          <Button asChild size="sm">
            <Link to="/admin/tools/$id" params={{ id: "new" }}>
              <Plus className="size-4" /> Add new tool
            </Link>
          </Button>
        </div>
        <ul className="mt-4 divide-y divide-border">
          {(data?.tools ?? []).map((tool) => (
            <li key={tool.id} className="flex flex-wrap items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{tool.name}</p>
                <p className="truncate text-xs text-muted-foreground">/tools/{tool.slug}</p>
              </div>
              <StatusBadge published={tool.is_published} />
              <Button asChild variant="outline" size="sm">
                <Link to="/admin/tools/$id" params={{ id: tool.id }}>Edit</Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm(`Delete "${tool.name}"?`)) remove.mutate({ kind: "tool", id: tool.id });
                }}
              >
                <Trash2 className="size-4" />
              </Button>
            </li>
          ))}
          {!data?.tools.length ? <li className="py-3 text-sm text-muted-foreground">No tools yet.</li> : null}
        </ul>
      </section>
    </div>
  );
}
