import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { verifyWebhook, EventName, type PaddleEnv } from "@/lib/paddle.server";
import { sendTemplateEmail } from "@/lib/email-templates/send-email";

let _supabase: ReturnType<typeof createClient<Database>> | null = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient<Database>(
      process.env["SUPABASE_URL"]!,
      process.env["SUPABASE_SERVICE_ROLE_KEY"]!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
  }
  return _supabase;
}

const PAID_STATUSES = ["active", "trialing", "past_due"];
const SITE_URL = "https://zenwrit.com";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Records the event and returns false when it was already processed.
 * Paddle retries and replays events, so every handler runs at most once.
 */
async function claimEvent(event: any, env: PaddleEnv): Promise<boolean> {
  const eventId = event?.eventId ?? event?.notificationId;
  if (!eventId) return true;

  const { error } = await getSupabase()
    .from("payment_events")
    .insert({
      event_id: String(eventId),
      event_type: String(event.eventType ?? "unknown"),
      environment: env,
      occurred_at: event?.occurredAt ?? null,
      payload: (event?.data ?? {}) as never,
    });

  if (error) {
    // Unique violation → already handled.
    if (error.code === "23505") {
      console.log("[webhook] duplicate event ignored", eventId);
      return false;
    }
    console.error("[webhook] could not record event", error);
  }
  return true;
}

/** Finds the app user this Paddle subscription belongs to. */
async function resolveUserId(data: any, env: PaddleEnv): Promise<string | null> {
  const fromCustomData = data?.customData?.userId;
  if (fromCustomData) return String(fromCustomData);

  // Fallback 1: an existing row for the same subscription or customer.
  const supabase = getSupabase();
  const { data: existing } = await supabase
    .from("subscriptions")
    .select("user_id")
    .eq("environment", env)
    .or(
      [
        data?.id ? `paddle_subscription_id.eq.${data.id}` : null,
        data?.customerId ? `paddle_customer_id.eq.${data.customerId}` : null,
      ]
        .filter(Boolean)
        .join(","),
    )
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (existing?.user_id) return existing.user_id as string;

  // Fallback 2: match the Paddle customer's email to an app profile.
  try {
    if (!data?.customerId) return null;
    const { getPaddleClient } = await import("@/lib/paddle.server");
    const customer = await getPaddleClient(env).customers.get(data.customerId);
    const email = customer?.email?.toLowerCase();
    if (!email) return null;
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .ilike("email", email)
      .limit(1)
      .maybeSingle();
    return (profile?.id as string) ?? null;
  } catch (error) {
    console.error("[webhook] email fallback failed", error);
    return null;
  }
}

function readItemIds(data: any) {
  const item = data?.items?.[0];
  return {
    priceId: item?.price?.importMeta?.externalId ?? null,
    productId: item?.product?.importMeta?.externalId ?? null,
    rawPriceId: item?.price?.id ?? null,
    rawProductId: item?.product?.id ?? null,
  };
}

/** Upsert used by created / activated / updated / trialing / paused / resumed. */
async function upsertSubscription(data: any, env: PaddleEnv, statusOverride?: string) {
  const { id, customerId, status, currentBillingPeriod, scheduledChange } = data;
  const effectiveStatus = statusOverride ?? status;

  const userId = await resolveUserId(data, env);
  if (!userId) {
    console.error("[webhook] could not link subscription to a user", { subscriptionId: id, customerId });
    return;
  }

  const { priceId, productId, rawPriceId, rawProductId } = readItemIds(data);
  if (!priceId || !productId) {
    console.warn("[webhook] missing importMeta.externalId", { rawPriceId, rawProductId });
    return;
  }

  const row = {
    user_id: userId,
    plan: PAID_STATUSES.includes(effectiveStatus) ? "pro" : "free",
    paddle_subscription_id: id,
    paddle_customer_id: customerId,
    product_id: productId,
    price_id: priceId,
    status: effectiveStatus,
    current_period_start: currentBillingPeriod?.startsAt ?? null,
    current_period_end: currentBillingPeriod?.endsAt ?? null,
    cancel_at_period_end: scheduledChange?.action === "cancel",
    environment: env,
    updated_at: new Date().toISOString(),
  };

  const { error } = await getSupabase()
    .from("subscriptions")
    .upsert(row, { onConflict: "paddle_subscription_id" });
  if (error) console.error("[webhook] upsert failed", error);

  return { userId, priceId };
}

async function handleSubscriptionActivated(data: any, env: PaddleEnv) {
  const result = await upsertSubscription(data, env);
  if (!result) return;

  // Welcome email — only on the first activation of this subscription.
  try {
    const { data: profile } = await getSupabase()
      .from("profiles")
      .select("email")
      .eq("id", result.userId)
      .maybeSingle();
    const email = profile?.email as string | undefined;
    if (email) {
      await sendTemplateEmail("pro-welcome", email, {
        templateData: { yearly: result.priceId.includes("yearly"), siteUrl: SITE_URL },
        idempotencyKey: `pro-welcome-${data?.id ?? result.userId}`,
      });
    }
  } catch (error) {
    console.error("[webhook] welcome email failed", error);
  }
}

/** Emails the subscriber when Paddle could not take a renewal payment. */
async function notifyPaymentFailed(subscriptionId: string, env: PaddleEnv, transactionId?: string) {
  try {
    const supabase = getSupabase();
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("user_id")
      .eq("paddle_subscription_id", subscriptionId)
      .eq("environment", env)
      .maybeSingle();
    if (!sub?.user_id) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", sub.user_id as string)
      .maybeSingle();
    const email = profile?.email as string | undefined;
    if (!email) return;

    await sendTemplateEmail("payment-failed", email, {
      templateData: { siteUrl: SITE_URL },
      idempotencyKey: `payment-failed-${transactionId ?? subscriptionId}`,
    });
  } catch (error) {
    console.error("[webhook] payment failed email error", error);
  }
}

async function handleSubscriptionCanceled(data: any, env: PaddleEnv) {
  const { error } = await getSupabase()
    .from("subscriptions")
    .update({
      plan: "free",
      status: "canceled",
      // Keep current_period_end intact — access lasts until the paid period ends.
      cancel_at_period_end: true,
      updated_at: new Date().toISOString(),
    })
    .eq("paddle_subscription_id", data.id)
    .eq("environment", env);
  if (error) console.error("[webhook] cancel update failed", error);
}

async function handleTransaction(data: any, env: PaddleEnv, failed: boolean) {
  const subscriptionId = data?.subscriptionId;
  if (!subscriptionId) return; // one-off purchase, nothing to sync

  // A completed renewal refreshes the billing period; a failed one leaves
  // Paddle's dunning flow in charge of the status.
  if (failed) {
    console.log("[webhook] payment failed for subscription", subscriptionId);
    await notifyPaymentFailed(subscriptionId, env, data?.id);
    return;
  }

  try {
    const { getPaddleClient } = await import("@/lib/paddle.server");
    const subscription = await getPaddleClient(env).subscriptions.get(subscriptionId);
    await upsertSubscription(subscription, env);
  } catch (error) {
    console.error("[webhook] could not refresh subscription after transaction", error);
  }
}

async function handleWebhook(req: Request, env: PaddleEnv) {
  const event = await verifyWebhook(req, env);
  if (!(await claimEvent(event, env))) return;

  switch (event.eventType) {
    case EventName.SubscriptionCreated:
    case EventName.SubscriptionUpdated:
    case EventName.SubscriptionTrialing:
    case EventName.SubscriptionPastDue:
    case EventName.SubscriptionPaused:
    case EventName.SubscriptionResumed:
      await upsertSubscription(event.data, env);
      break;
    case EventName.SubscriptionActivated:
      await handleSubscriptionActivated(event.data, env);
      break;
    case EventName.SubscriptionCanceled:
      await handleSubscriptionCanceled(event.data, env);
      break;
    case EventName.TransactionCompleted:
      await handleTransaction(event.data, env, false);
      break;
    case EventName.TransactionPaymentFailed:
      await handleTransaction(event.data, env, true);
      break;
    default:
      console.log("[webhook] unhandled event:", event.eventType);
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export const Route = createFileRoute("/api/public/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const url = new URL(request.url);
        const env = (url.searchParams.get("env") || "sandbox") as PaddleEnv;
        try {
          await handleWebhook(request, env);
          return Response.json({ received: true });
        } catch (e) {
          console.error("Webhook error:", e);
          return new Response("Webhook error", { status: 400 });
        }
      },
    },
  },
});
