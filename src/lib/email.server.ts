/**
 * Transactional email sender (server-only).
 *
 * Sending is gated on a verified sender domain. Until one is configured the
 * helpers no-op with a log line, so payment webhooks never fail because email
 * is not set up yet.
 */

function getSender(): string | null {
  return process.env["EMAIL_FROM"] ?? null;
}

function getResendKey(): string | null {
  return process.env["RESEND_API_KEY"] ?? null;
}

export async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ sent: boolean; reason?: string }> {
  const from = getSender();
  const apiKey = getResendKey();

  if (!from || !apiKey) {
    console.log("[email] skipped — sender domain not configured", { subject: params.subject });
    return { sent: false, reason: "not_configured" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ from, to: [params.to], subject: params.subject, html: params.html }),
    });
    if (!response.ok) {
      console.error("[email] send failed", response.status, await response.text());
      return { sent: false, reason: "provider_error" };
    }
    return { sent: true };
  } catch (error) {
    console.error("[email] send threw", error);
    return { sent: false, reason: "exception" };
  }
}

export async function sendWelcomeEmail(params: { to: string; yearly: boolean; siteUrl: string }) {
  const html = `
  <div style="font-family:'DM Sans',Helvetica,Arial,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#111827">
    <h1 style="font-size:22px;margin:0 0 12px">Welcome to ZenWrit Pro</h1>
    <p style="font-size:15px;line-height:1.6;margin:0 0 16px">
      Your ${params.yearly ? "yearly" : "monthly"} Pro subscription is active. You now have
      unlimited generations, no ads, and priority processing on every tool.
    </p>
    <p style="margin:24px 0">
      <a href="${params.siteUrl}/tools" style="background:#2563eb;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600;display:inline-block">
        Start generating
      </a>
    </p>
    <p style="font-size:13px;color:#6b7280;line-height:1.6;margin:0">
      Manage or cancel your plan anytime from your
      <a href="${params.siteUrl}/dashboard" style="color:#2563eb">dashboard</a>.
      Payments are handled by Paddle, our merchant of record.
    </p>
  </div>`;

  return sendEmail({ to: params.to, subject: "Welcome to ZenWrit Pro", html });
}
