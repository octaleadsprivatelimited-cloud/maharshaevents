import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, ChevronDown, Sparkles, ArrowUpRight, Lock } from "lucide-react";
import { trackPhoneCall } from "@/lib/adTracking";

const FooterDropdown = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/5 pb-4 md:border-none md:pb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full md:hidden font-display text-gold-light text-base font-semibold py-1"
      >
        <span>{title}</span>
        <ChevronDown className={`w-4 h-4 text-gold transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <h4 className="hidden md:flex items-center gap-2 font-display text-gold-light font-semibold text-sm tracking-wider uppercase mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
        {title}
      </h4>
      <div className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 md:max-h-none ${open ? "max-h-96 mt-3" : "max-h-0 md:max-h-none"}`}>
        {children}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-navy-dark via-[#080d18] to-[#04070d] text-gold-light/80 border-t border-gold/15 overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-13 h-13 rounded-xl overflow-hidden bg-white/95 p-1.5 shadow-lg border border-gold/40 shrink-0 group-hover:border-gold transition-all duration-300 group-hover:scale-105">
                <img
                  src="/logo.webp"
                  alt="Maharsha Events"
                  width="40"
                  height="40"
                  loading="lazy"
                  decoding="async"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <span className="font-display text-2xl sm:text-3xl font-bold text-gradient-gold block leading-tight">
                  Maharsha Events
                </span>
                <span className="text-[11px] font-medium tracking-[0.2em] text-gold/80 uppercase block">
                  We Curate • You Celebrate
                </span>
              </div>
            </Link>

            <p className="text-gold-light/75 text-sm leading-relaxed max-w-md pt-1">
              Crafting extraordinary weddings, bespoke decor, and premier corporate galas across Hyderabad, Telangana, and Andhra Pradesh with unmatched precision and artistry.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/maharshaevents?igsh=MXRtaWhlaml1NHh6eg%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md hover:scale-110 hover:shadow-[0_0_15px_rgba(225,48,108,0.7)] transition-all duration-300 group"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/story.php?story_fbid=691540436542527&id=100070597309847&mibextid=wwXIfr&rdid=RAP1DhzZTAemEq1q#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#1877F2] flex items-center justify-center text-white shadow-md hover:scale-110 hover:shadow-[0_0_15px_rgba(24,119,242,0.7)] transition-all duration-300 group"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <FooterDropdown title="Navigation">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Services", path: "/services" },
                { label: "Our Portfolio", path: "/portfolio" },
                { label: "Testimonials", path: "/testimonials" },
                { label: "Contact Us", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-sm text-gold-light/75 hover:text-gold flex items-center gap-1.5 transition-colors group"
                >
                  <span className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold group-hover:w-2 transition-all duration-300" />
                  {item.label}
                </Link>
              ))}
            </FooterDropdown>
          </div>

          {/* Services */}
          <div>
            <FooterDropdown title="Our Expertise">
              {[
                "Destination Weddings",
                "Grand Stage Décor",
                "Corporate Conferences",
                "Thematic Birthdays",
                "Exclusive Venue Booking",
                "Sound & Entertainment",
              ].map((service) => (
                <Link
                  key={service}
                  to="/services"
                  className="text-sm text-gold-light/75 hover:text-gold flex items-center gap-1.5 transition-colors group"
                >
                  <span className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold group-hover:w-2 transition-all duration-300" />
                  {service}
                </Link>
              ))}
            </FooterDropdown>
          </div>

          {/* Contact Details */}
          <div>
            <FooterDropdown title="Reach Out">
              <a
                href="tel:+917893330301"
                onClick={() => trackPhoneCall("footer")}
                className="flex items-center gap-3 p-2.5 -mx-2.5 rounded-lg text-gold-light/80 hover:text-gold hover:bg-white/5 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-navy-dark transition-all">
                  <Phone className="w-3.5 h-3.5 text-gold group-hover:text-navy-dark" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-gold/60 block">Call Directly</span>
                  <span className="text-sm font-semibold text-gold-light group-hover:text-gold">+91 7893330301</span>
                </div>
              </a>

              <a
                href="mailto:maharshaevents2018@gmail.com"
                className="flex items-center gap-3 p-2.5 -mx-2.5 rounded-lg text-gold-light/80 hover:text-gold hover:bg-white/5 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-navy-dark transition-all">
                  <Mail className="w-3.5 h-3.5 text-gold group-hover:text-navy-dark" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] uppercase tracking-wider text-gold/60 block">Email Us</span>
                  <span className="text-sm font-medium text-gold-light truncate block group-hover:text-gold">maharshaevents2018@gmail.com</span>
                </div>
              </a>

              <div className="flex items-start gap-3 p-2.5 -mx-2.5 rounded-lg text-gold-light/75">
                <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                </div>
                <div className="text-xs leading-relaxed">
                  <span className="text-[11px] uppercase tracking-wider text-gold/60 block">Head Office</span>
                  Hemagiri Nagar, Bandlaguda Jagir, Hyderabad, Telangana 500091
                </div>
              </div>
            </FooterDropdown>
          </div>
        </div>

        {/* Bottom copyright & attribution bar */}
        <div className="border-t border-gold/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gold-light/60">
          <p className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold/70" />
            © {new Date().getFullYear()} Maharsha Events. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/admin"
              className="text-gold-light/40 hover:text-gold transition-colors inline-flex items-center gap-1 text-[11px]"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3 text-gold/60" />
              <span>Admin</span>
            </Link>
            <p>
              Designed by{" "}
              <a
                href="https://octaleads.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold font-medium hover:text-gold-light transition-colors inline-flex items-center gap-0.5"
              >
                Octaleads
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
