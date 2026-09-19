import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Award, Users, Clock, Shield, CheckCircle2, MapPin } from "lucide-react";

const values = [
  { icon: Award, title: "Excellence", desc: "We deliver nothing short of perfection in every celebration we curate in Hyderabad." },
  { icon: Users, title: "In-House Crew", desc: "50+ full-time fabrication, sound, lighting, and floral artisans under one roof." },
  { icon: Clock, title: "Punctuality", desc: "Timelines maintained with military precision so you enjoy every minute stress-free." },
  { icon: Shield, title: "500+ Events Trust", desc: "Over 500 Telugu weddings, tech summits, and social galas delivered with 4.9-star acclaim." },
];

const aboutSchema = {
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
          "name": "About Us",
          "item": "https://maharshaevents.com/about"
        }
      ]
    },
    {
      "@type": "AboutPage",
      "name": "About Maharsha Events Hyderabad",
      "description": "Hyderabad's leading luxury wedding planning and event production company, established in 2018."
    }
  ]
};

const About = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="About Maharsha Events | Leading Event Planners in Hyderabad Since 2018"
        description="Learn about Maharsha Events, Hyderabad's premier luxury event management and wedding planning company. 500+ successful celebrations delivered across Jubilee Hills, Gachibowli & Secunderabad."
        keywords="about maharsha events, event management company hyderabad, best wedding planners in hyderabad, event planners bandlaguda jagir, luxury wedding planners telangana"
        canonical="https://maharshaevents.com/about"
        schemaJson={aboutSchema}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/wedding.webp')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/85 via-navy-dark/75 to-navy-dark/90" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-3 px-4 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-bold tracking-[0.2em] uppercase"
          >
            Since 2018 in Hyderabad
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white"
          >
            About <span className="text-gradient-gold">Maharsha Events</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gold-light/75 mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
          >
            Hyderabad's trusted luxury event management & royal wedding planning company, turning cherished celebrations into unforgettable legacies.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/hero-bg.webp"
                alt="Maharsha Events team organizing luxury event in Hyderabad"
                width="600"
                height="400"
                className="rounded-2xl shadow-xl w-full h-auto object-cover border border-gold/20"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase">Our Journey</span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Crafting Hyderabad's Most Memorable Events
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Founded in 2018 in Hyderabad, <strong>Maharsha Events</strong> emerged with a vision to redefine wedding styling and corporate event management. What started with authentic traditional Telugu muhurthams has grown into one of Telangana and Andhra Pradesh's most acclaimed event production firms.
              </p>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                With a dedicated 50+ member in-house production crew and warehousing in <strong>Bandlaguda Jagir, Hyderabad</strong>, we manage all stage fabrication, imported floral installations, concert audio-visuals, and venue liaison directly — ensuring unrivaled quality and cost efficiency.
              </p>
              <div className="pt-2 space-y-2">
                {[
                  "500+ successful weddings and corporate events delivered",
                  "Direct partnerships with Hyderabad's 5-star hotels & convention halls",
                  "Turnkey management with zero stress and transparent budgets",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground/85 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted/40 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase">Why Choose Us</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2">
              Our Core Commitments
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-5 md:p-6 text-center border border-border shadow-sm hover:border-gold/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center mx-auto mb-3">
                  <v.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-base md:text-lg font-semibold text-foreground mb-1.5">{v.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default About;
