import { initializeApp, FirebaseApp, getApps } from "firebase/app";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBq1BYDgsPqiP15_HYdExLDd1deNrFGeyA",
  authDomain: "generate-futcard.firebaseapp.com",
  projectId: "generate-futcard",
  storageBucket: "generate-futcard.appspot.com",
  messagingSenderId: "537971982486",
  appId: "1:537971982486:web:9840d1e2b94b83f76842b7",
};

let app: FirebaseApp;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // Zaten başlatılmışsa mevcut uygulamayı al
}

// Storage referansını al
const storage: FirebaseStorage = getStorage(app);

export { app };
export { storage };
