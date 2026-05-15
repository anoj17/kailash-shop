import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function CategoryCard({
  title,
  image,
  href,
  index = 0,
}: {
  title: string;
  image: string;
  href: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.06 }}
    >
      <Link to={href} className="group block relative overflow-hidden rounded-xl shadow-soft hover-lift">
        <div className="aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-warm opacity-90 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <div className="flex items-end justify-between gap-3">
            <h3 className="font-display text-xl md:text-2xl text-cream text-balance leading-tight">{title}</h3>
            <span className="h-9 w-9 grid place-items-center rounded-full bg-cream/95 text-ink translate-y-1 group-hover:translate-y-0 transition-transform">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
