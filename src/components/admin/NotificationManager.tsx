import { useState, useRef } from "react";
import { Plus, Trash2, Bell, BellRing, ToggleLeft, ToggleRight, Megaphone, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useNotifications } from "@/lib/useFirebaseData";
import { toast } from "sonner";

const NotificationManager = () => {
  const { notifications, addNotification, removeNotification, toggleNotification } = useNotifications();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"banner" | "toast">("banner");
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImageUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!title.trim() || !message.trim()) {
      toast.error("Please fill in both title and message");
      return;
    }
    addNotification({ title: title.trim(), message: message.trim(), type, active: true, ...(imageUrl.trim() ? { imageUrl: imageUrl.trim() } : {}) });
    setTitle("");
    setMessage("");
    setImageUrl("");
    toast.success("Notification created");
  };

  const activeCount = notifications.filter((n) => n.active).length;

  return (
    <div className="space-y-8">
      {/* Create Notification */}
      <Card className="border-border">
        <CardContent className="p-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
            <BellRing className="h-4 w-4 text-accent" /> Create Notification
          </h3>

          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Special Offer!"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as "banner" | "toast")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="banner">Banner / Modal</option>
                  <option value="toast">Toast Notification</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Get 20% off on wedding packages this month!"
                className="min-h-[80px]"
              />
            </div>
            {type === "banner" && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Promotional Image <span className="text-muted-foreground/50">(optional)</span>
                </label>
                {imageUrl ? (
                  <div className="relative mt-1 overflow-hidden rounded-md border border-border">
                    <img src={imageUrl} alt="Preview" className="h-36 w-full object-cover" />
                    <button
                      onClick={() => { setImageUrl(""); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                      className="absolute right-2 top-2 rounded-full bg-background/80 p-1 text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-1 flex w-full items-center justify-center gap-2 rounded-md border-2 border-dashed border-border py-8 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
                  >
                    <Upload className="h-4 w-4" /> Click to upload image
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            )}
          </div>

          <Button onClick={handleAdd} className="mt-4 gap-1.5">
            <Plus className="h-4 w-4" /> Create Notification
          </Button>
        </CardContent>
      </Card>

      {/* Notification List */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
          <div className="flex items-center gap-2">
            {activeCount > 0 && (
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                {activeCount} active
              </span>
            )}
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              {notifications.length} total
            </span>
          </div>
        </div>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-border py-16 text-center">
            <Megaphone className="mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No notifications yet</p>
            <p className="mt-1 text-xs text-muted-foreground/60">Create one to display on the site</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((n) => (
              <Card
                key={n.id}
                className={`border-border transition-opacity ${!n.active ? "opacity-50" : ""}`}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                    {n.type === "banner" ? (
                      <Bell className="h-4 w-4 text-accent" />
                    ) : (
                      <BellRing className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium text-foreground">{n.title}</p>
                      <span
                        className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                          n.type === "banner"
                            ? "bg-accent/15 text-accent"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {n.type}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{n.message}</p>
                    {n.imageUrl && (
                      <span className="mt-0.5 text-[10px] text-accent">📷 Has image</span>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      onClick={() => toggleNotification(n.id)}
                      className="rounded-md p-1.5 transition-colors hover:bg-muted"
                      title={n.active ? "Deactivate" : "Activate"}
                    >
                      {n.active ? (
                        <ToggleRight className="h-5 w-5 text-green-500" />
                      ) : (
                        <ToggleLeft className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        removeNotification(n.id);
                        toast.success("Notification deleted");
                      }}
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationManager;
