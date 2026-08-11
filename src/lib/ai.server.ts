import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { getRequest } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { FREE_DAILY_LIMIT } from "./tools";

export function createLovableAiGatewayProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "lovable-ai-gateway",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: { "Lovable-API-Key": apiKey },
  });
}

/** Resolves the signed-in user id from the bearer token, if any. Never throws. */
export async function resolveOptionalUserId(): Promise<string | null> {
  try {
    const request = getRequest();
    const authHeader = request?.headers?.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) return null;
    const token = authHeader.slice(7);
    if (token.split(".").length !== 3) return null;

    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) return null;

    const client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { data, error } = await client.auth.getClaims(token);
    if (error || !data?.claims?.sub) return null;
    return data.claims.sub as string;
  } catch {
    return null;
  }
}

export function startOfUtcDay(): string {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toISOString();
}

export type Quota = {
  isPro: boolean;
  used: number;
  limit: number;
  remaining: number;
};

export async function getQuota(userId: string | null, visitorKey: string): Promise<Quota> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  let isPro = false;
  if (userId) {
    const environment = import.meta.env.PROD ? "live" : "sandbox";
    const { data } = await supabaseAdmin
      .from("subscriptions")
      .select("status, current_period_end")
      .eq("user_id", userId)
      .eq("environment", environment)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data) {
      const notExpired = !data.current_period_end || new Date(data.current_period_end) > new Date();
      isPro =
        notExpired &&
        (["active", "trialing", "past_due"].includes(data.status) ||
          (data.status === "canceled" && Boolean(data.current_period_end)));
    }
  }

  if (isPro) {
    return { isPro: true, used: 0, limit: Number.POSITIVE_INFINITY, remaining: Number.POSITIVE_INFINITY };
  }

  const since = startOfUtcDay();
  const query = supabaseAdmin
    .from("usage_logs")
    .select("id", { count: "exact", head: true })
    .gte("created_at", since);

  const { count } = userId
    ? await query.eq("user_id", userId)
    : await query.eq("visitor_key", visitorKey);

  const used = count ?? 0;
  return {
    isPro: false,
    used,
    limit: FREE_DAILY_LIMIT,
    remaining: Math.max(0, FREE_DAILY_LIMIT - used),
  };
}

export async function recordGeneration(params: {
  userId: string | null;
  visitorKey: string;
  toolSlug: string;
  input: Record<string, string>;
  output: string;
}) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  await supabaseAdmin.from("usage_logs").insert({
    user_id: params.userId,
    visitor_key: params.userId ? null : params.visitorKey,
    tool_slug: params.toolSlug,
  });

  if (params.userId) {
    await supabaseAdmin.from("generations").insert({
      user_id: params.userId,
      tool_slug: params.toolSlug,
      input: params.input,
      output: params.output,
    });
  }
}
