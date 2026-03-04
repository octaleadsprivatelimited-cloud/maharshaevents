import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { motion, AnimatePresence } from "framer-motion";
import { useGalleryImages, useVideos } from "@/lib/useFirebaseData";
import { extractYouTubeId } from "@/lib/youtube";
import { ImageIcon, Video } from "lucide-react";

const Portfolio = () => {
  const [tab, setTab] = useState<"photos" | "videos">("photos");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const { images } = useGalleryImages();
  const { videos } = useVideos();

  const allItems = images.map((img) => ({
    src: img.url,
    alt: img.caption || "Gallery image",
    category: img.category,
  }));
  const categories = ["All", ...Array.from(new Set(allItems.map((item) => item.category)))];
  const filteredPhotos = categoryFilter === "All" ? allItems : allItems.filter((p) => p.category === categoryFilter);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/venue.jpg')" }} />
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
                {categories.length > 1 && (
                  <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                          categoryFilter === cat
                            ? "bg-gold/20 text-foreground ring-1 ring-gold/50"
                            : "text-muted-foreground hover:bg-gold/5 hover:text-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
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
                        className="relative group overflow-hidden rounded-xl aspect-square"
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
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                          <div>
                            <p className="text-gold-light text-sm font-medium line-clamp-1">{item.alt}</p>
                            <p className="text-gold/80 text-xs">{item.category}</p>
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

      <CTASection />
      <Footer />
    </div>
  );
};

export default Portfolio;
