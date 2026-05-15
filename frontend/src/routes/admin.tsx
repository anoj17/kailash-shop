import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Package, ShoppingBag, Users, BarChart3, LogOut, Search } from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · Kailash Collective" }] }),
  component: AdminLayout,
});

const nav: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

function AdminLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen bg-beige/30 grid lg:grid-cols-[260px_1fr]">
      <aside className="border-r border-border bg-cream/80 backdrop-blur-md">
        <div className="px-6 py-6 border-b border-border"><Logo /></div>
        <nav className="p-3 space-y-1">
          {nav.map(({ to, label, icon: Icon, exact }) => {
            const active = exact ? path === to : path.startsWith(to);
            return (
              <Link
                key={to}
                to={to as "/admin"}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition ${
                  active ? "bg-maroon text-cream" : "text-foreground/80 hover:bg-beige"
                }`}
              >
                <Icon className="h-4 w-4" /> {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 mt-auto">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:text-maroon">
            <LogOut className="h-4 w-4" /> Back to store
          </Link>
        </div>
      </aside>

      <div className="flex flex-col">
        <header className="h-16 px-6 border-b border-border bg-cream/80 backdrop-blur-md flex items-center justify-between">
          <div className="relative max-w-md w-full">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search products, orders, customers…" className="w-full bg-muted/60 border-0 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/30" />
          </div>
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 grid place-items-center rounded-full bg-maroon text-cream text-sm font-display">A</span>
          </div>
        </header>
        <main className="p-6 lg:p-10"><Outlet /></main>
      </div>
    </div>
  );
}
