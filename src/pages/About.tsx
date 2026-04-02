import { Link } from "react-router-dom";
import { Heart, Users, Sprout } from "lucide-react";
import regionImage from "@/assets/mithila-region.jpg";

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center">
        <div className="absolute inset-0">
          <img src={regionImage} alt="Mithilanchal" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-cream mb-4">Our Story</h2>
          <p className="text-cream/80 text-lg max-w-xl mx-auto">From the sacred land of Sita Maiya to your table — a journey of heritage, purity, and love.</p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h3 className="font-heading text-3xl font-bold text-center mb-6 text-gradient-warm">Why Mithila Bazaar Exists</h3>
          <p className="text-foreground leading-relaxed text-center mb-6">
            Mithilanchal — the ancient region spanning Darbhanga, Madhubani, Saharsa, and beyond — 
            is a land overflowing with cultural richness and culinary treasures. Yet, for decades, 
            the finest products of this region remained hidden from the world.
          </p>
          <p className="text-muted-foreground leading-relaxed text-center mb-6">
            Mithila Bazaar was born to change that. We work directly with farmers, artisans, and 
            home-based producers across Mithilanchal to bring you the most authentic, fresh, and 
            pure products — from the legendary makhana of Darbhanga's ponds to the handmade pickles 
            of Madhubani's kitchens.
          </p>
          <p className="text-foreground font-heading text-xl text-center italic">
            "Every product is a piece of Mithila's soul."
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Sprout, title: "Farm to Doorstep", desc: "We source directly from farmers — no middlemen. This ensures freshness and fair prices for the people who grow your food." },
              { icon: Users, title: "Empowering Communities", desc: "Every purchase supports local farmers, women artisans, and small-scale producers across Mithilanchal." },
              { icon: Heart, title: "Pure & Authentic", desc: "No artificial preservatives, no shortcuts. Just traditional recipes and time-tested methods passed down through generations." },
            ].map(v => (
              <div key={v.title} className="bg-background rounded-xl p-8 text-center border border-border">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <v.icon className="text-primary" size={28} />
                </div>
                <h4 className="font-heading font-bold text-lg text-foreground mb-2">{v.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">👨‍🌾</div>
          <h3 className="font-heading text-2xl font-bold mb-2">Founded with Love</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Mithila Bazaar was started by a proud son of Mithilanchal who wanted to share the 
            incredible flavours and crafts of home with the world. What started as sending makhana 
            packets to friends in metro cities has grown into a mission to put Mithila on the 
            global food map — one crunchy, delicious bite at a time.
          </p>
          <Link to="/products" className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Explore Our Products
          </Link>
        </div>
      </section>

      {/* Madhubani decoration */}
      <div className="madhubani-border border-t-4 border-b-0 border-l-0 border-r-0" />
    </div>
  );
}
