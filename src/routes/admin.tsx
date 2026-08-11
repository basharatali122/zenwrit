import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { checkIsAdmin } from "@/lib/content.functions";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — SaaScript" },
      { name: "description", content: "Manage SaaScript tools and blog posts." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["is-admin", user?.id ?? null],
    queryFn: () => checkIsAdmin(),
    enabled: Boolean(user),
    retry: false,
  });

  const denied = !loading && (!user || (!isLoading && data && !data.isAdmin));

  useEffect(() => {
    if (denied) navigate({ to: "/" });
  }, [denied, navigate]);

  if (loading || (user && isLoading)) {
    return <div className="container-page py-20 text-sm text-muted-foreground">Checking access…</div>;
  }

  if (!data?.isAdmin) {
    return <div className="container-page py-20 text-sm text-muted-foreground">Redirecting…</div>;
  }

  return (
    <div className="container-page py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold sm:text-3xl">Content admin</h1>
        <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
          Dashboard
        </Link>
      </div>
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
}
