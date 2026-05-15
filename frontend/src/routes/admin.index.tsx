import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, DollarSign, Package, ShoppingBag, Users } from "lucide-react";
import { motion } from "framer-motion";
import { products } from "@/lib/data";

export const Route = createFileRoute("/admin/")({
  component: Overview,
});

const stats = [
  { label: "Revenue", value: "NPR 2,84,300", trend: "+18%", icon: DollarSign },
  { label: "Orders", value: "127", trend: "+9%", icon: ShoppingBag },
  { label: "Products", value: "84", trend: "+4", icon: Package },
  { label: "Customers", value: "1,943", trend: "+12%", icon: Users },
];

const chart = [22, 30, 28, 42, 38, 55, 48, 62, 58, 70, 65, 78];

function Overview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl">Good morning, Aarya</h1>
        <p className="mt-2 text-muted-foreground">Here's how Kailash is doing today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-card rounded-xl border border-border/60 p-5"
          >
            <div className="flex items-center justify-between">
              <span className="h-9 w-9 grid place-items-center rounded-lg bg-maroon/10 text-maroon"><s.icon className="h-4 w-4" /></span>
              <span className="text-xs text-emerald-700 inline-flex items-center gap-1">{s.trend} <ArrowUpRight className="h-3 w-3" /></span>
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.label}</p>
            <p className="font-display text-3xl mt-1">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-card rounded-xl border border-border/60 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Sales · last 12 weeks</h2>
            <select className="text-xs bg-muted rounded-md px-3 py-1.5">
              <option>Last 12 weeks</option><option>Last 6 months</option>
            </select>
          </div>
          <div className="mt-8 h-56 flex items-end gap-2">
            {chart.map((v, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${v}%` }}
                transition={{ duration: 0.6, delay: i * 0.04 }}
                className="flex-1 rounded-t-md bg-gradient-to-t from-maroon to-terracotta"
              />
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border/60 p-6">
          <h2 className="font-display text-2xl">Recent activity</h2>
          <ul className="mt-5 space-y-4 text-sm">
            {products.slice(0, 5).map((p, i) => (
              <li key={p.id} className="flex items-center gap-3">
                <img src={p.image} alt="" className="h-10 w-10 rounded-md object-cover" />
                <div className="flex-1">
                  <p className="leading-tight">{p.name}</p>
                  <p className="text-xs text-muted-foreground">Order #{1024 + i} · just now</p>
                </div>
                <span className="text-sm">NPR {p.price.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
