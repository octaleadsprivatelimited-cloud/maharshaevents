import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import type { SiteNotification } from "@/lib/useFirebaseData";

const DISMISSED_KEY = "maharsha_dismissed_notifications";

function getDismissed(): string[] {
  try {
    return JSON.parse(localStorage.getItem(DISMISSED_KEY) || "[]");
  } catch {
    return [];
  }
}

function dismiss(id: string) {
  try {
    const dismissed = getDismissed();
    localStorage.setItem(DISMISSED_KEY, JSON.stringify([...dismissed, id]));
  } catch (e) {
    console.error("Failed to persist dismissed notification:", e);
  }
}

const SiteNotifications = () => {
  const [showBanner, setShowBanner] = useState<SiteNotification | null>(null);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const startListener = () => {
      const q = query(collection(db, "notifications"), where("active", "==", true));
      unsub = onSnapshot(q, (snap) => {
        const dismissed = getDismissed();
        const active = snap.docs
          .map((d) => ({ id: d.id, ...d.data() } as SiteNotification))
          .filter((n) => !dismissed.includes(n.id));

        // Show toasts
        active
          .filter((n) => n.type === "toast")
          .forEach((n) => {
            toast(n.title, { description: n.message, duration: 6000 });
            dismiss(n.id);
          });

        // Show first active banner
        const bannerNotifs = active.filter((n) => n.type === "banner");
        if (bannerNotifs.length > 0 && !showBanner) {
          setShowBanner(bannerNotifs[0]);
        }
      });
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => {
        timer = setTimeout(startListener, 1500);
      });
    } else {
      timer = setTimeout(startListener, 2500);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (unsub) unsub();
    };
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
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-6"
          onClick={closeBanner}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm sm:max-w-md overflow-hidden rounded-t-2xl sm:rounded-2xl bg-card shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeBanner}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Image - edge to edge, no border */}
            {showBanner.imageUrl && (
              <img
                src={showBanner.imageUrl}
                alt={showBanner.title || "Promotion"}
                className="w-full h-auto object-contain"
              />
            )}

            {/* Content */}
            <div className="px-5 py-5 sm:px-6 sm:py-6 text-center">
              {!showBanner.imageUrl && (
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15">
                  <span className="text-xl">✨</span>
                </div>
              )}
              {showBanner.title && (
                <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-1.5">
                  {showBanner.title}
                </h3>
              )}
              {showBanner.message && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {showBanner.message}
                </p>
              )}
              <button
                onClick={closeBanner}
                className="mt-5 w-full sm:w-auto px-8 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg text-sm transition-all hover:opacity-90 active:scale-[0.98]"
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
