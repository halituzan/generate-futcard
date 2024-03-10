import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBq1BYDgsPqiP15_HYdExLDd1deNrFGeyA",
    authDomain: "generate-futcard.firebaseapp.com",
    projectId: "generate-futcard",
    storageBucket: "generate-futcard.appspot.com",
    messagingSenderId: "537971982486",
    appId: "1:537971982486:web:9840d1e2b94b83f76842b7"
};

let app;

if (!firebase.apps.length) {
    app = initializeApp(firebaseConfig);
} else {
    app = firebase.app(); // Zaten başlatılmışsa mevcut uygulamayı al
}

// Storage referansını al
const storage = firebase.storage();
export { app };
export { storage, firebase as default };