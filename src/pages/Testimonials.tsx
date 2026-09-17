import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Priya Sharma", role: "Bride", text: "Maharsha Events made our dream wedding a reality. Every detail was perfect. We couldn't have asked for a better team!", rating: 5 },
  { name: "Rajesh Kumar", role: "CEO, TechCorp", text: "Our annual corporate gala was handled with utmost professionalism. The team's attention to detail exceeded expectations.", rating: 5 },
  { name: "Anita Patel", role: "Mother of the Birthday Girl", text: "The birthday party they organized was absolutely magical. Theme, decorations, activities — everything beyond imagination!", rating: 5 },
  { name: "Vikram Singh", role: "Groom", text: "From our engagement to the reception, every event was flawlessly managed. Maharsha Events is simply the best in the business.", rating: 5 },
  { name: "Meera Joshi", role: "Event Director, InnoTech", text: "They managed our product launch with incredible precision. The venue, AV setup, and guest management were top-notch.", rating: 5 },
  { name: "Sanjay Gupta", role: "Father of the Bride", text: "We trusted them with our daughter's wedding and they delivered beyond our wildest dreams. Highly recommended!", rating: 5 },
];

const Testimonials = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/corporate-event.webp')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/85 via-navy-dark/75 to-navy-dark/90" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl font-bold text-gold-light"
          >
            Client <span className="text-gradient-gold">Testimonials</span>
          </motion.h1>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-4 md:p-8 hover-lift border border-border relative"
              >
                <Quote className="w-6 h-6 md:w-10 md:h-10 text-gold/20 absolute top-3 right-3 md:top-6 md:right-6" />
                <div className="flex gap-0.5 md:gap-1 mb-2 md:mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3 h-3 md:w-4 md:h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground text-xs md:text-base leading-relaxed mb-3 md:mb-6 line-clamp-4 md:line-clamp-none">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-foreground text-sm md:text-base">{t.name}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Testimonials;
