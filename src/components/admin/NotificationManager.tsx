import { useState } from "react";
import { Plus, Trash2, Bell, BellRing, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNotifications, type SiteNotification } from "@/lib/useFirebaseData";
import { toast } from "sonner";

const NotificationManager = () => {
  const { notifications, addNotification, removeNotification, toggleNotification } = useNotifications();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"banner" | "toast">("banner");

  const handleAdd = () => {
    if (!title.trim() || !message.trim()) {
      toast.error("Please fill in both title and message");
      return;
    }
    addNotification({ title: title.trim(), message: message.trim(), type, active: true });
    setTitle("");
    setMessage("");
    toast.success("Notification created");
  };

  return (
    <div className="space-y-6">
      {/* Add Notification */}
      <Card className="bg-navy border-gold/20">
        <CardHeader>
          <CardTitle className="text-gold-light flex items-center gap-2 text-lg">
            <BellRing className="w-5 h-5" /> Create Notification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gold-light/70 text-sm mb-1 block">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Special Offer!"
                className="bg-navy-dark border-gold/20 text-gold-light placeholder:text-gold-light/30"
              />
            </div>
            <div>
              <label className="text-gold-light/70 text-sm mb-1 block">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "banner" | "toast")}
                className="w-full h-10 rounded-md border border-gold/20 bg-navy-dark text-gold-light px-3 text-sm"
              >
                <option value="banner">Banner / Modal</option>
                <option value="toast">Toast Notification</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-gold-light/70 text-sm mb-1 block">Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Get 20% off on wedding packages this month!"
              className="bg-navy-dark border-gold/20 text-gold-light placeholder:text-gold-light/30 min-h-[60px]"
            />
          </div>
          <Button onClick={handleAdd} variant="hero" size="sm">
            <Plus className="w-4 h-4 mr-1" /> Create Notification
          </Button>
        </CardContent>
      </Card>

      {/* Notification List */}
      <div>
        <h3 className="text-gold-light/70 text-sm font-medium mb-3">
          Notifications ({notifications.length})
        </h3>
        {notifications.length === 0 ? (
          <Card className="bg-navy border-gold/10">
            <CardContent className="py-12 text-center text-gold-light/40">
              No notifications yet. Create one above to display on the site.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => (
              <Card key={n.id} className={`bg-navy border-gold/15 ${!n.active ? "opacity-50" : ""}`}>
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="shrink-0 mt-1">
                    {n.type === "banner" ? (
                      <Bell className="w-5 h-5 text-gold" />
                    ) : (
                      <BellRing className="w-5 h-5 text-gold-light/60" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-gold-light text-sm font-medium">{n.title}</p>
                      <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        n.type === "banner"
                          ? "bg-gold/20 text-gold"
                          : "bg-gold-light/10 text-gold-light/60"
                      }`}>
                        {n.type}
                      </span>
                    </div>
                    <p className="text-gold-light/50 text-xs">{n.message}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleNotification(n.id)}
                      className="text-gold-light/60 hover:text-gold transition-colors"
                      title={n.active ? "Deactivate" : "Activate"}
                    >
                      {n.active ? (
                        <ToggleRight className="w-6 h-6 text-green-400" />
                      ) : (
                        <ToggleLeft className="w-6 h-6" />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        removeNotification(n.id);
                        toast.success("Notification deleted");
                      }}
                      className="text-destructive hover:text-destructive/80 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
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
