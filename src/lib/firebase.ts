import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { derived, writable, type Readable } from "svelte/store";

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

/**
 * @returns a store with the current firebase user
 */
function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn("Auth is not initialized or not in browser");
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe,
    };
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}

export const user = userStore();

// export const userData = writable<any>(null);
// user.subscribe((user) => {
//   if (user) {
//     const docRef = doc(db, `users/${user.uid}`);
//     onSnapshot(docRef, (snapshot) => {
//       userData.set(snapshot.data());
//     });
//   }
// });

/**
 * @param  {string} path document path or reference
 * @returns a store with realtime updates on document data
 */
export function docStore<T>(path: string) {
  let unsubscribe: () => void;

  const docRef = doc(db, path);

  const { subscribe } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  };
}

interface UserData {
  username: string;
  bio: string;
  photoURL: string;
  links: any[];
}

export const userData: Readable<UserData | null> = derived(
  user,
  ($user, set) => {
    if ($user) {
      return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
    } else {
      set(null);
    }
  }
);
