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

// Admin emails allowed to access the panel
export const ADMIN_EMAILS = ["admin@maharshaevents.com", "maharshaevents2018@gmail.com"];
