import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { User, ShoppingBag, Heart, LogOut, Edit2, Package, Sparkles, HandHeart, Leaf } from "lucide-react";
import editImg from "@/assets/edit-himalayan.jpg";
import { signOutRedux } from "@/redux/authSlice";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "My Profile — Kailash Collective" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, isAuthentication } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthentication) {
      navigate({ to: "/login" });
    }
  }, [isAuthentication, navigate]);

  if (!isAuthentication) return null;

  const userData = user?.user || {};

  const handleLogout = () => {
    dispatch(signOutRedux());
    navigate({ to: "/" });
  };

  return (
    <SiteShell>
      <div className="container-wide py-12 md:py-16 grid lg:grid-cols-[240px_1fr] gap-10 md:gap-16">
        
        {/* SIDEBAR */}
        <div className="flex flex-col h-full">
          <div className="flex flex-col items-center lg:items-start mb-10 text-center lg:text-left">
            <div className="h-20 w-20 rounded-full overflow-hidden bg-muted mb-4 ring-2 ring-maroon/10">
              {userData?.picture ? (
                <img src={userData.picture} alt={userData.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-maroon text-cream text-2xl font-display">
                  {userData?.name?.charAt(0) || "U"}
                </div>
              )}
            </div>
            <h2 className="font-display text-2xl text-maroon">Namaste, {userData?.name?.split(' ')[0] || "User"}</h2>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mt-1">Member since 2024</p>
          </div>

          <nav className="flex flex-col gap-2">
            <button className="flex items-center gap-4 px-4 py-3 bg-white shadow-sm rounded-xl text-maroon font-medium text-sm transition-all border border-maroon/10">
              <User className="h-4 w-4" /> Personal Info
            </button>
            <button className="flex items-center gap-4 px-4 py-3 text-muted-foreground hover:bg-white/50 rounded-xl font-medium text-sm transition-all hover:text-maroon">
              <ShoppingBag className="h-4 w-4" /> ORDERS
            </button>
            <button className="flex items-center gap-4 px-4 py-3 text-muted-foreground hover:bg-white/50 rounded-xl font-medium text-sm transition-all hover:text-maroon">
              <Heart className="h-4 w-4" /> WISHLIST
            </button>
          </nav>

          <div className="mt-auto pt-10">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 text-maroon/80 hover:text-maroon font-bold text-xs transition-colors uppercase tracking-widest"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex flex-col gap-8">
          
          {/* Banner */}
          <div className="relative overflow-hidden rounded-2xl aspect-[21/9] md:aspect-[3/1] bg-[#e9e3dc] shadow-sm border border-maroon/5">
            <img src={editImg} alt="Himalayan texture" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-multiply filter sepia-[0.2]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#e9e3dc] to-transparent/20" />
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-center">
              <h1 className="font-display text-4xl md:text-5xl text-maroon mb-2">Your Sanctuary</h1>
              <p className="text-muted-foreground italic text-lg max-w-md">Refining your personal collective of Himalayan elegance.</p>
            </div>
          </div>

          {/* Personal Details Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-maroon/5 p-6 md:p-8">
            <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
              <h3 className="font-display text-xl text-maroon">Personal Details</h3>
              <button className="text-xs font-semibold text-muted-foreground hover:text-maroon flex items-center gap-1 uppercase tracking-wider transition-colors">
                Edit <Edit2 className="h-3 w-3" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 font-semibold">Name</p>
                <p className="text-sm font-medium text-ink">{userData?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 font-semibold">Email Address</p>
                <p className="text-sm font-medium text-ink">{userData?.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 font-semibold">Phone</p>
                <p className="text-sm font-medium text-ink">+977 1-4235678</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 font-semibold">Shipping Address</p>
                <p className="text-sm font-medium text-ink leading-relaxed">Lazimpat, Ward No. 2<br/>Kathmandu, Nepal 44600</p>
              </div>
            </div>
          </div>

          {/* Recent Orders Card */}
          <div className="bg-[#FAF7F2] rounded-2xl shadow-sm border border-maroon/5 p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-xl text-maroon">Recent Orders</h3>
              <button className="text-xs font-semibold text-maroon hover:text-maroon/80 uppercase tracking-wider transition-colors underline underline-offset-4">
                View All
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Dummy Order 1 */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-white bg-white shadow-sm hover:shadow-md transition-all">
                <div className="h-16 w-16 bg-muted rounded-lg overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=200&h=200&fit=crop" alt="Kurtha" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-medium text-ink">Handwoven Silk Kurtha</h4>
                    <span className="text-[9px] font-bold bg-[#E8E1DA] px-2 py-1 rounded-full text-maroon uppercase tracking-widest">In Transit</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Order #KC-92841</p>
                  <div className="flex justify-between items-end">
                    <p className="text-xs text-muted-foreground">Ordered Oct 12, 2024</p>
                    <p className="font-bold text-sm text-ink">रु 12,500</p>
                  </div>
                </div>
              </div>

              {/* Dummy Order 2 */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-white bg-white shadow-sm hover:shadow-md transition-all">
                <div className="h-16 w-16 bg-muted rounded-lg overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1599643478514-4a820c56a8e0?w=200&h=200&fit=crop" alt="Jhumka" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-medium text-ink">Traditional Silk Jhumka</h4>
                    <span className="text-[9px] font-bold bg-[#E8E1DA] px-2 py-1 rounded-full text-maroon uppercase tracking-widest">Delivered</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Order #KC-91022</p>
                  <div className="flex justify-between items-end">
                    <p className="text-xs text-muted-foreground">Ordered Sep 28, 2024</p>
                    <p className="font-bold text-sm text-ink">रु 4,200</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Artisan Circle Tier */}
            <div className="mt-8 pt-6 border-t border-maroon/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0">
                  <Sparkles className="h-10 w-10 text-maroon" />
                </div>
                <div>
                  <p className="text-xs font-bold text-maroon uppercase tracking-widest">Tier: Artisan Circle</p>
                  <p className="text-[10px] text-muted-foreground">2,400 points until next reward</p>
                </div>
              </div>
              <button className="bg-[#46171d] text-white text-[10px] font-bold tracking-widest uppercase px-6 py-3 rounded-full hover:bg-ink transition-colors">
                Rewards &gt;
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#46171d] text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
              <Package className="h-6 w-6 mb-3 opacity-60" strokeWidth={1.5} />
              <h4 className="font-display text-4xl mb-2 text-[#EFE4DA]">14</h4>
              <p className="text-[10px] uppercase tracking-widest opacity-80 font-bold leading-tight">Treasures<br/>Collected</p>
            </div>
            <div className="bg-[#f2dbcb] text-[#46171d] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
              <HandHeart className="h-6 w-6 mb-3 opacity-60" strokeWidth={1.5} />
              <h4 className="font-display text-4xl mb-2">8</h4>
              <p className="text-[10px] uppercase tracking-widest opacity-80 font-bold leading-tight">Artisans<br/>Supported</p>
            </div>
            <div className="bg-[#382b0d] text-[#eed072] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
              <Leaf className="h-6 w-6 mb-3 opacity-60" strokeWidth={1.5} />
              <h4 className="font-display text-4xl mb-2">100%</h4>
              <p className="text-[10px] uppercase tracking-widest opacity-80 font-bold leading-tight">Sustainably<br/>Sourced</p>
            </div>
          </div>

        </div>
      </div>
    </SiteShell>
  );
}
