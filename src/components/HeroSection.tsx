import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useBookingPopup } from "@/context/BookingPopupContext";

const HeroSection = () => {
  const { openBookingPopup } = useBookingPopup();
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

      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="text-gold text-xs font-medium tracking-[0.2em] uppercase sm:text-sm">
            Premium Event Planning
          </span>
          <Sparkles className="w-4 h-4 text-gold" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 leading-tight"
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
          className="text-gold-light/95 text-sm md:text-base max-w-xl mx-auto mb-6 md:mb-8 px-4 py-3 rounded-lg bg-navy-dark/50 backdrop-blur-sm font-sans"
        >
          From dream weddings to grand corporate galas, we transform your vision
          into breathtaking reality with meticulous attention to detail.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-row flex-wrap gap-2 sm:gap-3 justify-center items-center"
        >
          <Button variant="hero" size="lg" className="text-xs sm:text-sm px-3 py-2.5 sm:px-6 sm:py-4" onClick={openBookingPopup}>
            Book Your Event
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" />
          </Button>
          <Link to="/portfolio">
            <Button variant="hero-outline" size="lg" className="text-xs sm:text-sm px-3 py-2.5 sm:px-6 sm:py-4">
              View Our Work
            </Button>
          </Link>
        </motion.div>

        {/* Stats - single row on all screen sizes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 md:mt-12 grid grid-cols-4 gap-2 sm:gap-3 md:gap-6 max-w-2xl mx-auto"
        >
          {[
            { value: "500+", label: "Events Completed" },
            { value: "12+", label: "Years Experience" },
            { value: "50+", label: "Team Members" },
            { value: "100%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center min-w-0">
              <div className="text-lg sm:text-xl md:text-2xl font-display font-bold text-gold">
                {stat.value}
              </div>
              <div className="text-gold-light/90 text-xs sm:text-sm mt-1 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
