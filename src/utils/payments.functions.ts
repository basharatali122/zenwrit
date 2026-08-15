import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { PaddleEnv } from "@/lib/paddle.server";

export const resolvePaddlePrice = createServerFn({ method: "GET" })
  .inputValidator((data: { priceId: string; environment: PaddleEnv }) => data)
  .handler(async ({ data }) => {
    const { gatewayFetch } = await import("@/lib/paddle.server");
    const response = await gatewayFetch(
      data.environment,
      `/prices?external_id=${encodeURIComponent(data.priceId)}`,
    );
    const result = (await response.json()) as { data?: Array<{ id: string }> };
    if (!result.data?.length) throw new Error("Price not found");
    return result.data[0]!.id;
  });

/** Returns a Paddle-hosted portal URL so the user can manage or cancel their plan. */
export const createPortalSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { environment: PaddleEnv }) => data)
  .handler(async ({ data, context }) => {
    const { data: sub } = await context.supabase
      .from("subscriptions")
      .select("paddle_customer_id, paddle_subscription_id")
      .eq("user_id", context.userId)
      .eq("environment", data.environment)
      .not("paddle_customer_id", "is", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!sub?.paddle_customer_id) throw new Error("No subscription found");

    const { getPaddleClient } = await import("@/lib/paddle.server");
    const paddle = getPaddleClient(data.environment);
    const session = await paddle.customerPortalSessions.create(
      sub.paddle_customer_id,
      sub.paddle_subscription_id ? [sub.paddle_subscription_id] : [],
    );

    return { url: session.urls.general.overview };
  });

/**
 * Switches an existing subscription to a different price (monthly <-> yearly).
 * Applies immediately and pro-rates the difference on the spot.
 */
export const changeSubscriptionPlan = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { environment: PaddleEnv; priceId: string }) => data)
  .handler(async ({ data, context }) => {
    const { data: sub } = await context.supabase
      .from("subscriptions")
      .select("paddle_subscription_id, price_id, status")
      .eq("user_id", context.userId)
      .eq("environment", data.environment)
      .not("paddle_subscription_id", "is", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!sub?.paddle_subscription_id) throw new Error("No active subscription found");
    if (sub.price_id === data.priceId) return { changed: false };

    const { gatewayFetch, getPaddleClient } = await import("@/lib/paddle.server");
    const lookup = await gatewayFetch(
      data.environment,
      `/prices?external_id=${encodeURIComponent(data.priceId)}`,
    );
    const result = (await lookup.json()) as { data?: Array<{ id: string }> };
    const paddlePriceId = result.data?.[0]?.id;
    if (!paddlePriceId) throw new Error("Price not found");

    const paddle = getPaddleClient(data.environment);
    await paddle.subscriptions.update(sub.paddle_subscription_id, {
      items: [{ priceId: paddlePriceId, quantity: 1 }],
      prorationBillingMode: "prorated_immediately",
    });

    return { changed: true };
  });

/**
 * Cancels the user's subscription at the end of the paid period.
 * Access is retained until `current_period_end`; the webhook syncs the row.
 */
export const cancelSubscription = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { environment: PaddleEnv }) => data)
  .handler(async ({ data, context }) => {
    const { data: sub } = await context.supabase
      .from("subscriptions")
      .select("paddle_subscription_id, status")
      .eq("user_id", context.userId)
      .eq("environment", data.environment)
      .not("paddle_subscription_id", "is", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!sub?.paddle_subscription_id) throw new Error("No active subscription found");
    if (sub.status === "canceled") return { canceled: true };

    const { getPaddleClient } = await import("@/lib/paddle.server");
    await getPaddleClient(data.environment).subscriptions.cancel(sub.paddle_subscription_id, {
      effectiveFrom: "next_billing_period",
    });

    return { canceled: true };
  });
