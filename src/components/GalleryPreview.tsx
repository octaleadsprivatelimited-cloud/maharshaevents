import { forwardRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, X, ZoomIn, Sparkles, Eye } from "lucide-react";

const portfolioShowcase = [
  {
    src: "/images/luxury-mandap-stage.webp",
    alt: "Grand Royal Wedding Mandapam with Floral Arches & Elephant Carvings",
    title: "Royal Mandapam Décor",
    category: "Signature Wedding",
    highlight: "Grand Traditional Stage",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/mandap-decor.webp",
    alt: "Intricate Traditional South Indian Wedding Mandapam Setup",
    title: "Vedic Muhurtham Setup",
    category: "Traditional Décor",
    highlight: "Handcrafted Floral Canopies",
    span: "",
  },
  {
    src: "/images/elephant-pillar.webp",
    alt: "Carved Wooden Elephant Pillars with Cascading Jasmine Garlands",
    title: "Carved Floral Pillars",
    category: "Artistic Architecture",
    highlight: "Heritage Elephant Pillars",
    span: "",
  },
  {
    src: "/images/lotus-urli-decor.webp",
    alt: "Grand Brass Urli Floral Welcome Concept with Petals & Diyas",
    title: "Lotus Urli Entrance",
    category: "Welcome & Aisle",
    highlight: "Water & Brass Floral Art",
    span: "",
  },
  {
    src: "/images/grand-wedding-hall.webp",
    alt: "Opulent Banquet & Convention Center Stage Transformation",
    title: "Grand Convention Hall",
    category: "Destination & Venue",
    highlight: "Panoramic Banquet Décor",
    span: "",
  },
];

const GalleryPreview = forwardRef<HTMLElement>((_, ref) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + portfolioShowcase.length) % portfolioShowcase.length);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % portfolioShowcase.length);
    }
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <section ref={ref} className="relative py-12 md:py-16 bg-[#faf8f5] text-slate-900 border-t border-amber-900/10 overflow-hidden">
      {/* Subtle ambient luxury light */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-amber-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Minimalist Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-8 md:mb-10"
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.3em] uppercase text-amber-800/80 mb-2">
            Our Portfolio
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Curated Celebrations
          </h2>
          <div className="w-12 h-0.5 bg-amber-600/40 mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
            A glimpse into our bespoke stages, grand mandapams, and refined floral architecture across Hyderabad & Andhra Pradesh.
          </p>
        </motion.div>

        {/* Minimalist Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 max-w-6xl mx-auto">
          {portfolioShowcase.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              onClick={() => setSelectedIndex(i)}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-white border border-stone-200/80 hover:border-amber-500/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${img.span}`}
            >
              {/* Photo Box */}
              <div className="relative w-full h-full aspect-square overflow-hidden bg-stone-100">
                <img
                  src={img.src}
                  alt={img.alt}
                  width="800"
                  height="800"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Clean hover zoom indicator */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-800 shadow-md scale-90 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Minimalist Call-to-Action */}
        <div className="text-center mt-8 md:mt-10">
          <Link to="/portfolio">
            <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 text-white text-xs sm:text-sm font-semibold tracking-wide hover:bg-amber-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal (Clean Minimalist Theme) */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/92 backdrop-blur-md p-3 sm:p-6 select-none"
            onClick={handleClose}
          >
            {/* Top Toolbar */}
            <div
              className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm text-white font-medium border border-white/10">
                <span className="text-amber-300 font-mono font-bold">
                  {selectedIndex + 1}
                </span>
                <span className="text-white/40">/</span>
                <span className="font-mono text-white/80">{portfolioShowcase.length}</span>
                <span className="text-white/30 hidden sm:inline">•</span>
                <span className="text-white/90 hidden sm:inline">
                  {portfolioShowcase[selectedIndex].title}
                </span>
              </div>

              <button
                onClick={handleClose}
                aria-label="Close modal"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/15 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/15 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Main Image Stage */}
            <div
              className="relative max-w-5xl w-full flex flex-col items-center justify-center px-2 sm:px-4 pt-10 pb-2 my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={portfolioShowcase[selectedIndex].src}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="relative flex items-center justify-center"
              >
                <img
                  src={portfolioShowcase[selectedIndex].src}
                  alt={portfolioShowcase[selectedIndex].alt}
                  className="max-h-[62vh] sm:max-h-[70vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                />
              </motion.div>

              {/* Minimalist Details Card */}
              <div className="mt-3.5 text-center max-w-lg">
                <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-widest block">
                  {portfolioShowcase[selectedIndex].category}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-white mt-0.5">
                  {portfolioShowcase[selectedIndex].title}
                </h3>
              </div>

              {/* Clean Thumbnails Strip */}
              <div className="flex items-center gap-2 sm:gap-2.5 mt-3 p-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                {portfolioShowcase.map((thumb, idx) => (
                  <button
                    key={thumb.src}
                    onClick={() => setSelectedIndex(idx)}
                    className={`relative w-11 h-11 sm:w-13 sm:h-13 rounded-lg overflow-hidden border-2 transition-all duration-200 shrink-0 ${
                      idx === selectedIndex
                        ? "border-amber-400 scale-105 opacity-100"
                        : "border-transparent opacity-40 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={thumb.src}
                      alt={thumb.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

GalleryPreview.displayName = "GalleryPreview";

export default GalleryPreview;
