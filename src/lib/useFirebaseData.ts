import { useState, useEffect } from "react";

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
  createdAt: number;
}

// LocalStorage fallback until Firebase is configured
const STORAGE_KEYS = {
  images: "maharsha_gallery_images",
  videos: "maharsha_videos",
  notifications: "maharsha_notifications",
};

function getLocal<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function setLocal<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function useGalleryImages() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  useEffect(() => setImages(getLocal(STORAGE_KEYS.images)), []);

  const addImage = (img: Omit<GalleryImage, "id" | "createdAt">) => {
    const newImg: GalleryImage = { ...img, id: crypto.randomUUID(), createdAt: Date.now() };
    const updated = [newImg, ...images];
    setImages(updated);
    setLocal(STORAGE_KEYS.images, updated);
  };

  const removeImage = (id: string) => {
    const updated = images.filter((i) => i.id !== id);
    setImages(updated);
    setLocal(STORAGE_KEYS.images, updated);
  };

  return { images, addImage, removeImage };
}

export function useVideos() {
  const [videos, setVideos] = useState<VideoEmbed[]>([]);
  useEffect(() => setVideos(getLocal(STORAGE_KEYS.videos)), []);

  const addVideo = (v: Omit<VideoEmbed, "id" | "createdAt">) => {
    const newV: VideoEmbed = { ...v, id: crypto.randomUUID(), createdAt: Date.now() };
    const updated = [newV, ...videos];
    setVideos(updated);
    setLocal(STORAGE_KEYS.videos, updated);
  };

  const removeVideo = (id: string) => {
    const updated = videos.filter((v) => v.id !== id);
    setVideos(updated);
    setLocal(STORAGE_KEYS.videos, updated);
  };

  return { videos, addVideo, removeVideo };
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<SiteNotification[]>([]);
  useEffect(() => setNotifications(getLocal(STORAGE_KEYS.notifications)), []);

  const addNotification = (n: Omit<SiteNotification, "id" | "createdAt">) => {
    const newN: SiteNotification = { ...n, id: crypto.randomUUID(), createdAt: Date.now() };
    const updated = [newN, ...notifications];
    setNotifications(updated);
    setLocal(STORAGE_KEYS.notifications, updated);
  };

  const removeNotification = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    setLocal(STORAGE_KEYS.notifications, updated);
  };

  const toggleNotification = (id: string) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, active: !n.active } : n
    );
    setNotifications(updated);
    setLocal(STORAGE_KEYS.notifications, updated);
  };

  return { notifications, addNotification, removeNotification, toggleNotification };
}
