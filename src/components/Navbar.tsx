import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo.png";
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
          ? "bg-navy-dark/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white p-1 shadow-md border border-gold/40 flex items-center justify-center shrink-0 group-hover:border-gold transition-all duration-300">
            <img
              src={logoImg}
              alt="Maharsha Events"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="hidden sm:block leading-tight">
            <span className="font-display text-lg sm:text-xl font-bold text-gradient-gold block">
              Maharsha Events
            </span>
            <span className="text-[9px] font-medium tracking-[0.18em] text-gold/80 uppercase block">
              We Curate • You Celebrate
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                location.pathname === link.path
                  ? "text-gold"
                  : "text-gold-light/70 hover:text-gold"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+917893330301"
            onClick={() => trackPhoneCall("navbar_desktop")}
            className="flex items-center gap-2 text-gold-light/70 text-sm hover:text-gold transition-colors"
          >
            <Phone className="w-4 h-4" />
            +91 7893330301
          </a>
          <Button variant="hero" size="sm" onClick={openBookingPopup}>Book Now</Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-gold-light"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy-dark/98 backdrop-blur-lg border-t border-gold/10"
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
              <Button variant="hero" size="sm" onClick={openBookingPopup} className="w-full">Book Now</Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
