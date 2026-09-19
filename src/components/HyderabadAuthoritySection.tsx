import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, Award, Users, CheckCircle2, ArrowRight, Sparkles, HeartHandshake, Layers } from "lucide-react";
import { useBookingPopup } from "@/context/BookingPopupContext";

const features = [
  {
    icon: Layers,
    title: "100% In-House Production",
    description: "Unlike broker agencies, we own our stage truss, LED video walls, sound systems, and floral fabrication warehouses in Hyderabad.",
  },
  {
    icon: Award,
    title: "500+ Celebrations Delivered",
    description: "8+ years crafting royal weddings, Telugu muhurthams, tech conferences, and celebrity galas with 4.9-star client acclaim.",
  },
  {
    icon: HeartHandshake,
    title: "Transparent & Fixed Pricing",
    description: "Detailed itemized estimates with zero hidden surprises. Every rupee of your event budget is maximized for visual grandeur.",
  },
  {
    icon: ShieldCheck,
    title: "Dedicated Event Director",
    description: "A single senior event coordinator manages your entire timeline, vendor alignment, and day-of execution from start to finish.",
  },
];

const venues = [
  "Taj Krishna & Falaknuma Palace",
  "ITC Kohenur & ITC Kakatiya",
  "Novotel Hitec City & HICC",
  "Jubilee Hills International Centre (JHIC)",
  "Moinabad & Gandipet Luxury Farmhouses",
  "Hitex Exhibition Centre",
  "Pratap Pride & Grand Convention Halls",
  "Avasa & Park Hyatt Banjara Hills",
];

const HyderabadAuthoritySection = () => {
  const { openBookingPopup } = useBookingPopup();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#070b14] via-[#0a101d] to-[#060a12] text-white border-t border-gold/15 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Semantic SEO Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/30">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">
                #1 Event Planners in Hyderabad
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Leading Event Management Company in <span className="text-gradient-gold">Hyderabad</span>
            </h2>

            <p className="text-gold-light/80 text-base md:text-lg leading-relaxed">
              For over 8 years, <strong>Maharsha Events</strong> has stood at the forefront of luxury event management, wedding planning, and experiential production in Hyderabad. Whether orchestrating an opulent Telugu wedding at a five-star hotel, an electric Sangeet at a private Moinabad farmhouse, or an international tech summit in Hitec City, our bespoke planning brings your vision to life.
            </p>

            <p className="text-gold-light/70 text-sm md:text-base leading-relaxed">
              We eliminate the stress of coordinating multiple decorators, caterers, lighting artists, and audio-visual technicians. With our integrated in-house inventory and seasoned hospitality professionals, we deliver turnkey excellence across <strong>Banjara Hills, Jubilee Hills, Gachibowli, Secunderabad, Begumpet, and Bandlaguda Jagir</strong>.
            </p>

            {/* Why Choose Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="p-4 rounded-xl bg-white/[0.03] border border-gold/20 hover:border-gold/50 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center mb-2.5 group-hover:bg-gold transition-colors">
                      <Icon className="w-4 h-4 text-gold group-hover:text-navy-dark transition-colors" />
                    </div>
                    <h4 className="font-display font-semibold text-gold-light text-sm sm:text-base">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={openBookingPopup}
                className="px-6 py-3.5 rounded-xl font-bold text-navy-dark bg-gradient-to-r from-[#FFF176] via-[#FFD54F] to-[#FFB300] hover:scale-105 transition-all shadow-lg text-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Request Free Hyderabad Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/portfolio"
                className="px-6 py-3.5 rounded-xl font-semibold text-gold-light bg-white/5 hover:bg-white/10 border border-gold/30 hover:border-gold transition-all text-sm inline-flex items-center gap-2"
              >
                <span>Explore Recent Hyderabad Events</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Key Venues & Trust Signals */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 md:p-8 rounded-2xl bg-card/60 backdrop-blur-md border border-gold/30 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center text-gold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Trusted Venue Collaborations
                  </h3>
                  <span className="text-xs text-gold">
                    Seamless Coordination in Hyderabad's Top Venues
                  </span>
                </div>
              </div>

              <p className="text-xs text-gold-light/70 leading-relaxed mb-5">
                Having coordinated with Hyderabad’s premier hospitality venues, our production crews understand spatial acoustics, rigging points, and decor guidelines for seamless execution:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {venues.map((venue) => (
                  <div
                    key={venue}
                    className="flex items-center gap-2 p-2 rounded-lg bg-navy-dark/70 border border-gold/15 text-xs text-gold-light/85"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span className="truncate">{venue}</span>
                  </div>
                ))}
              </div>

              {/* Local Guarantee Badge */}
              <div className="mt-6 pt-5 border-t border-gold/15 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-white">Registered Local Office</div>
                  <div className="text-[11px] text-gold-light/60">Bandlaguda Jagir, Hyderabad 500091</div>
                </div>
                <Link
                  to="/contact"
                  className="text-xs text-gold hover:underline font-semibold flex items-center gap-1 shrink-0"
                >
                  Visit Office <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HyderabadAuthoritySection;
