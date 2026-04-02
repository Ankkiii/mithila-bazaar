import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Zap, Star, MapPin, Minus, Plus, ChevronRight } from "lucide-react";
import { getProductBySlug, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const tabs = ["Description", "Ingredients", "Nutritional Info", "Shipping"];

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const [selectedWeight, setSelectedWeight] = useState(product?.weight || "");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-4xl mb-4">😕</p>
        <h2 className="font-heading text-2xl font-bold mb-2">Product not found</h2>
        <Link to="/products" className="text-primary hover:underline">← Back to shop</Link>
      </div>
    );
  }

  const images = product.images || [product.image];
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product, selectedWeight);
    toast.success(`${product.name} added to cart!`, { description: `Qty: ${quantity} · ${selectedWeight}` });
  };

  const tabContent = [
    product.description,
    product.ingredients,
    product.nutritionalInfo,
    "We ship across India via premium courier partners. Orders above ₹499 qualify for free shipping. Standard delivery takes 3-5 business days. All products are carefully packed to ensure freshness.",
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight size={14} />
        <Link to="/products" className="hover:text-foreground">Shop</Link>
        <ChevronRight size={14} />
        <span className="text-foreground line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div>
          <div className="aspect-square rounded-xl overflow-hidden bg-muted mb-3">
            <img src={images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImage ? "border-primary" : "border-border"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {product.badge && (
            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${
              product.badge === "Best Seller" ? "bg-turmeric/20 text-turmeric" : "bg-forest/20 text-forest"
            }`}>
              {product.badge}
            </span>
          )}
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">{product.name}</h2>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-turmeric text-turmeric" : "text-border"} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-foreground">₹{product.price}</span>
            {product.originalPrice && <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>}
          </div>
          <p className="text-muted-foreground mb-6 leading-relaxed">{product.shortDescription}</p>

          {/* Weight selector */}
          {product.weightOptions && (
            <div className="mb-6">
              <label className="text-sm font-medium text-foreground mb-2 block">Weight</label>
              <div className="flex flex-wrap gap-2">
                {product.weightOptions.map(w => (
                  <button key={w} onClick={() => setSelectedWeight(w)} className={`px-4 py-2 rounded-lg text-sm border transition-colors ${selectedWeight === w ? "border-primary bg-primary/10 text-primary font-medium" : "border-border hover:bg-muted text-foreground"}`}>
                    {w}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-2 block">Quantity</label>
            <div className="flex items-center border border-border rounded-lg w-fit">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-muted"><Minus size={16} /></button>
              <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2 hover:bg-muted"><Plus size={16} /></button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mb-6">
            <button onClick={handleAddToCart} className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <Link to="/cart" onClick={handleAddToCart} className="flex-1 bg-secondary text-secondary-foreground py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <Zap size={18} /> Buy Now
            </Link>
          </div>

          {/* Origin badge */}
          <div className="flex items-center gap-2 bg-forest/10 text-forest rounded-lg px-4 py-3 text-sm mb-6">
            <MapPin size={18} />
            <span className="font-medium">Sourced from Mithilanchal, Bihar</span>
          </div>

          {/* Tabs */}
          <div className="border border-border rounded-xl overflow-hidden">
            <div className="flex border-b border-border overflow-x-auto scrollbar-hide">
              {tabs.map((t, i) => (
                <button key={t} onClick={() => setActiveTab(i)} className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${i === activeTab ? "bg-primary/10 text-primary border-b-2 border-primary" : "text-muted-foreground hover:bg-muted"}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="p-4 text-sm text-foreground leading-relaxed">{tabContent[activeTab]}</div>
          </div>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-3 flex gap-2 lg:hidden z-40">
        <button onClick={handleAddToCart} className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2">
          <ShoppingCart size={16} /> Add · ₹{product.price}
        </button>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16 mb-8">
          <h3 className="font-heading text-2xl font-bold mb-6">You May Also Like</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
