import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeft,
  ImagePlus,
  Youtube,
  BellRing,
  KeyRound,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageManager from "@/components/admin/ImageManager";
import VideoManager from "@/components/admin/VideoManager";
import NotificationManager from "@/components/admin/NotificationManager";
import ChangePassword from "@/components/admin/ChangePassword";
import AdminLogin from "@/components/admin/AdminLogin";
import { cn } from "@/lib/utils";
import { auth, ADMIN_EMAILS } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { toast } from "sonner";

const NAV_ITEMS = [
  { id: "images", label: "Gallery Images", icon: ImagePlus, description: "Upload & manage gallery" },
  { id: "videos", label: "YouTube Videos", icon: Youtube, description: "Embed video content" },
  { id: "notifications", label: "Notifications", icon: BellRing, description: "Site announcements" },
  { id: "password", label: "Change Password", icon: KeyRound, description: "Update your credentials" },
] as const;

type TabId = (typeof NAV_ITEMS)[number]["id"];

const Admin = () => {
  const [activeTab, setActiveTab] = useState<TabId>("images");
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const email = firebaseUser.email?.toLowerCase() || "";
        if (ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(email)) {
          setUser(firebaseUser);
        } else {
          signOut(auth);
          toast.error("You are not authorized to access this panel");
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out");
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

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
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-muted-foreground md:inline">
              {user.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5">
              <LogOut className="h-3.5 w-3.5" /> Logout
            </Button>
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-1.5">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Site
              </Button>
            </Link>
          </div>
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
            <div className="mb-6">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                {NAV_ITEMS.find((i) => i.id === activeTab)?.label}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {NAV_ITEMS.find((i) => i.id === activeTab)?.description}
              </p>
            </div>

            {activeTab === "images" && <ImageManager />}
            {activeTab === "videos" && <VideoManager />}
            {activeTab === "notifications" && <NotificationManager />}
            {activeTab === "password" && <ChangePassword />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
