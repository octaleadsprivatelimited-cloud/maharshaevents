import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { motion } from "framer-motion";
import { Award, Users, Clock, Shield } from "lucide-react";

const values = [
  { icon: Award, title: "Excellence", desc: "We deliver nothing short of perfection in every event we curate." },
  { icon: Users, title: "Collaboration", desc: "Your vision combined with our expertise creates magic." },
  { icon: Clock, title: "Reliability", desc: "On-time, on-budget, and always exceeding expectations." },
  { icon: Shield, title: "Trust", desc: "Over 500 events delivered with 100% client satisfaction." },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/wedding.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/85 via-navy-dark/75 to-navy-dark/90" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl font-bold text-gold-light"
          >
            About <span className="text-gradient-gold">Maharsha Events</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gold-light/60 mt-6 max-w-2xl mx-auto text-lg"
          >
            With over 10 years of experience, we've been turning ordinary occasions
            into extraordinary memories across India.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/hero-bg.jpg"
                alt="Our story"
                className="rounded-xl shadow-xl"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">Our Story</span>
              <h2 className="font-display text-4xl font-bold text-foreground mt-3 mb-6">
                A Passion for Perfection
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 2012, Maharsha Events began with a simple belief: every celebration
                deserves to be exceptional. What started as a small wedding planning venture has
                blossomed into one of India's most trusted event management companies.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team of 50+ passionate professionals brings creativity, precision, and warmth
                to every project. From intimate gatherings to grand celebrations, we treat each
                event as a masterpiece waiting to be created.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">Why Choose Us</span>
            <h2 className="font-display text-4xl font-bold text-foreground mt-3">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-4 md:p-8 text-center hover-lift border border-border"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-2 md:mb-4">
                  <v.icon className="w-5 h-5 md:w-7 md:h-7 text-gold" />
                </div>
                <h3 className="font-display text-sm md:text-lg font-semibold text-foreground mb-1 md:mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm">{v.desc}</p>
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
