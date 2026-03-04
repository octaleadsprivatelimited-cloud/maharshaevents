import { useState } from "react";
import { Plus, Trash2, Youtube, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useVideos } from "@/lib/useFirebaseData";
import { extractYouTubeId } from "@/lib/youtube";
import { toast } from "sonner";

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
      toast.error("Invalid YouTube URL. Use a standard youtube.com or youtu.be link.");
      return;
    }
    addVideo({ youtubeUrl: url.trim(), title: title.trim(), description: description.trim() });
    setUrl("");
    setTitle("");
    setDescription("");
    toast.success("Video added successfully");
  };

  return (
    <div className="space-y-8">
      {/* Add Video */}
      <Card className="border-border">
        <CardContent className="p-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Youtube className="h-4 w-4 text-destructive" /> Add YouTube Video
          </h3>

          <div className="space-y-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">YouTube URL</label>
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Event Highlight Reel"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Description</label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description..."
                />
              </div>
            </div>
          </div>

          <Button onClick={handleAdd} className="mt-4 gap-1.5">
            <Plus className="h-4 w-4" /> Add Video
          </Button>
        </CardContent>
      </Card>

      {/* Video List */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Videos</h3>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {videos.length} videos
          </span>
        </div>

        {videos.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-border py-16 text-center">
            <PlayCircle className="mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No videos yet</p>
            <p className="mt-1 text-xs text-muted-foreground/60">Add your first YouTube video above</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {videos.map((video) => {
              const videoId = extractYouTubeId(video.youtubeUrl);
              return (
                <Card key={video.id} className="overflow-hidden border-border">
                  <div className="aspect-video bg-muted">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={video.title}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <CardContent className="flex items-start justify-between gap-2 p-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {video.title || "Untitled"}
                      </p>
                      {video.description && (
                        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                          {video.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        removeVideo(video.id);
                        toast.success("Video removed");
                      }}
                      className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
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
