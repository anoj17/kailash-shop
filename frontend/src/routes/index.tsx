import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, ScissorsLineDashed, Gift, Sparkles, Wrench } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { MountainSilhouette } from "@/components/MountainSilhouette";
import { categories, products } from "@/lib/data";
import heroImg from "@/assets/hero-women.jpg";
import editImg from "@/assets/edit-himalayan.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kailash Collective — Modern Nepalese Fashion" },
      { name: "description", content: "Crafted for everyday elegance. Modern Nepalese kurthas, jhumkas, footwear and accessories for women and men." },
      { property: "og:title", content: "Kailash Collective — Modern Nepalese Fashion" },
      { property: "og:description", content: "Crafted for everyday elegance. Modern Nepalese kurthas, jhumkas, footwear and accessories for women and men." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteShell transparentHeader>
      <Hero />
      <CategoriesSection />
      <FeaturedEdit />
      <BestSellers />
      <ServicesStrip />
    </SiteShell>
  );
}

function Hero() {
  return (
    <section className="relative -mt-[7.25rem] min-h-[100svh] flex items-end overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0">
        <img src={heroImg} alt="" className="h-full w-full object-cover object-center opacity-95" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/30 via-cream/0 to-ink/55" />
        <MountainSilhouette className="absolute bottom-0 left-0 right-0 h-[40%] w-full" />
      </div>

      {/* floating ornaments */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-10 hidden md:block h-24 w-24 rounded-full bg-saffron/30 blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-44 left-16 hidden md:block h-32 w-32 rounded-full bg-maroon/30 blur-3xl"
      />

      <div className="container-wide relative z-10 pb-24 md:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-cream/85 text-xs tracking-[0.3em] uppercase mb-5"
        >
          Spring · Summer 2026 · Lookbook
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream text-balance max-w-4xl leading-[1.02]"
        >
          Crafted for <em className="not-italic text-saffron">everyday</em> elegance.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl text-cream/85 text-base md:text-lg"
        >
          Modern Nepalese fashion for women and men — handwoven, hand-finished,
          made to be worn every day.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Link
            to="/women"
            className="group inline-flex items-center gap-2 bg-cream text-ink rounded-full px-7 py-3.5 text-sm tracking-wider hover:bg-saffron transition-colors"
          >
            Shop Women <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/men"
            className="group inline-flex items-center gap-2 border border-cream/50 text-cream rounded-full px-7 py-3.5 text-sm tracking-wider hover:bg-cream hover:text-ink transition-colors"
          >
            Shop Men <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1, duration: 0.8 }, y: { duration: 2.2, repeat: Infinity } }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-cream/80 flex flex-col items-center text-[10px] tracking-[0.3em] uppercase"
      >
        Scroll <ChevronDown className="h-4 w-4 mt-1" />
      </motion.div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="container-wide py-24 md:py-32">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-terracotta mb-3">Shop by category</p>
          <h2 className="font-display text-4xl md:text-5xl max-w-xl text-balance">
            Heritage textures, contemporary cuts.
          </h2>
        </div>
        <Link to="/women" className="text-sm tracking-wider underline-offset-4 hover:underline">
          Browse the full collection →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((c, i) => (
          <CategoryCard key={c.slug} title={c.title} image={c.image} href={c.href} index={i} />
        ))}
      </div>
    </section>
  );
}

function FeaturedEdit() {
  const featured = products.slice(0, 4);
  return (
    <section className="bg-beige/60 py-24 md:py-32">
      <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-lift">
            <img src={editImg} alt="The Himalayan Street Edit" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden md:block bg-cream rounded-xl shadow-lift px-5 py-4">
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground">Edit 04</p>
            <p className="font-display text-2xl">SS · 2026</p>
          </div>
        </motion.div>

        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-terracotta mb-3">Featured edit</p>
          <h2 className="font-display text-4xl md:text-5xl text-balance leading-tight">
            The Himalayan Street Edit
          </h2>
          <p className="mt-5 text-muted-foreground max-w-md leading-relaxed">
            A capsule of pieces designed for the rhythm of Kathmandu — handwoven cotton,
            oxidized silver, and earth-tone leather that move from gallery openings to
            mountain weekends.
          </p>
          <Link
            to="/women"
            className="mt-8 inline-flex items-center gap-2 bg-ink text-cream rounded-full px-6 py-3 text-sm tracking-wider hover:bg-maroon transition-colors"
          >
            Explore collection <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {featured.map((p) => (
              <Link key={p.id} to="/products/$id" params={{ id: p.id }} className="group">
                <div className="aspect-square overflow-hidden rounded-md bg-muted">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <p className="mt-2 text-xs leading-tight line-clamp-2">{p.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BestSellers() {
  return (
    <section className="container-wide py-24 md:py-32">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-terracotta mb-3">Bestsellers</p>
          <h2 className="font-display text-4xl md:text-5xl">Loved this season</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
        {products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

function ServicesStrip() {
  const items = [
    { icon: ScissorsLineDashed, title: "Custom Tailoring", desc: "Bespoke fits made by Kathmandu's masters." },
    { icon: Gift, title: "Gift Packaging", desc: "Hand-folded cotton wraps with khata ribbon." },
    { icon: Sparkles, title: "Personalized Embroidery", desc: "Initials, motifs, and small dedications." },
    { icon: Wrench, title: "Repair & Care", desc: "Lifetime mending for every leather piece." },
  ];
  return (
    <section className="container-wide pb-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="bg-card rounded-xl p-6 hover-lift border border-border/60"
          >
            <Icon className="h-6 w-6 text-maroon" />
            <h3 className="mt-4 font-display text-xl">{title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{desc}</p>
            <button className="mt-4 text-xs tracking-[0.2em] uppercase text-maroon hover:text-terracotta">Learn more →</button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
