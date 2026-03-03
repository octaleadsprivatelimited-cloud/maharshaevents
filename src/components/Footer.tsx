import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy-dark border-t border-gold/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-display text-2xl font-bold text-gradient-gold">
              Maharsha Events
            </span>
            <p className="text-gold-light/50 text-sm mt-4 leading-relaxed">
              Creating unforgettable moments with elegance, precision, and passion since 2012.
            </p>
            <div className="flex gap-4 mt-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold-light/50 hover:text-gold hover:border-gold/50 transition-colors"
                  aria-label="Social media"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-gold-light font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {["About", "Services", "Portfolio", "Contact"].map((link) => (
                <Link
                  key={link}
                  to={`/${link.toLowerCase()}`}
                  className="text-gold-light/50 text-sm hover:text-gold transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-gold-light font-semibold mb-4">Services</h4>
            <div className="flex flex-col gap-3">
              {["Wedding Planning", "Corporate Events", "Birthday Parties", "Decoration", "Venue Booking"].map((s) => (
                <span key={s} className="text-gold-light/50 text-sm">{s}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-gold-light font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-4">
              <a href="tel:+1234567890" className="flex items-center gap-3 text-gold-light/50 text-sm hover:text-gold transition-colors">
                <Phone className="w-4 h-4 shrink-0" />
                +1 234 567 890
              </a>
              <a href="mailto:info@maharshaevents.com" className="flex items-center gap-3 text-gold-light/50 text-sm hover:text-gold transition-colors">
                <Mail className="w-4 h-4 shrink-0" />
                info@maharshaevents.com
              </a>
              <div className="flex items-start gap-3 text-gold-light/50 text-sm">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                123 Event Avenue, Mumbai, India
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/10 mt-12 pt-8 text-center">
          <p className="text-gold-light/30 text-sm">
            © {new Date().getFullYear()} Maharsha Events. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
