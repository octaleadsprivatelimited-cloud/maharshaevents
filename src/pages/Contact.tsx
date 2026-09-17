import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import { saveEnquiry } from "@/lib/useFirebaseData";
import { trackLeadConversion, getAdTrackingData, trackPhoneCall } from "@/lib/adTracking";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 7893330301", href: "tel:+917893330301" },
  { icon: Mail, label: "Email", value: "maharshaevents2018@gmail.com", href: "mailto:maharshaevents2018@gmail.com" },
  { icon: MapPin, label: "Address", value: "Hemagiri Nagar, Shanthinagar Colony, Hydershakote, Bandlaguda Jagir, Telangana 500091", href: "#" },
  { icon: Clock, label: "Hours", value: "Mon - Sat: 9AM - 7PM", href: "#" },
];

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const adData = getAdTrackingData();
      await saveEnquiry({
        source: "contact_page",
        name,
        email,
        phone: phone || "Not provided",
        city: city || "Hyderabad/AP/Telangana",
        subject,
        message,
        ...adData,
      });

      trackLeadConversion({
        source: "contact_page",
        eventType: subject || "General Event Enquiry",
        city: city || "Telangana & AP",
      });

      toast.success("Message sent! We'll respond within 24 hours.");
      setName("");
      setEmail("");
      setPhone("");
      setCity("");
      setSubject("");
      setMessage("");
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/hero-bg.webp')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/85 via-navy-dark/75 to-navy-dark/90" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl font-bold text-gold-light"
          >
            Contact <span className="text-gradient-gold">Us</span>
          </motion.h1>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">Get In Touch</span>
              <h2 className="font-display text-3xl font-bold text-foreground mt-3 mb-6">
                We'd Love to Hear From You
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Whether you have a question about our services, pricing, or just want to say hello,
                our team is ready to answer all your questions.
              </p>
              <div className="space-y-6">
                {contactInfo.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    onClick={() => {
                      if (c.label === "Phone") trackPhoneCall("contact_page");
                    }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                      <c.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{c.label}</div>
                      <div className="font-medium text-foreground">{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-card rounded-xl p-8 border border-border shadow-lg space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Name *</label>
                  <Input required placeholder="Your name" className="bg-background" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email *</label>
                  <Input required type="email" placeholder="your@email.com" className="bg-background" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Phone Number *</label>
                  <Input required type="tel" placeholder="+91 98765 43210" className="bg-background" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Location / City</label>
                  <Input placeholder="e.g. Hyderabad, Vijayawada, Vizag" className="bg-background" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                <Input placeholder="How can we help?" className="bg-background" value={subject} onChange={(e) => setSubject(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Message *</label>
                <Textarea required placeholder="Tell us more..." rows={5} className="bg-background" value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full py-6">
                Send Message
                <Send className="w-5 h-5 ml-2" />
              </Button>
            </motion.form>
          </div>
        </div>
      </section>

      <section className="h-80 bg-muted flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <MapPin className="w-10 h-10 mx-auto mb-3 text-gold" />
          <p className="font-display text-lg">Hemagiri Nagar, Shanthinagar Colony, Hydershakote, Bandlaguda Jagir, Telangana 500091</p>
          <p className="text-sm mt-1">Google Maps integration can be added here</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
