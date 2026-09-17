import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { motion, AnimatePresence } from "framer-motion";
import { useGalleryImages, useVideos } from "@/lib/useFirebaseData";
import { extractYouTubeId } from "@/lib/youtube";
import { ImageIcon, Video, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const DEFAULT_PORTFOLIO_IMAGES = [
  { src: "/images/luxury-mandap-stage.webp", alt: "Royal Mandap Stage Decor", category: "Wedding" },
  { src: "/images/mandap-decor.webp", alt: "Traditional Telugu Wedding Mandapam", category: "Wedding" },
  { src: "/images/crystal-chandelier-arch.webp", alt: "Crystal Chandelier Grand Floral Walkway", category: "Decoration" },
  { src: "/images/sangeet-truss-stage.webp", alt: "Grand Sangeet & Reception Circular Truss Stage", category: "Entertainment" },
  { src: "/images/neon-tunnel-arch.webp", alt: "Illuminated Geometric Tunnel Entrance Walkway", category: "Decoration" },
  { src: "/images/sangeet-lounge-stage.webp", alt: "Sangeet Lounge Stage with Floral Rings & Backlit Panels", category: "Entertainment" },
  { src: "/images/luxury-velvet-seating.webp", alt: "Royal Velvet VIP Lounge & Floral Gazebo", category: "Party" },
  { src: "/images/night-lawn-signage.webp", alt: "Outdoor Night Lawn Custom Signage & Festoon Lighting", category: "Decoration" },
  { src: "/images/elephant-pillar.webp", alt: "Carved Elephant Floral Pillars", category: "Decoration" },
  { src: "/images/dj-stage-setup.webp", alt: "Boombox Themed Live DJ Console & Stage", category: "Entertainment" },
  { src: "/images/neon-wings-entrance.webp", alt: "Custom Neon Wings Glow Entrance Arch", category: "Decoration" },
  { src: "/images/neon-bar-setup.webp", alt: "Illuminated Neon Lounge & Cocktail Bar", category: "Party" },
  { src: "/images/grand-wedding-hall.webp", alt: "Grand Ballroom & Convention Hall", category: "Venue" },
  { src: "/images/lotus-urli-decor.webp", alt: "Traditional Lotus Urli Floral Entrance", category: "Decoration" },
  { src: "/images/hero-bg.webp", alt: "Golden Grand Stage Setting", category: "Wedding" },
  { src: "/images/decoration.webp", alt: "Exquisite Floral Installations", category: "Decoration" },
  { src: "/images/venue.webp", alt: "Curated Luxury Event Venue", category: "Venue" },
];

const Portfolio = () => {
  const [tab, setTab] = useState<"photos" | "videos">("photos");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { images } = useGalleryImages();
  const { videos } = useVideos();

  const firestoreItems = images.map((img) => ({
    src: img.url,
    alt: img.caption || "Gallery image",
    category: img.category,
  }));

  // Combine static showcase images with Firestore gallery (excluding removed items)
  const excludedUrls = ["corporate-event.webp", "birthday.webp", "wedding.webp"];
  const excludedAlts = [
    "Corporate Gala & Summit",
    "Luxury Birthday Party Decor",
    "Outdoor Muhurtham Celebration",
    "Birthday celebration",
    "Outdoor ceremony",
    "Corporate gala",
  ];

  const filteredPhotos = [
    ...DEFAULT_PORTFOLIO_IMAGES.filter((d) => !firestoreItems.some((f) => f.src === d.src)),
    ...firestoreItems,
  ].filter(
    (item) =>
      !excludedUrls.some((u) => item.src.includes(u)) &&
      !excludedAlts.includes(item.alt)
  );

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null && filteredPhotos.length > 0) {
      setSelectedIndex((selectedIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null && filteredPhotos.length > 0) {
      setSelectedIndex((selectedIndex + 1) % filteredPhotos.length);
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
  }, [selectedIndex, filteredPhotos.length]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/venue.webp')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/85 via-navy-dark/75 to-navy-dark/90" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl font-bold text-gold-light"
          >
            Our <span className="text-gradient-gold">Portfolio</span>
          </motion.h1>
          <p className="text-gold-light/70 mt-3 text-lg">Photos and event highlights</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-6xl">
          {/* Tabs: Photos | Videos */}
          <div className="flex justify-center gap-2 mb-10">
            <button
              onClick={() => setTab("photos")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                tab === "photos"
                  ? "bg-gold text-accent-foreground shadow-md"
                  : "bg-secondary text-muted-foreground hover:bg-gold/10 hover:text-foreground"
              }`}
            >
              <ImageIcon className="w-4 h-4" /> Photos
            </button>
            <button
              onClick={() => setTab("videos")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                tab === "videos"
                  ? "bg-gold text-accent-foreground shadow-md"
                  : "bg-secondary text-muted-foreground hover:bg-gold/10 hover:text-foreground"
              }`}
            >
              <Video className="w-4 h-4" /> Videos
            </button>
          </div>

          <AnimatePresence mode="wait">
            {tab === "photos" && (
              <motion.div
                key="photos"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                {filteredPhotos.length === 0 ? (
                  <div className="text-center py-20 text-muted-foreground">
                    <p className="text-lg">No images yet. Add some from the admin panel!</p>
                  </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {filteredPhotos.map((item, i) => (
                      <motion.div
                        key={`${item.alt}-${i}`}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25, delay: i * 0.02 }}
                        onClick={() => setSelectedIndex(i)}
                        className="relative group overflow-hidden rounded-xl aspect-square cursor-pointer bg-card border border-border/60 hover:border-gold/50 shadow-sm hover:shadow-lg transition-all duration-300"
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/85 via-navy-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3.5">
                          <div>
                            <p className="text-gold-light text-sm font-medium line-clamp-1">{item.alt}</p>
                            <p className="text-gold/80 text-xs mt-0.5">{item.category}</p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-sm">
                            <ZoomIn className="w-4 h-4" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {tab === "videos" && (
              <motion.div
                key="videos"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                {videos.length === 0 ? (
                  <div className="text-center py-20 text-muted-foreground">
                    <Video className="w-12 h-12 mx-auto mb-4 opacity-40" />
                    <p className="text-lg">No videos yet. Add YouTube links from the admin panel!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {videos.map((video, i) => {
                      const videoId = extractYouTubeId(video.youtubeUrl);
                      if (!videoId) return null;
                      return (
                        <motion.div
                          key={video.id}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="rounded-xl overflow-hidden border border-border bg-card shadow-md hover:shadow-lg transition-shadow"
                        >
                          <div className="aspect-video bg-muted">
                            <iframe
                              src={`https://www.youtube.com/embed/${videoId}`}
                              title={video.title || "Video"}
                              className="h-full w-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                          <div className="p-4">
                            <p className="font-medium text-foreground line-clamp-1">{video.title || "Untitled"}</p>
                            {video.description && (
                              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{video.description}</p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox Modal with Full Navigation */}
      <AnimatePresence>
        {selectedIndex !== null && filteredPhotos[selectedIndex] && (
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
                <span className="font-mono text-white/80">{filteredPhotos.length}</span>
                <span className="text-white/30 hidden sm:inline">•</span>
                <span className="text-white/90 hidden sm:inline">
                  {filteredPhotos[selectedIndex].alt}
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

            {/* Previous Arrow */}
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/15 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/15 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Main Stage */}
            <div
              className="relative max-w-5xl w-full flex flex-col items-center justify-center px-2 sm:px-4 pt-10 pb-2 my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={filteredPhotos[selectedIndex].src}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="relative flex items-center justify-center"
              >
                <img
                  src={filteredPhotos[selectedIndex].src}
                  alt={filteredPhotos[selectedIndex].alt}
                  className="max-h-[62vh] sm:max-h-[72vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                />
              </motion.div>

              {/* Caption Card */}
              <div className="mt-3.5 text-center max-w-lg">
                <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-widest block">
                  {filteredPhotos[selectedIndex].category}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-white mt-0.5">
                  {filteredPhotos[selectedIndex].alt}
                </h3>
              </div>

              {/* Thumbnails Strip */}
              <div className="flex items-center gap-2 sm:gap-2.5 mt-3 p-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 max-w-full overflow-x-auto">
                {filteredPhotos.map((thumb, idx) => (
                  <button
                    key={`${thumb.src}-${idx}`}
                    onClick={() => setSelectedIndex(idx)}
                    className={`relative w-11 h-11 sm:w-13 sm:h-13 rounded-lg overflow-hidden border-2 transition-all duration-200 shrink-0 ${
                      idx === selectedIndex
                        ? "border-amber-400 scale-105 opacity-100"
                        : "border-transparent opacity-40 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={thumb.src}
                      alt={thumb.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Portfolio;
