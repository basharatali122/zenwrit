export type PaymentsEnv = "sandbox" | "live";

/**
 * Single source of truth for which payment environment the *server* is in.
 *
 * Derived from the same client token the browser uses, so server-side
 * entitlement checks can never disagree with the environment the checkout
 * actually ran in (which would make paying users look like free users).
 */
export function getServerPaymentsEnv(): PaymentsEnv {
  const token =
    process.env["VITE_PAYMENTS_CLIENT_TOKEN"] ??
    (import.meta.env["VITE_PAYMENTS_CLIENT_TOKEN"] as string | undefined);

  if (typeof token === "string" && token.length > 0) {
    return token.startsWith("test_") ? "sandbox" : "live";
  }

  return import.meta.env.PROD ? "live" : "sandbox";
}
