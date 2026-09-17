import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, ChevronDown } from "lucide-react";
import { trackPhoneCall } from "@/lib/adTracking";

const FooterDropdown = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full md:hidden font-display text-gold-light font-semibold mb-2"
      >
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <h4 className="hidden md:block font-display text-gold-light font-semibold mb-4">{title}</h4>
      <div className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 md:max-h-none ${open ? "max-h-96 mt-2" : "max-h-0 md:max-h-none"}`}>
        {children}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy-dark border-t border-gold/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-1 shadow-md border border-gold/30 shrink-0">
                <img src="/logo.png" alt="Maharsha Events Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-display text-2xl font-bold text-gradient-gold">
                Maharsha Events
              </span>
            </Link>
            <p className="text-gold-light/80 text-sm mt-3 leading-relaxed">
              Creating unforgettable moments with elegance, precision, and passion since 2012.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/maharshaevents?igsh=MXRtaWhlaml1NHh6eg%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold-light/80 hover:text-gold hover:border-gold/50 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/story.php?story_fbid=691540436542527&id=100070597309847&mibextid=wwXIfr&rdid=RAP1DhzZTAemEq1q#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold-light/80 hover:text-gold hover:border-gold/50 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <FooterDropdown title="Quick Links">
            {["About", "Services", "Portfolio", "Contact"].map((link) => (
              <Link
                key={link}
                to={`/${link.toLowerCase()}`}
                className="text-gold-light/80 text-sm hover:text-gold transition-colors"
              >
                {link}
              </Link>
            ))}
          </FooterDropdown>

          {/* Services */}
          <FooterDropdown title="Services">
            {["Wedding Planning", "Corporate Events", "Birthday Parties", "Decoration", "Venue Booking"].map((s) => (
              <span key={s} className="text-gold-light/80 text-sm">{s}</span>
            ))}
          </FooterDropdown>

          {/* Contact */}
          <FooterDropdown title="Contact">
            <a
              href="tel:+917893330301"
              onClick={() => trackPhoneCall("footer")}
              className="flex items-center gap-3 text-gold-light/80 text-sm hover:text-gold transition-colors"
            >
              <Phone className="w-4 h-4 shrink-0" />
              +91 7893330301
            </a>
            <a href="mailto:info@maharshaevents.com" className="flex items-center gap-3 text-gold-light/80 text-sm hover:text-gold transition-colors">
              <Mail className="w-4 h-4 shrink-0" />
              info@maharshaevents.com
            </a>
            <div className="flex items-start gap-3 text-gold-light/80 text-sm">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
              Hemagiri Nagar, Shanthinagar Colony, Hydershakote, Bandlaguda Jagir, Telangana 500091
            </div>
          </FooterDropdown>
        </div>

        <div className="border-t border-gold/10 mt-12 pt-8 text-center">
          <p className="text-gold-light/70 text-sm">
            © {new Date().getFullYear()} Maharsha Events. All rights reserved. Developed by{" "}
            <a href="https://octaleads.com" target="_blank" rel="noopener noreferrer" className="text-gold/80 hover:text-gold transition-colors">
              Octaleads Pvt. Ltd.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
