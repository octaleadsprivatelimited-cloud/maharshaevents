import { motion } from "framer-motion";
import { useVideos } from "@/lib/useFirebaseData";
import { extractYouTubeId } from "@/lib/youtube";
const VideosSection = () => {
  const { videos } = useVideos();

  if (videos.length === 0) return null;

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
            Watch
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-light mt-3">
            Our Event Highlights
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, i) => {
            const videoId = extractYouTubeId(video.youtubeUrl);
            if (!videoId) return null;
            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl overflow-hidden border border-border bg-card shadow-lg"
              >
                <div className="aspect-video bg-muted relative">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={video.title || "Video"}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <p className="font-medium text-foreground">
                    {video.title || "Untitled"}
                  </p>
                  {video.description && (
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {video.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VideosSection;
