import { useState } from "react";
import { Link } from "react-router-dom";
import { Image, Video, Bell, LayoutDashboard, ArrowLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageManager from "@/components/admin/ImageManager";
import VideoManager from "@/components/admin/VideoManager";
import NotificationManager from "@/components/admin/NotificationManager";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("images");

  return (
    <div className="min-h-screen bg-navy-dark">
      {/* Admin Header */}
      <header className="bg-navy border-b border-gold/20 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-5 h-5 text-gold" />
          <h1 className="font-display text-xl text-gradient-gold">Maharsha Admin</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-gold-light/70 hover:text-gold">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Site
            </Button>
          </Link>
        </div>
      </header>

      {/* Dashboard */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h2 className="font-display text-2xl text-gold-light mb-2">Content Management</h2>
          <p className="text-gold-light/50 text-sm">
            Manage gallery images, videos, and site notifications.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-navy border border-gold/20 p-1 h-auto flex-wrap">
            <TabsTrigger
              value="images"
              className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold text-gold-light/60 gap-2"
            >
              <Image className="w-4 h-4" /> Gallery Images
            </TabsTrigger>
            <TabsTrigger
              value="videos"
              className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold text-gold-light/60 gap-2"
            >
              <Video className="w-4 h-4" /> YouTube Videos
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-gold/20 data-[state=active]:text-gold text-gold-light/60 gap-2"
            >
              <Bell className="w-4 h-4" /> Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="images">
            <ImageManager />
          </TabsContent>
          <TabsContent value="videos">
            <VideoManager />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
