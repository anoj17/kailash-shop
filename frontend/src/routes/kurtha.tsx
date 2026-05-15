import { createFileRoute } from "@tanstack/react-router";
import { CategoryListing } from "./shop";

export const Route = createFileRoute("/kurtha")({
  head: () => ({ meta: [{ title: "Kurtha Collection — Kailash Collective" }, { name: "description", content: "Embroidered, handloom and festival kurthas for women and men." }] }),
  component: () => (
    <CategoryListing
      title="Kurtha Collection"
      subtitle="From handloom cotton to silk-blend festival sets."
      baseFilter={(p) => p.category === "kurtha"}
    />
  ),
});
