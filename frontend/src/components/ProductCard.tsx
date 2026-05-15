import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link to="/products/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            src={product.hoverImage}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover scale-105 transition-transform duration-700 group-hover:scale-100"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-cream/95 text-ink text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full shadow-soft">
              {product.badge}
            </span>
          )}
          <button
            aria-label="Add to wishlist"
            className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-cream/90 hover:bg-cream transition shadow-soft"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="h-4 w-4" />
          </button>
          <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={(e) => e.preventDefault()}
              className="w-full inline-flex items-center justify-center gap-2 bg-ink/90 text-cream backdrop-blur-md py-3 rounded-md text-sm tracking-wider hover:bg-ink"
            >
              <ShoppingBag className="h-4 w-4" /> Add to cart
            </button>
          </div>
        </div>
        <div className="pt-4 pb-2">
          <h3 className="font-display text-lg leading-tight">{product.name}</h3>
          <p className="text-xs text-muted-foreground mt-1">{product.material}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-base font-medium">NPR {product.price.toLocaleString()}</span>
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through">
                NPR {product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
