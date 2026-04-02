import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { toast } from "sonner";

export default function Cart() {
  const { state, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const shipping = cartTotal >= 499 ? 0 : 49;
  const total = cartTotal - discount + shipping;

  const applyDiscount = () => {
    if (discountCode.toUpperCase() === "MITHILA10") {
      const d = Math.round(cartTotal * 0.1);
      setDiscount(d);
      toast.success(`Code applied! ₹${d} off`);
    } else {
      toast.error("Invalid discount code");
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingCart size={48} className="mx-auto text-muted-foreground mb-4" />
        <h2 className="font-heading text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Add some delicious products from Mithila!</p>
        <Link to="/products" className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="font-heading text-3xl font-bold mb-8">Shopping Cart</h2>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {state.items.map(item => (
            <div key={item.product.id} className="flex gap-4 bg-card border border-border rounded-xl p-4">
              <Link to={`/product/${item.product.slug}`} className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-muted">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.slug}`} className="font-heading font-semibold text-foreground text-sm line-clamp-2 hover:text-primary">
                  {item.product.name}
                </Link>
                <p className="text-xs text-muted-foreground">{item.selectedWeight}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-border rounded-lg">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2 py-1 hover:bg-muted"><Minus size={14} /></button>
                    <span className="px-3 text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1 hover:bg-muted"><Plus size={14} /></button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-foreground">₹{item.product.price * item.quantity}</span>
                    <button onClick={() => { removeFromCart(item.product.id); toast("Item removed"); }} className="text-muted-foreground hover:text-destructive">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-28">
          <h3 className="font-heading font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">₹{cartTotal}</span></div>
            {discount > 0 && <div className="flex justify-between text-forest"><span>Discount</span><span>-₹{discount}</span></div>}
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-foreground">{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
            {shipping > 0 && <p className="text-xs text-muted-foreground">Add ₹{499 - cartTotal} more for free shipping</p>}
            <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground text-base">
              <span>Total</span><span>₹{total}</span>
            </div>
          </div>

          {/* Discount */}
          <div className="flex gap-2 mt-4">
            <input value={discountCode} onChange={e => setDiscountCode(e.target.value)} placeholder="Discount code" className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <button onClick={applyDiscount} className="bg-muted text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-border transition-colors">Apply</button>
          </div>

          <Link to="/checkout" className="block w-full bg-primary text-primary-foreground text-center py-3 rounded-lg font-semibold mt-4 hover:opacity-90 transition-opacity">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
