import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdTFmbuuHjoKuZ4Edv-w5_t0bPT2-s1zI",
  authDomain: "louneshogwartsteolia.firebaseapp.com",
  projectId: "louneshogwartsteolia",
  storageBucket: "louneshogwartsteolia.appspot.com",
  messagingSenderId: "197363457155",
  appId: "1:197363457155:web:ab9e529f83e6f340978fb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app)
export const db = getFirestore(app)