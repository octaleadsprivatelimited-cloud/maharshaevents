import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Image,
  Video,
  Bell,
  LayoutDashboard,
  ArrowLeft,
  ImagePlus,
  Youtube,
  BellRing,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageManager from "@/components/admin/ImageManager";
import VideoManager from "@/components/admin/VideoManager";
import NotificationManager from "@/components/admin/NotificationManager";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "images", label: "Gallery Images", icon: ImagePlus, description: "Upload & manage gallery" },
  { id: "videos", label: "YouTube Videos", icon: Youtube, description: "Embed video content" },
  { id: "notifications", label: "Notifications", icon: BellRing, description: "Site announcements" },
] as const;

type TabId = (typeof NAV_ITEMS)[number]["id"];

const Admin = () => {
  const [activeTab, setActiveTab] = useState<TabId>("images");

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="flex h-14 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-lg font-semibold text-foreground">Admin Panel</h1>
            </div>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-1.5">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Site
            </Button>
          </Link>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 border-r border-border bg-card md:block">
          <div className="p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Content Management
            </p>
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                    activeTab === item.id
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <div className="min-w-0">
                    <p className="truncate">{item.label}</p>
                    <p className="truncate text-[11px] opacity-60">{item.description}</p>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs font-medium text-foreground">Firebase Status</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Using localStorage fallback. Connect Firebase to sync data.
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span className="text-[11px] text-amber-600">Not connected</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Tab Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card md:hidden">
          <div className="flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] transition-colors",
                  activeTab === item.id
                    ? "text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", activeTab === item.id && "text-accent")} />
                <span>{item.label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 pb-20 md:pb-0">
          <div className="mx-auto max-w-4xl p-4 md:p-8">
            {/* Page Header */}
            <div className="mb-6">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                {NAV_ITEMS.find((i) => i.id === activeTab)?.label}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {NAV_ITEMS.find((i) => i.id === activeTab)?.description}
              </p>
            </div>

            {/* Content */}
            {activeTab === "images" && <ImageManager />}
            {activeTab === "videos" && <VideoManager />}
            {activeTab === "notifications" && <NotificationManager />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
