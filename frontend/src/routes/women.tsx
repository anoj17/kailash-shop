import { createFileRoute } from "@tanstack/react-router";
import { CategoryListing } from "./shop";

export const Route = createFileRoute("/women")({
  head: () => ({ meta: [{ title: "Women — Kailash Collective" }, { name: "description", content: "Modern Nepalese kurthas, jhumkas, footwear and accessories for women." }] }),
  component: () => (
    <CategoryListing
      title="Women"
      subtitle="Kurthas, jhumkas and accessories cut for everyday flow."
      baseFilter={(p) => p.gender === "women" || p.gender === "unisex"}
    />
  ),
});
