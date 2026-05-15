import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { products } from "@/lib/data";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Kailash Collective" }] }),
  component: Cart,
});

const steps = ["Bag", "Information", "Shipping", "Payment"];

function Cart() {
  const [items, setItems] = useState(
    products.slice(0, 2).map((p) => ({ ...p, qty: 1 }))
  );
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 5000 ? 0 : 350;

  return (
    <SiteShell>
      <header className="container-wide pt-12 pb-8">
        <h1 className="font-display text-5xl">Your bag</h1>
        <ol className="mt-6 flex items-center gap-3 text-xs tracking-[0.2em] uppercase">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <span className={`h-6 w-6 grid place-items-center rounded-full ${i === 0 ? "bg-maroon text-cream" : "bg-beige text-muted-foreground"}`}>{i + 1}</span>
              <span className={i === 0 ? "text-foreground" : "text-muted-foreground"}>{s}</span>
              {i < steps.length - 1 && <span className="w-8 h-px bg-border" />}
            </li>
          ))}
        </ol>
      </header>

      <section className="container-wide pb-24 grid lg:grid-cols-[1fr_360px] gap-12">
        <div className="divide-y divide-border">
          {items.map((it) => (
            <div key={it.id} className="py-6 flex gap-5">
              <Link to="/products/$id" params={{ id: it.id }} className="aspect-[4/5] w-28 overflow-hidden rounded-md bg-muted shrink-0">
                <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl">{it.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{it.material} · Size {it.sizes[0]}</p>
                  </div>
                  <button onClick={() => setItems(items.filter((x) => x.id !== it.id))} aria-label="Remove" className="text-muted-foreground hover:text-maroon"><X className="h-4 w-4" /></button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="inline-flex items-center border border-border rounded-full">
                    <button className="p-2" onClick={() => setItems(items.map((x) => x.id === it.id ? { ...x, qty: Math.max(1, x.qty - 1) } : x))}><Minus className="h-3 w-3" /></button>
                    <span className="w-8 text-center text-sm">{it.qty}</span>
                    <button className="p-2" onClick={() => setItems(items.map((x) => x.id === it.id ? { ...x, qty: x.qty + 1 } : x))}><Plus className="h-3 w-3" /></button>
                  </div>
                  <p className="font-medium">NPR {(it.price * it.qty).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">Your bag is empty.</p>
              <Link to="/shop" className="mt-4 inline-block underline">Continue shopping →</Link>
            </div>
          )}
        </div>

        <aside className="bg-card rounded-xl border border-border/60 p-6 h-fit lg:sticky lg:top-28">
          <h3 className="font-display text-2xl">Order summary</h3>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>NPR {subtotal.toLocaleString()}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "Free" : `NPR ${shipping}`}</dd></div>
          </dl>
          <div className="mt-4 flex gap-2">
            <input placeholder="Promo code" className="flex-1 bg-muted rounded-md px-3 py-2 text-sm focus:outline-none" />
            <button className="px-4 rounded-md bg-ink text-cream text-sm">Apply</button>
          </div>
          <div className="mt-6 pt-6 border-t border-border flex justify-between text-base font-medium">
            <span>Total</span><span>NPR {(subtotal + shipping).toLocaleString()}</span>
          </div>
          <button className="mt-6 w-full bg-maroon text-cream rounded-full py-3.5 text-sm tracking-wider hover:bg-terracotta transition">
            Checkout
          </button>
        </aside>
      </section>
    </SiteShell>
  );
}
