import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA6Jc5rwNEYjdOheUmk9xlOLRBIIJg62w4",
  authDomain: "maharsha-events.firebaseapp.com",
  projectId: "maharsha-events",
  storageBucket: "maharsha-events.firebasestorage.app",
  messagingSenderId: "660421491749",
  appId: "1:660421491749:web:a427557f9c3a011c41d3cc",
  measurementId: "G-V44JWX5YME",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Only the main admin is permitted to access the admin panel
export const MAIN_ADMIN_EMAIL = "maharshaevents2018@gmail.com";
export const ADMIN_EMAILS = [MAIN_ADMIN_EMAIL];

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === MAIN_ADMIN_EMAIL.toLowerCase();
}

const SESSION_STORAGE_KEY = "maharsha_admin_session";

export interface AdminSession {
  authenticated: boolean;
  email: string;
  loginMethod: "google";
  timestamp: number;
}

export function getAdminSession(): AdminSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY) || localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as AdminSession;
    if (Date.now() - session.timestamp > 7 * 24 * 60 * 60 * 1000) {
      clearAdminSession();
      return null;
    }
    // Strict verify
    if (!isAdminEmail(session.email)) {
      clearAdminSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function setAdminSession(session: AdminSession): void {
  try {
    const serialized = JSON.stringify(session);
    sessionStorage.setItem(SESSION_STORAGE_KEY, serialized);
    localStorage.setItem(SESSION_STORAGE_KEY, serialized);
  } catch (err) {
    console.warn("Failed to store admin session:", err);
  }
}

export function clearAdminSession(): void {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (err) {
    console.warn("Failed to clear admin session:", err);
  }
}


