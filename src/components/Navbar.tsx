import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo.webp";
import { useBookingPopup } from "@/context/BookingPopupContext";
import { trackPhoneCall } from "@/lib/adTracking";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Contact", path: "/contact" },
];

const socialLinks = {
  instagram: "https://www.instagram.com/maharshaevents?igsh=MXRtaWhlaml1NHh6eg%3D%3D",
  facebook: "https://www.facebook.com/story.php?story_fbid=691540436542527&id=100070597309847&mibextid=wwXIfr&rdid=RAP1DhzZTAemEq1q#",
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { openBookingPopup } = useBookingPopup();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-dark/95 backdrop-blur-md shadow-2xl py-3 border-b border-gold/20"
          : "bg-gradient-to-b from-navy-dark/90 via-navy-dark/60 to-transparent backdrop-blur-[2px] py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white p-1 shadow-lg border-2 border-gold flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-300">
            <img
              src={logoImg}
              alt="Maharsha Events"
              width="44"
              height="44"
              decoding="async"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="hidden sm:block leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <span className="font-display text-lg sm:text-xl font-bold text-gradient-gold block drop-shadow-md">
              Maharsha Events
            </span>
            <span className="text-[9px] font-semibold tracking-[0.2em] text-amber-300 uppercase block">
              We Curate • You Celebrate
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7 bg-navy-dark/60 backdrop-blur-md px-6 py-2 rounded-full border border-gold/30 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold tracking-wide transition-all duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] ${
                location.pathname === link.path
                  ? "text-gold font-bold scale-105"
                  : "text-white/90 hover:text-gold hover:scale-105"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Socials & CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Social Icons */}
          <div className="flex items-center gap-1.5 bg-navy-dark/50 backdrop-blur-sm p-1 rounded-full border border-white/10">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center text-gold-light/80 hover:text-white hover:bg-gold/30 transition-all duration-200"
              aria-label="Follow Maharsha Events on Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center text-gold-light/80 hover:text-white hover:bg-gold/30 transition-all duration-200"
              aria-label="Follow Maharsha Events on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>

          <a
            href="tel:+917893330301"
            onClick={() => trackPhoneCall("navbar_desktop")}
            className="flex items-center gap-2 text-white font-medium text-sm hover:text-gold transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-navy-dark/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10"
          >
            <Phone className="w-4 h-4 text-gold" />
            +91 7893330301
          </a>
          <Button variant="hero" size="sm" onClick={openBookingPopup} className="shadow-lg shadow-gold/20 font-semibold">
            Book Now
          </Button>
        </div>

        {/* Mobile Header Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Socials in Header */}
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-navy-dark/70 border border-gold/30 flex items-center justify-center text-gold hover:text-white hover:bg-gold/40 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-3.5 h-3.5" />
          </a>
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-navy-dark/70 border border-gold/30 flex items-center justify-center text-gold hover:text-white hover:bg-gold/40 transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white bg-navy-dark/70 p-2 rounded-lg border border-gold/30 ml-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy-dark/98 backdrop-blur-lg border-t border-gold/10 px-4"
          >
            <nav className="flex flex-col items-center gap-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium ${
                    location.pathname === link.path ? "text-gold" : "text-gold-light/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Social Icons in mobile expanded menu */}
              <div className="flex items-center gap-3 pt-2 pb-1">
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-gold/30 text-xs font-medium text-gold hover:text-white hover:bg-gold transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-gold/30 text-xs font-medium text-gold hover:text-white hover:bg-gold transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </a>
              </div>

              <a
                href="tel:+917893330301"
                onClick={() => trackPhoneCall("navbar_mobile")}
                className="flex items-center gap-2 text-white font-medium text-sm bg-navy-dark/70 border border-gold/30 px-5 py-2 rounded-full mt-1"
              >
                <Phone className="w-4 h-4 text-gold" />
                +91 7893330301
              </a>

              <Button variant="hero" size="sm" onClick={openBookingPopup} className="w-full mt-2 font-semibold">
                Book Now
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
