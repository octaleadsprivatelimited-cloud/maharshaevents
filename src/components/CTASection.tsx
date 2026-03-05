import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useBookingPopup } from "@/context/BookingPopupContext";

const CTASection = () => {
  const { openBookingPopup } = useBookingPopup();
  return (
    <section className="relative py-28 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/images/venue.jpg')" }}
      />
      <div className="absolute inset-0 bg-navy-dark/85" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gold-light mb-6">
            Ready to Create Something
            <br />
            <span className="text-gradient-gold">Extraordinary?</span>
          </h2>
          <p className="text-gold-light/60 text-lg max-w-xl mx-auto mb-10">
            Let's bring your vision to life. Get in touch today for a free consultation
            and personalized event proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-base px-10 py-6" onClick={openBookingPopup}>
              Get a Free Quote
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <Link to="/contact">
              <Button variant="hero-outline" size="lg" className="text-base px-10 py-6">
                Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
