import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useGalleryImages } from "@/lib/useFirebaseData";

const fallbackImages = [
  { src: "/images/hero-bg.jpg", alt: "Grand ballroom event", span: "md:col-span-2 md:row-span-2" },
  { src: "/images/wedding.jpg", alt: "Wedding ceremony", span: "" },
  { src: "/images/decoration.jpg", alt: "Floral decoration", span: "" },
  { src: "/images/corporate-event.jpg", alt: "Corporate event", span: "" },
  { src: "/images/venue.jpg", alt: "Luxury venue", span: "" },
];

const GalleryPreview = () => {
  const { images: firestoreImages } = useGalleryImages();

  const displayImages = firestoreImages.length > 0
    ? firestoreImages.slice(0, 5).map((img, i) => ({
        src: img.url,
        alt: img.caption || "Gallery image",
        span: i === 0 ? "md:col-span-2 md:row-span-2" : "",
      }))
    : fallbackImages;

  return (
    <section className="section-padding bg-gradient-navy">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
            Our Portfolio
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-light mt-3">
            Moments We've Created
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {displayImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-lg group ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
              <div className="absolute inset-0 bg-navy-dark/0 group-hover:bg-navy-dark/40 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/portfolio">
            <Button variant="hero-outline" size="lg">
              View Full Portfolio
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
