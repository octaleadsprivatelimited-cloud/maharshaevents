import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";

// Types for admin-managed content
export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: string;
  createdAt: number;
}

export interface VideoEmbed {
  id: string;
  youtubeUrl: string;
  title: string;
  description: string;
  createdAt: number;
}

export interface SiteNotification {
  id: string;
  title: string;
  message: string;
  type: "banner" | "toast";
  active: boolean;
  imageUrl?: string;
  createdAt: number;
}

export type EnquirySource = "booking" | "contact";
export type FollowUpStatus = "new" | "contacted" | "call_done" | "proposal_sent" | "converted" | "closed";

export interface EnquiryNote {
  id: string;
  text: string;
  createdAt: number;
}

export interface Enquiry {
  id: string;
  source: EnquirySource;
  name: string;
  email: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  budget?: string;
  subject?: string;
  message: string;
  status: FollowUpStatus;
  notes: EnquiryNote[];
  createdAt: number;
}

// ─── Local Storage Helper Utilities ───

function getLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("maharsha_data_sync", { detail: { key } }));
  } catch (err) {
    console.warn(`Failed to store local cache for ${key}:`, err);
  }
}

// ─── Gallery Images ───

const GALLERY_STORAGE_KEY = "maharsha_gallery_data";

export function useGalleryImages() {
  const [images, setImages] = useState<GalleryImage[]>(() =>
    getLocal<GalleryImage[]>(GALLERY_STORAGE_KEY, [])
  );

  useEffect(() => {
    // Listen for local sync events
    const handleSync = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.key === GALLERY_STORAGE_KEY) {
        setImages(getLocal<GalleryImage[]>(GALLERY_STORAGE_KEY, []));
      }
    };
    window.addEventListener("maharsha_data_sync", handleSync);

    let unsub = () => {};
    try {
      const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
      unsub = onSnapshot(
        q,
        (snap) => {
          const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryImage));
          if (items.length > 0 || snap.metadata.fromCache === false) {
            setImages(items);
            setLocal(GALLERY_STORAGE_KEY, items);
          }
        },
        (error) => {
          console.warn("Firestore gallery subscription error, using local data:", error.message);
          setImages(getLocal<GalleryImage[]>(GALLERY_STORAGE_KEY, []));
        }
      );
    } catch (err) {
      console.warn("Could not initiate Firestore gallery listener:", err);
    }

    return () => {
      window.removeEventListener("maharsha_data_sync", handleSync);
      unsub();
    };
  }, []);

  const addImage = async (img: Omit<GalleryImage, "id" | "createdAt">) => {
    const newId = "local_img_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
    const newDoc: GalleryImage = { ...img, id: newId, createdAt: Date.now() };

    // Update local immediately
    const current = getLocal<GalleryImage[]>(GALLERY_STORAGE_KEY, images);
    const updated = [newDoc, ...current];
    setImages(updated);
    setLocal(GALLERY_STORAGE_KEY, updated);

    // Try firestore
    try {
      const docRef = await addDoc(collection(db, "gallery"), { ...img, createdAt: Date.now() });
      if (docRef.id) {
        newDoc.id = docRef.id;
        const synced = [newDoc, ...current];
        setImages(synced);
        setLocal(GALLERY_STORAGE_KEY, synced);
      }
    } catch (err) {
      console.warn("Firestore addImage failed (using local copy):", err);
    }
  };

  const removeImage = async (id: string) => {
    const current = getLocal<GalleryImage[]>(GALLERY_STORAGE_KEY, images);
    const updated = current.filter((img) => img.id !== id);
    setImages(updated);
    setLocal(GALLERY_STORAGE_KEY, updated);

    try {
      if (!id.startsWith("local_")) {
        await deleteDoc(doc(db, "gallery", id));
      }
    } catch (err) {
      console.warn("Firestore removeImage failed:", err);
    }
  };

  return { images, addImage, removeImage };
}

// ─── Videos ───

const VIDEOS_STORAGE_KEY = "maharsha_videos_data";

export function useVideos() {
  const [videos, setVideos] = useState<VideoEmbed[]>(() =>
    getLocal<VideoEmbed[]>(VIDEOS_STORAGE_KEY, [])
  );

  useEffect(() => {
    const handleSync = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.key === VIDEOS_STORAGE_KEY) {
        setVideos(getLocal<VideoEmbed[]>(VIDEOS_STORAGE_KEY, []));
      }
    };
    window.addEventListener("maharsha_data_sync", handleSync);

    let unsub = () => {};
    try {
      const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
      unsub = onSnapshot(
        q,
        (snap) => {
          const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as VideoEmbed));
          if (items.length > 0 || snap.metadata.fromCache === false) {
            setVideos(items);
            setLocal(VIDEOS_STORAGE_KEY, items);
          }
        },
        (error) => {
          console.warn("Firestore videos subscription error, using local data:", error.message);
          setVideos(getLocal<VideoEmbed[]>(VIDEOS_STORAGE_KEY, []));
        }
      );
    } catch (err) {
      console.warn("Could not initiate Firestore videos listener:", err);
    }

    return () => {
      window.removeEventListener("maharsha_data_sync", handleSync);
      unsub();
    };
  }, []);

  const addVideo = async (v: Omit<VideoEmbed, "id" | "createdAt">) => {
    const newId = "local_vid_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
    const newDoc: VideoEmbed = { ...v, id: newId, createdAt: Date.now() };

    const current = getLocal<VideoEmbed[]>(VIDEOS_STORAGE_KEY, videos);
    const updated = [newDoc, ...current];
    setVideos(updated);
    setLocal(VIDEOS_STORAGE_KEY, updated);

    try {
      const docRef = await addDoc(collection(db, "videos"), { ...v, createdAt: Date.now() });
      if (docRef.id) {
        newDoc.id = docRef.id;
        const synced = [newDoc, ...current];
        setVideos(synced);
        setLocal(VIDEOS_STORAGE_KEY, synced);
      }
    } catch (err) {
      console.warn("Firestore addVideo failed (using local copy):", err);
    }
  };

  const removeVideo = async (id: string) => {
    const current = getLocal<VideoEmbed[]>(VIDEOS_STORAGE_KEY, videos);
    const updated = current.filter((v) => v.id !== id);
    setVideos(updated);
    setLocal(VIDEOS_STORAGE_KEY, updated);

    try {
      if (!id.startsWith("local_")) {
        await deleteDoc(doc(db, "videos", id));
      }
    } catch (err) {
      console.warn("Firestore removeVideo failed:", err);
    }
  };

  return { videos, addVideo, removeVideo };
}

// ─── Notifications ───

const NOTIFICATIONS_STORAGE_KEY = "maharsha_notifications_data";

export function useNotifications() {
  const [notifications, setNotifications] = useState<SiteNotification[]>(() =>
    getLocal<SiteNotification[]>(NOTIFICATIONS_STORAGE_KEY, [])
  );

  useEffect(() => {
    const handleSync = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.key === NOTIFICATIONS_STORAGE_KEY) {
        setNotifications(getLocal<SiteNotification[]>(NOTIFICATIONS_STORAGE_KEY, []));
      }
    };
    window.addEventListener("maharsha_data_sync", handleSync);

    let unsub = () => {};
    try {
      const q = query(collection(db, "notifications"), orderBy("createdAt", "desc"));
      unsub = onSnapshot(
        q,
        (snap) => {
          const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as SiteNotification));
          if (items.length > 0 || snap.metadata.fromCache === false) {
            setNotifications(items);
            setLocal(NOTIFICATIONS_STORAGE_KEY, items);
          }
        },
        (error) => {
          console.warn("Firestore notifications subscription error, using local data:", error.message);
          setNotifications(getLocal<SiteNotification[]>(NOTIFICATIONS_STORAGE_KEY, []));
        }
      );
    } catch (err) {
      console.warn("Could not initiate Firestore notifications listener:", err);
    }

    return () => {
      window.removeEventListener("maharsha_data_sync", handleSync);
      unsub();
    };
  }, []);

  const addNotification = async (n: Omit<SiteNotification, "id" | "createdAt">) => {
    const newId = "local_notif_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
    const newDoc: SiteNotification = { ...n, id: newId, createdAt: Date.now() };

    const current = getLocal<SiteNotification[]>(NOTIFICATIONS_STORAGE_KEY, notifications);
    const updated = [newDoc, ...current];
    setNotifications(updated);
    setLocal(NOTIFICATIONS_STORAGE_KEY, updated);

    try {
      const docRef = await addDoc(collection(db, "notifications"), { ...n, createdAt: Date.now() });
      if (docRef.id) {
        newDoc.id = docRef.id;
        const synced = [newDoc, ...current];
        setNotifications(synced);
        setLocal(NOTIFICATIONS_STORAGE_KEY, synced);
      }
    } catch (err) {
      console.warn("Firestore addNotification failed (using local copy):", err);
    }
  };

  const removeNotification = async (id: string) => {
    const current = getLocal<SiteNotification[]>(NOTIFICATIONS_STORAGE_KEY, notifications);
    const updated = current.filter((n) => n.id !== id);
    setNotifications(updated);
    setLocal(NOTIFICATIONS_STORAGE_KEY, updated);

    try {
      if (!id.startsWith("local_")) {
        await deleteDoc(doc(db, "notifications", id));
      }
    } catch (err) {
      console.warn("Firestore removeNotification failed:", err);
    }
  };

  const toggleNotification = async (id: string) => {
    const current = getLocal<SiteNotification[]>(NOTIFICATIONS_STORAGE_KEY, notifications);
    const updated = current.map((n) => (n.id === id ? { ...n, active: !n.active } : n));
    setNotifications(updated);
    setLocal(NOTIFICATIONS_STORAGE_KEY, updated);

    try {
      const notif = current.find((n) => n.id === id);
      if (notif && !id.startsWith("local_")) {
        await updateDoc(doc(db, "notifications", id), { active: !notif.active });
      }
    } catch (err) {
      console.warn("Firestore toggleNotification failed:", err);
    }
  };

  return { notifications, addNotification, removeNotification, toggleNotification };
}

// ─── Enquiries ───

const ENQUIRIES_STORAGE_KEY = "maharsha_enquiries_data";

export function useEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() =>
    getLocal<Enquiry[]>(ENQUIRIES_STORAGE_KEY, [])
  );

  useEffect(() => {
    const handleSync = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.key === ENQUIRIES_STORAGE_KEY) {
        setEnquiries(getLocal<Enquiry[]>(ENQUIRIES_STORAGE_KEY, []));
      }
    };
    window.addEventListener("maharsha_data_sync", handleSync);

    let unsub = () => {};
    try {
      const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
      unsub = onSnapshot(
        q,
        (snap) => {
          const items = snap.docs.map((d) => {
            const data = d.data();
            return { id: d.id, ...data, notes: data.notes || [] } as Enquiry;
          });
          if (items.length > 0 || snap.metadata.fromCache === false) {
            // Merge with local to never lose any locally submitted enquiry
            const local = getLocal<Enquiry[]>(ENQUIRIES_STORAGE_KEY, []);
            const firestoreIds = new Set(items.map((i) => i.id));
            const merged = [...items, ...local.filter((l) => !firestoreIds.has(l.id))];
            setEnquiries(merged);
            setLocal(ENQUIRIES_STORAGE_KEY, merged);
          }
        },
        (error) => {
          console.warn("Firestore enquiries subscription error, using local data:", error.message);
          setEnquiries(getLocal<Enquiry[]>(ENQUIRIES_STORAGE_KEY, []));
        }
      );
    } catch (err) {
      console.warn("Could not initiate Firestore enquiries listener:", err);
    }

    return () => {
      window.removeEventListener("maharsha_data_sync", handleSync);
      unsub();
    };
  }, []);

  const addEnquiry = async (e: Omit<Enquiry, "id" | "createdAt" | "status" | "notes">) => {
    const newId = "local_enq_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
    const newDoc: Enquiry = {
      ...e,
      id: newId,
      createdAt: Date.now(),
      status: "new",
      notes: [],
    };

    const current = getLocal<Enquiry[]>(ENQUIRIES_STORAGE_KEY, enquiries);
    const updated = [newDoc, ...current];
    setEnquiries(updated);
    setLocal(ENQUIRIES_STORAGE_KEY, updated);

    try {
      const docRef = await addDoc(collection(db, "enquiries"), {
        ...e,
        createdAt: Date.now(),
        status: "new",
        notes: [],
      });
      if (docRef.id) {
        newDoc.id = docRef.id;
        const synced = [newDoc, ...current];
        setEnquiries(synced);
        setLocal(ENQUIRIES_STORAGE_KEY, synced);
      }
    } catch (err) {
      console.warn("Firestore addEnquiry failed (saved locally):", err);
    }
  };

  const updateStatus = async (id: string, status: FollowUpStatus) => {
    const current = getLocal<Enquiry[]>(ENQUIRIES_STORAGE_KEY, enquiries);
    const updated = current.map((e) => (e.id === id ? { ...e, status } : e));
    setEnquiries(updated);
    setLocal(ENQUIRIES_STORAGE_KEY, updated);

    try {
      if (!id.startsWith("local_")) {
        await updateDoc(doc(db, "enquiries", id), { status });
      }
    } catch (err) {
      console.warn("Firestore updateStatus failed:", err);
    }
  };

  const addNote = async (enquiryId: string, text: string) => {
    const newNote = { id: crypto.randomUUID(), text, createdAt: Date.now() };
    const current = getLocal<Enquiry[]>(ENQUIRIES_STORAGE_KEY, enquiries);
    const updated = current.map((e) =>
      e.id === enquiryId ? { ...e, notes: [...e.notes, newNote] } : e
    );
    setEnquiries(updated);
    setLocal(ENQUIRIES_STORAGE_KEY, updated);

    try {
      if (!enquiryId.startsWith("local_")) {
        await updateDoc(doc(db, "enquiries", enquiryId), {
          notes: arrayUnion(newNote),
        });
      }
    } catch (err) {
      console.warn("Firestore addNote failed:", err);
    }
  };

  const removeEnquiry = async (id: string) => {
    const current = getLocal<Enquiry[]>(ENQUIRIES_STORAGE_KEY, enquiries);
    const updated = current.filter((e) => e.id !== id);
    setEnquiries(updated);
    setLocal(ENQUIRIES_STORAGE_KEY, updated);

    try {
      if (!id.startsWith("local_")) {
        await deleteDoc(doc(db, "enquiries", id));
      }
    } catch (err) {
      console.warn("Firestore removeEnquiry failed:", err);
    }
  };

  return { enquiries, addEnquiry, updateStatus, addNote, removeEnquiry };
}

// Standalone function to save enquiry from public forms
export async function saveEnquiry(data: Omit<Enquiry, "id" | "createdAt" | "status" | "notes">) {
  const newId = "local_enq_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
  const newDoc: Enquiry = {
    ...data,
    id: newId,
    createdAt: Date.now(),
    status: "new",
    notes: [],
  };

  // Always save locally immediately
  try {
    const current = getLocal<Enquiry[]>(ENQUIRIES_STORAGE_KEY, []);
    const updated = [newDoc, ...current];
    setLocal(ENQUIRIES_STORAGE_KEY, updated);
  } catch (err) {
    console.warn("Local storage save failed for enquiry:", err);
  }

  // Also write to firestore
  try {
    await addDoc(collection(db, "enquiries"), {
      ...data,
      createdAt: Date.now(),
      status: "new",
      notes: [],
    });
  } catch (err) {
    console.warn("Firestore saveEnquiry error (stored safely in local backup):", err);
  }
}

