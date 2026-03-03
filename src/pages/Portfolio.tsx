import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Weddings", "Corporate", "Birthdays", "Social"];

const portfolioItems = [
  { src: "/images/hero-bg.jpg", alt: "Grand wedding reception", category: "Weddings" },
  { src: "/images/corporate-event.jpg", alt: "Corporate gala", category: "Corporate" },
  { src: "/images/wedding.jpg", alt: "Outdoor ceremony", category: "Weddings" },
  { src: "/images/birthday.jpg", alt: "Birthday celebration", category: "Birthdays" },
  { src: "/images/decoration.jpg", alt: "Floral setup", category: "Weddings" },
  { src: "/images/venue.jpg", alt: "Luxury venue", category: "Social" },
  { src: "/images/hero-bg.jpg", alt: "Reception hall", category: "Corporate" },
  { src: "/images/wedding.jpg", alt: "Garden wedding", category: "Weddings" },
];

const Portfolio = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? portfolioItems : portfolioItems.filter((p) => p.category === active);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/venue.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/85 via-navy-dark/75 to-navy-dark/90" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl font-bold text-gold-light"
          >
            Our <span className="text-gradient-gold">Portfolio</span>
          </motion.h1>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === cat
                    ? "bg-gold text-accent-foreground shadow-md"
                    : "bg-secondary text-muted-foreground hover:bg-gold/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={`${item.alt}-${i}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative group overflow-hidden rounded-lg aspect-square cursor-pointer"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-navy-dark/0 group-hover:bg-navy-dark/60 transition-all duration-300 flex items-end">
                    <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-gold-light text-sm font-medium">{item.alt}</p>
                      <p className="text-gold/70 text-xs">{item.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Portfolio;
