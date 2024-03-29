// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  connectAuthEmulator,
} from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();

// Initialize Firebase Firestore
export const db = getFirestore(firebaseApp);

// Initialize Firebase Storage
export const storage = getStorage(firebaseApp);

// Use Firebase Emulators
if (process.env.NEXT_PUBLIC_USE_FIREBASE_AUTH_EMULATOR === "true") {
  connectAuthEmulator(auth, "http://localhost:9099");
  console.info("\x1b[33m", "Auth Emulator Connected!");
}

if (process.env.NEXT_PUBLIC_USE_FIREBASE_FIRESTORE_EMULATOR === "true") {
  connectFirestoreEmulator(db, "localhost", 8080);
  console.info("\x1b[36m", "Firestore Emulator Connected!");
}

if (process.env.NEXT_PUBLIC_USE_FIREBASE_STORAGE_EMULATOR === "true") {
  connectStorageEmulator(storage, "localhost", 9199);
  console.info("\x1b[32m", "Storage Emulator Connected!");
}

// const analytics = getAnalytics(app);
