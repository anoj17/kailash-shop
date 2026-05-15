import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, X } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { products } from "@/lib/data";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — Kailash Collective" }] }),
  component: Wishlist,
});

function Wishlist() {
  const list = products.slice(0, 2);
  return (
    <SiteShell>
      <header className="container-wide pt-16 pb-10">
        <h1 className="font-display text-5xl flex items-center gap-3"><Heart className="h-8 w-8 text-maroon" /> Wishlist</h1>
        <p className="mt-3 text-muted-foreground">{list.length} pieces saved.</p>
      </header>
      <section className="container-wide pb-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        {list.map((p) => (
          <div key={p.id} className="group relative bg-card rounded-xl overflow-hidden border border-border/60 hover-lift">
            <Link to="/products/$id" params={{ id: p.id }}>
              <div className="aspect-[4/5] overflow-hidden">
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            </Link>
            <button aria-label="Remove" className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-cream/90 hover:bg-cream"><X className="h-4 w-4" /></button>
            <div className="p-5">
              <h3 className="font-display text-xl">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.material}</p>
              <p className="mt-2">NPR {p.price.toLocaleString()}</p>
              <button className="mt-4 w-full bg-ink text-cream rounded-full py-2.5 text-sm hover:bg-maroon">Move to cart</button>
            </div>
          </div>
        ))}
      </section>
    </SiteShell>
  );
}
