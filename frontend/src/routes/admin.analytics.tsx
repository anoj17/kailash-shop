import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/analytics")({
  component: () => (<div><h1 className="font-display text-4xl">Analytics</h1><p className="text-muted-foreground mt-2">Deeper insights coming soon.</p></div>),
});
