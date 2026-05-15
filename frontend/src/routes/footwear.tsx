import { createFileRoute } from "@tanstack/react-router";
import { CategoryListing } from "./shop";

export const Route = createFileRoute("/footwear")({
  head: () => ({ meta: [{ title: "Footwear — Kailash Collective" }, { name: "description", content: "Handmade leather shoes and ethnic sneakers, finished in Bhaktapur." }] }),
  component: () => (
    <CategoryListing
      title="Footwear"
      subtitle="Goodyear-welted leather and embroidered everyday sneakers."
      baseFilter={(p) => p.category === "footwear"}
    />
  ),
});
