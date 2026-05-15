import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Send, Twitter, Youtube } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-cream">
      <div className="container-wide py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 max-w-md">
          <div className="text-cream"><Logo /></div>
          <p className="mt-5 text-sm text-cream/70 leading-relaxed">
            Modern Nepalese fashion — handcrafted kurthas, jhumkas, footwear and
            accessories for women and men. Designed in Kathmandu, made by hand.
          </p>
          <form className="mt-6 flex max-w-sm">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-cream/10 border border-cream/15 rounded-l-md px-4 py-3 text-sm text-cream placeholder:text-cream/50 focus:outline-none focus:border-saffron"
            />
            <button className="bg-saffron text-ink px-4 rounded-r-md hover:bg-gold transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-3 text-xs text-cream/55">
            Stay updated with new collections, fashion stories, and exclusive offers.
          </p>
        </div>

        <Col title="Shop">
          <FLink to="/women">Women</FLink>
          <FLink to="/men">Men</FLink>
          <FLink to="/jhumka">Jhumka</FLink>
          <FLink to="/footwear">Footwear</FLink>
          <FLink to="/accessories">Accessories</FLink>
        </Col>
        <Col title="Company">
          <FLink to="/stories">Stories</FLink>
          <FLink to="/stores">Stores</FLink>
          <FLink to="/admin">Admin</FLink>
          <FLink to="/login">Sign in</FLink>
        </Col>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-wide py-6 flex flex-col sm:flex-row gap-4 items-center justify-between text-xs text-cream/60">
          <p>© {new Date().getFullYear()} Kailash Collective · Privacy Policy · Terms & Conditions</p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Instagram" className="hover:text-saffron"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="hover:text-saffron"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-saffron"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="YouTube" className="hover:text-saffron"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm uppercase tracking-[0.2em] text-cream/60 mb-4">{title}</h4>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  );
}
function FLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-cream/85 hover:text-saffron transition-colors">{children}</Link>
    </li>
  );
}
