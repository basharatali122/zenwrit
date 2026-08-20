import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { getRequest } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";

/** OpenAI provider — used in both preview and production (Vercel). */
export function createAiProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "openai",
    baseURL: "https://api.openai.com/v1",
    headers: { Authorization: `Bearer ${apiKey}` },
  });
}

/** Model tiering: Pro gets the stronger model, free users the fast one. */
export const FREE_MODEL = "gpt-4o-mini";
export const PRO_MODEL = "gpt-4o";

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

/**
 * Privacy-preserving fingerprint of the caller's IP, used as a fallback so
 * clearing localStorage does not reset the anonymous free-tier allowance.
 * Never stores the raw address.
 */
export function resolveIpHash(): string | null {
  try {
    const request = getRequest();
    const headers = request?.headers;
    if (!headers) return null;
    const raw =
      headers.get("cf-connecting-ip") ??
      headers.get("x-real-ip") ??
      headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      null;
    if (!raw) return null;
    const salt = process.env["SUPABASE_PROJECT_ID"] ?? "zenwrit";
    return createHash("sha256").update(`${salt}:${raw}`).digest("hex").slice(0, 40);
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

/**
 * All tools are free and unlimited — quota is kept only so callers keep a
 * stable shape. There is no paid plan and no daily cap.
 */
export async function getQuota(
  _userId: string | null,
  _visitorKey: string,
  _ipHash?: string | null,
): Promise<Quota> {
  return {
    isPro: true,
    used: 0,
    limit: Number.POSITIVE_INFINITY,
    remaining: Number.POSITIVE_INFINITY,
  };
}


export async function recordGeneration(params: {
  userId: string | null;
  visitorKey: string;
  ipHash?: string | null;
  toolSlug: string;
  input: Record<string, string>;
  output: string;
}) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  await supabaseAdmin.from("usage_logs").insert({
    user_id: params.userId,
    visitor_key: params.userId ? null : params.visitorKey,
    ip_hash: params.userId ? null : (params.ipHash ?? null),
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
