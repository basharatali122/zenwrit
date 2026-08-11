import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/site/AdSlot";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { usePaddleCheckout } from "@/hooks/usePaddleCheckout";
import { PRO_PRICES, type BillingCycle } from "@/lib/paddle";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Free vs Pro ($5/month) | SaaScript" },
      {
        name: "description",
        content:
          "Compare SaaScript Free (3 AI generations per day, with ads) and Pro ($5/month, unlimited generations, no ads, priority speed). Cancel anytime.",
      },
      { property: "og:title", content: "SaaScript Pricing — Free vs Pro" },
      {
        property: "og:description",
        content: "3 free AI generations a day, or go unlimited and ad-free for $5/month.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

const ROWS = [
  { feature: "All 5 AI tools", free: true, pro: true },
  { feature: "Generations per day", free: "3", pro: "Unlimited" },
  { feature: "Ads", free: "Shown", pro: "None" },
  { feature: "Priority generation speed", free: false, pro: true },
  { feature: "Generation history", free: "Last 3", pro: "Full history" },
  { feature: "Early access to new tools", free: false, pro: true },
  { feature: "Email support", free: false, pro: true },
];

function PricingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isPro } = useSubscription(user?.id);
  const { openCheckout, loading } = usePaddleCheckout();
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const plan = PRO_PRICES[cycle];

  async function startCheckout() {
    if (!user) {
      toast.info("Create a free account first — then you can upgrade in one click.");
      navigate({ to: "/auth" });
      return;
    }
    if (isPro) {
      navigate({ to: "/dashboard" });
      return;
    }
    try {
      await openCheckout({
        priceId: plan.priceId,
        customerEmail: user.email ?? undefined,
        customData: { userId: user.id },
        successUrl: `${window.location.origin}/dashboard?checkout=success`,
      });
    } catch (error) {
      console.error(error);
      toast.error("Couldn't open checkout. Please try again.");
    }
  }

  return (
    <div>
      <PaymentTestModeBanner />
      <div className="container-page py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">Pricing</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Start free with three generations a day. Upgrade when you need volume — cancel any time.
      </p>

      <div className="mt-6 inline-flex rounded-lg border border-border bg-surface p-1" role="group" aria-label="Billing cycle">
        {(["monthly", "yearly"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setCycle(option)}
            aria-pressed={cycle === option}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
              cycle === option ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {option === "monthly" ? "Monthly" : "Yearly · 2 months free"}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="surface-panel flex flex-col p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Free</h2>
          <p className="mt-3 text-4xl font-bold">$0</p>
          <p className="mt-1 text-sm text-muted-foreground">Forever. No card required.</p>
          <ul className="mt-6 flex-1 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><Check className="size-4 text-success" /> 3 generations per day</li>
            <li className="flex gap-2"><Check className="size-4 text-success" /> All 5 tools</li>
            <li className="flex gap-2"><Check className="size-4 text-success" /> Copy to clipboard</li>
          </ul>
          <Button asChild variant="outline" className="mt-6">
            <Link to="/tools">Start free</Link>
          </Button>
        </div>

        <div className="surface-panel flex flex-col border-primary/60 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Pro</h2>
          <p className="mt-3 text-4xl font-bold">
            {plan.amount}
            <span className="text-base font-medium text-muted-foreground">{plan.suffix}</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{plan.note}</p>
          <ul className="mt-6 flex-1 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><Check className="size-4 text-success" /> Unlimited generations</li>
            <li className="flex gap-2"><Check className="size-4 text-success" /> No ads anywhere</li>
            <li className="flex gap-2"><Check className="size-4 text-success" /> Full generation history</li>
            <li className="flex gap-2"><Check className="size-4 text-success" /> Early access to new tools</li>
          </ul>
          <Button className="mt-6" onClick={startCheckout} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : null}
            {isPro ? "Manage your plan" : `Subscribe — ${plan.amount}${plan.suffix}`}
          </Button>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Secure card checkout. Cancel anytime from your dashboard.
          </p>
        </div>

        <div className="surface-panel flex flex-col p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Custom</h2>
          <p className="mt-3 text-4xl font-bold">Let's talk</p>
          <p className="mt-1 text-sm text-muted-foreground">Teams, high volume or bespoke tools.</p>
          <ul className="mt-6 flex-1 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><Check className="size-4 text-success" /> Multiple seats</li>
            <li className="flex gap-2"><Check className="size-4 text-success" /> Custom tools & prompts</li>
            <li className="flex gap-2"><Check className="size-4 text-success" /> Invoiced billing</li>
            <li className="flex gap-2"><Check className="size-4 text-success" /> Priority support</li>
          </ul>
          <Button asChild variant="outline" className="mt-6">
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>

      </div>

      <div className="mt-10">
        <AdSlot id="ad-slot-pricing" label="Ad slot — pricing" />
      </div>

      <section className="mt-10" aria-labelledby="compare">
        <h2 id="compare" className="text-2xl font-bold">
          Free vs Pro
        </h2>
        <div className="mt-4 overflow-hidden surface-panel">
          <table className="w-full text-sm">
            <caption className="sr-only">Detailed comparison of the Free and Pro plans</caption>
            <thead>
              <tr className="border-b border-border bg-surface text-left">
                <th scope="col" className="p-4 font-semibold">Feature</th>
                <th scope="col" className="p-4 font-semibold">Free</th>
                <th scope="col" className="p-4 font-semibold text-primary">Pro</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.feature} className="border-b border-border last:border-0">
                  <th scope="row" className="p-4 text-left font-medium">{row.feature}</th>
                  <td className="p-4 text-muted-foreground">
                    {row.free === true ? <Check className="size-4 text-success" aria-label="Included" /> : row.free === false ? <X className="size-4" aria-label="Not included" /> : row.free}
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {row.pro === true ? <Check className="size-4 text-success" aria-label="Included" /> : row.pro === false ? <X className="size-4" aria-label="Not included" /> : row.pro}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="pricing-faq">
        <h2 id="pricing-faq" className="text-2xl font-bold">Billing questions</h2>
        <dl className="mt-4 space-y-4 text-sm">
          <div>
            <dt className="font-semibold">Can I cancel any time?</dt>
            <dd className="mt-1 text-muted-foreground">
              Yes. Cancel from your dashboard and you keep Pro until the end of the paid period.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">When do free generations reset?</dt>
            <dd className="mt-1 text-muted-foreground">Every day at midnight UTC.</dd>
          </div>
          <div>
            <dt className="font-semibold">Do you offer refunds?</dt>
            <dd className="mt-1 text-muted-foreground">
              Yes — see our <Link to="/refund-policy" className="text-primary underline-offset-4 hover:underline">refund policy</Link>.
            </dd>
          </div>
        </dl>
      </section>
      </div>
    </div>
  );
}
