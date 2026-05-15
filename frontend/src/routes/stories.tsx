import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/SiteShell";
import { stories } from "@/lib/data";

export const Route = createFileRoute("/stories")({
  head: () => ({ meta: [{ title: "Stories — Kailash Collective" }, { name: "description", content: "Editorial features, artisan profiles, and styling notes from the Kailash atelier." }] }),
  component: Stories,
});

function Stories() {
  return (
    <SiteShell>
      <header className="container-wide pt-12 md:pt-20 pb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-terracotta mb-3">Journal</p>
        <h1 className="font-display text-5xl md:text-6xl text-balance">Stories from the atelier.</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">Fashion shoots, artisan profiles, and field notes from across Nepal.</p>
      </header>

      <div className="container-wide pb-24 columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
        {stories.map((s, i) => (
          <motion.article
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
            className="break-inside-avoid mb-6 group cursor-pointer"
          >
            <div className={`overflow-hidden rounded-xl shadow-soft hover-lift ${i % 2 ? "aspect-[3/4]" : "aspect-[4/5]"}`}>
              <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="pt-4">
              <span className="text-[10px] tracking-[0.25em] uppercase text-terracotta">{s.tag}</span>
              <h2 className="font-display text-2xl mt-2 leading-tight">{s.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.excerpt}</p>
              <p className="mt-2 text-xs text-muted-foreground">{s.date}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </SiteShell>
  );
}
