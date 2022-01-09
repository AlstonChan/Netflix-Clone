// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "netflix-clone-fe6a4.appspot.com",
  messagingSenderId: "819008860022",
  appId: "1:819008860022:web:d94ea5af72328342061457",
  measurementId: "G-N9E2RJL00T",
};

// Initialize Firebase

export const firebasepp = initializeApp(firebaseConfig);
export const auth = getAuth(firebasepp);
export const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
