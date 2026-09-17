import { motion } from "framer-motion";
import { Heart, Building2, PartyPopper, Flower2, MapPin, Music } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Heart,
    title: "Wedding Planning",
    description: "From intimate ceremonies to grand celebrations, we create the wedding of your dreams.",
    image: "/images/wedding.webp",
  },
  {
    icon: Building2,
    title: "Corporate Events",
    description: "Professional conferences, product launches, and team-building events executed flawlessly.",
    image: "/images/corporate-event.webp",
  },
  {
    icon: PartyPopper,
    title: "Birthday & Parties",
    description: "Memorable celebrations with creative themes, stunning décor, and seamless coordination.",
    image: "/images/birthday.webp",
  },
  {
    icon: Flower2,
    title: "Decoration",
    description: "Exquisite floral arrangements and thematic designs that transform any space.",
    image: "/images/decoration.webp",
  },
  {
    icon: MapPin,
    title: "Venue Booking",
    description: "Access to an exclusive network of premium venues perfectly suited for your occasion.",
    image: "/images/venue.webp",
  },
  {
    icon: Music,
    title: "Entertainment & Artists",
    description: "Top-tier artists, live DJs, and performers to keep your guests energized all night.",
    image: "/images/entertainment.webp",
  },
];

const ServicesSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
            What We Offer
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
            Our Premium Services
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Every event deserves excellence. We offer a comprehensive suite of services
            to make your celebration extraordinary.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to="/services"
                className="group block relative overflow-hidden rounded-xl hover-lift h-44 sm:h-56 md:h-80"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  width="600"
                  height="400"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/95 via-navy-dark/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
                  <service.icon className="w-6 h-6 md:w-8 md:h-8 text-gold mb-1 md:mb-3" />
                  <h3 className="font-display text-sm md:text-xl font-semibold text-gold-light mb-0.5 md:mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gold-light/60 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">
                    {service.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
