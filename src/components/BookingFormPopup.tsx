import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { saveEnquiry } from "@/lib/useFirebaseData";
import { useBookingPopup } from "@/context/BookingPopupContext";
import { trackLeadConversion, getAdTrackingData } from "@/lib/adTracking";

const BookingFormPopup = () => {
  const { isOpen, closeBookingPopup } = useBookingPopup();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const adData = getAdTrackingData();
      await saveEnquiry({
        source: "booking_ad_ready",
        name,
        email,
        phone,
        city: city || "Not specified",
        eventType,
        eventDate,
        budget,
        message,
        ...adData,
      });

      // Fire conversion for Google Ads & Meta Ads
      trackLeadConversion({
        source: "booking_popup",
        eventType,
        city,
        budget,
      });

      toast.success("Thank you! We'll get back to you within 24 hours.");
      closeBookingPopup();
    } catch {
      toast.error("Failed to submit enquiry. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeBookingPopup()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Book Your Event</DialogTitle>
          <DialogDescription>
            Fill out the form and our team will craft a personalized proposal for you.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name *</label>
              <Input
                required
                placeholder="Your full name"
                className="bg-background"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
              <Input
                required
                type="email"
                placeholder="your@email.com"
                className="bg-background"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Phone *</label>
              <Input
                required
                type="tel"
                placeholder="+91 98765 43210"
                className="bg-background"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Event Type *</label>
              <Select required value={eventType} onValueChange={setEventType}>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Event Date *</label>
              <Input
                required
                type="date"
                className="bg-background"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Event Location / City *</label>
              <Select required value={city} onValueChange={setCity}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hyderabad">Hyderabad & Secunderabad (TG)</SelectItem>
                  <SelectItem value="Warangal">Warangal (TG)</SelectItem>
                  <SelectItem value="Karimnagar">Karimnagar (TG)</SelectItem>
                  <SelectItem value="Other-Telangana">Other Telangana</SelectItem>
                  <SelectItem value="Vijayawada">Vijayawada (AP)</SelectItem>
                  <SelectItem value="Visakhapatnam">Visakhapatnam / Vizag (AP)</SelectItem>
                  <SelectItem value="Guntur">Guntur (AP)</SelectItem>
                  <SelectItem value="Tirupati">Tirupati (AP)</SelectItem>
                  <SelectItem value="Other-AP">Other Andhra Pradesh</SelectItem>
                  <SelectItem value="Destination">Destination Wedding / Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Budget Range</label>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</SelectItem>
                <SelectItem value="₹1,00,000 - ₹5,00,000">₹1,00,000 - ₹5,00,000</SelectItem>
                <SelectItem value="₹5,00,000 - ₹10,00,000">₹5,00,000 - ₹10,00,000</SelectItem>
                <SelectItem value="₹10,00,000+">₹10,00,000+ (Luxury / Grand)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
            <Textarea
              placeholder="Tell us about your vision..."
              rows={3}
              className="bg-background"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full py-5">
            Submit Enquiry
            <Send className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingFormPopup;
