import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`, { description: `₹${product.price} · ${product.weight}` });
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${
            product.badge === "Best Seller" ? "bg-turmeric text-primary-foreground" :
            product.badge === "New" ? "bg-forest text-accent-foreground" :
            "bg-secondary text-secondary-foreground"
          }`}>
            {product.badge}
          </span>
        )}
        {product.originalPrice && (
          <span className="absolute top-3 right-3 bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded-full">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-1.5">
          <Star size={14} className="fill-turmeric text-turmeric" />
          <span className="text-xs font-medium text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <h3 className="font-heading font-semibold text-foreground text-sm leading-snug mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground mb-3">{product.weight}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-foreground">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className="bg-primary text-primary-foreground p-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </Link>
  );
}
