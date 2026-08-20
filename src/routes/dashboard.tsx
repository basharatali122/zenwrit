import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, Loader2, LogOut, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { deleteAccount } from "@/utils/account.functions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your Dashboard | ZenWrit" },
      {
        name: "description",
        content: "Review your ZenWrit generation history and update your account settings.",
      },
      { property: "og:title", content: "Your Dashboard | ZenWrit" },
      { property: "og:description", content: "Generation history and account settings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

type Generation = {
  id: string;
  tool_slug: string;
  output: string;
  created_at: string;
};

function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState<Generation[]>([]);
  const [todayCount, setTodayCount] = useState(0);
  const [loadingData, setLoadingData] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [fullName, setFullName] = useState("");
  const [savedName, setSavedName] = useState("");
  const [savingName, setSavingName] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    let active = true;

    async function load() {
      const since = new Date();
      since.setUTCHours(0, 0, 0, 0);

      const [gens, usage, profile] = await Promise.all([
        supabase
          .from("generations")
          .select("id, tool_slug, output, created_at")
          .order("created_at", { ascending: false })
          .limit(50),
        supabase.from("usage_logs").select("id", { count: "exact", head: true }).gte("created_at", since.toISOString()),
        supabase.from("profiles").select("full_name").maybeSingle(),
      ]);

      if (!active) return;
      setHistory((gens.data as Generation[]) ?? []);
      setTodayCount(usage.count ?? 0);
      const name = (profile.data?.full_name as string | undefined) ?? "";
      setFullName(name);
      setSavedName(name);
      setLoadingData(false);
    }

    load();
    return () => {
      active = false;
    };
  }, [user]);

  async function saveName() {
    if (!user) return;
    setSavingName(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, email: user.email ?? null, full_name: fullName.trim() });
    setSavingName(false);
    if (error) {
      toast.error("Couldn't save your name.");
      return;
    }
    setSavedName(fullName.trim());
    toast.success("Name updated");
  }

  async function removeAccount() {
    setDeleting(true);
    try {
      await deleteAccount();
      await signOut();
      toast.success("Your account has been deleted.");
      navigate({ to: "/" });
    } catch (error) {
      console.error(error);
      toast.error("Couldn't delete your account. Please contact support.");
      setDeleting(false);
    }
  }

  async function remove(id: string) {
    const { error } = await supabase.from("generations").delete().eq("id", id);
    if (error) {
      toast.error("Couldn't delete that item.");
      return;
    }
    setHistory((items) => items.filter((item) => item.id !== id));
    toast.success("Deleted");
  }

  if (loading || !user) {
    return (
      <div className="container-page flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => signOut().then(() => navigate({ to: "/" }))}>
          <LogOut /> Sign out
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="surface-panel p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Plan</h2>
          <p className="mt-2 text-2xl font-bold">Free · Unlimited</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Every tool is free with no daily limits.
          </p>
          <Button asChild size="sm" className="mt-4">
            <Link to="/tools">Start generating</Link>
          </Button>
        </div>

        <div className="surface-panel p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Today's usage</h2>
          <p className="mt-2 text-2xl font-bold">{todayCount}</p>
          <p className="mt-1 text-sm text-muted-foreground">Generations created today</p>
        </div>

        <div className="surface-panel p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Account</h2>
          <p className="mt-2 truncate text-sm font-medium">{user.email}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Joined {new Date(user.created_at).toLocaleDateString()}
          </p>
          <label htmlFor="full-name" className="mt-4 block text-xs font-medium text-muted-foreground">
            Display name
          </label>
          <div className="mt-1 flex gap-2">
            <Input
              id="full-name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Your name"
              className="h-9"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={saveName}
              disabled={savingName || fullName.trim() === savedName}
              aria-label="Save name"
            >
              {savingName ? <Loader2 className="animate-spin" /> : <Check />}
            </Button>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2">
            <Button asChild size="sm" variant="ghost" className="px-0">
              <Link to="/contact">Contact support</Link>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="ghost" className="px-0 text-destructive hover:text-destructive" disabled={deleting}>
                  {deleting ? <Loader2 className="animate-spin" /> : null} Delete account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete your account permanently?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This removes your profile, saved generations and usage history. This can't be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep my account</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={removeAccount}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      <section className="mt-10" aria-labelledby="history">
        <h2 id="history" className="text-xl font-bold">Generation history</h2>
        {loadingData ? (
          <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
        ) : history.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Nothing yet — <Link to="/tools" className="text-primary hover:underline">try a tool</Link>.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {history.map((item) => (
              <li key={item.id} className="surface-panel p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{item.tool_slug.replace(/-/g, " ")}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => remove(item.id)} aria-label="Delete">
                    <Trash2 />
                  </Button>
                </div>
                <p className="mt-2 line-clamp-4 whitespace-pre-wrap text-sm text-muted-foreground">
                  {item.output}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
