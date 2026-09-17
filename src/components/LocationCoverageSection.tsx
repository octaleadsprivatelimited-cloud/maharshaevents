import { motion } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";

const locations = [
  { city: "Hyderabad & Secunderabad", state: "Telangana", highlight: "Banjara Hills, Jubilee Hills, Gachibowli, Hitec City" },
  { city: "Visakhapatnam (Vizag)", state: "Andhra Pradesh", highlight: "Beachfront & Resort Weddings" },
  { city: "Vijayawada", state: "Andhra Pradesh", highlight: "Grand Conventional Halls & Muhurthams" },
  { city: "Guntur & Amaravati", state: "Andhra Pradesh", highlight: "Traditional Telugu Ceremonies" },
  { city: "Warangal", state: "Telangana", highlight: "Heritage Venues & Celebrations" },
  { city: "Tirupati", state: "Andhra Pradesh", highlight: "Divine & Traditional Wedding Setups" },
  { city: "Karimnagar & Nizamabad", state: "Telangana", highlight: "Vibrant Social & Corporate Gatherings" },
  { city: "Rajahmundry & Kakinada", state: "Andhra Pradesh", highlight: "Godavari Coastal Receptions" },
];

const LocationCoverageSection = () => {
  return (
    <section className="py-10 md:py-12 bg-navy-dark/95 border-y border-gold/15 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-7"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
              Telangana & Andhra Pradesh
            </span>
            <Sparkles className="w-4 h-4 text-gold" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gold-light">
            Crafting Celebrations Across <span className="text-gradient-gold">AP & Telangana</span>
          </h2>
          <p className="text-gold-light/75 text-sm md:text-base mt-3">
            From intimate gatherings in Jubilee Hills to grand destination weddings on Vizag's coast, our dedicated team delivers seamless event experiences everywhere.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
          {locations.map((loc, idx) => (
            <motion.div
              key={loc.city}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="p-3.5 sm:p-4 rounded-xl bg-card/60 backdrop-blur-sm border border-gold/20 hover:border-gold/50 transition-all group"
            >
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gold/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-gold/30 transition-colors">
                  <MapPin className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gold-light leading-snug">
                    {loc.city}
                  </h3>
                  <span className="inline-block text-[11px] font-medium text-gold/90 mt-0.5">
                    {loc.state}
                  </span>
                  <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                    {loc.highlight}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationCoverageSection;
