import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import HyderabadAuthoritySection from "@/components/HyderabadAuthoritySection";
import GalleryPreview from "@/components/GalleryPreview";
import LocationCoverageSection from "@/components/LocationCoverageSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import HyderabadFaqSection from "@/components/HyderabadFaqSection";
import { hyderabadFaqs } from "@/data/hyderabadFaqs";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "EventPlanner"],
      "@id": "https://maharshaevents.com/#organization",
      "name": "Maharsha Events",
      "url": "https://maharshaevents.com",
      "logo": "https://maharshaevents.com/logo.webp",
      "image": "https://maharshaevents.com/images/luxury-mandap-stage.webp",
      "foundingDate": "2018",
      "description": "Maharsha Events is the premier luxury wedding planning and event management company in Hyderabad, Telangana. Specializing in destination weddings, royal mandap stages, corporate conferences, and celebrations across Jubilee Hills, Banjara Hills, Gachibowli, and Secunderabad.",
      "telephone": "+917893330301",
      "email": "maharshaevents2018@gmail.com",
      "priceRange": "₹₹ - ₹₹₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Hemagiri Nagar, Shanthinagar Colony, Hydershakote, Bandlaguda Jagir",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500091",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "17.3616",
        "longitude": "78.3756"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "20:00"
      },
      "areaServed": [
        { "@type": "City", "name": "Hyderabad" },
        { "@type": "AdministrativeArea", "name": "Jubilee Hills, Hyderabad" },
        { "@type": "AdministrativeArea", "name": "Banjara Hills, Hyderabad" },
        { "@type": "AdministrativeArea", "name": "Gachibowli, Hyderabad" },
        { "@type": "AdministrativeArea", "name": "Hitec City, Hyderabad" },
        { "@type": "AdministrativeArea", "name": "Madhapur, Hyderabad" },
        { "@type": "AdministrativeArea", "name": "Secunderabad" },
        { "@type": "AdministrativeArea", "name": "Bandlaguda Jagir, Hyderabad" },
        { "@type": "AdministrativeArea", "name": "Shamshabad, Hyderabad" },
        { "@type": "State", "name": "Telangana" },
        { "@type": "State", "name": "Andhra Pradesh" }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "512",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://maharshaevents.com/#faq",
      "mainEntity": hyderabadFaqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  ]
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Best Event Management Company in Hyderabad | Luxury Wedding Planners | Maharsha Events"
        description="Top-rated event management and wedding planners in Hyderabad, Telangana. Specializing in royal Telugu weddings, luxury stage decoration, corporate summits, and celebrations across Jubilee Hills, Banjara Hills, Gachibowli & Secunderabad. Get a free proposal!"
        keywords="event management companies in hyderabad, best wedding planners in hyderabad, luxury event planners hyderabad, wedding stage decorators hyderabad, corporate event organisers gachibowli, event management company jubilee hills, telugu wedding planners banjara hills, sangeet stage setup hyderabad, mandap decorators hyderabad, maharsha events hyderabad"
        canonical="https://maharshaevents.com/"
        schemaJson={homeSchema}
      />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <HyderabadAuthoritySection />
      <GalleryPreview />
      <LocationCoverageSection />
      <TestimonialsSection />
      <HyderabadFaqSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
