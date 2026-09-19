import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Heart, Building2, PartyPopper, Flower2, MapPin, Music, CheckCircle } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Luxury Wedding Planning & Telugu Muhurthams",
    description: "Full-service wedding planning across Hyderabad's premier convention halls and luxury hotels. From traditional Vedic Mandapams and Pellikuthuru ceremonies to high-energy Sangeet nights and opulent Receptions.",
    image: "/images/wedding.webp",
    alt: "Luxury wedding planning and Telugu mandap decoration in Hyderabad",
    benefits: ["Bespoke Mandapam & stage architecture", "End-to-end vendor & catering liaison", "Farmhouse & destination coordination", "Dedicated on-site wedding director"],
  },
  {
    icon: Building2,
    title: "Corporate Events & Tech Summits",
    description: "Turnkey event management for corporate conferences, tech summits, annual awards galas, and product launches across Hitec City, Gachibowli, and Financial District.",
    image: "/images/corporate-event.webp",
    alt: "Corporate conference and tech summit event organizers in Hitec City Hyderabad",
    benefits: ["High-definition LED video wall setups", "Precision line-array sound engineering", "Delegate registration & staging", "Brand experience installations"],
  },
  {
    icon: Flower2,
    title: "Grand Stage & Floral Décor",
    description: "Transform any space in Hyderabad into an enchanting paradise with our in-house floral fabrication, crystal chandeliers, illuminated arches, and customized artistic backdrops.",
    image: "/images/decoration.webp",
    alt: "Grand floral stage decoration and architectural decor in Jubilee Hills Hyderabad",
    benefits: ["Fresh exotic floral artistry", "Architectural 3D stage rendering", "Intelligent ambient lighting design", "Thematic entry tunnel installations"],
  },
  {
    icon: PartyPopper,
    title: "Themed Birthdays & Social Gatherings",
    description: "Creative thematic celebrations for milestone birthdays, luxury cradle ceremonies, half-saree functions, and anniversary galas across Banjara Hills and Jubilee Hills.",
    image: "/images/birthday.webp",
    alt: "Luxury themed birthday party and social event organizers in Banjara Hills Hyderabad",
    benefits: ["Custom concept design & props", "Kids entertainment & interactive acts", "Boutique photo backdrops & setups", "Seamless event flow management"],
  },
  {
    icon: MapPin,
    title: "Curated Venue Booking & Farmhouses",
    description: "Direct priority access to Hyderabad's finest 5-star hotels, luxury convention centers, and private Moinabad & Shamshabad farmhouses with negotiated corporate rates.",
    image: "/images/venue.webp",
    alt: "Curated luxury event venues and convention halls booking in Hyderabad",
    benefits: ["Exclusive venue scouting & shortlisting", "Direct management liaison", "Capacity & acoustic planning", "Permits & parking coordination"],
  },
  {
    icon: Music,
    title: "Live Entertainment & Celebrity Artists",
    description: "Elevate your celebration with top-tier Tollywood playback singers, live fusion bands, celebrity DJs, traditional Mangala Vaadyam, and choreographed dance troupes.",
    image: "/images/entertainment.webp",
    alt: "Live entertainment, sound setup and celebrity artists booking Hyderabad",
    benefits: ["Celebrity & artist booking management", "Stadium-grade truss & concert sound", "Choreography & special effects (SFX)", "Cold pyro & atmospheric CO2 jets"],
  },
];

const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://maharshaevents.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://maharshaevents.com/services"
        }
      ]
    },
    {
      "@type": "Service",
      "name": "Event Management & Wedding Planning in Hyderabad",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Maharsha Events",
        "telephone": "+917893330301",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Hemagiri Nagar, Bandlaguda Jagir",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "postalCode": "500091"
        }
      },
      "areaServed": "Hyderabad, Telangana",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Event Production Services",
        "itemListElement": services.map((s) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": s.title,
            "description": s.description
          }
        }))
      }
    }
  ]
};

const Services = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Event Planning & Wedding Services in Hyderabad | Maharsha Events"
        description="Explore premier event management services in Hyderabad: Luxury Telugu wedding planning, corporate conferences in Hitec City, floral stage decor, and farmhouse celebrations."
        keywords="event services hyderabad, wedding planning packages hyderabad, corporate event management gachibowli, stage decorators hyderabad, mandap decoration jubilee hills, farmhouse wedding planners moinabad, maharsha events"
        canonical="https://maharshaevents.com/services"
        schemaJson={servicesSchema}
      />
      <Navbar />

      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/decoration.webp')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/85 via-navy-dark/75 to-navy-dark/90" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-3 px-4 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-bold tracking-[0.2em] uppercase"
          >
            Hyderabad Event Production
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white"
          >
            Our Event <span className="text-gradient-gold">Services</span> in Hyderabad
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gold-light/75 mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
          >
            End-to-end luxury event execution, authentic cultural styling, and precision technical production across Telangana and Andhra Pradesh.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto grid grid-cols-1 gap-12 md:gap-20 max-w-6xl">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <img
                  src={service.image}
                  alt={service.alt}
                  width="600"
                  height="400"
                  loading="lazy"
                  decoding="async"
                  className="rounded-2xl shadow-xl w-full h-56 md:h-80 object-cover border border-gold/20"
                />
              </div>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <service.icon className="w-8 h-8 md:w-10 md:h-10 text-gold mb-3 md:mb-4" />
                <h2 className="font-display text-xl md:text-3xl font-bold text-foreground mb-3 leading-snug">
                  {service.title}
                </h2>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-5">
                  {service.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3">
                  {service.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2 text-xs md:text-sm text-foreground/80 font-medium">
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
