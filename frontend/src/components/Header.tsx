import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { useSelector } from "react-redux";

const nav = [
  { to: "/women", label: "Women" },
  { to: "/men", label: "Men" },
  { to: "/jhumka", label: "Jhumka" },
  { to: "/kurtha", label: "Kurtha" },
  { to: "/footwear", label: "Footwear" },
  { to: "/accessories", label: "Accessories" },
  { to: "/stories", label: "Stories" },
  { to: "/stores", label: "Stores" },
] as const;

export function Header({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { user, isAuthentication} = useSelector((state:any) => state.auth)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);

  const solid = !transparent || scrolled;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        solid ? "bg-background/85 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <div className={`container-wide flex items-center justify-between transition-all ${scrolled ? "h-14" : "h-20"}`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="lg:hidden p-2 -ml-2 text-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Logo />
        </div>

        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {nav.map((item) => {
            const active = path.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative tracking-wide transition-colors hover:text-maroon ${
                  active ? "text-maroon" : "text-foreground/80"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-maroon transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
           <IconBtn label="Search"><Search className={`h-4 w-4 cursor-pointer ${user?.user?.email === "anojbudathoki17@gmail.com" ? "hidden" : "block"}`} /></IconBtn>
          {
            user?.user?.email === "anojbudathoki17@gmail.com" ? (
              <Link to="/admin" className="text-sm rounded-md px-3 py-2 bg-maroon transition-colors text-white">Dashboard</Link>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
          <Link to="/wishlist" className="relative p-2 hover:text-maroon transition-colors" aria-label="Wishlist">
            <Heart className="h-4 w-4 cursor-pointer" />
            <span className="absolute -top-0.5 -right-0.5 text-[10px] bg-maroon text-cream rounded-full h-4 w-4 grid place-items-center">2</span>
          </Link>
          <Link to="/cart" className="relative p-2 hover:text-maroon transition-colors" aria-label="Cart">
            <ShoppingBag className="h-4 w-4 cursor-pointer" />
            <span className="absolute -top-0.5 -right-0.5 text-[10px] bg-maroon text-cream rounded-full h-4 w-4 grid place-items-center">1</span>
          </Link>
              </div>
            )
          }
          {
            user?.user?.email === "anojbudathoki17@gmail.com" && (
              <IconBtn label="Search"><Search className={`h-4 w-4 cursor-pointer`} /></IconBtn>
            )
          }
          {
            !isAuthentication ? (
              <Link to="/login" className="relative tracking-wide text-sm transition-colors pl-2 hover:text-maroon text-foreground/80"> Login </Link>
            ) : (

              <Link to="/login" className="relative p-2 hover:text-maroon transition-colors" aria-label="Account">
                <User className="h-4 w-4 cursor-pointer" />
              </Link>
            )
          }
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-cream"
          >
            <div className="container-wide flex items-center justify-between h-20">
              <Logo />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              className="container-wide pt-8 flex flex-col gap-2"
            >
              {nav.map((n) => (
                <motion.div
                  key={n.to}
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                >
                  <Link
                    to={n.to}
                    className="block py-4 text-3xl font-display border-b border-border hover:text-maroon transition-colors"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function IconBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button aria-label={label} className="p-2 hover:text-maroon transition-colors">
      {children}
    </button>
  );
}
