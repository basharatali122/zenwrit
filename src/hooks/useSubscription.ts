import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getPaddleEnvironment } from "@/lib/paddle";

export type SubscriptionRow = {
  status: string;
  price_id: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean | null;
  paddle_subscription_id: string | null;
};

const ACTIVE_STATUSES = ["active", "trialing", "past_due"];

export function isSubscriptionActive(sub: SubscriptionRow | null): boolean {
  if (!sub) return false;
  const notExpired = !sub.current_period_end || new Date(sub.current_period_end) > new Date();
  if (ACTIVE_STATUSES.includes(sub.status)) return notExpired;
  if (sub.status === "canceled") return notExpired && Boolean(sub.current_period_end);
  return false;
}

export function useSubscription(userId: string | undefined) {
  const [subscription, setSubscription] = useState<SubscriptionRow | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!userId) {
      setSubscription(null);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("subscriptions")
      .select("status, price_id, current_period_end, cancel_at_period_end, paddle_subscription_id")
      .eq("user_id", userId)
      .eq("environment", getPaddleEnvironment())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    setSubscription((data as SubscriptionRow | null) ?? null);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    void load();
    if (!userId) return;

    const channel = supabase
      .channel(`subscriptions:${userId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "subscriptions", filter: `user_id=eq.${userId}` },
        () => {
          void load();
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [userId, load]);

  return { subscription, isPro: isSubscriptionActive(subscription), loading, refresh: load };
}
