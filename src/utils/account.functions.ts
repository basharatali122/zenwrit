import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { PaddleEnv } from "@/lib/paddle.server";

/**
 * Permanently deletes the signed-in user's account.
 *
 * Cancels any live Paddle subscription first (immediately — the user is
 * asking for their data to be gone, so we do not keep billing them through
 * the period), then removes their app data and the auth user itself.
 */
export const deleteAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { environment: PaddleEnv }) => data)
  .handler(async ({ data, context }) => {
    const userId = context.userId;

    const { data: subs } = await context.supabase
      .from("subscriptions")
      .select("paddle_subscription_id, status, environment")
      .eq("user_id", userId);

    for (const sub of subs ?? []) {
      if (!sub.paddle_subscription_id) continue;
      if (["canceled", "inactive"].includes(sub.status)) continue;
      try {
        const { getPaddleClient } = await import("@/lib/paddle.server");
        await getPaddleClient((sub.environment ?? data.environment) as PaddleEnv)
          .subscriptions.cancel(sub.paddle_subscription_id, { effectiveFrom: "immediately" });
      } catch (error) {
        console.error("[account] could not cancel subscription before deletion", error);
      }
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    await supabaseAdmin.from("generations").delete().eq("user_id", userId);
    await supabaseAdmin.from("usage_logs").delete().eq("user_id", userId);
    await supabaseAdmin.from("subscriptions").delete().eq("user_id", userId);
    await supabaseAdmin.from("user_roles").delete().eq("user_id", userId);
    await supabaseAdmin.from("profiles").delete().eq("id", userId);

    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) throw new Error(error.message);

    return { deleted: true };
  });
