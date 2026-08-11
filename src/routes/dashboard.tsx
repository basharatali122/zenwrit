import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2, LogOut, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your Dashboard | SaaScript" },
      {
        name: "description",
        content: "Manage your SaaScript subscription, review your generation history and update account settings.",
      },
      { property: "og:title", content: "Your Dashboard | SaaScript" },
      { property: "og:description", content: "Subscription status, generation history and account settings." },
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
  const [plan, setPlan] = useState<{ plan: string; status: string; current_period_end: string | null } | null>(null);
  const [history, setHistory] = useState<Generation[]>([]);
  const [todayCount, setTodayCount] = useState(0);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    let active = true;

    async function load(userId: string) {
      const since = new Date();
      since.setUTCHours(0, 0, 0, 0);

      const [sub, gens, usage] = await Promise.all([
        supabase.from("subscriptions").select("plan, status, current_period_end").eq("user_id", userId).maybeSingle(),
        supabase.from("generations").select("id, tool_slug, output, created_at").order("created_at", { ascending: false }).limit(20),
        supabase.from("usage_logs").select("id", { count: "exact", head: true }).gte("created_at", since.toISOString()),
      ]);

      if (!active) return;
      setPlan(sub.data ?? { plan: "free", status: "inactive", current_period_end: null });
      setHistory((gens.data as Generation[]) ?? []);
      setTodayCount(usage.count ?? 0);
      setLoadingData(false);
    }

    load(user.id);
    return () => {
      active = false;
    };
  }, [user]);

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

  const isPro = plan?.plan === "pro" && plan?.status === "active";

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
          <p className="mt-2 text-2xl font-bold">{isPro ? "Pro" : "Free"}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {isPro
              ? plan?.current_period_end
                ? `Renews ${new Date(plan.current_period_end).toLocaleDateString()}`
                : "Active subscription"
              : "$0 · 3 generations per day"}
          </p>
          {!isPro ? (
            <Button asChild size="sm" className="mt-4">
              <Link to="/pricing">Upgrade to Pro</Link>
            </Button>
          ) : null}
        </div>

        <div className="surface-panel p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Today's usage</h2>
          <p className="mt-2 text-2xl font-bold">{isPro ? `${todayCount}` : `${todayCount}/3`}</p>
          <p className="mt-1 text-sm text-muted-foreground">Resets at midnight UTC</p>
        </div>

        <div className="surface-panel p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Account</h2>
          <p className="mt-2 truncate text-sm font-medium">{user.email}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Joined {new Date(user.created_at).toLocaleDateString()}
          </p>
          <Button asChild size="sm" variant="outline" className="mt-4">
            <Link to="/contact">Contact support</Link>
          </Button>
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
