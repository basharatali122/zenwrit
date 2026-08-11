import { resolvePaddlePrice } from "@/utils/payments.functions";

const clientToken = import.meta.env["VITE_PAYMENTS_CLIENT_TOKEN"] as string | undefined;

export const PRO_MONTHLY_PRICE_ID = "saascript_pro_monthly";
export const PRO_YEARLY_PRICE_ID = "saascript_pro_yearly";
/** @deprecated use PRO_MONTHLY_PRICE_ID */
export const PRO_PRICE_ID = PRO_MONTHLY_PRICE_ID;

export type BillingCycle = "monthly" | "yearly";

export const PRO_PRICES: Record<BillingCycle, { priceId: string; amount: string; suffix: string; note: string }> = {
  monthly: { priceId: PRO_MONTHLY_PRICE_ID, amount: "$5", suffix: "/month", note: "Billed monthly. Cancel anytime." },
  yearly: { priceId: PRO_YEARLY_PRICE_ID, amount: "$50", suffix: "/year", note: "Billed yearly — two months free." },
};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Paddle: any;
  }
}

export function getPaddleEnvironment(): "sandbox" | "live" {
  return clientToken?.startsWith("test_") ? "sandbox" : "live";
}

let paddleInitialized = false;

export async function initializePaddle() {
  if (paddleInitialized) return;

  if (!clientToken) {
    throw new Error("VITE_PAYMENTS_CLIENT_TOKEN is not set");
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.onload = () => {
      const paddleJsEnvironment = getPaddleEnvironment() === "sandbox" ? "sandbox" : "production";
      window.Paddle.Environment.set(paddleJsEnvironment);
      window.Paddle.Initialize({ token: clientToken });
      paddleInitialized = true;
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export async function getPaddlePriceId(priceId: string): Promise<string> {
  const environment = getPaddleEnvironment();
  return resolvePaddlePrice({ data: { priceId, environment } });
}
