import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-maroon text-cream font-display text-lg shadow-soft">
        KC
      </span>
      <span className="font-display text-xl tracking-wide">
        Kailash <span className="text-maroon">Collective</span>
      </span>
    </Link>
  );
}
