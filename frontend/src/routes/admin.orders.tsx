import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/orders")({
  component: () => (
    <div>
      <h1 className="font-display text-4xl">Orders</h1>
      <p className="text-muted-foreground mt-2">Order management coming soon.</p>
    </div>
  ),
});
