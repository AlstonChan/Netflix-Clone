import { credential } from "firebase-admin";
import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";

const firebaseConfig = {
  credential: credential.cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

console.log(admin.apps.length);

if (!admin.apps.length) {
  try {
    // Initialize the Firebase Admin SDK
    initializeApp(firebaseConfig);
  } catch (error) {
    console.error("Error initializing Firebase Admin SDK:", error);
  }
}

export const firebaseAdmin = admin.app();
export const adminAuth = admin.auth(firebaseAdmin);
export const adminDn = admin.firestore(firebaseAdmin);
