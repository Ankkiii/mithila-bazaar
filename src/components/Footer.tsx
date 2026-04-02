import { Link } from "react-router-dom";

const footerLinks = {
  Shop: [
    { label: "Makhana", to: "/products?category=makhana" },
    { label: "Pickles & Achaar", to: "/products?category=pickles" },
    { label: "Sweets", to: "/products?category=sweets" },
    { label: "Spices", to: "/products?category=spices" },
  ],
  Company: [
    { label: "About Us", to: "/about" },
    { label: "Our Story", to: "/about" },
    { label: "Contact", to: "/about" },
  ],
  Help: [
    { label: "FAQ", to: "/" },
    { label: "Shipping Policy", to: "/" },
    { label: "Returns & Refunds", to: "/" },
    { label: "Privacy Policy", to: "/" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-warm-brown text-cream">
      <div className="madhubani-border border-t-4 border-b-0 border-l-0 border-r-0" />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🪷</span>
              <div>
                <h3 className="font-heading text-xl font-bold text-turmeric">Mithila Bazaar</h3>
                <p className="text-xs text-gold-light tracking-wider">Pure from Mithila's Heart</p>
              </div>
            </div>
            <p className="text-sm text-cream/70 mb-4 leading-relaxed">
              Bringing the authentic flavours and crafts of Mithilanchal to your doorstep. Every product tells a story of tradition, purity, and love.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-cream/60 hover:text-turmeric transition-colors text-sm">Instagram</a>
              <a href="#" className="text-cream/60 hover:text-turmeric transition-colors text-sm">Facebook</a>
              <a href="#" className="text-cream/60 hover:text-turmeric transition-colors text-sm">WhatsApp</a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-turmeric mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map(l => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-cream/60 hover:text-cream transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-cream/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/40">© 2026 Mithila Bazaar. All rights reserved.</p>
          <div className="flex items-center gap-3 text-xs text-cream/50">
            <span className="bg-cream/10 px-2 py-1 rounded">UPI</span>
            <span className="bg-cream/10 px-2 py-1 rounded">Visa</span>
            <span className="bg-cream/10 px-2 py-1 rounded">Mastercard</span>
            <span className="bg-cream/10 px-2 py-1 rounded">COD</span>
          </div>
          <p className="text-xs text-cream/40">Made with ❤️ in Mithila, Bihar</p>
        </div>
      </div>
    </footer>
  );
}
