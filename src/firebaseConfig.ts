// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Para autenticação
import { getFirestore } from "firebase/firestore"; // Para Firestore

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVXk_coihZGO7FoE5Nyq7NPDowAbvyWhI",
  authDomain: "arch-dash.firebaseapp.com",
  projectId: "arch-dash",
  storageBucket: "arch-dash.firebasestorage.app",
  messagingSenderId: "554540543446",
  appId: "1:554540543446:web:70845aa286e41e87a1c877",
  measurementId: "G-J5MN6NEV2L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exporte os serviços que você vai usar
export const auth = getAuth(app);
export const db = getFirestore(app);
