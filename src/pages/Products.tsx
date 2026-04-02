import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const priceRanges = [
  { label: "Under ₹150", min: 0, max: 150 },
  { label: "₹150 - ₹250", min: 150, max: 250 },
  { label: "₹250 - ₹400", min: 250, max: 400 },
  { label: "Above ₹400", min: 400, max: Infinity },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilters, setMobileFilters] = useState(false);

  const activeCategory = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";
  const [priceRange, setPriceRange] = useState<{ min: number; max: number; label: string } | null>(null);

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory) result = result.filter(p => p.category === activeCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (priceRange) result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
    return result;
  }, [activeCategory, searchQuery, priceRange]);

  const setCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams);
    if (cat) params.set("category", cat); else params.delete("category");
    params.delete("search");
    setSearchParams(params);
  };

  const Filters = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-semibold mb-3">Category</h3>
        <div className="space-y-1.5">
          <button onClick={() => setCategory("")} className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${!activeCategory ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"}`}>
            All Products
          </button>
          {categories.map(c => (
            <button key={c.slug} onClick={() => setCategory(c.slug)} className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${activeCategory === c.slug ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"}`}>
              {c.icon} {c.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-heading font-semibold mb-3">Price Range</h3>
        <div className="space-y-1.5">
          <button onClick={() => setPriceRange(null)} className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${!priceRange ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"}`}>
            All Prices
          </button>
          {priceRanges.map(pr => (
            <button key={pr.label} onClick={() => setPriceRange(pr)} className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${priceRange?.label === pr.label ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"}`}>
              {pr.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="font-heading text-3xl font-bold">
          {searchQuery ? `Results for "${searchQuery}"` : activeCategory ? categories.find(c => c.slug === activeCategory)?.name || "Shop" : "All Products"}
        </h2>
        <p className="text-muted-foreground text-sm mt-1">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Mobile filter toggle */}
      <button onClick={() => setMobileFilters(true)} className="lg:hidden flex items-center gap-2 text-sm font-medium border border-border rounded-lg px-4 py-2 mb-4 hover:bg-muted">
        <SlidersHorizontal size={16} /> Filters
      </button>

      {/* Mobile filter drawer */}
      {mobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setMobileFilters(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-card p-6 overflow-y-auto animate-slide-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-lg">Filters</h3>
              <button onClick={() => setMobileFilters(false)}><X size={20} /></button>
            </div>
            <Filters />
          </div>
        </div>
      )}

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <Filters />
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-muted-foreground">No products found. Try a different filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
