import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteShell } from "@/components/SiteShell";
import { ProductCard } from "@/components/ProductCard";
import { products, type Product } from "@/lib/data";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Kailash Collective` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <SiteShell>
      <div className="container-wide py-32 text-center">
        <h1 className="font-display text-5xl">Piece not found</h1>
        <Link to="/shop" className="inline-block mt-6 underline">Back to the collection</Link>
      </div>
    </SiteShell>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const gallery = [product.image, product.hoverImage, product.image];
  const [main, setMain] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <SiteShell>
      <section className="container-wide pt-10 pb-20 grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16">
        <div className="grid grid-cols-[80px_1fr] gap-4">
          <div className="hidden md:flex flex-col gap-3">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setMain(i)}
                className={`aspect-[4/5] w-20 overflow-hidden rounded-md border ${main === i ? "border-maroon" : "border-border"}`}
              >
                <img src={g} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <motion.div
            key={main}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="aspect-[4/5] overflow-hidden rounded-xl bg-muted shadow-soft"
          >
            <img src={gallery[main]} alt={product.name} className="h-full w-full object-cover" />
          </motion.div>
        </div>

        <div className="lg:sticky lg:top-28 self-start">
          <p className="text-xs tracking-[0.3em] uppercase text-terracotta">{product.category}</p>
          <h1 className="font-display text-4xl md:text-5xl mt-2 leading-tight">{product.name}</h1>
          <p className="text-sm text-muted-foreground mt-2">{product.material}</p>
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-2xl font-medium">NPR {product.price.toLocaleString()}</span>
            {product.oldPrice && (
              <span className="text-base text-muted-foreground line-through">NPR {product.oldPrice.toLocaleString()}</span>
            )}
          </div>
          <p className="mt-6 text-foreground/80 leading-relaxed">{product.description}</p>

          <div className="mt-8">
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">Color</p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button key={c} className="h-9 w-9 rounded-full ring-1 ring-border hover:ring-maroon transition" style={{ background: c }} aria-label="color" />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">Size</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded-md text-sm border transition ${
                    size === s ? "border-maroon bg-maroon text-cream" : "border-border hover:border-maroon"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="inline-flex items-center border border-border rounded-full">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:text-maroon"><Minus className="h-3.5 w-3.5" /></button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-3 hover:text-maroon"><Plus className="h-3.5 w-3.5" /></button>
            </div>
            <button className="flex-1 inline-flex items-center justify-center gap-2 bg-ink text-cream rounded-full py-3.5 text-sm tracking-wider hover:bg-maroon transition">
              <ShoppingBag className="h-4 w-4" /> Add to cart
            </button>
            <button aria-label="Wishlist" className="h-12 w-12 grid place-items-center rounded-full border border-border hover:border-maroon">
              <Heart className="h-4 w-4" />
            </button>
          </div>
          <button className="mt-3 w-full bg-maroon text-cream rounded-full py-3.5 text-sm tracking-wider hover:bg-terracotta transition">
            Buy now
          </button>

          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Truck className="h-4 w-4" /> Free delivery inside Nepal on orders above NPR 5,000
          </div>

          <Accordion type="single" collapsible className="mt-8 border-t border-border">
            <AccordionItem value="details">
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent>{product.description} Cut and finished in our Kathmandu atelier.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="material">
              <AccordionTrigger>Materials & Craftsmanship</AccordionTrigger>
              <AccordionContent>{product.material}. Handworked over multiple days by master artisans.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger>Care Instructions</AccordionTrigger>
              <AccordionContent>Gentle cold wash, line dry in shade. Iron on low. Store in a breathable bag.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="delivery">
              <AccordionTrigger>Delivery & Returns</AccordionTrigger>
              <AccordionContent>3–5 business days inside Nepal · 7–14 days international · 14-day easy returns.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="container-wide pb-24">
        <h2 className="font-display text-3xl md:text-4xl mb-8">Complete the look</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </SiteShell>
  );
}
