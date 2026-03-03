import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { motion } from "framer-motion";
import { Heart, Building2, PartyPopper, Flower2, MapPin, Music, CheckCircle } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Wedding Planning",
    description: "From venue selection to the last dance, we handle every aspect of your wedding with love and precision.",
    image: "/images/wedding.jpg",
    benefits: ["Complete wedding coordination", "Vendor management", "Theme & décor design", "Budget optimization"],
  },
  {
    icon: Building2,
    title: "Corporate Events",
    description: "Professional event management for conferences, seminars, product launches, and team celebrations.",
    image: "/images/corporate-event.jpg",
    benefits: ["Conference management", "Product launch events", "Team building activities", "Award ceremonies"],
  },
  {
    icon: PartyPopper,
    title: "Birthday & Parties",
    description: "Creative themed parties with stunning decorations, entertainment, and flawless coordination.",
    image: "/images/birthday.jpg",
    benefits: ["Custom theme design", "Entertainment booking", "Catering coordination", "Photography & video"],
  },
  {
    icon: Flower2,
    title: "Decoration",
    description: "Transform any space into a visual masterpiece with our expert floral and thematic designs.",
    image: "/images/decoration.jpg",
    benefits: ["Floral arrangements", "Stage design", "Lighting setup", "Themed installations"],
  },
  {
    icon: MapPin,
    title: "Venue Booking",
    description: "Access our curated network of premium venues — from intimate halls to grand open-air spaces.",
    image: "/images/venue.jpg",
    benefits: ["Venue scouting", "Negotiation support", "Site inspections", "Logistics planning"],
  },
  {
    icon: Music,
    title: "Entertainment & Artists",
    description: "Book top-tier performers, DJs, live bands, and artists for unforgettable entertainment.",
    image: "/images/hero-bg.jpg",
    benefits: ["Live music & bands", "DJ & sound", "Dance performances", "Celebrity appearances"],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative pt-32 pb-20 bg-gradient-navy">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl font-bold text-gold-light"
          >
            Our <span className="text-gradient-gold">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gold-light/60 mt-6 max-w-2xl mx-auto text-lg"
          >
            Comprehensive event solutions tailored to your unique vision and requirements.
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto space-y-24">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="rounded-xl shadow-lg w-full h-80 object-cover"
                  loading="lazy"
                />
              </div>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <service.icon className="w-10 h-10 text-gold mb-4" />
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">{service.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {service.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Services;
