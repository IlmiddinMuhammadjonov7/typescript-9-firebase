// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcM5FSyWpad1KOvFtIeOEiugUZTgIl_m8",
  authDomain: "loyiha-3c6b5.firebaseapp.com",
  projectId: "loyiha-3c6b5",
  storageBucket: "loyiha-3c6b5.appspot.com",
  messagingSenderId: "718642291482",
  appId: "1:718642291482:web:66f63c54fb34665a2e02a3",
  measurementId: "G-3D3G0J5Y81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
