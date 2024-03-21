// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk1bKiPuSuvf5ysbMlFxlOAVfpQ9vGu9E",
  authDomain: "email-pass-auth-b4806.firebaseapp.com",
  projectId: "email-pass-auth-b4806",
  storageBucket: "email-pass-auth-b4806.appspot.com",
  messagingSenderId: "177402439637",
  appId: "1:177402439637:web:307acdfb4e27e2202c3f5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app