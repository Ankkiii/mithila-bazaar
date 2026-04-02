import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/products" },
  { label: "About", to: "/about" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement Bar */}
      <div className="gradient-maroon text-secondary-foreground text-xs sm:text-sm text-center py-2 px-4">
        🌿 Free Shipping on orders above ₹499 | Use code <strong>MITHILA10</strong> for 10% off your first order
      </div>

      {/* Main Header */}
      <div className="bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          {/* Mobile Menu */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-foreground">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🪷</span>
            <div>
              <h1 className="text-xl font-heading font-bold text-maroon leading-none">Mithila Bazaar</h1>
              <p className="text-[10px] text-muted-foreground tracking-wider uppercase hidden sm:block">Pure from Mithila's Heart</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <button onClick={() => setSearchOpen(!searchOpen)} className="text-foreground hover:text-primary transition-colors">
              <Search size={20} />
            </button>
            <button className="text-foreground hover:text-primary transition-colors hidden sm:block">
              <Heart size={20} />
            </button>
            <Link to="/cart" className="relative text-foreground hover:text-primary transition-colors">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="border-t border-border bg-card px-4 py-3 animate-fade-in">
            <form onSubmit={handleSearch} className="container mx-auto flex gap-2">
              <input
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search for makhana, pickles, sweets..."
                className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-border bg-card animate-slide-in">
            {navLinks.map(l => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-3 text-foreground hover:bg-muted transition-colors border-b border-border last:border-0"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
