import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { subscribeNewsletter } from "@/lib/engagement.functions";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function NewsletterSignup({
  source,
  compact = false,
  className = "",
}: {
  source: "blog_post" | "blog_listing";
  compact?: boolean;
  className?: string;
}) {
  const subscribe = useServerFn(subscribeNewsletter);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value) || value.length > 255) {
      setIsError(true);
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setIsError(false);
    try {
      const result = await subscribe({ data: { email: value, source } });
      if (result.status === "ok") {
        setStatus("done");
        setMessage("You're in! Practical resume tips coming your way.");
      } else if (result.status === "duplicate") {
        setStatus("done");
        setMessage("You're already subscribed!");
      } else {
        setStatus("idle");
        setIsError(true);
        setMessage("Something went wrong. Please try again in a moment.");
      }
    } catch {
      setStatus("idle");
      setIsError(true);
      setMessage("Something went wrong. Please try again in a moment.");
    }
  };

  return (
    <section
      className={`rounded-xl border border-border bg-surface ${compact ? "p-5 sm:p-6" : "p-6 sm:p-8"} ${className}`}
    >
      <h2 className={`font-bold ${compact ? "text-lg" : "text-xl sm:text-2xl"}`}>Get weekly resume tips</h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Practical ATS and job search advice every week. No fluff, unsubscribe anytime.
      </p>

      {status === "done" ? (
        <p className="mt-4 text-sm font-semibold text-success">{message}</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <label className="flex-1">
            <span className="sr-only">Email address</span>
            <input
              type="email"
              value={email}
              maxLength={255}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email..."
              className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </label>
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe →"}
          </button>
        </form>
      )}

      {message && status !== "done" ? (
        <p className={`mt-3 text-sm ${isError ? "text-destructive" : "text-muted-foreground"}`}>{message}</p>
      ) : null}
    </section>
  );
}
