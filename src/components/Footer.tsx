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
        className="flex items-center justify-between w-full md:hidden font-sans text-slate-900 font-semibold text-sm mb-2"
      >
        {title}
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <h4 className="hidden md:block font-sans text-slate-900 font-bold text-sm tracking-wider uppercase mb-4">{title}</h4>
      <div className={`flex flex-col gap-2.5 overflow-hidden transition-all duration-300 md:max-h-none ${open ? "max-h-96 mt-2" : "max-h-0 md:max-h-none"}`}>
        {children}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white text-slate-700 border-t border-slate-200">
      <div className="container mx-auto px-4 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-1 shadow-sm border border-slate-200 shrink-0">
                <img src="/logo.png" alt="Maharsha Events Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-display text-2xl font-bold text-slate-900">
                Maharsha Events
              </span>
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed">
              Creating unforgettable moments with elegance, precision, and passion since 2012.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.instagram.com/maharshaevents?igsh=MXRtaWhlaml1NHh6eg%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#0972d3] hover:bg-slate-200 hover:border-slate-300 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/story.php?story_fbid=691540436542527&id=100070597309847&mibextid=wwXIfr&rdid=RAP1DhzZTAemEq1q#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#0972d3] hover:bg-slate-200 hover:border-slate-300 transition-colors"
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
                className="text-slate-600 text-sm hover:text-[#0972d3] hover:underline transition-colors"
              >
                {link}
              </Link>
            ))}
          </FooterDropdown>

          {/* Services */}
          <FooterDropdown title="Services">
            {["Wedding Planning", "Corporate Events", "Birthday Parties", "Decoration", "Venue Booking"].map((s) => (
              <span key={s} className="text-slate-600 text-sm hover:text-slate-900 cursor-default">
                {s}
              </span>
            ))}
          </FooterDropdown>

          {/* Contact */}
          <FooterDropdown title="Contact">
            <a
              href="tel:+917893330301"
              onClick={() => trackPhoneCall("footer")}
              className="flex items-center gap-3 text-slate-700 text-sm font-medium hover:text-[#0972d3] hover:underline transition-colors"
            >
              <Phone className="w-4 h-4 shrink-0 text-[#0972d3]" />
              +91 7893330301
            </a>
            <a
              href="mailto:info@maharshaevents.com"
              className="flex items-center gap-3 text-slate-600 text-sm hover:text-[#0972d3] hover:underline transition-colors"
            >
              <Mail className="w-4 h-4 shrink-0 text-slate-500" />
              info@maharshaevents.com
            </a>
            <div className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-slate-500" />
              Hemagiri Nagar, Shanthinagar Colony, Hydershakote, Bandlaguda Jagir, Telangana 500091
            </div>
          </FooterDropdown>
        </div>

        <div className="border-t border-slate-200 mt-12 pt-8 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} Maharsha Events. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs sm:text-sm">
            Developed by{" "}
            <a
              href="https://octaleads.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0972d3] font-medium hover:underline transition-colors"
            >
              Octaleads Pvt. Ltd.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
