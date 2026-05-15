import { createFileRoute } from "@tanstack/react-router";
import { CategoryListing } from "./shop";

export const Route = createFileRoute("/jhumka")({
  head: () => ({ meta: [{ title: "Jhumka Collection — Kailash Collective" }, { name: "description", content: "Hand-finished silver and oxidized jhumka earrings inspired by Nepalese temples." }] }),
  component: () => (
    <CategoryListing
      title="Jhumka Collection"
      subtitle="Hand-finished temple silver from Patan's metal artisans."
      baseFilter={(p) => p.category === "jhumka"}
    />
  ),
});
