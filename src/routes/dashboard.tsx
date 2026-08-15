import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, ExternalLink, Loader2, LogOut, PartyPopper, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { usePaddleCheckout } from "@/hooks/usePaddleCheckout";
import { getPaddleEnvironment, PRO_MONTHLY_PRICE_ID, PRO_YEARLY_PRICE_ID } from "@/lib/paddle";
import { changeSubscriptionPlan, createPortalSession } from "@/utils/payments.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/dashboard")({
  validateSearch: (search: Record<string, unknown>): { checkout?: "success" } =>
    search["checkout"] === "success" ? { checkout: "success" } : {},
  head: () => ({
    meta: [
      { title: "Your Dashboard | ZenWrit" },
      {
        name: "description",
        content: "Manage your ZenWrit subscription, review your generation history and update account settings.",
      },
      { property: "og:title", content: "Your Dashboard | ZenWrit" },
      { property: "og:description", content: "Subscription status, generation history and account settings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

const FREE_HISTORY_LIMIT = 3;

type Generation = {
  id: string;
  tool_slug: string;
  output: string;
  created_at: string;
};

function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { subscription, isPro } = useSubscription(user?.id);
  const { openCheckout, loading: checkoutLoading } = usePaddleCheckout();
  const [history, setHistory] = useState<Generation[]>([]);
  const [todayCount, setTodayCount] = useState(0);
  const [loadingData, setLoadingData] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [switching, setSwitching] = useState(false);
  const [fullName, setFullName] = useState("");
  const [savedName, setSavedName] = useState("");
  const [savingName, setSavingName] = useState(false);
  const { checkout } = Route.useSearch();
  const isYearly = subscription?.price_id === PRO_YEARLY_PRICE_ID;

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
          .limit(isPro ? 50 : FREE_HISTORY_LIMIT),
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
  }, [user, isPro]);

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

  async function upgrade() {
    if (!user) return;
    try {
      await openCheckout({
        priceId: PRO_MONTHLY_PRICE_ID,
        customerEmail: user.email ?? undefined,
        customData: { userId: user.id },
        successUrl: `${window.location.origin}/dashboard?checkout=success`,
      });
    } catch (error) {
      console.error(error);
      toast.error("Couldn't open checkout. Please try again.");
    }
  }

  async function manageBilling() {
    setPortalLoading(true);
    try {
      const { url } = await createPortalSession({ data: { environment: getPaddleEnvironment() } });
      window.open(url, "_blank", "noopener");
    } catch (error) {
      console.error(error);
      toast.error("Couldn't open the billing portal.");
    } finally {
      setPortalLoading(false);
    }
  }

  async function switchPlan() {
    setSwitching(true);
    try {
      await changeSubscriptionPlan({
        data: {
          environment: getPaddleEnvironment(),
          priceId: isYearly ? PRO_MONTHLY_PRICE_ID : PRO_YEARLY_PRICE_ID,
        },
      });
      toast.success(
        isYearly
          ? "Switched to monthly billing — the difference has been credited."
          : "Switched to yearly billing — you were charged the pro-rated difference.",
      );
    } catch (error) {
      console.error(error);
      toast.error("Couldn't change your plan. Try the billing portal instead.");
    } finally {
      setSwitching(false);
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
    <div>
      <PaymentTestModeBanner />
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

      {checkout === "success" ? (
        <div className="mt-6 flex items-start gap-3 rounded-lg border border-success/40 bg-success/10 p-4">
          <PartyPopper className="mt-0.5 size-5 text-success" />
          <div>
            <p className="font-semibold">Welcome to Pro!</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Unlimited generations are unlocked and ads are gone. If your plan still shows as Free, give it a few
              seconds — it updates automatically.
            </p>
            <Button asChild size="sm" className="mt-3">
              <Link to="/tools">Start generating</Link>
            </Button>
          </div>
        </div>
      ) : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="surface-panel p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Plan</h2>
          <p className="mt-2 text-2xl font-bold">{isPro ? (isYearly ? "Pro · Yearly" : "Pro · Monthly") : "Free"}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {isPro
              ? subscription?.current_period_end
                ? `${subscription.cancel_at_period_end || subscription.status === "canceled" ? "Ends" : "Renews"} ${new Date(subscription.current_period_end).toLocaleDateString()}`
                : "Active subscription"
              : "$0 · 3 generations per day"}
          </p>
          {subscription?.status === "past_due" ? (
            <p className="mt-1 text-sm text-destructive">
              Your last payment failed — update your card to keep Pro.
            </p>
          ) : null}
          {isPro ? (
            <Button size="sm" variant="outline" className="mt-4" onClick={manageBilling} disabled={portalLoading}>
              {portalLoading ? <Loader2 className="animate-spin" /> : <ExternalLink />} Manage billing
            </Button>
          ) : null}
          {!isPro ? (
            <Button size="sm" className="mt-4" onClick={upgrade} disabled={checkoutLoading}>
              {checkoutLoading ? <Loader2 className="animate-spin" /> : null} Upgrade to Pro
            </Button>
          ) : null}
          {isPro && !subscription?.cancel_at_period_end && subscription?.status !== "canceled" ? (
            <Button size="sm" variant="ghost" className="mt-2" onClick={switchPlan} disabled={switching}>
              {switching ? <Loader2 className="animate-spin" /> : null}
              {isYearly ? "Switch to monthly" : "Switch to yearly · save 2 months"}
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
          <Button asChild size="sm" variant="ghost" className="mt-3 px-0">
            <Link to="/contact">Contact support</Link>
          </Button>
        </div>
      </div>

      <section className="mt-10" aria-labelledby="history">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="history" className="text-xl font-bold">Generation history</h2>
          {!isPro ? (
            <p className="text-sm text-muted-foreground">
              Free plan keeps your last {FREE_HISTORY_LIMIT} —{" "}
              <button type="button" onClick={upgrade} className="text-primary hover:underline">
                upgrade for full history
              </button>
            </p>
          ) : null}
        </div>
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
    </div>
  );
}
