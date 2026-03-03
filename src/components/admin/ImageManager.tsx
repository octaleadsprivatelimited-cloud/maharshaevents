import { useState } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGalleryImages } from "@/lib/useFirebaseData";
import { toast } from "sonner";

const CATEGORIES = ["Wedding", "Birthday", "Corporate", "Decoration", "Venue", "Other"];

const ImageManager = () => {
  const { images, addImage, removeImage } = useGalleryImages();
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Wedding");

  const handleAdd = () => {
    if (!url.trim()) {
      toast.error("Please enter an image URL");
      return;
    }
    addImage({ url: url.trim(), caption: caption.trim(), category });
    setUrl("");
    setCaption("");
    toast.success("Image added successfully");
  };

  const handleDelete = (id: string) => {
    removeImage(id);
    toast.success("Image removed");
  };

  return (
    <div className="space-y-6">
      {/* Add Image Form */}
      <Card className="bg-navy border-gold/20">
        <CardHeader>
          <CardTitle className="text-gold-light flex items-center gap-2 text-lg">
            <Upload className="w-5 h-5" /> Add New Image
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-gold-light/70 text-sm mb-1 block">Image URL</label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="bg-navy-dark border-gold/20 text-gold-light placeholder:text-gold-light/30"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gold-light/70 text-sm mb-1 block">Caption</label>
              <Input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Beautiful wedding setup"
                className="bg-navy-dark border-gold/20 text-gold-light placeholder:text-gold-light/30"
              />
            </div>
            <div>
              <label className="text-gold-light/70 text-sm mb-1 block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 rounded-md border border-gold/20 bg-navy-dark text-gold-light px-3 text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <Button onClick={handleAdd} variant="hero" size="sm">
            <Plus className="w-4 h-4 mr-1" /> Add Image
          </Button>
        </CardContent>
      </Card>

      {/* Image Grid */}
      <div>
        <h3 className="text-gold-light/70 text-sm font-medium mb-3">
          Gallery ({images.length} images)
        </h3>
        {images.length === 0 ? (
          <Card className="bg-navy border-gold/10">
            <CardContent className="py-12 text-center text-gold-light/40">
              No images yet. Add your first image above.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img) => (
              <Card key={img.id} className="bg-navy border-gold/15 overflow-hidden group">
                <div className="aspect-video bg-navy-dark relative">
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="absolute top-2 right-2 bg-destructive/90 text-destructive-foreground p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <CardContent className="p-3">
                  <p className="text-gold-light text-sm font-medium truncate">{img.caption || "Untitled"}</p>
                  <span className="text-gold/60 text-xs">{img.category}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageManager;
