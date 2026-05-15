import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { stores } from "@/lib/data";
import { MountainSilhouette } from "@/components/MountainSilhouette";

export const Route = createFileRoute("/stores")({
  head: () => ({ meta: [{ title: "Stores — Kailash Collective" }, { name: "description", content: "Visit our showrooms in Kathmandu, Pokhara and Lalitpur." }] }),
  component: Stores,
});

function Stores() {
  return (
    <SiteShell>
      <header className="container-wide pt-12 md:pt-20 pb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-terracotta mb-3">Visit us</p>
        <h1 className="font-display text-5xl md:text-6xl text-balance">Find a Kailash showroom.</h1>
      </header>

      <section className="container-wide pb-12 grid md:grid-cols-3 gap-5">
        {stores.map((s) => (
          <article key={s.id} className="bg-card rounded-xl border border-border/60 p-6 hover-lift">
            <h2 className="font-display text-2xl">{s.city}</h2>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-maroon" /> {s.address}</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-maroon" /> {s.phone}</p>
              <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-maroon" /> {s.hours}</p>
            </div>
            <div className="mt-5 aspect-[16/10] rounded-lg bg-beige/70 grid place-items-center text-xs text-muted-foreground">
              Map preview
            </div>
            <button className="mt-5 w-full bg-ink text-cream rounded-full py-3 text-sm tracking-wider hover:bg-maroon transition">
              Book appointment
            </button>
          </article>
        ))}
      </section>

      <section className="relative bg-beige/60 py-20 mt-12 overflow-hidden">
        <MountainSilhouette className="absolute bottom-0 left-0 right-0 h-1/2 opacity-60" />
        <div className="container-wide relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl">Virtual Shopping Consultation</h2>
          <p className="mt-4 text-muted-foreground">Book a one-on-one session with our stylist. We'll curate looks, talk fit and ship globally.</p>
          <button className="mt-6 inline-flex bg-maroon text-cream rounded-full px-7 py-3 text-sm tracking-wider hover:bg-terracotta transition">
            Schedule a session
          </button>
        </div>
      </section>
    </SiteShell>
  );
}
