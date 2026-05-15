import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Edit, Eye, Plus, Trash2, X } from "lucide-react";
import { products as seed, type Product } from "@/lib/data";

export const Route = createFileRoute("/admin/products")({
  component: ProductsAdmin,
});

function ProductsAdmin() {
  const [items, setItems] = useState<Product[]>(seed);
  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const filtered = items.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "all" || p.category === filter)
  );

  const onSave = (p: Product) => {
    setItems((prev) => {
      const exists = prev.find((x) => x.id === p.id);
      return exists ? prev.map((x) => (x.id === p.id ? p : x)) : [p, ...prev];
    });
    setOpen(false);
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl">Products</h1>
          <p className="text-muted-foreground mt-1">{items.length} pieces in your catalogue</p>
        </div>
        <button
          onClick={() => { setEditing(null); setOpen(true); }}
          className="inline-flex items-center gap-2 bg-maroon text-cream rounded-full px-5 py-2.5 text-sm hover:bg-terracotta"
        >
          <Plus className="h-4 w-4" /> Add product
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…" className="bg-card border border-border rounded-full px-4 py-2 text-sm w-64 focus:outline-none focus:border-maroon" />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-card border border-border rounded-full px-4 py-2 text-sm">
          <option value="all">All categories</option><option value="kurtha">Kurtha</option><option value="jhumka">Jhumka</option><option value="footwear">Footwear</option><option value="accessories">Accessories</option>
        </select>
      </div>

      <div className="bg-card rounded-xl border border-border/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-beige/60 text-xs uppercase tracking-[0.15em] text-muted-foreground">
              <tr>
                <th className="text-left px-5 py-4">Product</th>
                <th className="text-left px-5 py-4">Category</th>
                <th className="text-left px-5 py-4">Price</th>
                <th className="text-left px-5 py-4">Stock</th>
                <th className="text-left px-5 py-4">Status</th>
                <th className="text-right px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-beige/30 transition">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="h-12 w-12 rounded-md object-cover" />
                      <div>
                        <p>{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.material}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 capitalize">{p.category}</td>
                  <td className="px-5 py-3">NPR {p.price.toLocaleString()}</td>
                  <td className="px-5 py-3">24</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800">Active</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2 text-muted-foreground">
                      <button className="p-2 hover:text-maroon" aria-label="View"><Eye className="h-4 w-4" /></button>
                      <button onClick={() => { setEditing(p); setOpen(true); }} className="p-2 hover:text-maroon" aria-label="Edit"><Edit className="h-4 w-4" /></button>
                      <button onClick={() => setItems(items.filter((x) => x.id !== p.id))} className="p-2 hover:text-destructive" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-4 text-xs text-muted-foreground">
          <span>Showing {filtered.length} of {items.length}</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-border rounded-md hover:border-maroon">Prev</button>
            <button className="px-3 py-1.5 border border-border rounded-md hover:border-maroon">Next</button>
          </div>
        </div>
      </div>

      {open && <ProductForm initial={editing} onClose={() => setOpen(false)} onSave={onSave} />}
    </div>
  );
}

function ProductForm({ initial, onClose, onSave }: { initial: Product | null; onClose: () => void; onSave: (p: Product) => void }) {
  const [draft, setDraft] = useState<Product>(
    initial ?? {
      id: `new-${Date.now()}`,
      name: "",
      material: "",
      price: 0,
      image: "",
      hoverImage: "",
      category: "kurtha",
      gender: "women",
      colors: [],
      sizes: [],
      description: "",
    }
  );

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-ink/40">
      <div className="bg-card rounded-2xl shadow-lift w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card">
          <h2 className="font-display text-2xl">{initial ? "Edit product" : "Add product"}</h2>
          <button onClick={onClose} aria-label="Close" className="p-2"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(draft); }} className="p-6 grid md:grid-cols-2 gap-5">
          <Field label="Product name" full><input required value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className={inputCls} /></Field>
          <Field label="Category"><select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value as Product["category"] })} className={inputCls}><option value="kurtha">Kurtha</option><option value="jhumka">Jhumka</option><option value="footwear">Footwear</option><option value="accessories">Accessories</option></select></Field>
          <Field label="Gender"><select value={draft.gender} onChange={(e) => setDraft({ ...draft, gender: e.target.value as Product["gender"] })} className={inputCls}><option value="women">Women</option><option value="men">Men</option><option value="unisex">Unisex</option></select></Field>
          <Field label="Description" full><textarea rows={3} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} className={inputCls} /></Field>
          <Field label="Price (NPR)"><input type="number" value={draft.price} onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })} className={inputCls} /></Field>
          <Field label="Discount price (NPR)"><input type="number" value={draft.oldPrice ?? ""} onChange={(e) => setDraft({ ...draft, oldPrice: e.target.value ? Number(e.target.value) : undefined })} className={inputCls} /></Field>
          <Field label="Sizes (comma)"><input value={draft.sizes.join(", ")} onChange={(e) => setDraft({ ...draft, sizes: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className={inputCls} /></Field>
          <Field label="Colors (hex, comma)"><input value={draft.colors.join(", ")} onChange={(e) => setDraft({ ...draft, colors: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className={inputCls} /></Field>
          <Field label="Material"><input value={draft.material} onChange={(e) => setDraft({ ...draft, material: e.target.value })} className={inputCls} /></Field>
          <Field label="Stock quantity"><input type="number" defaultValue={24} className={inputCls} /></Field>
          <Field label="Featured"><label className="inline-flex items-center gap-2 text-sm pt-3"><input type="checkbox" className="accent-maroon" /> Show on homepage</label></Field>
          <Field label="Product images" full>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center text-sm text-muted-foreground hover:border-maroon transition">
              Drag & drop images here, or click to browse
            </div>
          </Field>

          {draft.name && (
            <div className="md:col-span-2 mt-2">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Preview</p>
              <div className="bg-beige/40 rounded-lg p-4 flex items-center gap-4">
                <div className="h-20 w-20 rounded bg-muted grid place-items-center text-xs text-muted-foreground">img</div>
                <div>
                  <p className="font-display text-xl">{draft.name}</p>
                  <p className="text-xs text-muted-foreground">{draft.material}</p>
                  <p className="text-sm mt-1">NPR {draft.price.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          <div className="md:col-span-2 flex items-center justify-end gap-3 pt-4 border-t border-border">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-full border border-border text-sm hover:border-maroon">Cancel</button>
            <button type="submit" className="px-5 py-2.5 rounded-full bg-maroon text-cream text-sm hover:bg-terracotta">Save product</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputCls = "w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-maroon";
function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
