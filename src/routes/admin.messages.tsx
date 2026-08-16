import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { adminDeleteMessage, adminListMessages, adminSetMessageRead } from "@/lib/contact.functions";

export const Route = createFileRoute("/admin/messages")({
  component: AdminMessages,
});

function AdminMessages() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: () => adminListMessages(),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin-messages"] });

  const toggleRead = useMutation({
    mutationFn: (input: { id: string; isRead: boolean }) => adminSetMessageRead({ data: input }),
    onSuccess: () => void invalidate(),
    onError: (error: Error) => toast.error(error.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => adminDeleteMessage({ data: { id } }),
    onSuccess: () => {
      toast.success("Message deleted");
      void invalidate();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const messages = data ?? [];
  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Inbox</h2>
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Loading…" : `${messages.length} message${messages.length === 1 ? "" : "s"} · ${unread} unread`}
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link to="/admin">Back to content</Link>
        </Button>
      </div>

      {!isLoading && messages.length === 0 ? (
        <p className="surface-panel p-6 text-sm text-muted-foreground">No messages yet.</p>
      ) : null}

      <ul className="space-y-3">
        {messages.map((m) => (
          <li
            key={m.id}
            className={`surface-panel p-5 ${m.is_read ? "opacity-70" : "border-primary/30"}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold">
                  {m.name}{" "}
                  {!m.is_read ? (
                    <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      New
                    </span>
                  ) : null}
                </p>
                <a href={`mailto:${m.email}`} className="text-xs text-muted-foreground hover:text-foreground">
                  {m.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {new Date(m.created_at).toLocaleString()}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleRead.mutate({ id: m.id, isRead: !m.is_read })}
                  aria-label={m.is_read ? "Mark as unread" : "Mark as read"}
                >
                  {m.is_read ? <Mail className="size-4" /> : <MailOpen className="size-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (confirm(`Delete message from ${m.name}?`)) remove.mutate(m.id);
                  }}
                  aria-label="Delete message"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm text-foreground/90">{m.message}</p>
            <div className="mt-3">
              <Button asChild size="sm" variant="outline">
                <a href={`mailto:${m.email}?subject=Re:%20Your%20message%20to%20ZenWrit`}>Reply by email</a>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
