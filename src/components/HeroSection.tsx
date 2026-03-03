import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 via-navy-dark/60 to-navy-dark/90" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="w-5 h-5 text-gold" />
          <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
            Premium Event Planning
          </span>
          <Sparkles className="w-5 h-5 text-gold" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 leading-tight"
        >
          <span className="text-gold-light/90">Crafting</span>
          <br />
          <span className="text-gradient-gold">Unforgettable</span>
          <br />
          <span className="text-gold-light/90">Moments</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gold-light/60 text-base md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 px-2 font-sans"
        >
          From dream weddings to grand corporate galas, we transform your vision
          into breathtaking reality with meticulous attention to detail.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/booking">
            <Button variant="hero" size="lg" className="text-base px-8 py-6">
              Book Your Event
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>
          <Link to="/portfolio">
            <Button variant="hero-outline" size="lg" className="text-base px-8 py-6">
              View Our Work
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: "500+", label: "Events Completed" },
            { value: "12+", label: "Years Experience" },
            { value: "50+", label: "Team Members" },
            { value: "100%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-display font-bold text-gold">
                {stat.value}
              </div>
              <div className="text-gold-light/50 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
