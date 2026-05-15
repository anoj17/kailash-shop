import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { ProductCard } from "@/components/ProductCard";
import { products, type Product } from "@/lib/data";

type Filters = {
  category: Product["category"][];
  gender: Product["gender"][];
  maxPrice: number;
};

export function CategoryListing({
  title,
  subtitle,
  baseFilter,
}: {
  title: string;
  subtitle: string;
  baseFilter: (p: Product) => boolean;
}) {
  const [filters, setFilters] = useState<Filters>({ category: [], gender: [], maxPrice: 15000 });
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    return products.filter(baseFilter).filter((p) => {
      if (filters.category.length && !filters.category.includes(p.category)) return false;
      if (filters.gender.length && !filters.gender.includes(p.gender)) return false;
      if (p.price > filters.maxPrice) return false;
      return true;
    });
  }, [filters, baseFilter]);

  return (
    <SiteShell>
      <header className="container-wide pt-12 md:pt-20 pb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-terracotta mb-3">Collection</p>
        <h1 className="font-display text-5xl md:text-6xl text-balance">{title}</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">{subtitle}</p>
      </header>

      <div className="container-wide pb-24 grid lg:grid-cols-[260px_1fr] gap-10">
        <aside className="hidden lg:block">
          <FilterPanel filters={filters} setFilters={setFilters} />
        </aside>

        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">{filtered.length} products</p>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 text-sm border border-border rounded-full px-4 py-2"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center py-20 text-muted-foreground">No products match these filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-background p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl">Filters</h3>
              <button onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            <FilterPanel filters={filters} setFilters={setFilters} />
          </div>
        </div>
      )}
    </SiteShell>
  );
}

function FilterPanel({ filters, setFilters }: { filters: Filters; setFilters: (f: Filters) => void }) {
  const toggle = <K extends "category" | "gender">(key: K, value: Filters[K][number]) => {
    const list = filters[key];
    const next = list.includes(value as never) ? list.filter((v) => v !== value) : [...list, value];
    setFilters({ ...filters, [key]: next } as Filters);
  };
  return (
    <div className="space-y-8 text-sm">
      <FilterGroup title="Category">
        {(["jhumka", "kurtha", "footwear", "accessories"] as const).map((c) => (
          <Check key={c} label={c} checked={filters.category.includes(c)} onChange={() => toggle("category", c)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Gender">
        {(["women", "men", "unisex"] as const).map((g) => (
          <Check key={g} label={g} checked={filters.gender.includes(g)} onChange={() => toggle("gender", g)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Price · Up to NPR ">
        <input
          type="range"
          min={2000}
          max={20000}
          step={500}
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-maroon"
        />
        <p className="mt-2 text-muted-foreground">Up to NPR {filters.maxPrice.toLocaleString()}</p>
      </FilterGroup>
      <FilterGroup title="Color">
        <div className="flex gap-2 flex-wrap">
          {["#5c1f1f", "#d97a3a", "#caa040", "#1a1a1a", "#f1e6c8", "#7a7268"].map((c) => (
            <button key={c} aria-label="Color" className="h-7 w-7 rounded-full ring-1 ring-border hover:ring-maroon transition" style={{ background: c }} />
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Size">
        <div className="flex gap-2 flex-wrap">
          {["XS","S","M","L","XL","40","41","42","43"].map((s) => (
            <button key={s} className="px-3 py-1.5 text-xs border border-border rounded-md hover:border-maroon">{s}</button>
          ))}
        </div>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 capitalize cursor-pointer hover:text-maroon">
      <input type="checkbox" checked={checked} onChange={onChange} className="accent-maroon" />
      {label}
    </label>
  );
}

// Default route: /shop showing everything
export const Route = createFileRoute("/shop")({
  component: () => (
    <CategoryListing
      title="The Full Collection"
      subtitle="Every piece, from jhumka to leather derbies."
      baseFilter={() => true}
    />
  ),
});
