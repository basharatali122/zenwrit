import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitContactMessage } from "@/lib/contact.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact ZenWrit — Support & Feedback" },
      {
        name: "description",
        content: "Questions about billing, a bug to report or a tool you'd like us to build? Get in touch with the ZenWrit team.",
      },
      { property: "og:title", content: "Contact ZenWrit" },
      { property: "og:description", content: "Support, billing questions and tool requests." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const send = useServerFn(submitContactMessage);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setBusy(true);
    try {
      await send({
        data: {
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          message: String(formData.get("message") ?? ""),
        },
      });
      setSent(true);
      form.reset();
      toast.success("Thanks — we'll get back to you shortly.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not send your message.");
    } finally {
      setBusy(false);
    }
  }


  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">Contact us</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Billing questions, bug reports and tool requests all land in the same inbox. We usually reply
        within two business days. You can also email{" "}
        <a href="mailto:support@zenwrit.app" className="text-primary hover:underline">
          support@zenwrit.app
        </a>
        .
      </p>

      <form
        className="mt-8 max-w-lg space-y-4 surface-panel p-6"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
          toast.success("Thanks — we'll get back to you shortly.");
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="name">Your name</Label>
          <Input id="name" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" rows={5} required />
        </div>
        <Button type="submit" disabled={sent}>
          {sent ? "Message sent" : "Send message"}
        </Button>
      </form>
    </div>
  );
}
