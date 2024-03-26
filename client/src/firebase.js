// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-1e64e.firebaseapp.com",
  projectId: "real-estate-1e64e",
  storageBucket: "real-estate-1e64e.appspot.com",
  messagingSenderId: "998214217249",
  appId: "1:998214217249:web:cbeada0d022c79aa17bd60",
  measurementId: "G-4Z1QX83DHB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
