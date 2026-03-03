import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Send, CheckCircle } from "lucide-react";

const Booking = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Thank you! We'll get back to you within 24 hours.");
  };

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-32 pb-20 section-padding bg-gradient-navy min-h-screen flex items-center">
          <div className="container mx-auto text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
              <CheckCircle className="w-20 h-20 text-gold mx-auto mb-6" />
            </motion.div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gold-light mb-4">Thank You!</h1>
            <p className="text-gold-light/60 text-lg max-w-md mx-auto">
              We've received your enquiry and will get back to you within 24 hours with a personalized proposal.
            </p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/birthday.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/85 via-navy-dark/75 to-navy-dark/90" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl font-bold text-gold-light"
          >
            Book Your <span className="text-gradient-gold">Event</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gold-light/60 mt-6 max-w-xl mx-auto text-lg"
          >
            Fill out the form below and our team will craft a personalized proposal for you.
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-2xl">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-card rounded-xl p-8 md:p-12 border border-border shadow-lg space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Full Name *</label>
                <Input required placeholder="Your full name" className="bg-background" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Email *</label>
                <Input required type="email" placeholder="your@email.com" className="bg-background" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Phone *</label>
                <Input required type="tel" placeholder="+91 98765 43210" className="bg-background" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Event Type *</label>
                <Select required>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="corporate">Corporate Event</SelectItem>
                    <SelectItem value="birthday">Birthday Party</SelectItem>
                    <SelectItem value="social">Social Gathering</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Event Date *</label>
                <Input required type="date" className="bg-background" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Budget Range</label>
                <Select>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50k-1l">₹50,000 - ₹1,00,000</SelectItem>
                    <SelectItem value="1l-5l">₹1,00,000 - ₹5,00,000</SelectItem>
                    <SelectItem value="5l-10l">₹5,00,000 - ₹10,00,000</SelectItem>
                    <SelectItem value="10l+">₹10,00,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
              <Textarea placeholder="Tell us about your vision..." rows={4} className="bg-background" />
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full py-6">
              Submit Enquiry
              <Send className="w-5 h-5 ml-2" />
            </Button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Booking;
