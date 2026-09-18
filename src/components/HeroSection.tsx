import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useBookingPopup } from "@/context/BookingPopupContext";

const HeroSection = () => {
  const { openBookingPopup } = useBookingPopup();
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background - non-stretched and vibrant WebP */}
      <img
        src="/images/hero-bg.webp"
        alt="Luxury wedding and event venue"
        fetchPriority="high"
        decoding="async"
        width="1024"
        height="576"
        className="absolute inset-0 w-full h-full object-cover object-top sm:object-center select-none pointer-events-none"
      />
      {/* Reduced fade overlay so the stage colors shine through clearly */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/45 via-navy-dark/30 to-navy-dark/65" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center justify-center gap-2 mb-4 bg-navy-dark/75 backdrop-blur-md px-4 py-1.5 rounded-full border border-gold/40 shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span className="text-amber-300 text-xs font-bold tracking-[0.25em] uppercase sm:text-sm">
            Premium Event Planning
          </span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
        >
          <span className="text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]">Crafting</span>
          <br />
          <span className="text-gradient-gold drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] filter brightness-110">Unforgettable</span>
          <br />
          <span className="text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]">Moments</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/95 text-sm md:text-lg max-w-2xl mx-auto mb-8 px-6 py-3.5 rounded-xl bg-navy-dark/75 backdrop-blur-md border border-gold/30 shadow-2xl font-sans leading-relaxed drop-shadow-md"
        >
          From dream weddings to grand corporate galas, we transform your vision
          into breathtaking reality with meticulous attention to detail.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-row flex-wrap gap-3.5 justify-center items-center p-2 rounded-2xl bg-navy-dark/60 backdrop-blur-md border border-gold/30 shadow-2xl max-w-fit mx-auto"
        >
          <button
            onClick={openBookingPopup}
            className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-base font-extrabold text-[#050914] bg-gradient-to-r from-[#FFF176] via-[#FFD54F] to-[#FFB300] border-2 border-white shadow-[0_10px_25px_rgba(0,0,0,0.7),0_0_20px_rgba(255,213,79,0.6)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.85),0_0_30px_rgba(255,213,79,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#050914] fill-current animate-pulse" />
            <span className="tracking-wide">Book Your Event</span>
            <ArrowRight className="w-4 h-4 text-[#050914] stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <Link to="/portfolio">
            <button
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-white/10 hover:bg-white/20 border-2 border-white/50 hover:border-gold backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span>View Our Work</span>
            </button>
          </Link>
        </motion.div>

        {/* Stats - single row with high contrast badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-10 md:mt-14 grid grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto bg-navy-dark/70 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-gold/30 shadow-2xl"
        >
          {[
            { value: "500+", label: "Events Done" },
            { value: "2018", label: "Founded" },
            { value: "50+", label: "Team Size" },
            { value: "100%", label: "Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center min-w-0">
              <div className="text-lg sm:text-2xl font-display font-bold text-amber-300 drop-shadow-md">
                {stat.value}
              </div>
              <div className="text-white/90 text-[11px] sm:text-xs mt-0.5 leading-tight font-medium">
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
