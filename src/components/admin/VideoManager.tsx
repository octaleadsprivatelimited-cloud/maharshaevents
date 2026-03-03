import { useState } from "react";
import { Plus, Trash2, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVideos } from "@/lib/useFirebaseData";
import { toast } from "sonner";

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : null;
}

const VideoManager = () => {
  const { videos, addVideo, removeVideo } = useVideos();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!url.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }
    const videoId = extractYouTubeId(url.trim());
    if (!videoId) {
      toast.error("Invalid YouTube URL");
      return;
    }
    addVideo({ youtubeUrl: url.trim(), title: title.trim(), description: description.trim() });
    setUrl("");
    setTitle("");
    setDescription("");
    toast.success("Video added successfully");
  };

  return (
    <div className="space-y-6">
      {/* Add Video Form */}
      <Card className="bg-navy border-gold/20">
        <CardHeader>
          <CardTitle className="text-gold-light flex items-center gap-2 text-lg">
            <Youtube className="w-5 h-5" /> Add YouTube Video
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-gold-light/70 text-sm mb-1 block">YouTube URL</label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="bg-navy-dark border-gold/20 text-gold-light placeholder:text-gold-light/30"
            />
          </div>
          <div>
            <label className="text-gold-light/70 text-sm mb-1 block">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event Highlight Reel"
              className="bg-navy-dark border-gold/20 text-gold-light placeholder:text-gold-light/30"
            />
          </div>
          <div>
            <label className="text-gold-light/70 text-sm mb-1 block">Description (optional)</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short description of the video..."
              className="bg-navy-dark border-gold/20 text-gold-light placeholder:text-gold-light/30 min-h-[60px]"
            />
          </div>
          <Button onClick={handleAdd} variant="hero" size="sm">
            <Plus className="w-4 h-4 mr-1" /> Add Video
          </Button>
        </CardContent>
      </Card>

      {/* Video List */}
      <div>
        <h3 className="text-gold-light/70 text-sm font-medium mb-3">
          Videos ({videos.length})
        </h3>
        {videos.length === 0 ? (
          <Card className="bg-navy border-gold/10">
            <CardContent className="py-12 text-center text-gold-light/40">
              No videos yet. Add your first YouTube video above.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((video) => {
              const videoId = extractYouTubeId(video.youtubeUrl);
              return (
                <Card key={video.id} className="bg-navy border-gold/15 overflow-hidden group">
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <CardContent className="p-3 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-gold-light text-sm font-medium truncate">{video.title || "Untitled"}</p>
                      {video.description && (
                        <p className="text-gold-light/50 text-xs mt-0.5 line-clamp-2">{video.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        removeVideo(video.id);
                        toast.success("Video removed");
                      }}
                      className="text-destructive hover:text-destructive/80 shrink-0 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoManager;
