import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const paymentMethods = [
  { id: "upi", label: "UPI (GPay, PhonePe, Paytm)" },
  { id: "card", label: "Credit / Debit Card" },
  { id: "netbanking", label: "Net Banking" },
  { id: "cod", label: "Cash on Delivery" },
];

export default function Checkout() {
  const { state, cartTotal, clearCart } = useCart();
  const [payment, setPayment] = useState("upi");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const shipping = cartTotal >= 499 ? 0 : 49;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
    toast.success("Order placed successfully!");
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <CheckCircle size={64} className="mx-auto text-forest mb-4" />
        <h2 className="font-heading text-3xl font-bold mb-2">Order Placed!</h2>
        <p className="text-muted-foreground mb-6">Thank you for shopping at Mithila Bazaar. Your order will be delivered in 3-5 business days.</p>
        <Link to="/products" className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="font-heading text-2xl font-bold mb-2">Nothing to checkout</h2>
        <Link to="/products" className="text-primary hover:underline">← Go shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="font-heading text-3xl font-bold mb-8">Checkout</h2>
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-heading font-bold text-lg mb-4">Delivery Address</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder="Full Name" className="col-span-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              <input required placeholder="Phone Number" type="tel" className="bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              <input required placeholder="Pincode" className="bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              <textarea required placeholder="Full Address" rows={3} className="col-span-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
              <input required placeholder="City" className="bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              <input required placeholder="State" className="bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-heading font-bold text-lg mb-4">Payment Method</h3>
            <div className="space-y-2">
              {paymentMethods.map(pm => (
                <label key={pm.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${payment === pm.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted"}`}>
                  <input type="radio" name="payment" value={pm.id} checked={payment === pm.id} onChange={() => setPayment(pm.id)} className="accent-[hsl(var(--primary))]" />
                  <span className="text-sm font-medium text-foreground">{pm.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-secondary text-secondary-foreground py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity">
            Place Order · ₹{cartTotal + shipping}
          </button>
        </div>

        {/* Summary sidebar */}
        <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-28">
          <h3 className="font-heading font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-3 mb-4">
            {state.items.map(item => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-foreground line-clamp-1 flex-1">{item.product.name} × {item.quantity}</span>
                <span className="text-foreground font-medium ml-2">₹{item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-3 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{cartTotal}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
            <div className="flex justify-between font-bold text-base border-t border-border pt-2"><span>Total</span><span>₹{cartTotal + shipping}</span></div>
          </div>
        </div>
      </form>
    </div>
  );
}
