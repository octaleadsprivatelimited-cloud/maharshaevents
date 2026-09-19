import { motion } from "framer-motion";
import { MapPin, Sparkles, Building2, Landmark, Waves, TreePine } from "lucide-react";

const hyderabadLocalities = [
  {
    name: "Jubilee Hills & Banjara Hills",
    tag: "High-End & Luxury",
    desc: "Bespoke designer weddings, VIP reception stages, and high-profile social galas.",
    icon: Landmark,
  },
  {
    name: "Gachibowli & Hitec City",
    tag: "Corporate & Tech Corridors",
    desc: "MNC corporate conferences, tech summits, award ceremonies, and 5-star hotel receptions.",
    icon: Building2,
  },
  {
    name: "Secunderabad & Begumpet",
    tag: "Heritage & Traditional",
    desc: "Authentic Vedic Telugu muhurthams, traditional mandapams, and convention hall setups.",
    icon: Landmark,
  },
  {
    name: "Bandlaguda Jagir & Shamshabad",
    tag: "Farmhouse & Airport Corridor",
    desc: "Open lawn receptions, resort weddings, pool parties, and farmhouse Sangeet celebrations.",
    icon: TreePine,
  },
  {
    name: "Madhapur, Kondapur & Kukatpally",
    tag: "Celebration Hubs",
    desc: "Themed birthday celebrations, cradle ceremonies, half-saree events, and anniversary parties.",
    icon: Sparkles,
  },
  {
    name: "Visakhapatnam, Vijayawada & AP",
    tag: "Destination Celebrations",
    desc: "Coastal beachfront weddings in Vizag, grand conventions in Vijayawada, and temple weddings in Tirupati.",
    icon: Waves,
  },
];

const LocationCoverageSection = () => {
  return (
    <section className="py-14 md:py-20 bg-navy-dark/95 border-y border-gold/15 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
              Prime Coverage Across Hyderabad & Beyond
            </span>
            <Sparkles className="w-4 h-4 text-gold" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Top-Rated Event Management in <span className="text-gradient-gold">Hyderabad Localities</span>
          </h2>
          <p className="text-gold-light/75 text-sm md:text-base mt-3 leading-relaxed">
            Headquartered in Hyderabad with on-ground production hubs, we deliver flawless event execution, breathtaking stage decor, and turnkey planning across every corner of the city.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {hyderabadLocalities.map((loc, idx) => {
            const IconComponent = loc.icon;
            return (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-5 rounded-2xl bg-card/60 backdrop-blur-md border border-gold/20 hover:border-gold/60 transition-all duration-300 group hover:shadow-[0_8px_30px_rgba(212,175,55,0.1)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-gold/15 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-navy-dark transition-all duration-300">
                      <IconComponent className="w-4 h-4 text-gold group-hover:text-navy-dark transition-colors" />
                    </div>
                    <span className="text-[11px] font-semibold text-gold/90 px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/25">
                      {loc.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-display font-semibold text-white group-hover:text-gold transition-colors leading-snug">
                    {loc.name}
                  </h3>
                  <p className="text-xs text-gold-light/70 mt-2 leading-relaxed">
                    {loc.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gold/10 flex items-center gap-1.5 text-[11px] text-gold font-medium">
                  <MapPin className="w-3 h-3" />
                  <span>Available for On-Site Booking</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LocationCoverageSection;
