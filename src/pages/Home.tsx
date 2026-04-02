import { Link } from "react-router-dom";
import { Truck, Leaf, MapPin, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, categories, getBestsellers } from "@/data/products";
import heroImage from "@/assets/hero-makhana.jpg";
import regionImage from "@/assets/mithila-region.jpg";
import { useState } from "react";

const trustPoints = [
  { icon: Leaf, title: "100% Natural", desc: "No preservatives or artificial additives" },
  { icon: MapPin, title: "Authentic Origin", desc: "Sourced directly from Mithilanchal" },
  { icon: Truck, title: "Free Shipping", desc: "On all orders above ₹499" },
  { icon: ShieldCheck, title: "Farm Fresh", desc: "From farmer to your doorstep" },
];

const testimonials = [
  { name: "Priya Sharma", location: "Delhi", text: "The makhana quality is unmatched! Reminds me of my grandmother's kitchen in Darbhanga. Truly shuddh and swadisht!", rating: 5 },
  { name: "Amit Kumar", location: "Mumbai", text: "Best sattu I've ever had outside Bihar. Mithila Bazaar brings authentic taste right to my door. Apno ka pyaar!", rating: 5 },
  { name: "Sneha Jha", location: "Bangalore", text: "The pickle set is incredible — tastes exactly like homemade. My family orders every month now!", rating: 5 },
];

export default function Home() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const bestsellers = getBestsellers().slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Premium Makhana from Mithila" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-xl">
            <span className="inline-block bg-turmeric/20 text-turmeric text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-turmeric/30">
              🌾 Straight from Mithilanchal
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-4">
              Pure Makhana from the Heart of <span className="text-turmeric">Mithila</span>
            </h2>
            <p className="text-cream/80 text-lg mb-8 leading-relaxed">
              Discover farm-fresh fox nuts, traditional pickles, and authentic Bihari delicacies — crafted with love, rooted in heritage.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/products" className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity text-base">
                Shop Now
              </Link>
              <Link to="/about" className="border border-cream/30 text-cream px-8 py-3 rounded-lg font-medium hover:bg-cream/10 transition-colors text-base">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(cat => (
              <Link
                key={cat.slug}
                to={`/products?category=${cat.slug}`}
                className="bg-background rounded-xl p-4 text-center hover:shadow-md hover:border-primary border border-border transition-all group"
              >
                <span className="text-3xl block mb-2">{cat.icon}</span>
                <h3 className="font-heading font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Points */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl font-bold text-center mb-2">Why Mithila Bazaar?</h2>
          <p className="text-muted-foreground text-center mb-8">Shuddh. Swadisht. Apno ka Pyaar.</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {trustPoints.map(tp => (
              <div key={tp.title} className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <tp.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">{tp.title}</h3>
                <p className="text-xs text-muted-foreground">{tp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl font-bold">Bestsellers</h2>
              <p className="text-muted-foreground text-sm">Our most-loved products</p>
            </div>
            <Link to="/products" className="text-primary text-sm font-medium hover:underline">View All →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {bestsellers.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* About Mithila */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={regionImage} alt="Mithilanchal Region" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="relative container mx-auto px-4 text-center max-w-2xl">
          <h2 className="font-heading text-3xl font-bold text-cream mb-4">The Land of Mithila</h2>
          <p className="text-cream/80 leading-relaxed mb-6">
            Mithilanchal — a sacred land of ancient wisdom, Madhubani art, and rich culinary heritage. 
            From the lotus ponds of Darbhanga that nurture the finest makhana to the kitchens of Madhubani 
            where timeless recipes are preserved, every product at Mithila Bazaar carries the soul of this extraordinary region.
          </p>
          <Link to="/about" className="inline-block bg-turmeric text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Discover Our Story
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl font-bold text-center mb-8">What Our Customers Say</h2>
          <div className="max-w-lg mx-auto relative">
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <div className="flex justify-center mb-3">
                {[...Array(testimonials[testimonialIdx].rating)].map((_, i) => (
                  <span key={i} className="text-turmeric">★</span>
                ))}
              </div>
              <p className="text-foreground italic mb-4 leading-relaxed">"{testimonials[testimonialIdx].text}"</p>
              <p className="font-heading font-semibold text-foreground">{testimonials[testimonialIdx].name}</p>
              <p className="text-xs text-muted-foreground">{testimonials[testimonialIdx].location}</p>
            </div>
            <div className="flex justify-center gap-3 mt-4">
              <button onClick={() => setTestimonialIdx(i => (i - 1 + testimonials.length) % testimonials.length)} className="p-2 rounded-full border border-border hover:bg-muted"><ChevronLeft size={18} /></button>
              <button onClick={() => setTestimonialIdx(i => (i + 1) % testimonials.length)} className="p-2 rounded-full border border-border hover:bg-muted"><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 gradient-turmeric">
        <div className="container mx-auto px-4 text-center max-w-lg">
          <h2 className="font-heading text-2xl font-bold text-primary-foreground mb-2">Get 10% Off Your First Order</h2>
          <p className="text-primary-foreground/80 text-sm mb-6">Subscribe to our newsletter for exclusive offers and new product launches.</p>
          <form onSubmit={e => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-card/90 border-0 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button type="submit" className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
