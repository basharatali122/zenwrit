import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/zenwrit-logo.png";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { checkIsAdmin } from "@/lib/content.functions";

const NAV = [
  { to: "/check", label: "ATS Checker" },
  { to: "/resume-scanner", label: "Resume Scanner" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();
  const { data: adminCheck } = useQuery({
    queryKey: ["is-admin", user?.id ?? null],
    queryFn: () => checkIsAdmin(),
    enabled: Boolean(user),
    retry: false,
  });

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight">
          <img
            src={logo}
            alt="ZenWrit logo"
            width={32}
            height={32}
            className="size-8 shrink-0 rounded-md object-contain dark:bg-brand-foreground dark:p-0.5"
          />
          ZenWrit
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <div className="hidden items-center gap-2 md:flex">
            {!loading && user ? (
              <>
                {adminCheck?.isAdmin ? (
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/admin">Admin</Link>
                  </Button>
                ) : null}
                <Button asChild variant="ghost" size="sm">
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              </>
            ) : null}
            <Button asChild size="sm" className="bg-gold font-semibold text-gold-foreground hover:bg-gold/90">
              <Link to="/check">Check My Resume</Link>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container-page flex flex-col py-3" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
            ) : null}

            <Link
              to="/check"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-gold px-3 py-2.5 text-center text-sm font-semibold text-gold-foreground"
            >
              Check My Resume
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
