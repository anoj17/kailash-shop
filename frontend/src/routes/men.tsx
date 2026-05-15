import { createFileRoute } from "@tanstack/react-router";
import { CategoryListing } from "./shop";

export const Route = createFileRoute("/men")({
  head: () => ({ meta: [{ title: "Men — Kailash Collective" }, { name: "description", content: "Cotton kurthas, leather footwear and modern essentials for men." }] }),
  component: () => (
    <CategoryListing
      title="Men"
      subtitle="Modern kurthas and handcrafted leather, made for the long wear."
      baseFilter={(p) => p.gender === "men" || p.gender === "unisex"}
    />
  ),
});
