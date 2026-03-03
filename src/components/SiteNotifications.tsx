import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import type { SiteNotification } from "@/lib/useFirebaseData";

const STORAGE_KEY = "maharsha_notifications";
const DISMISSED_KEY = "maharsha_dismissed_notifications";

function getActiveNotifications(): SiteNotification[] {
  try {
    const all: SiteNotification[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const dismissed: string[] = JSON.parse(localStorage.getItem(DISMISSED_KEY) || "[]");
    return all.filter((n) => n.active && !dismissed.includes(n.id));
  } catch {
    return [];
  }
}

function dismiss(id: string) {
  try {
    const dismissed: string[] = JSON.parse(localStorage.getItem(DISMISSED_KEY) || "[]");
    localStorage.setItem(DISMISSED_KEY, JSON.stringify([...dismissed, id]));
  } catch {}
}

const SiteNotifications = () => {
  const [banners, setBanners] = useState<SiteNotification[]>([]);
  const [showBanner, setShowBanner] = useState<SiteNotification | null>(null);

  useEffect(() => {
    const active = getActiveNotifications();

    // Show toasts
    active
      .filter((n) => n.type === "toast")
      .forEach((n) => {
        toast(n.title, { description: n.message, duration: 6000 });
        dismiss(n.id);
      });

    // Show first active banner
    const bannerNotifs = active.filter((n) => n.type === "banner");
    setBanners(bannerNotifs);
    if (bannerNotifs.length > 0) {
      setShowBanner(bannerNotifs[0]);
    }
  }, []);

  const closeBanner = () => {
    if (showBanner) {
      dismiss(showBanner.id);
      setShowBanner(null);
    }
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-dark/80 backdrop-blur-sm p-4"
          onClick={closeBanner}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-navy border border-gold/30 rounded-lg max-w-md w-full p-6 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeBanner}
              className="absolute top-3 right-3 text-gold-light/50 hover:text-gold-light"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              {showBanner.imageUrl ? (
                <img
                  src={showBanner.imageUrl}
                  alt={showBanner.title}
                  className="w-full max-h-48 object-cover rounded-md mb-4"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-gold text-xl">✨</span>
                </div>
              )}
              <h3 className="font-display text-xl text-gold-light mb-2">{showBanner.title}</h3>
              <p className="text-gold-light/60 text-sm">{showBanner.message}</p>
              <button
                onClick={closeBanner}
                className="mt-5 px-6 py-2 bg-gradient-gold text-navy-dark font-semibold rounded-md text-sm hover:opacity-90 transition-opacity"
              >
                Got it!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SiteNotifications;
