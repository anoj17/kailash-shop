import { createFileRoute } from "@tanstack/react-router";
import { CategoryListing } from "./shop";

export const Route = createFileRoute("/accessories")({
  head: () => ({ meta: [{ title: "Accessories — Kailash Collective" }, { name: "description", content: "Bags, scarves and finishing pieces from Nepalese makers." }] }),
  component: () => (
    <CategoryListing
      title="Bags & Accessories"
      subtitle="Finishing pieces — bags, scarves and small leather goods."
      baseFilter={(p) => p.category === "accessories" || p.category === "jhumka"}
    />
  ),
});
