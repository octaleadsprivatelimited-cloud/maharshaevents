import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const DEMO_IMAGES = [
  { url: "/images/hero-bg.webp", caption: "Grand wedding reception", category: "Wedding" },
  { url: "/images/corporate-event.webp", caption: "Corporate gala", category: "Corporate" },
  { url: "/images/wedding.webp", caption: "Outdoor ceremony", category: "Wedding" },
  { url: "/images/birthday.webp", caption: "Birthday celebration", category: "Birthday" },
  { url: "/images/decoration.webp", caption: "Floral setup", category: "Decoration" },
  { url: "/images/venue.webp", caption: "Luxury venue", category: "Venue" },
];

const SEED_KEY = "maharsha_demo_seeded";

export async function seedDemoImages() {
  // Only seed once
  if (localStorage.getItem(SEED_KEY)) return;

  try {
    const snap = await getDocs(collection(db, "gallery"));
    if (snap.empty) {
      for (const img of DEMO_IMAGES) {
        await addDoc(collection(db, "gallery"), {
          ...img,
          createdAt: Date.now(),
        });
      }
      console.log("Demo images seeded to Firestore");
    }
    localStorage.setItem(SEED_KEY, "true");
  } catch (err) {
    console.error("Failed to seed demo images:", err);
  }
}
