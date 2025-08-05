// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWHiRruE_mejOEohQEOkdpTV8lRgRat2o",
  authDomain: "vite-contact-dc150.firebaseapp.com",
  projectId: "vite-contact-dc150",
  storageBucket: "vite-contact-dc150.firebasestorage.app",
  messagingSenderId: "434311424774",
  appId: "1:434311424774:web:177c2143c673ce63858c87"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore (app);