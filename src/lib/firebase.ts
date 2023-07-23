import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCyGaXolymrOPXJ17FsMly2O54Y9ED3Q2Y",
  authDomain: "sveltekit-link-tree.firebaseapp.com",
  projectId: "sveltekit-link-tree",
  storageBucket: "sveltekit-link-tree.appspot.com",
  messagingSenderId: "807013541137",
  appId: "1:807013541137:web:a07cedfa0f4cc4a29318b0",
  measurementId: "G-4LNZ989FK4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
