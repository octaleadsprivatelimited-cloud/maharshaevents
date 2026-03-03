import { useState } from "react";
import { Plus, Trash2, Bell, BellRing, ToggleLeft, ToggleRight, Megaphone } from "lucide-react";
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
