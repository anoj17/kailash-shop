import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/customers")({
  component: () => (<div><h1 className="font-display text-4xl">Customers</h1><p className="text-muted-foreground mt-2">1,943 customers across Nepal.</p></div>),
});
