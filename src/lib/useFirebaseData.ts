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

// ─── Gallery Images ───

export function useGalleryImages() {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setImages(snap.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryImage)));
    });
    return unsub;
  }, []);

  const addImage = async (img: Omit<GalleryImage, "id" | "createdAt">) => {
    await addDoc(collection(db, "gallery"), { ...img, createdAt: Date.now() });
  };

  const removeImage = async (id: string) => {
    await deleteDoc(doc(db, "gallery", id));
  };

  return { images, addImage, removeImage };
}

// ─── Videos ───

export function useVideos() {
  const [videos, setVideos] = useState<VideoEmbed[]>([]);

  useEffect(() => {
    const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setVideos(snap.docs.map((d) => ({ id: d.id, ...d.data() } as VideoEmbed)));
    });
    return unsub;
  }, []);

  const addVideo = async (v: Omit<VideoEmbed, "id" | "createdAt">) => {
    await addDoc(collection(db, "videos"), { ...v, createdAt: Date.now() });
  };

  const removeVideo = async (id: string) => {
    await deleteDoc(doc(db, "videos", id));
  };

  return { videos, addVideo, removeVideo };
}

// ─── Notifications ───

export function useNotifications() {
  const [notifications, setNotifications] = useState<SiteNotification[]>([]);

  useEffect(() => {
    const q = query(collection(db, "notifications"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setNotifications(snap.docs.map((d) => ({ id: d.id, ...d.data() } as SiteNotification)));
    });
    return unsub;
  }, []);

  const addNotification = async (n: Omit<SiteNotification, "id" | "createdAt">) => {
    await addDoc(collection(db, "notifications"), { ...n, createdAt: Date.now() });
  };

  const removeNotification = async (id: string) => {
    await deleteDoc(doc(db, "notifications", id));
  };

  const toggleNotification = async (id: string) => {
    const notif = notifications.find((n) => n.id === id);
    if (notif) {
      await updateDoc(doc(db, "notifications", id), { active: !notif.active });
    }
  };

  return { notifications, addNotification, removeNotification, toggleNotification };
}

// ─── Enquiries ───

export function useEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setEnquiries(
        snap.docs.map((d) => {
          const data = d.data();
          return { id: d.id, ...data, notes: data.notes || [] } as Enquiry;
        })
      );
    });
    return unsub;
  }, []);

  const addEnquiry = async (e: Omit<Enquiry, "id" | "createdAt" | "status" | "notes">) => {
    await addDoc(collection(db, "enquiries"), {
      ...e,
      createdAt: Date.now(),
      status: "new",
      notes: [],
    });
  };

  const updateStatus = async (id: string, status: FollowUpStatus) => {
    await updateDoc(doc(db, "enquiries", id), { status });
  };

  const addNote = async (enquiryId: string, text: string) => {
    await updateDoc(doc(db, "enquiries", enquiryId), {
      notes: arrayUnion({ id: crypto.randomUUID(), text, createdAt: Date.now() }),
    });
  };

  const removeEnquiry = async (id: string) => {
    await deleteDoc(doc(db, "enquiries", id));
  };

  return { enquiries, addEnquiry, updateStatus, addNote, removeEnquiry };
}

// Standalone function to save enquiry from public forms
export async function saveEnquiry(data: Omit<Enquiry, "id" | "createdAt" | "status" | "notes">) {
  await addDoc(collection(db, "enquiries"), {
    ...data,
    createdAt: Date.now(),
    status: "new",
    notes: [],
  });
}
