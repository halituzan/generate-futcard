// Gerekli fonksiyonları SDK'lar arasından al
import { getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Web uygulamanızın Firebase konfigürasyonu
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase'i başlat
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Depolama kova adı
const STORAGE_FOLDER_PATH = "generate-futcard.appspot.com";
export const storage = getStorage(app, STORAGE_FOLDER_PATH);

export default app;