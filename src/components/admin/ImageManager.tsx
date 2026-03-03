import { useState, useRef, useCallback } from "react";
import { Plus, Trash2, Upload, ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useGalleryImages } from "@/lib/useFirebaseData";
import { toast } from "sonner";

const CATEGORIES = ["Wedding", "Birthday", "Corporate", "Decoration", "Venue", "Other"];

const ImageManager = () => {
  const { images, addImage, removeImage } = useGalleryImages();
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Wedding");
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleAdd = () => {
    if (!preview) {
      toast.error("Please upload an image");
      return;
    }
    addImage({ url: preview, caption: caption.trim(), category });
    setPreview(null);
    setCaption("");
    if (fileRef.current) fileRef.current.value = "";
    toast.success("Image added to gallery");
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <Card className="border-border">
        <CardContent className="p-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Upload className="h-4 w-4 text-accent" /> Upload New Image
          </h3>

          {/* Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-colors ${
              dragActive
                ? "border-accent bg-accent/5"
                : preview
                ? "border-border bg-muted/30"
                : "border-border hover:border-accent/50 hover:bg-muted/50"
            } ${preview ? "p-3" : "p-8"}`}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />

            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="mx-auto max-h-48 rounded-lg object-contain"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreview(null);
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                  className="absolute -right-1 -top-1 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 rounded-full bg-muted p-3">
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Drop image here or click to browse
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  PNG, JPG, WEBP up to 10MB
                </p>
              </div>
            )}
          </div>

          {/* Caption & Category */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Caption
              </label>
              <Input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Describe this image..."
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <Button onClick={handleAdd} className="mt-4 gap-1.5" disabled={!preview}>
            <Plus className="h-4 w-4" /> Add to Gallery
          </Button>
        </CardContent>
      </Card>

      {/* Gallery Grid */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            Gallery
          </h3>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {images.length} images
          </span>
        </div>

        {images.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-border py-16 text-center">
            <ImageIcon className="mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No images yet</p>
            <p className="mt-1 text-xs text-muted-foreground/60">Upload your first image above</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="group relative overflow-hidden rounded-lg border border-border bg-card"
              >
                <div className="aspect-square">
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="p-2.5">
                    <p className="truncate text-xs font-medium text-white">
                      {img.caption || "Untitled"}
                    </p>
                    <p className="text-[10px] text-white/60">{img.category}</p>
                  </div>
                </div>
                {/* Delete */}
                <button
                  onClick={() => {
                    removeImage(img.id);
                    toast.success("Image removed");
                  }}
                  className="absolute right-1.5 top-1.5 rounded-md bg-destructive/90 p-1 text-destructive-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageManager;
